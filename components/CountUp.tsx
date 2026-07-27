"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima um número de 0 até o valor alvo. Aceita valores como "6+", "8", "200+"
 * — preserva prefixo/sufixo não numérico.
 *
 * Por padrão dispara sozinho quando entra na viewport. Se `start` for passado,
 * esse controle externo assume: a contagem só começa quando `start` vira true
 * (usado quando o elemento já nasce visível na tela e precisa esperar um gatilho
 * explícito, como o usuário rolar a página, em vez de animar assim que carrega).
 */
export function CountUp({
  value,
  className,
  duration = 1400,
  start,
}: {
  value: string;
  className?: string;
  duration?: number;
  start?: boolean;
}) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  const runAnimation = () => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setN(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Modo controlado externamente: espera `start` virar true.
  useEffect(() => {
    if (start) runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  // Modo padrão: dispara sozinho ao entrar na viewport.
  useEffect(() => {
    if (start !== undefined) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
