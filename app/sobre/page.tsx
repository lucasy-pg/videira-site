import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Sobre — Igreja Videira Indaiatuba",
  description:
    "Nossa história, missão, visão e no que cremos. Uma comunidade neopentecostal em células na graça de Deus, em Indaiatuba.",
};

const beliefs = [
  {
    title: "A Graça de Deus",
    desc: "Somos salvos pela graça mediante a fé, não por obras. O amor de Deus é incondicional e transformador.",
  },
  {
    title: "A Autoridade da Bíblia",
    desc: "A Palavra de Deus é nossa única regra de fé e prática, inspirada e inerrante.",
  },
  {
    title: "O Batismo no Espírito Santo",
    desc: "Cremos na atualidade dos dons espirituais e no poder do Espírito Santo para capacitar e transformar vidas.",
  },
  {
    title: "A Igreja em Células",
    desc: "As células são o ambiente ideal para discipulado, comunhão e multiplicação da igreja.",
  },
  {
    title: "A Grande Comissão",
    desc: "Somos chamados a fazer discípulos, batizando e ensinando tudo o que Jesus ordenou.",
  },
];

const pastors = {
  names: "Pastor Nome & Pastora Nome",
  role: "Pastores titulares",
  bio: [
    "Edite aqui com a história real do casal: como se conheceram, o chamado para o ministério e há quanto tempo estão à frente da Videira.",
    "Pode incluir também um pouco do coração deles pela igreja e pela cidade de Indaiatuba.",
  ],
  img: "/pastores.png",
};

const mvv = [
  {
    label: "Missão",
    text: "Fazer discípulos de Jesus Cristo através de células, vivendo e compartilhando a graça de Deus em Indaiatuba e além.",
  },
  {
    label: "Visão",
    text: "Ser uma igreja em células relevante e impactante, transformando vidas através do evangelho da graça.",
  },
  {
    label: "Valores",
    text: "Graça, comunidade, autenticidade, excelência e paixão pelas pessoas e pela presença de Deus.",
  },
];

export default function About() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Parallax speed={0.12} className="absolute inset-0 scale-[1.15]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&h=800&fit=crop&auto=format"
              alt="Adoração na igreja"
              className="w-full h-full object-cover opacity-70"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal once>
            <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
              Nossa história
            </p>
          </Reveal>
          <Reveal variant="blur" delay={80} once>
            <h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-medium leading-none text-foreground max-w-3xl"
            >
              Igreja<br />Videira
            </h1>
          </Reveal>
          <Reveal delay={180} once>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Uma comunidade neopentecostal em Indaiatuba, comprometida com a graça de Deus e o discipulado através das células.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {mvv.map((item, i) => (
              <Reveal key={i} delay={i * 110} variant="scale">
                <div className="bg-background p-10 sm:p-14 h-full group hover:bg-secondary transition-colors">
                  <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4 transition-all group-hover:tracking-[0.2em]">
                    {item.label}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 sm:py-28 lg:py-36 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <Reveal variant="left">
              <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579975096649-e773152b04cb?w=900&h=700&fit=crop&auto=format"
                  alt="Comunidade Videira"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={100}>
              <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
                De onde viemos
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-medium leading-tight text-foreground mb-8"
              >
                Nossa História
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  A Igreja Videira nasceu do sonho de criar uma comunidade cristã autêntica em Indaiatuba, onde as pessoas pudessem experimentar a graça de Deus de forma prática e transformadora.
                </p>
                <p>
                  Fundamentados nos princípios neopentecostais e comprometidos com o modelo de igreja em células, acreditamos que a verdadeira comunhão e crescimento espiritual acontecem quando nos conectamos de forma genuína uns com os outros.
                </p>
                <p>
                  Nosso nome &quot;Videira&quot; reflete nossa identidade em Cristo: <em>&quot;Eu sou a videira; vocês são os ramos&quot;</em> (João 15:5). Estamos conectados a Jesus e uns aos outros, produzindo frutos que glorificam a Deus.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Pastors */}
      <section className="py-20 sm:py-28 lg:py-36 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/5]">
              <ImageWithFallback
                src={pastors.img}
                alt={pastors.names}
                className="w-full h-full object-cover"
              />
            </div>
            <Reveal variant="right" delay={100}>
              <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
                Liderança
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-medium leading-tight text-foreground mb-6"
              >
                Nossos Pastores
              </h2>
              <p
                className="font-display text-2xl text-foreground font-medium mb-1"
              >
                {pastors.names}
              </p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">
                {pastors.role}
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {pastors.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-12 sm:mb-16">
              <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
                Fundamentos
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-medium leading-tight text-foreground"
              >
                No Que Cremos
              </h2>
            </Reveal>
            <div className="divide-y divide-border">
              {beliefs.map((b, i) => (
                <Reveal key={i} delay={i * 80} variant="right" className="py-8 first:pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 group">
                    <h3
                      className="font-display text-xl font-medium text-foreground group-hover:text-grape group-hover:translate-x-1 transition-all sm:col-span-1"
                    >
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed sm:col-span-2">
                      {b.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-sand" />
        <CursorGlow size={300} opacity={0.3} />
        <Reveal variant="scale" className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-5xl sm:text-6xl font-medium text-foreground leading-tight mb-6"
          >
            Venha Fazer<br />
            <span className="text-grape">
              Parte da Família
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            Você é bem-vindo para conhecer a Igreja Videira e descobrir a transformação que a graça faz na vida de pessoas reais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Link
                href="/contato"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-grape text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-grape/25 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
              >
                Entre em Contato
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <Link
              href="/celulas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground/5 border border-foreground/15 text-foreground font-medium rounded-full hover:bg-foreground/10 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
            >
              Ver Células
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
