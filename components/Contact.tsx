"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { contacts, siteConfig } from "@/data/data";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const inputClass =
  "w-full bg-transparent border-b border-gray-300 dark:border-white/10 py-3 text-gray-900 dark:text-white focus:outline-hidden focus:border-primary transition-colors peer placeholder-transparent text-sm";

const labelClass = (focused: boolean, hasValue: boolean) =>
  `absolute left-0 transition-all duration-300 pointer-events-none text-sm ${
    focused
      ? "-top-5 text-primary text-xs font-medium"
      : hasValue
      ? "-top-5 text-muted-foreground text-xs font-medium"
      : "top-3 text-muted-foreground text-sm"
  }`;

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Veuillez entrer votre nom complet.");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Veuillez entrer un message.");
      return;
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("L'adresse email semble incorrecte.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Votre message a été envoyé avec succès !");
        setFormData({ name: "", email: "", telephone: "", message: "" });
      } else {
        toast.error(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      toast.error("Impossible de se connecter au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
          Nous contacter
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Contactez-nous
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Une question, une opportunité de projet ou une collaboration ? Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card p-8 rounded-2xl border border-border shadow-xs relative overflow-hidden">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Envoyer un message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className={inputClass}
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
                <label htmlFor="name" className={labelClass(focusedInput === "name", formData.name.length > 0)}>
                  Nom complet *
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  id="telephone"
                  className={inputClass}
                  placeholder="Telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("telephone")}
                  onBlur={() => setFocusedInput(null)}
                />
                <label htmlFor="telephone" className={labelClass(focusedInput === "telephone", formData.telephone.length > 0)}>
                  Numéro de téléphone
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className={inputClass}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />
                <label htmlFor="email" className={labelClass(focusedInput === "email", formData.email.length > 0)}>
                  Adresse Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
                <label htmlFor="message" className={labelClass(focusedInput === "message", formData.message.length > 0)}>
                  Message *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Ou écrivez directement à{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary hover:underline font-medium"
                >
                  {siteConfig.email}
                </a>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Coordonnées */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col justify-center gap-8 lg:pl-6"
        >
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Email de contact
            </span>
            <div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors inline-block"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Téléphone
            </span>
            <div>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors inline-block"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Localisation
            </span>
            <p className="text-lg font-medium text-foreground">
              {siteConfig.address}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Réseaux & Plateformes
            </span>
            <div className="flex items-center gap-3">
              {contacts.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary hover:bg-primary hover:text-primary-foreground border border-border rounded-xl flex items-center justify-center text-muted-foreground transition-all duration-200"
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
