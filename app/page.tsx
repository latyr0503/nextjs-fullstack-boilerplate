"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Layout,
  Layers,
  Globe,
  Database,
  BookOpen,
  Lock,
  Send,
  Workflow,
  Bot,
  BarChart3,
  Search,
  Terminal,
} from "lucide-react";
import Navbar from "@/components/static/Navbar";
import FooterStatic from "@/components/static/Footer";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import { boilerplateFeatures } from "@/data/data";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Layout,
  Layers,
  Globe,
  Database,
  BookOpen,
  Lock,
  Send,
  Workflow,
  Bot,
  BarChart3,
  Search,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden border-b border-border/60">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Boilerplate Fullstack Production-Ready</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground"
            >
              Le socle moderne pour créer vos applications web &{" "}
              <span className="text-primary bg-clip-text">
                solutions digitales
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Next.js 16, TypeScript, Tailwind CSS, Shadcn UI, Redux Toolkit,
              Axios, Neon Postgres, Resend et n8n. Tout est pré-configuré pour
              démarrer immédiatement sans friction.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
            >
              <Link
                href="/#features"
                className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xs group"
              >
                <span>Découvrir les fonctionnalités</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-secondary transition-all"
              >
                Accéder au Dashboard
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3.5 rounded-xl border border-transparent text-muted-foreground hover:text-foreground font-medium text-sm transition-all"
              >
                Consulter le Blog
              </Link>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-10 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground"
            >
              {[
                "Next.js 16",
                "TypeScript",
                "Tailwind CSS",
                "Shadcn/UI",
                "Redux Toolkit",
                "Axios",
                "Neon PostgreSQL",
                "n8n Workflows",
                "Resend Email",
                "PostHog",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg border border-border/70 bg-card/60 backdrop-blur-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Batteries Incluses
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Tout ce dont vous avez besoin pour livrer vite
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Chaque module a été structuré pour respecter les standards de
                l&apos;industrie et offrir une maintenabilité maximale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boilerplateFeatures.map((feat, index) => {
                const Icon = iconMap[feat.icon] || Zap;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group bg-card border border-border/80 hover:border-primary/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-md">
                        {feat.category}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECT ARCHITECTURE HIGHLIGHT */}
        <section className="py-20 bg-card/40 border-y border-border">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Structure du code
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Architecture propre et prête à l&apos;emploi
                </h2>
                <p className="text-sm text-muted-foreground">
                  Voici l&apos;organisation des dossiers pour développer vos
                  prochaines fonctionnalités sereinement :
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>app/ & components/</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Next.js App Router avec authentification (login, register,
                    forget-password), dashboard, blog markdown et 40+ composants
                    Shadcn/UI dans <code>components/ui</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold">
                    <Database className="w-4 h-4" />
                    <span>lib/ & store/</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Gestion d&apos;état et API avec Redux Toolkit &amp; RTK Query (<code>store/</code>),
                    fonctions d&apos;authentification (<code>lib/auth.ts</code>)
                    et utilitaires partagés (<code>lib/</code>).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center gap-2 text-indigo-500 font-bold">
                    <Workflow className="w-4 h-4" />
                    <span>n8n/ & public/prompt/</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Dossier n8n préservé pour héberger vos scénarios et webhooks,
                    et <code>public/prompt/</code> pour organiser vos prompts IA.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center gap-2 text-amber-500 font-bold">
                    <Send className="w-4 h-4" />
                    <span>app/api/contact/</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Route API complète qui enregistre les contacts dans Neon
                    Postgres, notifie par email avec Resend et par bot Telegram.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <div className="container mx-auto px-6 md:px-12">
          <Contact />
        </div>
      </main>

      <FooterStatic />
      <ScrollToTop />
    </div>
  );
}
