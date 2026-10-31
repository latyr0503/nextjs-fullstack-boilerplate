"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  LayoutDashboard,
  LogOut,
  Home,
  User,
  Settings,
} from "lucide-react";
import { siteConfig } from "@/data/data";
import { logout, getUser } from "@/lib/auth";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(getUser());
  }, []);

  const links = [
    {
      label: "Vue d'ensemble",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="text-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Retour au site",
      href: "/",
      icon: <Home className="text-muted-foreground h-5 w-5 shrink-0" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row w-full overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-8 bg-card border-r border-border">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 py-1 z-20 text-foreground group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="font-bold text-sm text-foreground whitespace-pre"
              >
                {siteConfig.name}
              </motion.span>
            </Link>

            {/* Navigation links */}
            <div className="mt-8 flex flex-col gap-1.5">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* User profile & Logout */}
          <div className="pt-4 border-t border-border flex flex-col gap-2">
            <div className="flex items-center gap-2.5 py-1">
              <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold text-foreground shrink-0">
                {currentUser?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <motion.div
                animate={{
                  display: open ? "block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="overflow-hidden truncate"
              >
                <p className="text-xs font-semibold text-foreground truncate">
                  {currentUser?.name || "Utilisateur"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {currentUser?.email || "demo@example.com"}
                </p>
              </motion.div>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center gap-2.5 py-2 px-1 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer w-full text-left"
            >
              <LogOut className="w-4 h-4 shrink-0 text-destructive" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="whitespace-pre"
              >
                Déconnexion
              </motion.span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
