"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/scroll";
import {
  directContactLinks,
  transmissionMeta,
} from "@/content/transmission";

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

  const handleReturnToTop = () => {
    if (typeof window !== "undefined") {
      scrollToSection("#about");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-black px-6 py-32 text-white"
      aria-label="World 09: Transmission — Final Signal and Collaboration Gateway"
    >
      {/* Top transition receiving World 08 (Future) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-zinc-950/40 to-transparent z-10"
      />

      {/* Ambient signal glow fields (contained within overflow-hidden) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[480px] rounded-full bg-emerald-500/[0.015] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[440px] rounded-full bg-cyan-500/[0.015] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ================= TELEMETRY HEADER ================= */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{transmissionMeta.telemetryTag}</span>
            </div>

            <span className="font-mono text-xs text-zinc-500">
              {transmissionMeta.signalStatus}
            </span>
          </div>
        </Reveal>

        {/* ================= TITLE & SUBTITLE ================= */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
              {transmissionMeta.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {transmissionMeta.subtitle}
            </p>
          </div>
        </Reveal>

        {/* ================= DUAL TRANSMISSION INTERFACE ================= */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          {/* Dispatch Console Form */}
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.08] bg-black/60 p-6 sm:p-10 backdrop-blur-md">
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
                <label className="grid gap-2 text-xs uppercase tracking-wider text-zinc-400 font-mono">
                  <span>Name *</span>
                  <input
                    required
                    name="name"
                    type="text"
                    minLength={2}
                    maxLength={100}
                    disabled={status === "submitting"}
                    className="border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white disabled:opacity-50"
                    placeholder="Your name or organization"
                  />
                </label>

                <label className="grid gap-2 text-xs uppercase tracking-wider text-zinc-400 font-mono">
                  <span>Email *</span>
                  <input
                    required
                    name="email"
                    type="email"
                    disabled={status === "submitting"}
                    className="border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white disabled:opacity-50"
                    placeholder="name@domain.com"
                  />
                </label>
              </div>

              <label className="mt-8 grid gap-2 text-xs uppercase tracking-wider text-zinc-400 font-mono">
                <span>Message *</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  minLength={10}
                  maxLength={3000}
                  disabled={status === "submitting"}
                  className="resize-y border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white disabled:opacity-50"
                  placeholder="What opportunities, projects, or collaborations would you like to discuss?"
                />
              </label>

              {/* Dynamic Feedback Notification Status */}
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
                    className="rounded-full border border-white bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 font-mono"
                  >
                    {status === "submitting" ? "Processing Transmission..." : "Send Transmission"}
                  </button>
                </MagneticButton>

                <p className="text-xs text-zinc-500 font-mono">
                  {status === "idle" && "Validated via App Router endpoint."}
                </p>
              </div>
            </form>
          </Reveal>

          {/* Direct Contact Links & Status Column */}
          <Reveal delay={0.25}>
            <div className="flex h-full flex-col justify-between border-l border-white/[0.08] pl-6 sm:pl-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">Direct Channels</p>
                <div className="mt-8 space-y-4">
                  {directContactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      data-cursor="view"
                      className="group flex items-center justify-between gap-5 border-b border-zinc-900 py-5 text-zinc-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded px-2"
                    >
                      <div>
                        <span className="block text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 font-mono">
                          {link.label}
                        </span>
                        <span className="mt-2 block break-all text-sm font-medium">{link.value}</span>
                      </div>
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 font-mono">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Collaboration Status Callout */}
              <div className="mt-16 rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-2">
                  COLLABORATION STATUS
                </span>
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {transmissionMeta.closingStatement}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {transmissionMeta.availabilityStatus}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ================= TERMINAL EPILOGUE & FOOTER ================= */}
        <Reveal delay={0.35}>
          <div className="mt-24 rounded-xl border border-white/[0.06] bg-black/40 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs text-zinc-400">
                  © {new Date().getFullYear()} Himanshu Shekhar · Controlled Futurism Architecture
                </p>
                <p className="mt-1 font-mono text-[11px] text-zinc-500">
                  {transmissionMeta.systemCredits}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReturnToTop}
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
              >
                <span>Return to Story</span>
                <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}