"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function PageLink({ href, className = "", children, label }: { href: string; className?: string; children: ReactNode; label?: string }) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || href.startsWith("http") || href.startsWith("mailto") || href.endsWith(".pdf")) return;
    event.preventDefault();
    if (window.location.pathname === href) return;
    document.documentElement.classList.add("is-leaving");
    window.setTimeout(() => { window.location.href = href; }, 360);
  };

  return <a href={href} className={className} onClick={navigate} aria-label={label}>{children}</a>;
}

export function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const themeFrame = window.requestAnimationFrame(() => setTheme(current));
    document.documentElement.classList.add("is-ready");

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));

    const onPointerMove = (event: PointerEvent) => {
      if (!cursorRef.current || !cursorDotRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorDotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      cursorRef.current?.classList.toggle("is-active", Boolean(target.closest("a, button, input, textarea, [data-cursor]")));
    };
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll", total > 0 ? `${(window.scrollY / total) * 100}%` : "0%");
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.cancelAnimationFrame(themeFrame);
      reveal.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("ba-theme", next);
    setTheme(next);
  };

  return (
    <>
      <div className="page-wipe" aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true"><span>Open</span></div>
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="scroll-line" aria-hidden="true" />
      <header className="site-header">
        <PageLink href="/" className="wordmark" label="Boluwatife Alabi, home">
          <span className="mark">BA</span>
          <span className="wordmark-name">Boluwatife<br />Alabi</span>
        </PageLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => <PageLink href={item.href} key={item.href}>{item.label}</PageLink>)}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            <span className="theme-track"><span className="theme-knob" /></span>
            <span className="theme-label">{theme === "light" ? "Light" : "Dark"}</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-links">
          {nav.map((item, index) => <PageLink href={item.href} key={item.href}><sup>0{index + 1}</sup>{item.label}</PageLink>)}
        </div>
        <div className="mobile-menu-meta"><span>Lagos, Nigeria</span><a href="mailto:brematech27@gmail.com">brematech27@gmail.com</a></div>
      </div>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-top">
          <p className="footer-kicker">Have a product worth building?</p>
          <PageLink href="/contact" className="footer-title">Let’s make it real.<ArrowIcon /></PageLink>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Boluwatife Alabi</span>
          <div><a href="https://github.com/bremaboy" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/boluwatifealabi" target="_blank" rel="noreferrer">LinkedIn</a></div>
          <span>Lagos · WAT</span>
        </div>
      </footer>
    </>
  );
}
