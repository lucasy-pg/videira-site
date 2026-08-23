"use client";

import { copy } from "@/lib/quem-somos";
import s from "./quem-somos.module.css";
import { useEmCena } from "./useEmCena";

/**
 * MOVIMENTO 3 — a frase que fecha o argumento.
 *
 *     Fomos chamados para
 *     marcar a nossa geração.
 *
 * Depois de o movimento 2 desmontar o nome em duas metades gigantes, aqui a
 * seção volta a falar em primeira pessoa do plural e diz para que a rede existe.
 * Por isso a frase é grande, mas não do tamanho do letreiro: se competisse,
 * seriam dois cartazes.
 *
 * O ROXO CAI NA ÚLTIMA PALAVRA, e é a palavra que a frase inteira está
 * perseguindo — "geração", que volta logo abaixo no parágrafo e outra vez na
 * visão. É o gesto tipográfico da casa: a tinta cai sobre a palavra que é
 * promessa, nunca sobre a que é enfeite.
 *
 * A COPY DESTE MOVIMENTO MUDOU INTEIRA em 17/08/2026 (Figma da rede). O que
 * estava aqui — "Livres para viver. / Radicais para permanecer." — ecoava a
 * composição de cima e levava um itálico em "Radicais" por causa disso; sem a
 * palavra para ecoar, o itálico saiu junto. Ver `lib/quem-somos.ts`.
 *
 * ALINHADA À DIREITA, nunca centralizada de forma simétrica. As linhas fecham
 * todas na mesma vertical, e o parágrafo de fecho fecha nela também — é a borda
 * direita que segura o bloco, e a esquerda fica livre para o degrau que as
 * quebras de linha desenham. Até 22/08/2026 o bloco era só EMPURRADO para a
 * direita com o texto alinhado à esquerda, e ficava boiando; o CSS conta a
 * história inteira em `.impactoBloco`, inclusive o recuo que desvia da foto
 * solta da seção 05.
 *
 * É componente de cliente por uma linha: o gatilho de entrada. As duas linhas
 * são reveladas por recorte, uma 150ms depois da outra, e isso precisa de um
 * observador. Sem script, o `useEmCena` nunca escreve o atributo e a frase
 * simplesmente já está lá — ver o porquê no próprio hook.
 */
export function FraseImpacto() {
  const { ref, cena } = useEmCena<HTMLDivElement>();

  return (
    <div ref={ref} data-cena={cena} className={s.impacto}>
      <div className={s.impactoBloco}>
        <p className={`${s.display} ${s.impactoFrase}`}>
          <span className={s.impactoLinha}>{copy.impacto.primeira}</span>
          <span className={`${s.impactoLinha} ${s.impactoLinha2}`}>
            {copy.impacto.segunda.texto}
            {/* `<span>` e não `<em>`/`<strong>`: a tinta aqui é gesto
                tipográfico, não ênfase de leitura. Um `<em>` faria o leitor de
                tela mudar a entonação numa palavra que, dita em voz alta, não é
                mais importante que as vizinhas. (Compare com o `<strong>` da
                introdução, que é o caso oposto.) */}
            <span className={s.impactoRoxo}>{copy.impacto.segunda.tinta}</span>
          </span>
        </p>
        <p className={s.impactoFecho}>{copy.fechamento}</p>
      </div>
    </div>
  );
}
