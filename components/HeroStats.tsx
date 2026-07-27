"use client";

import { useEffect, useState } from "react";
import { CountUp } from "@/components/CountUp";

/**
 * Estatísticas do hero: só aparecem/animam quando o usuário rola a página,
 * mesmo já estando dentro da primeira tela — não devem carregar junto com
 * o resto do hero no primeiro paint.
 */
export function HeroStats({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(true);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-wrap items-stretch gap-4 sm:gap-8">
      {stats.map((s, i) => (
        <div key={i} className="flex items-stretch gap-4 sm:gap-8">
          {i > 0 && (
            <div
              className={`hidden sm:block w-px self-stretch bg-border/60 transition-opacity duration-700 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: `${scrolled ? i * 90 : 0}ms` }}
          >
            <CountUp
              value={s.value}
              start={scrolled}
              className="block text-3xl sm:text-4xl font-bold text-foreground font-oswald"
            />
            <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
              {s.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
