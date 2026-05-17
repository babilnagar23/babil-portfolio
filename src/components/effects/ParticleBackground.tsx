"use client";

import { useEffect, useRef } from "react";

class Particle {
  x = 0;
  y = 0;
  size = 0;
  vx = 0;
  vy = 0;
  opacity = 0;
  phase = 0;

  constructor(private canvasW: number, private canvasH: number) {
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvasW;
    this.y = Math.random() * this.canvasH;
    this.size = Math.random() * 1.2 + 0.2;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.15;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.phase += 0.008;
    this.opacity = 0.08 + Math.sin(this.phase) * 0.12;
    if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) {
      this.canvasW = w;
      this.canvasH = h;
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
    ctx.fill();
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const particles: Particle[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      if (particles.length === 0) {
        for (let i = 0; i < 60; i++) particles.push(new Particle(w, h));
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update(w, h);
        p.draw(ctx);
      });
      frameRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-60"
      aria-hidden
    />
  );
}
