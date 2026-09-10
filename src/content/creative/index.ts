export interface CreativeMediaItem {
  id: string;
  title: string;
  caption: string;
  year: string;
  aspectRatio: string;
  mediaUrl?: string; // Pluggable: when real asset is imported in public/creative/...
  medium: string;
  simulationMeta: {
    model: string;
    parameterA?: string;
    parameterB?: string;
    details?: string;
  };
}

export interface CreativeStudy {
  id: string;
  number: string;
  discipline: string;
  title: string;
  tagline: string;
  aspectRatioLabel: string;
  aspectRatioClass: string;
  narrative: string;
  principles: string[];
  simulationMeta: {
    studyType: string;
    model: string;
    keyMetricA: { label: string; value: string };
    keyMetricB: { label: string; value: string };
    keyMetricC: { label: string; value: string };
    mathOrFormula?: string;
  };
  colorPalette: { name: string; hex: string }[];
  deepDiveNotes: string[];
  futureMediaItems: CreativeMediaItem[];
}

export const creativeStudies: CreativeStudy[] = [
  {
    id: "algorithmic-aesthetics",
    number: "01",
    discipline: "Algorithmic Aesthetics",
    title: "Form emerging from mathematical logic.",
    tagline: "Generative Systems & Computational Geometry",
    aspectRatioLabel: "1:1 Square Canvas",
    aspectRatioClass: "aspect-square",
    narrative:
      "An exploration of procedural patterns, harmonic oscillations, and generative flow fields. Here, code ceases to be purely functional utility and becomes an expressive medium for spatial harmony and emergent complexity.",
    principles: [
      "Vector Field Mathematics & Trigonometric Phase Modulation",
      "Harmonic Oscillation & Complex Lissajous Trajectories",
      "Organic Procedural Variation through Controlled Noise Fields",
    ],
    simulationMeta: {
      studyType: "INTERACTIVE STUDY // GENERATIVE CANVAS",
      model: "SIMULATION // 2D HARMONIC FIELD",
      keyMetricA: { label: "ALGORITHM", value: "PARAMETRIC HARMONICS" },
      keyMetricB: { label: "AXIS RATIO", value: "3:4 PHASE FREQUENCY" },
      keyMetricC: { label: "SAMPLING", value: "VECTOR INTERPOLATION" },
      mathOrFormula: "x(t) = A · sin(a·t + δ),  y(t) = B · sin(b·t)",
    },
    colorPalette: [
      { name: "Obsidian Void", hex: "#030305" },
      { name: "Warm Amber", hex: "#F59E0B" },
      { name: "Muted Bronze", hex: "#D97706" },
      { name: "Atmospheric Violet", hex: "#8B5CF6" },
    ],
    deepDiveNotes: [
      "Procedural curves demonstrate that complex, organic visual forms can emerge deterministically from elementary mathematical formulas.",
      "The phase delta between vertical and horizontal frequency vectors simulates dynamic dimensional rotation on a 2D plane.",
      "In software architecture, this principle translates into designing fluid, natural UI transitions that follow mathematical continuous curves rather than abrupt step functions.",
    ],
    futureMediaItems: [],
  },
  {
    id: "cinematic-language",
    number: "02",
    discipline: "Cinematic Language",
    title: "Optics, aspect ratio, and visual pacing.",
    tagline: "Widescreen Composition & Anamorphic Framing",
    aspectRatioLabel: "2.39:1 Anamorphic",
    aspectRatioClass: "aspect-[2.39/1]",
    narrative:
      "A study of how wide anamorphic frames, optical focal compression, and deliberate negative space guide human perception, establish visual hierarchy, and cultivate atmospheric tension.",
    principles: [
      "Anamorphic 2.39:1 Spatial Framing & Horizontal Compression",
      "Focal Perspective Dynamics (Wide 24mm vs. Telephoto 85mm)",
      "Atmospheric Value Range & Luminance Chiaroscuro",
    ],
    simulationMeta: {
      studyType: "INTERACTIVE STUDY // OPTICAL VIEW",
      model: "FOCAL MODEL // 50MM SIMULATION",
      keyMetricA: { label: "ASPECT RATIO", value: "2.39:1 CINEMATIC CROP" },
      keyMetricB: { label: "FOCAL LENGTH", value: "50MM STANDARD PRIME" },
      keyMetricC: { label: "SHUTTER MODEL", value: "180° MOTION CADENCE" },
      mathOrFormula: "FOV = 2 · arctan(sensor_dimension / (2 · focal_length))",
    },
    colorPalette: [
      { name: "Deep Charcoal", hex: "#09090B" },
      { name: "Cinematic Cyan", hex: "#06B6D4" },
      { name: "Tungsten Glow", hex: "#FB923C" },
      { name: "Platinum White", hex: "#E4E4E7" },
    ],
    deepDiveNotes: [
      "The 2.39:1 aspect ratio expands horizontal narrative real estate, demanding careful balance between active visual subjects and resonant negative space.",
      "Focal length alters spatial perception: wide lenses emphasize environmental context and spatial separation, while telephoto lengths compress background planes into intimate, focused moments.",
      "Applied to digital interface design, optical principles dictate viewport hierarchy, hero section scale, and natural focal points that guide user navigation.",
    ],
    futureMediaItems: [],
  },
  {
    id: "motion-dynamics",
    number: "03",
    discipline: "Motion Dynamics",
    title: "Choreography with physical intent.",
    tagline: "Kinetic Easing & Spatial Timing Physics",
    aspectRatioLabel: "16:9 Widescreen",
    aspectRatioClass: "aspect-[16/9]",
    narrative:
      "Treating digital interface movement as tangible physics rather than mechanical transitions. Movement achieves tactile resonance through intentional deceleration curves, spring dynamics, and momentum preservation.",
    principles: [
      "Damped Harmonic Spring Physics & Settling Thresholds",
      "Cubic-Bezier Curvature & Kinetic Anticipation",
      "Spatial Hierarchy through Coordinated Staggered Timing",
    ],
    simulationMeta: {
      studyType: "INTERACTIVE STUDY // KINETIC MODEL",
      model: "MOTION MODEL // DAMPED HARMONIC",
      keyMetricA: { label: "EASING CURVE", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
      keyMetricB: { label: "DAMPING RATIO", value: "ζ = 0.82 SUB-CRITICAL" },
      keyMetricC: { label: "VELOCITY TRANSFER", value: "CONTINUOUS MOMENTUM" },
      mathOrFormula: "m · x''(t) + c · x'(t) + k · x(t) = 0",
    },
    colorPalette: [
      { name: "Pitch Black", hex: "#000000" },
      { name: "Kinetic Amber", hex: "#F59E0B" },
      { name: "Velocity Slate", hex: "#64748B" },
      { name: "Neutral Zinc", hex: "#A1A1AA" },
    ],
    deepDiveNotes: [
      "Linear interpolation feels mechanical and unnatural because physical objects in the real world require time to accelerate and decelerate under friction.",
      "Sub-critically damped springs provide subtle organic settling without annoying, disorienting bounce.",
      "In high-performance web systems, choreography must be decoupled from layout recalculation by strictly animating GPU-composited properties (transform and opacity).",
    ],
    futureMediaItems: [],
  },
  {
    id: "visual-composition",
    number: "04",
    discipline: "Visual Composition",
    title: "Observing balance, contrast, and structure.",
    tagline: "Geometric Harmony & Photographic Vision",
    aspectRatioLabel: "4:5 Portrait",
    aspectRatioClass: "aspect-[4/5]",
    narrative:
      "Studying natural illumination, structural alignment, and tonal contrast. Developing the observational eye needed to construct visually balanced, accessible, and commanding digital spaces.",
    principles: [
      "Dynamic Symmetry & Golden Spiral Geometric Distribution",
      "Rule of Thirds Alignment Vectors & Focal Intersections",
      "High Tonal Range, Chiaroscuro Lighting, & Negative Space",
    ],
    simulationMeta: {
      studyType: "INTERACTIVE STUDY // COMPOSITION GRID",
      model: "COMPOSITION MODEL // GOLDEN RATIO",
      keyMetricA: { label: "GRID SYSTEM", value: "GOLDEN RATIO (φ ≈ 1.618)" },
      keyMetricB: { label: "CONTRAST RATIO", value: "HIGH TONAL RANGE" },
      keyMetricC: { label: "BALANCE", value: "ASYMMETRIC EQUILIBRIUM" },
      mathOrFormula: "φ = (1 + √5) / 2 ≈ 1.6180339887",
    },
    colorPalette: [
      { name: "True Black", hex: "#09090B" },
      { name: "Silver Highlight", hex: "#F4F4F5" },
      { name: "Muted Warm Gray", hex: "#71717A" },
      { name: "Deep Amber Shadow", hex: "#78350F" },
    ],
    deepDiveNotes: [
      "A photograph's visual power rarely comes from decorative complexity, but from what is intentionally excluded through framing and negative space.",
      "The golden spiral and harmonic triangles distribute visual weight in a way that feels organic, guiding the eye effortlessly through a scene.",
      "Translating this sensitivity into web architecture ensures layouts feel breathable, balanced, and instantly legible across disparate screen geometries.",
    ],
    futureMediaItems: [],
  },
];

