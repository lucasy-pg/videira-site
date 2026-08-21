"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * O acordeão institucional do "No que cremos".
 *
 * POR QUE ACORDEÃO E NÃO OITO PARÁGRAFOS. São oito fundamentos de fé, e os oito
 * abertos ao mesmo tempo viram o bloco mais pesado da página — justamente numa
 * seção que quase ninguém lê inteira. Fechados, os oito títulos são um índice
 * de uma linha cada: quem quer só saber no que a igreja crê, vê os oito nomes
 * de uma vez; quem quer o texto, abre o que interessa.
 *
 * UM DE CADA VEZ, e o primeiro já abre. Abrir o primeiro não é enfeite: com
 * tudo fechado a lista parece inerte e ninguém descobre que ela abre. Fechar os
 * outros ao abrir um mantém a seção com altura estável, o que importa aqui
 * porque ela é a última coisa antes da liderança e da chamada final — uma
 * seção que cresce oito vezes empurraria o resto da página para longe.
 *
 * A ANIMAÇÃO É `grid-template-rows: 0fr → 1fr`, e não `max-height`. O truque do
 * `max-height` exige chutar uma altura máxima: se o chute for baixo o texto é
 * cortado, se for alto a transição fica com uma "espera" antes de o conteúdo
 * aparecer, proporcional ao erro do chute. Com a grade de uma linha só, o
 * navegador anima até a altura REAL do conteúdo, sem medir nada em JavaScript e
 * sem número mágico. O `overflow-hidden` no filho é o que recorta o texto
 * enquanto a linha ainda não tem altura — sem ele a grade não segura nada.
 *
 * `aria-hidden` NO PAINEL FECHADO: sem isso o leitor de tela lê os oito textos
 * seguidos, e o acordeão deixa de existir para quem não vê a tela. É seguro
 * aqui porque dentro do painel só há um parágrafo — nenhum elemento focável,
 * que é o caso em que `aria-hidden` viraria uma armadilha de teclado.
 */
export function Acordeao({
  itens,
  idBase,
}: {
  itens: { titulo: string; texto: string }[];
  /** Prefixo dos ids que ligam botão e painel. Um por instância na página. */
  idBase: string;
}) {
  const [aberto, setAberto] = useState(0);

  return (
    <div className="border-t border-foreground/12">
      {itens.map((item, i) => {
        const isAberto = aberto === i;
        const idBotao = `${idBase}-botao-${i}`;
        const idPainel = `${idBase}-painel-${i}`;

        return (
          <div key={item.titulo} className="border-b border-foreground/12">
            {/* O `<h3>` em volta do botão é o que põe os oito fundamentos na
                lista de cabeçalhos do leitor de tela — é assim que se navega
                uma seção destas sem enxergar. */}
            <h3>
              <button
                type="button"
                id={idBotao}
                aria-expanded={isAberto}
                aria-controls={idPainel}
                onClick={() => setAberto(isAberto ? -1 : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span
                  className={`font-display text-[clamp(1.25rem,2.4vw,1.65rem)] font-medium leading-tight transition-colors duration-300 ${
                    isAberto
                      ? "text-foreground"
                      : "text-foreground/75 group-hover:text-foreground"
                  }`}
                >
                  {item.titulo}
                </span>

                {/* O + vira × girando 45°: é o mesmo traço nos dois estados,
                    então o ícone não pisca ao trocar — ele roda. */}
                <span
                  aria-hidden
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isAberto
                      ? "border-grape/30 bg-grape/10 text-grape"
                      : "border-foreground/15 text-foreground/50 group-hover:border-foreground/30 group-hover:text-foreground"
                  }`}
                >
                  <Plus
                    size={17}
                    className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      isAberto ? "rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              aria-hidden={!isAberto}
              className={`grid transition-[grid-template-rows] duration-400 ease-out motion-reduce:transition-none ${
                isAberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-xl pb-7 pr-12 leading-relaxed text-muted-foreground transition-opacity duration-300 motion-reduce:transition-none ${
                    isAberto ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.texto}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
