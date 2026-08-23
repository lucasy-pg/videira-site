import { AberturaEditorial } from "./AberturaEditorial";
import s from "./quem-somos.module.css";

/**
 * SEÇÃO 02 — JOVENS DESTINADOS AO AVIVAMENTO.
 *
 * A primeira faixa clara da página, e a primeira coisa que se lê depois da capa
 * escura. Etiqueta, a frase que vira do romano para o itálico, uma coluna de
 * texto estreita e a colagem de três fotografias tortas. Nada mais na mesma
 * altura de tela: a pausa É o desenho, e qualquer coisa a mais aqui a desmancha.
 *
 * ── ESTA SEÇÃO JÁ FOI QUATRO ──────────────────────────────────────────────
 *
 * ⚠️ ELA SE CHAMAVA "QUEM SOMOS" E TINHA QUATRO MOVIMENTOS numa faixa só:
 * abertura, o letreiro RADICAL LIVRES, a frase de impacto e a régua de
 * missão/visão/propósito. O redesenho de 21/08/2026 desmembrou os quatro pela
 * narrativa nova da página, e é útil saber para onde cada um foi:
 *
 *   1  ABERTURA          ficou aqui, e virou a seção 02 sozinha
 *   2  RADICAL LIVRES    aposentado — o sucessor é a seção 03,
 *                        `components/radicais/DuasPalavras.tsx`
 *   3  FRASE DE IMPACTO  abre a seção 05, "Uma geração com propósito"
 *   4  IDENTIDADE        fecha a mesma seção 05
 *
 * OS COMPONENTES 3 E 4 NÃO FORAM TOCADOS. Continuam morando nesta pasta, com o
 * CSS deles e o gatilho de entrada deles — mudaram de lugar na página, não de
 * implementação. Quem for editá-los edita
 * aqui; quem for entender por que eles estão onde estão lê o
 * `components/radicais/GeracaoComProposito.tsx`.
 *
 * O NOME DA PASTA FICOU. "quem-somos" já não descreve uma seção da página, e
 * renomeá-la para acompanhar o desenho custaria um commit de puro ruído em
 * cinco arquivos que continuam certos por dentro. Se algum dia o resto da pasta
 * mudar de verdade, é a hora de renomear junto.
 *
 * ── O CONTRATO COM O RESTO DA PÁGINA ──────────────────────────────────────
 *
 * FUNDO `bone`. A seção 03, logo abaixo, também é `bone` — e é a única emenda
 * clara-clara da página. Não há linha divisória entre as duas de propósito: a
 * 03 abre com uma palavra do tamanho da tela, e é ela que marca o começo do
 * capítulo novo. Uma régua ali seria pontuação em cima de um cartaz.
 *
 * O `container` VOLTA AQUI DENTRO, com o mesmo respiro lateral das seções
 * vizinhas. A colagem sangra para fora dele de propósito em alguns pontos;
 * quem recorta é o `overflow-x: clip` da própria seção.
 */
export function QuemSomos() {
  return (
    /* `id` E `scroll-mt`: a capa aponta para cá. O botão "Quem somos" da
       primeira dobra é uma âncora interna, e este é o destino dela — a etiqueta
       desta seção diz exatamente "Quem somos", que é o que faz o rótulo do
       botão e o lugar onde ele chega serem a mesma palavra.

       O `scroll-mt` repete o da galeria (o outro destino de âncora da página),
       e nesta rota ele é respiro e não correção: o Header é ESTÁTICO aqui (ver
       `ROTAS_HEADER_ESTATICO`), então não há barra fixa cobrindo o topo do
       destino — o que sobra é a seção chegar um dedo abaixo da borda em vez de
       colada nela. */
    <section id="quem-somos" className={`${s.secao} scroll-mt-16 sm:scroll-mt-20`}>
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <AberturaEditorial />
      </div>
    </section>
  );
}
