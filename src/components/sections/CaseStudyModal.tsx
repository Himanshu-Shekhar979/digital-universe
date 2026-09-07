"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectRecord } from "@/content/projects";

interface CaseStudyModalProps {
  project: ProjectRecord | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  // Close on Escape key press
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* MODAL PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-zinc-500">{project.number}</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {project.category} · {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close case study"
                className="rounded-full border border-zinc-800 p-2 text-zinc-400 transition-colors hover:border-zinc-500 hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* SCROLLABLE MODAL BODY */}
            <div className="overflow-y-auto px-6 py-8 sm:px-10">
              {/* TITLE & OVERVIEW */}
              <h2 id="case-study-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {project.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {project.description}
              </p>

              {/* LINKS & FEATURES */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
                  >
                    <span>View Repository</span>
                    <span aria-hidden="true">→</span>
                  </a>
                )}
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-800 bg-black/60 px-3 py-1 text-xs text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* KEY HIGHLIGHTS */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="mt-8 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-400">System Highlights</h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-xs text-zinc-300">
                    {project.keyFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="text-emerald-400" aria-hidden="true">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 11 CASE STUDY STAGES */}
              <div className="mt-12 space-y-10 border-t border-zinc-800 pt-8">
                <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
                  Engineering Deep Dive (11 Stages)
                </h3>

                <div className="space-y-8">
                  {project.caseStudy.map((stage) => (
                    <article
                      key={stage.number}
                      className="border-l-2 border-zinc-800 pl-5 transition-colors hover:border-zinc-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-600">{stage.number}</span>
                        <h4 className="text-base font-semibold uppercase tracking-wider text-white">
                          {stage.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {stage.content}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-6 py-4 sm:px-8">
              <span className="text-xs text-zinc-500">
                Press <kbd className="rounded border border-zinc-800 px-1 py-0.5 font-mono text-[10px] text-zinc-400">Esc</kbd> to close
              </span>
              <button
                onClick={onClose}
                className="rounded-full border border-zinc-700 px-4 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white hover:text-white"
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

