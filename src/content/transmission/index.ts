export interface ContactLink {
  label: string;
  value: string;
  href: string;
  type: "email" | "github" | "linkedin";
}

export const transmissionMeta = {
  telemetryTag: "WORLD 09 // TRANSMISSION",
  signalStatus: "CARRIER SIGNAL ONLINE · ACTIVE LISTENER",
  title: "SEND A SIGNAL.",
  subtitle: "The journey is documented. The channel is open.",
  closingStatement: "LET'S BUILD SOMETHING INTERESTING.",
  availabilityStatus: "Open for software engineering roles and creative collaboration.",
  systemCredits: "Next.js · TypeScript · Three.js · GSAP · Lenis · Tailwind CSS",
};

export const directContactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "himanshu80021@gmail.com",
    href: "mailto:himanshu80021@gmail.com",
    type: "email",
  },
  {
    label: "GitHub",
    value: "Himanshu-Shekhar979",
    href: "https://github.com/Himanshu-Shekhar979",
    type: "github",
  },
  {
    label: "LinkedIn",
    value: "Himanshu Shekhar",
    href: "https://www.linkedin.com/in/himanshu-shekhar-867b11299",
    type: "linkedin",
  },
];

