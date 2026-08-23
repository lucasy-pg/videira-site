import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { MolduraFoto } from "@/components/MolduraFoto";
import {
  ALCANCE,
  ETAPAS,
  HERO,
  LOGO_KIDS,
  ONDE,
  PERSONAGENS,
  PROCESSO_INTRO,
  PROJETOS,
  VISAO,
} from "@/lib/kids";

export const metadata: Metadata = {
  title: "Radicais Kids — Igreja Videira Indaiatuba",
  description:
    "Ministério de crianças e juvenis da Igreja Videira: culto Kids, células de crianças e o processo espiritual na infância — evangelismo, ensino e treinamento.",
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * O SISTEMA DESTA PÁGINA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Ela é a única do site com uma segunda família de cor. A licença está escrita
 * no `globals.css`, junto das quatro regras que a seguram; o resumo é: fundo
 * sempre do site (`bone`/`sand`/`plum-deep`), cor da marca Kids só em numeral,
 * filete e chip, nunca em texto corrido, nunca em gradiente.
 *
 * TIPOGRAFIA. Nenhum título usa a fonte da marca Kids. A voz é a mesma das
 * outras páginas internas — Manrope na manchete e no texto, pelos tokens
 * `--font-display` e `--font-body` — e o infantil entra pela cor, pelo
 * personagem e pelo logo, não pela letra. É isso que faz a página parecer do
 * mesmo site sem deixar de ser do ministério. (Até 22/08/2026 a manchete era
 * Poppins, por uma classe `manchetes-poppins` no <div> raiz; a classe saiu
 * quando a Manrope virou a família única do site.)
 *
 * ⚠️ A Manrope é uma família só romana, então esta página continua sem itálico
 * nenhum: o versículo da etapa 02 era italic e virou romano entre aspas. Um
 * `italic` que reapareça aqui dentro cai no oblíquo sintético do navegador.
 *
 * TÍTULOS. Curtos e literais: "Nossa visão", "Onde acontece", "Projetos". Sem
 * manchete publicitária, sem "não é X, é Y" — a personalidade vem do desenho.
 * A versão anterior desta página era construída em cima desse tipo de frase; se
 * alguém for reintroduzir uma, é uma decisão de conteúdo, não de layout.
 *
 * RITMO. As seções NÃO têm a mesma altura, e a alternância de superfície é o
 * que separa uma da outra — sem faixa decorativa no meio:
 *
 *   hero escuro (alto) → alcance claro (baixo) → visão sand (média)
 *   → onde acontece bone (alta) → processo plum (faixa curta)
 *   → 01 bone → 02 sand → 03 plum-deep → projetos bone (alta) → cta escuro
 *
 * A faixa curta do "processo espiritual" é de propósito o trecho mais baixo da
 * página: ela é um respiro entre a seção alta de "onde acontece" e a sequência
 * das três etapas, e é o único lugar em que os três nomes aparecem juntos.
 *
 * FOTOGRAFIA. Toda foto passa pela `<MolduraFoto>`, que desenha o espaço com o
 * caminho do arquivo enquanto a foto não existe. Ver o comentário de lá antes
 * de trocar por `<Image>` direto.
 */

/* As quatro tintas da marca, resolvidas em classe. Ficam num mapa só para que
   uma etapa e um projeto da MESMA cor não possam divergir por engano, e para
   que dê para varrer a página inteira e ver onde a cor entra. */
const COR = {
  magenta: { texto: "text-kids-magenta", fundo: "bg-kids-magenta" },
  ciano: { texto: "text-kids-ciano", fundo: "bg-kids-ciano" },
  amarelo: { texto: "text-kids-amarelo", fundo: "bg-kids-amarelo" },
  roxo: { texto: "text-kids-roxo", fundo: "bg-kids-roxo" },
} as const;

export default function RadicaisKids() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ 01 · HERO ══════════════════════════════════════════════════════
          Sangra por baixo do header (a rota entrou em `OVERLAY_ROUTES`). É o
          que dá o primeiro segundo de "isto é uma seção do site" antes de
          qualquer texto ser lido.

          O logo da marca é o título — por isso o `<h1>` é o próprio logo com o
          nome no `alt`, e não um texto repetindo "Radicais Kids" ao lado dele.
          ⚠️ O arquivo tem só 300px de largura, então ele é exibido a 210px e
          não passa disso: esticado além daí embaça. Se aparecer um SVG ou um
          PNG grande da marca, este é o lugar que ganha em trocar. */}
      <section className="relative isolate overflow-hidden bg-plum-deep">
        <div className="container mx-auto px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-12 lg:pt-40 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal variant="blur">
                <h1 className="m-0">
                  <Image
                    src={LOGO_KIDS}
                    alt={HERO.titulo}
                    width={300}
                    height={124}
                    className="h-auto w-[168px] sm:w-[196px] lg:w-[210px]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="font-display mt-8 max-w-md text-[clamp(1.5rem,3.4vw,2.35rem)] font-normal leading-[1.2] text-white">
                  {HERO.texto}
                </p>
              </Reveal>

              <Reveal delay={220}>
                {/* ⚠️ O BOTÃO SÓLIDO NÃO SAI MAIS DA PÁGINA, e isso é a mesma
                    decisão que a capa da /radicais-livres já tinha tomado: ele
                    era "Planeje sua visita" apontando para a /contato, e mandar
                    alguém falar com a igreja na primeira dobra é cobrar
                    compromisso de quem ainda não sabe do que se trata. A
                    /contato continua sendo o destino do convite final (seção
                    08), depois de a página inteira ter explicado o ministério.

                    O DESTINO É A SEÇÃO 03, e o rótulo do botão é a etiqueta
                    dela palavra por palavra: quem clica em "Quem somos" chega
                    num bloco cuja primeira linha é "Quem somos". A faixa dos
                    números (02) passa voando no caminho — ela é o alcance da
                    rede, não a apresentação, e quem quiser lê na volta.

                    `<a>` CRU E NÃO `<Link>`: o Link do Next existe para trocar
                    de rota, e num pulo dentro da mesma página ele só
                    acrescentaria trabalho de roteador. O destino tem
                    `scroll-mt` e o `html` da casa tem `scroll-behavior: smooth`,
                    então o pulo é suave sem uma linha de script. */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <MagneticButton>
                    <a
                      href="#quem-somos"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95 sm:w-auto"
                    >
                      Quem somos
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </MagneticButton>
                  <Link
                    href="/celulas"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95 sm:w-auto"
                  >
                    Ver as células
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* A foto é a protagonista do hero. Sem ela, o espaço marcado ocupa
                exatamente o mesmo recorte — a composição não muda de forma no
                dia em que o arquivo chegar. */}
            <Reveal variant="scale" delay={180}>
              <MolduraFoto
                foto={HERO.foto}
                tom="escuro"
                sizes="(min-width: 1024px) 55vw, 92vw"
                eager
                className="aspect-[4/5] w-full rounded-[1.75rem] sm:aspect-[3/2] lg:aspect-[4/3] lg:rounded-[2.25rem]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 02 · ALCANCE ═══════════════════════════════════════════════════
          Faixa baixa logo depois do hero, com os três números que estavam
          enterrados num parágrafo na fonte.

          Grade tipográfica com filete entre as colunas — não são três cards, e
          não é painel de indicadores: o número é grande, o rótulo é pequeno, e
          não há caixa em volta de nada.

          OS DOIS PERSONAGENS AQUI NÃO SÃO ENFEITE. Eles são de nacionalidades
          diferentes (um escocês de kilt, um mexicano de sombrero) porque o tema
          da marca é missionário — então eles entram junto do "32 nações", que é
          a única frase da página que eles ilustram de verdade.

          COMO ELES CABEM SEM COBRIR NÚMERO NENHUM: a partir de `xl` a grade
          reserva `pr-64` (256px) à direita e os dois pousam nessa sobra, na
          mesma linha de base. Somem abaixo de `xl`, onde a faixa é só
          tipografia.

          ⚠️ O TETO DO NUMERAL É CALCULADO, não escolhido. A coluna mais
          apertada é a do meio: em 1440 sobram (1344 − 256) ÷ 3 − 64 = 298px, e
          "11.656" é o número mais largo da faixa. A 3.5rem ele mede ~184px e
          cabe; no teto anterior (4.75rem) media ~250px e ENCAVALAVA na terceira
          coluna — era o defeito que estava no ar. Quem subir este clamp precisa
          refazer a conta com "11.656", não com "32". */}
      <section className="relative overflow-hidden bg-bone py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              O ministério pelo mundo
            </span>
          </Reveal>

          <div className="relative mt-10">
            <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 xl:pr-64">
              {ALCANCE.map((item, i) => (
                <Reveal
                  key={item.rotulo}
                  delay={i * 90}
                  className={`py-6 sm:py-0 ${i > 0 ? "sm:pl-5 lg:pl-8" : ""} ${
                    i < ALCANCE.length - 1 ? "sm:pr-5 lg:pr-8" : ""
                  }`}
                >
                  <dt className="font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-medium leading-[0.95] tracking-tight text-foreground">
                    {item.numero}
                  </dt>
                  <dd className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    {item.rotulo}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <div
              aria-hidden
              className="pointer-events-none absolute right-0 bottom-0 hidden select-none items-end gap-4 xl:flex"
            >
              <Image
                src={PERSONAGENS.projetos}
                alt=""
                width={340}
                height={736}
                className="h-[164px] w-auto"
              />
              <Image
                src={PERSONAGENS.treinamento}
                alt=""
                width={352}
                height={630}
                className="h-[140px] w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 03 · NOSSA VISÃO ═══════════════════════════════════════════════
          O personagem do Jesus com o Amado Coração entra aqui, e é o único
          lugar em que um personagem fica grande: a visão é a frase mais
          importante da página e ele é a imagem que a marca usa para dizer
          exatamente isso. Mesmo assim ele divide a largura com o texto, nunca
          ocupa meia viewport sozinho. */}
      {/* `overflow-hidden` NÃO é enfeite: os <Reveal> "left"/"right" nascem
          deslocados 40px no eixo X e, num bloco de largura cheia no celular,
          esses 40px passam da borda do documento. O `overflow-x: clip` do
          `html` impede a rolagem lateral, mas o documento continua medindo
          410px numa tela de 390 — foi o que se mediu aqui. Conter na seção é o
          mesmo remédio que a Home já usa, e deixa esta página em 390 exatos. */}
      {/* `id` E `scroll-mt`: o botão sólido do hero aponta para cá. Diferente
          da /radicais-livres, onde a mesma âncora existe só por respiro, AQUI O
          `scroll-mt` É CORREÇÃO: esta rota está na `OVERLAY_ROUTES` mas NÃO na
          `ROTAS_HEADER_ESTATICO`, então a barra do topo é fixa e cobriria os
          primeiros 4rem do destino. Os valores acompanham a altura dela
          (`h-16` / `sm:h-20`); quem mexer numa mexe na outra. */}
      <section
        id="quem-somos"
        className="overflow-hidden bg-sand py-20 scroll-mt-16 sm:py-24 sm:scroll-mt-20 lg:py-28"
      >
        <div className="container mx-auto grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-12">
          <Reveal variant="left">
            {/* ⚠️ A ETIQUETA DIZIA "Radicais Kids" e virou "Quem somos" quando o
                botão do hero passou a apontar para cá. São dois ganhos no mesmo
                gesto: o rótulo do botão e a primeira linha do destino viram a
                mesma palavra — que é o que faz quem clicou saber que chegou —, e
                a faixa para de repetir o nome que o logo do hero já deu. */}
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Quem somos
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Nossa visão
            </h2>
            {/* O filete roxo é o único acento desta seção. O roxo da marca Kids
                (#7b2a90) e não o `grape` do site: é a mesma cor do contorno do
                logo, e ela reaparece no projeto Ide lá embaixo. */}
            <span
              aria-hidden
              className="mt-7 block h-[3px] w-14 rounded-full bg-kids-roxo"
            />
            <p className="font-display mt-7 text-[clamp(1.25rem,2.3vw,1.6rem)] font-normal leading-[1.4] text-foreground">
              {VISAO.texto}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {VISAO.apoio}
            </p>
          </Reveal>

          <Reveal variant="right" delay={120} className="order-first lg:order-none">
            <Image
              src={PERSONAGENS.jesus}
              alt="Ilustração do Radicais Kids: Jesus abraçando uma criança"
              width={834}
              height={1016}
              sizes="(min-width: 1024px) 34vw, 60vw"
              className="mx-auto h-auto w-[220px] sm:w-[280px] lg:w-full lg:max-w-[380px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ═══ 04 · ONDE ACONTECE ═════════════════════════════════════════════
          Culto e célula na mesma seção, porque juntos eles são A estrutura —
          a mesma da igreja adulta.

          A composição é ASSIMÉTRICA e não dois cards iguais: as duas colunas
          têm larguras diferentes, recortes de foto diferentes (retrato x
          paisagem) e a segunda desce um degrau no desktop. Sem moldura, sem
          sombra: o que separa um bloco do outro é o espaço e o recorte. */}
      <section className="overflow-hidden bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="font-display max-w-xl text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Onde acontece
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {ONDE.map((bloco, i) => (
              <Reveal
                key={bloco.id}
                delay={i * 120}
                variant={i === 0 ? "left" : "right"}
                /* O degrau da segunda coluna. Só no desktop — no celular os
                   dois blocos empilham e um deslocamento viraria buraco. */
                className={i === 1 ? "lg:mt-24" : ""}
              >
                <MolduraFoto
                  foto={bloco.foto}
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className={`w-full rounded-[1.5rem] lg:rounded-[1.75rem] ${
                    i === 0 ? "aspect-[4/3]" : "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
                  }`}
                />

                <h3 className="font-display mt-8 text-[clamp(1.6rem,2.8vw,2.15rem)] font-medium leading-tight text-foreground">
                  {bloco.titulo}
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  {bloco.texto}
                </p>

                {/* Os chips carregam o dado concreto do bloco: as salas por
                    idade no culto, os dois formatos na célula. */}
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {bloco.detalhesRotulo}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {bloco.detalhes.map((d) => (
                    <li
                      key={d}
                      className="rounded-full bg-sand px-4 py-2 text-sm text-foreground"
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                {/* CTA só onde existe destino. O culto não tem página, então
                    não ganha botão — é o que tira os "Saiba mais" repetidos. */}
                {bloco.href && bloco.hrefRotulo && (
                  <Link
                    href={bloco.href}
                    className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-grape transition-colors hover:text-plum"
                  >
                    {bloco.hrefRotulo}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 05 · PROCESSO ESPIRITUAL ═══════════════════════════════════════
          A faixa mais baixa da página, e a única em `plum` (o roxo médio) — não
          se confunde com o `plum-deep` do hero, do treinamento e do fecho.

          Serve para uma coisa só: dizer que são três etapas e nomeá-las antes
          de elas começarem. Os três nomes aparecem aqui com o numeral já na cor
          que cada etapa vai usar mais abaixo, então a cor passa a significar
          alguma coisa antes de ser usada. */}
      <section className="bg-plum py-16 sm:py-20">
        <div className="container mx-auto grid gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16 lg:px-12">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              Como trabalhamos
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.05] text-white">
              Processo espiritual
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-xl leading-relaxed text-white/70">
              {PROCESSO_INTRO}
            </p>
            <ol className="mt-8 flex flex-col gap-x-10 gap-y-4 sm:flex-row sm:flex-wrap">
              {ETAPAS.map((e) => (
                <li key={e.n} className="flex items-baseline gap-3">
                  <span
                    className={`font-display text-lg font-medium ${COR[e.cor].texto}`}
                  >
                    {e.n}
                  </span>
                  <span className="font-display text-xl font-medium text-white">
                    {e.titulo}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ═══ 06–08 · AS TRÊS ETAPAS ═════════════════════════════════════════
          Um sistema só, três aplicações. O que muda entre elas é a superfície,
          a cor do acento, o lado da foto e a presença do personagem — a
          estrutura (numeral, título, filete, texto) é idêntica nas três.

          A ALTERNÂNCIA DE LADO é o que cria o ritmo, e ela é calculada do
          índice: par à esquerda, ímpar à direita. No celular tudo empilha na
          mesma ordem (texto e depois foto), porque inverter a ordem de leitura
          numa coluna só não cria ritmo nenhum — só confunde. */}
      {ETAPAS.map((etapa, i) => {
        const escura = etapa.superficie === "escura";
        const invertida = i % 2 === 1;

        return (
          <section
            key={etapa.n}
            className={`overflow-hidden py-24 sm:py-28 lg:py-32 ${
              escura ? "bg-plum-deep" : etapa.superficie === "sand" ? "bg-sand" : "bg-bone"
            }`}
          >
            <div className="container mx-auto grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
              <Reveal
                variant={invertida ? "right" : "left"}
                className={invertida ? "lg:order-2" : ""}
              >
                <span
                  className={`font-display block text-[clamp(3rem,8vw,5.5rem)] font-medium leading-[0.85] ${
                    COR[etapa.cor].texto
                  }`}
                >
                  {etapa.n}
                </span>
                <h2
                  className={`font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] ${
                    escura ? "text-white" : "text-foreground"
                  }`}
                >
                  {etapa.titulo}
                </h2>
                <span
                  aria-hidden
                  className={`mt-6 block h-[3px] w-14 rounded-full ${COR[etapa.cor].fundo}`}
                />
                <p
                  className={`mt-6 max-w-lg leading-relaxed ${
                    escura ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {etapa.texto}
                </p>

                {etapa.versiculo && (
                  <blockquote
                    className={`mt-8 border-l-2 pl-6 ${
                      escura ? "border-white/20" : "border-clay"
                    }`}
                  >
                    <p
                      className={`font-display text-[clamp(1.15rem,2vw,1.4rem)] font-normal leading-[1.35] ${
                        escura ? "text-white" : "text-foreground"
                      }`}
                    >
                      “{etapa.versiculo.texto}”
                    </p>
                    <footer
                      className={`mt-3 text-sm ${
                        escura ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      {etapa.versiculo.ref}
                    </footer>
                  </blockquote>
                )}
              </Reveal>

              <Reveal
                variant="scale"
                delay={120}
                className={`relative ${invertida ? "lg:order-1" : ""}`}
              >
                <MolduraFoto
                  foto={etapa.foto}
                  tom={escura ? "escuro" : "claro"}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="aspect-[4/3] w-full rounded-[1.5rem] lg:aspect-[5/4] lg:rounded-[1.75rem]"
                />

                {/* O personagem ENCOSTA na foto pela quina de baixo, meio para
                    dentro e meio para fora — é o "entrar parcialmente" do
                    brief, e é o que quebra o retângulo sem inventar forma. Fora
                    do celular, onde ele cobriria a foto. */}
                {etapa.personagem && (
                  <Image
                    aria-hidden
                    alt=""
                    src={etapa.personagem}
                    width={322}
                    height={692}
                    className="pointer-events-none absolute -bottom-8 -left-10 hidden h-[210px] w-auto select-none lg:block"
                  />
                )}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ═══ 09 · PROJETOS ══════════════════════════════════════════════════
          Lista editorial, não grade de quatro cards.

          Escolhi a lista pelos dados: cada projeto tem um QUANDO (o jejum do 1º
          semestre, o do 2º, as férias, a virada dos 12 anos) e juntos eles
          formam o ano do ministério. Numa grade 2x2 essa sequência se perde;
          numa lista em linhas ela se lê de cima para baixo, que é a ordem em
          que os projetos acontecem. Cada linha ganha só o numeral e um ponto na
          cor do projeto — o resto é tipografia e um fio. */}
      <section className="relative overflow-hidden bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Treinamento na prática
            </span>
            <h2 className="font-display mt-5 max-w-xl text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Projetos
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              São quatro por ano, na agenda da igreja, e todas as células de
              crianças os realizam ao mesmo tempo.
            </p>
          </Reveal>

          <ul className="mt-14 border-t border-border">
            {PROJETOS.map((p, i) => (
              <Reveal key={p.nome} delay={i * 70}>
                <li className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-border py-8 sm:py-10 lg:grid-cols-[auto_1fr_1.3fr] lg:items-baseline">
                  <span
                    className={`font-display text-2xl font-medium leading-none ${COR[p.cor].texto}`}
                  >
                    {p.n}
                  </span>

                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-tight text-foreground">
                      {p.nome}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${COR[p.cor].fundo}`}
                      />
                      {p.quando}
                    </p>
                  </div>

                  <p className="leading-relaxed text-muted-foreground">
                    {p.texto}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* O quarto personagem fecha a página entrando pela borda direita, na
            altura da lista. É o único elemento que sangra na margem. */}
        <Image
          aria-hidden
          alt=""
          src={PERSONAGENS.projetos}
          width={340}
          height={736}
          className="pointer-events-none absolute -right-6 bottom-0 hidden h-[260px] w-auto select-none opacity-90 xl:block"
        />
      </section>

      {/* ═══ 10 · FECHO ═════════════════════════════════════════════════════
          A página termina numa ação SÓ: falar com a igreja.

          ⚠️ HAVIA UM "Ver as células" DE CONTORNO AO LADO, e ele saiu a pedido
          do Lucas. Dois botões no fecho não são dois caminhos, são nenhum — e
          aqui o de contorno era pior que empate: mandava para OUTRA página
          justamente no ponto em que a pessoa acabou de ler tudo e está pronta
          para falar com alguém. A /celulas continua a um clique de quem a quer,
          no bloco "Células Kids" da seção 04 (o `href` vem do `lib/kids.ts`) e
          no Header, que está na tela o tempo todo.

          ⚠️ SEM HORÁRIO AQUI, e o motivo não é falta de dado. O horário dos
          cultos ESTÁ no projeto — `components/Footer.tsx` publica "Domingo · 9h
          e 18h" — e a rede diz que o Culto Kids roda no mesmo dia e horário do
          culto de adultos. O que ninguém conferiu é se em Indaiatuba o Kids
          abre nos DOIS horários ou só num. Repetir "9h e 18h" aqui afirmaria o
          primeiro, e um pai que aparecer no horário errado com a criança paga
          essa conta. Quando a igreja confirmar, o lugar é logo abaixo do
          título. */}
      <section className="bg-plum-deep py-24 text-center sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <Image
              src={LOGO_KIDS}
              alt="Radicais Kids"
              width={300}
              height={124}
              className="mx-auto h-auto w-[140px] sm:w-[160px]"
            />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mx-auto mt-9 max-w-2xl text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.1] text-white">
              Venha com as crianças
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
              Fale com a gente antes de vir e alguém combina com você como é a
              chegada, a sala da idade e a saída.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex justify-center">
              <MagneticButton>
                <Link
                  href="/contato"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95"
                >
                  Falar com a igreja
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
