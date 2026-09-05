export interface ProjectRecord {
  number: string;
  name: string;
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
}

export const projects: ProjectRecord[] = [
  {
    number: "01",
    name: "CollabCode AI",
    status: "Featured project",
    description:
      "An AI-powered collaborative platform for developers to learn, code, and collaborate in real time.",
    overview:
      "A full-stack project that brings collaborative coding, learning, and AI-assisted programming into one experience.",
    problem:
      "Learning to code can feel isolated when practice, feedback, and collaboration live in separate places.",
    solution:
      "CollabCode AI explores a shared environment for coding, learning, and real-time collaboration.",
    process:
      "The project combines interface work with API, authentication, role, data, and real-time collaboration concerns.",
    technology: "React, Node.js, Express.js, MongoDB, Socket.IO, JWT, and RBAC.",
    architecture:
      "A client and server application connected through REST APIs, persistent data, authentication, and real-time events.",
    learning:
      "Working across a full-stack system made software structure, collaboration, and continuous experimentation more concrete.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "AI"],
    githubUrl: "https://github.com/Himanshu-Shekhar979/Collabcode-ai",
  },
  {
    number: "02",
    name: "Web Development Projects",
    status: "Project collection",
    description:
      "A collection of responsive websites and digital experiences focused on modern design and usability.",
    overview:
      "A growing body of practice across responsive interfaces, web fundamentals, and digital presentation.",
    problem:
      "Every interface is an opportunity to understand how structure, content, and interaction work together.",
    solution:
      "Small web projects provide a practical space to test layouts, interactions, and clearer user experiences.",
    process:
      "Practice moves from a visual idea through markup, styling, scripting, and iterative refinement.",
    technology: "HTML, CSS, JavaScript, and PHP.",
    architecture:
      "Responsive front-end pages and web experiments shaped around the needs of each project.",
    learning:
      "Repeated practice has strengthened the connection between visual decisions and usable web interfaces.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];
