"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      const marker = window.scrollY + 120;
      let currentSection = "";

      navItems.forEach((item) => {
        const section = document.querySelector(item.id);
        if (section && (section as HTMLElement).offsetTop <= marker) currentSection = item.id;
      });

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20) currentSection = "#contact";
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState(null, "", "#top");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection("");
  };

  return (
    <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.04] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <a href="#top" onClick={handleLogoClick} className="shrink-0 text-lg font-bold tracking-tight text-white">HS.</a>
        <div className="hidden items-center gap-4 xl:flex">
          {navItems.map(item => { const active = activeSection === item.id; return <a key={item.name} href={item.id} onClick={() => setMenuOpen(false)} className={`group relative whitespace-nowrap text-xs transition duration-300 ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}>{item.name}<span className={`absolute -bottom-2 left-0 h-px bg-white transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} /></a>; })}
        </div>
        <div className="hidden text-xs uppercase tracking-[0.2em] text-zinc-500 lg:block">Available</div>
        <button onClick={() => setMenuOpen(previous => !previous)} className="relative z-50 flex h-10 w-10 shrink-0 items-center justify-center xl:hidden" aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
          <div className="flex flex-col gap-1.5"><motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-white" /><motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-px w-6 bg-white" /><motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-white" /></div>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="border-t border-zinc-800 bg-black xl:hidden"><div className="grid max-h-[calc(100vh-5rem)] overflow-y-auto px-6 py-4 sm:grid-cols-2 sm:gap-x-8">{navItems.map((item, index) => { const active = activeSection === item.id; return <motion.a key={item.name} href={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} onClick={() => setMenuOpen(false)} className={`border-b border-zinc-900 py-4 text-left text-lg transition ${active ? "text-white" : "text-zinc-300 hover:text-white"}`}><span className="flex items-center justify-between"><span>{item.name}</span>{active && <span className="text-sm text-zinc-500" aria-hidden="true">●</span>}</span></motion.a>; })}</div></motion.div>}
      </AnimatePresence>
    </motion.nav>
  );
}