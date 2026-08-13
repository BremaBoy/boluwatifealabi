import { ArrowIcon } from "./SiteShell";
import type { Project } from "../data";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.accent}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-window">
        <div className="visual-window-top"><i /><i /><i /><span>{project.name.toLowerCase()}.product</span></div>
        <div className="visual-window-body">
          <span className="visual-mini">{project.type.split(" · ")[1]}</span>
          <strong>{project.name}</strong>
          <div className="visual-bars"><i /><i /><i /></div>
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
