"use client";

import { motion } from "framer-motion";

import Reveal from "@/components/ui/Reveal";

const creativeFields = [
  {
    number: "01",
    label: "Photography",
    title: "Frames for observation.",
    description: "A place for studying light, composition, and the details that make a moment feel present.",
  },
  {
    number: "02",
    label: "Film & Video",
    title: "Sequences in motion.",
    description: "Exploring how pacing, transition, and visual continuity can shape a feeling or idea.",
  },
  {
    number: "03",
    label: "Motion & Animation",
    title: "Movement with intention.",
    description: "Small visual studies where timing and movement become part of the interface language.",
  },
  {
    number: "04",
    label: "Visual Experiments",
    title: "A wider canvas for ideas.",
    description: "Clearly marked creative experiments for testing visual systems outside conventional software work.",
  },
];

export default function Creative() {
  return (
    <section id="creative" className="min-h-screen scroll-mt-24 border-t border-zinc-900 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">05 — Creative Universe</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
              Beyond the
              <span className="block text-zinc-500">interface.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              A visual exploration space for photography, film, motion, animation, and ideas that are still becoming.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {creativeFields.map((field, index) => (
            <Reveal key={field.number} delay={0.1 + index * 0.08}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative min-h-72 overflow-hidden border border-zinc-800 bg-black p-8 transition-colors duration-300 hover:bg-zinc-950 sm:p-10"
              >
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
                <div className="relative flex h-full flex-col justify-between gap-16">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-sm text-zinc-600">{field.number}</span>
                    <span className="text-right text-xs uppercase tracking-[0.2em] text-zinc-600">Creative experiment</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{field.label}</p>
                    <h3 className="mt-5 text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">{field.title}</h3>
                    <p className="mt-5 max-w-md leading-relaxed text-zinc-400">{field.description}</p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-16 max-w-2xl border-t border-zinc-800 pt-8 text-sm leading-relaxed text-zinc-500">
            No personal media is presented here as finished work yet. This is the architecture for future visual explorations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
