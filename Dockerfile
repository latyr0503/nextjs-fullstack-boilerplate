# ==============================================================================
# Dockerfile Multi-stage pour Next.js (Version 16 + React 19 + pnpm)
# ==============================================================================
# Pourquoi le "Multi-stage" ?
# Au lieu d'avoir une seule image de 1,5 Go contenant tous les outils de dev,
# nous créons des étapes (stages) séparées :
#  1. base    : Image commune légère Linux Alpine avec Node.js 22 LTS
#  2. deps    : Installation sécurisée des dépendances (cache efficace)
#  3. builder : Compilation du code (génération du bundle standalone)
#  4. runner  : Image finale minimale (<150 Mo) sans outils de build, très rapide et sécurisée.
# ==============================================================================

# --- ÉTAPE 1 : Image de base commune ---
FROM node:22-alpine AS base
WORKDIR /app

# libc6-compat est souvent requis par Alpine pour exécuter certains binaires C++ natifs
RUN apk add --no-cache libc6-compat

# Activer pnpm via Corepack natif de Node.js (aligné sur votre version locale)
RUN corepack enable && corepack prepare pnpm@11.15.1 --activate


# --- ÉTAPE 2 : Installation des dépendances (deps) ---
FROM base AS deps
WORKDIR /app

# On copie UNIQUEMENT les fichiers de définition de paquets en premier.
# Grâce au système de cache de Docker : si ces fichiers ne changent pas,
# Docker réutilise le cache et ne réinstalle pas tout à chaque modification de code !
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile --ignore-scripts


# --- ÉTAPE 3 : Compilation de l'application (builder) ---
FROM base AS builder
WORKDIR /app

# On récupère le dossier node_modules créé à l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
# On copie tout le reste du code source
COPY . .

# Désactiver la télémétrie Next.js pour accélérer le build et protéger la vie privée
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Compilation en mode production (génère .next/standalone grâce à next.config.js)
RUN pnpm run build


# --- ÉTAPE 4 : Image finale d'exécution (runner) ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# BONNE PRATIQUE SÉCURITÉ :
# Par défaut Docker tourne en "root". On crée un utilisateur système non-privilégié
# pour empêcher toute élévation de privilèges en cas d'attaque.
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# On copie le dossier des fichiers publics (logos, images statiques)
COPY --from=builder /app/public ./public

# On copie le serveur autonome généré par Next.js standalone
# et on assigne la propriété des fichiers à notre utilisateur non-root
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Basculer vers l'utilisateur sécurisé
USER nextjs

# Définir le port d'écoute
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Commande de démarrage : lance directement le serveur ultra-léger Node.js
CMD ["node", "server.js"]
