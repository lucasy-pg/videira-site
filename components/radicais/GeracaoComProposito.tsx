import { FraseImpacto } from "@/components/quem-somos/FraseImpacto";
import { MissaoVisaoProposito } from "@/components/quem-somos/MissaoVisaoProposito";
import { conceitos, copy, fotosProposito } from "@/lib/radicais";
import { FotoAcervo } from "./FotoAcervo";
import s from "./radicais.module.css";

/**
 * SEÇÃO 05 — UMA GERAÇÃO COM PROPÓSITO.
 *
 * O capítulo em que a página para de dizer QUEM é a rede e passa a dizer o que
 * ela quer ver acontecer num jovem. São três movimentos numa faixa só:
 *
 *   1  A FRASE     "Fomos chamados para marcar a nossa geração."
 *   2  A PAUTA     os cinco conceitos do briefing
 *   3  A RÉGUA     missão, visão e propósito
 *
 * ⚠️ POR QUE A RÉGUA DE MISSÃO/VISÃO/PROPÓSITO CONTINUA NA PÁGINA. O briefing
 * do redesenho diz, para esta seção: "não utilizar formato corporativo de
 * missão; visão; valores". Ele está certo sobre o FORMATO e não sobre o
 * conteúdo — e os dois não são a mesma coisa. Aqueles três textos são da rede:
 * a missão veio da liderança no Figma de 17/08/2026 e o propósito é citação
 * literal do pr. Naor Pedroza, de 2000. Apagá-los seria jogar fora a única
 * copy oficial que esta parte da página tem, e o briefing manda no sentido
 * oposto: "preservar informações reais existentes".
 *
 * O que a seção faz, então, é o que o briefing pede de verdade: o formato
 * corporativo não existe aqui. Não há três cards lado a lado — a régua é
 * empilhada, desalinhada e sem caixa nenhuma, e ela chega DEPOIS dos cinco
 * conceitos, como o rodapé documental de um capítulo cujo protagonista é a
 * pauta. Quem varre a seção lê os cinco conceitos; quem quer saber de onde eles
 * vêm continua descendo.
 *
 * ⚠️ OS DOIS COMPONENTES IMPORTADOS SÃO OS DA SEÇÃO 02 E NÃO FORAM TOCADOS. O
 * `FraseImpacto` e o `MissaoVisaoProposito` continuam morando em
 * `components/quem-somos/` com o CSS deles e o gatilho de entrada deles. Eles
 * MUDARAM DE LUGAR na página, não de
 * implementação — antes eram os movimentos 3 e 4 do "Quem somos", que o
 * redesenho desmembrou.
 *
 * O QUE ESTA SEÇÃO PRECISA DEVOLVER PARA ELES é o que a `.secao` do
 * `quem-somos.module.css` dava e que ficou para trás na mudança: fundo `bone` e
 * `overflow-x: clip`. Os dois estão no `.proposito` do módulo daqui. Sem o
 * segundo, a indentação em `vw` dos três blocos da régua abre rolagem lateral
 * nas telas estreitas — que é exatamente o defeito que o `html { overflow-x:
 * clip }` do `globals.css` existe para não precisar consertar duas vezes.
 *
 * ⚠️ AS CINCO FRASES DOS CONCEITOS SÃO PLACEHOLDER ESTRUTURAL. As PALAVRAS são
 * do briefing; as frases foram escritas para caber no desenho sem inventar
 * doutrina, e cada uma ecoa alguma coisa que a rede já diz em outro ponto da
 * página. Ver o `lib/radicais.ts`, onde está a procedência de cada uma.
 */
export function GeracaoComProposito() {
  return (
    <section className={s.proposito} aria-labelledby="proposito-titulo">
      {/* AS DUAS FOTOS SOLTAS vêm PRIMEIRO no DOM, e não é descuido: são
          pintura de fundo (`z-index: 1`, atrás da pauta), e um leitor de tela
          que as encontrasse no meio dos conceitos interromperia a pauta para
          descrever uma imagem que não pertence a nenhum item dela. Aqui elas
          são anunciadas antes, junto do título, onde não partem nada.

          No celular elas simplesmente não existem (`display: none`) — ver o
          porquê no módulo. */}
      <div className={s.propositoFotos} aria-hidden="true">
        <FotoAcervo
          foto={fotosProposito.alta}
          sizes="(min-width: 1700px) 220px, (min-width: 1024px) 13vw, 1px"
          className={`${s.propFoto} ${s.propAlta}`}
        />
        <FotoAcervo
          foto={fotosProposito.baixa}
          sizes="(min-width: 1670px) 200px, (min-width: 1024px) 12vw, 1px"
          className={`${s.propFoto} ${s.propBaixa}`}
        />
      </div>

      <div className="container relative z-[2] mx-auto px-5 sm:px-8 lg:px-12">
        <p className={s.etiqueta}>{copy.proposito.etiqueta}</p>

        {/* A FRASE DE IMPACTO É O TÍTULO DESTE CAPÍTULO. Ela já era um `<p>`
            grande no desenho antigo e continua sendo — o `<h2>` acessível da
            seção é a linha invisível logo abaixo, que nomeia o capítulo sem
            duplicar uma frase de cartaz na estrutura de títulos. */}
        <h2 id="proposito-titulo" className="sr-only">
          {copy.proposito.etiqueta}
        </h2>

        <FraseImpacto />

        <ol className={s.pauta}>
          {conceitos.map((c, i) => (
            <li key={c.palavra} className={s.conceito}>
              {/* O ZERO À ESQUERDA É GERADO, não escrito: inverter a ordem da
                  lista no `lib/radicais.ts` renumera sozinho, e é impossível
                  publicar um "02" em terceiro lugar por descuido de revisão. */}
              <span className={s.conceitoNumero}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`${s.display} ${s.conceitoPalavra}`}>
                {c.palavra}
              </span>
              <span className={s.conceitoFrase}>{c.frase}</span>
            </li>
          ))}
        </ol>

        <div className={s.regua}>
          <MissaoVisaoProposito />
        </div>
      </div>
    </section>
  );
}
