"use client";

import { motion } from "framer-motion";

import Reveal from "@/components/ui/Reveal";

const directions = [
  ["01", "CURRENTLY EXPLORING", "Full-stack development, AI-assisted application development, and generative AI concepts."],
  ["02", "FUTURE PROJECTS", "More useful digital experiences that bring together interface, data, and thoughtful interaction."],
  ["03", "TECHNOLOGY INTERESTS", "Modern web technologies, LLM concepts, interactive web experiences, and software architecture."],
  ["04", "NEXT CHALLENGES", "Deeper practice with data structures, advanced frontend engineering, and continued experimentation."],
];

export default function Future() {
  return (
    <section id="future" className="min-h-screen scroll-mt-24 border-t border-zinc-900 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">08 — Future</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <h2 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-9xl">Next is a direction, not a destination.</h2>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-400">A realistic view of the subjects, challenges, and experiments I want to keep moving toward.</p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {directions.map(([number, label, description], index) => (
            <Reveal key={number} delay={0.08 + index * 0.08}>
              <motion.article whileHover={{ x: 5 }} className="group border-b border-zinc-800 py-8 sm:py-10">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-sm text-zinc-600">{number}</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</p>
                    <p className="mt-5 max-w-xl text-2xl leading-snug text-zinc-200 transition-colors group-hover:text-white sm:text-3xl">{description}</p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-zinc-800 pt-8 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            <span>Explore</span><span>Build</span><span>Learn</span><span>Repeat</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
