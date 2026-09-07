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

  // Pause the ambient loops for reduced-motion users and when the tab is hidden.
  const paused = reduceMotion === true || hidden;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Main ambient glow */}
      <motion.div
        animate={
          paused
            ? { opacity: 0.4 }
            : {
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.5, 0.35],
              }
        }
        transition={
          paused
            ? { duration: 0 }
            : {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute left-1/2 top-[15%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[120px]"
      />

      {/* Secondary glow */}
      <motion.div
        animate={
          paused
            ? { opacity: 0.2 }
            : {
                x: [0, 40, 0],
                y: [0, -30, 0],
                opacity: [0.15, 0.25, 0.15],
              }
        }
        transition={
          paused
            ? { duration: 0 }
            : {
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute right-[-200px] top-[40%] h-[500px] w-[500px] rounded-full bg-zinc-500/[0.04] blur-[120px]"
      />

      {/* Very subtle vertical atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent" />
    </div>
  );
}