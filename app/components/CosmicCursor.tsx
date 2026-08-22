"use client";

import { useEffect, useRef } from "react";

type TrailParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  color: string;
  phase: number;
  gravity: number;
};

const trailColors = ["#5a44ff", "#ff5d9e", "#47d7ad", "#ffd64d", "#ffffff"];

export function CosmicCursor() {
  const trailRef = useRef<HTMLCanvasElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trail = trailRef.current;
    const rocket = rocketRef.current;
    if (!trail || !rocket) return;

    const context = trail.getContext("2d");
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!context || !finePointer) return;

    const particles: TrailParticle[] = [];
    const pointer = { x: -120, y: -120, previousX: -120, previousY: -120, ready: false };
    const follower = { x: -120, y: -120, angle: 0, stretch: 1 };
    let animationFrame = 0;
    let explosionTimer = 0;
    let lastFrameTime = performance.now();
    let deviceScale = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      trail.width = Math.round(window.innerWidth * deviceScale);
      trail.height = Math.round(window.innerHeight * deviceScale);
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
    };

    const addParticles = (x: number, y: number, previousX: number, previousY: number) => {
      if (reduceMotion) return;
      const dx = x - previousX;
      const dy = y - previousY;
      const distance = Math.hypot(dx, dy);
      if (distance < 2) return;

      const normalX = -dy / distance;
      const normalY = dx / distance;
      const directionX = dx / distance;
      const directionY = dy / distance;
      const count = Math.min(32, Math.max(2, Math.ceil(distance / 9)));

      for (let index = 0; index < count; index += 1) {
        const progress = (index + Math.random()) / count;
        const spread = (Math.random() - 0.5) * Math.min(28, 7 + distance * 0.08);
        const drift = (Math.random() - 0.5) * 0.75;
        particles.push({
          x: previousX + dx * progress + normalX * spread,
          y: previousY + dy * progress + normalY * spread,
          vx: normalX * drift + directionX * (0.12 + Math.random() * 0.35),
          vy: normalY * drift + directionY * (0.12 + Math.random() * 0.35),
          age: 0,
          life: 620 + Math.random() * 860,
          size: 0.7 + Math.random() * 2.25,
          color: trailColors[Math.floor(Math.random() * trailColors.length)],
          phase: Math.random() * Math.PI * 2,
          gravity: 0,
        });
      }

      if (particles.length > 360) particles.splice(0, particles.length - 360);
    };

    const explode = () => {
      if (!pointer.ready || reduceMotion) return;
      const burstColors = root.dataset.theme === "dark"
        ? ["#fff7e7", "#ffdf62", "#ff86b3", "#8276ff", "#77dcb9"]
        : ["#201a36", "#5c4dff", "#ff78aa", "#ff9858", "#82e8c5"];

      for (let index = 0; index < 58; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.4 + Math.random() * 6.4;
        particles.push({
          x: pointer.x + (Math.random() - 0.5) * 8,
          y: pointer.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          life: 460 + Math.random() * 520,
          size: 1.2 + Math.random() * 3.8,
          color: burstColors[Math.floor(Math.random() * burstColors.length)],
          phase: Math.random() * Math.PI * 2,
          gravity: 0.075 + Math.random() * 0.035,
        });
      }

      rocket.classList.remove("is-exploding");
      void rocket.offsetWidth;
      rocket.classList.add("is-exploding");
      window.clearTimeout(explosionTimer);
      explosionTimer = window.setTimeout(() => {
        rocket.classList.remove("is-exploding");
      }, 620);
    };

    const draw = (time: number) => {
      const delta = Math.min(34, time - lastFrameTime || 16.67);
      lastFrameTime = time;

      if (pointer.ready) {
        if (reduceMotion) {
          follower.x = pointer.x;
          follower.y = pointer.y;
          follower.angle = 0;
          follower.stretch = 1;
        } else {
          const beforeX = follower.x;
          const beforeY = follower.y;
          const easing = 1 - Math.pow(0.8, delta / 16.67);
          follower.x += (pointer.x - follower.x) * easing;
          follower.y += (pointer.y - follower.y) * easing;
          const velocityX = follower.x - beforeX;
          const velocityY = follower.y - beforeY;
          const speed = Math.hypot(velocityX, velocityY);
          if (speed > 0.08) follower.angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;
          follower.stretch += (Math.min(1.24, 1 + speed * 0.018) - follower.stretch) * 0.22;
        }

        rocket.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0) rotate(${follower.angle}deg) scale(${follower.stretch}, ${2 - follower.stretch})`;
      }

      context.clearRect(0, 0, trail.width / deviceScale, trail.height / deviceScale);
      context.globalCompositeOperation = root.dataset.theme === "dark" ? "lighter" : "source-over";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.age += delta;
        if (particle.age >= particle.life) {
          particles.splice(index, 1);
          continue;
        }

        const progress = particle.age / particle.life;
        const fadeIn = Math.min(1, progress * 8);
        const alpha = fadeIn * Math.pow(1 - progress, 1.7);
        particle.x += particle.vx * (delta / 16.67);
        particle.y += particle.vy * (delta / 16.67) - 0.035 * (delta / 16.67);
        particle.vy += particle.gravity * (delta / 16.67);
        particle.vx *= 0.988;
        particle.vy *= 0.988;
        const pulse = 0.78 + Math.sin(particle.phase + progress * 10) * 0.22;
        const radius = particle.size * pulse;

        context.save();
        context.globalAlpha = alpha * (root.dataset.theme === "dark" ? 0.92 : 0.74);
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = radius > 1.8 ? 9 : 4;
        context.beginPath();
        context.arc(particle.x, particle.y, Math.max(0.45, radius), 0, Math.PI * 2);
        context.fill();
        if (radius > 2.15) {
          context.lineWidth = 0.7;
          context.strokeStyle = particle.color;
          context.beginPath();
          context.moveTo(particle.x - radius * 2.4, particle.y);
          context.lineTo(particle.x + radius * 2.4, particle.y);
          context.moveTo(particle.x, particle.y - radius * 2.4);
          context.lineTo(particle.x, particle.y + radius * 2.4);
          context.stroke();
        }
        context.restore();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const show = () => {
      if (!pointer.ready) return;
      rocket.classList.add("is-visible");
    };
    const hide = () => {
      rocket.classList.remove("is-visible");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pointer.ready) {
        pointer.previousX = event.clientX;
        pointer.previousY = event.clientY;
        follower.x = event.clientX;
        follower.y = event.clientY;
        pointer.ready = true;
        trail.classList.add("is-visible");
        show();
      }
      addParticles(event.clientX, event.clientY, pointer.previousX, pointer.previousY);
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      rocket.classList.toggle("is-active", Boolean(target.closest("a, button, input, textarea, select, [data-cursor]")));
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (target.closest("button, .button, [role='button']")) explode();
    };
    const onKeyboardClick = (event: globalThis.MouseEvent) => {
      if (event.detail !== 0) return;
      const target = event.target as HTMLElement;
      if (target.closest("button, .button, [role='button']")) explode();
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("click", onKeyboardClick, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide, { passive: true });
    document.documentElement.addEventListener("pointerenter", show, { passive: true });
    window.addEventListener("blur", hide);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(explosionTimer);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onKeyboardClick);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas className="cursor-trail" ref={trailRef} aria-hidden="true" />
      <div className="cursor-rocket" ref={rocketRef} aria-hidden="true">
        <span className="rocket-shell">
          <i className="rocket-fin rocket-fin-top" />
          <i className="rocket-fin rocket-fin-bottom" />
          <i className="rocket-flame" />
        </span>
      </div>
    </>
  );
}
