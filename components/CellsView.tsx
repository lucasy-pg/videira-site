"use client";

import { MapPin, Clock, Users, ChevronRight, Phone } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { MagneticButton } from "@/components/MagneticButton";
import { useState } from "react";
import { cellGroups } from "@/lib/cells";


const allTags = ["Todos", "Família", "Jovens", "Adultos"];

/* O chip já escreve o público ("Adultos e Crianças", "Jovens"...) e o filtro
   acima já separa por tag — pintar cada categoria de uma cor era codificar
   duas vezes a mesma informação, com três matizes brigando na grade. */
const TAG_CHIP =
  "text-grape border-grape/15 bg-lilac";

const steps = [
  { step: "01", title: "Boas-vindas", desc: "Quebra-gelo e conexão com o grupo" },
  { step: "02", title: "Adoração", desc: "Louvor e adoração juntos" },
  { step: "03", title: "Palavra", desc: "Estudo e compartilhamento da Bíblia" },
  { step: "04", title: "Comunhão", desc: "Lanche, conversa e oração" },
];

export function CellsView() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered =
    activeFilter === "Todos"
      ? cellGroups
      : cellGroups.filter((c) => c.tag === activeFilter);

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-28 sm:py-36 overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Parallax speed={0.12} className="absolute inset-0 scale-[1.15]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=1600&h=700&fit=crop&auto=format"
              alt="Célula reunida"
              className="w-full h-full object-cover opacity-65"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
              Sistema de Células
            </p>
          </Reveal>
          <Reveal variant="blur" delay={80}>
            <h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-medium leading-none text-foreground max-w-3xl"
            >
              O Coração<br />
              <span className="text-grape">
                da Igreja
              </span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              {cellGroups.length} células espalhadas por Indaiatuba. Encontre a sua comunidade perto de onde você mora.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What is a Cell */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border overflow-hidden">
        <Reveal variant="left" className="h-full">
          <div className="bg-muted aspect-[4/3] lg:aspect-auto min-h-[360px] h-full overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1593896385987-16bcbf9451e5?w=900&h=700&fit=crop&auto=format"
              alt="Grupo em comunidade"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </Reveal>
        <Reveal variant="right" delay={100}>
          <div className="p-10 sm:p-14 lg:p-20 flex flex-col justify-center bg-card h-full">
            <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
              O que é uma célula?
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl font-medium leading-tight text-foreground mb-6"
            >
              Mais que um<br />estudo bíblico
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                As células são pequenos grupos que se reúnem semanalmente nas casas para cultivar relacionamentos genuínos, estudar a Palavra e experimentar a vida cristã em comunidade.
              </p>
              <p>
                É onde amizades verdadeiras nascem e a graça de Deus se torna concreta no dia a dia — sem palco, sem formalidade.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Users, label: "Comunhão Autêntica", sub: "Relacionamentos verdadeiros e profundos" },
                { icon: MapPin, label: "Perto de Você", sub: "Encontros em casas pela cidade" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-lilac border border-grape/15 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-lilac group-hover:scale-110">
                    <item.icon size={18} className="text-grape" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
              Como funciona
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl font-medium text-foreground"
            >
              Uma Noite de Célula
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 90} variant="scale">
                <div className="bg-background p-8 sm:p-10 h-full group hover:bg-secondary transition-colors">
                  <div
                    className="font-display text-5xl font-medium text-grape/25 mb-4 leading-none transition-colors group-hover:text-grape/40"
                  >
                    {s.step}
                  </div>
                  <h3
                    className="font-display text-xl font-medium text-foreground mb-2"
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cell Cards Grid with filter */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
                {filtered.length} grupos disponíveis
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-medium text-foreground"
              >
                Encontre<br />Sua Célula
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider border transition-all active:scale-95 ${
                    activeFilter === tag
                      ? "bg-grape border-grape text-white shadow-lg shadow-grape/20"
                      : "border-border text-muted-foreground hover:border-grape/35 hover:text-foreground hover:-translate-y-0.5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>

          <div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filtered.map((cell, index) => (
              <div
                key={index}
                className="animate-grid-in bg-card border border-border rounded-2xl p-6 hover:border-grape/35 hover:bg-secondary hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-[10px] font-medium uppercase tracking-widest border rounded-full px-3 py-1 ${TAG_CHIP}`}
                  >
                    {cell.audience}
                  </span>
                </div>

                <h3
                  className="font-display text-xl font-medium text-foreground mb-1 group-hover:text-grape transition-colors"
                >
                  {cell.name}
                </h3>

                <div className="space-y-1.5 mt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} className="text-grape flex-shrink-0" />
                    {cell.day} às {cell.time}
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <MapPin size={12} className="text-grape flex-shrink-0 mt-0.5" />
                    <span>{cell.address}</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/5519978201132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-5 text-xs text-foreground font-medium uppercase tracking-wider group-hover:text-grape transition-colors"
                >
                  Participar
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-sand" />
        <CursorGlow size={300} opacity={0.3} />
        <Reveal variant="scale" className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-5xl sm:text-6xl font-medium text-foreground leading-tight mb-6"
          >
            Não sabe qual<br />célula escolher?
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            Fala com a gente pelo WhatsApp e te ajudamos a encontrar o grupo mais perto de você.
          </p>
          <MagneticButton>
            <a
              href="https://wa.me/5519978201132"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-grape text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-grape/25 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
            >
              <Phone size={18} />
              Falar no WhatsApp
            </a>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  );
}
