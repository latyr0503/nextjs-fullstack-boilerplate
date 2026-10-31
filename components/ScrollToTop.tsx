"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating back-to-top button.
 * Appears after 400px of scroll on all screens.
 * Positioned bottom-right to stay in the thumb zone on mobile.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollUp}
          aria-label="Retour en haut de page"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:border-indigo-500 dark:hover:text-white shadow-lg dark:shadow-black/40 transition-all duration-200"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
