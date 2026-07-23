"use client";

import { useEffect, useRef, useState } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade";

/**
 * Revela o conteúdo quando entra na viewport e, por padrão, esconde de novo
 * e re-anima quando o elemento sai (scroll pra cima ou pra baixo) — assim a
 * página ganha vida tanto na descida quanto na volta do scroll.
 *
 * `once` desativa o retrigger (usado em elementos que devem aparecer só na
 * primeira vez, como o hero inicial). `variant` escolhe a direção/efeito de
 * entrada.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  once = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  once?: boolean;
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
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "-6% 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

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
