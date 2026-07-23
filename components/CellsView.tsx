"use client";

import { MapPin, Clock, Users, ChevronRight, Phone } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { MagneticButton } from "@/components/MagneticButton";
import { useState } from "react";

const cellGroups = [
  { name: "Alto da Colina", address: "R. Júlia Augusta Steffen", neighborhood: "Alto da Colina", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Campo Bonito", address: "Av. Ottilia Ferraz de Camargo Brasil", neighborhood: "Campo Bonito", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Cecap", address: "R. Amadeu Furlan — Núcleo Hab.", neighborhood: "Cecap", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Cidade Nova II", address: "R. Amazonas", neighborhood: "Cidade Nova", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Epifania", address: "R. Olívio Nicola D'Ercoli — Jd. Esplanada", neighborhood: "Jd. Esplanada", day: "Sábado", time: "19h30", audience: "Jovens", tag: "Jovens" },
  { name: "Esplanada II", address: "R. Romão Pérez Corral — Jd. Esplanada II", neighborhood: "Jd. Esplanada II", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Filipenses", address: "R. Tupaciguara — Jd. Renata", neighborhood: "Jd. Renata", day: "Quinta", time: "19h00", audience: "Adultos", tag: "Adultos" },
  { name: "Jardim Adriana", address: "R. Sidney Vianna", neighborhood: "Jd. Adriana", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Alice", address: "R. Humberto Batisti", neighborhood: "Jd. Alice", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol", address: "R. Lourenço Rossi", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol I", address: "R. Maria José de Assis Lyra", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol II", address: "R. Carlos Alberto Garcia", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol III", address: "R. Antônio Magnusson", neighborhood: "Jd. Morada do Sol", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol IV", address: "R. Paulo Von Ah", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol V", address: "R. João Narezzi", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Paulistano", address: "R. Freguesia do Ó", neighborhood: "Jd. Paulistano", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Regina", address: "R. Ricieri Scachetti", neighborhood: "Jd. Regina", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Renata", address: "R. Eliza Aléssio Martins", neighborhood: "Jd. Renata", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Renata II", address: "R. Tupaciguara", neighborhood: "Jd. Renata", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Kairós", address: "R. Carlos Alberto Garcia — Morada do Sol", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Jovens", tag: "Jovens" },
  { name: "Manancial", address: "R. Júlia Augusta Steffen — Alto da Colina", neighborhood: "Alto da Colina", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Monte Verde", address: "R. Guarino Vanucci", neighborhood: "Monte Verde", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Morada do Sol", address: "R. Custódio Cândido Carneiro", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Parque das Nações", address: "R. José Francisco Ceccon", neighborhood: "Parque das Nações", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Parque Res. Indaiá", address: "R. Pedro Batista Apolinário", neighborhood: "Parque Res. Indaiá", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Pq. São Lourenço", address: "R. Giórgio Clini", neighborhood: "Pq. São Lourenço", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
];

const allTags = ["Todos", "Família", "Jovens", "Adultos"];

const tagStyle: Record<string, string> = {
  Jovens: "text-violet-400 border-violet-500/20 bg-violet-600/10",
  Adultos: "text-indigo-400 border-indigo-500/20 bg-indigo-600/10",
  Família: "text-emerald-400 border-emerald-500/20 bg-emerald-600/10",
};

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
              className="w-full h-full object-cover opacity-15"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal once>
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              Sistema de Células
            </p>
          </Reveal>
          <Reveal variant="blur" delay={80} once>
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold uppercase leading-none text-foreground max-w-3xl"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              O Coração<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                da Igreja
              </span>
            </h1>
          </Reveal>
          <Reveal delay={180} once>
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
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              O que é uma célula?
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
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
                  <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-violet-600/20 group-hover:scale-110">
                    <item.icon size={18} className="text-violet-400" />
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
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              Como funciona
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-foreground"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Uma Noite de Célula
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 90} variant="scale">
                <div className="bg-background p-8 sm:p-10 h-full group hover:bg-secondary transition-colors">
                  <div
                    className="text-5xl font-bold text-violet-600/20 mb-4 leading-none transition-colors group-hover:text-violet-500/40"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {s.step}
                  </div>
                  <h3
                    className="text-xl font-bold uppercase text-foreground mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
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
              <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
                {filtered.length} grupos disponíveis
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-foreground"
                style={{ fontFamily: "'Oswald', sans-serif" }}
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
                      ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-900/40"
                      : "border-border text-muted-foreground hover:border-violet-500/40 hover:text-foreground hover:-translate-y-0.5"
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
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
                className="animate-grid-in bg-card border border-border rounded-2xl p-6 hover:border-violet-500/40 hover:bg-secondary hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-[10px] font-medium uppercase tracking-widest border rounded-full px-3 py-1 ${tagStyle[cell.tag]}`}
                  >
                    {cell.audience}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold uppercase text-foreground mb-1 group-hover:text-violet-400 transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {cell.name}
                </h3>

                <div className="space-y-1.5 mt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} className="text-violet-400 flex-shrink-0" />
                    {cell.day} às {cell.time}
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <MapPin size={12} className="text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>{cell.address}</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/5519978201132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-5 text-xs text-foreground font-medium uppercase tracking-wider group-hover:text-violet-400 transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
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
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 to-indigo-950/40" />
        <CursorGlow size={300} opacity={0.3} />
        <Reveal variant="scale" className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-5xl sm:text-6xl font-bold uppercase text-foreground leading-tight mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold uppercase tracking-wider rounded-full hover:shadow-2xl hover:shadow-violet-900/60 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
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
