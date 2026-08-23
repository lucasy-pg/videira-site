import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { IconeWhatsApp } from "@/components/IconeWhatsApp";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { MolduraFoto } from "@/components/MolduraFoto";
import { MuralDeBairros } from "@/components/celulas/MuralDeBairros";
import { cells, neighborhoodGroups } from "@/lib/cells";
import type { Pedaco, Titulo } from "@/lib/celulas";
import {
  ACAO_ENCONTRAR_CELULA,
  BAIRROS,
  BENEFICIOS,
  ENCONTRO,
  FECHO,
  GALERIA,
  HERO,
  MULTIPLICACAO,
  O_QUE_E,
  PARA_QUEM,
  VISAO,
} from "@/lib/celulas";

export const metadata: Metadata = {
  /* Os dois números são derivados, como tudo nesta página: a descrição que o
     Google mostra não pode envelhecer sozinha. A versão anterior dizia "26
     células" enquanto o cadastro tinha 22. */
  title: "Células — Igreja Videira Indaiatuba",
  description: `A igreja acontece também de casa em casa: ${cells.length} células reunidas toda semana em ${neighborhoodGroups.length} bairros de Indaiatuba. Encontre uma célula perto de você.`,
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * O SISTEMA DESTA PÁGINA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * A página não é sobre O SISTEMA DE CÉLULAS. É sobre alguém encontrar um lugar
 * onde já esperam por ela. Toda decisão daqui responde a isso, e a mais
 * importante é a que não se vê: NÃO HÁ UM PICTOGRAMA NA PÁGINA INTEIRA. Onde
 * um layout de produto poria um ícone de "comunidade", aqui há uma fotografia
 * de gente da Videira ou espaço vazio. Treze fotos, todas reais, todas de
 * células desta cidade.
 *
 * Os únicos desenhos são FUNCIONAIS e se contam nos dedos: a seta de rolagem
 * da capa, a seta dos links e o glifo do WhatsApp nos dois botões de CTA —
 * este último não é enfeite, é o aviso de que o toque sai do site e cai num
 * aplicativo. Um pictograma novo que apenas ilustre um assunto quebra a
 * regra.
 *
 * A JORNADA, que precisa ser legível só rolando, sem ler:
 *
 *   01 uma casa cheia            → faixa de foto sangrada + manchete embaixo
 *   02 o que é isso              → colagem de duas fotos + texto ao lado
 *   03 por que existe            → faixa escura, título e prosa lado a lado
 *   04 o que você ganha          → grade editorial 2+3, só filete e numeral
 *   05 como é por dentro         → linha do tempo com fotos penduradas nela
 *   06 e se eu não pertencer?    → duas colunas curtas + faixa de públicos
 *   07 são estas as pessoas      → mosaico escuro de seis fotos
 *   08 tem uma perto de você     → mural tipográfico de bairros + colagem ao fundo
 *   09 e depois?                 → texto e o refrão da multiplicação
 *   10 então venha               → foto de largura cheia com o convite por cima
 *
 * RITMO DE SUPERFÍCIE. bone → sand → escura → bone → sand → bone → escura →
 * sand → bone → escura. TRÊS faixas escuras e não duas (a /sobre tem duas):
 * esta página é mais longa e as três estão bem separadas — 03, 07 e 10 —, mas
 * o que as mantém distintas é a FORMA, não a cor. A 03 é só tipografia, a 07 é
 * só fotografia e a 10 é texto sobre foto. Nenhuma se parece com as outras.
 *
 * ⚠️ NENHUMA SEÇÃO REPETE A COMPOSIÇÃO DA ANTERIOR. É o que separa uma da
 * outra — não uma faixa decorativa entre elas. Se uma seção nova entrar,
 * o teste é esse: role a página com os olhos semicerrados e veja se dá para
 * dizer onde uma acaba e a outra começa.
 *
 * A 03 E A 06 SÃO AS DUAS DE DUAS COLUNAS, e é a única forma que se repete na
 * página. O que as mantém distintas é tudo o mais: a 03 é escura, sem foto e
 * fecha num versículo; a 06 é clara e fecha numa faixa de cinco palavras. Elas
 * também estão separadas por duas seções de forma completamente diferente (a
 * grade de benefícios e a linha do tempo), então nunca aparecem na mesma tela.
 * Uma TERCEIRA seção de duas colunas quebra o sistema — aí a página vira uma
 * pilha de blocos parecidos.
 *
 * TIPOGRAFIA: MANROPE em tudo, manchete e corpo, pelos tokens
 * `--font-display` e `--font-body` do `globals.css` — nenhuma manchete desta
 * página escolhe fonte. Esta página já rodou em Poppins, por uma classe
 * `manchetes-poppins` no <div> raiz; a classe saiu em 22/08/2026, quando a
 * Manrope virou a família única do site. O que separa manchete de corpo aqui é
 * ESCALA, não peso: toda manchete daqui é 500 (`font-medium`) e a prosa é 400.
 * O que muda entre a capa, a seção e o card é o `font-size` — ver `H2` e
 * `H2_CALMO` logo abaixo. Os eyebrows em caixa alta são 600, que é o degrau de
 * interface, não de título.
 *
 * ⚠️ SEM ITÁLICO. A Manrope é uma família só romana, então o gesto antigo desta
 * página — a manchete virando do romano pro itálico na palavra que é promessa —
 * continua não existindo: o destaque é SÓ A COR ROXA. Deixar um `<em>` solto
 * devolve o itálico sintético do navegador. Ver `Chave`, logo abaixo.
 *
 * A REGRA DO ROXO É DE CONTAGEM, herdada da /sobre: UM TRECHO POR MANCHETE,
 * mais o eyebrow. Fora isso, roxo só nos numerais, nos filetes e nos pontos.
 * Nenhuma manchete leva dois destaques, e nenhum bloco de destaque abaixo de
 * uma manchete leva roxo — se o título já gastou a tinta da seção, o destaque
 * fica em preto ou em branco. É por isso que o refrão da multiplicação (09)
 * não é roxo, ainda que seja o maior bloco de tipografia da página depois da
 * capa. Nas seções 03 e 06 o roxo mora inteiro na manchete: o que vem abaixo
 * (a prosa, o versículo, as cinco categorias) trabalha em preto ou branco.
 *
 * O CTA É UM SÓ E APARECE TRÊS VEZES — capa, bairros e fecho —, sempre com o
 * mesmo destino (`ACAO_ENCONTRAR_CELULA`). As outras sete seções não pedem
 * nada: uma página que interrompe a cada rolagem para vender não é uma página
 * sobre pertencer.
 *
 * MEDIDA DE LEITURA: `PROSA` e `PROSA_LARGA`, definidas logo abaixo. Não
 * digite `max-w-[..ch]` num parágrafo novo — use uma das duas, senão a página
 * volta a ter cinco medidas diferentes de coluna. Manchete não entra nessa
 * conta: ela para pelo próprio `max-w-[..ch]` em contagem de caracteres, que
 * acompanha o corpo da fonte sozinho.
 */

/* ── Peças pequenas, usadas pela página inteira ─────────────────────────── */

/**
 * A palavra-promessa dentro de uma manchete, em roxo.
 *
 * Vai DENTRO do `<h1>`/`<h2>`, nunca no lugar dele, para que o título mantenha
 * as próprias classes de escala e quebra. Para o leitor de tela nada muda: um
 * `<em>` no meio de um cabeçalho não parte o nome acessível dele.
 *
 * `escuro` troca o `grape` (6.9:1 sobre bone) pelo `grape-light` (9.6:1 sobre
 * plum-deep). Cada um só passa em contraste na sua metade do par — inverter os
 * dois publica uma palavra ilegível.
 *
 * ⚠️ O DESTAQUE É SÓ COR, e o `not-italic` é obrigatório. A página roda em
 * Manrope, que não tem arquivo itálico — o `<em>`, que o navegador inclina
 * sozinho, cairia num oblíquo sintético: a mesma letra torta por software, com
 * os "o" e "e" abertos. O `<em>` fica pela semântica; a inclinação, que era o
 * gesto da Newsreader, sai. É o mesmo caminho de todas as outras páginas.
 *
 * O peso também não muda: dentro de uma manchete, baixar o trecho forte um
 * degrau abre um buraco visível no meio da linha e o destaque passa a parecer
 * um erro de peso em vez de uma ênfase.
 */
function Chave({ t, escuro = false }: { t: Titulo; escuro?: boolean }) {
  return (
    <>
      {t.antes}
      <em
        className={`not-italic ${escuro ? "text-grape-light" : "text-grape"}`}
      >
        {t.forte}
      </em>
      {t.depois}
    </>
  );
}

/**
 * Um parágrafo em que um trecho do meio pesa mais.
 *
 * O trecho forte vira `<strong>` de verdade e não um `<span>` pintado: a
 * ênfase existe no texto, não só na tela, e é assim que ela sobrevive ao
 * leitor de tela e ao "copiar e colar".
 *
 * O peso é `font-medium` e a cor sobe um degrau (do `muted-foreground` para o
 * `foreground`, ou do `white/70` para o `white`). Negrito cheio dentro de um
 * parágrafo de Instrument Sans mancha a coluna.
 */
function Prosa({
  partes,
  escuro = false,
}: {
  partes: Pedaco[];
  escuro?: boolean;
}) {
  return (
    <>
      {partes.map((p, i) =>
        p.forte ? (
          <strong
            key={i}
            className={`font-medium ${escuro ? "text-white" : "text-foreground"}`}
          >
            {p.texto}
          </strong>
        ) : (
          <span key={i}>{p.texto}</span>
        ),
      )}
    </>
  );
}

/* O anel de foco. O site herda o do navegador, que sobre `bone` fica quase
   invisível e sobre `plum-deep` some de vez — e esta é a página em que
   navegar pelo teclado tem que funcionar, porque o objetivo dela é um clique.
   Duas variantes pelo mesmo motivo do `Chave`: cada cor só enxerga sobre a
   sua metade do par. */
const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grape";
const FOCO_ESCURO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grape-light";

/* ── A MEDIDA DE LEITURA ──────────────────────────────────────────────────
   A página inteira parava em `36ch`, que dá umas 40 letras por linha — abaixo
   da faixa em que a leitura corre (45 a 75). O sintoma estava na seção 05: a
   intro quebrava em quatro linhas curtas embaixo de uma manchete larga, e o
   olho voltava mais vezes do que lia.

   `ch` é a largura do "0" DA PRÓPRIA FONTE do elemento. Nestes parágrafos ela
   é a Instrument Sans, que não mudou quando as manchetes viraram Poppins — por
   isso a medida do corpo teve que ser remexida à mão, enquanto os `max-w` das
   manchetes se ajustaram sozinhos.

   DUAS E NÃO UMA: `PROSA` é para texto dentro de coluna de grade, onde a
   própria coluna já é o limite; `PROSA_LARGA` é para os blocos que atravessam
   a seção inteira (a intro da 05, a 06 centralizada, o mural e o fecho), onde
   sem um teto a linha ia de ponta a ponta da tela. */
const PROSA = "max-w-[46ch]";
const PROSA_LARGA = "max-w-[54ch]";

const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-grape";
const EYEBROW_ESCURO =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-grape-light";

/** A manchete de seção. Uma medida só para as sete que encimam a seção. */
const H2 =
  "font-display text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05]";

/* A MANCHETE DAS SEÇÕES DE DUAS COLUNAS (03 e 06), um degrau abaixo do `H2`.
   Nas outras sete o título encima a seção e tem a largura toda para si; nestas
   duas ele DIVIDE A LINHA com o conteúdo, e no corpo do `H2` ele passava a
   altura da coluna vizinha — o que devolvia às duas seções a altura que a
   reescrita foi feita para tirar.

   ⚠️ NÃO É "o título pequeno". É o título de uma composição lateral, e a
   diferença tem que continuar visível: no meio do caminho entre os dois corpos
   ela vira gagueira, e a página passa a ter dois H2 quase iguais em vez de
   dois papéis distintos. */
const H2_CALMO =
  "font-display text-[clamp(1.6rem,3vw,2.35rem)] font-medium leading-[1.15]";

export default function Celulas() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ 01 · CAPA ══════════════════════════════════════════════════════
          A PÁGINA ABRE COM ROSTOS E SÓ DEPOIS COM PALAVRAS, e essa inversão é
          a decisão inteira desta capa. O caminho comum — manchete de um lado,
          foto do outro — põe a fotografia a ilustrar o que o texto já disse; e
          numa página cujo argumento é "existe gente esperando por você", quem
          tem que falar primeiro é a gente.

          A FAIXA É UMA FOTO SÓ E FICA PARADA. Ela já trocou de célula sozinha,
          e o carrossel custava caro pelo que dava: uma capa que se troca a
          cada cinco segundos tira do visitante o tempo de olhar uma cena com
          trinta rostos, e uma capa que se anuncia como carrossel convida a
          pessoa a operar a capa — quando o que a página quer que ela opere é
          o botão logo abaixo. Quem quiser ver as outras células tem o mosaico
          da seção 07 e o mural da 08, que são paredes paradas.

          NÃO HÁ TEXTO SOBRE A FOTO, e isso não é timidez. Um véu escuro sobre
          uma sala de casa apaga justamente o que ela tem para mostrar — a
          parede, o sofá, as crianças no chão. A foto fica limpa de ponta a
          ponta e a manchete pousa embaixo, no bone, onde ela tem o contraste
          máximo e todo o espaço vazio de que precisa. A página cobra esse
          recurso uma vez só, no fecho (10), onde a foto é uma selfie apertada
          que aguenta o escurecimento.

          A ALTURA É EM `svh` E NÃO EM `vh`: no Safari do iPhone o `vh` conta a
          barra do navegador que some ao rolar, e a faixa nasceria mais alta
          que a tela, empurrando a manchete inteira para fora da primeira
          rolagem. Somando a faixa (62svh) e o bloco de texto, a capa fecha em
          torno de uma tela no desktop.

          ⚠️ E É POR ISSO QUE A FAIXA ENCOLHE NO CELULAR (42svh). A foto é
          16:9 e o `object-cover` corta na LARGURA quando a caixa é mais alta
          que ela: numa tela de 390×750, uma faixa de 62svh mostraria menos de
          um terço da largura do arquivo — ou seja, quatro pessoas de trinta.
          Faixa baixa em tela estreita é o que mantém a sala inteira no quadro.

          A FOTO NÃO PASSA POR UM `<Reveal>`: ela é o provável LCP da rota, e o
          `opacity: 0` inicial atrasaria justamente a única coisa que o
          visitante precisa ver imediatamente. O único movimento da capa é o
          `capa-afasta` — a imagem entra 6% maior e recua para o tamanho dela
          em 1,4s, uma vez, ao carregar. Ele é de graça para o LCP porque
          anima TRANSFORM e não opacidade: o primeiro quadro já mostra a foto
          inteira e opaca, só um pouco mais perto. */}
      <section className="bg-bone">
        <div className="relative h-[42svh] min-h-[15rem] w-full sm:h-[52svh] lg:h-[62svh]">
          {/* `capa-afasta` (globals.css) mora no MESMO elemento que recorta a
              foto, e tem que ser assim: quem cresce e recua é o `<img>` lá
              dentro, e é o `overflow: hidden` da `<MolduraFoto>` que impede
              os 6% a mais de vazarem por cima da manchete. A mesma classe faz
              a entrada da capa da /sobre — é o gesto de abertura do site, não
              um efeito desta página.

              O recorte sobe acima do centro (`50% 45%`): embaixo é chão e
              joelho, em cima é a parede e a decoração. No centro, o corte come
              as crianças da fileira da frente — que na tela estreita, com a
              faixa em 42svh, é metade da foto.

              Ela recebe `h-full` e não a altura: quem manda na altura da capa
              é esta `<div>`, com os três degraus de `svh` explicados acima. */}
          <MolduraFoto
            foto={HERO.foto}
            eager
            sizes="100vw"
            posicao="50% 45%"
            className="capa-afasta h-full w-full"
          />

          {/* A DICA DE ROLAGEM mora aqui e não junto dos botões: no pé da
              fotografia ela aponta para o texto que vem a seguir, que é
              exatamente o movimento que se quer. É decorativa e redundante —
              quem quiser o mesmo destino tem o botão "Conheça as células"
              logo abaixo, que é um link de verdade —, então vai com
              `aria-hidden` e não recebe foco.

              O `drop-shadow` é o que garante a leitura: a seta é branca e o
              pé desta foto é claro em algumas telas. Sem a sombra ela some.

              `animate-seta-flutua` já existe no globals.css (nasceu na capa da
              /sobre). */}
          <span
            aria-hidden
            className="animate-seta-flutua absolute inset-x-0 bottom-5 flex justify-center text-white drop-shadow-[0_2px_8px_rgba(24,9,41,0.65)] sm:bottom-7"
          >
            <ChevronDown size={26} strokeWidth={1.5} />
          </span>
        </div>

        <div className="container mx-auto px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12 lg:pt-14 lg:pb-24">
          <Reveal>
            <span className={EYEBROW}>{HERO.eyebrow}</span>
          </Reveal>

          {/* A manchete e o bloco de ação dividem a linha no desktop e são
              alinhados pela BASE (`lg:items-end`): o parágrafo assenta na
              última linha do título em vez de flutuar no meio da coluna. No
              celular empilham, e a ordem do DOM já é a ordem de leitura. */}
          <div className="mt-6 grid gap-8 lg:mt-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <Reveal variant="blur">
              {/* O `max-w-[11ch]` é o que força a quebra em duas linhas com
                  "para você" sozinho embaixo — a promessa fica numa linha só
                  dela. Em `ch` e não em `rem` porque a medida acompanha o
                  corpo da fonte em cada breakpoint. */}
              <h1
                className={`font-display max-w-[11ch] text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium leading-[0.95] text-foreground`}
              >
                <Chave t={HERO.titulo} />
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p className={`${PROSA} text-lg leading-relaxed text-muted-foreground`}>
                {HERO.texto}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <MagneticButton>
                  {/* `<a>` e não `<Link>`: o destino é o WhatsApp, fora do
                      site. `noopener` é obrigatório com `target="_blank"` —
                      sem ele a página aberta ganha uma referência à nossa. */}
                  <a
                    href={ACAO_ENCONTRAR_CELULA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum-deep px-8 py-4 text-sm font-semibold text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95 sm:w-auto ${FOCO}`}
                  >
                    <IconeWhatsApp className="h-[17px] w-[17px] shrink-0" />
                    {HERO.acao}
                  </a>
                </MagneticButton>

                {/* Âncora interna: o `scroll-behavior: smooth` do globals.css
                    faz a rolagem deslizar, e o `scroll-mt` da seção de destino
                    é o que impede o título de parar embaixo da barra fixa. */}
                <Link
                  href="#o-que-e"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/5 active:scale-95 sm:w-auto ${FOCO}`}
                >
                  {HERO.acaoSecundaria}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 02 · O QUE É UMA CÉLULA ════════════════════════════════════════
          Duas fotos e um texto, em colunas desiguais. A colagem é montada com
          MARGEM NEGATIVA e não com `absolute`: a `<MolduraFoto>` já desenha a
          própria `<div>` com `position: relative`, e `relative` e `absolute`
          disputam a mesma propriedade — quem venceria seria a ordem das regras
          no CSS, não a ordem escrita aqui.

          A margem é em PORCENTAGEM, que em CSS resolve contra a LARGURA do
          bloco (nunca a altura): o encaixe das duas fotos é o mesmo em
          qualquer viewport, sem um único número mágico em pixels.

          A foto menor sobe pela quina de BAIXO À ESQUERDA. A /sobre já usa a
          quina de baixo à direita duas vezes; trocar o lado é o que impede
          esta seção de parecer uma seção daquela página.

          O anel na cor da faixa (`ring-sand`) é o que separa uma foto da
          outra — sem ele as bordas escuras se dissolvem uma na outra. */}
      <section
        id="o-que-e"
        className="scroll-mt-16 overflow-hidden bg-sand py-20 sm:scroll-mt-20 sm:py-24 lg:py-32"
      >
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal variant="left">
              <figure className="relative">
                <MolduraFoto
                  foto={O_QUE_E.fotoPrincipal}
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="aspect-[4/3] w-full rounded-[1.5rem] lg:rounded-[2rem]"
                />
                <div className="-mt-[16%] ml-[6%] w-[46%] sm:w-[42%]">
                  <MolduraFoto
                    foto={O_QUE_E.fotoSobreposta}
                    sizes="(min-width: 1024px) 22vw, 40vw"
                    className="aspect-[4/3] w-full rounded-[1.1rem] ring-[6px] ring-sand lg:rounded-[1.35rem] lg:ring-[8px]"
                  />
                </div>
              </figure>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <span className={EYEBROW}>{O_QUE_E.eyebrow}</span>
              <h2 className={`${H2} mt-5 max-w-[15ch] text-foreground`}>
                <Chave t={O_QUE_E.titulo} />
              </h2>
              {O_QUE_E.paragrafos.map((p, i) => (
                <p
                  key={i}
                  className={`mt-6 ${PROSA} leading-relaxed text-muted-foreground`}
                >
                  <Prosa partes={p} />
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 03 · NOSSA VISÃO ═══════════════════════════════════════════════
          A primeira faixa escura, e a única seção da página sem uma única
          fotografia — de propósito. Aqui o assunto não é uma cena, é uma
          ideia, e pôr gente ao lado dela dividiria a atenção.

          ⚠️ ELA FOI ENCOLHIDA, e o que saiu importa mais do que o que ficou.
          Tinha manchete de corpo cheio, três parágrafos em duas colunas, um
          bloco tipográfico de 3,85rem com o encargo ("Cada membro um ministro.
          Cada casa uma extensão da igreja.") e o versículo — quatro camadas
          para dizer UMA coisa, e passava de uma tela inteira no desktop. A
          repetição era literal: o encargo estava escrito no primeiro parágrafo
          E gritado no bloco de baixo, na mesma tela.

          FICOU UMA COMPOSIÇÃO DE DUAS COLUNAS: o título à esquerda, a prosa à
          direita, ambas ancoradas no TOPO (`items-start`) para que as duas
          comecem na mesma linha — é esse alinhamento que faz o par ler como
          uma coisa só em vez de duas caixas soltas. O vão entre elas é largo
          de propósito (`lg:gap-24`): é o respiro que a seção perdeu em altura.

          O TÍTULO É MENOR QUE O DAS OUTRAS SEÇÕES (`H2_CALMO`), e não é
          descuido. Numa seção de duas colunas o título divide a linha com o
          texto em vez de encimá-lo; no corpo do `H2` normal ele passaria a
          altura da coluna vizinha e a composição voltaria a ser alta. O
          impacto aqui vem do contraste com o roxo escuro e do espaço em volta,
          não do tamanho.

          O VERSÍCULO FICOU, e é a única coisa da versão antiga que sobrou
          abaixo das colunas. Não é repetição: os parágrafos dizem o que a
          igreja crê, ele diz de onde isso vem. Continua sem cartão — um
          filete, o texto e a referência do outro lado da linha. Uma caixa em
          volta transformaria a Escritura num componente de interface. */}
      <section className="bg-plum-deep py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-24">
            <Reveal>
              <span className={EYEBROW_ESCURO}>{VISAO.eyebrow}</span>
              <h2 className={`${H2_CALMO} mt-5 max-w-[14ch] text-white`}>
                <Chave t={VISAO.titulo} escuro />
              </h2>
            </Reveal>

            <Reveal variant="right" delay={110}>
              {VISAO.paragrafos.map((paragrafo, i) => (
                <p
                  key={i}
                  className={`${PROSA} leading-relaxed text-white/70 ${i > 0 ? "mt-5" : ""}`}
                >
                  <Prosa partes={paragrafo} escuro />
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={150}>
            <figure className="mt-12 border-t border-white/12 pt-7 sm:mt-14 lg:flex lg:items-baseline lg:justify-between lg:gap-12">
              <blockquote className="font-display max-w-[52ch] text-[clamp(1.05rem,1.9vw,1.3rem)] leading-[1.45] text-white/75">
                {`“${VISAO.versiculo}”`}
              </blockquote>
              <figcaption className="mt-4 shrink-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-grape-light lg:mt-0">
                {VISAO.referencia}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ═══ 04 · POR QUE PARTICIPAR ════════════════════════════════════════
          Quatro benefícios, e o risco conhecido é virar quatro cartões brancos
          com sombra e um ícone cada. Aqui não há cartão, não há sombra e não
          há ícone: o que separa um item do outro é um filete e o espaço.

          A GRADE É 2 + 2, e por isso é uma grade de DUAS colunas e não mais a
          de seis com `col-span`. A de seis existia para servir uma lista de
          CINCO itens, que não divide por 2: os dois primeiros ocupavam três
          colunas e os três seguintes, duas, e os dois maiores carregavam o
          título um degrau acima para dizer quem mandava na linha. Com quatro
          itens a lista divide certo sozinha, as quatro colunas têm a mesma
          largura — e o título grande nos dois primeiros virou um degrau sem
          causa, que lê como erro. Os quatro têm o mesmo corpo.

          ⚠️ SE VOLTAR A SER CINCO, a grade de seis e o degrau de corpo voltam
          juntos: em duas colunas, cinco itens deixam o último sozinho ao lado
          de um buraco.

          O NUMERAL É GRANDE E SÓLIDO, não grande e apagado. Numeral gigante a
          7% de opacidade já foi tentado neste projeto (no pé da coluna do "No
          que cremos", na /sobre) e saiu: sobre `bone` aquele tom dá menos de
          1.1:1 — perto do limite em que uma tela calibrada ainda mostra alguma
          coisa e um celular no sol não mostra nada. Aqui ele é `grape` cheio,
          em 2.5rem: grande o bastante para virar o elemento gráfico do item e
          legível o bastante para ser lido.

          O FILETE FINAL fecha a grade embaixo. Sem ele a última linha fica
          aberta e a composição parece cortada no meio. */}
      <section className="bg-bone py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className={EYEBROW}>{BENEFICIOS.eyebrow}</span>
            <h2 className={`${H2} mt-5 max-w-[18ch] text-foreground`}>
              <Chave t={BENEFICIOS.titulo} />
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:mt-16 lg:gap-x-16">
            {BENEFICIOS.itens.map((item, i) => {
              return (
                <Reveal key={item.n} delay={(i % 2) * 80}>
                  <div className="border-t border-border py-8 lg:py-10">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[2.25rem] font-medium leading-none text-grape lg:text-[2.75rem]">
                        {item.n}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        {item.rotulo}
                      </span>
                    </div>
                    <h3 className="font-display mt-6 max-w-[20ch] text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-tight text-foreground">
                      {item.titulo}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {item.texto}
                    </p>
                  </div>
                </Reveal>
              );
            })}
            <div aria-hidden className="border-t border-border sm:col-span-2" />
          </div>
        </div>
      </section>

      {/* ═══ 05 · COMO FUNCIONA ═════════════════════════════════════════════
          A NOITE DE CÉLULA JÁ EXISTE NA HOME, e é por isso que aqui ela tem
          outra forma. Lá são quatro cartões coloridos que se empilham com
          `position: sticky` enquanto a página rola (ver `CellsFeature.tsx`);
          repetir aquilo aqui seria a mesma seção duas vezes no mesmo site. Ali
          a copy derruba objeção ("vou ter que falar em público?"); aqui ela só
          descreve a sequência, e quem carrega o peso são as fotos.

          A LINHA MUDA DE EIXO COM A TELA, e é uma linha só: no celular ela é
          uma BORDA ESQUERDA contínua (`border-l`) que atravessa os quatro
          momentos de cima a baixo; do `lg` para cima ela vira quatro BORDAS
          SUPERIORES lado a lado (`lg:border-t`) que, alinhadas, leem como uma
          régua horizontal. O ponto roxo de cada momento acompanha: sentado
          sobre a linha vertical no celular, sobre a horizontal no desktop.

          Para a linha vertical não ter buracos, o espaço entre os momentos
          precisa ser PADDING DE DENTRO do bloco com borda (`pb-10`), nunca
          `gap` da grade — `gap` interrompe a borda e o resultado é uma linha
          tracejada que ninguém pediu.

          AS FOTOS PENDEM DA LINHA, no desktop. As três têm proporção e altura
          diferentes e todas pousam na mesma base (`items-end` dentro de uma
          faixa de altura fixa): é isso que faz a fileira parecer montada à mão.
          O momento 02 é o que não tem foto — e o vão que ele deixa é o que
          impede os quatro de virarem quatro colunas iguais. O porquê de ser
          justamente ele está no `lib/celulas.ts`. */}
      <section className="bg-sand py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className={EYEBROW}>{ENCONTRO.eyebrow}</span>
            <h2 className={`${H2} mt-5 max-w-[18ch] text-foreground`}>
              <Chave t={ENCONTRO.titulo} />
            </h2>
            <p className={`mt-6 ${PROSA_LARGA} leading-relaxed text-muted-foreground`}>
              <Prosa partes={ENCONTRO.intro} />
            </p>
          </Reveal>

          <div className="mt-14 grid lg:mt-20 lg:grid-cols-4 lg:gap-x-12">
            {ENCONTRO.momentos.map((m, i) => (
              <Reveal key={m.n} delay={i * 90} variant="up">
                <div className="border-l border-foreground/15 pb-10 pl-7 lg:border-l-0 lg:pb-0 lg:pl-0">
                  {/* A FAIXA DAS FOTOS. Altura fixa só no `lg`, onde as quatro
                      precisam ter o mesmo quadro e a mesma base; no celular ela
                      não tem altura e a foto ocupa a largura que lhe couber.

                      AS QUATRO SÃO IGUAIS: mesma proporção, mesma altura,
                      mesma base. Antes cada uma tinha a sua e pousava numa
                      altura diferente, para a fila parecer montada à mão —
                      parecia desalinhada. O ritmo da seção já vem da régua
                      horizontal e dos pontos roxos.

                      O momento 02 continua sem fotografia e ainda assim
                      DESENHA O QUADRO: a `<MolduraFoto>` sem `src` mostra o
                      vazio no recorte exato, com o caminho do arquivo que
                      falta. É o que mantém as quatro colunas em pé e garante
                      que a página não mude de forma no dia em que a foto
                      entrar. */}
                  <div className="mb-5 flex items-end lg:mb-0 lg:h-44 xl:h-52">
                    <MolduraFoto
                      foto={m.foto}
                      sizes="(min-width: 1024px) 20vw, 62vw"
                      className={`w-[62%] rounded-[1rem] sm:w-[46%] lg:w-auto ${m.proporcao} ${m.altura}`}
                    />
                  </div>

                  <div className="relative lg:mt-7 lg:border-t lg:border-foreground/15 lg:pt-7">
                    {/* O ponto sobre a linha. No celular ele senta na borda
                        esquerda, que está a `pl-7` (1.75rem) do texto; no
                        desktop ele sobe para a borda de cima. Os
                        `-translate-*` centram os 7px do ponto sobre o fio de
                        1px em vez de encostá-lo. */}
                    <span
                      aria-hidden
                      className="absolute -left-7 top-2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-grape lg:left-0 lg:top-0 lg:translate-x-0 lg:-translate-y-1/2"
                    />
                    <span className="font-display block text-sm font-medium leading-none text-grape">
                      {m.n}
                    </span>
                    <h3 className="font-display mt-4 text-[clamp(1.25rem,2.2vw,1.6rem)] font-medium leading-tight text-foreground">
                      {m.titulo}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {m.texto}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 06 · PARA QUEM É ═══════════════════════════════════════════════
          ⚠️ ELA ERA A ÚNICA SEÇÃO CENTRALIZADA DA PÁGINA E DEIXOU DE SER. O
          centro custava caro: um bloco centrado precisa de medida curta para
          não virar linha de ponta a ponta, e a medida curta fazia dois
          parágrafos quebrarem em seis linhas cada no meio de uma faixa larga e
          vazia dos dois lados. O texto parecia comprimido e a seção ficava
          alta sem ter conteúdo para isso. Agora ela usa o mesmo container e o
          mesmo alinhamento à esquerda das outras oito.

          O QUE A SEPARA DAS VIZINHAS, já que não é mais o centro: ela é a única
          da página sem uma única fotografia no claro, e a única que termina
          numa faixa de palavras soltas. A 05 acima é uma linha do tempo com
          fotos penduradas e a 07 abaixo é um mosaico escuro — nenhuma das três
          se parece.

          O TÍTULO À ESQUERDA E AS DUAS DESCRIÇÕES EMPILHADAS À DIREITA — a
          mesma composição da 03. Elas já estiveram lado a lado, um parágrafo
          por coluna, e não funcionava: o da esquerda é curto, o da direita é
          quase o dobro, e a coluna esquerda terminava com uma frase solta
          embaixo de um vão vazio enquanto a direita ainda corria. Empilhados
          na mesma coluna eles leem como uma resposta em dois tempos, e a
          esquerda fica com o único trabalho que lhe cabe: o título.

          A FAIXA DE CATEGORIAS ATRAVESSA AS DUAS COLUNAS, e é o que impede a
          seção de ser só um par de blocos: ela fecha a composição por baixo,
          como o versículo fecha a 03. É o fecho da seção — substitui a
          declaração de 3,6rem
          que terminava a seção ("Você pode simplesmente chegar e começar.") —
          uma frase de efeito ocupando meia tela para dizer o que os dois
          parágrafos acima já tinham dito. As cinco palavras dizem mais: são a
          informação que a pessoa procura.

          O SEPARADOR É O MESMO PONTO ROXO da linha do tempo (05) e do mural de
          bairros (08). A página tem UM separador, e é ele — um segundo desenho
          aqui viraria dialeto novo por nada. O filete em cima da faixa é o que
          a descola dos parágrafos sem precisar de caixa: as categorias são
          outra camada de informação, não a continuação da frase.

          ⚠️ NÃO TRANSFORMAR AS CATEGORIAS EM CARTÕES. Elas já foram texto
          colado no fim de um parágrafo e agora são uma faixa; o passo seguinte
          — uma borda em volta de cada uma — promete um filtro clicável que não
          existe, e a página inteira leva a uma conversa no WhatsApp. */}
      <section className="bg-bone py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          {/* MESMA GRADE DA SEÇÃO 03: título à esquerda, prosa à direita,
              ancoradas no topo, `lg:gap-24` entre elas. As duas composições de
              duas colunas da página respiram igual — e é de propósito que a
              medida seja a mesma nas duas, senão elas leem como dois acidentes
              parecidos em vez de uma forma. */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-24">
            <Reveal>
              <span className={EYEBROW}>{PARA_QUEM.eyebrow}</span>
              <h2 className={`${H2_CALMO} mt-5 max-w-[16ch] text-foreground`}>
                <Chave t={PARA_QUEM.titulo} />
              </h2>
            </Reveal>

            <Reveal variant="right" delay={110}>
              {PARA_QUEM.paragrafos.map((paragrafo, i) => (
                <p
                  key={i}
                  className={`${PROSA} leading-relaxed text-muted-foreground ${i > 0 ? "mt-5" : ""}`}
                >
                  <Prosa partes={paragrafo} />
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={140} className="mt-12 sm:mt-14">
            {/* `<ul>` de verdade: para o leitor de tela isto é uma lista de
                cinco públicos. O ponto entre elas é `aria-hidden`, senão a
                lista sai como "Crianças, ponto, Jovens, ponto".

                ⚠️ O PONTO SÓ EXISTE ONDE OS CINCO CABEM NUMA LINHA (`md` para
                cima), e essa é a correção de um defeito que nenhuma das duas
                versões anteriores resolvia. Um separador entre palavras não
                sobrevive à quebra de linha: com o ponto DEPOIS do nome, a
                primeira linha terminava em "Adultos ·", pendurado na borda;
                com o ponto ANTES — que foi a tentativa seguinte — a segunda
                linha COMEÇAVA com um ponto solto na margem esquerda, que é o
                que se via no celular. Não há terceiro lado: enquanto a faixa
                quebrar, um dos dois órfãos aparece.

                Então onde ela quebra o separador simplesmente não entra, e
                quem separa as palavras é o espaço — que é separador legítimo e
                não deixa resto em ponta de linha. A regra do "a página tem UM
                separador" continua de pé: ele não foi trocado por outro
                desenho, ele só não é usado onde não funciona.

                A FAIXA É CENTRALIZADA em todas as larguras, e não só no
                celular. Em linha única ela ocupava uns dois terços do
                container e deixava o resto vazio à direita, o que a fazia ler
                como uma frase interrompida em vez do fecho da seção.

                O `max-w-[19rem]` é a medida que força a quebra depois da
                terceira palavra — "Crianças · Jovens · Adultos" em cima,
                "Casais · Famílias" embaixo. Sem ele a quebra cai onde a
                largura do aparelho mandar, e num celular grande sobra uma
                palavra sozinha na segunda linha. Ele sai no `md`, junto com a
                volta dos pontos. */}
            {/* O FILETE FICA NUM EMBRULHO DE LARGURA CHEIA, e não na `<ul>`:
                a lista agora tem medida curta no celular, e um `border-t` nela
                encolheria a régua junto — o fio que descola a faixa dos
                parágrafos precisa atravessar a seção inteira. */}
            <div className="border-t border-border pt-8">
              <ul className="mx-auto flex max-w-[19rem] flex-wrap items-baseline justify-center gap-x-7 gap-y-3 md:max-w-none">
                {PARA_QUEM.categorias.map((categoria, i) => (
                  <li key={categoria} className="flex items-baseline gap-7">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="hidden h-[5px] w-[5px] shrink-0 -translate-y-[0.35em] rounded-full bg-grape/55 md:block"
                      />
                    )}
                    <span className="font-display text-[clamp(1.05rem,2.2vw,1.5rem)] font-medium leading-[1.1] text-foreground">
                      {categoria}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 07 · A PAREDE DE CÉLULAS ═══════════════════════════════════════
          A SEÇÃO NÃO TEM UMA FOTO: ELA É UM VÃO. A colagem das vinte e quatro
          células fica parada atrás da página, e esta seção é o buraco por onde
          se enxerga essa parede — quem se move é o texto, que sobe por cima
          dela, e não a fotografia. Era um mosaico de seis fotos escolhidas a
          dedo; virou a parede inteira, e as seis continuam lá dentro.

          É A PROVA DA PÁGINA, e é por isso que ela é a única seção sem
          argumento: depois de nove parágrafos dizendo que a igreja acontece
          nas casas, uma parede de vinte e quatro salas de verdade. Rolar por
          ela devagar é o ponto — a seção é mais alta que a tela de propósito,
          para que a passagem dure.

          ═══ COMO A PAREDE FICA PRESA ═══

          Duas camadas na MESMA CÉLULA DA GRADE (`col-start-1 row-start-1` nas
          duas): a parede embaixo, o texto em cima. Grade e não `absolute`
          porque a camada de baixo precisa continuar no fluxo — é o fluxo que
          faz o `sticky` funcionar.

          ⚠️ A COLUNA DA PAREDE NÃO PODE GANHAR `overflow-hidden`. Parece a
          coisa óbvia a fazer (recortar a parede na seção) e é justamente o que
          quebra tudo: `overflow` em qualquer ancestral de um `sticky` vira o
          scrollport dele, o pin passa a valer para uma caixa que não rola, e a
          parede desce junto com a página como se nada existisse. Ela já está
          contida sem isso — um elemento grudento nunca sai do próprio bloco de
          contenção, que aqui é a célula da grade, que é a seção. O porquê
          completo, e por que não é `background-attachment: fixed` nem
          `position: fixed`, está no `globals.css`, no bloco `.janela`.

          ═══ E A PAREDE ANDA SOZINHA ═══

          A janela desliza pela página quando você rola; a parede percorre a
          colagem mesmo quando você para. São dois movimentos independentes e
          é a soma deles que faz a seção parecer um vão para alguma coisa que
          está viva atrás — uma parede parada atrás de um buraco é um pôster.

          Ela vai de ponta a ponta e VOLTA, em vez de girar em looping: a
          colagem tem as fileiras das pontas truncadas pela borda do arquivo,
          e emendar duas cópias trazia essas sobras cortadas para o meio da
          tela. O porquê inteiro está no `globals.css`, em `.janela-parede`.

          O `-z-10` PÕE A PAREDE ATRÁS DO TEXTO sem tirá-la da seção: o
          `isolate` cria um contexto de empilhamento próprio, então o número
          negativo desce até o fundo DESTA seção e não vaza para as vizinhas.

          OS DOIS VÉUS não são exagero, são a conta do contraste. A colagem é
          um mosaico claro — dezenas de fotos com flash — e branco sobre ela
          crua fica ilegível. O chapado derruba tudo para uma tinta escura; o
          gradiente reforça topo e pé, onde a seção encosta nas vizinhas e o
          encontro apareceria como uma linha. */}
      <section className="janela relative isolate grid bg-plum-deep">
        <div className="col-start-1 row-start-1 -z-10">
          <div className="sticky top-0 h-svh overflow-hidden">
            {/* UMA CÓPIA SÓ, E ELA VAI E VOLTA. Aqui havia duas colagens
                empilhadas girando em looping infinito (-50% da pista, para
                que a volta caísse entre dois quadros idênticos). A emenda era
                perfeita em geometria e defeituosa em fotografia: a colagem é
                um mosaico de canvas fixo, e a ÚLTIMA FILEIRA DE CADA COLUNA é
                uma fatia truncada pela borda do arquivo — 96px na primeira
                coluna, 146 na terceira, gente cortada no meio da cabeça. Ao
                emendar, essa faixa de sobras aparecia no MEIO da janela,
                colada na primeira fileira, que é truncada pelo mesmo motivo.
                Duas fileiras de fotos cortadas juntas no meio da tela.

                As calhas das quatro colunas não se alinham em altura nenhuma,
                então não existe recorte da colagem que resolva isso sem
                perder fotos — e o que a parede tem de melhor é ter as vinte e
                quatro. O que dá para fazer é NUNCA EMENDAR: uma cópia só,
                percorrida de cima a baixo e de volta. As fatias truncadas
                continuam existindo, mas agora só encostam na borda de cima e
                na de baixo da janela, que é onde toda parede rolando corta
                fotos — ali o corte lê como janela, não como defeito.

                ⚠️ SÓ DÁ PARA VOLTAR AO LOOPING INFINITO REFAZENDO A COLAGEM,
                com cada coluna somando exatamente a altura do arquivo em
                fotos inteiras. Enquanto o arquivo for este, duas cópias
                trazem a faixa cortada de volta.

                `min-h-[130svh]` junto do `aspect`: a colagem é retrato
                (1800×2008) e no desktop ela nasce bem mais alta que a janela,
                que é o que dá o que percorrer. No celular a proporção a
                deixaria MAIS BAIXA que a tela — e uma parede da altura exata
                da janela não tem para onde ir. O piso de 130svh garante o
                percurso nas duas orientações; o `object-cover` cuida do corte
                lateral que isso custa no retrato. */}
            <div
              aria-hidden
              className="janela-parede absolute inset-x-0 top-0 aspect-[900/1004] min-h-[130svh] w-full"
            >
              <Image
                src={GALERIA.parede.src!}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-plum-deep/72" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-plum-deep/75 via-plum-deep/35 to-plum-deep/80"
            />
          </div>
        </div>

        <div className="relative col-start-1 row-start-1 flex min-h-[118svh] items-center">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <Reveal variant="blur">
              <p className="font-display max-w-[14ch] text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.05] text-white">
                {GALERIA.frase}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 08 · CÉLULAS POR INDAIATUBA ════════════════════════════════════
          A seção que responde "tem uma perto de mim?", e ela responde com
          TIPOGRAFIA, não com mapa. Um mapa com pino promete endereço, e
          endereço é justamente o que este site não publica (ver o cabeçalho do
          `lib/cells.ts`): dia, hora e rua mudam demais para viver num arquivo
          versionado, e informação velha manda alguém para uma casa vazia. O
          que a página oferece é o reconhecimento — "o meu bairro está aí" — e
          depois uma conversa.

          ⚠️ ESTA SEÇÃO PERDEU O FUNDO, e não por engano. A colagem de todas
          as células ficava aqui atrás, a 5,5% e desfocada. Ela saiu quando a
          seção de cima virou uma JANELA para essa mesma colagem em tamanho
          real: a mesma imagem em cheio e, uma rolagem depois, quase apagada
          não lê como rima — lê como a mesma coisa duas vezes, a segunda com
          defeito. O mural aguenta o `sand` puro; o que sustenta esta seção é a
          tipografia, e ela não precisava de textura para isso.

          TODOS OS BAIRROS SAEM DO MESMO TAMANHO. Havia uma escala — o nome
          crescia com o número de células — e ela dependia da legenda em caixa
          alta que explicava a regra; retirada a legenda, a diferença de corpo
          passou a dizer "este bairro importa mais", que é o contrário do que a
          seção quer. O porquê inteiro está no
          `components/celulas/MuralDeBairros.tsx`. */}
      <section className="bg-sand py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="text-center">
            <span className={EYEBROW}>{BAIRROS.eyebrow}</span>
            <h2 className={`${H2} mx-auto mt-5 max-w-[16ch] text-foreground`}>
              <Chave t={BAIRROS.titulo} />
            </h2>
            <p className={`mx-auto mt-6 ${PROSA_LARGA} leading-relaxed text-muted-foreground`}>
              {BAIRROS.copy}
            </p>
            {/* Os dois números são DERIVADOS da lista de células, nunca
                digitados: acrescentar uma linha ao `lib/cells.ts` corrige esta
                frase sozinho. */}
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {cells.length} células
              </span>{" "}
              em{" "}
              <span className="font-medium text-foreground">
                {neighborhoodGroups.length} bairros
              </span>{" "}
              de Indaiatuba.
            </p>
          </Reveal>

          <Reveal variant="blur" delay={120} className="mt-14 sm:mt-16">
            <MuralDeBairros />
          </Reveal>
        </div>
      </section>

      {/* ═══ 09 · MULTIPLICAÇÃO ═════════════════════════════════════════════
          A seção mais curta da página, e a única sem foto no claro. Depois do
          mosaico e do mural — duas seções densas seguidas — ela é o respiro
          antes do fecho.

          NÃO EXPLICA A ESTRUTURA. Não há organograma, não há "líder de célula
          → supervisor → pastor de rede": o briefing pediu para não aprofundar,
          e faz sentido — quem ainda não entrou numa célula não está decidindo
          sobre hierarquia. Quem quiser o caminho inteiro tem o link para o
          Trilho do Vencedor, que é a página que existe para isso.

          O REFRÃO DE DUAS LINHAS é o elemento gráfico da seção e ocupa a
          coluna maior. É o encargo da igreja, e desde que a seção 03 foi
          enxugada esta é a ÚNICA vez em que ele aparece em corpo grande na
          página — lá ele ficou dentro da prosa, em voz baixa. Repetir de longe
          fecha o argumento; repetir na mesma tela, como a 03 fazia consigo
          mesma, era eco. Não é roxo: o roxo desta seção já está em "cuidar de
          pessoas", na manchete. */}
      <section className="bg-bone py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal variant="left">
              <span className={EYEBROW}>{MULTIPLICACAO.eyebrow}</span>
              <h2 className={`${H2} mt-5 max-w-[14ch] text-foreground`}>
                <Chave t={MULTIPLICACAO.titulo} />
              </h2>
            </Reveal>

            <Reveal variant="right" delay={110}>
              {MULTIPLICACAO.paragrafos.map((p, i) => (
                <p
                  key={i}
                  className={`${PROSA} leading-relaxed text-muted-foreground ${i > 0 ? "mt-4" : ""}`}
                >
                  {p}
                </p>
              ))}

              <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {MULTIPLICACAO.refraoIntro}
              </p>
              <p className="font-display mt-5 text-[clamp(1.5rem,3.4vw,2.5rem)] font-medium leading-[1.2] text-foreground">
                {MULTIPLICACAO.refrao.map((linha, i) => (
                  <span key={i} className="block">
                    {linha}
                  </span>
                ))}
              </p>

              {/* Link secundário e não botão: o destino é uma página vizinha,
                  não a conversão desta. Um segundo botão cheio aqui competiria
                  com o "Encontre uma célula" que vem logo abaixo. */}
              <Link
                href={MULTIPLICACAO.href}
                className={`group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-plum-deep transition-colors duration-300 hover:text-plum ${FOCO}`}
              >
                {MULTIPLICACAO.link}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 10 · FECHO ═════════════════════════════════════════════════════
          A página abriu com uma foto sem uma palavra em cima e fecha com o
          contrário: a única fotografia da página com texto por cima. É a
          simetria das duas pontas — e é a única vez que vale gastar a
          legibilidade da foto, porque aqui a foto é ambiente e o texto é o
          pedido.

          O QUE GARANTE A LEITURA SÃO DOIS VÉUS, e os dois são necessários: o
          `plum-deep/80` chapado derruba a foto inteira para uma tinta escura, e
          o gradiente por cima reforça as pontas, onde o flash da selfie deixa
          as áreas mais claras. Com os dois, o branco sobre o resultado passa
          folgado em contraste; com um só, o miolo da foto ficava em ~3,5:1 —
          que reprova.

          A FOTO É UMA SELFIE APERTADA de propósito. Escurecida, uma foto de
          plano aberto vira mancha; uma sala cheia de gente encostada uma na
          outra continua legível como "muita gente junta" mesmo a 20% de
          luminosidade. O porquê está também no `lib/celulas.ts`.

          O TEXTO É CENTRALIZADO — a segunda e última vez na página, depois do
          "para quem é". As duas são os dois momentos em que a página fala
          diretamente com uma pessoa só. */}
      <section className="relative isolate overflow-hidden bg-plum-deep">
        <Image
          src={FECHO.foto.src!}
          alt={FECHO.foto.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
        <div aria-hidden className="absolute inset-0 bg-plum-deep/88" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-plum-deep/70 via-plum-deep/45 to-plum-deep/80"
        />

        <div className="relative flex min-h-[64svh] items-center lg:min-h-[74svh]">
          <div className="container mx-auto px-5 py-24 text-center sm:px-8 sm:py-28 lg:px-12">
            <Reveal variant="blur">
              <h2 className="font-display mx-auto max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)] font-medium leading-[1.05] text-white">
                <Chave t={FECHO.titulo} escuro />
              </h2>
            </Reveal>
            {/* UM PARÁGRAFO POR FRASE. `{FECHO.texto}` sozinho imprimia o
                array inteiro, e o React concatena os itens sem separador
                nenhum: a tela publicava "…receber você.Fale com a gente".
                O `mt-2` entre as duas é menor que o `mt-7` que as separa da
                manchete — elas são duas frases do mesmo fôlego, não dois
                blocos. */}
            <Reveal delay={110}>
              {FECHO.texto.map((frase, i) => (
                <p
                  key={i}
                  className={`mx-auto ${PROSA_LARGA} leading-relaxed text-white/85 ${i > 0 ? "mt-2" : "mt-7"}`}
                >
                  {frase}
                </p>
              ))}
            </Reveal>
            <Reveal delay={190}>
              <MagneticButton className="mt-10">
                <a
                  href={ACAO_ENCONTRAR_CELULA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-bone px-9 py-4 text-base font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95 ${FOCO_ESCURO}`}
                >
                  <IconeWhatsApp className="h-[18px] w-[18px] shrink-0" />
                  {FECHO.acao}
                </a>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
