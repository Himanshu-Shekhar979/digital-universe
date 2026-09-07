"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type CursorMode = "DEFAULT" | "VIEW" | "EXPLORE" | "DRAG" | "OPEN";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function usePointerFine() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(pointer: fine)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(pointer: fine)").matches : false),
    () => false,
  );
}

export default function CustomCursor() {
  const isClient = useIsClient();
  const isPointerFine = usePointerFine();
  const reduceMotion = useReducedMotion();

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<CursorMode>("DEFAULT");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isPointerFine || reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over element with data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const customMode = cursorTarget.getAttribute("data-cursor")?.toUpperCase() as CursorMode;
        if (["VIEW", "EXPLORE", "DRAG", "OPEN"].includes(customMode)) {
          setMode(customMode);
          return;
        }
      }

      // Check interactive tags
      if (target?.closest("button, a, input, textarea, [role='button']")) {
        setMode("OPEN");
      } else {
        setMode("DEFAULT");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isPointerFine, reduceMotion]);

  if (!isClient || !isPointerFine || reduceMotion || !isVisible) {
    return null;
  }

  const isExpanded = mode !== "DEFAULT";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      <motion.div
        className="pointer-events-none fixed top-0 left-0 flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px] text-[9px] font-mono uppercase tracking-widest text-white transition-colors duration-200"
        style={{
          x: position.x,
          y: position.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 52 : 12,
          height: isExpanded ? 52 : 12,
          borderColor: isExpanded ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)",
          backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.05)",
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
          mass: 0.2,
        }}
      >
        {isExpanded && mode !== "OPEN" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="select-none"
          >
            {mode}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

