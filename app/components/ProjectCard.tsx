import Image from "next/image";
import { ArrowIcon } from "./SiteShell";
import type { Project } from "../data";

export function ProjectVisual({ project }: { project: Project }) {
  const previewHost = new URL(project.link).hostname.replace(/^www\./, "");

  return (
    <div className={`project-visual visual-${project.accent}`} aria-hidden="true">
      <div className="visual-grid" />
      <span className="visual-orbit"><i /></span>
      <span className="visual-spark">✦</span>
      <div className="visual-window">
        <div className="visual-window-top"><i /><i /><i /><span>{previewHost}</span></div>
        <div className="visual-window-preview">
          <Image
            className="project-preview-image"
            src={project.preview}
            alt=""
            width={1280}
            height={720}
            sizes="(max-width: 700px) 82vw, 38vw"
          />
        </div>
      </div>
      <span className="visual-code">{project.number}</span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-reveal>
      <a className="project-image-link" href={project.link} target="_blank" rel="noreferrer" data-cursor="open" aria-label={`Open ${project.name}`}>
        <ProjectVisual project={project} />
      </a>
      <div className="project-card-copy">
        <div className="project-card-head"><span>{project.number}</span><span>{project.year}</span></div>
        <h3>{project.name}</h3>
        <p className="project-type">{project.type}</p>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a href={project.link} target="_blank" rel="noreferrer" className="text-link">{project.linkLabel}<ArrowIcon /></a>
      </div>
    </article>
  );
}
