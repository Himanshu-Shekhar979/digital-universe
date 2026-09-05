"use client";

import { motion } from "framer-motion";

import Reveal from "@/components/ui/Reveal";

const domains = [
  ["01", "Computer Science", "Foundations", "Academic foundations that continue to shape the way I approach problems."],
  ["02", "Web Development", "Building", "Creating responsive interfaces and learning how the web works as a medium."],
  ["03", "Full Stack", "Learning", "Working with React, Node.js, Express.js, and MongoDB across complete application ideas."],
  ["04", "Artificial Intelligence", "Exploring", "Exploring AI-assisted development, generative AI, and LLM concepts."],
  ["05", "Machine Learning", "Foundations", "Building a foundational understanding of machine learning concepts."],
  ["06", "Operating Systems", "Learning", "Continuing the academic and practical study of how software runs on systems."],
  ["07", "Networking", "Foundations", "Learning the principles that let systems communicate reliably."],
  ["08", "DBMS", "Working Knowledge", "Developing a clearer understanding of data, persistence, and database systems."],
] as const;

export default function Knowledge() {
  return (
    <section id="knowledge" className="min-h-screen scroll-mt-24 border-t border-zinc-900 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">06 — Knowledge System</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
              A map of what
              <span className="block text-zinc-500">I&apos;m learning.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Not a ranking system. A living map of foundations, working knowledge, and the directions I am continuing to explore.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-1/2 hidden h-px w-2/3 -translate-x-1/2 bg-zinc-800 lg:block" />
          <div className="grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map(([number, name, status, description], index) => (
              <Reveal key={number} delay={0.06 + index * 0.04}>
                <motion.article whileHover={{ y: -4 }} className="group relative h-full bg-black p-6 transition-colors duration-300 hover:bg-zinc-950 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-600">{number}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 group-hover:text-zinc-400">{status}</span>
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold tracking-tight">{name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
