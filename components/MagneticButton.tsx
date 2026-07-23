"use client";

import { useRef } from "react";

/**
 * Envolve um CTA e faz o botão "grudar" levemente no cursor ao passar perto,
 * voltando ao lugar com uma mola suave ao sair. Só em desktop com mouse fino;
 * respeita prefers-reduced-motion (fica estático).
 */
export function MagneticButton({
  children,
  className = "",
  strength = 18,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const canAnimate = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimate() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
