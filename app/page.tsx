import Link from "next/link";
import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CellsFeature } from "@/components/CellsFeature";

const IMG = {
  jovens:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1100&h=1300&fit=crop&auto=format",
  /* A foto anterior (blocos de brinquedo em cores primárias) era a coisa mais
     saturada da página inteira e brigava com a disciplina de uma matiz só. */
  kids: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1100&h=1300&fit=crop&auto=format",
  culto:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1800&h=1000&fit=crop&auto=format",
};

/** Informações que todo visitante procura primeiro — ponte entre o hero e a página. */
const visitInfo = [
  {
    label: "Cultos de domingo",
    value: "10h da manhã · 18h da noite",
    img: "https://images.unsplash.com/photo-1579975096649-e773152b04cb?w=900&h=700&fit=crop&auto=format",
    alt: "Congregação reunida num culto de domingo",
    href: "/contato",
    cta: "Planeje sua visita",
  },
  {
    label: "Onde nos encontrar",
    value: "R. Augusto de Oliveira Camargo, 257 · Centro",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&h=700&fit=crop&auto=format",
    alt: "Pessoas reunidas em volta de uma mesa comprida",
    href: "/contato",
    cta: "Ver no mapa",
  },
  {
    label: "Durante a semana",
    value: "26 células espalhadas por Indaiatuba",
    img: "https://images.unsplash.com/photo-1593896385987-16bcbf9451e5?w=900&h=700&fit=crop&auto=format",
    alt: "Célula reunida numa casa durante a semana",
    href: "/celulas",
    cta: "Achar a mais perto",
  },
];

/** Três portas de entrada — o padrão "next steps" das igrejas americanas. */
const nextSteps = [
  {
    title: "Venha num domingo",
    desc: "Chegue do jeito que você está. Tem gente pra te receber e nenhuma cobrança.",
    href: "/contato",
    cta: "Como chegar",
  },
  {
    title: "Entre numa célula",
    desc: "Grupos pequenos que se reúnem nas casas durante a semana. É onde a amizade de verdade acontece.",
    href: "/celulas",
    cta: "Ver as células",
  },
  {
    title: "Traga sua família",
    desc: "Enquanto você adora, seus filhos vivem a fé no nível deles — com segurança e alegria.",
    href: "/radicais-kids",
    cta: "Conhecer o Kids",
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

export default function Home() {
  return (
    <>
      {/* ═══ HERO — o vídeo é um BLOCO na página, não o fundo dela ═══
          A página começa no bone e o vídeo mora dentro de um retângulo com
          margem, como nas referências. O header fica sólido por cima do bone,
          em vez de flutuar sobre a filmagem. */}
      <section className="bg-bone pt-4 sm:pt-6">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative isolate flex min-h-[32rem] items-end overflow-hidden rounded-[2rem] bg-plum-deep sm:min-h-[36rem] lg:min-h-[40rem] lg:rounded-[2.5rem]">
            {/* Filmagem real de um culto, muda e em loop. O poster (30 KB) pinta
                a capa na hora; o vídeo entra por cima quando carrega. Só H.264 —
                AV1 e VP9 saíram maiores nesse material. */}
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
            {/* O véu muda com o formato do retângulo. No celular ele é retrato e
                o texto ocupa quase tudo — inclusive o teto claro do galpão —,
                então o escurecimento sobe alto. No desktop o retângulo é
                widescreen e o texto vive só no canto inferior esquerdo: aí os
                dois véus se cruzam nesse canto e o lado direito fica limpo. */}
            <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/95 via-plum-deep/70 to-plum-deep/40 lg:from-plum-deep/85 lg:via-plum-deep/15 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-plum-deep/45 via-transparent to-transparent lg:from-plum-deep/70 lg:via-plum-deep/10" />

            <div className="relative z-10 w-full p-7 sm:p-10 lg:p-14">
              <Reveal delay={300} once>
                <h1 className="font-display max-w-3xl text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[0.95] text-white">
                  Um lugar para
                  <span className="block font-normal italic text-grape-light">
                    você pertencer
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={620} once>
                <p className="mt-6 max-w-lg leading-relaxed text-white/75 sm:text-lg">
                  Somos uma igreja em células espalhada por Indaiatuba. Sem
                  religiosidade e sem cobrança — gente real encontrando Jesus
                  junto, no domingo e no meio da semana.
                </p>
              </Reveal>

              <Reveal delay={880} once>
                <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
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
          </div>
        </div>
      </section>

      {/* ═══ PONTE — três portas de entrada, cada uma com a própria foto ═══
          Mesma composição do hero (foto + véu subindo + texto encostado na
          base) em escala menor, pra ler como continuação dele e não como uma
          tabela de avisos colada embaixo. */}
      {/* `pt-5` é o MESMO valor do `gap-5` entre os cards, de propósito: assim o
          retângulo do hero e os três cards leem como um arranjo só. Com respiro
          grande aqui eles ficam órfãos — nem pertencem ao hero, nem à seção
          seguinte (testado com pt-16 e pt-28: os dois leem como ilha perdida). */}
      <section className="bg-bone pt-5">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 sm:grid-cols-3">
            {visitInfo.map((item, i) => (
              <Reveal key={item.label} variant="up" delay={i * 90}>
                <Link
                  href={item.href}
                  className="group relative flex aspect-[5/4] items-end overflow-hidden rounded-[1.75rem] bg-plum-deep"
                >
                  <ImageWithFallback
                    src={item.img}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                  {/* Véu forte de propósito: estes cards são pequenos e a
                      eyebrow é 11px branca. Com foto clara (céu, parede branca)
                      um véu suave apaga o texto — conferir sempre trocando a
                      foto por uma bem clara antes de aliviar estes stops. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/95 via-plum-deep/75 to-plum-deep/35" />

                  <div className="relative z-10 p-6 sm:p-7">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                      {item.label}
                    </p>
                    <p className="font-display mt-2 text-xl leading-snug text-white">
                      {item.value}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-xs font-semibold text-plum-deep transition-colors duration-300 group-hover:bg-white">
                      {item.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOAS-VINDAS — fundo neutro e quieto, a cor mora só no card ═══ */}
      <section className="relative overflow-hidden bg-bone pb-24 pt-24 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
        {/* `items-start`: o card escuro é bem mais curto que a coluna de texto,
            e centralizado ele boiava com vazio em cima E embaixo. Alinhado no
            topo, o espaço que sobra lê como "a coluna acabou". */}
        <div className="container relative mx-auto grid items-start gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                <Sparkles size={13} />
                Bem-vindo à Videira
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="font-display mt-6 text-[clamp(2.25rem,5.2vw,3.9rem)] font-medium leading-[1.03] text-foreground">
                Você não precisa ter tudo resolvido{" "}
                <span className="block font-normal italic text-grape">
                  pra fazer parte.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  O nome vem de uma promessa: <em className="italic text-foreground">
                    &quot;Eu sou a videira, vocês são os ramos&quot;</em> (João
                  15:5) — ramo isolado não dá fruto. Foi com essa convicção que
                  o pastor Aluízio Silva plantou uma igreja que se multiplicou
                  em casas ao redor do mundo: a fé acontece primeiro nas
                  famílias, em grupos pequenos, antes de acontecer nos
                  prédios.
                </p>
                <p>
                  Em Indaiatuba, isso vira rotina: domingo de portas abertas
                  pra cidade inteira, semana inteira de células nos bairros.
                  Não importa se você cresceu na igreja, se está voltando
                  depois de anos ou se essa é a sua primeira vez — aqui tem
                  lugar pra você exatamente como você chegou.
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
              <div className="overflow-hidden rounded-[2rem] bg-plum-deep p-9 sm:p-11">
                <Globe2 size={22} className="text-grape-light" />
                <p className="font-display mt-6 text-[1.65rem] leading-snug text-white sm:text-3xl">
                  Um só chamado,{" "}
                  <span className="block italic text-grape-light">
                    espalhado em 30 países.
                  </span>
                </p>
                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-8">
                  <div>
                    <p className="font-display text-4xl text-grape-light">
                      1997
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">
                      início em Goiânia
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl text-grape-light">
                      1.300+
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">
                      igrejas Videira
                    </p>
                  </div>
                </div>
                <p className="mt-8 text-sm leading-relaxed text-white/60">
                  A Videira Indaiatuba faz parte da rede iniciada pelo pastor
                  Aluízio Silva — a mesma visão de células, agora com
                  endereço na nossa cidade.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PRIMEIROS PASSOS — faixa greige, cards brancos por cima ═══ */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Comece por aqui
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Três jeitos simples de dar{" "}
              <span className="block font-normal italic text-grape">
                o primeiro passo
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
            {nextSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 110}>
                <Link
                  href={step.href}
                  className="group flex h-full flex-col rounded-[1.75rem] bg-card p-8 transition-transform duration-300 hover:-translate-y-1.5 lg:p-9"
                >
                  <h3 className="font-display text-2xl font-medium text-foreground">
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

      {/* ═══ MINISTÉRIOS — volta pro claro, cards grandes com foto ═══ */}
      <section className="relative overflow-hidden bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container relative mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Ministérios
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Tem lugar para{" "}
              <span className="block font-normal italic text-grape">
                cada fase da vida
              </span>
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
                    <h3 className="font-display mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-medium leading-tight text-white">
                      {m.title}
                    </h3>
                    <p className="mt-2 max-w-sm leading-relaxed text-white/70">
                      {m.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-grape-light">
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

        <div className="container relative mx-auto px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          {/* Os números (26 células / 16 bairros) já são ditos, com mais força,
              na seção dos bairros. Repeti-los aqui como troféu enfraquecia os
              dois lugares — o fechamento é só convite. */}
          <Reveal variant="scale" className="text-center">
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.02] text-white">
              Seja bem-vindo à{" "}
              <span className="block font-normal italic text-grape-light">
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
