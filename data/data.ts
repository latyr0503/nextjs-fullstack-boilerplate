import { Github, Gitlab, Linkedin, Phone, Twitter, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContactType = {
  icon: LucideIcon;
  value: string;
  label?: string;
  href?: string;
};

export const siteConfig = {
  name: "Next.js Starter",
  title: "Next.js Modern Boilerplate",
  shortTitle: "Starter Kit",
  description:
    "Boilerplate Next.js moderne et modulaire avec TypeScript, Tailwind CSS, Shadcn/UI, Redux Toolkit, Axios, Neon Postgres, Resend et n8n.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://example.com",
  author: "Developer",
  email: process.env.NEXT_PUBLIC_EMAIL || "contact@example.com",
  phone: "+33 6 00 00 00 00",
  address: "Paris / Dakar",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
} as const;

export const profileInfo = {
  firstName: "Votre",
  lastName: "Nom",
  fullName: "Votre Nom",
  initials: "VN",
  roleBadge: "DÉVELOPPEUR FULLSTACK",
  headline: "Architecte de solutions digitales & Ingénieur Logiciel",
  location: "Dakar / Paris / Remote",
  company: "Mon Entreprise",
  availability: "Disponible pour de nouvelles opportunités",
  email: siteConfig.email,
  phone: siteConfig.phone,
  phoneHref: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  ctaLabel: "Écrire",
  aboutParagraphs: [
    "Ce boilerplate est conçu pour démarrer rapidement tout projet SaaS, application métier ou site vitrine avec les meilleures pratiques modernes.",
    "Il intègre une gestion d'état centralisée avec Redux Toolkit, un client Axios configuré, Neon DB pour le stockage SQL serverless, et des workflows n8n.",
  ],
  contactPitch:
    "Vous avez une idée ou un projet à lancer ? Contactez-nous dès aujourd'hui.",
  projectCtaTitle: "Démarrer un projet",
  projectCtaSubtitle:
    "De l'idée au déploiement en production, avançons ensemble.",
} as const;

export const blogInfo = {
  badge: "CARNET TECHNIQUE",
  title: "Notes & Articles",
  description:
    "Retrouvez ici nos articles, guides techniques et retours d'expérience sur le développement moderne.",
  emptyMessage: "Aucun article n'a été publié pour le moment.",
  backToBlogLabel: "Tous les articles",
  backToHomeLabel: "Accueil",
  ctaTitle: "Un projet en tête ?",
  ctaSubtitle:
    "Transformons vos idées en un produit concret et performant.",
} as const;

export const studioNav = [
  { id: "features", label: "Fonctionnalités" },
  { id: "stack", label: "Stack Technique" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
] as const;

export const contacts: ContactType[] = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: siteConfig.address,
    href: "#",
  },
  {
    icon: Github,
    label: "GitHub",
    value: siteConfig.socials.github,
    href: siteConfig.socials.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: siteConfig.socials.linkedin,
    href: siteConfig.socials.linkedin,
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: siteConfig.socials.twitter,
    href: siteConfig.socials.twitter,
  },
];

export const boilerplateFeatures = [
  {
    title: "Next.js 16 (App Router)",
    description: "Dernière version avec Server Components, streaming, routes dynamiques et optimisations Core Web Vitals.",
    category: "Framework",
    icon: "Zap",
  },
  {
    title: "Tailwind CSS & Shadcn/UI",
    description: "Bibliothèque complète de 40+ composants Radix UI stylisés, animations Framer Motion et support Dark Mode natif.",
    category: "Design System",
    icon: "Layout",
  },
  {
    title: "Redux Toolkit & RTK Query",
    description: "Store centralisé avec gestion d'authentification (authSlice), baseApi extensible et cache intelligent.",
    category: "State Management",
    icon: "Layers",
  },
  {
    title: "Client Axios Pré-configuré",
    description: "Instance Axios avec baseURL, gestion automatique du token JWT et intercepteurs de réponses et d'erreurs.",
    category: "HTTP Client",
    icon: "Globe",
  },
  {
    title: "Neon Serverless Postgres",
    description: "Connexion à Neon DB prête à l'emploi pour créer tables et enregistrer vos données instantanément.",
    category: "Database",
    icon: "Database",
  },
  {
    title: "Module Blog Markdown",
    description: "Moteur de blog basé sur des fichiers Markdown, parsing gray-matter, remark-html et pagination dynamique.",
    category: "CMS",
    icon: "BookOpen",
  },
  {
    title: "Système d'Authentification & Dashboard",
    description: "Pages de Connexion, Inscription, Mot de passe oublié et tableau de bord avec session sécurisée par cookie/JWT.",
    category: "Auth",
    icon: "Lock",
  },
  {
    title: "API Contact (Neon + Resend + Telegram)",
    description: "Route API complète qui enregistre les soumissions en base Neon, envoie un email Resend et notifie un bot Telegram.",
    category: "API & Notifications",
    icon: "Send",
  },
  {
    title: "Automatisations n8n",
    description: "Dossier dédié aux workflows n8n pour orchestrer vos webhooks, IA et scénarios d'automatisation.",
    category: "Automation",
    icon: "Workflow",
  },
  {
    title: "Système de Prompts IA",
    description: "Dossier public/prompt pour centraliser et versionner vos prompts système et agents conversationnels.",
    category: "AI",
    icon: "Bot",
  },
  {
    title: "Analytics PostHog",
    description: "Suivi des pages et des événements configuré avec capture manuelle ou automatique respectueuse de la vie privée.",
    category: "Analytics",
    icon: "BarChart3",
  },
  {
    title: "SEO & Robots / Sitemap",
    description: "Fichiers robots.ts et sitemap.ts générés dynamiquement avec métadonnées OpenGraph et Twitter Cards.",
    category: "SEO",
    icon: "Search",
  },
];
