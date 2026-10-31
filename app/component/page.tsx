"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutTemplate,
  Sidebar as SidebarIcon,
  Layers,
  Code2,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
  Laptop,
  Maximize2,
  Sliders,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScrollExpandMediaDemo from "@/components/ui/scroll-expansion-hero-demo";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

export default function ComponentShowcasePage() {
  const [activeTab, setActiveTab] = useState<"hero" | "sidebar" | "primitives">("hero");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const heroCodeSnippet = `import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export function HeroSection() {
  return (
    <ScrollExpandMedia
      mediaType="video" // ou "image"
      mediaSrc="https://votre-domaine.com/video.mp4"
      posterSrc="https://votre-domaine.com/poster.jpg"
      bgImageSrc="https://votre-domaine.com/background.jpg"
      title="Titre Immersif"
      date="Sous-titre / Date"
      scrollToExpand="Scrollez pour agrandir"
    >
      <div className="max-w-4xl mx-auto py-12 text-white">
        <h3 className="text-2xl font-bold mb-4">Contenu Révélé</h3>
        <p className="text-neutral-300">
          Ce contenu s'affiche automatiquement lorsque le média est agrandi à 100%.
        </p>
      </div>
    </ScrollExpandMedia>
  );
}`;

  const sidebarCodeSnippet = `import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Settings, User } from "lucide-react";

export function MySidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { label: "Profil", href: "/profile", icon: <User /> },
    { label: "Paramètres", href: "/settings", icon: <Settings /> },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between">
        <div className="flex flex-col gap-2">
          {links.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-primary selection:text-white">
      {/* Top Banner & Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </Link>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-semibold text-white tracking-tight">Bibliothèque de Composants</span>
            </div>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/10">
              Boilerplate UI
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white">
                Dashboard
              </Button>
            </Link>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="outline" size="sm" className="gap-1 border-neutral-700 text-neutral-300">
                <span>shadcn/ui Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-3">
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Prêt pour la production • React 19 & Next.js 16</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Composants UI Haut de Gamme
            </h1>
            <p className="text-neutral-400 text-base max-w-2xl mt-2">
              Une collection soignée de composants interactifs, modernes et optimisés avec Tailwind CSS et Framer Motion, prêts à être dupliqués pour vos projets clients.
            </p>
          </div>

          {/* Component Tabs selector */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "hero"
                  ? "bg-primary text-white shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              <span>Scroll Expansion Hero</span>
            </button>
            <button
              onClick={() => setActiveTab("sidebar")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "sidebar"
                  ? "bg-primary text-white shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <SidebarIcon className="w-4 h-4" />
              <span>Animated Sidebar</span>
            </button>
            <button
              onClick={() => setActiveTab("primitives")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "primitives"
                  ? "bg-primary text-white shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Primitives Shadcn</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Scroll Expansion Hero */}
        {activeTab === "hero" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Meta card */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">Scroll Expansion Hero</h2>
                    <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
                      components/ui/scroll-expansion-hero.tsx
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-400">
                    Agrandit harmonieusement un média (vidéo MP4/WebM, YouTube, ou image haute résolution) lors du scroll avec transition fluide du titre et révélation de contenu.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-neutral-700 text-neutral-200 gap-1.5"
                    onClick={() => copyToClipboard(heroCodeSnippet, "hero")}
                  >
                    {copiedSnippet === "hero" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSnippet === "hero" ? "Copié !" : "Copier le code"}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview */}
            <div className="rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl bg-black">
              <div className="bg-neutral-900 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 font-mono text-neutral-300">Aperçu en direct (Scrollez pour tester)</span>
                </div>
                <span className="text-neutral-500 hidden sm:inline">Supporte Molette, Pavé tactile & Touch Mobile</span>
              </div>

              {/* Render the actual interactive demo */}
              <div className="relative min-h-[700px] w-full">
                <ScrollExpandMediaDemo />
              </div>
            </div>

            {/* Code & Props Documentation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-neutral-900/60 border-neutral-800 text-neutral-200">
                <CardHeader>
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    Exemple d&apos;utilisation
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    Importez et intégrez le composant dans n&apos;importe quelle page ou section.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 overflow-x-auto font-mono">
                    {heroCodeSnippet}
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900/60 border-neutral-800 text-neutral-200">
                <CardHeader>
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    Propriétés Disponibles (Props)
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    Options configurables pour adapter l&apos;effet visuel.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                      <code className="text-primary font-semibold">mediaType?: &quot;video&quot; | &quot;image&quot;</code>
                      <p className="text-neutral-400 mt-1">Définit le type de média. Par défaut : &quot;video&quot;.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                      <code className="text-primary font-semibold">mediaSrc: string</code>
                      <p className="text-neutral-400 mt-1">URL de la vidéo (MP4/WebM ou lien YouTube) ou de l&apos;image centrale.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                      <code className="text-primary font-semibold">bgImageSrc: string</code>
                      <p className="text-neutral-400 mt-1">Image d&apos;arrière-plan qui s&apos;estompe au fur et à mesure du scroll.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                      <code className="text-primary font-semibold">title?: string &amp; date?: string</code>
                      <p className="text-neutral-400 mt-1">Titre animé avec translation latérale et sous-titre optionnel.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                      <code className="text-primary font-semibold">children?: ReactNode</code>
                      <p className="text-neutral-400 mt-1">Contenu riche affiché sous le média une fois totalement déployé.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Animated Sidebar */}
        {activeTab === "sidebar" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Meta card */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">Animated Collapsible Sidebar</h2>
                    <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
                      components/ui/sidebar.tsx
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-400">
                    Barre latérale avec auto-expansion fluide au survol de la souris, support responsive avec tiroir mobile animé, et liens avec icônes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-neutral-700 text-neutral-200 gap-1.5"
                    onClick={() => copyToClipboard(sidebarCodeSnippet, "sidebar")}
                  >
                    {copiedSnippet === "sidebar" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSnippet === "sidebar" ? "Copié !" : "Copier le code"}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview */}
            <div className="rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl bg-neutral-950">
              <div className="bg-neutral-900 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 font-mono text-neutral-300">Aperçu en direct (Survolez la sidebar à gauche)</span>
                </div>
                <span className="text-neutral-500">Intégrée également dans /dashboard</span>
              </div>

              {/* Render the sidebar demo */}
              <div className="p-6 bg-neutral-950 flex justify-center items-center">
                <div className="w-full max-w-5xl rounded-xl overflow-hidden border border-neutral-800">
                  <SidebarDemo />
                </div>
              </div>
            </div>

            {/* Code Snippet Card */}
            <Card className="bg-neutral-900/60 border-neutral-800 text-neutral-200">
              <CardHeader>
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Exemple d&apos;implémentation
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  Composé de <code>Sidebar</code>, <code>SidebarBody</code> et <code>SidebarLink</code>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 overflow-x-auto font-mono">
                  {sidebarCodeSnippet}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 3: Primitives Shadcn */}
        {activeTab === "primitives" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Composants Shadcn de Base</h2>
                <p className="text-sm text-neutral-400">
                  Plus de 40 composants pré-installés dans <code>@/components/ui/</code> pour composer des interfaces rapides et accessibles.
                </p>
              </div>
            </div>

            {/* Grid of UI primitives */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Buttons */}
              <Card className="bg-neutral-900/60 border-neutral-800 text-neutral-200">
                <CardHeader>
                  <CardTitle className="text-base text-white">Boutons &amp; Variantes</CardTitle>
                  <CardDescription className="text-neutral-400">
                    <code>button.tsx</code>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card className="bg-neutral-900/60 border-neutral-800 text-neutral-200">
                <CardHeader>
                  <CardTitle className="text-base text-white">Badges</CardTitle>
                  <CardDescription className="text-neutral-400">
                    <code>badge.tsx</code>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </CardContent>
              </Card>

              {/* Cards & Stats */}
              <Card className="bg-neutral-900/60 border-neutral-800 text-neutral-200">
                <CardHeader>
                  <CardTitle className="text-base text-white">Cards &amp; Conteneurs</CardTitle>
                  <CardDescription className="text-neutral-400">
                    <code>card.tsx</code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-400">Utilisateurs Actifs</p>
                      <p className="text-xl font-bold text-white">12,450</p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      +18%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
