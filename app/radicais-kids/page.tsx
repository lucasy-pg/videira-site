import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Book, Smile, Shield } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Radicais Kids — Igreja Videira Indaiatuba",
  description:
    "Ministério infantil da Igreja Videira. Um espaço seguro e alegre para crianças de 0 a 14 anos encontrarem Jesus.",
};

const pillars = [
  {
    icon: Star,
    title: "Adoração Infantil",
    desc: "Músicas, dança e louvor feitos para crianças viverem a presença de Deus desde cedo, com alegria e autenticidade.",
  },
  {
    icon: Book,
    title: "Palavra para Crianças",
    desc: "A Bíblia ensinada de forma criativa, visual e envolvente — para que cada criança entenda e ame a Palavra de Deus.",
  },
  {
    icon: Smile,
    title: "Ambiente Seguro",
    desc: "Um espaço acolhedor onde crianças se sentem amadas, vistas e cuidadas por adultos comprometidos e treinados.",
  },
  {
    icon: Shield,
    title: "Proteção e Cuidado",
    desc: "Todos os voluntários são verificados e treinados. A segurança das crianças é nossa prioridade número um.",
  },
];

const ageGroups = [
  { range: "0 a 3 anos", name: "Berçário", desc: "Cuidado com amor para os pequeninos enquanto os pais participam do culto.", color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/20", text: "text-pink-400" },
  { range: "4 a 6 anos", name: "Jardim", desc: "Histórias bíblicas, brincadeiras e amizades na medida certa para essa faixa.", color: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/20", text: "text-orange-400" },
  { range: "7 a 10 anos", name: "Juniores", desc: "Dinâmicas, teatro e atividades criativas para aprofundar a fé de forma divertida.", color: "from-violet-500/20 to-indigo-500/20", border: "border-violet-500/20", text: "text-violet-400" },
  { range: "11 a 14 anos", name: "Pré-Teens", desc: "Transição para a juventude com identidade, propósito e comunidade.", color: "from-cyan-500/20 to-teal-500/20", border: "border-cyan-500/20", text: "text-cyan-400" },
];

const photos = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&h=400&fit=crop&auto=format",
];

export default function RadicaisKids() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden border-b border-border pb-16 sm:pb-24">
        <div className="absolute inset-0">
          <Parallax speed={0.12} className="absolute inset-0 scale-[1.15]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&h=900&fit=crop&auto=format"
              alt="Crianças felizes"
              className="w-full h-full object-cover opacity-25"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="blur" once>
            <h1
              className="text-6xl sm:text-7xl lg:text-9xl font-bold uppercase leading-none text-foreground mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Radicais<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                Kids
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120} once>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mt-6">
              Um espaço feito com amor para crianças de 0 a 14 anos encontrarem Jesus, fazerem amigos e crescerem na fé de forma alegre e segura.
            </p>
          </Reveal>
          <Reveal delay={220} once>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <MagneticButton>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold uppercase tracking-wider rounded-full hover:shadow-2xl hover:shadow-violet-900/50 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Saiba Mais
                  <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 border border-white/15 text-foreground font-medium rounded-full hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
              >
                Sobre a Igreja
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
            <Reveal variant="left">
              <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&h=700&fit=crop&auto=format"
                  alt="Crianças brincando"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={100}>
              <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
                Nossa missão
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase leading-tight text-foreground mb-6"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Plantar fé<br />desde cedo
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Radicais Kids é o ministério infantil da Igreja Videira. Acreditamos que crianças não são o futuro da igreja — elas são a igreja agora, no tamanho delas.
                </p>
                <p>
                  Nosso objetivo é criar um ambiente onde cada criança se sinta amada por Deus e faça parte de uma comunidade que cuida, brinca e cresce junto.
                </p>
                <p>
                  Enquanto os pais participam do culto, as crianças vivem a própria experiência — com alegria, criatividade e verdade.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              Como cuidamos
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-foreground"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              O que oferecemos
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {pillars.map((item, i) => (
              <Reveal key={i} delay={i * 90} variant="scale">
                <div className="bg-background p-10 sm:p-12 h-full group hover:bg-secondary transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-violet-600/20 group-hover:scale-110 group-hover:-rotate-6">
                    <item.icon size={20} className="text-violet-400" />
                  </div>
                  <h3
                    className="text-2xl font-bold uppercase text-foreground mb-3 group-hover:text-violet-400 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
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

      {/* Age groups */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              Turmas
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-foreground"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Para Cada Fase
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ageGroups.map((group, i) => (
              <Reveal key={i} delay={i * 90} variant="scale">
                <div
                  className={`rounded-2xl border ${group.border} bg-gradient-to-b ${group.color} p-7 h-full transition-transform duration-300 hover:scale-[1.04] hover:-translate-y-1`}
                >
                  <div className={`text-xs font-medium uppercase tracking-widest ${group.text} mb-4`}>
                    {group.range}
                  </div>
                  <h3
                    className="text-2xl font-bold uppercase text-foreground mb-3"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {group.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{group.desc}</p>
                </div>
              </Reveal>
            ))}
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
                alt="Radicais Kids"
                className="w-full h-full object-cover opacity-50 hover:opacity-80 hover:scale-110 transition-all duration-500"
              />
            </div>
          </Reveal>
        ))}
      </section>

      {/* Volunteer CTA */}
      <section className="py-20 sm:py-28 border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="scale" className="max-w-3xl mx-auto text-center">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">
              Faça parte do time
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-foreground leading-tight mb-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Seja Voluntário<br />no Kids
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Se você ama crianças e quer fazer a diferença nas próximas gerações, venha servir no Radicais Kids. Treinamos e apoiamos cada voluntário.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/15 text-foreground font-medium rounded-full hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
            >
              Quero ser voluntário
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 to-indigo-950/40" />
        <CursorGlow size={300} opacity={0.3} />
        <Reveal variant="scale" className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-5xl sm:text-6xl font-bold uppercase text-foreground leading-tight mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Traga seus<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              filhos no domingo
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            O Radicais Kids acontece nos cultos de domingo — 10h e 18h. Vem com a família!
          </p>
          <MagneticButton>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold uppercase tracking-wider rounded-full hover:shadow-2xl hover:shadow-violet-900/60 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Fale Conosco
              <ArrowRight size={18} />
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  );
}
