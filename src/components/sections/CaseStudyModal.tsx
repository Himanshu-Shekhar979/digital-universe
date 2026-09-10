"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectRecord } from "@/content/projects";

interface CaseStudyModalProps {
  project: ProjectRecord | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeStageNum, setActiveStageNum] = useState<string>("01");
  const [prevSlug, setPrevSlug] = useState<string | undefined>(project?.slug);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  if (project?.slug !== prevSlug) {
    setPrevSlug(project?.slug);
    setActiveStageNum("01");
  }

  // Close on Escape key press and lock background scrolling
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  const handleStageClick = (num: string) => {
    setActiveStageNum(num);
    const el = document.getElementById(`case-stage-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 lg:p-8"
        >
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* MODAL PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-[0_25px_100px_rgba(0,0,0,0.8)]"
          >
            {/* STICKY MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 py-4 backdrop-blur-md sm:px-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-zinc-400">
                  SYS // {project.number}
                </span>
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                  {project.category} · {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                type="button"
                aria-label="Close case study modal"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* STAGE QUICK NAVIGATION BAR */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/[0.06] bg-black/40 px-6 py-2.5 scrollbar-none sm:px-8">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 mr-1 shrink-0">
                STAGES [11]:
              </span>
              {project.caseStudy.map((stage) => (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => handleStageClick(stage.number)}
                  aria-label={`Jump to stage ${stage.number}: ${stage.title}`}
                  className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none ${
                    activeStageNum === stage.number
                      ? "bg-white text-black font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {stage.number}. {stage.title}
                </button>
              ))}
            </div>

            {/* SCROLLABLE MODAL BODY */}
            <div ref={modalBodyRef} className="overflow-y-auto px-6 py-8 sm:px-10">
              {/* TITLE & OVERVIEW */}
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-400 text-[10px] font-mono uppercase tracking-wider mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status}
                </div>
                <h2 id="case-study-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {project.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
                  {project.description}
                </p>
              </div>

              {/* REPO LINK & TAGS */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
                  >
                    <span>View Repository</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* KEY HIGHLIGHTS */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 backdrop-blur-sm">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    Core Technical Capabilities
                  </h4>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 text-xs text-zinc-300">
                    {project.keyFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-mono text-sm leading-none mt-0.5" aria-hidden="true">✓</span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 11 CASE STUDY STAGES */}
              <div className="mt-12 space-y-8 border-t border-white/[0.08] pt-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                    Engineering Deep Dive (11 Stages)
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-600">
                    STAGES 01 &mdash; 11
                  </span>
                </div>

                <div className="space-y-6">
                  {project.caseStudy.map((stage) => (
                    <article
                      key={stage.number}
                      id={`case-stage-${stage.number}`}
                      className="scroll-mt-4 rounded-lg border border-white/[0.06] bg-black/40 p-5 transition-colors hover:border-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-zinc-500">
                          STAGE // {stage.number}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-zinc-700" />
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                          {stage.title}
                        </h4>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                        {stage.content}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-black/80 px-6 py-4 sm:px-8">
              <span className="text-xs font-mono text-zinc-500">
                Press <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">Esc</kbd> to close
              </span>
              <button
                onClick={onClose}
                type="button"
                className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-xs font-mono text-zinc-200 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
              >
                Close Deep Dive
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


