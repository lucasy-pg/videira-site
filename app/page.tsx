import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";
import { HeroStats } from "@/components/HeroStats";
import { CellsFeature } from "@/components/CellsFeature";
import { Parallax } from "@/components/Parallax";
import { MagneticButton } from "@/components/MagneticButton";

const stats = [
  { value: "6+", label: "Células ativas" },
  { value: "8", label: "Bairros alcançados" },
  { value: "1000+", label: "Pessoas conectadas" },
];

const values = [
  {
    number: "01",
    title: "Graça",
    desc: "Somos salvos pela graça e vivemos sob ela. Sem religião, sem performances — só o amor incondicional de Deus.",
  },
  {
    number: "02",
    title: "Células",
    desc: "A igreja acontece nas casas. Pequenos grupos que se cuidam, crescem e multiplicam vida ao redor de Indaiatuba.",
  },
  {
    number: "03",
    title: "Comunidade",
    desc: "Não somos uma instituição — somos família. Um lugar onde você é visto, conhecido e amado de verdade.",
  },
];

const ministries = [
  {
    to: "/radicais-livres",
    tag: "15 — 30 anos",
    title: "Radicais Livres",
    desc: "Jovens apaixonados por Jesus, vivendo a fé sem medo e sem religião. Louvor, palavra e comunidade real.",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=500&fit=crop&auto=format",
  },
  {
    to: "/radicais-kids",
    tag: "0 — 14 anos",
    title: "Radicais Kids",
    desc: "Um espaço seguro e alegre para crianças encontrarem Jesus, fazerem amigos e crescerem na fé.",
    img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&h=500&fit=crop&auto=format",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section — full viewport, cinematic */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <Parallax speed={0.15} className="absolute inset-0 scale-[1.15]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1579975096649-e773152b04cb?w=1600&h=900&fit=crop&auto=format"
              alt="Jovens adorando"
              className="w-full h-full object-cover opacity-70 animate-[heroZoom_18s_ease-out_forwards]"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        </div>

        {/* First screen: fits the viewport exactly — title, subtitle, buttons, scroll cue */}
        <div className="relative z-10 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] flex flex-col">
          <div className="flex-1 min-h-0 flex flex-col justify-center pt-6 sm:pt-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Reveal delay={200} variant="blur" once>
                <h1
                  className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none uppercase tracking-tight text-foreground mb-5"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Apaixonados<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                    por Jesus.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={650} once>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
                  Uma comunidade neopentecostal viva, conectada em células pela graça de Deus — em cada bairro, em cada casa.
                </p>
              </Reveal>

              <Reveal delay={1100} once>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton>
                    <Link
                      href="/celulas"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold uppercase tracking-wider rounded-full hover:shadow-2xl hover:shadow-violet-600/30 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Encontre sua Célula
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </MagneticButton>
                  <Link
                    href="/sobre"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-foreground/5 border border-foreground/15 text-foreground font-medium rounded-full hover:bg-foreground/10 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
                  >
                    <Play size={16} className="text-violet-700" />
                    Conheça a Igreja
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Stats — só aparecem/animam quando o usuário rola a página */}
            <div className="max-w-4xl mt-10 sm:mt-12">
              <HeroStats stats={stats} />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-6 text-muted-foreground/60 animate-bounce">
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36 border-t border-border">
        <CursorGlow size={260} opacity={0.24} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <p className="text-xs text-violet-700 uppercase tracking-widest font-medium mb-4">
                Nossa Essência
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight text-foreground"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                O que nos<br />
                move todo dia
              </h2>
            </Reveal>
            <div className="divide-y divide-border">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 110} variant="right" className="py-6 first:pt-0 last:pb-0">
                  <div className="group">
                    <div className="flex gap-5 items-start">
                      <span className="text-xs text-muted-foreground/60 font-mono w-6 flex-shrink-0 pt-1 transition-colors group-hover:text-violet-700">
                        {v.number}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold uppercase text-foreground mb-2 leading-none group-hover:text-violet-700 transition-colors"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {v.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cells Feature — Horizontal Split Meeting */}
      <CellsFeature />

      {/* Ministries Preview */}
      <section className="py-20 sm:py-28 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 sm:mb-16">
            <p className="text-xs text-violet-700 uppercase tracking-widest font-medium mb-3">
              Ministérios
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-foreground leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Para Cada<br />Fase da Vida
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {ministries.map((m, i) => (
              <Reveal key={i} delay={i * 120} variant={i % 2 === 0 ? "left" : "right"}>
                <Link
                  href={m.to}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-violet-500/40 hover:-translate-y-1.5 transition-all duration-300 block h-full"
                >
                  <CursorGlow size={200} opacity={0.26} />
                  <div className="h-52 sm:h-64 overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={m.img}
                      alt={m.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="relative z-10 p-7">
                    <span className="text-[10px] text-violet-700 uppercase tracking-widest border border-violet-500/20 bg-violet-600/10 rounded-full px-3 py-1">
                      {m.tag}
                    </span>
                    <h3
                      className="text-3xl font-bold uppercase text-foreground mt-4 mb-2 group-hover:text-violet-700 transition-colors"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    <div className="inline-flex items-center gap-1.5 mt-5 text-xs text-foreground font-medium uppercase tracking-wider">
                      Saiba mais
                      <ArrowRight size={13} className="text-violet-700 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full bleed dark purple */}
      <section className="relative overflow-hidden bg-violet-950">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&h=600&fit=crop&auto=format"
            alt="Adoração"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 to-indigo-950/90" />
        </div>
        <CursorGlow size={300} opacity={0.32} blend="screen" />
        <Reveal variant="scale" className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white leading-tight mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Seja bem-vindo<br />à família Videira
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Não importa onde você está na sua jornada. Aqui tem lugar pra você.
          </p>
          <MagneticButton>
            <Link
              href="/contato"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold uppercase tracking-wider rounded-full hover:shadow-2xl hover:shadow-violet-600/35 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Quero me conectar
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  );
}
