import { copy, fotoLimiar } from "@/lib/radicais";
import { FotoAcervo } from "./FotoAcervo";
import s from "./radicais.module.css";

/**
 * SEÇÃO 09 — O LIMIAR.
 *
 * A seção que apaga a luz. É a ponte entre a página que EXPLICA e a experiência
 * que MOSTRA, e o briefing do redesenho chama isso de "parte essencial" com
 * razão: sem ela, a galeria escura entra como um corte de tinta no meio de uma
 * página de osso.
 *
 * O QUE ACONTECE, na ordem: a seção nasce em osso, a fotografia cresce no meio
 * enquanto o fundo escurece em volta dela, e a frase gigante chega em branco,
 * já dentro do escuro. É a "redução progressiva da luz" do briefing, literal.
 *
 * NÃO HÁ ETIQUETA NEM PARÁGRAFO AQUI, e a ausência é o desenho. Todas as outras
 * seções da página abrem com a etiqueta de versalete; esta não abre com nada,
 * porque a partir daqui a página deixa de nomear as coisas. Uma foto, uma
 * frase, o escuro.
 *
 * A FOTO É O BANDEIRÃO DA REDE, pendurado no ginásio sob refletores azuis. Ela
 * já é escura e da mesma família de tinta do degradê, então não existe um
 * quadro em que a imagem brigue com o fundo que está escurecendo — e é a única
 * do acervo em que a rede aparece pelo NOME, escrito no pano, o que faz dela a
 * assinatura do último quadro antes de a página virar experiência.
 *
 * ⚠️ O VÃO É QUADRADO PORQUE O BANDEIRÃO É QUADRADO, e o arquivo já chega
 * cortado assim — o cru é um retrato de story, comprido demais para uma faixa
 * larga como esta. A conta do corte, do formato e do `sizes` está toda no
 * `lib/radicais.ts`; quem trocar a foto mexe nos dois arquivos.
 *
 * ── O QUE ESTA SEÇÃO NÃO DIZ, DE PROPÓSITO ────────────────────────────────
 *
 * O briefing pede DUAS mensagens aqui: "AINDA NÃO VIVEMOS TUDO" e, perto da
 * entrada da experiência, algo como "não dá para explicar, dá para viver".
 *
 * A SEGUNDA JÁ ESTÁ NO AR, e não aqui: é a abertura da própria galeria — "Isso
 * é Radicais Livres. / Entre na experiência." —, que é a primeira coisa que se
 * lê quando o escuro toma a tela. Repeti-la nesta seção poria as duas frases a
 * meia tela de distância uma da outra, dizendo a mesma coisa duas vezes com
 * palavras quase iguais. A galeria é intocável por decisão do briefing, e neste
 * ponto ela já resolve o que o briefing pede — então o que esta seção faz é
 * PARAR uma frase antes e entregar a deixa.
 *
 * ── A EMENDA COM A GALERIA ────────────────────────────────────────────────
 *
 * ⚠️ O GRADIENTE TERMINA EM #17131f, que é a tinta da galeria (`--gal-bg`) e
 * NÃO o `plum-deep` do site (#180929). Os dois são escuros e primos, e é por
 * isso mesmo que a emenda entre eles apareceria: duas tintas quase iguais lado
 * a lado leem como erro de impressão, não como mudança de seção.
 *
 * ⚠️ A GALERIA TEM AS QUINAS DE CIMA ARREDONDADAS, e elas revelam o fundo da
 * RAIZ da página. Por isso a raiz do `page.tsx` foi para #17131f no redesenho:
 * com ela em `bone`, o arredondado abriria duas cunhas claras em cima desta
 * emenda. As duas pontas precisam concordar — se alguém devolver a raiz para
 * bone, o defeito aparece exatamente aqui.
 *
 * Toda a paleta e as contas do degradê (inclusive por que ele passa pelo roxo
 * em vez de ir do osso ao preto em linha reta) estão no `radicais.module.css`.
 */
export function Limiar() {
  return (
    <section className={s.limiar} aria-labelledby="limiar-titulo">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <figure className={s.limiarFigura}>
          <FotoAcervo
            foto={fotoLimiar}
            sizes="(min-width: 910px) 560px, 62vw"
            className={s.limiarFoto}
          />
        </figure>

        <h2 id="limiar-titulo" className={`${s.cartaz} ${s.limiarFrase}`}>
          {/* AS DUAS LINHAS SÃO QUEBRA DELIBERADA. "Ainda não" sozinho numa
              linha é uma frase inteira e uma promessa; a segunda linha resolve
              o que a primeira deixou no ar. Numa linha só, o par vira uma
              afirmação comum. */}
          <span className={s.limiarLinha}>{copy.limiar.linha1}</span>
          <span className={s.limiarLinha}>
            {copy.limiar.antes2}
            <span className={s.tintaClara}>{copy.limiar.tinta2}</span>
            {copy.limiar.depois2}
          </span>
        </h2>
      </div>
    </section>
  );
}
