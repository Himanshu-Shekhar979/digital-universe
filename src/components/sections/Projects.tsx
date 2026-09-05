"use client";

import { motion } from "framer-motion";

import { projects } from "@/content/projects";
import Reveal from "@/components/ui/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen scroll-mt-24 border-t border-zinc-800 px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal><p className="text-sm uppercase tracking-[0.3em] text-zinc-500">04 — Project Archive</p></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">Systems I&apos;ve built,<span className="block text-zinc-500">studied, and learned from.</span></h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">A project archive focused on the work, the questions behind it, and the technical practice it made possible.</p>
          </div>
        </Reveal>

        <div className="mt-20 space-y-6">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={0.1 + index * 0.12}>
              <motion.article whileHover={{ y: -8, scale: 1.005 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group relative overflow-hidden border border-zinc-800 bg-black p-8 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-950 hover:shadow-[0_20px_80px_rgba(255,255,255,0.04)] sm:p-12">
                <div className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-6 text-sm text-zinc-500"><span className="font-mono">{project.number}</span><span>{project.status}</span></div>
                  <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
                    <div>
                      <h3 className="text-4xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-6xl">{project.name}</h3>
                      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">{project.description}</p>
                      <div className="mt-8 flex flex-wrap gap-3">{project.tags.map(tag => <span key={tag} className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white">{tag}</span>)}</div>
                    </div>
                    <dl className="space-y-5 border-l border-zinc-800 pl-6 text-sm leading-relaxed text-zinc-400">
                      <div><dt className="text-xs uppercase tracking-[0.2em] text-zinc-600">Overview</dt><dd className="mt-2">{project.overview}</dd></div>
                      <div><dt className="text-xs uppercase tracking-[0.2em] text-zinc-600">Technology</dt><dd className="mt-2">{project.technology}</dd></div>
                      <div><dt className="text-xs uppercase tracking-[0.2em] text-zinc-600">Learning</dt><dd className="mt-2">{project.learning}</dd></div>
                    </dl>
                  </div>
                  <div className="mt-12 flex items-center justify-between border-t border-zinc-900 pt-6">
                    <span className="text-sm text-zinc-600">{project.githubUrl ? "View source" : "Archive note"}</span>
                    {project.githubUrl ? <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ x: 6, scale: 1.1 }} aria-label={`View ${project.name} on GitHub`} className="text-lg text-zinc-500 transition-colors hover:text-white">→</motion.a> : <span className="text-zinc-700" aria-hidden="true">—</span>}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}