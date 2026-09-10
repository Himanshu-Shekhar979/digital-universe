"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { scrollToSection } from "@/lib/scroll";
import {
  futureVectors,
  futureFilters,
  futureHorizonMeta,
  type FutureCategory,
  type FutureVector,
} from "@/content/future";

export default function Future() {
  const [activeFilter, setActiveFilter] = useState<FutureCategory>("All");

  const filteredVectors = futureVectors.filter((vector) => {
    if (activeFilter === "All") return true;
    return vector.category === activeFilter;
  });

  const getCategoryBadgeStyle = (category: FutureVector["category"]) => {
    switch (category) {
      case "Real-Time Systems":
        return "border-cyan-500/30 bg-cyan-500/[0.05] text-cyan-300";
      case "AI Workflows":
        return "border-purple-500/30 bg-purple-500/[0.05] text-purple-300";
      case "Interactive Systems":
        return "border-indigo-500/30 bg-indigo-500/[0.05] text-indigo-300";
      case "Core Engineering":
        return "border-blue-500/30 bg-blue-500/[0.05] text-blue-400";
      default:
        return "border-zinc-700 bg-zinc-800 text-zinc-400";
    }
  };

  return (
    <section
      id="future"
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-black px-6 py-32 text-white"
      aria-label="World 08: Future — Forward Trajectory and Next Horizons"
    >
      {/* Top transition receiving World 07 (Journey) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-zinc-950/40 to-transparent z-10"
      />

      {/* Bottom transition into World 09 (Transmission) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-zinc-950/40 to-transparent z-10"
      />

      {/* Ambient glowing fields (contained within overflow-hidden) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[640px] h-[480px] rounded-full bg-indigo-500/[0.015] blur-[150px]" />
        <div className="absolute bottom-1/4 right-10 w-[520px] h-[440px] rounded-full bg-cyan-500/[0.015] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ================= TELEMETRY HEADER ================= */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.03] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>WORLD 08 // FUTURE</span>
            </div>

            <span className="font-mono text-xs text-zinc-500">
              OPEN HORIZON // TRAJECTORY & NEXT VECTORS
            </span>
          </div>
        </Reveal>

        {/* ================= TITLE & SUBTITLE ================= */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Next is a direction,
              <span className="block text-zinc-500">not a destination.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {futureHorizonMeta.tagline}
            </p>

            {/* Current Position Grounding Callout */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.01] px-4 py-2 font-mono text-xs text-zinc-400">
              <span className="text-indigo-400 font-semibold">BASE //</span>
              <span>{futureHorizonMeta.currentBaseline}</span>
            </div>
          </div>
        </Reveal>

        {/* ================= VECTOR FILTERS ================= */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {futureFilters.map((filter) => {
            const count =
              filter === "All"
                ? futureVectors.length
                : futureVectors.filter((v) => v.category === filter).length;
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400/50 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`ml-1.5 text-[10px] ${
                    isActive ? "text-zinc-600" : "text-zinc-500"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= VECTOR CARDS GRID ================= */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredVectors.map((vector) => (
              <motion.article
                key={vector.id}
                layout="position"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-black/40 p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]"
              >
                <div>
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between gap-3 font-mono text-xs">
                    <span className="font-semibold text-zinc-500">{vector.code}</span>
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getCategoryBadgeStyle(
                        vector.category
                      )}`}
                    >
                      {vector.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-5">
                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl group-hover:text-indigo-200 transition-colors">
                      {vector.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-zinc-400">{vector.tagline}</p>
                  </div>

                  {/* Structured Exploration Dimensions */}
                  <div className="mt-6 space-y-4 font-mono text-xs">
                    {/* Dimension 1: Currently Exploring */}
                    <div className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-3.5">
                      <span className="text-[10px] uppercase tracking-wider text-indigo-400 block mb-1">
                        Currently Exploring:
                      </span>
                      <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                        {vector.currentlyExploring}
                      </p>
                    </div>

                    {/* Dimension 2: What I Want to Build */}
                    <div className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-3.5">
                      <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1">
                        What I Want to Build:
                      </span>
                      <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                        {vector.whatIWantToBuild}
                      </p>
                    </div>

                    {/* Dimension 3: Next Challenge */}
                    <div className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-3.5">
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 block mb-1">
                        Next Challenge:
                      </span>
                      <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                        {vector.nextChallenge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Topics Footer */}
                <div className="mt-6 border-t border-white/[0.06] pt-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mr-1">
                      Topics:
                    </span>
                    {vector.keyTopics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* ================= OPEN HORIZON GATEWAY (TRANSITION TO TRANSMISSION) ================= */}
        <Reveal delay={0.2}>
          <div className="mt-16 rounded-xl border border-white/[0.08] bg-black/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 block">
                  OPEN HORIZON // COLLABORATIVE TRAJECTORY
                </span>
                <p className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {futureHorizonMeta.closingSignal}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-mono">
                  Bridging forward from continuous learning into shared engineering execution.
                </p>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Initiate Transmission</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-500">
              <span>STATUS // 4 FORWARD VECTORS MAPPED · ACTIVE LEARNING HORIZON</span>
              <span>CONVERGING TOWARD WORLD 09 (TRANSMISSION)</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
