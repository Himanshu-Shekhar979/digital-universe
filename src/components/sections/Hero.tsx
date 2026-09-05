"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { useGsapScroll } from "@/components/ui/useGsapScroll";

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
      .to("[data-hero-content]", { yPercent: -12, opacity: 0.7 }, 0)
      .to("[data-hero-glow]", { yPercent: -8, opacity: 0.7 }, 0)
      .to("[data-hero-scroll]", { opacity: 0 }, 0.1);
  });

  const handleExplore = () => {
    const aboutSection = document.querySelector("#about");

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      
      {/* BACKGROUND GLOW */}
      <div data-hero-glow className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      {/* CONTENT */}
      <div data-hero-content className="relative z-10">
        
        {/* LABEL */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-sm uppercase tracking-[0.4em] text-zinc-500"
        >
          Welcome To
        </motion.p>

        {/* MAIN HEADING */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          My Digital Universe
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut",
          }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Explore my projects, skills, experience, and the technology behind my
          journey.
        </motion.p>

        {/* BUTTON */}
        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleExplore}
          className="mt-10 rounded-full border border-zinc-700 px-7 py-3 text-sm transition duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          Explore
        </motion.button>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.3,
          duration: 0.8,
        }}
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
          Scroll
        </span>

        {/* MOUSE SHAPE */}
        <div className="relative flex h-12 w-6 justify-center rounded-full border border-zinc-600">
          
          {/* MOVING DOT */}
          <motion.div
            animate={{
              y: [4, 26, 4],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute top-1 h-2 w-1.5 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}