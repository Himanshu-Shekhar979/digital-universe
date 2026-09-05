"use client";

import Reveal from "@/components/ui/Reveal";
import { useRef } from "react";
import { useGsapScroll } from "@/components/ui/useGsapScroll";

const storyStages = [
  {
    number: "01",
    label: "Who I Am",
    title: "Himanshu Shekhar",
    description:
      "A Computer Science & Engineering graduate drawn to the space where technology, design, and useful digital experiences meet.",
  },
  {
    number: "02",
    label: "Where I Started",
    title: "Curiosity became a practice.",
    description:
      "My journey began with programming, problem solving, and an interest in understanding how ideas become things people can use.",
  },
  {
    number: "03",
    label: "What I Learned",
    title: "The web became my medium.",
    description:
      "I have continued building a foundation across programming, web technologies, interfaces, and the habits of learning through experimentation.",
  },
  {
    number: "04",
    label: "What I Build",
    title: "Ideas, shaped into experiences.",
    description:
      "From web projects to experimental digital work, I enjoy turning a starting point into something clear, interactive, and useful.",
  },
  {
    number: "05",
    label: "Where I Am Going",
    title: "Still learning. Still building.",
    description:
      "The next chapter is an open one: deeper practice, modern web technologies, artificial intelligence, and more thoughtful digital experiences.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapScroll(sectionRef, (gsap) => {
    gsap.utils.toArray<HTMLElement>("[data-story-stage]").forEach((stage) => {
      gsap.fromTo(
        stage,
        { y: 18, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top 84%",
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
    >
      <div className="pointer-events-none absolute right-[-12rem] top-24 h-96 w-96 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-4xl border-l border-zinc-800 pl-5 sm:pl-8">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              01 — Story
            </p>
            <h2 className="mt-8 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              A journey in
              <span className="block text-zinc-500">progress.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              From a foundation in computer science to a growing practice of
              building on the web, this is the path behind the work.
            </p>
          </div>
        </Reveal>

        <ol className="mt-24 border-t border-zinc-800">
          {storyStages.map((stage, index) => (
            <li key={stage.number}>
              <Reveal delay={index * 0.08}>
                <article data-story-stage className="grid gap-8 border-b border-zinc-800 py-10 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-10 sm:py-14 lg:grid-cols-[10rem_minmax(0,1fr)_minmax(18rem,0.8fr)] lg:gap-12">
                  <div className="flex items-start justify-between gap-4 sm:block">
                    <span className="font-mono text-sm text-zinc-600">
                      {stage.number}
                    </span>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 sm:mt-5">
                      {stage.label}
                    </p>
                  </div>

                  <h3 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    {stage.title}
                  </h3>

                  <p className="max-w-lg self-end text-base leading-relaxed text-zinc-400">
                    {stage.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Computer Science &amp; Engineering graduate</p>
            <p className="font-mono text-zinc-600">01 / 05</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}