"use client";

import { useEffect, useRef } from "react";

/**
 * Grade de pontos desenhada em canvas: cada ponto cresce e ganha cor
 * (`grape`) conforme o cursor se aproxima, voltando a ser um pontinho
 * discreto quando o mouse passa longe. Canvas em vez de um <div> por ponto
 * porque a grade tem centenas de pontos redesenhados a cada frame durante o
 * movimento do mouse — em DOM isso pesaria, em canvas é uma única superfície.
 */
export function InteractiveDots({
  className = "",
  gap = 30,
  radius = 1.6,
  activeRadius = 3.4,
  influence = 150,
  baseColor = "24, 9, 41",
  activeColor = "109, 40, 217",
}: {
  className?: string;
  gap?: number;
  radius?: number;
  activeRadius?: number;
  influence?: number;
  baseColor?: string;
  activeColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / influence);
          const r = radius + t * (activeRadius - radius);
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle =
            t > 0.03
              ? `rgba(${activeColor}, ${0.18 + t * 0.7})`
              : `rgba(${baseColor}, 0.16)`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [gap, radius, activeRadius, influence, baseColor, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
