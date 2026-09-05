"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GsapSetup = (instance: typeof gsap) => void;

export function useGsapScroll(
  scope: RefObject<HTMLElement | null>,
  setup: GsapSetup,
) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  }, [setup]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      setupRef.current(gsap);
    }, scope);

    return () => {
      context.revert();
    };
  }, [scope]);
}
