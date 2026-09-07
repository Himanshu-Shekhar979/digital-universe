"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Lab from "@/components/sections/Lab";
import Projects from "@/components/sections/Projects";
import Creative from "@/components/sections/Creative";
import Knowledge from "@/components/sections/Knowledge";
import Journey from "@/components/sections/Journey";
import Future from "@/components/sections/Future";
import Contact from "@/components/sections/Contact";

import UniverseBackground from "@/components/ui/UniverseBackground";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Home() {
  const [entered, setEntered] = useState(false);

  // If user navigates with a direct hash or prefers reduced motion, auto-enter
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHash = Boolean(window.location.hash && window.location.hash !== "#top");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasHash || reduceMotion) {
      const frameId = requestAnimationFrame(() => {
        setEntered(true);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  // Keyboard shortcut to enter experience (Enter or Space)
  useEffect(() => {
    if (entered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [entered, handleEnter]);

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-white selection:text-black"
    >
      <MotionConfig reducedMotion="user">
        <SmoothScroll />

        {/* ================= AMBIENT UNIVERSE BACKGROUND ================= */}
        <UniverseBackground />

        {/* ================= INTERACTIVE SPOTLIGHT & CURSOR ================= */}
        <CursorSpotlight />
        <CustomCursor />

        {/* ================= CINEMATIC INITIALIZATION OVERLAY (EXPERIENCE LAYER) ================= */}
        <AnimatePresence>
          {!entered && (
            <motion.div
              key="intro-overlay"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 1.03,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              }}
              className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black/95 px-6 text-center backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Initialization Experience"
            >
              {/* INTRO GLOW */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]"
              />

              {/* INTRO CONTENT */}
              <div className="relative z-10 max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span>Digital Universe / 2026</span>
                </motion.div>

                {/* NAME & IDENTITY */}
                <motion.h1
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                  className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
                >
                  Himanshu
                  <br />
                  Shekhar
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                  className="mx-auto mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
                >
                  A digital space exploring technology, creative coding, and purposeful
                  web architectures.
                </motion.p>

                {/* ENTER BUTTON WITH MAGNETIC WRAPPER */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
                  className="mt-9"
                >
                  <MagneticButton strength={0.35}>
                    <button
                      onClick={handleEnter}
                      data-cursor="open"
                      autoFocus
                      className="rounded-full border border-zinc-600 bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    >
                      Enter Experience
                    </button>
                  </MagneticButton>
                </motion.div>

                <p className="mt-4 text-[11px] text-zinc-600">
                  Press <kbd className="rounded border border-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">Enter</kbd> to begin
                </p>
              </div>

              {/* BOTTOM INDICATOR / SKIP */}
              <button
                onClick={handleEnter}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-zinc-600 transition-colors hover:text-zinc-400 focus:outline-none focus:underline"
              >
                Skip intro →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MAIN PORTFOLIO (ALWAYS PRESENT IN DOM FOR SEO) ================= */}
        <div className="relative z-10 transition-opacity duration-700">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Lab />
          <Projects />
          <Creative />
          <Knowledge />
          <Journey />
          <Future />
          <Contact />
        </div>
      </MotionConfig>
    </main>
  );
}