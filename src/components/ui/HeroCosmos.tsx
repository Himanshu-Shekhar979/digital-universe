"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroCosmos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useCanvasFallback, setUseCanvasFallback] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const testCanvas = document.createElement("canvas");
      return !Boolean(
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl")
      );
    } catch {
      return true;
    }
  });
  const fallbackCanvasRef = useRef<HTMLCanvasElement>(null);

  // THREE.JS SPATIAL VOID INITIALIZATION
  useEffect(() => {
    if (useCanvasFallback) return;

    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      1000,
    );
    camera.position.z = 210;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      container.appendChild(renderer.domElement);
    } catch {
      requestAnimationFrame(() => setUseCanvasFallback(true));
      return;
    }

    // 1. LAYER 1: DISTANT COSMIC DUST (Subtle background depth)
    const dustCount = isMobile ? 120 : 240;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 440;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 320;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 280 - 40;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 1.4,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });

    const dustField = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustField);

    // 2. LAYER 2: FOREGROUND SPATIAL SIGNAL NODES (Interactive celestial constellation)
    const nodeCount = isMobile ? 40 : 80;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      // Spherical shell distribution around the central viewing axis
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 50 + Math.random() * 140;

      nodePositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7; // slight vertical compression
      nodePositions[i3 + 2] = r * Math.cos(phi) * 0.8;
    }

    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0xf8fafc,
      size: isMobile ? 2.0 : 2.6,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const nodeField = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeField);

    // 3. TELEMETRY LINE SEGMENTS (Sparse, restrained connections)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });

    // Generate static proximity lines
    const lineVertices: number[] = [];
    const maxConnectDist = isMobile ? 36 : 42;
    const maxDistSq = maxConnectDist * maxConnectDist;

    for (let i = 0; i < nodeCount; i++) {
      const ix = nodePositions[i * 3];
      const iy = nodePositions[i * 3 + 1];
      const iz = nodePositions[i * 3 + 2];

      for (let j = i + 1; j < nodeCount; j++) {
        const jx = nodePositions[j * 3];
        const jy = nodePositions[j * 3 + 1];
        const jz = nodePositions[j * 3 + 2];

        const dx = ix - jx;
        const dy = iy - jy;
        const dz = iz - jz;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq) {
          lineVertices.push(ix, iy, iz, jx, jy, jz);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lineVertices, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 4. DISTANT CELESTIAL MONOLITH (Immense, slow-drifting abstract wireframe structure)
    const monolithGeo = new THREE.IcosahedronGeometry(isMobile ? 65 : 95, 1);
    const monolithWireframe = new THREE.WireframeGeometry(monolithGeo);
    const monolithMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: isMobile ? 0.03 : 0.05,
      blending: THREE.AdditiveBlending,
    });
    const monolith = new THREE.LineSegments(monolithWireframe, monolithMaterial);
    monolith.position.set(0, 0, -110);
    scene.add(monolith);

    // 5. CELESTIAL HORIZON ORBITAL RING (Tilted astronomical horizon)
    const ringGeo = new THREE.RingGeometry(isMobile ? 80 : 125, isMobile ? 80.6 : 125.8, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.035,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const horizonRing = new THREE.Mesh(ringGeo, ringMaterial);
    horizonRing.rotation.x = Math.PI * 0.38;
    horizonRing.position.set(0, -10, -90);
    scene.add(horizonRing);

    // Parallax & Camera Drift State
    let targetX = 0;
    let targetY = 0;
    let isTabVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      targetX = (e.clientX - halfWidth) * 0.03;
      targetY = (e.clientY - halfHeight) * 0.03;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Initial static frame
    renderer.render(scene, camera);

    let animationFrameId: number | null = null;
    const startTime = performance.now();

    if (!reduceMotion) {
      const animate = (currentTime: number = performance.now()) => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isTabVisible) return;

        const elapsedTime = (currentTime - startTime) * 0.001;

        // Slow cinematic environmental drift
        dustField.rotation.y = elapsedTime * 0.012;
        dustField.rotation.x = Math.sin(elapsedTime * 0.008) * 0.05;

        nodeField.rotation.y = elapsedTime * 0.018;
        lines.rotation.y = elapsedTime * 0.018;

        // Monolith & horizon ring astronomical rotation
        monolith.rotation.y = elapsedTime * 0.005;
        monolith.rotation.x = elapsedTime * 0.003;
        horizonRing.rotation.z = -elapsedTime * 0.004;

        // Cinematic zero-G camera breathing & Lissajous curve drift blended with smooth mouse parallax
        const breathZ = Math.sin(elapsedTime * 0.22) * 8;
        camera.position.z = 210 + breathZ;

        const driftX = Math.sin(elapsedTime * 0.4) * 6;
        const driftY = Math.cos(elapsedTime * 0.3) * 4;

        camera.position.x += (targetX + driftX - camera.position.x) * 0.045;
        camera.position.y += (-targetY + driftY - camera.position.y) * 0.045;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      dustGeometry.dispose();
      dustMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      monolithGeo.dispose();
      monolithWireframe.dispose();
      monolithMaterial.dispose();
      ringGeo.dispose();
      ringMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [useCanvasFallback]);

  // 2D CANVAS FALLBACK (Only executes if WebGL is completely unavailable)
  useEffect(() => {
    if (!useCanvasFallback) return;
    const canvas = fallbackCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.2 + 0.1,
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = height;
        const alpha = p.baseAlpha + Math.sin(time * 0.002 + p.phase) * 0.15;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [useCanvasFallback]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-75"
    >
      {useCanvasFallback && (
        <canvas
          ref={fallbackCanvasRef}
          className="absolute inset-0 h-full w-full opacity-60"
        />
      )}
    </div>
  );
}
