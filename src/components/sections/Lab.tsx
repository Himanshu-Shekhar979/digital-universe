"use client";

import { motion, useReducedMotion } from "framer-motion";

import Reveal from "@/components/ui/Reveal";

const experiments = [
  { number: "01", category: "Creative Coding", title: "Generative Grid", description: "A visual study of repetition, spacing, and motion responding to a changing field.", concept: "Pattern / motion", visual: "grid" },
  { number: "02", category: "AI", title: "Prompt → Model → Output", description: "A conceptual map of AI-assisted development without pretending to be a live AI service.", concept: "Signals / systems", visual: "nodes" },
  { number: "03", category: "Web Experiments", title: "Code Playground", description: "A visual code window for exploring how a small interface can make technical ideas tangible.", concept: "Interface / code", visual: "code" },
  { number: "04", category: "Technology", title: "Stack Orbit", description: "A simple DOM-based constellation for technologies and concepts on the learning path.", concept: "Web / data / AI", visual: "orbit" },
  { number: "05", category: "Interactive Ideas", title: "Future Interface", description: "An unfinished interface direction where hierarchy, feedback, and curiosity can be tested safely.", concept: "Interaction / future", visual: "signal" },
] as const;

function ExperimentVisual({ type }: { type: (typeof experiments)[number]["visual"] }) {
  if (type === "code") return <div className="rounded border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-6 text-zinc-500"><p><span className="text-zinc-700">01</span> const idea = explore();</p><p><span className="text-zinc-700">02</span> idea.build(&quot;slowly&quot;);</p><p><span className="text-zinc-700">03</span> <span className="text-zinc-300">return</span> learn;</p></div>;
  if (type === "nodes") return <div className="flex items-center justify-between gap-2 rounded border border-zinc-800 bg-zinc-950 p-4 text-[10px] uppercase tracking-[0.16em] text-zinc-500"><span className="border border-zinc-700 px-2 py-2">Prompt</span><span className="h-px flex-1 bg-zinc-700" /><span className="border border-zinc-500 px-2 py-2 text-zinc-300">Model</span><span className="h-px flex-1 bg-zinc-700" /><span className="border border-zinc-700 px-2 py-2">Output</span></div>;
  if (type === "orbit") return <div className="relative flex h-28 items-center justify-center overflow-hidden rounded border border-zinc-800 bg-zinc-950"><span className="absolute h-16 w-16 rounded-full border border-zinc-700" /><span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-zinc-300">Web</span><span className="absolute left-8 top-5 text-[10px] text-zinc-600">React</span><span className="absolute bottom-5 right-8 text-[10px] text-zinc-600">Data</span></div>;
  if (type === "signal") return <div className="flex h-28 items-center gap-1 overflow-hidden rounded border border-zinc-800 bg-zinc-950 px-6">{["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-2/5", "w-3/5", "w-1/5"].map((width, index) => <span key={index} className={`h-px ${width} ${index % 2 ? "bg-zinc-400" : "bg-zinc-700"}`} />)}</div>;
  return <div className="grid h-28 grid-cols-8 gap-1 overflow-hidden rounded border border-zinc-800 bg-zinc-950 p-4">{Array.from({ length: 32 }, (_, index) => <span key={index} className={`rounded-sm ${index % 4 === 0 ? "bg-white/[0.08]" : index % 2 === 0 ? "bg-white/[0.04]" : "bg-white/[0.02]"}`} />)}</div>;
}

export default function Lab() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="lab" className="min-h-screen scroll-mt-24 border-t border-zinc-900 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal><p className="mb-10 text-sm uppercase tracking-[0.3em] text-zinc-500">03 — The Lab</p></Reveal>
        <Reveal delay={0.1}><div className="max-w-4xl"><h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Where ideas become <span className="text-zinc-500">experiments.</span></h2><p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">A playground for technology, interfaces, AI concepts, creative coding, and future digital experiences.</p></div></Reveal>
        <div className="mt-20 grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-2">
          {experiments.map((experiment, index) => <Reveal key={experiment.number} delay={0.1 + index * 0.06}><motion.article whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group relative h-full overflow-hidden bg-black p-8 transition-colors duration-300 hover:bg-zinc-950 sm:p-10"><div className="relative z-10 flex h-full flex-col"><div className="flex items-center justify-between gap-4"><span className="font-mono text-sm text-zinc-600">{experiment.number}</span><span className="text-right text-xs uppercase tracking-[0.18em] text-zinc-600">{experiment.category}</span></div><h3 className="mt-12 text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">{experiment.title}</h3><p className="mt-5 max-w-md leading-relaxed text-zinc-400">{experiment.description}</p><div className="mt-8"><ExperimentVisual type={experiment.visual} /></div><div className="mt-8 flex items-center justify-between border-t border-zinc-900 pt-5 text-sm"><span className="text-zinc-600">{experiment.concept}</span><span className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" aria-hidden="true">→</span></div></div></motion.article></Reveal>)}
        </div>
        <Reveal delay={0.2}><p className="mt-16 max-w-2xl border-t border-zinc-800 pt-10 leading-relaxed text-zinc-500">The Lab will continue to evolve as I learn, experiment, build, and explore new technologies.</p></Reveal>
      </div>
    </section>
  );
}