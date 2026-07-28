"use client";

import { useEffect, useRef } from "react";

/**
 * Brilho radial violeta que segue o cursor dentro da section pai.
 * A section pai precisa ser `relative` (e de preferência `overflow-hidden`).
 * Só ativa em telas com hover (desktop).
 */
export function CursorGlow({
  color = "109, 40, 217",
  size = 320,
  opacity = 0.26,
  blend = "multiply",
}: {
  color?: string;
  size?: number;
  opacity?: number;
  /** "multiply" para seções claras, "screen" para as faixas escuras de CTA. */
  blend?: "multiply" | "screen";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--gx", `${x}px`);
        el.style.setProperty("--gy", `${y}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-20 hidden opacity-0 transition-opacity duration-500 md:block ${
        blend === "screen" ? "mix-blend-screen" : "mix-blend-multiply"
      }`}
      style={{
        background: `radial-gradient(${size}px circle at var(--gx, 50%) var(--gy, 50%), rgba(${color}, ${opacity}), transparent 50%)`,
      }}
    />
  );
}
