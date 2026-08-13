import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected web and mobile products engineered by Boluwatife Alabi.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
