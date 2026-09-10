"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScroll } from "@/components/ui/useGsapScroll";
import HeroCosmos from "@/components/ui/HeroCosmos";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/scroll";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // CINEMATIC SCROLL TRANSITION TO WORLD 02 (STORY)
  useGsapScroll(sectionRef, (gsap) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    timeline
      .to("[data-hero-content]", { yPercent: -18, opacity: 0, scale: 0.97, ease: "none" }, 0)
      .to("[data-hero-glow]", { scale: 1.25, opacity: 0, ease: "none" }, 0)
      .to("[data-hero-cosmos]", { scale: 1.12, opacity: 0.2, ease: "none" }, 0)
      .to("[data-hero-scroll]", { opacity: 0, duration: 0.2, ease: "none" }, 0);
  });

  const handleExplore = () => {
    scrollToSection("#about");
  };

  const handleProjects = () => {
    scrollToSection("#projects");
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center select-none"
    >
      {/* 3D COSMIC PARTICLE VOID */}
      <div data-hero-cosmos className="absolute inset-0 z-0">
        <HeroCosmos />
      </div>

      {/* AMBIENT FOCAL GLOW */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300/[0.03] blur-[140px]"
      />

      {/* TOP & BOTTOM CINEMATIC GRADIENT HORIZONS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10"
      />

      {/* CINEMATIC FRAME TELEMETRY (Subtle environmental coordinate markers) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 select-none z-20"
      >
        <span className="[writing-mode:vertical-lr] rotate-180">SECTOR // 001</span>
        <span className="h-12 w-[1px] bg-zinc-800" />
        <span className="text-[8px] text-zinc-700">VOID_STABLE</span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 select-none z-20"
      >
        <span className="text-[8px] text-zinc-700">GRID // 0x7F</span>
        <span className="h-12 w-[1px] bg-zinc-800" />
        <span className="[writing-mode:vertical-lr]">NODE // 001.ALPHA</span>
      </div>

      {/* PROGRESSIVE IDENTITY CONTENT */}
      <div data-hero-content className="relative z-20 max-w-4xl">
        {/* 1. SMALL SYSTEM IDENTIFIER */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400 sm:text-xs sm:tracking-[0.28em]">
            IDENTITY // 001
          </p>
        </motion.div>

        {/* 2. MAIN MONOLITHIC NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 text-5xl font-bold tracking-[0.04em] text-white sm:text-7xl lg:text-8xl uppercase"
        >
          Himanshu
          <span className="block text-zinc-400 font-light">Shekhar</span>
        </motion.h1>

        {/* 3. DISCIPLINE / SUBTITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-4"
        >
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-zinc-400 sm:text-sm">
            CREATIVE TECHNOLOGIST &amp; CS ENGINEER
          </p>
        </motion.div>

        {/* 4. CONCISE TRUTHFUL STATEMENT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Building purposeful web architectures, interactive digital experiences, and scalable
          software systems where engineering discipline meets creative technology.
        </motion.p>

        {/* 5. CINEMATIC CTAS WITH MAGNETIC ATTRACTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={handleProjects}
              data-cursor="explore"
              className="group relative inline-flex items-center gap-2 rounded-full border border-white bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <span>ENTER THE PROJECT ARCHIVE</span>
              <span className="font-mono text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              onClick={handleExplore}
              data-cursor="view"
              className="rounded-full border border-zinc-700/90 bg-zinc-950/40 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-md transition duration-300 hover:border-white hover:text-white hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              READ THE STORY
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* 6. SCROLL INDICATOR */}
      <motion.button
        onClick={handleExplore}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        data-hero-scroll
        aria-label="Scroll to explore story"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors focus:outline-none sm:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-500">
          Scroll to explore
        </span>

        <div className="relative flex h-10 w-5 justify-center rounded-full border border-zinc-700/80">
          <motion.div
            animate={{
              y: [3, 18, 3],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute top-1.5 h-1.5 w-1 rounded-full bg-white"
          />
        </div>
      </motion.button>
    </section>
  );
}