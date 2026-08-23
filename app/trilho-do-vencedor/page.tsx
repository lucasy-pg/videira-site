import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { MolduraFoto } from "@/components/MolduraFoto";
import {
  COR,
  ESCOLA_FAMILIA,
  ESCOLA_MINISTERIOS,
  FECHO,
  FORMACOES,
  HERO,
  PRIMEIROS_PASSOS,
  VISAO,
  type Cor,
  type Manchete,
} from "@/lib/trilho";

export const metadata: Metadata = {
  title: "Trilho do Vencedor — Igreja Videira Indaiatuba",
  description:
    "A jornada de formação espiritual da Igreja Videira: Encontro com Deus, Consolidação, Curso das Águas e Batismo, e as formações CME, CTL e Seminário Pastoral.",
};

/**
 * A palavra-chave colorida dentro de uma manchete.
 *
 * Vai DENTRO do `<h1>`/`<h2>`, não no lugar dele: assim cada título mantém as
 * próprias classes de escala e quebra, e o único trabalho daqui é pintar o
 * trecho. Para o leitor de tela nada muda — um `<span>` colorido no meio de um
 * cabeçalho não parte o nome acessível dele. É a mesma `<Chave>` da /sobre e
 * da /celulas, com uma opção a mais.
 *
 * A OPÇÃO A MAIS é o `curso`. Sem ele a chave é roxa: `grape` no claro (6.9:1
 * sobre bone) e `grape-light` no escuro (9.6:1 sobre plum-deep) — cada um só
 * passa em contraste na sua metade do par, e inverter os dois publica uma
 * palavra ilegível. Com ele a chave assume a tinta do curso, que já tem as
 * duas variantes resolvidas no `COR` do `lib/trilho.ts` pelo mesmo motivo.
 */
function Chave({
  t,
  escuro = false,
  curso,
}: {
  t: Manchete;
  escuro?: boolean;
  curso?: Cor;
}) {
  const cor = curso
    ? escuro
      ? COR[curso].sobreEscuro
      : COR[curso].texto
    : escuro
      ? "text-grape-light"
      : "text-grape";

  return (
    <>
      {t.antes}
      <span className={cor}>{t.forte}</span>
      {t.depois}
      {/* O segundo trecho pintado só existe na manchete do herói, e o `&&`
          é o que mantém as outras oito com uma mancha só: sem `forteFim` no
          `lib/`, nada disto chega ao DOM. Ver `Manchete` no `lib/trilho.ts`. */}
      {t.forteFim && <span className={cor}>{t.forteFim}</span>}
      {t.fim}
    </>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * O SISTEMA DESTA PÁGINA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * O Trilho tem SETE etapas e a copy de todas elas é longa. O problema desta
 * página, portanto, não é falta de conteúdo — é hierarquia. Ela foi desenhada
 * em cima de uma decisão só: as sete etapas NÃO valem a mesma coisa na tela.
 *
 *   fundamentos (Encontro, Consolidação, Águas, Batismo) → compactos, juntos
 *   formação (CME, CTL, Seminário)                       → o destaque da página
 *   complementares (Família, Ministérios)                → depois, com casa própria
 *
 * NUMERAÇÃO. As sete etapas são UMA sequência só, e a página conta: 1º a 4º
 * nos primeiros passos, 5º a 7º nos três cursos. O ordinal vai SEMPRE na frente
 * do título, nunca em cima de um círculo, de um fio ou de uma seta — os cursos
 * mantêm o numeral grande que já tinham, com o número da contagem geral no
 * lugar do antigo 01/02/03. Continua não sendo uma linha do tempo vertical:
 * quem separa um bloco do outro é a superfície e o espaço, como no resto do
 * site; o número só diz em que ponto da caminhada a pessoa está.
 *
 * RITMO. As seções não têm a mesma altura, e é isso que dá o compasso:
 *
 *   hero bone (alto) → visão sand (baixa) → primeiros passos bone (média)
 *   → 5º sand → 6º bone → 7º plum-deep
 *   → família bone (média) → ministérios sand (média)
 *   → CTA plum-deep (curta), fechando a página contra o rodapé
 *
 * Os três cursos são onde se gasta espaço vertical (py-28/36); tudo o mais é
 * mais baixo do que o instinto pede.
 *
 * ⚠️ DUAS SEÇÕES SAÍRAM daqui por serem eco: a faixa lilás "Crescer. Liderar.
 * Multiplicar.", que anunciava os três cursos logo antes de os três cursos
 * aparecerem, e o índice "Todo o Trilho", que repetia as sete etapas no fim.
 * Com a numeração, a ordem que essas duas seções tentavam explicar já está
 * escrita no título de cada etapa. As duas levaram junto o `TRANSICAO` e o
 * `TRILHO_INTEIRO` do `lib/trilho.ts`; a única coisa perdida foi a linha curta
 * de cada etapa no índice ("Experimente o amor e a graça de Deus."), que estava
 * lá e não está em mais lugar nenhum — se ela voltar, volta como subtítulo da
 * etapa, não como lista.
 *
 * TIPOGRAFIA. MANROPE em tudo, como no resto do site: manchete pelo token
 * `--font-display`, texto corrido pelo `--font-body`, e os dois valem a mesma
 * família. Todo `.font-display` daqui — títulos, subtítulos, numerais — troca
 * de uma vez se o token trocar, que é o motivo de nenhum deles nomear fonte.
 * (Até 22/08/2026 a manchete era Poppins, pela classe `manchetes-poppins` no
 * <div> raiz; a classe saiu quando a Manrope virou a família única.) Sem
 * itálico colorido dentro das manchetes: foi pedido que os títulos fossem
 * literais ("Primeiros passos", "Maturidade no Espírito") e que a personalidade
 * viesse do desenho, não da frase — e a Manrope é só romana, então itálico aqui
 * dentro nem existe.
 *
 * COR NAS MANCHETES. Cada seção tem UM título e cada título tem um trecho
 * pintado — o resto fica na cor do texto. É o contraste da casa: roxo (`grape`
 * no claro, `grape-light` no escuro), pintado pela `<Chave>` logo acima, com o
 * corte da frase morando no `lib/trilho.ts`.
 *
 * A EXCEÇÃO É O HERÓI, a pedido: ele pinta dois trechos ("jornada" e
 * "propósito de Deus"), que é o máximo que uma manchete aguenta e só porque os
 * dois estão distantes um do outro na frase. Nenhum outro título do site faz
 * isso, e a mecânica (`forteFim`) está documentada no `lib/` para não virar
 * hábito.
 *
 * NOS TRÊS BLOCOS DE CURSO A CHAVE NÃO É ROXA: é a tinta do curso, a mesma do
 * numeral e do filete. Ali a manchete divide o bloco com a arte oficial —
 * verde, azul-marinho e laranja — e uma palavra roxa ao lado dela é o que a
 * exceção documentada no `globals.css` existe para evitar. As três tintas são
 * exceção nomeada, para esta rota só, e nenhuma delas pinta fundo de seção.
 *
 * O QUE FICA PRETO, de propósito: "Nossa missão", o fecho da visão, os nomes
 * das quatro primeiras etapas e os quatro cursos da Escola da Família. Todos
 * moram dentro de uma seção cuja manchete já está pintada, e uma segunda mancha
 * na mesma faixa faz o olho parar na tinta em vez de ler.
 *
 * TEXTO. Tudo sai da copy da igreja; o que foi cortado, foi cortado. O texto
 * completo dos três cursos está preservado em `lib/trilho.ts`.
 */
export default function TrilhoDoVencedor() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ 01 · HERO ══════════════════════════════════════════════════════
          Fundo claro, e não a capa-cartão da Home nem a faixa escura do
          Kids: os três blocos de curso mais abaixo é que são o peso desta
          página, e um herói escuro de tela cheia roubaria essa posição.

          A composição é uma grade de duas colunas — texto à esquerda, uma foto
          em retrato à direita. A foto é o ensino no Encontro com Deus, que é
          onde o Trilho começa: a página abre já mostrando a primeira etapa em
          vez de uma ilustração de caminho. */}
      <section className="overflow-hidden bg-bone pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {HERO.eyebrow}
                </span>
              </Reveal>

              <Reveal variant="blur" delay={90}>
                <h1 className="font-display mt-6 max-w-2xl text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.02] text-foreground">
                  <Chave t={HERO.titulo} />
                </h1>
              </Reveal>

              <Reveal delay={170}>
                <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {HERO.texto}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <MagneticButton>
                    <Link
                      href="/contato"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum-deep px-8 py-4 text-sm font-semibold text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95 sm:w-auto"
                    >
                      Comece sua jornada
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </MagneticButton>
                  {/* Âncora, não rota: "Conheça o Trilho" leva ao começo do
                      conteúdo na mesma página. O `scroll-mt` da seção-alvo é
                      que impede o header fixo de cobrir o título ao chegar. */}
                  <Link
                    href="#primeiros-passos"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/15 px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/[0.04] active:scale-95 sm:w-auto"
                  >
                    Conheça o Trilho
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={160}>
              {/* Proporção FIXA e igual à do arquivo (1222×1154) em todas as
                  larguras. Aqui não vale o jogo de recortes que uma fotografia
                  aceita — é arte com tipografia até as bordas, e todo recorte
                  que não seja o dela apara letra. Se um dia entrar uma foto no
                  lugar, aí sim volta a variar: retrato nas pontas, deitada na
                  faixa do meio, onde um 4:5 numa coluna única vira paredão. */}
              <MolduraFoto
                foto={HERO.foto}
                sizes="(min-width: 1024px) 46vw, 92vw"
                eager
                className="aspect-[1222/1154] w-full rounded-[1.75rem] lg:rounded-[2.25rem]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 02 · NOSSA VISÃO ═══════════════════════════════════════════════
          Faixa baixa, quase só tipografia. A frase da visão É o elemento
          gráfico — ela não vira quatro cards de "Ganhar / Consolidar / Treinar
          / Enviar", e também não se repete embaixo em versão pontilhada: o
          título já diz as quatro palavras, e dizê-las de novo logo abaixo seria
          eco, não ênfase. */}
      <section className="overflow-hidden bg-sand py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto grid gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20 lg:px-12">
          <Reveal variant="left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {VISAO.eyebrow}
            </span>
            <h2 className="font-display mt-5 max-w-md text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.08] text-foreground">
              <Chave t={VISAO.titulo} />
            </h2>
          </Reveal>

          <Reveal variant="right" delay={110}>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              {VISAO.texto}
            </p>
            <p className="font-display mt-7 max-w-md text-[clamp(1.2rem,2.2vw,1.5rem)] leading-[1.35] text-foreground">
              {VISAO.fecho}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ 03 · PRIMEIROS PASSOS ══════════════════════════════════════════
          Os quatro fundamentos numa seção só, e compacta — não quatro seções.

          A HIERARQUIA DENTRO DA SEÇÃO é o assunto aqui. O Encontro com Deus é a
          entrada do Trilho, então ele fica numa faixa própria, com foto e corpo
          maior; Consolidação, Curso das Águas e Batismo dividem uma linha de
          três colunas logo abaixo, separadas por filete e espaço — sem cartão
          e sem sombra.

          O ORDINAL (1º a 4º) fica na cor do texto de apoio, e não na do
          título: ele numera a etapa sem disputar com o nome dela, que continua
          sendo a primeira coisa que se lê. Nos três cursos lá embaixo o mesmo
          número aparece grande e colorido — lá ele é o elemento gráfico do
          bloco, aqui é só a posição na fila.

          No celular a linha de três vira uma coluna e cada item mantém o filete
          em cima, que passa a funcionar como separador horizontal. */}
      <section
        id="primeiros-passos"
        className="scroll-mt-16 overflow-hidden bg-bone py-20 sm:py-24 lg:py-28 sm:scroll-mt-20"
      >
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="font-display max-w-xl text-[clamp(2rem,4.4vw,3.2rem)] font-medium leading-[1.05] text-foreground">
              <Chave t={PRIMEIROS_PASSOS.titulo} />
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {PRIMEIROS_PASSOS.intro}
            </p>
          </Reveal>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal variant="left">
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-medium leading-tight text-foreground">
                <span className="text-muted-foreground">
                  {PRIMEIROS_PASSOS.entrada.n}
                </span>{" "}
                {PRIMEIROS_PASSOS.entrada.titulo}
              </h3>
              <span
                aria-hidden
                className="mt-5 block h-px w-16 bg-foreground/25"
              />
              <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                {PRIMEIROS_PASSOS.entrada.texto}
              </p>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <MolduraFoto
                foto={PRIMEIROS_PASSOS.entrada.foto}
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="aspect-[16/10] w-full rounded-[1.5rem] lg:rounded-[1.75rem]"
              />
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-3 lg:mt-20 lg:gap-x-16">
            {PRIMEIROS_PASSOS.demais.map((passo, i) => (
              <Reveal key={passo.titulo} delay={i * 90}>
                <div className="border-t border-border pt-7">
                  <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-medium leading-tight text-foreground">
                    <span className="text-muted-foreground">{passo.n}</span>{" "}
                    {passo.titulo}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {passo.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 04–06 · CME, CTL E SEMINÁRIO ═══════════════════════════════════
          O destaque da página: três blocos grandes, um sistema só.

          O QUE É IGUAL nos três (é o que faz deles uma família): a mesma grade
          de duas colunas, o mesmo numeral em display, o mesmo filete de 3px, a
          mesma escala de título, o mesmo desenho de CTA e — porque as artes
          foram exportadas todas em 4:3 — exatamente o mesmo retângulo de
          imagem. Nada disso muda de bloco para bloco.

          O QUE CRIA O RITMO: a alternância esquerda/direita, o degrau de fundo
          (sand → bone → plum-deep) e a cor do acento. O terceiro bloco é escuro
          de propósito: ele fecha a formação principal.

          O numeral grande é o 5º/6º/7º da contagem da página inteira — a mesma
          que começa em "1º Encontro com Deus" lá em cima. Era 01/02/03 quando
          os cursos se contavam sozinhos.

          NO CELULAR a alternância morre. Os três empilham na mesma ordem —
          numeral, título, texto, arte — porque inverter a ordem de leitura numa
          coluna só não cria ritmo nenhum, só confunde. É a mesma decisão das
          etapas do /radicais-kids.

          ⚠️ O CTA DE CADA CURSO leva ao /contato, não a uma página do curso:
          elas não existem. O rótulo diz o que o link faz de verdade ("Falar
          sobre o CME") em vez de prometer uma página que não vai abrir. Ele é
          discreto de propósito — quem tem que ter presença é o "Quero começar o
          Trilho" lá embaixo. O texto completo de cada curso está guardado em
          `lib/trilho.ts`, esperando essas páginas. */}
      {FORMACOES.map((curso, i) => {
        const escura = curso.superficie === "escura";
        const invertida = i % 2 === 1;

        return (
          <section
            key={curso.n}
            className={`overflow-hidden py-24 sm:py-28 lg:py-36 ${
              escura
                ? "bg-plum-deep"
                : curso.superficie === "sand"
                  ? "bg-sand"
                  : "bg-bone"
            }`}
          >
            {/* ⚠️ O TEMPLATE DA GRADE VIRA JUNTO COM A ORDEM, e não é frescura:
                a coluna da arte é sempre a de `1.1fr`. Sem inverter o
                template, o bloco do meio jogaria a arte na coluna de `0.9fr` e
                ela sairia menor que a do CME e a do Seminário — o "mesma
                escala de imagem nos três" morre exatamente aí, e é o tipo de
                diferença que se vê sem medir. */}
            <div
              className={`container mx-auto grid items-center gap-12 px-5 sm:px-8 lg:gap-20 lg:px-12 ${
                invertida ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
              }`}
            >
              <Reveal
                variant={invertida ? "right" : "left"}
                className={invertida ? "lg:order-2" : ""}
              >
                <span
                  className={`font-display block text-[clamp(3rem,7.5vw,5rem)] font-medium leading-[0.85] ${
                    escura ? COR[curso.cor].sobreEscuro : COR[curso.cor].texto
                  }`}
                >
                  {curso.n}
                </span>
                <h2
                  className={`font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-medium leading-[1.05] ${
                    escura ? "text-white" : "text-foreground"
                  }`}
                >
                  <Chave t={curso.titulo} escuro={escura} curso={curso.cor} />
                </h2>
                <span
                  aria-hidden
                  className={`mt-6 block h-[3px] w-14 rounded-full ${COR[curso.cor].fundo}`}
                />
                <p
                  className={`mt-7 max-w-lg leading-relaxed ${
                    escura ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {curso.resumo}
                </p>

                <Link
                  href={curso.href}
                  className={`group mt-9 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    escura
                      ? "text-white/85 hover:text-white"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {curso.hrefRotulo}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>

              {/* A arte é a protagonista do bloco. A sombra existe só na
                  superfície clara — no `plum-deep` ela não teria o que separar,
                  e no lugar dela vai um fio branco de 1px para a arte não
                  encostar no fundo escuro sem borda nenhuma. */}
              <Reveal
                variant="scale"
                delay={130}
                className={invertida ? "lg:order-1" : ""}
              >
                <MolduraFoto
                  foto={curso.arte}
                  tom={escura ? "escuro" : "claro"}
                  sizes="(min-width: 1024px) 54vw, 92vw"
                  className={`aspect-[4/3] w-full rounded-[1.5rem] lg:rounded-[2rem] ${
                    escura
                      ? "ring-1 ring-white/10"
                      : "shadow-[0_28px_64px_-36px_rgba(28,21,35,0.5)]"
                  }`}
                />
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ═══ 07 · ESCOLA DA FAMÍLIA ═════════════════════════════════════════
          Área complementar, e o desenho diz isso: nada de foto, nada de card —
          uma grade 2x2 de tipografia com filete em cima de cada célula. É a
          mesma gramática da linha de três dos primeiros passos, o que faz as
          duas seções lerem como "conteúdo de apoio" sem precisar de rótulo. */}
      <section className="overflow-hidden bg-bone py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <Reveal variant="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {ESCOLA_FAMILIA.eyebrow}
              </span>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-medium leading-[1.05] text-foreground">
                <Chave t={ESCOLA_FAMILIA.titulo} />
              </h2>
              <p className="font-display mt-4 text-[clamp(1.15rem,2.2vw,1.45rem)] leading-[1.35] text-muted-foreground">
                {ESCOLA_FAMILIA.subtitulo}
              </p>
            </Reveal>

            <Reveal variant="right" delay={110}>
              <p className="max-w-xl leading-relaxed text-muted-foreground">
                {ESCOLA_FAMILIA.intro}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-14 sm:grid-cols-2 lg:gap-x-20">
            {ESCOLA_FAMILIA.cursos.map((curso, i) => (
              <Reveal key={curso.nome} delay={(i % 2) * 80}>
                <div className="border-t border-border py-7 sm:py-8">
                  <h3 className="font-display text-[1.4rem] font-medium leading-tight text-foreground">
                    {curso.nome}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {curso.texto}
                  </p>
                </div>
              </Reveal>
            ))}
            <div aria-hidden className="border-t border-border sm:col-span-2" />
          </div>
        </div>
      </section>

      {/* ═══ 08 · ESCOLA VIDEIRA DE MINISTÉRIOS ═════════════════════════════
          A seção tem história, e a história é feita de duas datas — então são
          elas que carregam o peso tipográfico, em vez de um parágrafo corrido
          contando tudo. 1999 e 2012 ficam em display, do tamanho de um título,
          com uma linha de texto cada.

          O logo oficial entra em cima, na versão azul (fundo claro). A versão
          branca existe no `material/` para o dia em que esta seção for para uma
          faixa escura — hoje ela é `sand` porque o CTA logo abaixo já é
          `plum-deep`, e duas faixas escuras coladas apagariam a divisa. */}
      <section className="overflow-hidden bg-sand py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
            <Reveal variant="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {ESCOLA_MINISTERIOS.eyebrow}
              </span>
              <h2 className="font-display mt-5 max-w-lg text-[clamp(2rem,4.4vw,3.2rem)] font-medium leading-[1.05] text-foreground">
                <Chave t={ESCOLA_MINISTERIOS.titulo} />
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                {ESCOLA_MINISTERIOS.intro}
              </p>
            </Reveal>

            <Reveal variant="right" delay={110}>
              <Image
                src={ESCOLA_MINISTERIOS.logo.src}
                alt={ESCOLA_MINISTERIOS.logo.alt}
                width={ESCOLA_MINISTERIOS.logo.largura}
                height={ESCOLA_MINISTERIOS.logo.altura}
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="h-auto w-[200px] sm:w-[240px] lg:w-full lg:max-w-[320px]"
              />
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:gap-x-20">
            {ESCOLA_MINISTERIOS.marcos.map((marco, i) => (
              <Reveal key={marco.ano} delay={i * 100}>
                <div className="border-t border-foreground/15 pt-7">
                  <span className="font-display block text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-[0.9] text-grape">
                    {marco.ano}
                  </span>
                  <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                    {marco.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-foreground/15 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pt-14">
            <Reveal variant="left">
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-medium leading-tight text-foreground">
                {ESCOLA_MINISTERIOS.missao.titulo}
              </h3>
            </Reveal>
            <Reveal variant="right" delay={110}>
              <p className="font-display max-w-lg text-[clamp(1.25rem,2.3vw,1.6rem)] leading-[1.35] text-foreground">
                {ESCOLA_MINISTERIOS.missao.lead}
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                {ESCOLA_MINISTERIOS.missao.texto}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 09 · CTA ═══════════════════════════════════════════════════════
          O CTA mais importante da página, e o único botão cheio depois do
          herói: os links dos cursos são de texto justamente para que este fique
          sozinho na categoria "botão". Faixa escura, curta, centralizada.

          ELE É A ÚLTIMA SEÇÃO DA PÁGINA, como em todas as outras do site: a
          faixa escura fecha o conteúdo e emenda no rodapé, que é `plum-deep`
          também. A divisa que importa é a de cima — `sand` da Escola de
          Ministérios contra o escuro daqui — e ela se resolve sozinha na troca
          de tinta, sem fio nem moldura. */}
      <section className="bg-plum-deep py-24 text-center sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            {/* `text-balance` porque a frase é centralizada: sem ele o
                navegador quebra depois de "começa" e deixa "aqui." sozinho na
                segunda linha. */}
            <h2 className="font-display mx-auto max-w-2xl text-balance text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.1] text-white">
              <Chave t={FECHO.titulo} escuro />
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
              {FECHO.texto}
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className="mt-10 flex justify-center">
              <MagneticButton>
                <Link
                  href={FECHO.href}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-bone px-9 py-4.5 text-base font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95"
                >
                  {FECHO.botao}
                  <ArrowRight
                    size={18}
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
