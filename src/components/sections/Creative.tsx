"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { creativeStudies, type CreativeStudy } from "@/content/creative";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/* -------------------------------------------------------------------------- */
/* STUDY 01: ALGORITHMIC AESTHETICS (Lissajous & Harmonic Wave Canvas)         */
/* -------------------------------------------------------------------------- */
function AlgorithmicCanvas({ isReducedMotion }: { isReducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [phaseDelta, setPhaseDelta] = useState(0);
  const [freqA, setFreqA] = useState(3);
  const [freqB, setFreqB] = useState(4);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep obsidian void base
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) / 2
      );
      gradient.addColorStop(0, "rgba(245, 158, 11, 0.05)");
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
      gradient.addColorStop(1, "rgba(3, 3, 5, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render Lissajous harmonic curve
      const cx = width / 2;
      const cy = height / 2;
      const radiusX = Math.min(width, height) * 0.38;
      const radiusY = Math.min(width, height) * 0.38;

      ctx.beginPath();
      const samples = 400;
      const delta = isReducedMotion ? 0.785 : time * 0.015 + phaseDelta;

      for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * Math.PI * 2;
        const x = cx + radiusX * Math.sin(freqA * t + delta);
        const y = cy + radiusY * Math.sin(freqB * t);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#F59E0B";
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Second harmonic echo curve
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * Math.PI * 2;
        const x = cx + radiusX * 0.88 * Math.sin(freqA * t + delta + 0.4);
        const y = cy + radiusY * 0.88 * Math.sin(freqB * t);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "#8B5CF6";
      ctx.shadowBlur = 8;
      ctx.stroke();

      ctx.restore();

      if (!isReducedMotion) {
        time += 1;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [freqA, freqB, phaseDelta, isReducedMotion]);

  const handleModulate = () => {
    const pairs = [
      [3, 4],
      [5, 4],
      [3, 2],
      [5, 6],
      [2, 3],
    ];
    const nextPair = pairs[Math.floor(Math.random() * pairs.length)];
    setFreqA(nextPair[0]);
    setFreqB(nextPair[1]);
    setPhaseDelta((prev) => prev + 0.5);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[300px] sm:min-h-[360px] bg-[#030305] rounded-xl overflow-hidden border border-white/[0.08]">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 cursor-crosshair"
        aria-label="Procedural Lissajous harmonic curve canvas"
      />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
          SIMULATION // 2D HARMONICS ({freqA}:{freqB})
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={handleModulate}
          type="button"
          className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur-md transition-colors hover:border-amber-400/60 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
        >
          Modulate Harmonic Ratio ↻
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STUDY 02: CINEMATIC LANGUAGE (Anamorphic Optical Framing Simulator)         */
/* -------------------------------------------------------------------------- */
function CinematicViewfinder() {
  const [focalLength, setFocalLength] = useState<"24mm" | "50mm" | "85mm">("50mm");

  const focalSpecs = {
    "24mm": {
      fov: "84° FIELD OF VIEW",
      char: "ENVIRONMENTAL SCALE // LOW COMPRESSION",
      cropScale: "scale-100",
    },
    "50mm": {
      fov: "46° FIELD OF VIEW",
      char: "STANDARD PERSPECTIVE // NATURAL RATIO",
      cropScale: "scale-110",
    },
    "85mm": {
      fov: "28° FIELD OF VIEW",
      char: "PORTRAIT COMPRESSION // SHALLOW FOCUS",
      cropScale: "scale-125",
    },
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[300px] sm:min-h-[360px] bg-[#050508] rounded-xl overflow-hidden border border-white/[0.08] p-4 sm:p-6">
      {/* 2.39:1 Anamorphic Frame Container */}
      <div className="relative w-full aspect-[2.39/1] max-h-[220px] mx-auto rounded border border-white/20 bg-black/80 overflow-hidden flex items-center justify-center">
        {/* Optical atmospheric gradient simulating anamorphic lens capture */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-zinc-900/40 to-amber-950/20 transition-transform duration-700 ease-out ${focalSpecs[focalLength].cropScale}`}
        />

        {/* Framing crosshair & guides */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-8 h-[1px] bg-white/40" />
          <div className="h-8 w-[1px] bg-white/40 absolute" />
        </div>

        {/* Anamorphic horizontal streak simulation */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -translate-y-1/2 pointer-events-none" />

        {/* Viewfinder corner brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/40" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/40" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/40" />

        <div className="relative z-10 text-center px-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            FRAME CROP // 2.39:1 ANAMORPHIC
          </span>
          <p className="mt-1 font-mono text-xs text-white font-semibold tracking-wider">
            {focalLength} OPTICAL MODEL
          </p>
        </div>
      </div>

      {/* Optical metadata bar & interactive focal length switcher */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-zinc-400 uppercase">Focal Model:</span>
          {(["24mm", "50mm", "85mm"] as const).map((len) => (
            <button
              key={len}
              onClick={() => setFocalLength(len)}
              type="button"
              className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
                focalLength === len
                  ? "bg-white text-black font-semibold"
                  : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {len}
            </button>
          ))}
        </div>

        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          {focalSpecs[focalLength].fov} · {focalSpecs[focalLength].char}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STUDY 03: MOTION DYNAMICS (Kinetic Easing Physics Simulator)                 */
/* -------------------------------------------------------------------------- */
function MotionPlayground({ isReducedMotion }: { isReducedMotion: boolean }) {
  const [curveType, setCurveType] = useState<"spring" | "bezier" | "linear">("spring");
  const [isTriggered, setIsTriggered] = useState(false);

  const triggerAnimation = () => {
    setIsTriggered(false);
    requestAnimationFrame(() => {
      setIsTriggered(true);
    });
  };

  const getTransition = (): Transition => {
    if (isReducedMotion) return { duration: 0.01 };
    switch (curveType) {
      case "spring":
        return { type: "spring", stiffness: 120, damping: 14, mass: 1 };
      case "bezier":
        return { duration: 1.1, ease: [0.16, 1, 0.3, 1] };
      case "linear":
        return { duration: 1.1, ease: "linear" };
    }
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[300px] sm:min-h-[360px] bg-[#040407] rounded-xl overflow-hidden border border-white/[0.08] p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
          SIMULATION // KINETIC EASING CURVE
        </span>
        <button
          onClick={triggerAnimation}
          type="button"
          className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[11px] text-amber-300 transition-colors hover:bg-amber-400/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
        >
          Play Motion Simulation ▶
        </button>
      </div>

      {/* Kinetic Track */}
      <div className="my-6 relative w-full h-24 bg-black/60 rounded-lg border border-white/[0.06] p-4 flex flex-col justify-center overflow-hidden">
        <div className="absolute left-6 right-6 h-[1px] bg-white/10" />

        {/* Animated kinetic orb */}
        <motion.div
          animate={isTriggered ? { x: "calc(100% - 3rem)" } : { x: 0 }}
          transition={getTransition()}
          className="relative z-10 h-7 w-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center"
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </motion.div>
      </div>

      {/* Curve Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurveType("spring");
              triggerAnimation();
            }}
            type="button"
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              curveType === "spring"
                ? "bg-amber-400 text-black font-semibold"
                : "border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Damped Spring (ζ=0.82)
          </button>
          <button
            onClick={() => {
              setCurveType("bezier");
              triggerAnimation();
            }}
            type="button"
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              curveType === "bezier"
                ? "bg-amber-400 text-black font-semibold"
                : "border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Cubic Bezier (0.16, 1, 0.3, 1)
          </button>
          <button
            onClick={() => {
              setCurveType("linear");
              triggerAnimation();
            }}
            type="button"
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              curveType === "linear"
                ? "bg-amber-400 text-black font-semibold"
                : "border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Linear (Reference)
          </button>
        </div>

        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          {curveType === "spring"
            ? "NATURAL HARMONIC SETTLING"
            : curveType === "bezier"
            ? "EXPONENTIAL VISUAL MOMENTUM"
            : "UNNATURAL UNIFORM MOTION"}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STUDY 04: VISUAL COMPOSITION (Golden Ratio & Thirds Grid)                   */
/* -------------------------------------------------------------------------- */
function CompositionGrid() {
  const [activeGuide, setActiveGuide] = useState<"thirds" | "golden" | "tonal">("golden");

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[300px] sm:min-h-[360px] bg-[#030305] rounded-xl overflow-hidden border border-white/[0.08] p-4 sm:p-6">
      {/* 4:5 Portrait Simulated Frame */}
      <div className="relative w-full max-w-[240px] aspect-[4/5] mx-auto rounded border border-white/20 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 overflow-hidden flex items-center justify-center">
        {/* Tonal Chiaroscuro Gradient Field */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-amber-950/30 via-transparent to-white/[0.05] transition-opacity duration-300 ${
            activeGuide === "tonal" ? "opacity-100" : "opacity-40"
          }`}
        />

        {/* Rule of Thirds Grid */}
        {activeGuide === "thirds" && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-amber-400/20">
            <div className="border-r border-b border-amber-400/30 relative">
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-amber-400/80" />
            </div>
            <div className="border-r border-b border-amber-400/30 relative">
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-amber-400/80" />
            </div>
            <div className="border-b border-amber-400/30" />
            <div className="border-r border-b border-amber-400/30 relative">
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-amber-400/80" />
            </div>
            <div className="border-r border-b border-amber-400/30 relative">
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-amber-400/80" />
            </div>
            <div className="border-b border-amber-400/30" />
            <div className="border-r border-amber-400/30" />
            <div className="border-r border-amber-400/30" />
            <div />
          </div>
        )}

        {/* Golden Spiral Geometric Curve */}
        {activeGuide === "golden" && (
          <svg
            viewBox="0 0 100 125"
            className="absolute inset-0 w-full h-full pointer-events-none p-2 text-amber-400/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <rect x="0" y="0" width="100" height="125" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <path
              d="M 100 125 A 61.8 61.8 0 0 0 38.2 63.2 A 38.2 38.2 0 0 0 0 25 A 25 25 0 0 0 25 0 A 15.4 15.4 0 0 0 40.4 15.4 A 9.5 9.5 0 0 0 30.9 24.9"
              strokeDasharray="2 2"
            />
            <circle cx="38.2" cy="63.2" r="2" fill="#F59E0B" />
          </svg>
        )}

        {activeGuide === "tonal" && (
          <div className="relative z-10 text-center font-mono text-[10px] text-zinc-300">
            CHIAROSCURO TONAL CONTRAST
          </div>
        )}
      </div>

      {/* Guide Switcher */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveGuide("golden")}
            type="button"
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              activeGuide === "golden"
                ? "bg-amber-400 text-black font-semibold"
                : "border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Golden Ratio (φ ≈ 1.618)
          </button>
          <button
            onClick={() => setActiveGuide("thirds")}
            type="button"
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              activeGuide === "thirds"
                ? "bg-amber-400 text-black font-semibold"
                : "border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Rule of Thirds
          </button>
          <button
            onClick={() => setActiveGuide("tonal")}
            type="button"
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              activeGuide === "tonal"
                ? "bg-amber-400 text-black font-semibold"
                : "border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Tonal Field
          </button>
        </div>

        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          SIMULATION // COMPOSITION HARMONY
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STUDIO LIGHTBOX / SPECIFICATION MODAL                                       */
/* -------------------------------------------------------------------------- */
function StudySpecModal({
  study,
  onClose,
}: {
  study: CreativeStudy;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`spec-modal-title-${study.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#07070a] p-6 sm:p-8 shadow-2xl text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-400/10 px-2 py-0.5 font-mono text-xs font-semibold text-amber-300">
              STUDY // {study.number}
            </span>
            <span className="font-mono text-xs text-zinc-400">{study.discipline}</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full border border-white/10 p-1.5 text-zinc-400 hover:border-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Close specification modal"
          >
            ✕
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="mt-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400/90">
            {study.tagline}
          </span>
          <h3
            id={`spec-modal-title-${study.id}`}
            className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-white"
          >
            {study.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">{study.narrative}</p>
        </div>

        {/* Simulation Telemetry Matrix */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3 rounded-xl border border-white/[0.08] bg-black/50 p-4 font-mono text-xs">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase">{study.simulationMeta.keyMetricA.label}</span>
            <p className="text-zinc-200 mt-1">{study.simulationMeta.keyMetricA.value}</p>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase">{study.simulationMeta.keyMetricB.label}</span>
            <p className="text-zinc-200 mt-1">{study.simulationMeta.keyMetricB.value}</p>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase">{study.simulationMeta.keyMetricC.label}</span>
            <p className="text-zinc-200 mt-1">{study.simulationMeta.keyMetricC.value}</p>
          </div>
        </div>

        {/* Mathematical Foundation if present */}
        {study.simulationMeta.mathOrFormula && (
          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-950/10 p-3 font-mono text-xs text-amber-200/90">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block mb-1">
              Mathematical Foundation:
            </span>
            <code>{study.simulationMeta.mathOrFormula}</code>
          </div>
        )}

        {/* Deep Dive Insights */}
        <div className="mt-6 border-t border-white/[0.08] pt-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
            Architectural & Creative Rationales
          </h4>
          <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
            {study.deepDiveNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5" aria-hidden="true">
                  ›
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Color Science Palette */}
        <div className="mt-6 border-t border-white/[0.08] pt-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
            Tonal & Atmospheric Palette
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {study.colorPalette.map((col) => (
              <div
                key={col.name}
                className="flex items-center gap-2 rounded border border-white/[0.06] bg-black/40 p-2 text-xs"
              >
                <span
                  className="h-4 w-4 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <div className="overflow-hidden">
                  <div className="text-[11px] text-zinc-200 truncate">{col.name}</div>
                  <div className="font-mono text-[9px] text-zinc-500">{col.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close CTA */}
        <div className="mt-8 border-t border-white/[0.08] pt-6">
          <button
            onClick={onClose}
            type="button"
            className="w-full rounded-full border border-white bg-white py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            Close Specification
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT: WORLD 05 // CREATIVE UNIVERSE                              */
/* -------------------------------------------------------------------------- */
export default function Creative() {
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const [modalStudy, setModalStudy] = useState<CreativeStudy | null>(null);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const activeStudy = creativeStudies[activeStudyIndex] ?? creativeStudies[0];

  const handleSelectStudy = useCallback((index: number) => {
    setActiveStudyIndex(index);
  }, []);

  return (
    <section
      id="creative"
      aria-label="World 05 Creative Universe"
      className="relative min-h-screen scroll-mt-24 px-6 py-28 text-white overflow-hidden"
    >
      {/* ================= ATMOSPHERIC HORIZON BLENDS ================= */}
      {/* Top transition from World 04 (Cold Cobalt -> Warm Amber/Obsidian) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-zinc-950/40 to-transparent"
      />

      {/* Contained ambient aura (Warmer tones reflecting creative expression) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-amber-500/[0.025] blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[540px] h-[440px] rounded-full bg-purple-500/[0.02] blur-[140px]" />
      </div>

      {/* Bottom transition into World 06 (Knowledge System) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-zinc-950/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ================= TELEMETRY HEADER ================= */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/20 bg-amber-400/[0.03] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>WORLD 05 // CREATIVE UNIVERSE</span>
            </div>

            <span className="font-mono text-xs text-zinc-500">
              EXPERIMENTAL ARCHIVE // ACTIVE RESEARCH
            </span>
          </div>
        </Reveal>

        {/* ================= TITLE & MANIFESTO ================= */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Where logic becomes form,
              <span className="block text-zinc-500">and mathematics finds atmosphere.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Visual studies examining procedural geometry, optical pacing, kinetic physics, and spatial balance.
              These explorations study how aesthetic sensitivity directly informs software architecture and interface
              systems.
            </p>
          </div>
        </Reveal>

        {/* ================= CENTERPIECE: INTERACTIVE STUDIO EXHIBITION ================= */}
        <div className="mt-16 rounded-2xl border border-white/[0.1] bg-black/60 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Studio Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-6">
            {creativeStudies.map((study, idx) => {
              const isActive = activeStudyIndex === idx;
              return (
                <button
                  key={study.id}
                  onClick={() => handleSelectStudy(idx)}
                  type="button"
                  className={`relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                    isActive
                      ? "bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                      : "border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>
                    {study.number} · {study.discipline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Studio Workspace: Split Canvas & Technical Dossier */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
            {/* Left: Interactive Canvas / Simulator Viewport */}
            <div className="lg:col-span-7">
              {activeStudy.id === "algorithmic-aesthetics" && (
                <AlgorithmicCanvas isReducedMotion={isReducedMotion} />
              )}
              {activeStudy.id === "cinematic-language" && <CinematicViewfinder />}
              {activeStudy.id === "motion-dynamics" && (
                <MotionPlayground isReducedMotion={isReducedMotion} />
              )}
              {activeStudy.id === "visual-composition" && <CompositionGrid />}
            </div>

            {/* Right: Technical Dossier & Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                  <span>{activeStudy.simulationMeta.studyType}</span>
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {activeStudy.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{activeStudy.narrative}</p>

                {/* Core principles */}
                <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                    Core Principles Explored:
                  </span>
                  {activeStudy.principles.map((principle, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-amber-400 font-mono text-sm leading-none mt-0.5">›</span>
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>

                {/* Simulation Telemetry Badge */}
                <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
                  <span className="text-zinc-500 uppercase">{activeStudy.simulationMeta.model}</span>
                  <span className="text-amber-300">{activeStudy.aspectRatioLabel}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-white/[0.08] pt-6 flex items-center justify-between gap-4">
                <button
                  onClick={() => setModalStudy(activeStudy)}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/80 bg-amber-400 px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-amber-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <span>Inspect Study Specification</span>
                  <span aria-hidden="true">→</span>
                </button>

                <span className="font-mono text-[10px] text-zinc-500 uppercase">
                  SIMULATION // SPEC 0{activeStudyIndex + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECONDARY ARCHIVE: ALL 4 DISCIPLINE CARDS ================= */}
        <div className="mt-20">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              VISUAL STUDIES ARCHIVE // 4 RESEARCH QUADRANTS
            </span>
            <span className="font-mono text-[11px] text-zinc-600">OBSIDIAN & AMBER THEME</span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {creativeStudies.map((study, index) => {
              const isSelected = activeStudyIndex === index;
              return (
                <motion.article
                  key={study.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`group relative flex flex-col justify-between rounded-xl border p-6 transition-all duration-300 ${
                    isSelected
                      ? "border-amber-400/50 bg-white/[0.03] shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                      : "border-white/[0.08] bg-black/40 hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className={isSelected ? "text-amber-400 font-bold" : "text-zinc-500"}>
                        SYS // {study.number}
                      </span>
                      <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
                        {study.aspectRatioLabel}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                        {study.discipline}
                      </span>
                      <h4 className="mt-1 text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                        {study.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                        {study.narrative}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between">
                    <button
                      onClick={() => handleSelectStudy(index)}
                      type="button"
                      className="font-mono text-xs text-amber-300 hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
                    >
                      <span>Load in Studio</span>
                      <span aria-hidden="true">↗</span>
                    </button>

                    <button
                      onClick={() => setModalStudy(study)}
                      type="button"
                      className="font-mono text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      Specs
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ================= REPUTABLE ETHOS & MEDIA PIPELINE FOOTER ================= */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>RESEARCH ARCHIVE // EXPERIMENTAL VISUAL STUDIES</span>
            </div>
            <span>EXTENSIBLE PIPELINE FOR FUTURE 35MM CAPTURES & SHADER EXPERIMENTS</span>
          </div>
        </Reveal>
      </div>

      {/* ================= LIGHTBOX SPECIFICATION MODAL ================= */}
      <AnimatePresence>
        {modalStudy && <StudySpecModal study={modalStudy} onClose={() => setModalStudy(null)} />}
      </AnimatePresence>
    </section>
  );
}
