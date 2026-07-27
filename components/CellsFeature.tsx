"use client";

import Link from "next/link";
import { ArrowRight, Home, MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const cellFeatures = [
  { icon: Users, text: "Grupos de 8 a 15 pessoas" },
  { icon: MapPin, text: "Espalhadas por toda Indaiatuba" },
  { icon: Home, text: "Abertas para quem quiser começar" },
];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Seção "A igreja acontece nas casas" com animação Horizontal Split Meeting:
 * a foto desliza a partir da esquerda e o texto a partir da direita,
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const slide = (dir: "left" | "right") => ({
    transform: visible
      ? "translateX(0)"
      : `translateX(${dir === "left" ? "-115%" : "115%"})`,
    transition: `transform 950ms ${EASE}`,
    willChange: "transform",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-sand pb-28 sm:pb-36 lg:pb-44"
    >
      <div className="container mx-auto grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Foto — desliza da esquerda */}
        <div style={slide("left")}>
          <div className="relative overflow-hidden rounded-[2rem] bg-clay">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=1000&h=1150&fit=crop&auto=format"
              alt="Grupo de célula reunido numa casa"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/50 via-plum-deep/10 to-plum-deep/0" />
          </div>
        </div>

        {/* Texto — desliza da direita */}
        <div style={slide("right")}>
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Sistema de células
          </span>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] text-foreground">
            A igreja acontece{" "}
            <span className="font-normal italic text-grape">nas casas</span>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
            As células são pequenos grupos que se reúnem nas casas durante a
            semana. É onde a comunidade acontece de verdade — amizades
            profundas, cuidado mútuo e crescimento espiritual em cada bairro de
            Indaiatuba.
          </p>

          <ul className="mt-9 space-y-3.5">
            {cellFeatures.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3.5 text-foreground/75"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lilac text-grape">
                  <item.icon size={16} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>

          <Link
            href="/celulas"
            className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-plum-deep px-8 py-4 text-sm font-semibold text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
          >
            Ver todas as células
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
