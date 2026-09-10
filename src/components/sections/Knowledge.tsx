"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import {
  knowledgeDomains,
  depthDefinitions,
  depthClarification,
  type KnowledgeCategory,
  type KnowledgeDomain,
} from "@/content/knowledge";

const categories: KnowledgeCategory[] = [
  "All",
  "Computer Science",
  "Web Platforms",
  "Systems & Data",
  "Emerging AI",
];

function DomainCard({
  domain,
  isExpanded,
  onToggle,
}: {
  domain: KnowledgeDomain;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const contentId = useId();
  const depthMeta = depthDefinitions[domain.depth];

  return (
    <motion.article
      layout="position"
      className={`group relative flex flex-col justify-between rounded-xl border transition-all duration-300 ${
        isExpanded
          ? "border-emerald-500/40 bg-white/[0.03] shadow-[0_0_20px_rgba(16,185,129,0.06)]"
          : "border-white/[0.08] bg-black/40 hover:border-white/20 hover:bg-white/[0.02]"
      } p-6 sm:p-7`}
    >
      <div>
        {/* Header Telemetry & Depth Badge */}
        <div className="flex items-center justify-between gap-2 font-mono text-xs">
          <span className="font-semibold text-zinc-500">SYS // {domain.number}</span>
          <span
            className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${depthMeta.color}`}
          >
            {depthMeta.label}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-5">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-200 transition-colors">
            {domain.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-zinc-400">{domain.tagline}</p>
          <p className="mt-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
            {domain.description}
          </p>
        </div>

        {/* Applied Context Callout */}
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-black/50 p-2.5 font-mono text-[11px] text-zinc-400">
          <span className="text-[9px] uppercase tracking-wider text-emerald-400/90 block mb-0.5">
            Context / Application:
          </span>
          <span className="text-zinc-300">{domain.appliedContext}</span>
        </div>

        {/* Expandable Concept Topology */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={contentId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Academic Anchor */}
              <div className="mt-5 border-t border-white/[0.06] pt-4 font-mono text-[11px]">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                  Academic / Practical Anchor:
                </span>
                <span className="text-zinc-400">{domain.academicAnchor}</span>
              </div>

              {/* Core Concepts List */}
              <div className="mt-4 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block">
                  Core Concepts & Patterns:
                </span>
                {domain.coreConcepts.map((concept, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="text-emerald-400 font-mono text-sm leading-none mt-0.5">
                      ›
                    </span>
                    <span>{concept}</span>
                  </div>
                ))}
              </div>

              {/* Key Topics Breakdown */}
              <div className="mt-4 border-t border-white/[0.06] pt-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-2">
                  Topic Focus:
                </span>
                <div className="space-y-1.5">
                  {domain.keyTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="rounded border border-white/[0.04] bg-white/[0.01] p-2 text-xs"
                    >
                      <span className="font-mono text-[11px] text-emerald-300 font-medium">
                        {topic.name}:
                      </span>{" "}
                      <span className="text-zinc-400 text-[11px]">{topic.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accordion Toggle Trigger */}
      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <button
          onClick={onToggle}
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="w-full flex items-center justify-between font-mono text-xs text-zinc-400 hover:text-emerald-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded py-1"
        >
          <span>{isExpanded ? "Collapse Details" : "Explore Domain Concepts"}</span>
          <span
            className={`transition-transform duration-200 font-mono text-sm ${
              isExpanded ? "rotate-180 text-emerald-400" : "text-zinc-500"
            }`}
          >
            ▾
          </span>
        </button>
      </div>
    </motion.article>
  );
}

export default function Knowledge() {
  const [activeCategory, setActiveCategory] = useState<KnowledgeCategory>("All");
  const [expandedDomainIds, setExpandedDomainIds] = useState<Set<string>>(new Set());

  const filteredDomains =
    activeCategory === "All"
      ? knowledgeDomains
      : knowledgeDomains.filter((d) => d.category === activeCategory);

  const toggleDomain = (id: string) => {
    setExpandedDomainIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="knowledge"
      aria-label="World 06 Knowledge System"
      className="relative min-h-screen scroll-mt-24 px-6 py-28 text-white overflow-hidden"
    >
      {/* ================= ATMOSPHERIC HORIZON BLENDS ================= */}
      {/* Top transition from World 05 (Warm Obsidian -> Cold Technical Emerald) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-zinc-950/40 to-transparent"
      />

      {/* Contained ambient aura */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[480px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-1/4 right-10 w-[520px] h-[420px] rounded-full bg-cyan-500/[0.015] blur-[140px]" />
      </div>

      {/* Bottom transition into World 07 (Journey) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-zinc-950/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ================= TELEMETRY HEADER ================= */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WORLD 06 // KNOWLEDGE SYSTEM</span>
            </div>

            <span className="font-mono text-xs text-zinc-500">
              SYSTEM ATLAS // COGNITIVE ARCHITECTURE
            </span>
          </div>
        </Reveal>

        {/* ================= TITLE & MANIFESTO ================= */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              An honest map of
              <span className="block text-zinc-500">what I study, build, and practice.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              A structured overview of core computer science foundations, applied web and real-time systems, and
              emerging technologies under active exploration. Not an inflated claim of total mastery, but a living map
              of continuous learning.
            </p>
          </div>
        </Reveal>

        {/* ================= CATEGORY FILTERS ================= */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? knowledgeDomains.length
                : knowledgeDomains.filter((d) => d.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`ml-2 text-[10px] ${
                    isActive ? "text-zinc-600" : "text-zinc-500"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= DOMAIN CARDS GRID ================= */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {filteredDomains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              isExpanded={expandedDomainIds.has(domain.id)}
              onToggle={() => toggleDomain(domain.id)}
            />
          ))}
        </div>

        {/* ================= COGNITIVE DEPTH LEGEND & ETHOS FOOTER ================= */}
        <Reveal delay={0.2}>
          <div className="mt-16 rounded-xl border border-white/[0.08] bg-black/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                Cognitive Depth Taxonomy
              </span>
              <p className="font-mono text-xs italic text-zinc-400">
                &ldquo;{depthClarification}&rdquo;
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
              {Object.entries(depthDefinitions).map(([key, meta]) => (
                <div key={key} className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-3.5">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${meta.color} mb-2`}>
                    {meta.label}
                  </span>
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                    {meta.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-500">
              <span>STATUS // 8 DOMAINS MAPPED · LIVING KNOWLEDGE REPOSITORY</span>
              <span>GROUNDED IN B.TECH CSE CURRICULUM & APPLIED PROJECTS</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
