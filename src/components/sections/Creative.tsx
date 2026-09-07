"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Reveal from "@/components/ui/Reveal";

const creativeFields = [
  {
    number: "01",
    label: "Photography",
    title: "Frames for observation.",
    aspect: "4:5 Portrait",
    ratioClass: "aspect-[4/5]",
    description: "A study of natural light, negative space, geometric framing, and architectural texture.",
    details: "Focusing on composition balance, high tonal contrast, and structural minimalism.",
  },
  {
    number: "02",
    label: "Film & Video",
    title: "Sequences in motion.",
    aspect: "2.39:1 Anamorphic",
    ratioClass: "aspect-[2.39/1]",
    description: "Exploring cinematic continuity, optical pacing, and how sound and cuts shape tension.",
    details: "Pacing studies evaluating narrative rhythm, transition economy, and spatial continuity.",
  },
  {
    number: "03",
    label: "Motion & Animation",
    title: "Movement with intention.",
    aspect: "16:9 Widescreen",
    ratioClass: "aspect-[16/9]",
    description: "Micro-interactions and timing curves where movement acts as semantic interface communication.",
    details: "Crafting cubic-bezier curves, spring dynamics, and accessible choreography.",
  },
  {
    number: "04",
    label: "Visual Experiments",
    title: "A wider canvas for ideas.",
    aspect: "1:1 Square Canvas",
    ratioClass: "aspect-square",
    description: "Generative shader studies and algorithmic canvas experiments testing design outside standard UI.",
    details: "Exploring mathematical tessellations, procedural gradients, and noise fields.",
  },
];

export default function Creative() {
  const [selectedField, setSelectedField] = useState<(typeof creativeFields)[number] | null>(null);

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
              A visual exploration space for photography, film framing, motion design, and algorithmic graphics.
              Studying how visual discipline elevates software craftsmanship.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {creativeFields.map((field, index) => (
            <Reveal key={field.number} delay={0.1 + index * 0.08}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-black p-8 transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-950 sm:p-10"
              >
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />

                <div>
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-sm text-zinc-600">{field.number}</span>
                    <span className="rounded border border-zinc-800 px-2 py-0.5 text-right font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {field.aspect}
                    </span>
                  </div>

                  {/* FRAME PREVIEW CONTAINER */}
                  <div className="mt-8 overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4 transition-colors group-hover:border-zinc-700">
                    <div
                      className={`w-full max-h-40 ${field.ratioClass} rounded border border-dashed border-zinc-700/60 bg-gradient-to-br from-white/[0.03] to-transparent flex items-center justify-center`}
                    >
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
                        Frame Template · {field.aspect}
                      </span>
                    </div>
                  </div>

                  <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">{field.label}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                    {field.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                    {field.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-zinc-900 pt-5">
                  <button
                    onClick={() => setSelectedField(field)}
                    data-cursor="view"
                    className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Inspect Composition Spec</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-16 max-w-2xl border-t border-zinc-800 pt-8 text-sm leading-relaxed text-zinc-500">
            Truthful notice: Personal visual media is organized as an ongoing creative laboratory.
            This architecture defines the standards, aspect ratios, and principles behind upcoming releases.
          </p>
        </Reveal>
      </div>

      {/* INSPECTION MODAL */}
      <AnimatePresence>
        {selectedField && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedField(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="font-mono text-xs text-zinc-500">{selectedField.number} · {selectedField.label}</span>
                <button
                  onClick={() => setSelectedField(null)}
                  className="text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h4 className="mt-6 text-2xl font-bold text-white">{selectedField.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{selectedField.description}</p>
              <p className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-xs font-mono leading-relaxed text-zinc-300">
                {selectedField.details}
              </p>

              <button
                onClick={() => setSelectedField(null)}
                className="mt-6 w-full rounded-full border border-zinc-700 py-2.5 text-xs text-zinc-300 hover:border-white hover:text-white transition-colors"
              >
                Close Specification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
