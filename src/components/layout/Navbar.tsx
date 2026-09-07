"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "@/lib/scroll";

const navItems = [
  { name: "Story", id: "#about" },
  { name: "Skills", id: "#skills" },
  { name: "Lab", id: "#lab" },
  { name: "Projects", id: "#projects" },
  { name: "Creative", id: "#creative" },
  { name: "Knowledge", id: "#knowledge" },
  { name: "Journey", id: "#journey" },
  { name: "Future", id: "#future" },
  { name: "Transmission", id: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined") return;

    // Check if near bottom
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
      setActiveSection("#contact");
      return;
    }

    // Check if at the very top
    if (window.scrollY < 200) {
      setActiveSection("");
      return;
    }

    const scrollPosition = window.scrollY + 180;
    let currentId = "";

    for (const item of navItems) {
      const el = document.querySelector(item.id) as HTMLElement | null;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition) {
          currentId = item.id;
        }
      }
    }

    setActiveSection(currentId);
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      updateActiveSection();
    });
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  // Keyboard Escape listener to close mobile menu
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id, -70);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection("#top", 0);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 w-full border-b border-white/[0.05] bg-black/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Brand Logo with Creative Identity subtle nod */}
        <a
          href="#top"
          onClick={handleLogoClick}
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1"
        >
          <span>HS.</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 transition-colors group-hover:text-zinc-300">
            / Rishu
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`group relative whitespace-nowrap text-xs font-medium transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-white/40 rounded py-1 px-0.5 ${
                  active ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-white transition-all duration-300 ${
                    active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Status Badge */}
        <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-500">Available for Opportunities</span>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 shrink-0 items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded xl:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white transition-transform"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white transition-transform"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-zinc-800 bg-black/95 backdrop-blur-2xl xl:hidden"
          >
            <div className="grid max-h-[calc(100vh-5rem)] overflow-y-auto px-6 py-6 sm:grid-cols-2 sm:gap-x-8">
              {navItems.map((item, index) => {
                const active = activeSection === item.id;
                return (
                  <motion.a
                    key={item.name}
                    href={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center justify-between border-b border-zinc-900 py-3.5 text-base transition-colors ${
                      active ? "text-white font-medium" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}