import { AberturaEditorial } from "./AberturaEditorial";
import { FraseImpacto } from "./FraseImpacto";
import { MissaoVisaoProposito } from "./MissaoVisaoProposito";
import { RadicalLivres } from "./RadicalLivres";
import s from "./quem-somos.module.css";

/**
 * A SEÇÃO "QUEM SOMOS" do /radicais-livres, em quatro movimentos:
 *
 *   1  ABERTURA          etiqueta, a frase que vira, e a colagem de três fotos
 *   2  RADICAL LIVRES    tipografia gigante + fotografia + profundidade
 *   3  FRASE DE IMPACTO  o argumento fechado em duas linhas
 *   4  IDENTIDADE        missão, visão e propósito, empilhados e desalinhados
 *
 * ── O QUE ESTA VERSÃO APOSENTOU ───────────────────────────────────────────
 *
 * Uma LOUSA ESCURA no meio da faixa clara, com o letreiro "Radical / Livre" em
 * letras de célula fixa que trocavam de fonte em onda (Archivo → Anton →
 * Newsreader → Instrument Sans → Archivo, uma letra de cada vez, para sempre),
 * malha milimetrada ao fundo e a régua de missão/visão/propósito num bentô de
 * três painéis de quina viva.
 *
 * Ela saiu inteira, e vale registrar o que morreu junto para quem for procurar
 * no histórico: as fontes ARCHIVO e ANTON (que só existiam na rota por causa
 * dela) e, no `globals.css`, as regras `.malha`, `.letreiro`, `.letreiro-letra`,
 * `.painel` e o `@keyframes ondaFonte`. Os comentários daquelas regras são
 * longos e valem a leitura antes de qualquer tentativa de trazer o efeito de
 * volta — em especial o que explica por que uma animação `infinite` confisca
 * para sempre as propriedades que ela cita, e portanto por que nenhum quadro da
 * onda podia tocar em `font-variation-settings`.
 *
 * A troca não foi de gosto: o desenho novo põe a FOTOGRAFIA dentro da
 * tipografia, e isso exige um fundo claro e uma serifada de alto contraste. A
 * lousa escura foi construída em torno do oposto — extrusão roxa sólida, que só
 * existe sobre escuro, e uma grotesca variável, que é o que a onda precisava.
 * As duas peças não são versões da mesma ideia; são ideias diferentes, e
 * tentar manter as duas na mesma faixa daria uma seção com duas identidades.
 *
 * ── O CONTRATO COM O RESTO DA PÁGINA ──────────────────────────────────────
 *
 * FUNDO `bone` DO INÍCIO AO FIM. A seção 3 logo abaixo é `sand`, e é essa
 * alternância — não uma linha divisória — que separa as faixas no site inteiro.
 *
 * O `container` VOLTA AQUI DENTRO, com o mesmo respiro lateral das seções
 * vizinhas (`px-5 / sm:px-8 / lg:px-12`). A composição do movimento 2 sangra
 * para fora dele de propósito em alguns pontos; quem recorta é o
 * `overflow-x: clip` da própria seção. Ver o módulo.
 */
export function QuemSomos() {
  return (
    <section className={s.secao}>
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <AberturaEditorial />
        <RadicalLivres />
        <FraseImpacto />
        <MissaoVisaoProposito />
      </div>
    </section>
  );
}
