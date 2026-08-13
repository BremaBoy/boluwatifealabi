"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon, SiteShell } from "../components/SiteShell";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio enquiry"));
    const body = encodeURIComponent(`Hi Boluwatife,\n\n${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:brematech27@gmail.com?subject=${subject}&body=${body}`;
  };
  const copyEmail = async () => {
    await navigator.clipboard.writeText("brematech27@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <SiteShell>
      <section className="contact-hero section-shell">
        <div>
          <p className="eyebrow hero-line">Contact · New opportunities</p>
          <h1 className="page-display hero-line">Let’s build something<br /><i>worth using.</i></h1>
          <p className="contact-lead hero-line">Have a product, platform, or difficult technical problem in mind? Tell me what you’re building and where you need help.</p>
        </div>
        <div className="contact-meta hero-line">
          <div><span>Email</span><a href="mailto:brematech27@gmail.com">brematech27@gmail.com</a><button onClick={copyEmail}>{copied ? "Copied" : "Copy email"}</button></div>
          <div><span>Elsewhere</span><a href="https://github.com/bremaboy" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><a href="https://www.linkedin.com/in/boluwatifealabi" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a></div>
          <div><span>Based in</span><p>Lagos, Nigeria<br />West Africa Time</p></div>
        </div>
      </section>
      <section className="contact-form-section section-shell" data-reveal>
        <p className="section-label">Tell me about it</p>
        <form className="contact-form" onSubmit={submit}>
          <label><span>01 / Your name</span><input name="name" type="text" placeholder="Ada Lovelace" required /></label>
          <label><span>02 / Your email</span><input name="email" type="email" placeholder="ada@company.com" required /></label>
          <label><span>03 / What’s this about?</span><input name="subject" type="text" placeholder="A mobile product, website, collaboration..." required /></label>
          <label><span>04 / The details</span><textarea name="message" rows={4} placeholder="The context, ambition, timeline, and what a successful outcome looks like." required /></label>
          <button className="button button-solid form-submit" type="submit">Compose email <ArrowIcon /></button>
        </form>
      </section>
    </SiteShell>
  );
}
