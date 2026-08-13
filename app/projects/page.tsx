"use client";

import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { SiteShell } from "../components/SiteShell";
import { projects } from "../data";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All projects");
  const filtered = projects.filter((project) => {
    if (filter === "All projects") return true;
    if (filter === "Web") return project.type.startsWith("Web ·");
    if (filter === "Mobile") return project.type.startsWith("Mobile ·");
    return project.type.startsWith("Web3 ·");
  });
  return (
    <SiteShell>
      <section className="page-hero section-shell">
        <p className="eyebrow hero-line">Selected projects · 2023 — 2026</p>
        <h1 className="page-display hero-line">A record of products<br />built to <i>perform.</i></h1>
        <div className="page-intro hero-line"><p>Mobile applications, commerce platforms, financial tools, and decentralised systems—designed with clarity and engineered for real use.</p><span>06 projects</span></div>
      </section>
      <section className="project-archive section-shell">
        <div className="archive-filter" data-reveal>{["All projects", "Web", "Mobile", "Web3"].map((item) => <button className={filter === item ? "is-selected" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <div className="projects-grid projects-grid-archive" key={filter}>{filtered.map((project) => <ProjectCard project={project} key={project.name} />)}</div>
      </section>
    </SiteShell>
  );
}
