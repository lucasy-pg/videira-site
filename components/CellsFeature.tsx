"use client";

import Link from "next/link";
import { ArrowRight, Users, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";

const cellFeatures = [
  { icon: Users, text: "Grupos de 8 a 15 pessoas" },
  { icon: MapPin, text: "Espalhadas por toda Indaiatuba" },
  { icon: ArrowRight, text: "Abertas para quem quiser começar" },
];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Seção "A Igreja nas Casas" com animação Horizontal Split Meeting:
 * a imagem desliza a partir da esquerda e o texto a partir da direita,
 * encontrando-se no centro quando a seção entra na viewport.
 */
export function CellsFeature() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const slide = (dir: "left" | "right") => ({
    transform: visible
      ? "translateX(0)"
      : `translateX(${dir === "left" ? "-100%" : "100%"})`,
    transition: `transform 950ms ${EASE}`,
    willChange: "transform",
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <CursorGlow size={260} opacity={0.24} />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
        {/* Image side — desliza da esquerda */}
        <div className="relative h-72 lg:h-auto bg-muted" style={slide("left")}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=900&h=700&fit=crop&auto=format"
            alt="Grupo de célula reunido"
            className="w-full h-full object-cover opacity-60 saturate-[0.85]"
          />
          {/* Integra a foto ao fundo escuro em todos os tamanhos */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/40 lg:bg-gradient-to-r lg:from-background/30 lg:via-transparent lg:to-background" />
        </div>

        {/* Text side — desliza da direita */}
        <div
          className="bg-background flex items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24"
          style={slide("right")}
        >
          <div className="max-w-lg">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              Sistema de Células
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              A Igreja<br />nas Casas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              As células são pequenos grupos que se reúnem nas casas durante a semana. É onde a comunidade acontece de verdade — amizades profundas, cuidado mútuo e crescimento espiritual em cada bairro de Indaiatuba.
            </p>

            <div className="space-y-4 mb-10">
              {cellFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <item.icon size={16} className="text-violet-400 flex-shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>

            <Link
              href="/celulas"
              className="inline-flex items-center gap-2 text-foreground font-medium text-sm uppercase tracking-wider group"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Ver todas as células
              <ArrowRight
                size={16}
                className="text-violet-400 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
