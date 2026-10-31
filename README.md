# Next.js Fullstack Boilerplate 🚀

Un boilerplate moderne, modulaire et prêt pour la production, pensé pour démarrer rapidement tout projet web, application SaaS ou vitrine client sans refaire la plomberie technique à chaque fois.

---

## 📦 Stack Technique

- **Framework** : [Next.js 16 (App Router)](https://nextjs.org/) + React 19 + TypeScript
- **Styling & UI** : [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) (40+ composants Radix UI) + [Framer Motion](https://www.framer.com/motion/) + [Lucide Icons](https://lucide.dev/)
- **Gestion d'état & Client API** : [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query (`store/baseApi.ts`) avec caching automatique et injection JWT
- **Base de Données** : [Neon Serverless PostgreSQL](https://neon.tech/) (`@neondatabase/serverless`)
- **Automatisations** : Workflows [n8n](https://n8n.io/) (`/n8n`)
- **Système de Prompts IA** : Dossier dédié pour stocker et versionner vos prompts système (`public/prompt/`)
- **Notifications** : [Resend](https://resend.com/) (Emails transactionnels) & Notifications Bot Telegram
- **Blog & Contenu** : Moteur de blog Markdown dynamique (`/blog`) avec métadonnées frontmatter (`data/blog/`)
- **Analytics** : [PostHog](https://posthog.com/) configuré avec capture d'événements respectueuse

---

## 🗂️ Structure du Projet

```text
├── app/
│   ├── (auth)/             # Routes d'authentification (login, register, forget-password)
│   ├── api/contact/        # Route API contact (Neon DB + Resend + Telegram)
│   ├── blog/               # Moteur de blog Markdown paginé avec filtres par tags
│   ├── dashboard/          # Espace d'administration / tableau de bord
│   ├── globals.css         # Styles globaux & variables CSS
│   ├── layout.tsx          # Root layout avec providers (Redux, Thème, Toaster)
│   ├── page.tsx            # Landing page vitrine du boilerplate
│   ├── robots.ts           # Configuration SEO Robots
│   └── sitemap.ts          # Sitemap dynamique automatique
├── components/
│   ├── ui/                 # Composants Shadcn/UI (Button, Dialog, Form, Card, etc.)
│   ├── static/             # Composants réutilisables (Navbar, Footer)
│   ├── Contact.tsx         # Formulaire de contact connecté à /api/contact
│   └── ScrollToTop.tsx     # Bouton retour en haut de page fluide
├── data/
│   ├── data.ts             # Configuration du site (siteConfig, blogInfo, navigation)
│   └── blog/               # Articles Markdown (.md)
├── lib/
│   ├── auth.ts             # Helpers authentification client/serveur (token, cookies, logout)
│   ├── blog.ts             # Fonctions de lecture & parsing Markdown (gray-matter, remark)
│   ├── types.ts            # Définitions TypeScript globales (User, Auth, Credentials)
│   └── utils.ts            # Utilitaires (cn, handleApiError)
├── n8n/                    # Workflows n8n prêts à être importés
├── public/
│   ├── media/              # Fichiers médias (placeholder.webp par défaut)
│   └── prompt/             # Prompts système IA
└── store/
    ├── baseApi.ts          # Base RTK Query avec headers d'authentification
    ├── store.ts            # Store Redux configuré
    ├── api/authApi.ts      # Endpoints RTK Query pour l'authentification
    └── features/authSlice.ts # Slice Redux pour la gestion de session utilisateur
```

---

## ⚡ Démarrage Rapide

### 1. Cloner ou dupliquer le dépôt
```bash
git clone <votre-repo-url> mon-nouveau-projet
cd mon-nouveau-projet
```

### 2. Installer les dépendances
```bash
pnpm install
# ou npm install / yarn
```

### 3. Configurer l'environnement
Copiez le fichier `.env.example` vers `.env` et ajustez vos variables :
```bash
cp .env.example .env
```

Renseignez notamment :
- `DATABASE_URL` : Votre URL de connexion Neon PostgreSQL
- `NEXT_RESEND_API_KEY` : Votre clé API Resend (pour les emails)
- `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID` : (Optionnel pour alertes instantanées)

### 4. Lancer le serveur de développement
```bash
pnpm dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🛠️ Personnalisation pour un Nouveau Projet

1. **Informations du site** : Modifiez `data/data.ts` (`siteConfig`) pour changer le nom du site, la description, les réseaux sociaux et l'email de contact.
2. **Logo & Images** : Placez vos images dans `public/media/` (une image `placeholder.webp` est disponible par défaut).
3. **Ajouter un article au Blog** : Créez simplement un fichier `.md` dans `data/blog/` avec les champs frontmatter requis (`title`, `description`, `date`, `tags`, `slug`).
4. **Appels API** :
   - Via **Redux Toolkit Query** : injectez vos endpoints dans `baseApi` (`store/baseApi.ts`) pour bénéficier de hooks typés, du cache automatique et de la gestion des états de chargement.
   - Via `fetch` natif pour les Server Components ou routes serveur Next.js.
5. **Workflows n8n** : Importez ou exportez vos scénarios dans le dossier `/n8n`.
6. **Prompts IA** : Rédigez vos consignes dans `public/prompt/`.

---

## 📄 Licence
MIT - Réutilisable librement pour tous vos projets personnels et commerciaux.