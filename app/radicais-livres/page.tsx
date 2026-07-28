import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Music, Zap, Users, Heart } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Radicais Livres — Igreja Videira Indaiatuba",
  description:
    "Ministério de jovens da Igreja Videira. Jovens de 15 a 30 anos vivendo a fé sem medo e sem religião.",
};

const activities = [
  {
    icon: Music,
    title: "Louvor Radical",
    desc: "Noites de adoração intensas, onde a presença de Deus é buscada de forma autêntica e sem formalidades.",
  },
  {
    icon: Zap,
    title: "Encontros Semanais",
    desc: "Toda semana: palavra, comunhão e conexões reais. O ambiente é descontraído, mas o propósito é sério.",
  },
  {
    icon: Users,
    title: "Células de Jovens",
    desc: "Grupos pequenos espalhados por Indaiatuba para jovens de 15 a 30 anos. Fé no dia a dia, perto de casa.",
  },
  {
    icon: Heart,
    title: "Serviço e Missão",
    desc: "Jovens que saem das quatro paredes e impactam a cidade. Ação social, missões e amor ao próximo.",
  },
];

const schedule = [
  { day: "Quarta", activity: "Células de Jovens", time: "20h00", note: "Diversos bairros" },
  { day: "Sábado", activity: "Encontro Radicais Livres", time: "18h00", note: "Sede da Igreja" },
  { day: "Domingo", activity: "Culto de Celebração", time: "10h e 18h", note: "Todos juntos" },
];

const photos = [
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop&auto=format",
];

export default function RadicaisLivres() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden border-b border-border pb-16 sm:pb-24">
        <div className="absolute inset-0">
          <Parallax speed={0.12} className="absolute inset-0 scale-[1.15]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=900&fit=crop&auto=format"
              alt="Jovens adorando"
              className="w-full h-full object-cover opacity-70"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="blur" once>
            <h1
              className="font-display text-6xl sm:text-7xl lg:text-9xl font-medium leading-none text-foreground mb-4"
            >
              Radicais<br />
              <span className="text-grape">
                Livres
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120} once>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mt-6">
              Jovens apaixonados por Jesus, vivendo a fé sem medo e sem religião. Radicais pelo amor de Deus, livres pela graça.
            </p>
          </Reveal>
          <Reveal delay={220} once>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <MagneticButton>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-grape text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-grape/25 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
                >
                  Fazer Parte
                  <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <Link
                href="/celulas"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-foreground/5 border border-foreground/15 text-foreground font-medium rounded-full hover:bg-foreground/10 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
              >
                Ver Células de Jovens
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Identity statement */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
            <Reveal variant="left">
              <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
                Quem somos
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-medium leading-tight text-foreground mb-6"
              >
                Fé sem<br />Formalidade
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Radicais Livres é o ministério de jovens da Igreja Videira — um espaço para quem tem entre 15 e 30 anos e quer viver a fé de forma real, intensa e sem máscaras.
                </p>
                <p>
                  Aqui não tem performance. Tem adoração de verdade, palavra que transforma, amizades que ficam e um propósito maior do que a gente mesmo.
                </p>
                <p>
                  Ser radical não é ser extremista — é ser completamente entregue ao amor de Deus e ao cuidado com as pessoas ao redor.
                </p>
              </div>
            </Reveal>
            <Reveal variant="right" delay={100}>
              <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=700&fit=crop&auto=format"
                  alt="Grupo de jovens"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
              O que fazemos
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl font-medium text-foreground"
            >
              Vida em<br />Movimento
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {activities.map((item, i) => (
              <Reveal key={i} delay={i * 90} variant="scale">
                <div className="bg-background p-10 sm:p-12 h-full group hover:bg-secondary transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-lilac border border-grape/15 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-lilac group-hover:scale-110 group-hover:-rotate-6">
                    <item.icon size={20} className="text-grape" />
                  </div>
                  <h3
                    className="font-display text-2xl font-medium text-foreground mb-3 group-hover:text-grape transition-colors"
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Reveal className="mb-12">
              <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
                Quando nos encontramos
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-medium text-foreground"
              >
                Agenda
              </h2>
            </Reveal>
            <div className="divide-y divide-border">
              {schedule.map((item, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group">
                    <div>
                      <h3
                        className="font-display text-xl font-medium text-foreground group-hover:text-grape transition-colors"
                      >
                        {item.day}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.activity}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{item.time}</div>
                      <div className="text-xs text-muted-foreground">{item.note}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="grid grid-cols-3 h-48 sm:h-64 border-b border-border">
        {photos.map((src, i) => (
          <Reveal key={i} delay={i * 80} variant="scale" className="h-full">
            <div className="overflow-hidden bg-muted h-full">
              <ImageWithFallback
                src={src}
                alt="Radicais Livres"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-500"
              />
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-sand" />
        <CursorGlow size={300} opacity={0.3} />
        <Reveal variant="scale" className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-tight mb-6"
          >
            Você é<br />
            <span className="text-grape">
              bem-vindo aqui
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            Não importa de onde você veio ou onde você está. Tem espaço pra você nos Radicais Livres.
          </p>
          <MagneticButton>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-grape text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-grape/25 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
            >
              Quero Participar
              <ArrowRight size={18} />
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  );
}
