export type KnowledgeDepth =
  | "Foundations"
  | "Active Practice"
  | "Working Knowledge"
  | "Active Exploration";

export type KnowledgeCategory =
  | "All"
  | "Computer Science"
  | "Web Platforms"
  | "Systems & Data"
  | "Emerging AI";

export interface KnowledgeTopic {
  name: string;
  detail: string;
}

export interface KnowledgeDomain {
  id: string;
  number: string;
  name: string;
  category: "Computer Science" | "Web Platforms" | "Systems & Data" | "Emerging AI";
  depth: KnowledgeDepth;
  tagline: string;
  description: string;
  coreConcepts: string[];
  appliedContext: string;
  academicAnchor: string;
  keyTopics: KnowledgeTopic[];
}

export const depthDefinitions: Record<KnowledgeDepth, { label: string; description: string; color: string }> = {
  "Foundations": {
    label: "FOUNDATIONS",
    description: "Core academic and theoretical computer science fundamentals.",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/[0.04]",
  },
  "Active Practice": {
    label: "ACTIVE PRACTICE",
    description: "Technologies and engineering patterns I have applied in projects.",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.04]",
  },
  "Working Knowledge": {
    label: "WORKING KNOWLEDGE",
    description: "Practical development tools and relational database concepts.",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/[0.04]",
  },
  "Active Exploration": {
    label: "ACTIVE EXPLORATION",
    description: "Emerging subjects and AI workflows under active study.",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/[0.04]",
  },
};

export const depthClarification =
  "These labels describe my current relationship with a subject, not a measure of expertise.";

export const knowledgeDomains: KnowledgeDomain[] = [
  {
    id: "algorithms-data-structures",
    number: "01",
    name: "Algorithms & Data Structures",
    category: "Computer Science",
    depth: "Foundations",
    tagline: "Algorithmic logic and data organization",
    description:
      "Core data structures, recursive problem solving, and asymptotic time and space complexity analysis.",
    coreConcepts: [
      "Arrays, Linked Lists, Stacks, Queues, and Binary Trees",
      "Time and Space Complexity Analysis (Big-O Notation)",
      "Searching, Sorting, and Recursive Decomposition",
      "Basic Graph Traversals (BFS and DFS Concepts)",
    ],
    appliedContext: "Problem-solving practice and structured data modeling.",
    academicAnchor: "B.Tech & Diploma CSE Core Curriculum",
    keyTopics: [
      { name: "Complexity", detail: "O(1), O(n), O(n log n) efficiency evaluation" },
      { name: "Linear Structures", detail: "Arrays, dynamic lists, stack/queue mechanics" },
      { name: "Trees & Graphs", detail: "Binary search trees, traversal sequences, path finding" },
    ],
  },
  {
    id: "web-development",
    number: "02",
    name: "Web Development",
    category: "Web Platforms",
    depth: "Active Practice",
    tagline: "Semantic markup, modern layout, and accessible interfaces",
    description:
      "Building responsive, accessible web interfaces using semantic HTML5, modern CSS Grid/Flexbox, and React component structures.",
    coreConcepts: [
      "Semantic HTML5 Markup & Document Landmark Structure",
      "Modern CSS: Grid, Flexbox, Custom Properties, and Tailwind CSS",
      "React Component Hierarchy, Props, and State Management",
      "Core Web Vitals & Web Performance Concepts (LCP, CLS, FID/INP as learning areas)",
      "Accessibility (a11y) Foundations & Keyboard Navigation",
    ],
    appliedContext: "Responsive frontend interfaces across personal projects and portfolio.",
    academicAnchor: "Hands-on Web Engineering Practice",
    keyTopics: [
      { name: "Markup & Layout", detail: "Semantic landmarks, responsive grid/flexbox systems" },
      { name: "React Ecosystem", detail: "Functional components, reactive hooks, UI state" },
      { name: "Web Concepts", detail: "Core Web Vitals metrics, DOM performance principles" },
    ],
  },
  {
    id: "full-stack-systems",
    number: "03",
    name: "Full-Stack Systems",
    category: "Web Platforms",
    depth: "Active Practice",
    tagline: "Client-server architectures, RESTful APIs, and application lifecycle",
    description:
      "Connecting React user interfaces with Node.js and Express backend servers, routing, middleware pipelines, and authenticated state.",
    coreConcepts: [
      "Client-Server Architecture & HTTP Request/Response Lifecycle",
      "RESTful API Route Design & Endpoint Handlers",
      "Express.js Middleware Pipelines & Error Handling",
      "User Authentication via JWT & Role-Based Access Control (RBAC)",
      "Client-Side State Management & Asynchronous Data Fetching",
    ],
    appliedContext: "Applied directly in CollabCode AI full-stack workspace.",
    academicAnchor: "Applied Full-Stack Engineering",
    keyTopics: [
      { name: "API Architecture", detail: "REST conventions, status codes, controller routing" },
      { name: "Backend Runtime", detail: "Node.js runtime, Express middleware, error boundaries" },
      { name: "Security Patterns", detail: "JWT token validation, route protection, RBAC rules" },
    ],
  },
  {
    id: "real-time-systems",
    number: "04",
    name: "Real-Time Systems",
    category: "Systems & Data",
    depth: "Active Practice",
    tagline: "Event-driven communication, WebSockets, and live synchronization",
    description:
      "Building real-time interactive experiences using WebSockets and Socket.IO for multi-user event broadcast, room coordination, and state updates.",
    coreConcepts: [
      "WebSocket Protocol Handshake & Full-Duplex Connection",
      "Socket.IO Event Emission, Listeners, and Room Segmentation",
      "Event-Driven Communication & State Propagation",
      "Client/Server Synchronization & Reconnection Handling",
      "Real-Time Collaborative Room Management",
    ],
    appliedContext: "Applied directly in CollabCode AI for real-time multiplayer coding rooms.",
    academicAnchor: "Real-Time Web Communications Practice",
    keyTopics: [
      { name: "Protocols", detail: "HTTP upgrade handshake to persistent duplex WebSocket" },
      { name: "Event Channels", detail: "Custom event emission, room broadcasting, listener lifecycle" },
      { name: "State Updates", detail: "Bi-directional editor state propagation between peers" },
    ],
  },
  {
    id: "databases-persistence",
    number: "05",
    name: "Databases & Persistence",
    category: "Systems & Data",
    depth: "Working Knowledge",
    tagline: "Document persistence and relational database concepts",
    description:
      "Working with MongoDB for project data persistence, alongside conceptual and query knowledge of SQL and relational database schemas.",
    coreConcepts: [
      "MongoDB Document Storage, Collections, and Mongoose Modeling (Applied)",
      "Relational Database Design, Tables, and SQL Query Basics (Working Knowledge)",
      "Primary Keys, Foreign Keys, and Schema Normalization (1NF, 2NF, 3NF)",
      "ACID Properties & Transaction Concepts (Theoretical Foundation)",
      "Basic Indexing & Connection Management",
    ],
    appliedContext: "MongoDB applied in CollabCode AI; SQL studied in university database coursework.",
    academicAnchor: "B.Tech DBMS Curriculum & Practical Projects",
    keyTopics: [
      { name: "Document Store (Applied)", detail: "MongoDB collections, BSON documents, Mongoose schemas" },
      { name: "Relational (Working)", detail: "SQL queries, table normalization, relational joins" },
      { name: "Data Integrity", detail: "ACID principles, unique constraints, referential integrity" },
    ],
  },
  {
    id: "operating-systems",
    number: "06",
    name: "Operating Systems",
    category: "Computer Science",
    depth: "Foundations",
    tagline: "Process scheduling, concurrency, and virtual memory",
    description:
      "Studying how operating system kernels manage CPU processes, concurrent threads, memory allocation, and hardware interactions.",
    coreConcepts: [
      "Process Lifecycle, States, and Context Switching",
      "CPU Scheduling Algorithms (FCFS, SJF, Round Robin)",
      "Concurrency, Thread Synchronization, and Deadlock Conditions",
      "Virtual Memory, Paging, and Page Replacement Concepts",
      "File System Organization & System Call Interfaces",
    ],
    appliedContext: "Theoretical foundation guiding efficient resource use and concurrency understanding.",
    academicAnchor: "B.Tech CSE Operating Systems Coursework",
    keyTopics: [
      { name: "Process Management", detail: "Process control blocks, scheduling policies, context switches" },
      { name: "Memory Systems", detail: "Virtual memory mapping, page tables, thrashing mitigation" },
      { name: "Concurrency", detail: "Critical sections, race conditions, mutex and semaphores" },
    ],
  },
  {
    id: "computer-networks",
    number: "07",
    name: "Computer Networks",
    category: "Computer Science",
    depth: "Foundations",
    tagline: "Protocol stacks, transport mechanics, and internet foundations",
    description:
      "Understanding layered network communication, reliable packet delivery, socket handshakes, and application layer protocols.",
    coreConcepts: [
      "OSI 7-Layer Model & TCP/IP Protocol Stack",
      "TCP Reliable Transport & 3-Way Handshake vs. UDP Latency",
      "HTTP/1.1 vs. HTTP/2 Protocol Lifecycle & HTTPS/TLS Basics",
      "IP Addressing, Subnetting, and DNS Resolution Flow",
      "Network Sockets & Client-Server Communication Models",
    ],
    appliedContext: "Underpins client-server communications and WebSocket mechanics in web applications.",
    academicAnchor: "B.Tech CSE Computer Networks Coursework",
    keyTopics: [
      { name: "Layered Models", detail: "Physical, Data Link, Network, Transport, Application layers" },
      { name: "Transport Protocols", detail: "TCP reliability, sequence numbers, congestion control vs. UDP" },
      { name: "Application Protocols", detail: "HTTP request lifecycle, DNS resolution, TLS encryption" },
    ],
  },
  {
    id: "ai-generative-workflows",
    number: "08",
    name: "AI & Generative Workflows",
    category: "Emerging AI",
    depth: "Active Exploration",
    tagline: "AI-assisted development, prompt design, and LLM workflows",
    description:
      "Actively studying and integrating AI developer tooling, prompt design patterns, context management, and token streaming concepts.",
    coreConcepts: [
      "AI-Assisted Development & Developer Productivity Tooling",
      "LLM Prompt Design, System Instructions, and Few-Shot Patterns",
      "Token Streaming Concepts & Asynchronous Response Rendering",
      "Context Window Management & Prompt Budgeting",
      "Embedding Concepts & High-Level Model Evaluation",
    ],
    appliedContext: "Explored in CollabCode AI for AI-driven code explanation features.",
    academicAnchor: "Independent Technical Exploration & Applied AI Studies",
    keyTopics: [
      { name: "Prompt Design", detail: "Context framing, clear system boundaries, structured prompts" },
      { name: "Streaming UX", detail: "Token-by-token streaming, chunk buffer handling, loading states" },
      { name: "Context Management", detail: "Token budget trade-offs, relevant snippet extraction" },
    ],
  },
];

