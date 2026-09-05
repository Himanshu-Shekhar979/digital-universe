"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-black text-white"
    >
      <SmoothScroll />

      {/* ================= AMBIENT UNIVERSE BACKGROUND ================= */}
      <UniverseBackground />

      {/* ================= INTERACTIVE CURSOR SPOTLIGHT ================= */}
      <CursorSpotlight />

      <AnimatePresence mode="wait">
        {!entered ? (
          /* ================= INTRO SCREEN ================= */
          <motion.section
            key="intro"
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.03,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
          >
            {/* INTRO BACKGROUND GLOW */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

            {/* INTRO CONTENT */}
            <div className="relative z-10">
              {/* LABEL */}
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
                  duration: 0.7,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400"
              >
                Digital Universe
              </motion.p>

              {/* NAME */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
              >
                Himanshu
                <br />
                Shekhar
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
                  duration: 0.7,
                  delay: 0.7,
                  ease: "easeOut",
                }}
                className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
              >
                A digital space exploring technology, creativity, design,
                and interactive experiences.
              </motion.p>

              {/* ENTER BUTTON */}
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
                  duration: 0.7,
                  delay: 1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setEntered(true)}
                className="mt-8 rounded-full border border-zinc-700 px-6 py-3 text-sm transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Enter Experience
              </motion.button>
            </div>

            {/* BOTTOM INDICATOR */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.5,
                duration: 0.8,
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Enter to begin
              </span>
            </motion.div>
          </motion.section>
        ) : (
          /* ================= MAIN PORTFOLIO ================= */
          <motion.div
            key="portfolio"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-10"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}