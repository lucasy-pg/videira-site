"use client";

import { useEffect, useRef, useState } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade";

/**
 * Revela o conteúdo quando entra na viewport pela primeira vez. Sem
 * retrigger: uma vez visível, fica visível — voltar com o scroll não
 * reanima o elemento.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-6% 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${visible ? delay : 0}ms` }}
    >
      {children}
    </div>
  );
}
