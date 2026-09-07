"use client";

import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function scrollToSection(target: string | HTMLElement, offset = -60) {
  if (typeof window === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (lenisInstance && !reduceMotion) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  // Fallback if Lenis is not available or reduced motion is preferred
  let element: HTMLElement | null = null;
  if (typeof target === "string") {
    element = document.querySelector(target);
  } else {
    element = target;
  }

  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top: y,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  } else if (target === "#top" || target === "top") {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }
}

