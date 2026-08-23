import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { MolduraFoto } from "@/components/MolduraFoto";
import { Acordeao } from "@/components/sobre/Acordeao";
import type { Manchete } from "@/lib/sobre";
import {
  CELULAS,
  CREMOS,
  ENCARGO,
  FECHO,
  HERO,
  HISTORIA,
  INDAIATUBA,
  LIDERANCA,
  VALORES,
  VISAO,
} from "@/lib/sobre";

export const metadata: Metadata = {
  title: "Sobre — Igreja Videira Indaiatuba",
  description:
    "A história da Igreja Videira, de Goiânia em 1999 a Indaiatuba em 2013, nossa visão, nossos valores, no que cremos e quem lidera a Videira Indaiatuba.",
};

/**
 * A palavra-chave em roxo dentro de uma manchete.
 *
 * Vai DENTRO do `<h1>`/`<h2>`, não no lugar dele: assim cada título mantém as
 * próprias classes de escala e quebra, e o único trabalho daqui é pintar o
 * trecho. Para o leitor de tela nada muda — um `<span>` colorido no meio de um
 * cabeçalho não parte o nome acessível dele.
 *
 * `escuro` troca o `grape` (6.9:1 sobre bone) pelo `grape-light` (9.6:1 sobre
 * plum-deep). Cada um só passa em contraste na sua metade do par: inverter os
 * dois publica uma palavra-chave ilegível — é a mesma armadilha do
 * `seminario`/`seminario-claro` do /trilho-do-vencedor.
 */
function Chave({ t, escuro = false }: { t: Manchete; escuro?: boolean }) {
  return (
    <>
      {t.antes}
      <span className={escuro ? "text-grape-light" : "text-grape"}>
        {t.forte}
      </span>
      {t.depois}
    </>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * O SISTEMA DESTA PÁGINA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Página institucional, e o risco de uma página institucional é conhecido:
 * título, parágrafo, card, título, parágrafo, card, até o fim. Esta foi
 * desenhada contra isso. Nenhuma das nove seções repete a composição da
 * anterior, e é essa troca de forma — não uma faixa decorativa entre elas —
 * que separa uma da outra.
 *
 * A NARRATIVA, que precisa ser legível só rolando, sem ler:
 *
 *   1 esta é a nossa comunidade   → foto da igreja inteira, larga
 *   2 é daqui que viemos          → texto + colagem de arquivo
 *   3 a história chegou aqui      → faixa escura, foto da fachada
 *   4 é esta a visão              → tipografia grande, quase nada além dela
 *   5 é assim que vivemos igreja  → texto + par de fotos + quatro pilares
 *   6 são estes os valores        → grade editorial de seis, só filete
 *   7 é esta a fé                 → acordeão, muito espaço vazio
 *   8 são estas as pessoas        → retrato grande + família sobreposta
 *   9 agora entra você            → faixa escura partida ao meio com foto
 *
 * RITMO DE SUPERFÍCIE. bone → sand → escura → bone → sand → bone → sand →
 * bone → escura. As duas faixas escuras são os dois pontos de virada da
 * narrativa (a chegada a Indaiatuba e o convite), e são as únicas.
 *
 * ALTURA. As seções NÃO têm a mesma altura de propósito: a visão é a que mais
 * respira (py-36) porque lá o vazio é o desenho, a faixa da fachada é
 * cinematográfica (70–78svh), e valores e acordeão são os mais compactos
 * (py-32) porque são os dois trechos de lista. Sem essa diferença a página
 * vira uma régua.
 *
 * ONDE O ROXO ENTRA, e a regra é de contagem: UM TRECHO POR MANCHETE, mais o
 * eyebrow. Cada seção tem o título com uma palavra-chave em roxo (`grape` no
 * claro, `grape-light` no escuro) — quem pinta é a `<Chave>` logo abaixo, e o
 * corte de cada frase mora no `lib/sobre.ts`, onde `antes + forte + depois`
 * remontam a frase exata da fonte. Fora isso, roxo só no numeral dos valores,
 * no botão do acordeão aberto e nos filetes.
 *
 * A FRASE DA VISÃO segue a mesma contagem, à sua maneira: ela não tem `<h2>`
 * separado (a frase É a manchete) e leva UM destaque só, no miolo, em roxo e
 * itálico ao mesmo tempo. Ver o comentário do `ENCARGO`.
 *
 * ⚠️ NENHUMA SEÇÃO É PINTADA DE ROXO, e nenhuma manchete leva dois destaques.
 * Duas manchas de cor no mesmo título fariam o olho parar na tinta em vez de
 * na palavra, que é o oposto do que o destaque existe para fazer.
 *
 * TIPOGRAFIA. Padrão do site, sem exceção nenhuma: manchete e corpo saem dos
 * tokens `--font-display` e `--font-body` do `globals.css`, que valem Manrope
 * nos dois. Esta página já foi a única do site a trocar de fonte no <div>
 * raiz (Poppins, pela classe `manchetes-poppins`); a classe saiu em 22/08/2026,
 * quando a Manrope virou a família única. Sem itálico em lugar nenhum — a
 * Manrope é só romana, e o destaque desta página sempre foi de cor.
 *
 * E POR ISSO AS MANCHETES NÃO USAM `clamp(...vw...)` COMO O RESTO DO SITE.
 * O `container` do Tailwind não cresce liso: ele TRAVA numa largura fixa e só
 * pula no breakpoint seguinte (1024px de container de `lg` até 1279px, 1280 de
 * `xl` até 1535). Uma fonte em `vw` continua crescendo dentro desse degrau, e
 * às 1279px ela estava 25% maior do que às 1024 com EXATAMENTE a mesma
 * largura de coluna para caber. Era aí que a manchete estourava — não no
 * celular, não no monitor grande, mas na tela de notebook.
 *
 * Os tamanhos daqui pulam nos MESMOS breakpoints do container, então a razão
 * corpo/medida nunca desanda no meio de um degrau. Foram medidos no navegador,
 * um por um: toda manchete de seção fecha em duas linhas de 1024 a 1600px, o
 * h1 fecha em três, e nenhuma termina com palavra sozinha. As medidas foram
 * fechadas na Poppins e sobreviveram à Manrope, que é mais ESTREITA no mesmo
 * corpo — o risco da troca era manchete estourando, e ela ganhou folga. O
 * `text-wrap: balance` do `.font-display` é a rede de segurança. Mexer num
 * tamanho aqui é mexer numa quebra — vale remedir.
 *
 * FOTOGRAFIA. Nove fotos, todas reais e da própria Videira, todas pela
 * `<MolduraFoto>` (que desenha o espaço com o caminho do arquivo se ele
 * sumir). Nenhuma imagem de banco: é decisão da casa, e aqui ela é o assunto —
 * a página inteira existe para dizer que a igreja é feita destas pessoas.
 *
 * TEXTO. Tudo sai do briefing oficial. As duas frases que foram podadas, e
 * por quê, estão no cabeçalho de `lib/sobre.ts`.
 */
export default function Sobre() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ 01 · HERO ══════════════════════════════════════════════════════
          UMA COMPOSIÇÃO SÓ, NÃO TRÊS BLOCOS. A capa anterior abria em duas
          colunas (manchete à esquerda, três parágrafos e dois botões à
          direita) e punha a fotografia embaixo, como ilustração do que o texto
          já tinha dito. Eram três peças disputando a primeira tela, e a foto
          — que é o argumento inteiro desta página — chegava em terceiro.

          Agora a ordem é: manchete, comunidade, quem somos, ação. A fotografia
          ocupa a maior parte da tela e o texto institucional inteiro cabe num
          cartão sobre ela. Duas frases da capa antiga viraram uma; a terceira
          saiu da página e está registrada no cabeçalho de `lib/sobre.ts`.

          A ALTURA É `100svh` MENOS O HEADER, e é `svh` e não `vh` de
          propósito: no celular o `vh` conta a barra do navegador que se
          esconde ao rolar, então uma capa em `100vh` nasce mais alta que a
          tela e empurra o cartão para fora. `svh` mede a viewport com as
          barras VISÍVEIS, que é o estado em que a página é vista ao abrir. O
          desconto (4rem/5rem) é o `pt` que o <main> reserva para a barra fixa
          — se a altura da nav mudar em `components/Header.tsx`, muda aqui.

          É `min-h` e não `h`: em tela baixa e larga a capa cresce em vez de
          espremer a fotografia até virar uma tarja.

          A FOTOGRAFIA CRESCE COM A SOBRA (`flex-1`), em vez de ter proporção
          fixa. É ela que absorve a diferença entre um notebook de 720px de
          altura e um monitor de 1200 — se a proporção fosse fixa, ou sobrava
          fundo bone embaixo, ou a capa passava da tela. O `min-h` dela é o
          piso onde o recorte ainda mostra a multidão inteira. */}
      <section className="flex min-h-[calc(100svh-4rem)] flex-col bg-bone pt-8 pb-10 sm:min-h-[calc(100svh-5rem)] sm:pt-10 lg:pt-12 lg:pb-12">
        <div className="container mx-auto flex flex-1 flex-col px-5 sm:px-8 lg:px-12">
          {/* A LINHA EDITORIAL. O eyebrow de um lado e a datação do outro, na
              mesma linha de base: é a assinatura de uma página de revista, e é
              o que diz que esta capa não é uma landing page. A legenda some
              abaixo de `sm` — em 390px ela e o eyebrow não cabem na mesma
              linha, e empilhar duas tarjas em caixa alta viraria cabeçalho de
              formulário. */}
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                {HERO.eyebrow}
              </span>
              <span className="hidden items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex">
                <span aria-hidden className="h-px w-8 bg-grape/40" />
                {HERO.legenda}
              </span>
            </div>
          </Reveal>

          {/* A manchete é a maior tipografia do site e para em ~60% da largura
              no desktop (`max-w-[16ch]` chega nisso sozinho, porque o `ch`
              acompanha a Poppins). O que sobra à direita é espaço vazio de
              propósito: é ele que faz a manchete parecer grande. */}
          <Reveal variant="blur" delay={90}>
            <h1 className="font-display mt-6 max-w-[18ch] text-[2.75rem] font-medium leading-[0.98] text-foreground sm:mt-7 sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4.75rem]">
              <Chave t={HERO.titulo} />
            </h1>
          </Reveal>

          {/* `min-h-0` NOS DOIS EMBRULHOS não é enfeite: um item flex tem
              `min-height: auto` por padrão e se recusa a encolher abaixo do
              conteúdo. Sem isso a fotografia estica a coluna e a capa passa da
              tela em vez de caber nela. */}
          <Reveal
            variant="fade"
            delay={150}
            className="mt-8 flex min-h-0 flex-1 flex-col sm:mt-10"
          >
            <figure className="relative flex min-h-0 flex-1 flex-col">
              {/* O RECORTE É ANCORADO NO PÉ DA FOTO (`50% 100%`), e essa é a
                  única regra que funciona aqui em qualquer altura de tela. O
                  arquivo é 1.94:1 e o quadro é sempre mais largo que isso, então
                  `object-cover` corta na vertical. Centrado, ele come as duas
                  pontas — e embaixo está a fileira de pessoas sentadas na grama,
                  além da própria grama onde o cartão pousa. Preso no pé, o que
                  sai é só copa de árvore: quanto mais baixa a janela, mais
                  árvore some e mais a multidão domina o quadro. */}
              {/* `capa-afasta` (globals.css) é a única animação da capa: a
                  fotografia entra 6% maior e recua para o tamanho dela em pouco
                  mais de um segundo. Quem se move é a IMAGEM dentro da moldura,
                  não a moldura — o quadro fica parado e o conteúdo se afasta.
                  Toca em todo aparelho: o site não consulta mais
                  `prefers-reduced-motion` (ver o topo do globals.css). */}
              <MolduraFoto
                foto={HERO.foto}
                eager
                sizes="(min-width: 640px) 92vw, 100vw"
                posicao="50% 100%"
                className="capa-afasta aspect-[16/10] w-full rounded-[1.25rem] sm:aspect-auto sm:min-h-[18rem] sm:flex-1 sm:rounded-[1.75rem] lg:min-h-[20rem] lg:rounded-[2.25rem]"
              />

              {/* O CARTÃO. Flutua sobre a foto só a partir de `lg` — e na quina
                  de baixo à ESQUERDA, que é onde o recorte deixa grama: à
                  direita as pessoas vão até a borda do quadro e o cartão
                  pousaria em cima delas. Mesmo à esquerda ele cobre corpos, não
                  rostos, que estão acima da faixa que ele ocupa.

                  Abaixo de `lg` ele desce para o fluxo, embaixo da fotografia:
                  em 900px de largura um cartão legível já toma metade do
                  quadro, e aí não há quina que não cubra gente.

                  O `bg-bone/95` com desfoque é o mesmo material da barra do
                  topo — sem sombra pesada, como pedido. */}
              <div className="mt-4 sm:mt-5 lg:absolute lg:bottom-5 lg:left-5 lg:mt-0 lg:w-[30%] lg:max-w-[22rem] xl:bottom-6 xl:left-6">
                <div className="rounded-[1.25rem] border border-foreground/[0.06] bg-bone/95 p-6 backdrop-blur-md lg:rounded-[1.5rem] lg:p-5 xl:p-6">
                  <p className="font-display text-[1.1rem] font-medium leading-tight text-foreground">
                    {HERO.cartao.titulo}
                  </p>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground lg:text-[0.875rem]">
                    {HERO.cartao.texto}
                  </p>
                  <Link
                    href="#nossa-historia"
                    className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-plum-deep transition-colors duration-300 hover:text-plum"
                  >
                    {HERO.cartao.acao}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ═══ 02 · NOSSA HISTÓRIA ════════════════════════════════════════════
          Duas colunas: o texto de um lado, do outro uma colagem que parece
          arquivo de igreja — a foto do letreiro original maior, e por cima da
          quina de baixo dela duas menores em degrau: a reunião dos primeiros
          anos e a arena de hoje.

          NÃO HÁ LINHA DO TEMPO, e foi decisão consciente: os dois marcos da
          história são 1999 e 2013, e cada um já tem o peso de uma seção
          inteira (esta e a próxima). Um friso "1999 → 2013 → Hoje" por cima
          disso seria dizer três vezes a mesma coisa e transformar a seção num
          infográfico, que era exatamente o que o briefing pedia para evitar.

          A ARENA DE HOJE É A TERCEIRA FOTO DA COLAGEM, e não um segundo
          movimento com frase própria embaixo: a sala com vinte pessoas e o
          auditório lotado dizem "é a mesma igreja" MELHOR encostados um no
          outro do que separados por uma linha de texto. */}
      <section
        id="nossa-historia"
        className="scroll-mt-16 overflow-hidden bg-sand py-20 sm:scroll-mt-20 sm:py-24 lg:py-32"
      >
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal variant="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                {HISTORIA.eyebrow}
              </span>
              <h2 className="font-display mt-5 max-w-lg text-[2rem] sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem] font-medium leading-[1.05] text-foreground">
                <Chave t={HISTORIA.titulo} />
              </h2>
              {HISTORIA.paragrafos.map((p, i) => (
                <p
                  key={i}
                  className="mt-6 max-w-md leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal variant="right" delay={120}>
              {/* A COLAGEM NÃO USA `absolute`, e isso é deliberado. A
                  `<MolduraFoto>` já desenha a própria `<div>` com `relative`, e
                  `relative` e `absolute` disputam a MESMA propriedade — quem
                  vence é a ordem das regras no CSS, não a ordem das classes
                  escritas aqui. Quem posicionava tinha que ser um embrulho, e
                  com TRÊS fotos isso virava três embrulhos com percentuais
                  amarrados na mão.

                  Aqui a fileira de baixo está no fluxo e sobe por cima da foto
                  grande com margem negativa. Margem em % resolve contra a
                  LARGURA do bloco (não a altura), então o encaixe é o mesmo em
                  qualquer viewport: a fileira sobe 10% da largura, a foto do
                  arquivo entra por baixo da quina da grande e a arena desce
                  mais 8% para as duas não ficarem alinhadas como um par.

                  A foto grande é 3/2 e não 4/3 porque o arquivo é 1.44:1 — em
                  4/3 o corte comia a palavra "Videira" do letreiro, que é
                  metade do que essa foto tem para dizer. */}
              <figure className="relative">
                <MolduraFoto
                  foto={HISTORIA.fotoPrincipal}
                  sizes="(min-width: 1024px) 56vw, 92vw"
                  className="aspect-[3/2] w-full rounded-[1.5rem] lg:rounded-[1.75rem]"
                />

                {/* O anel na cor da faixa (`sand`) é o que separa uma foto da
                    outra; sem ele as bordas se dissolvem uma na outra. */}
                <div className="-mt-[10%] flex items-start gap-4 pl-5 sm:gap-6 sm:pl-8">
                  <MolduraFoto
                    foto={HISTORIA.fotoSobreposta}
                    sizes="(min-width: 1024px) 19vw, 33vw"
                    className="aspect-[4/3] w-[34%] rounded-[1.1rem] ring-[6px] ring-sand lg:rounded-[1.25rem] lg:ring-[8px]"
                  />

                  <figure className="mt-[8%] w-[46%]">
                    <MolduraFoto
                      foto={HISTORIA.fotoArena}
                      sizes="(min-width: 1024px) 26vw, 44vw"
                      className="aspect-[16/9] w-full rounded-[1.1rem] ring-[6px] ring-sand lg:rounded-[1.25rem] lg:ring-[8px]"
                    />
                    <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {HISTORIA.legendaArena}
                    </figcaption>
                  </figure>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 03 · A CHEGADA A INDAIATUBA ════════════════════════════════════
          A primeira das duas viradas da página, e o primeiro respiro escuro.
          É a única seção em que o texto pousa SOBRE a fotografia, e ela foi
          escolhida para isso: a fachada à noite já é escura e quase
          monocromática, então o véu que garante a leitura é leve — a foto não
          vira um borrão preto com letra em cima.

          O texto fica embaixo, não no meio: o letreiro iluminado mora na metade
          de cima do quadro e é ele que diz "Indaiatuba" antes de qualquer
          palavra. Cobri-lo com a manchete seria apagar o argumento da foto.

          `100vw` no `sizes` porque a imagem sangra de borda a borda. */}
      <section className="relative isolate overflow-hidden bg-plum-deep">
        <Image
          src={INDAIATUBA.foto.src}
          alt={INDAIATUBA.foto.alt}
          fill
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-center"
        />
        {/* DOIS VÉUS, E O DE BAIXO MUDA COM A TELA. No desktop o texto ocupa a
            metade esquerda e o véu horizontal dá conta dele; no celular ele
            atravessa a largura inteira, por cima do letreiro claro, e ali o
            horizontal não ajuda — foi medido texto a ~3.3:1 nessa faixa, que
            reprova. Por isso o véu vertical é mais forte no celular e afrouxa
            no `lg`, e o horizontal só existe a partir do `lg`. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/88 to-plum-deep/40 lg:via-plum-deep/72 lg:to-plum-deep/22"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-r from-plum-deep/80 via-plum-deep/20 to-transparent lg:block"
        />

        <div className="relative flex min-h-[70svh] items-end lg:min-h-[78svh]">
          <div className="container mx-auto px-5 pt-32 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
            {/* O ANO EM BRANCO DESBOTADO, e não em roxo: desde que a
                palavra "Indaiatuba" do título passou a levar o destaque, um
                numeral colorido logo acima dela seria a segunda mancha de cor
                da mesma seção. Assim ele vira o que sempre foi — uma data
                grande no fundo, como a palavra "Cremos" lá embaixo. */}
            <Reveal>
              <span className="font-display block text-[clamp(2.75rem,7vw,4.5rem)] font-medium leading-[0.9] text-white/45">
                {INDAIATUBA.ano}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-5 max-w-2xl text-[1.9rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.2rem] font-medium leading-[1.05] text-white">
                <Chave t={INDAIATUBA.titulo} escuro />
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <div>
                  {INDAIATUBA.paragrafos.map((p, i) => (
                    <p
                      key={i}
                      className={`max-w-md leading-relaxed text-white/70 ${i > 0 ? "mt-4" : ""
                        }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <p className="font-display max-w-md text-[clamp(1.2rem,2.2vw,1.5rem)] leading-[1.35] text-white/90">
                  {INDAIATUBA.propositoAntes}{" "}
                  <span className="text-white">{INDAIATUBA.proposito}</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 04 · NOSSA VISÃO ═══════════════════════════════════════════════
          A seção mais tipográfica da página, e a mais vazia — de propósito.
          A frase do encargo É o elemento gráfico: ela ocupa quase a largura
          inteira — CENTRALIZADA e entre aspas, como uma citação, porque é
          isso que ela é: a frase que a igreja usa para dizer a que veio.

          O DESTAQUE É UM SÓ. Roxo e itálico ao mesmo tempo, no miolo da frase
          ("cada membro é um ministro e cada casa uma extensão da igreja").
          Antes eram quatro trechos em itálico e só um em roxo; quatro
          destaques numa frase de nove palavras úteis não destacam nada, e o
          resultado era uma frase inteira em ênfase. Agora há uma mancha de cor
          só, e ela cai na parte que diz o que a igreja FAZ — as pontas dizem
          quem ela é e para quem.

          "CRISTO" em caixa alta é a última batida da frase, e é CSS
          (`uppercase`), não texto em maiúsculas no arquivo: o nome próprio
          continua capitalizado no que se copia da página e no que o leitor de
          tela anuncia.

          AS ASPAS SÃO TIPOGRÁFICAS (“ ”) e ficam dentro do `<h2>`. No desktop
          elas ficam PENDURADAS na margem (`hanging-punctuation`), para a
          primeira linha alinhar pela letra e não pela aspa — o navegador que
          não conhece a propriedade simplesmente as mantém no fluxo, e ninguém
          percebe.

          Não há `<h2>` separado dizendo "Uma igreja de vencedores": a frase
          contém essas palavras e é ela o cabeçalho da seção. Um título
          repetindo o que a frase diz duas linhas abaixo seria eco.

          E NÃO HÁ MAIS NADA DEPOIS DA FRASE. Aqui vinham os três princípios
          ("cada membro, um ministro" / "cada casa, uma extensão da igreja" /
          "uma geração para Cristo") em três colunas com filete. Eles saíram:
          são as três partes da própria frase, abertas em prosa logo abaixo
          dela. Explicar em três colunas o que a citação acabou de dizer é
          repetir a seção inteira em corpo menor — e cobrava da seção mais
          vazia da página justamente o vazio que a faz funcionar. O que a
          página perde em texto, ganha em silêncio em volta da frase.

          ⚠️ ESTA COMPOSIÇÃO TEM UMA CÓPIA: a seção 07 da Home (`app/page.tsx`)
          mostra a mesma citação, com o mesmo desenho, desde que a versão
          alinhada à esquerda que ela tinha foi trocada por esta. Mexeu aqui,
          mexa lá. O TEXTO não é cópia — é o `ENCARGO` deste arquivo mesmo,
          que a Home importa via `lib/home.ts`. A única divergência de
          propósito é a entrelinha: a Home usa `leading-[1.55]` em vez do
          `leading-[64px]` fixo daqui, que no celular abre 64px de entrelinha
          para uma fonte de 22px. */}
      <section className="bg-bone py-24 sm:py-28 lg:py-36">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="block text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
              {VISAO.eyebrow}
            </span>
          </Reveal>

          <Reveal variant="blur" delay={100}>
            {/* A CITAÇÃO, SEM CAIXA. A frase estava solta na largura da página
                em corpo de manchete e lia como um bloco de texto grande; passou
                por uma versão dentro de uma placa `sand`, que resolveu o
                tamanho mas acrescentou uma moldura que a seção não precisava —
                esta é a seção mais vazia da página de propósito, e um retângulo
                cheio no meio dela contraria isso. Ficou o que interessava:
                texto centralizado e o `bone` da seção por trás.

                A MEDIDA É A DO CONTAINER, sem teto próprio: a frase atravessa
                a mesma largura que todas as outras seções usam, e é isso que
                a faz parecer a maior coisa da página sem mudar de corpo. O
                `px` das quinas continua sendo o único recuo — ele é a folga
                das aspas, não margem de leitura.

                ⚠️ `text-pretty` AQUI, e não o `text-balance` que o resto da
                página usa. O `balance` iguala o comprimento das linhas, o que
                significa ENCOLHER todas até a mais curta caber — numa medida
                larga ele devolvia a frase para o meio do bloco e desfazia
                justamente a largura que esta seção foi pedida para ter. O
                `pretty` preenche a linha e só cuida da última.

                O CORPO TAMBÉM PULA NOS BREAKPOINTS DO CONTAINER, pelo mesmo
                motivo do resto da página (ver o cabeçalho do arquivo): num
                `clamp` em `vw` a frase chegava a 1279px com o mesmo bloco de
                1024 e sobrava medida vazia dos dois lados.

                QUEM SEGURA A COMPOSIÇÃO SÃO AS DUAS ASPAS. Elas são desenho, e
                por isso saíram de dentro do texto: ficam nas quinas opostas do
                bloco, em `grape-light`, no tamanho de um numeral. Como são
                decorativas, vão com `aria-hidden` — quem usa leitor de tela
                ouve a frase limpa, sem dois caracteres soltos no meio dela.

                ⚠️ O `px` do bloco e o `py` do <h2> são a FOLGA DAS QUINAS: sem
                eles, na tela estreita a primeira e a última linha encostam nas
                aspas. Não são respiro solto. */}
            <div className="relative mt-10 px-8 sm:mt-12 sm:px-14 lg:px-16">
              <span
                aria-hidden
                className="font-display absolute left-0 top-0 select-none text-[clamp(3rem,5vw,4.5rem)] leading-none text-grape-light"
              >
                {"\u201C"}
              </span>

              <h2 className="font-display text-pretty py-8 text-center text-[1.4rem] font-medium leading-[64px] sm:text-[1.9rem] lg:text-[2.3rem] xl:text-[2.6rem] text-foreground sm:py-10">
                {ENCARGO.map((pedaco, i) =>
                  pedaco.forte ? (
                    /* `not-italic` obrigatório: o `<em>` fica pela semântica,
                       mas a Manrope é uma família só romana e a inclinação
                       viria do navegador, não da fonte. O destaque é a cor. */
                    <em key={i} className="not-italic text-grape">
                      {pedaco.texto}
                    </em>
                  ) : (
                    <span
                      key={i}
                      className={pedaco.caixaAlta ? "uppercase" : undefined}
                    >
                      {pedaco.texto}
                    </span>
                  )
                )}
              </h2>

              <span
                aria-hidden
                className="font-display absolute bottom-0 right-0 select-none text-[clamp(3rem,5vw,4.5rem)] leading-none text-grape-light"
              >
                {"\u201D"}
              </span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ═══ 05 · IGREJA EM CÉLULAS ═════════════════════════════════════════
          Muda o fundo e muda a forma: aqui a fotografia volta, e volta em PAR.
          As duas fotos são a frase "nos reunimos nas celebrações e também de
          casa em casa" — uma célula na varanda de uma casa e uma família num
          culto — e por isso a da célula é a maior das duas: a seção é sobre
          ela. A menor desce um degrau (`mt-10`) para o par não virar dois
          retângulos alinhados, e no celular sobe pela quina da maior — ver o
          comentário do par. */}
      <section className="overflow-hidden bg-sand py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal variant="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                {CELULAS.eyebrow}
              </span>
              <h2 className="font-display mt-5 max-w-md text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.2rem] font-medium leading-[1.05] text-foreground">
                <Chave t={CELULAS.titulo} />
              </h2>
              <p className="font-display mt-7 max-w-md text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.3] text-foreground">
                {CELULAS.destaque}
              </p>
              {CELULAS.paragrafos.map((p, i) => (
                <p
                  key={i}
                  className="mt-5 max-w-md leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}

              <MagneticButton className="mt-9">
                <Link
                  href="/celulas"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-plum-deep px-8 py-4 text-sm font-semibold text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
                >
                  Encontre uma célula
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
            </Reveal>

            <Reveal variant="right" delay={120}>
              {/* O PAR NÃO ATRAVESSA O CELULAR LADO A LADO. Em 390px duas
                  colunas dariam ~165px cada, e a foto da célula — que é uma
                  varanda com vinte pessoas — vira um borrão de rostos de 4mm.

                  ⚠️ NO CELULAR ELAS VIRAM UMA COLAGEM, e não duas fotos
                  empilhadas. Empilhadas, a do culto ficava sozinha embaixo,
                  encostada à direita e com um vão inteiro de fundo à esquerda:
                  lia como sobra de layout, não como a segunda metade de um par.
                  Aqui ela sobe pela QUINA DE BAIXO À DIREITA da foto da célula
                  — a mesma manobra da seção da liderança, logo abaixo — e as
                  duas voltam a ler como uma composição só.

                  A montagem é a de lá, item por item: `absolute` sobre um
                  embrulho `relative`, e o `pb-[24%]` é o que RESERVA o pedaço
                  que a foto menor invade para baixo. Sem ele a quina dela cai
                  por cima da seção seguinte. O anel na cor da faixa
                  (`ring-sand`) é o que separa uma foto da outra — as duas são
                  cenas escuras e sem ele as bordas se dissolvem. Ele some do
                  `sm` para cima (`sm:ring-0`), onde não há sobreposição.

                  Do `sm` em diante o par volta a ser duas colunas de grade, com
                  a do culto um degrau abaixo (`sm:mt-10`) — é lá que a
                  assimetria já funcionava. */}
              <div className="relative pb-[24%] sm:grid sm:grid-cols-[1.15fr_0.85fr] sm:gap-5 sm:pb-0">
                <MolduraFoto
                  foto={CELULAS.fotoCelula}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 92vw"
                  className="aspect-[4/3] w-full rounded-[1.25rem] sm:aspect-[4/5] lg:rounded-[1.5rem]"
                />
                <div className="absolute right-0 bottom-0 w-[42%] sm:static sm:mt-10 sm:w-full lg:mt-16">
                  <MolduraFoto
                    foto={CELULAS.fotoCelebracao}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 38vw, 40vw"
                    posicao="50% 35%"
                    className="aspect-[3/4] w-full rounded-[1.25rem] ring-[6px] ring-sand sm:ring-0 lg:rounded-[1.5rem]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 06 · NOSSOS VALORES ════════════════════════════════════════════
          Seis itens numa grade de 3×2 que se desmonta em 2 e depois em 1. Sem
          caixa, sem sombra, sem ícone: quem separa um valor do outro é o filete
          e o espaço, e o numeral em roxo é a única cor da seção.

          A `<div>` final de filete fecha a grade embaixo, senão a última linha
          fica aberta e a composição parece cortada — mesma manobra da lista do
          /trilho-do-vencedor. */}
      <section className="bg-bone py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
              {VALORES.eyebrow}
            </span>
            <h2 className="font-display mt-5 max-w-2xl text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.2rem] font-medium leading-[1.05] text-foreground">
              <Chave t={VALORES.titulo} />
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-16">
            {VALORES.itens.map((valor, i) => (
              <Reveal key={valor.n} delay={(i % 3) * 80}>
                <div className="border-t border-border py-8 lg:py-10">
                  <span className="font-display block text-lg font-medium leading-none text-grape">
                    {valor.n}
                  </span>
                  <h3 className="font-display mt-5 max-w-[16ch] text-[clamp(1.3rem,2.2vw,1.6rem)] font-medium leading-tight text-foreground">
                    {valor.nome}
                  </h3>
                  <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {valor.texto}
                  </p>
                </div>
              </Reveal>
            ))}
            <div
              aria-hidden
              className="border-t border-border sm:col-span-2 lg:col-span-3"
            />
          </div>
        </div>
      </section>

      {/* ═══ 07 · NO QUE CREMOS ═════════════════════════════════════════════
          Oito fundamentos de fé é a seção com mais chance de ficar pesada da
          página inteira — por isso ela é a que tem mais espaço vazio. O
          acordeão ocupa ~65% da largura do conteúdo e o resto fica com o
          título, que gruda na tela enquanto a lista rola (`lg:sticky`).

          O PÉ DA COLUNA (o numeral com o total de fundamentos) é IN-FLOW, não
          posicionado por cima de nada: ocupa o vão que sobra na coluna da
          esquerda enquanto o acordeão rola. Some no celular, onde vão nenhum
          sobra. O porquê de ele ser um número, e não a palavra "Cremos" em
          corpo gigante que morava aqui, está no comentário do próprio bloco.

          O comportamento do acordeão (um de cada vez, o primeiro aberto, a
          animação sem número mágico) está documentado no próprio componente. */}
      <section className="overflow-hidden bg-sand py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          {/* A coluna da esquerda era 0.7fr e ficou apertada quando a manchete
              virou Poppins: "firmada na Palavra" não cabia numa linha e o
              título quebrava em três, com "Palavra" sozinha embaixo. 0.85fr é
              a menor largura em que ele fecha em duas linhas do `lg` para
              cima; o acordeão perde 0.15fr e não sente. */}
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal variant="left">
              <div className="lg:sticky lg:top-28">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                  {CREMOS.eyebrow}
                </span>
                {/* Sem `max-w` e um degrau abaixo das outras manchetes de
                    seção: quem limita a linha aqui é a coluna pregada, que é a
                    mais estreita da página. Com o corpo das outras, "firmada
                    na Palavra" não cabia e o título quebrava em três com
                    "Palavra" sozinha embaixo. */}
                <h2 className="font-display mt-5 text-[2rem] sm:text-[2.35rem] lg:text-[2.4rem] xl:text-[2.9rem] font-medium leading-[1.05] text-foreground">
                  <Chave t={CREMOS.titulo} />
                </h2>
                {/* O PÉ DA COLUNA PREGADA.
                    Aqui morava a palavra "Cremos" em corpo gigante e 7% de
                    opacidade. Ela não funcionava, e o defeito não era o
                    tamanho: sobre o `sand` (#edeae3) aquele tom dá menos de
                    1.1:1 de contraste — perto do limite em que uma tela
                    calibrada ainda mostra alguma coisa e um celular no sol não
                    mostra nada. Subir a opacidade só troca o problema: a
                    palavra vira uma mancha cinza atrás do título, e continua
                    sem dizer nada (todos os oito itens ao lado já começam com
                    "Cremos").

                    A saída foi trocar ENFEITE POR INFORMAÇÃO. O numeral diz
                    quantos fundamentos existem — que é o que quem chega numa
                    lista fechada quer saber antes de abrir a primeira — e por
                    ser texto de verdade ele pode ser preto, resolvendo o
                    contraste em vez de administrá-lo.

                    ⚠️ O NÚMERO É DERIVADO, não digitado: sai do tamanho de
                    `CREMOS.itens`. Se um nono fundamento entrar na lista, este
                    pé acompanha sozinho — um "08" cravado aqui viraria mentira
                    no primeiro acréscimo. */}
                <div aria-hidden className="mt-16 hidden select-none lg:block">
                  <span className="block h-px w-14 bg-foreground/20" />
                  <span className="font-display mt-7 block text-[clamp(3rem,4.5vw,4rem)] font-medium leading-[0.9] text-foreground">
                    {String(CREMOS.itens.length).padStart(2, "0")}
                  </span>
                  <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Fundamentos da nossa fé
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={110}>
              <Acordeao itens={CREMOS.itens} idBase="cremos" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 08 · NOSSA LIDERANÇA ═══════════════════════════════════════════
          Não são dois cartões de equipe: é um retrato grande com a foto da
          família montada na quina, e o texto ao lado. O par de fotos é o
          conteúdo da seção — liderança e família na mesma composição.

          O retrato ocupa a coluna maior porque ele é o assunto; a família entra
          a 40% da largura, com o anel na cor do fundo (`bone`) separando as
          duas. O `pb-[20%]` no wrapper é o que reserva o espaço que a foto
          menor invade — sem ele a quina dela cairia por cima do texto da seção
          seguinte no celular.

          Os dois nomes ficam embaixo do texto, com filete: nome em display,
          cargo em caixa alta pequena. Sem foto de cada um, sem cargo inventado,
          sem bio — o briefing dá exatamente estas duas linhas. */}
      <section className="overflow-hidden bg-bone py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal variant="left">
              {/* Mesmo embrulho posicionado da colagem da história, e pelo
                  mesmo motivo — ver o comentário de lá. */}
              <div className="relative pb-[22%]">
                <MolduraFoto
                  foto={LIDERANCA.fotoCasal}
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="aspect-[4/5] w-full rounded-[1.5rem] lg:rounded-[2rem]"
                />
                <div className="absolute right-0 bottom-0 w-[38%] sm:w-[34%]">
                  <MolduraFoto
                    foto={LIDERANCA.fotoFamilia}
                    sizes="(min-width: 1024px) 20vw, 36vw"
                    className="aspect-[4/5] w-full rounded-[1.1rem] ring-[6px] ring-bone lg:rounded-[1.35rem] lg:ring-[8px]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                {LIDERANCA.eyebrow}
              </span>
              {/* Mesma história da seção anterior: são DUAS frases inteiras
                  ("Pastoreando pessoas." / "Formando discípulos.") e o ideal é
                  uma por linha. O `max-w-md` cortava antes disso na Poppins, e
                  no degrau `lg` a coluna é estreita demais para o corpo do
                  `xl` — daí o tamanho voltar um pouco lá. */}
              <h2 className="font-display mt-5 text-[2rem] sm:text-[2.4rem] lg:text-[2.25rem] xl:text-[2.8rem] font-medium leading-[1.05] text-foreground">
                <Chave t={LIDERANCA.titulo} />
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-foreground">
                {LIDERANCA.intro}
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                {LIDERANCA.texto}
              </p>

              <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {LIDERANCA.pastores.map((pastor) => (
                  <div key={pastor.nome} className="border-t border-border pt-5">
                    <dt className="font-display text-[1.25rem] font-medium leading-tight text-foreground">
                      {pastor.nome}
                    </dt>
                    <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {pastor.cargo}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 09 · FECHO ═════════════════════════════════════════════════════
          A página abriu com a igreja inteira numa foto e fecha com duas
          pessoas — um rapaz de cabeça baixa e outro com a mão na cabeça dele,
          orando. É a mesma ideia nas duas pontas, em escalas opostas: a igreja
          é feita de gente.

          A faixa é PARTIDA ao meio em vez de ter texto sobre a foto. Duas
          razões: a foto é um retrato em pé (numa faixa larga com texto por
          cima sobraria cortina e sumiria a oração), e a página já gastou o
          recurso "texto sobre fotografia" na chegada a Indaiatuba. No celular
          a foto vira uma faixa em cima e o texto vem embaixo, na ordem em que
          se lê.

          Os dois botões são os dois do briefing e levam a destinos que
          existem: /contato e /celulas. */}
      <section className="bg-plum-deep">
        <div className="grid lg:grid-cols-2">
          {/* A `<MolduraFoto>` desenha a própria `<div>` com `position:
              relative` — por isso quem se posiciona é o embrulho, e não ela:
              `relative` e `absolute` na mesma classe brigam pela mesma
              propriedade e o vencedor dependeria da ordem no CSS, não da ordem
              que está escrita aqui. Com o embrulho em `inset-0` a moldura
              recebe um pai de altura definida e o `h-full` resolve. */}
          <div className="relative min-h-[46svh] lg:order-2 lg:min-h-[80svh]">
            <div className="absolute inset-0">
              {/* O RECORTE DESCE BEM ABAIXO DO CENTRO (`50% 55%`). O arquivo
                  é 2:3 em pé e este vão é quase quadrado em toda tela, então
                  `object-cover` corta na vertical e mostra só uns dois terços
                  da altura. Centrado, o terço que sobra por cima é cortina
                  vazia e os dois rapazes ficam espremidos no pé do quadro. A
                  55% a mão na cabeça cai no meio da moldura e a janela atrás
                  vira fundo, que é o papel dela. */}
              <MolduraFoto
                foto={FECHO.foto}
                tom="escuro"
                sizes="(min-width: 1024px) 50vw, 100vw"
                posicao="50% 55%"
                className="h-full w-full"
              />
            </div>
          </div>

          {/* O `pl` acompanha a margem do `container` do resto do site: o
              conteúdo desta metade nasce alinhado com o texto das seções de
              cima em vez de encostar na borda da janela. O `96rem` é o teto do
              `container` do Tailwind — abaixo dele o `max()` devolve os mesmos
              3rem do `lg:px-12` que todas as outras seções usam. */}
          <div className="flex items-center px-5 py-20 sm:px-8 sm:py-24 lg:order-1 lg:py-28 lg:pr-12 lg:pl-[max(3rem,calc((100vw-96rem)/2+3rem))]">
            <div className="max-w-lg">
              <Reveal>
                <h2 className="font-display text-[2rem] sm:text-[2.6rem] lg:text-[2.9rem] xl:text-[3.4rem] font-medium leading-[1.05] text-white">
                  <Chave t={FECHO.titulo} escuro />
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 max-w-md leading-relaxed text-white/70">
                  {FECHO.texto}
                </p>
              </Reveal>
              {/* Branco cheio, pelo mesmo motivo do ano lá em cima: o roxo
                  desta seção já está no "você" do título. */}
              <Reveal delay={170}>
                <p className="font-display mt-7 text-[clamp(1.25rem,2.4vw,1.65rem)] leading-[1.3] text-white">
                  {FECHO.destaque}
                </p>
              </Reveal>
              <Reveal delay={240}>
                {/* OS DOIS BOTÕES SÃO `w-full` NO CELULAR e voltam à largura
                    natural do `sm` em diante. Não é enfeite: empilhados, o
                    `stretch` da coluna flex esticava o embrulho do
                    `<MagneticButton>` até a margem, mas o `<Link>` de dentro é
                    `inline-flex` e continuava do tamanho do texto. O par saía
                    com larguras diferentes e o de cima encostado à esquerda de
                    uma faixa vazia. É o mesmo par do hero da /celulas. */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <MagneticButton>
                    <Link
                      href="/contato"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95 sm:w-auto"
                    >
                      Planeje sua visita
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </MagneticButton>
                  <Link
                    href="/celulas"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95 sm:w-auto"
                  >
                    Encontre uma célula
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
