"use client";

import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { useGsapScroll } from "@/components/ui/useGsapScroll";

interface StoryStage {
  number: string;
  label: string;
  tag: string;
  title: string;
  description: string;
  context: string;
}

const storyStages: StoryStage[] = [
  {
    number: "01",
    label: "Who I Am",
    tag: "ORIGIN & DISCIPLINE",
    title: "Himanshu Shekhar",
    description:
      "A Computer Science & Engineering graduate drawn to the intersection where disciplined software engineering, architectural clarity, and purposeful digital experiences meet.",
    context: "CS & Engineering Graduate // Creative Technologist",
  },
  {
    number: "02",
    label: "Where I Started",
    tag: "FOUNDATIONS & LOGIC",
    title: "Curiosity became a practice.",
    description:
      "My trajectory began with core programming fundamentals, algorithmic problem solving, and an enduring curiosity about how logical code structures transform into real-world interactive software.",
    context: "Govt. Polytechnic Dhanbad // Diploma CSE (2019–2022)",
  },
  {
    number: "03",
    label: "What I Learned",
    tag: "MEDIUM & CRAFT",
    title: "The web became my medium.",
    description:
      "I built a solid foundation across programming languages, web standards, stateful architectures, and interface systems, cultivating the habit of continuous learning through deliberate, hands-on building.",
    context: "Modern Web Standards & Interactive Systems",
  },
  {
    number: "04",
    label: "What I Build",
    tag: "APPLIED SYSTEMS",
    title: "Ideas, shaped into experiences.",
    description:
      "From full-stack web architectures to experimental interactive platforms, I focus on turning complex technical requirements into dependable, performant, and accessible software.",
    context: "Dumka Engineering College // B.Tech CSE (2023–2026)",
  },
  {
    number: "05",
    label: "Where I Am Going",
    tag: "FORWARD TRAJECTORY",
    title: "Still learning. Still building.",
    description:
      "The next chapter is an open, focused vector: deeper software engineering practice, scalable distributed systems, real-time graphics computation, and applied AI-augmented workflows.",
    context: "Real-Time Computing & Applied AI Systems",
  },
];

const engineeringPillars = [
  {
    code: "PIL-01",
    title: "Engineering Rigor",
    description:
      "Clean architectural boundaries, robust type safety, performance budgeting, and accessibility as hard engineering prerequisites.",
  },
  {
    code: "PIL-02",
    title: "Interactive Systems",
    description:
      "Treating user interfaces as living, stateful physical environments with intentional hierarchy, tactile feedback, and spatial depth.",
  },
  {
    code: "PIL-03",
    title: "Continuous Evolution",
    description:
      "Relentless experimentation across modern web platforms, graphics computing, and generative AI integration.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapScroll(sectionRef, (gsap) => {
    // 1. Scrub the vertical narrative rail line scaleY
    const railEl = sectionRef.current?.querySelector("[data-story-rail]");
    if (railEl) {
      gsap.fromTo(
        railEl,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        },
      );
    }

    // 2. Stage reveals with scrubbed illumination
    const stages = gsap.utils.toArray<HTMLElement>("[data-story-stage]");
    stages.forEach((stage) => {
      gsap.fromTo(
        stage,
        { y: 22, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-black px-6 py-32 text-white"
      aria-label="World 02: Story — Personal Chronicle and Engineering Philosophy"
    >
      {/* TOP & BOTTOM CINEMATIC GRADIENT HORIZONS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/90 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-10"
      />

      {/* AMBIENT SPATIAL FOCAL GLOWS */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-36 top-1/4 h-[520px] w-[520px] rounded-full bg-slate-300/[0.018] blur-[150px]" />
        <div className="absolute -right-36 bottom-1/4 h-[440px] w-[440px] rounded-full bg-zinc-400/[0.015] blur-[140px]" />
      </div>

      {/* CINEMATIC FRAME TELEMETRY (Desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/3 hidden xl:flex flex-col items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 select-none z-20"
      >
        <span className="[writing-mode:vertical-lr] rotate-180">CHRONICLE // 002</span>
        <span className="h-12 w-[1px] bg-zinc-800" />
        <span className="text-[8px] text-zinc-700">TIMELINE_ACTIVE</span>
      </div>

      <div className="relative mx-auto max-w-6xl z-20">
        {/* ================= SECTION HEADER ================= */}
        <Reveal>
          <header className="max-w-3xl">
            {/* System Telemetry Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400 sm:text-xs sm:tracking-[0.28em]">
                WORLD 02 // CHRONICLE
              </p>
            </div>

            {/* Monolithic Dual-Tone Headline */}
            <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[0.03em] text-white sm:text-7xl lg:text-8xl uppercase">
              A JOURNEY IN
              <span className="block text-zinc-400 font-light tracking-[0.05em]">PROGRESS.</span>
            </h2>

            {/* Truthful Recruiter-Friendly Grounding Paragraph */}
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              From rigorous foundations in computer science to an active, expanding engineering
              practice on the modern web &mdash; this is the personal chronicle behind the work.
            </p>
          </header>
        </Reveal>

        {/* ================= 5-STAGE CHRONOLOGICAL NARRATIVE ================= */}
        <div className="relative mt-24">
          {/* Vertical Illuminated Narrative Rail (Desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[21px] top-6 bottom-12 hidden lg:block w-[1px] bg-zinc-800/80"
          >
            <div
              data-story-rail
              className="h-full w-full origin-top bg-gradient-to-b from-white via-white/40 to-transparent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-12 sm:space-y-16">
            {storyStages.map((stage) => (
              <li key={stage.number}>
                <article
                  data-story-stage
                  className="group relative grid gap-6 lg:grid-cols-[44px_1fr] lg:gap-10"
                >
                  {/* Left Column: Illuminated Rail Node (Desktop) */}
                  <div className="hidden lg:flex flex-col items-center pt-1" aria-hidden="true">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black font-mono text-xs font-semibold text-zinc-300 shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white group-hover:text-white group-hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]">
                      {stage.number}
                    </div>
                  </div>

                  {/* Right Column: Stage Content Card */}
                  <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 sm:p-9 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]">
                    {/* Top Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="lg:hidden rounded border border-white/15 bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-zinc-300">
                          {stage.number}
                        </span>
                        <p className="font-mono text-xs uppercase tracking-[0.26em] text-zinc-400">
                          {stage.label}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                        {stage.tag}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {stage.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
                      {stage.description}
                    </p>

                    {/* Contextual Institutional / Discipline Pill */}
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      <span className="h-1 w-1 rounded-full bg-zinc-400" />
                      <span>{stage.context}</span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* ================= ENGINEERING PHILOSOPHY SUB-PANEL ================= */}
        <div className="mt-28 border-t border-zinc-800/80 pt-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400">
                ENGINEERING PHILOSOPHY // CORE PILLARS
              </h3>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringPillars.map((pillar, idx) => (
              <Reveal key={pillar.code} delay={0.1 * idx}>
                <div className="h-full rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.025]">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    <span>{pillar.code}</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold tracking-tight text-white">
                    {pillar.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Authoritative Factual Credentials Bar */}
          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 font-mono text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>B.TECH CSE // DUMKA ENG. COLLEGE</span>
                <span className="hidden text-zinc-700 sm:inline">•</span>
                <span>DIPLOMA CSE // GOVT. POLYTECHNIC DHANBAD</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>AVAILABLE FOR ENGINEERING OPPORTUNITIES</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}