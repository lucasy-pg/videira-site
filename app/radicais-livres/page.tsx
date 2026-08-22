import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

import { CapaRadicais } from "@/components/CapaRadicais";
import { QuemSomos } from "@/components/quem-somos/QuemSomos";
import { DuasPalavras } from "@/components/radicais/DuasPalavras";
import { Contramao } from "@/components/radicais/Contramao";
import { GeracaoComProposito } from "@/components/radicais/GeracaoComProposito";
import { Celulas } from "@/components/radicais/Celulas";
import { Culto } from "@/components/radicais/Culto";
import { Lideranca } from "@/components/radicais/Lideranca";
import { Limiar } from "@/components/radicais/Limiar";
import { Galeria } from "@/components/galeria/Galeria";
import { InstagramDaRede } from "@/components/radicais/InstagramDaRede";
import { ConviteFinal } from "@/components/radicais/ConviteFinal";

/**
 * ═══ A TIPOGRAFIA DESTA ROTA ══════════════════════════════════════════════
 *
 * DUAS VOZES DE TÍTULO, e a divisão entre elas é uma pergunta só, feita a cada
 * título da página:
 *
 *   O TÍTULO INFORMA?         → MANROPE, a fonte de manchete do site inteiro.
 *                               Chega pelo token `--font-display`, sem troca
 *                               nenhuma nesta rota. Nesta página: as seções
 *                               06, 07, 08 e 12.
 *
 *                               ⚠️ ISTO MUDOU DUAS VEZES EM POUCOS DIAS. Esta
 *                               rota rodou em Poppins e, quando o site trocou
 *                               para Manrope (22/08/2026), ficou de fora por
 *                               um tempo — a tipografia daqui é direção de
 *                               arte, não gabarito. O Lucas então pediu a
 *                               Poppins fora daqui também, e com isso a
 *                               família saiu do projeto: `app/layout.tsx` não
 *                               a carrega mais.
 *
 *   O TÍTULO É A COMPOSIÇÃO?  → INSTRUMENT SERIF, carregada logo abaixo.
 *                               RADICAIS, LIVRES, CONTRAMÃO, AINDA NÃO VIVEMOS
 *                               TUDO, a frase do convite final, a frase de
 *                               abertura e a de impacto.
 *
 * ⚠️ ISTO NÃO É "CADA SEÇÃO COM UMA FONTE", e a diferença importa porque o
 * briefing proíbe exatamente aquilo ("não utilizar fontes aleatórias apenas
 * para tornar cada seção diferente"). São duas fontes de título e uma de corpo
 * na página inteira, e a segunda tem um trabalho que a primeira não faz.
 *
 * ── POR QUE A SEGUNDA FONTE EXISTE ────────────────────────────────────────
 *
 * A Manrope é uma grotesca de traço quase uniforme: a partir de uns 100px ela
 * vira bloco, sem contraste de haste nem modulação para sustentar uma palavra
 * que ocupa a largura da tela (a Poppins, que ocupava este lugar antes, tinha
 * exatamente o mesmo limite). A Instrument Serif é display de nascença — hastes
 * finíssimas, contraste alto, e um itálico que se INCLINA de verdade em vez de
 * se limitar a pender.
 *
 * ⚠️ E O ITÁLICO É O QUE FECHA A QUESTÃO. A Manrope não tem itálico no Google
 * Fonts, então `font-style: italic` sob ela cai no oblíquo sintético do
 * navegador — numa grotesca de 250px isso entorta cada "O" de forma evidente.
 * Vale para o site inteiro, não só para cá. Três peças da página dependem do itálico de verdade: a
 * palavra LIVRES (é metade do contraste narrativo com RADICAIS), a linha
 * "Avivamento!" da seção 02 e a citação do pr. Naor na régua de identidade.
 *
 * É A MESMA FAMÍLIA DA INSTRUMENT SANS que roda no corpo do texto desta página
 * — são companheiras de projeto, do mesmo estúdio. Não é coincidência
 * aproveitada depois do fato: é o que impede a página de ler como enxerto de
 * outro site. O CORPO É A ÚNICA COISA QUE AINDA ESCAPA DA MANROPE no site:
 * `.tipografia-radicais` (globals.css) devolve `--font-body` à Instrument Sans
 * só nesta subárvore, para que o par serifa/grotesca continue de pé.
 *
 * ── A FONTE É DECLARADA AQUI E NÃO NO LAYOUT ──────────────────────────────
 *
 * O `next/font` amarra o arquivo à rota em que é importado, então quem abre a
 * Home ou qualquer outra rota não baixa nem um byte dela. No `app/layout.tsx`,
 * o site inteiro pagaria por uma tipografia que existe numa página.
 *
 * PESO 400 É O ÚNICO QUE EXISTE, e a fonte não tem eixo variável nenhum. Isso é
 * bom aqui: dois arquivos pequenos (romano e itálico), os dois usados, nenhum
 * byte de eixo que ninguém percorre.
 *
 * `display: "swap"` com o `adjustFontFallback` padrão do next/font: a fonte é
 * precarregada nesta rota e o substituto do sistema já vem com as métricas
 * ajustadas, então a troca não empurra o layout — que é o que realmente
 * importaria num RADICAIS de 280px.
 *
 * `variable` sem `className`: quem escolhe a fonte é o `.cartaz` dos módulos de
 * CSS, não o elemento raiz. A variável entra na <div> raiz, lá embaixo, e as
 * seções a consultam por `var()`.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Radicais Livres — Igreja Videira Indaiatuba",
  description:
    "A rede de jovens e adolescentes da Igreja Videira. Quem somos, as células de sábado, o Culto de Jovens e como participar em Indaiatuba.",
};

/**
 * A REDE DE JOVENS, em treze movimentos.
 *
 * ── A NARRATIVA, QUE É O ASSUNTO DESTE ARQUIVO ────────────────────────────
 *
 * A página não apresenta um ministério; ela conduz alguém de "o que é isso?"
 * até "eu quero fazer parte disso". A ordem abaixo é essa condução, e ela é a
 * única coisa que este arquivo decide — cada seção resolve a si mesma no
 * próprio componente:
 *
 *   01  CAPA                impacto
 *   02  AVIVAMENTO          identidade — quem são, antes de qualquer conceito
 *   03  RADICAIS / LIVRES   posicionamento — o nome, destrinchado
 *   04  CONTRAMÃO           a pausa entre identidade e propósito
 *   05  GERAÇÃO             propósito — o que a rede quer ver crescer
 *   06  CÉLULAS             pertencimento — onde você cabe, toda semana
 *   07  CULTO               pertencimento — onde todos cabem, todo mês
 *   08  LIDERANÇA           gente, rosto, nome
 *   09  LIMIAR              a página para de explicar
 *   10  EXPERIÊNCIA   ⚠️    a imersão — INTOCADA
 *   11  MURAL         ⚠️    a galeria — INTOCADA
 *   12  INSTAGRAM           a respiração antes do último gesto
 *   13  CONVITE             o pedido
 *
 * ⚠️ AS SEÇÕES 10 E 11 SÃO INTOCÁVEIS POR DECISÃO DO BRIEFING, e as duas são um
 * componente só (`<Galeria />`). Ele não foi aberto no redesenho de 21/08/2026:
 * nem o palco pinado, nem as palavras gigantes, nem o parallax, nem o mural,
 * nem o lightbox, nem uma foto. O que mudou em volta dele foi só o que ele
 * ENCOSTA — ver a seção 09 e a nota sobre a tinta da raiz, logo abaixo.
 *
 * ── O RITMO DE LUZ ────────────────────────────────────────────────────────
 *
 * A página escurece, clareia e escurece de novo, e a última vez não volta:
 *
 *   01 escuro · 02 osso · 03 osso · 04 areia · 05 osso · 06 areia
 *   07 ESCURO · 08 osso · 09 degradê · 10–13 noite
 *
 * O escuro do culto (07) é o único isolado, e é de propósito: ele é o momento
 * mais intenso da parte informativa e o primeiro aviso de que a página vai
 * apagar a luz. A liderança volta ao claro logo depois porque é a seção das
 * PESSOAS, e ela precisa de rosto e respiro. Depois dela a luz não volta.
 *
 * ⚠️ A RAIZ DESTA PÁGINA É #17131f E NÃO `bone`, e isso não é um descuido de
 * quem escreveu o `<div>` lá embaixo. A galeria tem as quinas de cima
 * arredondadas, e o arredondado revela o fundo da RAIZ; com a raiz em `bone`,
 * a emenda escura da seção 09 com a galeria abriria duas cunhas claras
 * exatamente ali. Todas as seções claras pintam o próprio fundo, então a troca
 * não tem outro efeito. Se alguém devolver a raiz para `bone`, o defeito
 * aparece na costura da seção 09.
 *
 * ── O QUE ESTE ARQUIVO NÃO TEM MAIS ───────────────────────────────────────
 *
 * ⚠️ NENHUM CONTEÚDO. Ele tinha ~630 linhas com três listas de dados (os dois
 * encontros, o casal da liderança, os demais líderes), o JSX de quatro seções e
 * um componente de ícone. Tudo isso mora hoje em `lib/radicais.ts` e
 * `components/radicais/`. É a segunda parcela da dívida registrada no
 * `docs/estrutura.md` (seção 7) — "enquanto texto e marcação estiverem
 * trançados, revisar copy exige mexer em componente React"; a primeira foi o
 * `lib/quem-somos.ts`.
 *
 * O QUE ISTO CUSTOU: para saber o que a página diz, agora é preciso abrir
 * outro arquivo. O que comprou: para MUDAR o que ela diz, basta abrir outro
 * arquivo — e é a segunda coisa que acontece toda semana, não a primeira.
 *
 * Um FAQ de seis perguntas e uma seção sobre a Conferência de setembro também
 * já viveram aqui e saíram antes deste redesenho, por decisão de escopo. Estão
 * no histórico do git.
 *
 * ── A NAVEGAÇÃO ───────────────────────────────────────────────────────────
 *
 * A barra do topo é a MESMA do resto do site (o `Header` do `app/layout.tsx`) e
 * nada é montado aqui. A diferença é que nesta rota ela é ESTÁTICA: desenha no
 * alto do documento, sobre a capa, e vai embora com a rolagem em vez de
 * acompanhá-la. Ver `ROTAS_HEADER_ESTATICO` em `lib/overlay-routes.ts`.
 *
 * A razão é a página: são várias peças em tela cheia em sequência — a capa com
 * a colagem vagueando, o palco pinado de RADICAIS/LIVRES e a galeria pinada por
 * seis alturas de tela. Uma barra fixa disputava o quadro com as três, e sobre
 * um trecho pinado era pior que isso: some e volta com a direção da rolagem,
 * então piscava em cima de uma composição que não se move junto.
 *
 * ESTA ROTA TAMBÉM ESTÁ EM `OVERLAY_ROUTES`: o `<main>` solta o `pt-16 sm:pt-20`
 * que reservaria a altura da nav, e o Header fica transparente no topo. As duas
 * listas precisam concordar — se só uma soubesse da rota, daria uma faixa bone
 * acima da capa ou nav branca sobre fundo claro, ilegível.
 */
export default function RadicaisLivres() {
  return (
    /* AS DUAS VOZES ENTRAM NESTA MESMA LINHA, e cada uma por um caminho:

       `tipografia-radicais` DEVOLVE O CORPO À INSTRUMENT SANS — só
       `--font-body`, e só aqui dentro. A manchete NÃO é trocada: ela vem da
       Manrope do site, como em todas as outras rotas. A classe já trocou as
       duas coisas (havia uma Poppins de manchete aqui) e encolheu quando a
       Poppins saiu do projeto; o nome ficou porque a rota continua sendo a
       única com corpo próprio.

       ⚠️ HEADER E FOOTER FICAM DE FORA e isso é intencional: estão acima desta
       <div> na árvore, então a nav e o rodapé desta página são Manrope, iguais
       aos de todas as outras. A exceção é do CONTEÚDO da rota, não da moldura
       do site.

       `instrumentSerif.variable` DECLARA A VARIÁVEL da segunda fonte, que o
       `.cartaz` dos módulos consulta. Uma variável CSS só existe para quem está
       dentro do elemento que a declara: fora desta <div> ela é desconhecida,
       que é exatamente o efeito desejado — nenhuma outra rota herda esta
       tipografia.

       ⚠️ A RAIZ É #17131f E NÃO `bone`. A galeria tem as quinas de cima
       arredondadas, e o arredondado revela o fundo da RAIZ; com a raiz clara, a
       emenda escura da seção 09 com a galeria abriria duas cunhas de osso
       exatamente ali. Todas as seções claras pintam o próprio fundo, então a
       troca não tem nenhum outro efeito. */
    <div className={`${instrumentSerif.variable} tipografia-radicais bg-[#17131f] text-foreground`}>
      <CapaRadicais />
      <QuemSomos />
      <DuasPalavras />
      <Contramao />
      <GeracaoComProposito />
      <Celulas />
      <Culto />
      <Lideranca />
      <Limiar />

      {/* ⚠️ INTOCADA. Seções 10 e 11 do briefing — a experiência imersiva e o
          mural — num componente só. Ver `components/galeria/`, e não mexer:
          o palco pinado, as sete cenas, as palavras gigantes, o parallax, a
          câmera, o lightbox e as 111 fotos do mural estão exatamente como
          estavam. A seção 09 acima existe para ENTREGAR a página a ela, não
          para modificá-la. */}
      <Galeria />

      <InstagramDaRede />
      <ConviteFinal />
    </div>
  );
}
