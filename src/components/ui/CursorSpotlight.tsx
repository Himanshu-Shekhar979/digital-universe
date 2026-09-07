"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;

    // Respect reduced motion: keep the glow off-screen and inert.
    if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let posX = -300;
    let posY = -300;

    const handleMouseMove = (event: MouseEvent) => {
      posX = event.clientX;
      posY = event.clientY;

      if (rafId !== 0) return;

      rafId = requestAnimationFrame(() => {
        rafId = 0;
        glow.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-white/[0.035] blur-[100px]"
        style={{ transform: "translate3d(-300px, -300px, 0)" }}
      />
    </div>
  );
}