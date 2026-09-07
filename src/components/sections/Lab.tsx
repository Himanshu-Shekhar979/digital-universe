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
    <div className="rounded border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex items-center justify-between pb-3 text-[10px] uppercase tracking-wider text-zinc-500 sm:tracking-widest">
        <span>Interactive Grid</span>
        <button
          onClick={handleRandomize}
          className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 hover:border-zinc-500 hover:text-white transition-colors"
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
              onClick={() => toggleCell(index)}
              aria-label={`Toggle grid cell ${index}`}
              className={`rounded-sm transition-all duration-300 focus:outline-none ${
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
    <div className="rounded border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex gap-1.5 pb-3">
        {aiPresets.map((p, idx) => (
          <button
            key={p.prompt}
            onClick={() => handleSelect(idx)}
            className={`rounded border px-2 py-1 text-[10px] uppercase tracking-wider transition-colors ${
              selectedPreset === idx
                ? "border-white bg-white text-black font-semibold"
                : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white"
            }`}
          >
            Preset 0{idx + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-500">
        <span className="rounded border border-zinc-700 bg-black px-2 py-1 text-zinc-300 truncate max-w-[120px]">
          {aiPresets[selectedPreset].prompt}
        </span>
        <span className="h-px flex-1 bg-zinc-700 relative">
          {isProcessing && (
            <span className="absolute inset-0 bg-white animate-pulse" />
          )}
        </span>
        <span className="rounded border border-zinc-600 px-2 py-1 text-white">
          {isProcessing ? "Processing..." : "Ready"}
        </span>
      </div>

      <div className="mt-3 rounded border border-zinc-900 bg-black/60 p-2.5 font-mono text-[11px] leading-relaxed text-zinc-300 min-h-[38px] flex items-center">
        {isProcessing ? (
          <span className="text-zinc-600 animate-pulse">Synthesizing inference output...</span>
        ) : (
          <span>→ {aiPresets[selectedPreset].output}</span>
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
    <div className="w-full min-w-0 overflow-hidden rounded border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
        <div className="flex gap-2">
          {snippets.map((snip, idx) => (
            <button
              key={snip.name}
              onClick={() => setActiveTab(idx)}
              className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                activeTab === idx
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {snip.name}.ts
            </button>
          ))}
        </div>
        <span className="text-[10px] text-zinc-600">Active Architecture</span>
      </div>
      <pre className="mt-3 w-full min-w-0 text-[11px] leading-5 text-zinc-400 overflow-x-auto whitespace-pre">
        {snippets[activeTab].code}
      </pre>
    </div>
  );
}

// --- 4. Stack Orbit Experiment ---
function StackOrbitInteractive() {
  const [speed, setSpeed] = useState(1);
  const nodes = ["Next.js", "React 19", "Three.js", "GSAP", "TypeScript", "Lenis"];

  return (
    <div className="relative flex h-32 flex-col items-center justify-center overflow-hidden rounded border border-zinc-800 bg-zinc-950 p-3">
      <div className="absolute top-2 right-3 flex items-center gap-2">
        <button
          onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
          className="text-[9px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          Speed: {speed}x
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Core Node */}
        <span className="relative z-10 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-mono tracking-widest text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          CORE
        </span>

        {/* Orbit Ring */}
        <div className="absolute h-24 w-60 rounded-full border border-zinc-800 border-dashed animate-spin" style={{ animationDuration: `${20 / speed}s` }}>
          {nodes.map((node, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 110;
            const y = Math.sin(angle) * 44;
            return (
              <span
                key={node}
                className="absolute text-[9px] font-mono uppercase tracking-wider text-zinc-400 bg-black/80 px-1.5 py-0.5 rounded border border-zinc-800/80 hover:border-white hover:text-white transition-colors"
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
      if (!test.getContext("webgl")) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 3.6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Geometry: Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(1.3, 1);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    const mesh = new THREE.LineSegments(wireframe, material);
    scene.add(mesh);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.007;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount || !renderer) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
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
    <div className="relative h-32 w-full overflow-hidden rounded border border-zinc-800 bg-zinc-950 cursor-grab active:cursor-grabbing">
      <div className="absolute top-2 right-3 text-[9px] uppercase tracking-widest text-zinc-500 z-10 pointer-events-none">
        Drag to Rotate 3D
      </div>
      <div ref={mountRef} className="h-full w-full" />
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
    category: "AI",
    title: "Prompt → Model → Output",
    description: "Interactive simulation of token dispatch, model inference, and streaming system response.",
    concept: "Signals / systems",
    Component: AISignalInteractive,
  },
  {
    number: "03",
    category: "Web Experiments",
    title: "Code Playground",
    description: "Interactive architecture viewer displaying active production patterns and protocols.",
    concept: "Interface / code",
    Component: CodePlaygroundInteractive,
  },
  {
    number: "04",
    category: "Technology",
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
    <section id="lab" className="min-h-screen scroll-mt-24 border-t border-zinc-900 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-10 text-sm uppercase tracking-[0.3em] text-zinc-500">03 — The Lab</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Where ideas become <span className="text-zinc-500">experiments.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              An interactive playground for creative coding, AI inference models, Three.js geometries,
              and purposeful digital interface paradigms.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid w-full min-w-0 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-2">
          {experiments.map((experiment, index) => {
            const { Component } = experiment;
            return (
              <Reveal key={experiment.number} delay={0.08 + index * 0.05} className="w-full min-w-0">
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative h-full w-full min-w-0 overflow-hidden bg-black p-6 transition-colors duration-300 hover:bg-zinc-950 sm:p-8 md:p-10"
                >
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-sm text-zinc-600">{experiment.number}</span>
                        <span className="text-right text-xs uppercase tracking-[0.18em] text-zinc-500">
                          {experiment.category}
                        </span>
                      </div>

                      <h3 className="mt-10 text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                        {experiment.title}
                      </h3>

                      <p className="mt-4 max-w-md leading-relaxed text-zinc-400 text-sm">
                        {experiment.description}
                      </p>

                      <div className="mt-6">
                        <Component />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-zinc-900 pt-5 text-sm">
                      <span className="text-zinc-500 font-mono text-xs">{experiment.concept}</span>
                      <span className="hidden text-zinc-600 transition-colors group-hover:text-white sm:inline" aria-hidden="true">
                        Active Interactive Module →
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-16 max-w-2xl border-t border-zinc-800 pt-10 leading-relaxed text-zinc-500">
            The Lab is continuously updated as new algorithms, WebGL shaders, and interaction models are prototyped.
          </p>
        </Reveal>
      </div>
    </section>
  );
}