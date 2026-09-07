export interface CaseStudyStage {
  number: string;
  title: string;
  content: string;
}

export interface ProjectRecord {
  number: string;
  slug: string;
  name: string;
  year: string;
  category: string;
  status: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  process: string;
  technology: string;
  architecture: string;
  learning: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  keyFeatures: string[];
  caseStudy: CaseStudyStage[];
}

export const projects: ProjectRecord[] = [
  {
    number: "01",
    slug: "collabcode-ai",
    name: "CollabCode AI",
    year: "2025",
    category: "Full Stack & Collaborative Systems",
    status: "Featured System",
    description:
      "An AI-powered collaborative engineering platform for developers to learn, code, and collaborate in real time.",
    overview:
      "A complete full-stack workspace integrating real-time multiplayer code synchronization, AI-assisted code explanation, and secure role-based access control.",
    problem:
      "Learning to code and debugging often feels isolated when code execution, peer collaboration, and guidance live in fragmented tools.",
    solution:
      "CollabCode AI provides a unified browser environment uniting collaborative live editing, real-time room communication, and instant AI guidance.",
    process:
      "Designed REST authentication endpoints, established WebSocket room event pipelines, and integrated AI prompt-handling handlers.",
    technology: "React, Node.js, Express.js, MongoDB, Socket.IO, JWT, RBAC, Tailwind CSS",
    architecture:
      "Dual-channel client-server architecture: HTTP REST for persistent account and room data; WebSocket bi-directional channels for real-time document synchronization.",
    learning:
      "Mastered real-time WebSocket state reconciliation, socket reconnection edge cases, and secure token lifecycle handling.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "AI Assistance", "JWT"],
    githubUrl: "https://github.com/Himanshu-Shekhar979/Collabcode-ai",
    keyFeatures: [
      "Real-time multi-user document synchronization with WebSockets",
      "AI-driven code analysis and error explanation",
      "Role-Based Access Control (RBAC) and JWT authentication",
      "Live room management and developer workspace",
    ],
    caseStudy: [
      {
        number: "01",
        title: "Introduction",
        content:
          "CollabCode AI is an interactive full-stack platform built to facilitate synchronous developer collaboration and AI-assisted programming in one cohesive interface.",
      },
      {
        number: "02",
        title: "Context",
        content:
          "Built as an intensive engineering project to explore multi-user state synchronization, scalable backend API architecture, and practical AI tooling for developers.",
      },
      {
        number: "03",
        title: "Problem",
        content:
          "Traditional coding environments isolate developers. When beginners need help or peers wish to review code together, switching between external chat apps, screen shares, and separate editors introduces friction.",
      },
      {
        number: "04",
        title: "Research",
        content:
          "Investigated WebSocket vs. Long-Polling communication patterns, studied operational synchronization trade-offs, and evaluated token lifecycle security best practices.",
      },
      {
        number: "05",
        title: "Solution",
        content:
          "Constructed a high-concurrency room architecture where developers can join shared virtual sessions, observe real-time keystroke updates, and query AI assistance without leaving the editor.",
      },
      {
        number: "06",
        title: "Design",
        content:
          "Implemented a high-contrast dark theme emphasizing code syntax readability, subtle status indicators for active peers, and dedicated panels for AI outputs.",
      },
      {
        number: "07",
        title: "Development",
        content:
          "Built using React on the frontend with modular state stores, paired with Node.js and Express.js on the backend. Integrated Socket.IO for low-latency room event broadcasting.",
      },
      {
        number: "08",
        title: "Technology",
        content:
          "Frontend: React, Tailwind CSS, Lucide concepts. Backend: Node.js, Express.js, Socket.IO. Database: MongoDB with Mongoose schemas. Auth: JSON Web Tokens with Bcrypt hashing.",
      },
      {
        number: "09",
        title: "Architecture",
        content:
          "A decoupled client-server model where authenticated REST endpoints govern user sessions and workspace persistence, while an active Socket.IO server manages real-time broadcast rooms.",
      },
      {
        number: "10",
        title: "Result",
        content:
          "A robust, responsive web application that allows multi-client pairing sessions with sub-100ms local socket event propagation and reliable room authorization.",
      },
      {
        number: "11",
        title: "Learning",
        content:
          "Strengthened practical engineering intuition regarding distributed state synchronization, race condition avoidance, error boundaries, and production-grade full-stack security.",
      },
    ],
  },
  {
    number: "02",
    slug: "web-dev-archive",
    name: "Web Engineering Archive",
    year: "2024–2025",
    category: "Web Fundamentals & Systems",
    status: "Project Collection",
    description:
      "A collection of responsive websites, digital interfaces, and web applications focused on performance, semantic structure, and design usability.",
    overview:
      "A progressive body of engineering practice mastering modern HTML5 semantics, responsive CSS grids, JavaScript DOM architecture, and server-side scripting.",
    problem:
      "Understanding the foundational building blocks of the web is critical before relying heavily on abstraction layers.",
    solution:
      "Designed and engineered focused web applications testing responsive fluid typography, clean accessibility, and cross-browser resilience.",
    process:
      "Iterated from architectural wireframes to semantic markup, custom CSS design systems, and JavaScript client modules.",
    technology: "HTML5, CSS3, JavaScript (ES6+), PHP, Git",
    architecture:
      "Multi-page and single-page architectures built around semantic DOM hierarchies, responsive layouts, and optimized asset delivery.",
    learning:
      "Developed a deep appreciation for core browser mechanics, performance optimization, rendering pipelines, and accessible UI patterns.",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "Responsive Design", "Accessibility"],
    githubUrl: "https://github.com/Himanshu-Shekhar979",
    keyFeatures: [
      "Semantic HTML5 structure and accessible document outlines",
      "Custom responsive CSS systems without heavy CSS bloat",
      "Vanilla JavaScript DOM manipulation and event delegation",
      "Dynamic PHP backend integration and form processing",
    ],
    caseStudy: [
      {
        number: "01",
        title: "Introduction",
        content:
          "The Web Engineering Archive encompasses a diverse series of responsive web systems created to master the fundamentals of the open web platform.",
      },
      {
        number: "02",
        title: "Context",
        content:
          "Developed throughout academic studies and web development training as a rigorous testbed for clean code, responsive layouts, and interface design.",
      },
      {
        number: "03",
        title: "Problem",
        content:
          "Many web applications struggle with fragile responsiveness, poor semantic accessibility, and bloated dependency trees for simple user interactions.",
      },
      {
        number: "04",
        title: "Research",
        content:
          "Analyzed web standards, WCAG 2.1 accessibility criteria, mobile-first responsive design paradigms, and optimal critical rendering paths.",
      },
      {
        number: "05",
        title: "Solution",
        content:
          "Delivered lightweight, zero-dependency interfaces using modern CSS Grid, Flexbox, and vanilla JavaScript that load instantly across device types.",
      },
      {
        number: "06",
        title: "Design",
        content:
          "Clean typographical rhythm, accessible contrast ratios (contrast > 4.5:1), intuitive navigation affordances, and predictable interactive states.",
      },
      {
        number: "07",
        title: "Development",
        content:
          "Handcrafted HTML, modern CSS with custom properties for theming, and modular ES6+ JavaScript modules utilizing event delegation.",
      },
      {
        number: "08",
        title: "Technology",
        content:
          "Core Web: HTML5 Semantic Elements, CSS3 Grid/Flexbox/Media Queries, Vanilla JavaScript (Fetch API, DOM Events), PHP for server handling.",
      },
      {
        number: "09",
        title: "Architecture",
        content:
          "Clean separation of concerns with isolated stylesheet layers, semantic HTML templates, and modular JS scripts.",
      },
      {
        number: "10",
        title: "Result",
        content:
          "Consistently fast-loading websites scoring 95+ on Lighthouse performance and accessibility audits with zero layout shift.",
      },
      {
        number: "11",
        title: "Learning",
        content:
          "Gained foundational confidence in the platform itself, understanding how browsers parse, render, and execute code from first principles.",
      },
    ],
  },
];
