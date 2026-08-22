import { Reveal } from "@/components/Reveal";
import { colagemAbertura, copy } from "@/lib/quem-somos";
import s from "./quem-somos.module.css";

/**
 * MOVIMENTO 1 — a abertura.
 *
 * Etiqueta, a frase que vira do romano para o itálico, e então uma coluna de
 * texto estreita ao lado de quatro fotografias. Nada mais na mesma altura de
 * tela: a pausa É o desenho, e qualquer coisa a mais aqui a desmancha.
 *
 * SEM COREOGRAFIA PRÓPRIA — este movimento usa o `<Reveal>` do projeto, o mesmo
 * do resto do site. A linha do tempo com ordem interna começa no movimento 2, e
 * trazê-la para cá faria a abertura competir com o letreiro. Aqui só há o
 * parallax da colagem, que é CSS puro e vive no módulo.
 *
 * A COLAGEM É UM `<div>` COM TRÊS `<img>` ABSOLUTAS, e não uma lista: elas não
 * são itens equivalentes de um conjunto, são três posições fixas de uma
 * composição, cada uma com largura, proporção de quadro, enquadramento, ângulo,
 * camada e deriva próprios. Um `.map()` aqui esconderia isso atrás de um índice
 * e faria trocar a primeira foto pela segunda parecer inofensivo — não é: o
 * quadro da 1 corta um terço da altura do arquivo e o da 2 quase não corta.
 *
 * ⚠️ A COMPOSIÇÃO FOI REDESENHADA TRÊS VEZES EM 18/08/2026 e o módulo guarda as
 * três críticas, porque juntas elas cercam a resposta: "não esse bloco de
 * imagens formando esse quadrado", depois "ficou muito separado e acabou
 * ficando estranho, o bloco tem que estar próximo", e enfim "ficou muito
 * poluído e cheio... quero voltar para o mais minimalista e abstrato,
 * preservando porém a sombra geométrica atrás". Nenhuma arrumação resolvia: o
 * problema era a CONTAGEM de peças. Saiu uma fotografia e saiu uma das duas
 * manchas; as três que ficaram voltaram a ser tortas.
 *
 * Aqui no JSX o que mudou foi a quarta `<img>` sumir e a segunda mancha junto.
 * Toda a geometria, os ângulos e os limites das derivas estão no
 * `quem-somos.module.css`, onde as contas moram junto das posições.
 */
export function AberturaEditorial() {
  const [primeira, segunda, terceira] = colagemAbertura;

  return (
    <div className={s.abertura}>
      <Reveal variant="left">
        <p className={s.etiqueta}>{copy.etiqueta}</p>
        <h2 className={`${s.display} ${s.frase}`}>
          <span className={s.fraseLinha}>{copy.abertura.primeira}</span>
          <span className={s.fraseVirada}>{copy.abertura.segunda}</span>
        </h2>
      </Reveal>

      <div className={s.introducao}>
        <Reveal variant="left" delay={80}>
          {/* `<strong>` E NÃO UM `<span>` COM PESO: o negrito daqui é ênfase de
              leitura de verdade, não gesto tipográfico. Quem ouve a página num
              leitor de tela deve ouvir "jovens e adolescentes" e "mais de 30
              países" destacados — é o resumo do parágrafo. (Compare com o
              itálico do `FraseImpacto`, que é o oposto e por isso usa `span`.)

              A chave é o índice porque os pedaços não têm identidade própria:
              são fatias de uma frase, e duas delas podem ter o mesmo texto. */}
          <p className={s.introTexto}>
            {copy.introducao.map((parte, i) =>
              parte.forte ? (
                <strong key={i}>{parte.texto}</strong>
              ) : (
                <span key={i}>{parte.texto}</span>
              )
            )}
          </p>
        </Reveal>

        <Reveal variant="right" delay={160}>
          <div className={s.colagem}>
            {/* A MANCHA VEM PRIMEIRO NO DOM porque é ali que ela pertence na
                leitura de quem não vê nada disto: é pintura de fundo,
                `aria-hidden`, e um leitor de tela que a encontrasse entre duas
                fotografias teria de anunciar um nada no meio da composição. A
                ordem visual quem resolve é o `z-index: 0` do módulo. */}
            <div aria-hidden="true" className={s.forma} />

            {/* eslint-disable @next/next/no-img-element */}
            <img
              src={primeira.src}
              alt={primeira.alt}
              width={primeira.w}
              height={primeira.h}
              loading="lazy"
              decoding="async"
              className={`${s.carta} ${s.carta1}`}
            />
            <img
              src={segunda.src}
              alt={segunda.alt}
              width={segunda.w}
              height={segunda.h}
              loading="lazy"
              decoding="async"
              className={`${s.carta} ${s.carta2}`}
            />
            <img
              src={terceira.src}
              alt={terceira.alt}
              width={terceira.w}
              height={terceira.h}
              loading="lazy"
              decoding="async"
              className={`${s.carta} ${s.carta3}`}
            />
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
