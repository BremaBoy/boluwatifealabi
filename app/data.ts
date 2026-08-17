export type Project = {
  number: string;
  name: string;
  type: string;
  year: string;
  description: string;
  link: string;
  linkLabel: string;
  preview: string;
  accent: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Balune",
    type: "Mobile · Social discovery",
    year: "2025",
    description:
      "A mood-driven social discovery app that turns meeting people into an expressive, real-time experience built around play and genuine connection.",
    link: "https://apps.apple.com/app/balune/id6744545976",
    linkLabel: "View on App Store",
    preview: "/images/projects/balune.jpg",
    accent: "blue",
    tags: ["Mobile application", "Social product", "Real-time UX"],
  },
  {
    number: "02",
    name: "Olos Gaming",
    type: "Web3 · Gaming platform",
    year: "2026",
    description:
      "An immersive Web3 gaming ecosystem where players can earn, trade, and truly own digital assets through secure decentralized mechanics.",
    link: "https://olosworld.com",
    linkLabel: "Visit platform",
    preview: "/images/projects/olos-gaming.jpg",
    accent: "acid",
    tags: ["Web3", "Blockchain", "Product engineering"],
  },
  {
    number: "03",
    name: "Jekana",
    type: "Mobile · Commerce",
    year: "2025",
    description:
      "A streamlined commerce product that helps businesses present products, manage inventory, and give customers a seamless shopping journey.",
    link: "https://www.jekana.com",
    linkLabel: "Visit website",
    preview: "/images/projects/jekana.jpg",
    accent: "coral",
    tags: ["Mobile commerce", "API integration", "Product UI"],
  },
  {
    number: "04",
    name: "Elshalom Stores",
    type: "Web · E-commerce",
    year: "2024",
    description:
      "A modern Nigerian online store designed around quick product discovery, secure checkout, and a reliable end-to-end shopping experience.",
    link: "https://elshalomstores.com.ng",
    linkLabel: "Visit store",
    preview: "/images/projects/elshalom-stores.jpg",
    accent: "violet",
    tags: ["E-commerce", "Web development", "Maintenance"],
  },
  {
    number: "05",
    name: "FlowBooks",
    type: "Web · Financial technology",
    year: "2024",
    description:
      "A clear, approachable financial platform for tracking income, expenses, invoices, and reports without the friction of traditional bookkeeping.",
    link: "https://www.getflowbooks.com",
    linkLabel: "Visit website",
    preview: "/images/projects/flowbooks.jpg",
    accent: "cyan",
    tags: ["Fintech", "Data UI", "Web application"],
  },
  {
    number: "06",
    name: "Elshalom Decor",
    type: "Web · Interior design",
    year: "2023",
    description:
      "A contemporary digital home for an interior studio, connecting curated décor, practical design guidance, and personalised spatial solutions.",
    link: "https://elshalomdecor.com.ng",
    linkLabel: "Visit website",
    preview: "/images/projects/elshalom-decor.jpg",
    accent: "sand",
    tags: ["WordPress", "Visual design", "Web experience"],
  },
];

export const experience = [
  { role: "Chief Technical Officer", company: "Olos Gaming", dates: "Feb 2026 — Present" },
  { role: "Mobile App Developer", company: "Jekana", dates: "Aug 2025 — Jan 2026" },
  { role: "Web Developer", company: "Elshalom Stores", dates: "Aug 2024 — Aug 2025" },
  { role: "WordPress Developer", company: "Elshalom Decor", dates: "Aug 2023 — Aug 2024" },
];

export const stackGroups = [
  { title: "Web", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "WordPress"] },
  { title: "Mobile", items: ["React Native", "Mobile architecture", "API integration", "App delivery"] },
  { title: "Systems", items: ["Supabase", "Databases", "Git", "GitHub", "Web3", "Blockchain"] },
];
