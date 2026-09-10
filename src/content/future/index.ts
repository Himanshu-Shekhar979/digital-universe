export type FutureCategory =
  | "All"
  | "Interactive Systems"
  | "Real-Time Systems"
  | "AI Workflows"
  | "Core Engineering";

export interface FutureVector {
  id: string;
  code: string;
  title: string;
  tagline: string;
  category: "Interactive Systems" | "Real-Time Systems" | "AI Workflows" | "Core Engineering";
  currentlyExploring: string;
  whatIWantToBuild: string;
  nextChallenge: string;
  keyTopics: string[];
}

export const futureFilters: FutureCategory[] = [
  "All",
  "Interactive Systems",
  "Real-Time Systems",
  "AI Workflows",
  "Core Engineering",
];

export const futureHorizonMeta = {
  currentBaseline: "CSE Graduate // Building at the intersection of engineering and creative technology",
  ethos: "Next is a direction, not a destination.",
  tagline:
    "A realistic view of the technical subjects, interactive challenges, and engineering experiments I want to keep moving toward.",
  closingSignal:
    "Next is not a fixed destination—it's an open vector. Ready to build, learn, and grow alongside collaborative engineering teams.",
};

export const futureVectors: FutureVector[] = [
  {
    id: "real-time-collaboration",
    code: "VEC-01",
    title: "Real-Time & Stateful Collaboration",
    tagline: "Event-driven communication, multiplayer rooms, and live synchronization",
    category: "Real-Time Systems",
    currentlyExploring:
      "Studying deeper WebSocket connection lifecycles, reconnection resilience patterns, and foundational concepts of distributed state synchronization.",
    whatIWantToBuild:
      "Multiplayer digital workspaces and real-time collaborative tools that feel instantaneous, reliable, and fluid for co-located or remote teams.",
    nextChallenge:
      "Designing conflict-resilient data propagation and graceful offline reconnection without complex state fragmentation.",
    keyTopics: [
      "WebSocket Lifecycle",
      "Event Synchronization",
      "Room Segmentation",
      "Reconnection Mechanics",
    ],
  },
  {
    id: "ai-developer-workflows",
    code: "VEC-02",
    title: "AI-Assisted Developer Workflows & Generative Tooling",
    tagline: "Context management, token streaming, and thoughtful AI-augmented tooling",
    category: "AI Workflows",
    currentlyExploring:
      "Investigating prompt engineering design patterns, asynchronous token streaming interfaces, and context window budgeting for specialized developer tools.",
    whatIWantToBuild:
      "Thoughtful development assistants and contextual code exploration tools that augment human engineering without noisy hallucinations.",
    nextChallenge:
      "Structuring prompt evaluations and low-latency chunk buffer rendering to ensure responsive, deterministic UI updates.",
    keyTopics: [
      "Token Streaming UX",
      "Context Window Budgeting",
      "Prompt Orchestration",
      "Structured LLM Responses",
    ],
  },
  {
    id: "creative-computing-3d-web",
    code: "VEC-03",
    title: "Creative Computing & 3D Interactive Web",
    tagline: "Spatial interfaces, WebGL/Three.js environments, and tactile motion physics",
    category: "Interactive Systems",
    currentlyExploring:
      "Exploring custom Three.js shader materials, spring-damped kinetic motion, and procedural geometry that reacts to visitor interaction.",
    whatIWantToBuild:
      "Spatial web environments and interactive computational artifacts that transform abstract digital information into tangible visual experiences.",
    nextChallenge:
      "Maintaining sustained 60fps frame rates and strict draw call limits across varied mobile GPUs and low-power devices.",
    keyTopics: [
      "Three.js / WebGL",
      "Parametric Geometry",
      "Spring Physics",
      "Spatial Depth & Shaders",
    ],
  },
  {
    id: "core-systems-performance",
    code: "VEC-04",
    title: "Core Systems & Performance Engineering",
    tagline: "Algorithmic optimization, memory profiling, and robust system boundaries",
    category: "Core Engineering",
    currentlyExploring:
      "Deepening academic foundations in algorithmic problem solving, CPU scheduling, virtual memory concepts, and web performance profiling.",
    whatIWantToBuild:
      "Lean, dependable web platforms with clean module boundaries, minimal bundle overhead, and accessible semantic architecture.",
    nextChallenge:
      "Bridging theoretical complexity bounds (Big-O) with real-world browser DOM constraints and asynchronous event-loop scheduling.",
    keyTopics: [
      "Algorithmic Efficiency",
      "DOM Optimization",
      "Memory Profiling",
      "System Boundaries",
    ],
  },
];

