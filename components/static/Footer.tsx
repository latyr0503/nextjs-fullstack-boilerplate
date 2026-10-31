import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/data";
import { Layers } from "lucide-react";

export default function FooterStatic() {
  return (
    <footer className="w-full border-t border-border bg-card/40 py-12 text-muted-foreground">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-semibold text-foreground">
            {siteConfig.name}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border">
            Boilerplate v1.0
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link href="/#features" className="hover:text-foreground transition-colors">
            Fonctionnalités
          </Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/#contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
