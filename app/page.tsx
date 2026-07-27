import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Clock,
  HandHeart,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CountUp } from "@/components/CountUp";
import { CellsFeature } from "@/components/CellsFeature";

const IMG = {
  jovens:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1100&h=1300&fit=crop&auto=format",
  kids: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1100&h=1300&fit=crop&auto=format",
  culto:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1800&h=1000&fit=crop&auto=format",
};

/** Informações que todo visitante procura primeiro — ponte entre o hero e a página. */
const visitInfo = [
  {
    icon: Clock,
    label: "Cultos de domingo",
    value: "10h da manhã · 18h da noite",
    href: "/contato",
    cta: "Planeje sua visita",
  },
  {
    icon: MapPin,
    label: "Onde nos encontrar",
    value: "R. Augusto de Oliveira Camargo, 257 — Centro",
    href: "/contato",
    cta: "Ver no mapa",
  },
  {
    icon: Users,
    label: "Durante a semana",
    value: "26 células espalhadas por Indaiatuba",
    href: "/celulas",
    cta: "Achar a mais perto",
  },
];

/** Três portas de entrada — o padrão "next steps" das igrejas americanas. */
const nextSteps = [
  {
    icon: HandHeart,
    tone: "lilac",
    title: "Venha num domingo",
    desc: "Chegue do jeito que você está. Tem gente pra te receber e nenhuma cobrança.",
    href: "/contato",
    cta: "Como chegar",
  },
  {
    icon: Users,
    tone: "sand",
    title: "Entre numa célula",
    desc: "Grupos pequenos que se reúnem nas casas durante a semana. É onde a amizade de verdade acontece.",
    href: "/celulas",
    cta: "Ver as células",
  },
  {
    icon: Baby,
    tone: "gold",
    title: "Traga sua família",
    desc: "Enquanto você adora, seus filhos vivem a fé no nível deles — com segurança e alegria.",
    href: "/radicais-kids",
    cta: "Conhecer o Kids",
  },
];

const values = [
  {
    tone: "lilac",
    title: "Graça",
    desc: "Somos salvos pela graça e vivemos sob ela. Sem religião, sem performance — só o amor incondicional de Deus.",
  },
  {
    tone: "sand",
    title: "Células",
    desc: "A igreja acontece nas casas. Pequenos grupos que se cuidam, crescem e multiplicam vida em cada bairro.",
  },
  {
    tone: "gold",
    title: "Comunidade",
    desc: "Não somos uma instituição — somos família. Um lugar onde você é visto, conhecido e amado de verdade.",
  },
];

const ministries = [
  {
    href: "/radicais-livres",
    tag: "15 — 30 anos",
    title: "Radicais Livres",
    desc: "Jovens apaixonados por Jesus, vivendo a fé sem medo e sem religião.",
    img: IMG.jovens,
  },
  {
    href: "/radicais-kids",
    tag: "0 — 14 anos",
    title: "Radicais Kids",
    desc: "Um espaço seguro e alegre pra crianças encontrarem Jesus e fazerem amigos.",
    img: IMG.kids,
  },
];

const stats = [
  { value: "26", label: "Células ativas" },
  { value: "8", label: "Bairros alcançados" },
  { value: "1000+", label: "Pessoas conectadas" },
];

const toneStyles: Record<string, { chip: string; card: string }> = {
  lilac: { chip: "bg-lilac text-grape", card: "bg-lilac/60" },
  sand: { chip: "bg-sand text-plum", card: "bg-sand/70" },
  gold: { chip: "bg-gold-soft text-gold", card: "bg-gold-soft/60" },
};

export default function Home() {
  return (
    <>
      {/* ═══ HERO — foto cheia sob um véu ameixa, derretendo no bege da página ═══ */}
      <section className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden bg-plum-deep sm:-mt-20">
        {/* Filmagem real de um culto, muda e em loop, atrás do véu ameixa.
            O poster (30 KB) pinta a capa na hora; o vídeo entra por cima quando
            carrega. Só H.264 — AV1 e VP9 saíram maiores nesse material. */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/capa-inicio.mp4"
          poster="/capa-inicio-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        {/* Escurece só à esquerda, pro texto ficar legível — vídeo limpo à direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-plum-deep/80 via-plum-deep/30 to-plum-deep/0" />

        <div className="container relative z-10 mx-auto px-5 pb-36 pt-32 sm:px-8 sm:pt-40 lg:px-12">
          <Reveal variant="fade" delay={150} once>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/85 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" />
              Indaiatuba · SP
            </span>
          </Reveal>

          <Reveal delay={300} once>
            <h1 className="font-display mt-7 max-w-4xl text-[clamp(2.9rem,8.5vw,6.75rem)] font-semibold leading-[0.94] text-white">
              Um lugar pra
              <span className="block font-normal italic text-gold-soft">
                você pertencer
              </span>
            </h1>
          </Reveal>

          <Reveal delay={620} once>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Somos uma igreja em células espalhada por Indaiatuba. Sem
              religiosidade e sem cobrança — gente real encontrando Jesus junto,
              no domingo e no meio da semana.
            </p>
          </Reveal>

          <Reveal delay={880} once>
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
              <MagneticButton>
                <Link
                  href="/celulas"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] active:scale-95"
                >
                  Encontre sua célula
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 active:scale-95"
              >
                Conheça a igreja
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PONTE — cartão que cavalga o hero e costura as duas seções ═══
          `flow-root` é essencial: sem ele a margem negativa do cartão colapsa
          com a seção e sobe o fundo bege junto, em vez de sobrepor o vídeo. */}
      <section className="relative z-20 flow-root bg-bone">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal variant="up" className="-mt-28 sm:-mt-32">
            <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-border shadow-[0_30px_70px_-40px_rgba(28,21,35,0.55)] sm:grid-cols-3">
              {visitInfo.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group bg-card p-7 transition-colors duration-300 hover:bg-lilac/40 sm:p-8"
                >
                  <item.icon
                    size={20}
                    className="text-grape transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="font-display mt-2 text-lg leading-snug text-foreground">
                    {item.value}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-grape">
                    {item.cta}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ BOAS-VINDAS — editorial, com washes de cor no fundo ═══ */}
      <section className="relative overflow-hidden bg-bone pb-28 pt-28 sm:pb-36 sm:pt-36 lg:pb-44 lg:pt-44">
        <div className="wash -left-40 top-4 h-[30rem] w-[30rem] bg-lilac opacity-80" />
        <div className="wash -right-32 bottom-0 h-[24rem] w-[24rem] bg-gold-soft opacity-70" />

        <div className="container relative mx-auto grid items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                <Sparkles size={13} />
                Bem-vindo à Videira
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="font-display mt-6 text-[clamp(2.25rem,5.2vw,3.9rem)] font-semibold leading-[1.03] text-foreground">
                Você não precisa ter tudo resolvido{" "}
                <span className="font-normal italic text-grape">
                  pra fazer parte.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  A Videira nasceu da convicção de que a igreja é gente, não
                  prédio. Por isso a nossa vida acontece em dois lugares: no
                  domingo, quando a cidade inteira se junta pra adorar — e nas
                  casas, durante a semana, onde a fé vira amizade.
                </p>
                <p>
                  Não importa se você cresceu na igreja, se está voltando depois
                  de anos ou se essa é a sua primeira vez. Aqui tem lugar pra
                  você exatamente como você chegou.
                </p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <Link
                href="/sobre"
                className="group mt-9 inline-flex items-center gap-2.5 border-b border-foreground/25 pb-1.5 text-sm font-medium text-foreground transition-colors hover:border-grape hover:text-grape"
              >
                Nossa história e o que cremos
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={120}>
            <div className="relative">
              <div className="absolute -inset-4 -rotate-2 rounded-[2.25rem] bg-lilac/70" />
              <div className="relative overflow-hidden rounded-[2rem] bg-sand shadow-[0_36px_80px_-45px_rgba(28,21,35,0.6)]">
                <ImageWithFallback
                  src="/pastores.png"
                  alt="Pastores da Igreja Videira Indaiatuba"
                  className="aspect-[5/6] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum-deep/90 to-plum-deep/0 p-7 pt-16">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                    Nossos pastores
                  </p>
                  <p className="font-display mt-1 text-2xl text-white">
                    Aqui você é esperado
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PRIMEIROS PASSOS — cards em tons diferentes, bege escorrendo pra areia ═══ */}
      <section className="bg-gradient-to-b from-bone via-bone to-sand pb-28 sm:pb-36 lg:pb-44">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Comece por aqui
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] text-foreground">
              Três jeitos simples de dar o primeiro passo
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
            {nextSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 110}>
                <Link
                  href={step.href}
                  className="group flex h-full flex-col rounded-[1.75rem] bg-card p-8 shadow-[0_20px_50px_-38px_rgba(28,21,35,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-40px_rgba(28,21,35,0.6)] lg:p-9"
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${toneStyles[step.tone].chip}`}
                  >
                    <step.icon size={21} />
                  </span>
                  <h3 className="font-display mt-7 text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-grape">
                    {step.cta}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CÉLULAS — split animado, agora em areia quente ═══ */}
      <CellsFeature />

      {/* ═══ VALORES — cards coloridos, areia voltando pro bege ═══ */}
      <section className="bg-gradient-to-b from-sand via-sand to-bone py-28 sm:py-36 lg:py-44">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Nossa essência
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] text-foreground">
              O que nos move{" "}
              <span className="font-normal italic text-grape">todo dia</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 110}>
                <div
                  className={`h-full rounded-[1.75rem] p-9 transition-transform duration-300 hover:-translate-y-1.5 lg:p-10 ${toneStyles[v.tone].card}`}
                >
                  <span className="font-display text-5xl font-semibold leading-none text-foreground/15">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-7 text-2xl font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-foreground/65">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MINISTÉRIOS — cards grandes com foto ═══ */}
      <section className="relative overflow-hidden bg-bone pb-28 sm:pb-36 lg:pb-44">
        <div className="wash -right-40 top-10 h-[26rem] w-[26rem] bg-lilac opacity-70" />
        <div className="container relative mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Ministérios
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] text-foreground">
              Para cada fase da vida
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6">
            {ministries.map((m, i) => (
              <Reveal
                key={m.title}
                delay={i * 130}
                variant={i === 0 ? "left" : "right"}
              >
                <Link
                  href={m.href}
                  className="group relative block h-full overflow-hidden rounded-[2rem] bg-plum-deep"
                >
                  <ImageWithFallback
                    src={m.img}
                    alt={m.title}
                    className="aspect-[4/5] w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95 sm:aspect-[5/4] lg:aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/45 to-plum-deep/0" />
                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                      {m.tag}
                    </span>
                    <h3 className="font-display mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-tight text-white">
                      {m.title}
                    </h3>
                    <p className="mt-2 max-w-sm leading-relaxed text-white/70">
                      {m.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-soft">
                      Saiba mais
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FECHAMENTO — números + convite, escurecendo direto pro rodapé ═══ */}
      <section className="relative overflow-hidden rounded-t-[2.5rem] bg-plum-deep lg:rounded-t-[4rem]">
        <ImageWithFallback
          src={IMG.culto}
          alt="Culto de domingo"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-plum/70 via-plum-deep/85 to-plum-deep" />

        <div className="container relative mx-auto px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-10">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 120}
                className="text-center lg:text-left"
              >
                <CountUp
                  value={s.value}
                  className="font-display block text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none text-gold-soft"
                />
                <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-white/55">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" className="mt-24 text-center sm:mt-32">
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.02] text-white">
              Seja bem-vindo à{" "}
              <span className="font-normal italic text-gold-soft">
                família Videira
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-white/70">
              Não importa onde você está na sua jornada. Manda uma mensagem,
              aparece num domingo — a gente te espera.
            </p>
            <MagneticButton>
              <Link
                href="/contato"
                className="group mt-11 inline-flex items-center gap-2.5 rounded-full bg-bone px-9 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_-18px_rgba(0,0,0,0.7)] active:scale-95"
              >
                Quero me conectar
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
