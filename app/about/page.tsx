import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon, SiteShell } from "../components/SiteShell";
import { experience, stackGroups } from "../data";

export const metadata: Metadata = { title: "About", description: "About Boluwatife Alabi, a web and mobile software engineer based in Lagos." };

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="page-hero about-hero section-shell">
        <p className="eyebrow hero-line">About · Boluwatife Alabi</p>
        <h1 className="page-display hero-line">Engineer in practice.<br /><i>Builder</i> at heart.</h1>
      </section>
      <section className="about-editorial section-shell">
        <div className="about-editorial-image" data-reveal><Image src="/images/boluwatife-formal.jpg" alt="Formal portrait of Boluwatife Alabi" width={960} height={1280} sizes="(max-width: 700px) 100vw, 36vw" /><span>Software engineer · Lagos, NG</span></div>
        <div className="about-editorial-copy" data-reveal>
          <p className="lead">I’m Boluwatife, a web and mobile developer focused on making ambitious digital ideas reliable, useful, and genuinely enjoyable to use.</p>
          <div className="body-copy"><p>My path into software is backed by a degree in Mathematics and years of building across the full product surface—from responsive storefronts to mobile social experiences and Web3 gaming systems.</p><p>I enjoy the point where systems thinking meets visual craft. That means considering architecture, performance, accessibility, interaction, and maintainability as parts of the same product problem.</p><p>Today, I serve as Chief Technical Officer at Olos Gaming while continuing to create products across web and mobile.</p></div>
          <a href="/documents/Boluwatife-Alabi-Resume.pdf" className="button button-solid" download>Download my résumé <span>↓</span></a>
        </div>
      </section>
      <section className="beliefs section-shell">
        <p className="section-label" data-reveal>How I approach the work</p>
        <div className="belief-grid"><div data-reveal><span>01</span><h3>Clarity before code.</h3><p>The best implementation begins with a sharp understanding of the real problem.</p></div><div data-reveal><span>02</span><h3>Motion with meaning.</h3><p>Interaction should orient, reward, and communicate—not distract from the product.</p></div><div data-reveal><span>03</span><h3>Built to evolve.</h3><p>Good architecture gives a product room to grow without making every change expensive.</p></div></div>
      </section>
      <section className="experience-section section-shell">
        <div className="section-heading" data-reveal><div><p className="section-label">Experience</p><h2>What shaped my <i>practice.</i></h2></div></div>
        <div className="experience-list">{experience.map((item, index) => <div className="experience-row" data-reveal key={item.company}><span>0{index + 1}</span><h3>{item.role}</h3><p>{item.company}</p><time>{item.dates}</time></div>)}</div>
      </section>
      <section className="stack-section section-shell">
        <div className="section-heading" data-reveal><div><p className="section-label">Toolkit</p><h2>Technologies I use to <i>deliver.</i></h2></div></div>
        <div className="stack-grid">{stackGroups.map((group, index) => <div className="stack-group" data-reveal key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
        <a href="mailto:brematech27@gmail.com" className="text-link about-email">Start a conversation <ArrowIcon /></a>
      </section>
    </SiteShell>
  );
}
