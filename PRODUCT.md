# Product Specification - Next.js Fullstack Boilerplate

## Platform
Web (Responsive desktop & mobile)

## Target Audience
Développeurs et équipes créant de nouveaux produits SaaS, applications métiers, plateformes de contenu ou sites vitrines modernes.

## Product Purpose
Fournir un socle technique complet et éprouvé évitant de reconfigurer l'authentification, les clients d'API (Axios / RTK Query), la base de données (Neon), les emails transactionnels (Resend), les automatisations (n8n), les prompts IA et le système de design (Shadcn/UI + Tailwind).

## Key Capabilities
- Architecture Next.js 16 App Router avec Server Components.
- Redux Toolkit avec persistance et injection automatique de token JWT.
- Client Axios pré-configuré avec intercepteurs et gestion centralisée des erreurs.
- Base de données serverless Neon Postgres avec branching.
- Formulaire et API de contact connectés à Neon DB, Resend et Telegram.
- Moteur de Blog Markdown dynamique avec gestion des tags et pagination.
- Workflows d'automatisation n8n et dossier dédié aux prompts IA (`public/prompt/`).
- Bibliothèque de composants UI (40+ composants Radix / Shadcn).
