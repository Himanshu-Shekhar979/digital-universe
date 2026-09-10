export type JourneyFilter =
  | "All"
  | "Education"
  | "Experience & Training"
  | "Projects & Evolution";

export type MilestoneKind =
  | "Education"
  | "Training"
  | "Experience"
  | "Projects"
  | "Exploration"
  | "Current";

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  kind: MilestoneKind;
  filterCategory: "Education" | "Experience & Training" | "Projects & Evolution";
  institutionOrContext: string;
  description: string;
  highlights: string[];
  isCurrent?: boolean;
}

export const journeyFilters: JourneyFilter[] = [
  "All",
  "Education",
  "Experience & Training",
  "Projects & Evolution",
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "2019-class-x",
    period: "2019",
    title: "Class X / CBSE",
    kind: "Education",
    filterCategory: "Education",
    institutionOrContext: "CBSE Board",
    description:
      "An early academic foundation before moving deeper into computing and technical education.",
    highlights: ["Foundational Sciences", "Mathematics & Logic"],
  },
  {
    id: "2019-2022-diploma",
    period: "2019–2022",
    title: "Diploma in Computer Science & Engineering",
    kind: "Education",
    filterCategory: "Education",
    institutionOrContext: "Government Polytechnic Dhanbad",
    description:
      "First formal immersion into computer science fundamentals, structured programming, data structures, and computer organization.",
    highlights: [
      "C & C++ Programming",
      "Data Structures",
      "Computer Architecture",
      "Database Basics",
    ],
  },
  {
    id: "2021-web-dev-training",
    period: "2021",
    title: "Web Development Training",
    kind: "Training",
    filterCategory: "Experience & Training",
    institutionOrContext: "Structured Learning Period",
    description:
      "Web development fundamentals and early practical learning, understanding HTML/CSS layout systems, basic scripting, and interactive page mechanics.",
    highlights: [
      "Semantic HTML",
      "CSS Layouts",
      "JavaScript Basics",
      "Responsive Design",
    ],
  },
  {
    id: "2023-2026-btech",
    period: "2023–2026",
    title: "B.Tech in Computer Science & Engineering",
    kind: "Education",
    filterCategory: "Education",
    institutionOrContext: "Dumka Engineering College",
    description:
      "Advanced undergraduate computer science curriculum covering algorithms, operating systems, networking, database management, and software engineering theory.",
    highlights: [
      "Algorithm Analysis",
      "Operating Systems",
      "Computer Networks",
      "DBMS & SQL",
    ],
  },
  {
    id: "2024-internship",
    period: "2024",
    title: "Web Development Internship",
    kind: "Experience",
    filterCategory: "Experience & Training",
    institutionOrContext: "Professional Learning Exposure",
    description:
      "Practical exposure to web development in a professional learning context, collaborating on web development tasks and modern development workflows.",
    highlights: [
      "Component Development",
      "Code Review Practice",
      "Collaborative Workflows",
    ],
  },
  {
    id: "2025-fullstack-projects",
    period: "2025",
    title: "Full-Stack Project Development",
    kind: "Projects",
    filterCategory: "Projects & Evolution",
    institutionOrContext: "Applied Architecture & Engineering",
    description:
      "Applying frontend and backend concepts to build end-to-end applications, including real-time collaboration environments such as CollabCode AI.",
    highlights: [
      "React & Node.js/Express",
      "MongoDB Persistence",
      "Socket.IO Real-Time Rooms",
      "JWT Authentication",
    ],
  },
  {
    id: "2025-2026-ai-exploration",
    period: "2025–2026",
    title: "Exploring AI, ML and Generative AI workflows",
    kind: "Exploration",
    filterCategory: "Projects & Evolution",
    institutionOrContext: "Independent Technical Exploration",
    description:
      "Continuing to explore AI-assisted development, prompt design, token streaming patterns, and context window management for modern developer applications.",
    highlights: [
      "Prompt Engineering",
      "Token Streaming UX",
      "LLM API Integration",
      "Context Management",
    ],
  },
  {
    id: "current-trajectory",
    period: "Current",
    title: "Building, learning, exploring",
    kind: "Current",
    filterCategory: "Projects & Evolution",
    institutionOrContext: "Active Trajectory",
    description:
      "Developing projects, practicing modern web development, and learning where technology can lead next, bridging into future challenges.",
    highlights: [
      "Continuous Building",
      "Full-Stack Systems",
      "Forward Horizon",
    ],
    isCurrent: true,
  },
];

