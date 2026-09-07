"use client";

import Reveal from "@/components/ui/Reveal";
import { useRef } from "react";
import { useGsapScroll } from "@/components/ui/useGsapScroll";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapScroll(sectionRef, (gsap) => {
    gsap.fromTo(
      "[data-skill-card]",
      { y: 24, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      },
    );
  });

  const skillGroups = [
    {
      title: "Programming",
      skills: ["C", "C++", "Java", "Python (Basic)"],
    },
    {
      title: "Web Development",
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "VS Code", "MS Office"],
    },
    {
      title: "Exploring",
      skills: [
        "Machine Learning",
        "Artificial Intelligence",
        "Modern Web Technologies",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen scroll-mt-24 bg-black px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Label */}
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            02 — Skills
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <div className="mt-16 max-w-3xl">
            <h2 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Technology and tools
              <br />
              <span className="text-zinc-500">
                shaping my journey.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              A growing collection of technologies, programming concepts,
              and tools that I continue to explore and develop.
            </p>
          </div>
        </Reveal>

        {/* Skill Groups */}
        <div className="mt-24 grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {skillGroups.map((group) => (
            /* Staggered reveal is handled by GSAP via [data-skill-card] */
            <div key={group.title} data-skill-card className="h-full bg-black p-8 transition duration-300 hover:bg-zinc-950">
              <h3 className="text-2xl font-semibold">
                {group.title}
              </h3>

              <div className="mt-8 flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <Reveal delay={0.2}>
          <div className="mt-16 border-t border-zinc-800 pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-500">
              Technology is constantly evolving, and so is my learning journey.
              I believe in continuously improving my skills through practice,
              experimentation, and real-world projects.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}