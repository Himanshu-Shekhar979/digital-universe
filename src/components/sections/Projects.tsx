"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { projects, type ProjectRecord } from "@/content/projects";
import Reveal from "@/components/ui/Reveal";
import CaseStudyModal from "@/components/sections/CaseStudyModal";

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectRecord | null>(null);
  const reduceMotion = useReducedMotion();

  // Flagship project is index 0 (CollabCode AI); secondary project is index 1 (Web Engineering Archive)
  const flagshipProject = projects[0];
  const secondaryProject = projects[1];

  return (
    <section
      id="projects"
      aria-label="World 04: Project Archive — Professional Engineering Proof"
      className="relative min-h-screen scroll-mt-24 border-t border-white/[0.06] bg-black px-6 py-28 sm:py-36 text-white overflow-hidden"
    >
      {/* Top atmospheric horizon blend */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/90 to-transparent z-10" />

      {/* Bottom atmospheric horizon blend */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Ambient Spatial Lighting (contained to prevent horizontal overflow) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-[90vw] h-[400px] bg-slate-400/[0.018] blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] max-w-[80vw] h-[300px] bg-zinc-300/[0.012] blur-[120px] rounded-full" />
      </div>

      {/* Frame telemetry markers */}
      <div className="pointer-events-none absolute left-6 top-8 hidden lg:block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700/60 select-none">
        SEC // 004 [ARCHIVE_STABLE]
      </div>
      <div className="pointer-events-none absolute right-6 top-8 hidden lg:block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700/60 select-none">
        NODE // REPOSITORIES_VERIFIED
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header telemetry badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              WORLD 04 // PROJECT ARCHIVE
            </span>
          </div>
        </Reveal>

        {/* Dual-tone monolithic headline */}
        <Reveal delay={0.08}>
          <div className="max-w-4xl">
            <h2 className="text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block font-medium text-white tracking-tighter">SYSTEMS I&apos;VE BUILT,</span>
              <span className="block text-zinc-500 font-light mt-1">STUDIED, AND LEARNED FROM.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
              A data-driven engineering archive focusing on problem formulation, architectural decisions,
              concurrency models, and technical trade-offs behind each implementation.
            </p>
          </div>
        </Reveal>

        {/* ================= TIER 1: FLAGSHIP PROJECT (CollabCode AI) ================= */}
        {flagshipProject && (
          <div className="mt-16 sm:mt-20">
            <Reveal delay={0.12}>
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.018] p-6 sm:p-10 lg:p-12 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.03]"
              >
                {/* Subtle top edge luminous accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="relative z-10">
                  {/* Flagship status header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {flagshipProject.status}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 font-semibold">SYS // {flagshipProject.number}</span>
                    </div>

                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                      {flagshipProject.category} · {flagshipProject.year}
                    </span>
                  </div>

                  {/* Title & Core Overview */}
                  <div className="mt-8">
                    <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {flagshipProject.name}
                    </h3>
                    <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-300">
                      {flagshipProject.description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {flagshipProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-black/60 px-3 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* INLINE DUAL-CHANNEL ARCHITECTURE BLUEPRINT */}
                  <div className="mt-10 rounded-xl border border-white/[0.08] bg-black/70 p-5 sm:p-7 backdrop-blur-sm">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono">
                      <span className="text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        System Architecture Blueprint: Dual-Channel Decoupling
                      </span>
                      <span className="hidden sm:inline text-zinc-500 text-[10px]">
                        HTTP REST ↔ WEBSOCKET DUPLEX
                      </span>
                    </div>

                    {/* Architectural pipeline schema */}
                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      {/* Channel A: HTTP REST */}
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-4 font-mono text-xs">
                        <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/[0.04]">
                          <span className="text-white font-semibold">CHANNEL A // HTTP REST</span>
                          <span className="text-[10px] text-zinc-500">STATE PERSISTENCE</span>
                        </div>
                        <p className="mt-2.5 text-zinc-400 text-[11px] leading-relaxed">
                          Node.js & Express REST API handlers governing account lifecycle, JSON Web Token (JWT) verification, Role-Based Access Control (RBAC), and MongoDB workspace persistence.
                        </p>
                      </div>

                      {/* Channel B: WebSocket Duplex */}
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-4 font-mono text-xs">
                        <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/[0.04]">
                          <span className="text-white font-semibold">CHANNEL B // WEBSOCKET DUPLEX</span>
                          <span className="text-[10px] text-zinc-500">SYNCHRONOUS PIPELINE</span>
                        </div>
                        <p className="mt-2.5 text-zinc-400 text-[11px] leading-relaxed">
                          Socket.IO multi-client event broadcasting managing real-time document synchronization across virtual rooms and dispatching integrated AI prompt analysis requests.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* STRUCTURED PROOF MATRIX: PROBLEM → ARCHITECTURE → PROCESS → LEARNING */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">01 // Problem</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {flagshipProject.problem}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">02 // Architecture</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {flagshipProject.architecture}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">03 // Implementation</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {flagshipProject.process}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">04 // Key Learning</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {flagshipProject.learning}
                      </p>
                    </div>
                  </div>

                  {/* KEY CAPABILITIES */}
                  {flagshipProject.keyFeatures && flagshipProject.keyFeatures.length > 0 && (
                    <div className="mt-8 border-t border-white/[0.06] pt-6">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
                        Verified Technical Capabilities
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 text-xs text-zinc-300">
                        {flagshipProject.keyFeatures.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-sm leading-none mt-0.5" aria-hidden="true">✓</span>
                            <span className="leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACTION BAR */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveCaseStudy(flagshipProject)}
                        type="button"
                        data-cursor="view"
                        className="rounded-full border border-white bg-white px-6 py-2.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
                      >
                        Explore 11-Stage Case Study →
                      </button>

                      {flagshipProject.githubUrl && (
                        <a
                          href={flagshipProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View CollabCode AI repository on GitHub"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
                        >
                          <span>Source Code</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>

                    <span className="font-mono text-xs text-zinc-500">
                      FLAGSHIP SYSTEM · DUAL-CHANNEL CLIENT-SERVER
                    </span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          </div>
        )}

        {/* ================= TIER 2: SECONDARY PROJECT (Web Engineering Archive) ================= */}
        {secondaryProject && (
          <div className="mt-12 sm:mt-16">
            <Reveal delay={0.18}>
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.025]"
              >
                <div className="relative z-10">
                  {/* Secondary status header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                        {secondaryProject.status}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 font-semibold">SYS // {secondaryProject.number}</span>
                    </div>

                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                      {secondaryProject.category} · {secondaryProject.year}
                    </span>
                  </div>

                  {/* Title & Core Overview */}
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {secondaryProject.name}
                    </h3>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
                      {secondaryProject.description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {secondaryProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-black/60 px-3 py-1 font-mono text-xs text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* STRUCTURED PROOF MATRIX: PROBLEM → SOLUTION → ARCHITECTURE → LEARNING */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 font-mono text-xs">
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">01 // Problem</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {secondaryProject.problem}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">02 // Architecture</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {secondaryProject.architecture}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 sm:col-span-2 lg:col-span-1">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">03 // Key Learning</div>
                      <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-[13px]">
                        {secondaryProject.learning}
                      </p>
                    </div>
                  </div>

                  {/* KEY CAPABILITIES */}
                  {secondaryProject.keyFeatures && secondaryProject.keyFeatures.length > 0 && (
                    <div className="mt-8 border-t border-white/[0.06] pt-6">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
                        Platform Engineering Highlights
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 text-xs text-zinc-300">
                        {secondaryProject.keyFeatures.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-sm leading-none mt-0.5" aria-hidden="true">✓</span>
                            <span className="leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACTION BAR */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveCaseStudy(secondaryProject)}
                        type="button"
                        data-cursor="view"
                        className="rounded-full border border-white bg-white px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
                      >
                        Explore 11-Stage Case Study →
                      </button>

                      {secondaryProject.githubUrl && (
                        <a
                          href={secondaryProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Web Engineering Archive on GitHub"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
                        >
                          <span>Repository</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>

                    <span className="font-mono text-xs text-zinc-500">
                      SYSTEM COLLECTION · CORE WEB PLATFORM
                    </span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          </div>
        )}

        {/* Status Telemetry Footer */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>ARCHIVE STATUS // 2 REPOSITORIES VERIFIED</span>
            </div>
            <span>REPRESENTING REAL ARCHITECTURES & APPLIED IMPLEMENTATIONS</span>
          </div>
        </Reveal>
      </div>

      {/* 11-STAGE CASE STUDY MODAL */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}