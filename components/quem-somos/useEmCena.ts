"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "A cena entrou em cartaz" — um observador por MOVIMENTO, não por elemento.
 *
 * POR QUE NÃO O `<Reveal>` DO PROJETO. O Reveal resolve o caso comum (um bloco,
 * uma entrada, um atraso) e continua sendo o certo para os movimentos 1 e 4
 * desta seção. Os movimentos 2 e 3 pedem outra coisa: uma LINHA DO TEMPO com
 * ordem interna, em que RADICAL revela por recorte, as fotos entram em stagger
 * e LIVRES chega da direita 800ms depois — tudo disparado pelo MESMO gatilho.
 * Com um Reveal por elemento seriam sete observadores e sete gatilhos
 * independentes, e a ordem entre eles passaria a depender de qual pedaço da
 * composição cruzou a borda primeiro. Aqui é um observador só: ele marca o
 * palco, e cada peça leva o próprio `transition-delay` no CSS.
 *
 * O ESTADO TEM TRÊS VALORES E NÃO DOIS, e o do meio é o que salva a página sem
 * JavaScript. O servidor renderiza `undefined` — nenhum atributo —, e o CSS só
 * esconde o que estiver debaixo de `[data-cena="armada"]`. Ou seja: se o script
 * não rodar, nada nunca se esconde e a seção aparece pronta e legível. O
 * "armada" é posto no primeiro efeito depois da montagem, e só então existe
 * estado inicial de animação.
 *
 * Isso é diferente do `.reveal { opacity: 0 }` global do `globals.css`, que
 * nasce escondido no HTML e depende do script para aparecer. A troca não custa
 * nada aqui porque esta seção está inteira abaixo da dobra: entre a montagem e
 * a chegada do olho há uma rolagem de tela cheia, então o "armar" nunca é
 * visto piscar.
 *
 * `-30%` NA MARGEM DE BAIXO é o `start: "top 70%"` do briefing dito em
 * IntersectionObserver: encolhe a raiz em 30% da altura da janela, então o
 * gatilho cai quando o topo do palco alcança 70% da tela.
 *
 * DISPARA UMA VEZ SÓ (`disconnect` na primeira intersecção). Uma composição
 * deste tamanho reanimando toda vez que a pessoa rola de volta vira um
 * fliperama; e é o mesmo comportamento do `<Reveal>`, então a página inteira
 * responde igual.
 */
export function useEmCena<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [cena, setCena] = useState<"armada" | "ativa" | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setCena("armada");

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setCena("ativa");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -30% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, cena };
}
