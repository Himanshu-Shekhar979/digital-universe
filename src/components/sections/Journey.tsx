"use client";

import Reveal from "@/components/ui/Reveal";

const milestones = [
  ["2019", "Class X / CBSE", "Education", "An early academic foundation before moving deeper into computing."],
  ["2019–2022", "Diploma in Computer Science & Engineering", "Education", "Government Polytechnic Dhanbad."],
  ["2021", "Web Development Training", "Learning", "A focused period of learning web development fundamentals."],
  ["2023–2026", "B.Tech in Computer Science & Engineering", "Education", "Dumka Engineering College."],
  ["2024", "Web Development Internship", "Experience", "Practical exposure to web development in a professional learning context."],
  ["2025", "Full Stack Web Development", "Projects", "Applying front-end and back-end learning to complete project ideas."],
  ["2025–2026", "AI / ML / Generative AI Learning", "Exploring", "Continuing to explore AI-assisted development and related concepts."],
  ["Current", "Building, learning, exploring", "Today", "Developing projects, practicing modern development, and learning where technology can lead next."],
] as const;

export default function Journey() {
  return (
    <section id="journey" className="min-h-screen scroll-mt-24 border-t border-zinc-900 px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">07 — Journey</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
              Learning is the
              <span className="block text-zinc-500">through-line.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Education, practice, projects, and exploration form a path that is still moving.
            </p>
          </div>
        </Reveal>

        <ol className="mt-20 border-l border-zinc-800">
          {milestones.map(([date, title, category, description], index) => (
            <li key={date + title} className="relative pl-8 sm:pl-14">
              <span className="absolute -left-1.5 top-8 h-3 w-3 rounded-full border border-zinc-500 bg-black" />
              <Reveal delay={0.05 + index * 0.05}>
                <article className={`border-b border-zinc-900 py-8 sm:py-10 ${category === "Today" ? "border-white/30" : ""}`}>
                  <div className="grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)_minmax(14rem,0.7fr)] sm:gap-8">
                    <div>
                      <p className="font-mono text-sm text-zinc-500">{date}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">{category}</p>
                    </div>
                    <h3 className={`text-2xl font-semibold tracking-tight sm:text-3xl ${category === "Today" ? "text-white" : "text-zinc-200"}`}>{title}</h3>
                    <p className="leading-relaxed text-zinc-400">{description}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
