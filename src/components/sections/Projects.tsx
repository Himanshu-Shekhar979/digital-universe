"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { projects, type ProjectRecord } from "@/content/projects";
import Reveal from "@/components/ui/Reveal";
import CaseStudyModal from "@/components/sections/CaseStudyModal";

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectRecord | null>(null);

  return (
    <section id="projects" className="min-h-screen scroll-mt-24 border-t border-zinc-800 px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">04 — Project Archive</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
              Systems I&apos;ve built,
              <span className="block text-zinc-500">studied, and learned from.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              A data-driven project archive focusing on the real problem, architectural decisions,
              concurrency models, and technical trade-offs behind each implementation.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 space-y-8">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={0.1 + index * 0.12}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-black p-8 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-950 hover:shadow-[0_20px_80px_rgba(255,255,255,0.04)] sm:p-12"
              >
                {/* Visual Top Glow */}
                <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-6 text-sm text-zinc-500">
                    <span className="font-mono">{project.number}</span>
                    <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-0.5 text-xs text-zinc-400">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
                    <div>
                      <h3 className="text-4xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                        {project.name}
                      </h3>
                      <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                        {project.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-zinc-800 bg-zinc-900/30 px-3.5 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <dl className="space-y-4 border-l border-zinc-800 pl-6 text-sm leading-relaxed text-zinc-400">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Overview</dt>
                        <dd className="mt-1.5 text-zinc-300">{project.overview}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Architecture</dt>
                        <dd className="mt-1.5 text-zinc-300">{project.architecture}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Key Learning</dt>
                        <dd className="mt-1.5 text-zinc-300">{project.learning}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* ACTION BAR */}
                  <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setActiveCaseStudy(project)}
                        data-cursor="view"
                        className="rounded-full border border-white/80 bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        Explore 11-Stage Case Study →
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
                        >
                          Source Code
                        </a>
                      )}
                    </div>

                    <span className="text-xs font-mono text-zinc-600">
                      {project.year} · {project.category}
                    </span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CASE STUDY MODAL */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}