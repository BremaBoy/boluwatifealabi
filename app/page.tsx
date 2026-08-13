import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon, PageLink, SiteShell } from "./components/SiteShell";
import { ProjectCard } from "./components/ProjectCard";
import { experience, projects, stackGroups } from "./data";

export const metadata: Metadata = {
  title: "Boluwatife Alabi — Web & Mobile Software Engineer",
  description: "Portfolio of Boluwatife Alabi, a software engineer building polished, scalable web and mobile products.",
};

export default function Home() {
  return (
    <SiteShell>
      <section className="hero section-shell">
        <div className="hero-portrait hero-reveal">
          <div className="portrait-frame"><Image src="/images/boluwatife-hero.jpg" alt="Boluwatife Alabi, software engineer" width={1200} height={1500} priority sizes="(max-width: 700px) 84vw, 35vw" /></div>
          <div className="portrait-note"><span className="status-dot" />Available for ambitious products</div>
          <span className="portrait-index">01 / 04</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-line">My name is Boluwatife Alabi.</p>
          <h1 className="display hero-line"><span>I engineer</span><span>web <em>&amp;</em> mobile</span><span>products that</span><span><i>move</i> with purpose.</span></h1>
          <div className="hero-summary hero-line">
            <p>A software engineer turning complex ideas into fast, scalable and visually considered digital experiences.</p>
            <div className="hero-ctas"><PageLink href="/projects" className="button button-solid">Explore projects <ArrowIcon /></PageLink><a className="button button-ghost" href="/documents/Boluwatife-Alabi-Resume.pdf" download>Download résumé <span>↓</span></a></div>
          </div>
        </div>
        <div className="hero-foot"><span>Lagos, Nigeria</span><span>Scroll to discover <b>↓</b></span><span>Web · Mobile · Product</span></div>
      </section>

      <section className="statement section-shell">
        <p className="section-label" data-reveal>01 — Profile</p>
        <div className="statement-copy" data-reveal>
          <p>I build products with the discipline of an engineer and the eye of a designer.</p>
          <p className="muted">From responsive web platforms to production mobile apps, every detail should earn its place.</p>
        </div>
        <div className="stat-row" data-reveal><div><strong>07</strong><span>Years in web development</span></div><div><strong>05+</strong><span>Years in mobile development</span></div><div><strong>06</strong><span>Featured digital products</span></div></div>
      </section>

      <section className="projects-home section-shell">
        <div className="section-heading" data-reveal><div><p className="section-label">02 — Selected projects</p><h2>Products, not just <i>projects.</i></h2></div><PageLink href="/projects" className="text-link">View all six <ArrowIcon /></PageLink></div>
        <div className="projects-grid">{projects.slice(0, 4).map((project) => <ProjectCard project={project} key={project.name} />)}</div>
      </section>

      <section className="stack-section section-shell">
        <div className="section-heading" data-reveal><div><p className="section-label">03 — Capabilities</p><h2>A stack built to <i>ship.</i></h2></div><p className="heading-sidecopy">Tools matter. Knowing when and how to use them matters more.</p></div>
        <div className="stack-grid">{stackGroups.map((group, index) => <div className="stack-group" data-reveal key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
      </section>

      <section className="experience-section section-shell">
        <div className="section-heading" data-reveal><div><p className="section-label">04 — Experience</p><h2>Building through <i>practice.</i></h2></div></div>
        <div className="experience-list">{experience.map((item, index) => <div className="experience-row" data-reveal key={item.company}><span>0{index + 1}</span><h3>{item.role}</h3><p>{item.company}</p><time>{item.dates}</time></div>)}</div>
        <div className="education-row" data-reveal><span>Education</span><p>B.Sc. Mathematics</p><p>Lagos State University</p></div>
      </section>

      <section className="about-tease section-shell" data-reveal>
        <div className="about-tease-image"><Image src="/images/boluwatife-casual.jpg" alt="Boluwatife Alabi outdoors in Lagos" width={823} height={1097} sizes="(max-width: 700px) 85vw, 38vw" /></div>
        <div className="about-tease-copy"><p className="section-label">Beyond the interface</p><h2>Curious by nature.<br /><i>Precise</i> by practice.</h2><p>I care about the thinking underneath the interface: how a system scales, how a person moves through it, and how the smallest interaction changes the whole experience.</p><PageLink href="/about" className="button button-outline">More about me <ArrowIcon /></PageLink></div>
      </section>
    </SiteShell>
  );
}
