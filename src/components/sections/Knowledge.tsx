"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Reveal from "@/components/ui/Reveal";

interface DomainItem {
  number: string;
  name: string;
  category: "Foundations" | "Full Stack" | "Systems" | "AI";
  status: "Foundations" | "Building" | "Learning" | "Exploring" | "Working Knowledge";
  description: string;
  focus: string;
}

const domains: DomainItem[] = [
  {
    number: "01",
    name: "Computer Science",
    category: "Foundations",
    status: "Foundations",
    description: "Data structures, algorithms, and computational logic shaping systematic problem solving.",
    focus: "Memory models, algorithmic complexity, recursive problem decomposition.",
  },
  {
    number: "02",
    name: "Web Development",
    category: "Full Stack",
    status: "Building",
    description: "Crafting accessible interfaces, responsive layouts, and modern semantic web applications.",
    focus: "HTML5 semantics, modern CSS Grid/Flexbox, DOM optimization, core Web Vitals.",
  },
  {
    number: "03",
    name: "Full Stack Systems",
    category: "Full Stack",
    status: "Learning",
    description: "Connecting React frontends with Node.js, Express, MongoDB, and real-time Socket.IO channels.",
    focus: "REST API patterns, WebSocket concurrency, JWT authentication, state management.",
  },
  {
    number: "04",
    name: "Artificial Intelligence",
    category: "AI",
    status: "Exploring",
    description: "Studying AI-assisted development, LLM prompt orchestration, and generative interfaces.",
    focus: "Context window optimization, token streaming, practical developer tooling.",
  },
  {
    number: "05",
    name: "Machine Learning",
    category: "AI",
    status: "Foundations",
    description: "Building a grounded conceptual understanding of supervised learning and model evaluation.",
    focus: "Training loss, classification metrics, neural network basics.",
  },
  {
    number: "06",
    name: "Operating Systems",
    category: "Systems",
    status: "Learning",
    description: "Studying process scheduling, concurrency, virtual memory, and kernel interactions.",
    focus: "Thread synchronization, context switching, file system architectures.",
  },
  {
    number: "07",
    name: "Computer Networks",
    category: "Systems",
    status: "Foundations",
    description: "Understanding protocol stacks, reliable transport (TCP), UDP, and DNS resolution.",
    focus: "OSI 7-layer model, HTTP/HTTPS lifecycle, socket handshakes, routing basics.",
  },
  {
    number: "08",
    name: "DBMS & Persistence",
    category: "Systems",
    status: "Working Knowledge",
    description: "Database design, relational schemas, indexing, and Document databases (MongoDB).",
    focus: "ACID principles, SQL queries, NoSQL indexing, connection pooling.",
  },
];

const categories = ["All", "Foundations", "Full Stack", "Systems", "AI"] as const;

export default function Knowledge() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");

  const filteredDomains = activeCategory === "All"
    ? domains
    : domains.filter((d) => d.category === activeCategory);

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
              Not a leaderboard or claim of total mastery. This is an honest, living map of foundational studies,
              working full-stack knowledge, and subjects I am actively practicing.
            </p>
          </div>
        </Reveal>

        {/* CATEGORY FILTERS */}
        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* DOMAIN GRID */}
        <div className="mt-10 grid w-full min-w-0 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
          {filteredDomains.map((domain, index) => (
            <Reveal key={domain.number} delay={0.05 + index * 0.03} className="w-full min-w-0">
              <motion.article
                whileHover={{ y: -4 }}
                className="group relative flex h-full w-full min-w-0 flex-col justify-between bg-black p-6 transition-colors duration-300 hover:bg-zinc-950 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-600">{domain.number}</span>
                    <span className="rounded border border-zinc-800 px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                      {domain.status}
                    </span>
                  </div>

                  <h3 className="mt-10 text-2xl font-semibold tracking-tight text-white">
                    {domain.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-900 pt-4">
                  <p className="text-[11px] font-mono text-zinc-500 leading-normal">
                    <span className="text-zinc-600 uppercase">Focus: </span>
                    {domain.focus}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
