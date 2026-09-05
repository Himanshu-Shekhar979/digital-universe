"use client";

import { FormEvent, useState } from "react";

import Reveal from "@/components/ui/Reveal";

const contactLinks = [
  { label: "Email", value: "himanshu80021@gmail.com", href: "mailto:himanshu80021@gmail.com" },
  { label: "GitHub", value: "Himanshu-Shekhar979", href: "https://github.com/Himanshu-Shekhar979" },
  { label: "LinkedIn", value: "Himanshu Shekhar", href: "https://www.linkedin.com/in/himanshu-shekhar-867b11299" },
];

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Draft prepared. Use the email link below to send it.");
  };

  return (
    <section id="contact" className="min-h-screen scroll-mt-24 border-t border-zinc-800 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal><p className="text-sm uppercase tracking-[0.3em] text-zinc-500">09 — Transmission</p></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">Send a <span className="text-zinc-500">signal.</span></h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">Still learning. Still building. If you have an idea, a question, or a useful conversation in mind, start here.</p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="border border-zinc-800 bg-black p-6 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-zinc-400">Name<input required name="name" type="text" className="border-b border-zinc-800 bg-transparent px-0 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white" placeholder="Your name" /></label>
                <label className="grid gap-2 text-sm text-zinc-400">Email<input required name="email" type="email" className="border-b border-zinc-800 bg-transparent px-0 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white" placeholder="you@example.com" /></label>
              </div>
              <label className="mt-8 grid gap-2 text-sm text-zinc-400">Message<textarea required name="message" rows={5} className="resize-y border-b border-zinc-800 bg-transparent px-0 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white" placeholder="What would you like to discuss?" /></label>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="rounded-full border border-zinc-700 px-6 py-3 text-sm transition-colors hover:border-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">Prepare Message</button>
                <p aria-live="polite" className="text-sm text-zinc-500">{status || "This form prepares a message locally; it does not send email."}</p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex h-full flex-col justify-between border-l border-zinc-800 pl-6 sm:pl-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Open channels</p>
                <div className="mt-8 space-y-4">
                  {contactLinks.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center justify-between gap-5 border-b border-zinc-900 py-5 text-zinc-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><span><span className="block text-xs uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400">{link.label}</span><span className="mt-2 block break-all">{link.value}</span></span><span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></a>)}
                </div>
              </div>
              <p className="mt-16 text-3xl font-semibold tracking-tight text-zinc-300 sm:text-4xl">Let&apos;s build something meaningful together.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.35}><div className="mt-20 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Himanshu Shekhar</p><p>Open to opportunities</p></div></Reveal>
      </div>
    </section>
  );
}