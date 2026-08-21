import { identidade, marcaDagua } from "@/lib/quem-somos";
import s from "./quem-somos.module.css";

/**
 * MOVIMENTO 4 — missão, visão e propósito.
 *
 * NÃO SÃO TRÊS CARDS LADO A LADO, e a proibição é a parte importante da
 * especificação. A versão anterior desta página já tentou os dois formatos de
 * caixa — primeiro três colunas iguais, depois um bentô com o propósito numa
 * coluna alta — e os dois davam o mesmo defeito: peso de embalagem igual para
 * conteúdo de peso diferente faz uma identidade ler como formulário.
 *
 * Aqui os três estão empilhados e desalinhados entre si, com indentação
 * crescente. O desalinho é o que obriga o olho a recomeçar a leitura em cada
 * bloco, em vez de varrer uma coluna de itens equivalentes.
 *
 * A NUMERAÇÃO É GERADA, NÃO ESCRITA. `01`, `02`, `03` saem do índice, então
 * inverter a ordem da lista no `lib/quem-somos.ts` renumera sozinho — e é
 * impossível publicar um "02 / VISÃO" em terceiro lugar por descuido de
 * revisão. O `padStart` é o que mantém o zero à esquerda, que é o que faz a
 * numeração ler como régua e não como lista de compras.
 *
 * ⚠️ O PROPÓSITO É CITAÇÃO E OS OUTROS DOIS NÃO SÃO. É por isso que ele leva
 * aspas, itálico e assinatura, e é por isso que o campo se chama `citacao` e
 * não `texto` — a diferença é de PROCEDÊNCIA, não de estilo. As aspas
 * tipográficas e o `<blockquote>` dizem, para quem lê e para quem escuta, que
 * ali estão as palavras de outra pessoa. Ver o `lib/quem-somos.ts`.
 *
 * A ENTRADA ESTÁ PRESA À ROLAGEM, E NÃO A UM GATILHO — os três saem da borda
 * esquerda da página, alcançam o próprio lugar por volta do meio da tela e
 * seguem derivando enquanto a rolagem continua. É `animation-timeline: view()`
 * puro, escrito em `.bloco1/2/3` no módulo, junto das contas e da degradação.
 *
 * ⚠️ ISTO SUBSTITUIU UM `<Reveal>` POR BLOCO (com 180ms de escada entre eles),
 * e o motivo de não voltar atrás é que os dois não podem coexistir: o Reveal
 * dispara por `IntersectionObserver` a 15% de visibilidade, e a linha do tempo
 * de rolagem começa a andar assim que o bloco encosta na borda de baixo. Somados,
 * o bloco desliza invisível durante meia entrada e só então acende. Ou é um, ou
 * é o outro.
 *
 * O ganho de tirar o Reveal daqui é que este componente voltou a ser SERVIDOR
 * inteiro — a régua não tem mais nenhum JavaScript.
 *
 * A MÃO ATRÁS DOS TRÊS É `background`, E NÃO UMA IMAGEM NA MARCAÇÃO. Ela não
 * acrescenta nada a quem lê a missão — é carimbo, não conteúdo —, então entra
 * pelo `::before` do módulo, sem nó na árvore e sem nada para anunciar num
 * leitor de tela. O caminho do arquivo chega por variável porque nome de
 * arquivo mora no `lib/quem-somos.ts`, com o resto do acervo; é a mesma
 * combinação do `--foto-radical` do movimento 2.
 */
export function MissaoVisaoProposito() {
  return (
    <div
      className={s.identidade}
      style={
        {
          "--marca": `url("${marcaDagua.src}")`,
          "--marca-proporcao": `${marcaDagua.w} / ${marcaDagua.h}`,
        } as React.CSSProperties
      }
    >
      {identidade.map((item, i) => (
        <div key={item.rotulo} className={[s.bloco1, s.bloco2, s.bloco3][i]}>
          <p className={s.blocoCabeca}>
            <span className={s.blocoNumero}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className={s.blocoRotulo}>
              /
            </span>
            <span className={s.blocoRotulo}>{item.rotulo}</span>
          </p>

          <div className={s.blocoRegua} />

          {"citacao" in item ? (
            <blockquote>
              <p className={`${s.serifa} ${s.blocoCorpo} ${s.blocoCitacao}`}>
                “{item.citacao}”
              </p>
              <footer className={s.blocoFonte}>— {item.fonte}</footer>
            </blockquote>
          ) : (
            <p className={`${s.serifa} ${s.blocoCorpo}`}>{item.texto}</p>
          )}
        </div>
      ))}
    </div>
  );
}
