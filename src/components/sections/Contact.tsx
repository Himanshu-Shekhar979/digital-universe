"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const contactLinks = [
  { label: "Email", value: "himanshu80021@gmail.com", href: "mailto:himanshu80021@gmail.com" },
  { label: "GitHub", value: "Himanshu-Shekhar979", href: "https://github.com/Himanshu-Shekhar979" },
  { label: "LinkedIn", value: "Himanshu Shekhar", href: "https://www.linkedin.com/in/himanshu-shekhar-867b11299" },
];

type SubmissionStatus = "idle" | "submitting" | "delivered" | "unconfigured" | "error";

export default function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setResponseMessage("");
    setFallbackMailto("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      honeypot: formData.get("bot_field"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setResponseMessage(data.error || "Failed to submit transmission.");
        return;
      }

      if (data.delivered) {
        setStatus("delivered");
        setResponseMessage(data.message || "Message delivered successfully.");
        form.reset();
      } else {
        // Truthful transport-not-configured state
        setStatus("unconfigured");
        setResponseMessage(data.message);
        if (data.mailto) {
          setFallbackMailto(data.mailto);
        }
      }
    } catch {
      setStatus("error");
      setResponseMessage("Network failure. Please verify your connection or use direct email.");
    }
  };

  return (
    <section id="contact" className="min-h-screen scroll-mt-24 border-t border-zinc-800 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">09 — Transmission</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
              Send a <span className="text-zinc-500">signal.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Still learning. Still building. If you have an engineering role, collaborative project,
              or technical conversation in mind, initiate transmission below.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800 bg-black p-6 sm:p-10">
              {/* Honeypot field for spam prevention */}
              <input
                type="text"
                name="bot_field"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 text-xs uppercase tracking-wider text-zinc-400">
                  <span>Name *</span>
                  <input
                    required
                    name="name"
                    type="text"
                    minLength={2}
                    maxLength={100}
                    disabled={status === "submitting"}
                    className="border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white disabled:opacity-50"
                    placeholder="Your name or company"
                  />
                </label>

                <label className="grid gap-2 text-xs uppercase tracking-wider text-zinc-400">
                  <span>Email *</span>
                  <input
                    required
                    name="email"
                    type="email"
                    disabled={status === "submitting"}
                    className="border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white disabled:opacity-50"
                    placeholder="name@organization.com"
                  />
                </label>
              </div>

              <label className="mt-8 grid gap-2 text-xs uppercase tracking-wider text-zinc-400">
                <span>Message *</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  minLength={10}
                  maxLength={3000}
                  disabled={status === "submitting"}
                  className="resize-y border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white disabled:opacity-50"
                  placeholder="What opportunities or projects would you like to discuss?"
                />
              </label>

              {/* FEEDBACK STATUS NOTIFICATION */}
              <div aria-live="polite" className="mt-6">
                {status === "delivered" && (
                  <div className="rounded-lg border border-emerald-800/80 bg-emerald-950/40 p-4 text-xs text-emerald-300">
                    <p className="font-semibold">✓ Transmission Delivered</p>
                    <p className="mt-1">{responseMessage}</p>
                  </div>
                )}

                {status === "unconfigured" && (
                  <div className="rounded-lg border border-amber-800/80 bg-amber-950/30 p-4 text-xs text-amber-200">
                    <p className="font-semibold">Notice: Server Email Transport Unconfigured</p>
                    <p className="mt-1 leading-relaxed text-amber-300/90">{responseMessage}</p>
                    {fallbackMailto && (
                      <div className="mt-3">
                        <a
                          href={fallbackMailto}
                          className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-400/10 px-4 py-1.5 font-medium text-amber-200 transition-colors hover:bg-amber-400 hover:text-black"
                        >
                          <span>Open in Email Client with Pre-filled Draft</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-lg border border-rose-800/80 bg-rose-950/40 p-4 text-xs text-rose-300">
                    <p className="font-semibold">Error Submitting Transmission</p>
                    <p className="mt-1">{responseMessage}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <MagneticButton strength={0.3}>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    data-cursor="open"
                    className="rounded-full border border-white bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                  >
                    {status === "submitting" ? "Processing Transmission..." : "Send Transmission"}
                  </button>
                </MagneticButton>

                <p className="text-xs text-zinc-500">
                  {status === "idle" && "Validated via App Router endpoint."}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex h-full flex-col justify-between border-l border-zinc-800 pl-6 sm:pl-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Direct Channels</p>
                <div className="mt-8 space-y-4">
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      data-cursor="view"
                      className="group flex items-center justify-between gap-5 border-b border-zinc-900 py-5 text-zinc-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded px-2"
                    >
                      <div>
                        <span className="block text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300">
                          {link.label}
                        </span>
                        <span className="mt-2 block break-all text-sm font-medium">{link.value}</span>
                      </div>
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <p className="text-xs uppercase tracking-widest text-zinc-600 font-mono">Status Indicator</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-200 sm:text-3xl">
                  Open for software engineering roles and creative collaboration.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="mt-20 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Himanshu Shekhar · Controlled Futurism Architecture</p>
            <p className="font-mono">Next.js · TypeScript · Three.js · GSAP · Lenis</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}