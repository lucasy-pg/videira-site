"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./radicais.module.css";

/* A folga em volta da metade do curso. Sem ela, quem para de rolar exatamente
   no limiar veria a troca ir e voltar a cada pixel de ajuste do dedo. */
const IDA = 0.53;
const VOLTA = 0.47;

/**
 * A SEÇÃO 03 E O GATILHO DA TROCA — e é só isso que este arquivo faz.
 *
 * Mede em que ponto do curso pinado a rolagem está e escreve `data-ato="2"` na
 * seção ao passar da metade (e `1` ao voltar dela). Todo o movimento é CSS: o
 * `radicais.module.css` transforma o atributo em deslize e esmaecimento, e só
 * nas faixas em que o palco está preso.
 *
 * ⚠️ POR QUE EXISTE, se a seção nasceu sem JavaScript nenhum: a travessia
 * ligada à rolagem tremia, porque o palco `sticky` anda no fio da rolagem e a
 * animação chegava um quadro depois dele. Com a troca disparada aqui e
 * animada por `transition`, não há o que ficar fora de fase. O porquê inteiro
 * está na coreografia do `radicais.module.css`.
 *
 * O atributo vai direto no DOM, sem estado do React: a troca não muda nada que
 * o React desenha, e re-renderizar a seção a cada passagem pela metade seria
 * trabalho sem resultado. Os filhos continuam sendo componentes de servidor.
 */
export function PalcoDasPalavras({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const secao = ref.current;
    if (!secao) return;

    let quadro = 0;

    const medir = () => {
      quadro = 0;
      const { top, height } = secao.getBoundingClientRect();
      const curso = height - window.innerHeight;
      if (curso <= 0) return;

      const progresso = -top / curso;
      const noDois = secao.dataset.ato === "2";
      if (!noDois && progresso > IDA) secao.dataset.ato = "2";
      else if (noDois && progresso < VOLTA) secao.dataset.ato = "1";
    };

    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <section ref={ref} className={s.duas} aria-label="Radicais e livres">
      {children}
    </section>
  );
}
