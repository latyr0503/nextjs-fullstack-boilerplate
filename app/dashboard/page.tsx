"use client";

import  { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import {
  Users,
  TrendingUp,
  Database,
  Workflow,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function PageDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "1 248",
      change: "+12% ce mois",
      icon: Users,
    },
    {
      title: "Workflows Déclenchés",
      value: "8 420",
      change: "n8n actif",
      icon: Workflow,
    },
    {
      title: "Requêtes Neon DB",
      value: "99.9%",
      change: "Temps moyen: 42ms",
      icon: Database,
    },
    {
      title: "Conversion Visiteurs",
      value: "14.2%",
      change: "+2.4% vs semaine passée",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tableau de bord de démarrage</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Bienvenue, {user?.name || "développeur"} !
          </h1>
          <p className="text-sm text-muted-foreground">
            Voici votre espace d&apos;administration pré-configuré prêt à être connecté à vos modèles de données.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-secondary transition-colors"
          >
            Voir le Blog
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
          >
            Page d&apos;accueil
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Boilerplate Integrations status */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Modules & Services connectés au projet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/80 bg-secondary/30 space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              State & API
            </span>
            <p className="font-semibold text-foreground">Redux Toolkit & Axios</p>
            <p className="text-xs text-muted-foreground">
              Prêt pour vos slices Redux, requêtes Axios avec JWT et cache RTK Query.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-secondary/30 space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
              Database
            </span>
            <p className="font-semibold text-foreground">Neon PostgreSQL</p>
            <p className="text-xs text-muted-foreground">
              Branching instantané et pooling serverless configurés via @neondatabase/serverless.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-secondary/30 space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              Automatisation & IA
            </span>
            <p className="font-semibold text-foreground">n8n & Prompts</p>
            <p className="text-xs text-muted-foreground">
              Dossier de workflows /n8n et référentiel public/prompt opérationnels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
