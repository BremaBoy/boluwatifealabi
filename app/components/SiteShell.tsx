"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const themeFrame = window.requestAnimationFrame(() => setTheme(current));
    document.documentElement.classList.add("is-ready");
    const root = document.documentElement;
    const homeHero = window.location.pathname === "/" ? document.querySelector<HTMLElement>(".hero") : null;
    const heroFrame = homeHero?.querySelector<HTMLElement>(".portrait-frame") ?? null;
    const heroHome = heroFrame?.parentElement ?? null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const markLetter = markRef.current?.querySelector<HTMLElement>(".mark-letter") ?? null;
    let morphState: "hero" | "flying" | "logo" = "hero";
    let portraitPlaceholder: HTMLDivElement | null = null;
    let morphFrame = 0;

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const ensurePlaceholder = () => {
      if (!heroFrame || !heroHome || portraitPlaceholder) return;
      portraitPlaceholder = document.createElement("div");
      portraitPlaceholder.className = "portrait-placeholder";
      heroHome.insertBefore(portraitPlaceholder, heroFrame);
    };

    const startFlying = (frame: HTMLElement) => {
      ensurePlaceholder();
      document.body.appendChild(frame);
      frame.classList.add("is-morphing-frame");
      frame.style.position = "fixed";
      frame.style.margin = "0";
      frame.style.aspectRatio = "auto";
      frame.style.opacity = "1";
      frame.style.zIndex = "2600";
      morphState = "flying";
      root.classList.add("hero-logo-flying");
      root.classList.remove("hero-logo-morphed");
    };

    const clearFrameStyles = (frame: HTMLElement) => {
      frame.classList.remove("is-morphing-frame");
      ["position", "left", "top", "width", "height", "margin", "aspect-ratio", "transform", "opacity", "z-index", "border-radius", "box-shadow"].forEach((property) => frame.style.removeProperty(property));
    };

    const clearMarkStyles = () => {
      const mark = markRef.current;
      mark?.style.removeProperty("transform");
      markLetter?.style.removeProperty("opacity");
      markLetter?.style.removeProperty("transform");
    };

    const settleInHero = () => {
      if (!heroFrame || !heroHome) return;
      if (!heroHome.contains(heroFrame)) heroHome.insertBefore(heroFrame, portraitPlaceholder);
      portraitPlaceholder?.remove();
      portraitPlaceholder = null;
      clearFrameStyles(heroFrame);
      clearMarkStyles();
      root.classList.remove("hero-logo-flying", "hero-logo-morphed");
      morphState = "hero";
    };

    const settleInLogo = () => {
      const mark = markRef.current;
      if (!homeHero || !heroFrame || !heroHome || !mark) return;
      ensurePlaceholder();
      mark.appendChild(heroFrame);
      clearFrameStyles(heroFrame);
      clearMarkStyles();
      root.classList.remove("hero-logo-flying");
      root.classList.add("hero-logo-morphed");
      morphState = "logo";
    };

    const updateHeroMorph = () => {
      morphFrame = 0;
      const mark = markRef.current;
      if (!homeHero || !heroFrame || !heroHome || !mark) return;

      const slot = portraitPlaceholder ?? heroFrame;
      const slotRect = slot.getBoundingClientRect();
      const slotDocumentTop = slotRect.top + window.scrollY;
      const heroRect = homeHero.getBoundingClientRect();
      const heroDocumentBottom = heroRect.bottom + window.scrollY;
      const morphStart = Math.max(0, slotDocumentTop + Math.min(slotRect.height * 0.08, 60));
      const preferredSpan = Math.max(window.innerHeight * 0.62, 460);
      const latestEnd = Math.max(morphStart + 360, heroDocumentBottom - window.innerHeight * 0.08);
      const morphEnd = Math.min(morphStart + preferredSpan, latestEnd);
      let progress = clamp((window.scrollY - morphStart) / Math.max(1, morphEnd - morphStart));

      if (reduceMotion) progress = progress < 0.5 ? 0 : 1;
      if (progress <= 0) {
        if (morphState !== "hero") settleInHero();
        return;
      }
      if (progress >= 1) {
        if (morphState !== "logo") settleInLogo();
        return;
      }

      if (morphState !== "flying") startFlying(heroFrame);

      const eased = progress * progress * (3 - 2 * progress);
      const markRotation = mix(-5, 0, eased);
      mark.style.transform = `rotate(${markRotation}deg)`;
      if (markLetter) {
        markLetter.style.opacity = `${clamp(1 - progress * 4)}`;
        markLetter.style.transform = `scale(${mix(1, 0.35, eased)}) rotate(${mix(0, -12, eased)}deg)`;
      }

      const targetRect = mark.getBoundingClientRect();
      const targetInset = 4;
      const sourceTop = slotDocumentTop - morphStart;
      const targetLeft = targetRect.left + targetInset;
      const targetTop = targetRect.top + targetInset;
      const targetWidth = Math.max(1, targetRect.width - targetInset * 2);
      const targetHeight = Math.max(1, targetRect.height - targetInset * 2);
      const bottomRadius = mix(8, 50, eased);

      heroFrame.style.left = `${mix(slotRect.left, targetLeft, eased)}px`;
      heroFrame.style.top = `${mix(sourceTop, targetTop, eased)}px`;
      heroFrame.style.width = `${mix(slotRect.width, targetWidth, eased)}px`;
      heroFrame.style.height = `${mix(slotRect.height, targetHeight, eased)}px`;
      heroFrame.style.borderRadius = `${mix(42, 50, eased)}% ${mix(42, 50, eased)}% ${bottomRadius}% ${bottomRadius}%`;
      heroFrame.style.transform = `rotate(${mix(-2, 0, eased)}deg)`;
      heroFrame.style.boxShadow = `0 ${mix(18, 4, eased)}px ${mix(48, 14, eased)}px rgba(32,26,54,${mix(0.26, 0.12, eased)})`;
    };

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
      if (homeHero && !morphFrame) morphFrame = window.requestAnimationFrame(updateHeroMorph);
    };
    const onResize = () => {
      if (!morphFrame) morphFrame = window.requestAnimationFrame(updateHeroMorph);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();
    return () => {
      window.cancelAnimationFrame(themeFrame);
      window.cancelAnimationFrame(morphFrame);
      settleInHero();
      reveal.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
      <div className="ambient-shapes" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true"><span>Open</span></div>
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="scroll-line" aria-hidden="true" />
      <header className="site-header">
        <PageLink href="/" className="wordmark" label="Boluwatife Alabi, home">
          <span className={`mark ${pathname === "/" ? "" : "has-static-portrait"}`} ref={markRef}>
            {pathname !== "/" && <Image className="mark-static-portrait" src="/images/boluwatife-hero.jpg" alt="" width={120} height={120} sizes="44px" />}
            <span className="mark-letter">B!</span>
          </span>
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

      <main className="site-main">{children}</main>

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
