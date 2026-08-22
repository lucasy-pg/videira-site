import { contramao, copy } from "@/lib/radicais";
import { FotoAcervo } from "./FotoAcervo";
import s from "./radicais.module.css";

/**
 * SEÇÃO 04 — A CONTRAMÃO.
 *
 * A pausa entre identidade e propósito, e a seção mais curta da página: uma
 * manchete e uma faixa de fotografias, nada mais. O briefing pede "pouquíssimo
 * texto", e pouquíssimo aqui quer dizer NENHUM parágrafo — a seção não tem
 * prosa, tem uma frase e cinco fotos.
 *
 * O MOVIMENTO É O ARGUMENTO. A faixa anda para a esquerda enquanto a manchete
 * anda para a direita, as duas presas à rolagem: elas se cruzam na tela, que é
 * literalmente o que "contramão" quer dizer. Sem isso a seção seria uma frase
 * grande em cima de uma tira de fotos.
 *
 * ⚠️ E NÃO É UM TICKER INFINITO — o briefing proíbe, e a proibição faz sentido.
 * Um ticker roda sozinho no relógio do navegador, para sempre: é ambiência, e
 * não tem relação nenhuma com a palavra "contramão". Aqui a faixa só anda
 * enquanto VOCÊ rola e para quando você para. O movimento responde ao gesto de
 * quem lê, e é isso que o torna conceitual em vez de decorativo.
 *
 * AS CINCO FOTOS SÃO TODAS DE RUA, e trocar uma por foto de salão desmancha a
 * seção sem que nada pareça errado no código — "contramão" precisa de uma via
 * para ter sentido. A lista e o porquê estão no `lib/radicais.ts`.
 *
 * A FAIXA É `aria-hidden`? NÃO, e é decisão. Ela poderia ser: as cinco fotos
 * não acrescentam informação ao que a frase diz. Mas o site inteiro descreve as
 * fotografias que publica, inclusive as decorativas da galeria, e cinco imagens
 * de jovens na rua são justamente o tipo de coisa que alguém pode querer saber
 * que está ali. As descrições vêm do `lib/galeria.ts`, palavra por palavra.
 *
 * Componente de servidor inteiro — as duas animações são `animation-timeline:
 * view()`, sem script.
 */
export function Contramao() {
  return (
    <section className={s.contramao} aria-labelledby="contramao-titulo">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className={s.contramaoTexto}>
          <p className={s.etiqueta}>{copy.contramao.etiqueta}</p>
          <h2
            id="contramao-titulo"
            className={`${s.cartaz} ${s.contramaoManchete} mt-8`}
          >
            {copy.contramao.antes}
            <span className={s.tinta}>{copy.contramao.tinta}</span>
            {copy.contramao.depois}
          </h2>
        </div>
      </div>

      {/* A FAIXA FICA FORA DO `container` de propósito: ela sangra de borda a
          borda, e o respiro lateral que serve o texto seria justamente o que a
          impediria de sangrar. Quem recorta é o `overflow: clip` do `.faixa`. */}
      <div className={s.faixa}>
        <div className={s.faixaPista}>
          {contramao.map((foto) => (
            <FotoAcervo
              key={foto.src}
              foto={foto}
              sizes="(min-width: 1460px) 380px, (min-width: 730px) 26vw, 190px"
              className={s.faixaFoto}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
