"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScroll } from "@/components/ui/useGsapScroll";
import HeroCosmos from "@/components/ui/HeroCosmos";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/scroll";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

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
      .to("[data-hero-content]", { yPercent: -14, opacity: 0.65 }, 0)
      .to("[data-hero-glow]", { yPercent: -10, opacity: 0.5 }, 0)
      .to("[data-hero-scroll]", { opacity: 0 }, 0.1);
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      {/* 3D COSMIC PARTICLE ENVIRONMENT */}
      <HeroCosmos />

      {/* AMBIENT BACKGROUND GLOW */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[120px]"
      />

      {/* CONTENT */}
      <div data-hero-content className="relative z-10 max-w-4xl">
        {/* DISCIPLINE / IDENTITY TAG */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400 sm:text-xs sm:tracking-[0.25em]">
            Creative Technologist &amp; CS Engineer
          </p>
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Himanshu Shekhar
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Building purposeful web architectures, interactive experiences, and software systems
          where engineering precision meets creative experimentation.
        </motion.p>

        {/* CTAS WITH MAGNETIC ATTRACTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={handleProjects}
              data-cursor="explore"
              className="rounded-full border border-white bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Explore Projects
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              onClick={handleExplore}
              data-cursor="view"
              className="rounded-full border border-zinc-700 px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-white hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              Read My Story
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.button
        onClick={handleExplore}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        data-hero-scroll
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors focus:outline-none sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">
          Scroll to explore
        </span>

        <div className="relative flex h-11 w-5 justify-center rounded-full border border-zinc-700">
          <motion.div
            animate={{
              y: [3, 20, 3],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute top-1.5 h-2 w-1 rounded-full bg-white"
          />
        </div>
      </motion.button>
    </section>
  );
}