"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import {
  journeyMilestones,
  journeyFilters,
  type JourneyFilter,
  type JourneyMilestone,
} from "@/content/journey";

export default function Journey() {
  const [activeFilter, setActiveFilter] = useState<JourneyFilter>("All");

  const filteredMilestones = journeyMilestones.filter((milestone) => {
    if (activeFilter === "All") return true;
    return milestone.filterCategory === activeFilter;
  });

  const getKindBadgeStyle = (kind: JourneyMilestone["kind"]) => {
    switch (kind) {
      case "Education":
        return "border-blue-500/30 bg-blue-500/[0.05] text-blue-400";
      case "Training":
        return "border-amber-500/30 bg-amber-500/[0.05] text-amber-400";
      case "Experience":
        return "border-emerald-500/30 bg-emerald-500/[0.05] text-emerald-400";
      case "Projects":
        return "border-cyan-500/30 bg-cyan-500/[0.05] text-cyan-300";
      case "Exploration":
        return "border-purple-500/30 bg-purple-500/[0.05] text-purple-300";
      case "Current":
        return "border-emerald-400/40 bg-emerald-500/[0.08] text-emerald-300";
      default:
        return "border-zinc-700 bg-zinc-800 text-zinc-400";
    }
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-black px-6 py-32 text-white"
      aria-label="World 07: Journey — Chronological Trajectory and Milestones"
    >
      {/* Top transition receiving World 06 (Knowledge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-zinc-950/40 to-transparent z-10"
      />

      {/* Bottom transition into World 08 (Future) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-zinc-950/40 to-transparent z-10"
      />

      {/* Ambient glowing fields (contained within overflow-hidden) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[540px] h-[440px] rounded-full bg-cyan-500/[0.015] blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[420px] rounded-full bg-slate-400/[0.018] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ================= TELEMETRY HEADER ================= */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.03] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>WORLD 07 // JOURNEY</span>
            </div>

            <span className="font-mono text-xs text-zinc-500">
              CHRONOLOGICAL TRAJECTORY // 2019 — PRESENT
            </span>
          </div>
        </Reveal>

        {/* ================= TITLE & SUBTITLE ================= */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Learning is the
              <span className="block text-zinc-500">through-line.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              A chronological record of academic foundations, deliberate training, practical
              experience, and applied projects that connect my early beginnings to current engineering
              practice.
            </p>
          </div>
        </Reveal>

        {/* ================= STREAM FILTERS ================= */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {journeyFilters.map((filter) => {
            const count =
              filter === "All"
                ? journeyMilestones.length
                : journeyMilestones.filter((m) => m.filterCategory === filter).length;
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 ${
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

        {/* ================= CHRONOLOGICAL TIMELINE ================= */}
        <div className="relative mt-16 pl-6 sm:pl-10">
          {/* Continuous vertical timeline rail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-2 sm:left-3 top-3 bottom-4 w-[1px] bg-gradient-to-b from-cyan-400/60 via-zinc-800 to-emerald-400/60"
          />

          <ol className="space-y-10 sm:space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredMilestones.map((milestone) => (
                <motion.li
                  key={milestone.id}
                  layout="position"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Timeline Rail Node Marker */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[27px] sm:-left-[39px] top-6 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border bg-black transition-colors ${
                      milestone.isCurrent
                        ? "border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                        : "border-zinc-600 group-hover:border-zinc-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        milestone.isCurrent
                          ? "bg-emerald-400 animate-ping"
                          : "bg-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Milestone Card */}
                  <article
                    className={`group rounded-xl border p-6 sm:p-7 transition-all duration-300 ${
                      milestone.isCurrent
                        ? "border-emerald-500/30 bg-emerald-950/[0.04] shadow-[0_0_24px_rgba(16,185,129,0.05)]"
                        : "border-white/[0.08] bg-black/40 hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Milestone Top Metadata Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                          {milestone.period}
                        </span>
                        <span
                          className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getKindBadgeStyle(
                            milestone.kind
                          )}`}
                        >
                          {milestone.kind}
                        </span>
                      </div>

                      <span className="text-[11px] text-zinc-500">
                        {milestone.institutionOrContext}
                      </span>
                    </div>

                    {/* Milestone Heading & Description */}
                    <div className="mt-4">
                      <h3
                        className={`text-xl font-bold tracking-tight sm:text-2xl transition-colors ${
                          milestone.isCurrent
                            ? "text-emerald-100"
                            : "text-zinc-100 group-hover:text-white"
                        }`}
                      >
                        {milestone.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Highlight Tags */}
                    {milestone.highlights.length > 0 && (
                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mr-1">
                          Focus:
                        </span>
                        {milestone.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>

        {/* ================= TELEMETRY FOOTER ================= */}
        <Reveal delay={0.2}>
          <div className="mt-20 rounded-xl border border-white/[0.08] bg-black/60 p-6 sm:p-7 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
              <span className="text-zinc-400">
                STATUS // 8 MILESTONES DOCUMENTED · CONTINUOUS LEARNING TRAJECTORY
              </span>
              <span className="text-zinc-500">
                BRIDGING INTO WORLD 08 // FUTURE DIRECTION
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
