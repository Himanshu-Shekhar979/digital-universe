"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

import Reveal from "@/components/ui/Reveal";

// --- 1. Generative Grid Experiment ---
function GenerativeGridInteractive() {
  const [activeIndices, setActiveIndices] = useState<number[]>([3, 11, 19, 27]);

  const toggleCell = (index: number) => {
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleRandomize = () => {
    const randoms = Array.from({ length: 8 }, () => Math.floor(Math.random() * 32));
    setActiveIndices(randoms);
  };

  return (
    <div className="rounded-lg border border-white/[0.08] bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse" />
          Pulse Matrix (32 Nodes)
        </span>
        <button
          onClick={handleRandomize}
          type="button"
          className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-zinc-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
        >
          Generate
        </button>
      </div>
      <div className="grid h-28 grid-cols-8 gap-1.5 overflow-hidden">
        {Array.from({ length: 32 }, (_, index) => {
          const isActive = activeIndices.includes(index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => toggleCell(index)}
              aria-label={`Toggle grid node ${index + 1} (${isActive ? "active" : "inactive"})`}
              className={`rounded-sm transition-all duration-300 focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none ${
                isActive
                  ? "bg-white scale-105 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                  : "bg-white/[0.04] hover:bg-white/[0.18]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

// --- 2. AI Prompt -> Model -> Output Experiment ---
const aiPresets = [
  { prompt: "Analyze architecture", output: "Clean App Router modularity with isolated client boundaries." },
  { prompt: "Optimize render loop", output: "Decouple requestAnimationFrame from React component state." },
  { prompt: "Verify accessibility", output: "All interactive elements meet WCAG 2.1 AA focus requirements." },
];

function AISignalInteractive() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelect = (idx: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSelectedPreset(idx);
    setTimeout(() => setIsProcessing(false), 380);
  };

  return (
    <div className="rounded-lg border border-white/[0.08] bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex flex-wrap gap-1.5 pb-3">
        {aiPresets.map((p, idx) => (
          <button
            key={p.prompt}
            type="button"
            onClick={() => handleSelect(idx)}
            className={`rounded border px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider transition-all focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none ${
              selectedPreset === idx
                ? "border-white bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                : "border-white/[0.08] text-zinc-400 bg-white/[0.02] hover:border-white/20 hover:text-white"
            }`}
          >
            Preset 0{idx + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
        <span className="rounded border border-white/10 bg-black/80 px-2 py-1 text-zinc-300 truncate max-w-[140px]">
          {aiPresets[selectedPreset].prompt}
        </span>
        <span className="h-px flex-1 bg-zinc-850 relative overflow-hidden">
          {isProcessing && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
          )}
        </span>
        <span className="rounded border border-white/10 px-2 py-1 text-zinc-300">
          {isProcessing ? "Inferring..." : "Ready"}
        </span>
      </div>

      <div className="mt-3 rounded border border-white/[0.06] bg-black/80 p-3 font-mono text-[11px] leading-relaxed text-zinc-300 min-h-[44px] flex items-center">
        {isProcessing ? (
          <span className="text-zinc-500 animate-pulse flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400 animate-ping" />
            Synthesizing inference output...
          </span>
        ) : (
          <span className="text-zinc-200">
            <span className="text-emerald-400 mr-2">→</span>
            {aiPresets[selectedPreset].output}
          </span>
        )}
      </div>
    </div>
  );
}

// --- 3. Code Playground Experiment ---
const snippets = [
  {
    name: "Hook",
    code: `// Isomorphic GSAP ScrollTrigger\nconst ctx = gsap.context(() => {\n  gsap.fromTo("[data-reveal]", { y: 20 }, { y: 0 });\n}, scope);\nreturn () => ctx.revert();`,
  },
  {
    name: "Socket",
    code: `// Real-Time Event Dispatch\nsocket.on("code:mutation", (delta) => {\n  collabBuffer.apply(delta);\n  editor.syncRemoteCursor(delta.userId);\n});`,
  },
];

function CodePlaygroundInteractive() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-white/[0.08] bg-black/60 p-4 font-mono text-xs backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex gap-2">
          {snippets.map((snip, idx) => (
            <button
              key={snip.name}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded transition-colors focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none ${
                activeTab === idx
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              {snip.name}.ts
            </button>
          ))}
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Active Pattern
        </span>
      </div>
      <pre className="mt-3 w-full min-w-0 text-[11px] leading-relaxed text-zinc-300 overflow-x-auto whitespace-pre p-2.5 bg-black/50 rounded border border-white/[0.04]">
        {snippets[activeTab].code}
      </pre>
    </div>
  );
}

// --- 4. Stack Orbit Experiment ---
function StackOrbitInteractive() {
  const [speed, setSpeed] = useState(1);
  const reduceMotion = useReducedMotion();
  const nodes = ["Next.js", "React 19", "Three.js", "GSAP", "TypeScript", "Lenis"];

  return (
    <div className="relative flex h-36 flex-col items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-black/60 p-4 backdrop-blur-sm">
      <div className="absolute top-2.5 right-3 flex items-center gap-2 z-20">
        <button
          onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
          type="button"
          className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded hover:text-white hover:border-white/30 transition-colors focus-visible:ring-1 focus-visible:ring-white/40 focus:outline-none"
        >
          Speed: {speed}x
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Core Node */}
        <span className="relative z-10 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-mono tracking-widest text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          CORE
        </span>

        {/* Orbit Ring */}
        <div
          className={`absolute h-24 w-60 rounded-full border border-zinc-700/80 border-dashed ${
            reduceMotion ? "" : "animate-spin"
          }`}
          style={{ animationDuration: `${20 / speed}s` }}
        >
          {nodes.map((node, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 110;
            const y = Math.sin(angle) * 44;
            return (
              <span
                key={node}
                className="absolute text-[9px] font-mono uppercase tracking-wider text-zinc-300 bg-black/90 px-1.5 py-0.5 rounded border border-white/10 hover:border-white/40 hover:text-white transition-colors"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {node}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- 5. Three.js 3D Wireframe Experiment ---
function ThreeWireframeInteractive() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    // WebGL Check
    try {
      const test = document.createElement("canvas");
      if (!test.getContext("webgl") && !test.getContext("experimental-webgl")) return;
    } catch {
      return;
    }

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.4;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Geometry: Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(1.25, 1);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const mesh = new THREE.LineSegments(wireframe, material);
    scene.add(mesh);

    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPosition.x;
      const deltaY = e.clientY - previousPosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;

      previousPosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch handling
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousPosition.x;
      const deltaY = e.touches[0].clientY - previousPosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;

      previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.x += 0.004;
        mesh.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount || !renderer) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      mount.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      wireframe.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black/60 cursor-grab active:cursor-grabbing touch-pan-y backdrop-blur-sm">
      <div className="absolute top-2.5 left-3 text-[9px] font-mono uppercase tracking-widest text-zinc-500 z-10 pointer-events-none hidden sm:block">
        REAL-TIME WEBGL // VERTICES: 12 // FACES: 20
      </div>
      <div className="absolute top-2.5 right-3 text-[9px] font-mono uppercase tracking-widest text-zinc-400 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded z-10 pointer-events-none">
        Drag to Rotate 3D
      </div>
      <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

// --- Main Lab Component ---
const experiments = [
  {
    number: "01",
    category: "Creative Coding",
    title: "Generative Grid",
    description: "Algorithmic pulse field responding to pointer coordinates and procedural triggers.",
    concept: "Pattern / motion",
    Component: GenerativeGridInteractive,
  },
  {
    number: "02",
    category: "AI Systems",
    title: "Prompt → Model → Output",
    description: "Interactive simulation of token dispatch, model inference, and streaming system response.",
    concept: "Signals / systems",
    Component: AISignalInteractive,
  },
  {
    number: "03",
    category: "Web Architecture",
    title: "Code Playground",
    description: "Interactive architecture viewer displaying active production patterns and protocols.",
    concept: "Interface / code",
    Component: CodePlaygroundInteractive,
  },
  {
    number: "04",
    category: "Runtime Architecture",
    title: "Stack Orbit",
    description: "Orbital constellation visualizing modern web runtime components and engineering frameworks.",
    concept: "Web / data / runtime",
    Component: StackOrbitInteractive,
  },
  {
    number: "05",
    category: "3D & WebGL",
    title: "Polyhedron Matrix",
    description: "Direct Three.js 3D wireframe mesh with real-time mouse drag physics and WebGL lifecycle safety.",
    concept: "WebGL / Three.js",
    Component: ThreeWireframeInteractive,
  },
];

export default function Lab() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="lab"
      aria-label="World 03: The Lab — Interactive Engineering Sandbox"
      className="relative min-h-screen scroll-mt-24 border-t border-white/[0.06] bg-black px-6 py-28 sm:py-36 text-white overflow-hidden"
    >
      {/* Top atmospheric horizon blend */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/90 to-transparent z-10" />

      {/* Bottom atmospheric horizon blend */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Ambient Spatial Lighting (contained to prevent horizontal overflow) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-[90vw] h-[400px] bg-slate-400/[0.018] blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] max-w-[80vw] h-[300px] bg-zinc-300/[0.012] blur-[120px] rounded-full" />
      </div>

      {/* Frame telemetry markers */}
      <div className="pointer-events-none absolute left-6 top-8 hidden lg:block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700/60 select-none">
        SEC // 003 [LAB_STABLE]
      </div>
      <div className="pointer-events-none absolute right-6 top-8 hidden lg:block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700/60 select-none">
        NODE // EXPERIMENTAL_SANDBOX
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header telemetry badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              WORLD 03 // THE LAB
            </span>
          </div>
        </Reveal>

        {/* Dual-tone monolithic headline */}
        <Reveal delay={0.08}>
          <div className="max-w-4xl">
            <h2 className="text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block font-medium text-white tracking-tighter">WHERE IDEAS BECOME</span>
              <span className="block text-zinc-500 font-light mt-1">EXPERIMENTS.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
              An interactive sandbox of real-time algorithms, AI streaming inference patterns, 3D WebGL geometries, and applied computer science experiments.
            </p>
          </div>
        </Reveal>

        {/* 2x2 Grid for 01-04 + Full Width Spanned 05 (3D Polyhedron Matrix) */}
        <div className="mt-16 grid w-full min-w-0 gap-6 lg:grid-cols-2">
          {experiments.map((experiment, index) => {
            const { Component } = experiment;
            const isFullWidth = index === 4; // Experiment 05 (Polyhedron Matrix) spans full width

            return (
              <Reveal
                key={experiment.number}
                delay={0.08 + index * 0.05}
                className={`w-full min-w-0 ${isFullWidth ? "lg:col-span-2" : ""}`}
              >
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative h-full w-full min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
                >
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      {/* Telemetry sub-header */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-zinc-500 font-semibold">EXP // {experiment.number}</span>
                          <span className="h-1 w-1 rounded-full bg-zinc-750" />
                          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400/80">ONLINE</span>
                        </div>
                        <span className="text-right text-[11px] uppercase tracking-[0.16em] text-zinc-400 font-mono">
                          {experiment.category}
                        </span>
                      </div>

                      <h3 className="mt-6 text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl text-white">
                        {experiment.title}
                      </h3>

                      <p className="mt-2.5 max-w-2xl leading-relaxed text-zinc-400 text-sm">
                        {experiment.description}
                      </p>

                      <div className="mt-6">
                        <Component />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-mono">
                      <span className="text-zinc-500">{experiment.concept}</span>
                      <span className="text-zinc-500 transition-colors group-hover:text-zinc-200 flex items-center gap-1.5" aria-hidden="true">
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        ACTIVE MODULE →
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        {/* Footer Note */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span>SANDBOX STATUS // ACTIVE PROTOTYPES [5/5]</span>
            </div>
            <span>CONTINUOUS TECHNICAL ITERATION & EXPERIMENTATION</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}