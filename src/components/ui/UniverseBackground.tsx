"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function UniverseBackground() {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setHidden(document.hidden);

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Pause ambient loops for reduced-motion users and when the tab is hidden.
  const paused = reduceMotion === true || hidden;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Deepest Void Baseline */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Atmospheric Void Horizon Glow */}
      <motion.div
        animate={
          paused
            ? { opacity: 0.3 }
            : {
                scale: [1, 1.06, 1],
                opacity: [0.22, 0.36, 0.22],
              }
        }
        transition={
          paused
            ? { duration: 0 }
            : {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute left-1/2 top-[12%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-slate-400/[0.022] blur-[140px]"
      />

      {/* Secondary Ethereal Drift */}
      <motion.div
        animate={
          paused
            ? { opacity: 0.15 }
            : {
                x: [0, 30, 0],
                y: [0, -25, 0],
                opacity: [0.12, 0.22, 0.12],
              }
        }
        transition={
          paused
            ? { duration: 0 }
            : {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute right-[-140px] top-[38%] h-[560px] w-[560px] rounded-full bg-zinc-400/[0.02] blur-[130px]"
      />

      {/* Third Low Ambient Void Base */}
      <div className="absolute bottom-[-10%] left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.012] blur-[150px]" />

      {/* Central Singularity Light Pillar */}
      <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute left-1/2 top-0 h-full w-[180px] -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-400/[0.012] to-transparent blur-3xl" />

      {/* Faint Celestial Horizon Line */}
      <div className="absolute top-[46%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400/[0.03] to-transparent" />

      {/* Subtle Vertical Atmospheric Dissolve */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

      {/* Cinematic Edge Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.98)]" />
    </div>
  );
}