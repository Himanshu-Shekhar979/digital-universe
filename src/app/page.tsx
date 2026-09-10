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

const UNIVERSE_SESSION_KEY = "hs_universe_entered";

export default function Home() {
  const [entered, setEntered] = useState(false);

  // If user already entered during this tab session, navigates with a direct hash,
  // or prefers reduced motion, auto-enter immediately
  useEffect(() => {
    if (typeof window === "undefined") return;

    let sessionCompleted = false;
    try {
      sessionCompleted = sessionStorage.getItem(UNIVERSE_SESSION_KEY) === "true";
    } catch {
      sessionCompleted = false;
    }

    const hasHash = Boolean(window.location.hash && window.location.hash !== "#top");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (sessionCompleted || hasHash || reduceMotion) {
      try {
        sessionStorage.setItem(UNIVERSE_SESSION_KEY, "true");
        document.documentElement.classList.add("universe-entered");
      } catch {
        // Safe failover if sessionStorage is restricted
      }
      const frameId = requestAnimationFrame(() => {
        setEntered(true);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
    try {
      sessionStorage.setItem(UNIVERSE_SESSION_KEY, "true");
    } catch {
      // Safe failover if sessionStorage is restricted
    }
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
      {/* Anti-FOUC for session restoration / deep link bypass */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('${UNIVERSE_SESSION_KEY}')==='true'||(window.location.hash&&window.location.hash!=='#top')||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('universe-entered');}}catch(e){}`,
        }}
      />
      <style>{`.universe-entered .universe-intro-overlay { display: none !important; }`}</style>

      <MotionConfig reducedMotion="user">
        <SmoothScroll />

        {/* ================= AMBIENT UNIVERSE BACKGROUND ================= */}
        <UniverseBackground />

        {/* ================= INTERACTIVE SPOTLIGHT & CURSOR ================= */}
        <CursorSpotlight />
        <CustomCursor />

        {/* ================= WORLD 00: CINEMATIC INITIALIZATION OVERLAY ================= */}
        <AnimatePresence>
          {!entered && (
            <motion.div
              key="intro-overlay"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 1.04,
                filter: "blur(6px)",
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              }}
              className="universe-intro-overlay fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center select-none"
              role="dialog"
              aria-modal="true"
              aria-label="Initialization Sequence"
            >
              {/* Atmospheric Spatial Dust (In-overlay particle layer) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              >
                <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/[0.025] blur-[150px]" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.96)_100%)]" />
              </div>

              {/* CHOREOGRAPHED SYSTEM BOOT SEQUENCE */}
              <div className="relative z-10 flex max-w-xl flex-col items-center">
                {/* 1. INITIALIZING TELEMETRY */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400 backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span>INITIALIZING DIGITAL UNIVERSE</span>
                </motion.div>

                {/* 2. DIAGNOSTIC SIGNAL TELEMETRY */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                  className="mt-4 font-mono text-[10px] tracking-[0.32em] text-zinc-500 uppercase"
                >
                  SIGNAL ACQUIRED // NODE 001 // LATENCY NOMINAL
                </motion.p>

                {/* 3. FINE TELEMETRY RULE */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "160px", opacity: 0.4 }}
                  transition={{ duration: 0.8, delay: 1.4, ease: "easeInOut" }}
                  className="my-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                {/* 4. MONOLITHIC IDENTITY REVEAL */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-4xl font-bold tracking-[0.05em] text-white sm:text-6xl lg:text-7xl uppercase">
                    Himanshu
                    <span className="block text-zinc-400 font-light tracking-[0.08em]">Shekhar</span>
                  </h1>
                </motion.div>

                {/* 5. SECONDARY UNIVERSE SPECIFIER */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 2.2, ease: "easeOut" }}
                  className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-zinc-400"
                >
                  DIGITAL UNIVERSE // 001
                </motion.p>

                {/* 6. INTERACTIVE ENTRY TRIGGER */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 2.6, ease: "easeOut" }}
                  className="mt-8 flex flex-col items-center"
                >
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-2 rounded-full border border-white/15 animate-ping opacity-25 pointer-events-none"
                    />
                    <MagneticButton strength={0.35}>
                      <button
                        onClick={handleEnter}
                        data-cursor="open"
                        autoFocus
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/80 bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                      >
                        <span>ENTER THE UNIVERSE</span>
                        <span className="font-mono text-zinc-400 transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </MagneticButton>
                  </div>

                  <p className="mt-4 font-mono text-[10px] text-zinc-600 tracking-wider">
                    Press <kbd className="rounded border border-zinc-800 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 bg-zinc-950">Enter</kbd> or click to begin
                  </p>
                </motion.div>
              </div>

              {/* IMMEDIATE SKIP OPTION (ACCESSIBLE FROM T=0) */}
              <button
                onClick={handleEnter}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600 transition-colors hover:text-zinc-400 focus:outline-none focus:underline"
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