"use client";

import { useEffect, useRef } from "react";
import { fotosRadicalLivres, nome } from "@/lib/quem-somos";
import s from "./quem-somos.module.css";
import { useEmCena } from "./useEmCena";

const { pano, fundo, mediaA, mediaB, pequena, noTexto } = fotosRadicalLivres;

/**
 * MOVIMENTO 2 — o núcleo da seção.
 *
 * Um pano fotográfico de tela cheia, desfocado, e sobre ele: RADICAL à esquerda
 * com uma fotografia revelada dentro das letras, sangrando para fora da margem;
 * LIVRES à direita, itálico e roxo, deslocado, passando por cima de uma foto.
 * Quatro fotografias em camadas de profundidade distintas, dois microtextos
 * soltos como anotação de margem, e uma LANTERNA que traz o pano à tona onde o
 * cursor aponta.
 *
 * TODA A GEOMETRIA E TODA A COREOGRAFIA ESTÃO NO `quem-somos.module.css` — as
 * contas de sobreposição, os atrasos da linha do tempo, a degradação sem
 * `animation-timeline` e o comportamento com `prefers-reduced-motion`. Este
 * arquivo carrega a marcação, o acervo e a única coisa que o CSS não sabe
 * fazer: onde o mouse está.
 *
 * ⚠️ O QUE MUDOU EM 17/08/2026, para quem for ler o histórico: a máscara do
 * cursor CONTINUA A MESMA — a perseguição em `requestAnimationFrame`, a
 * interpolação a 12% por quadro, as duas variáveis CSS. O que mudou foi o que
 * ela revela. Antes trazia uma SEXTA fotografia à tona, a 6% de opacidade sobre
 * o osso da seção; agora o fundo é fotográfico e desfocado, e o círculo traz à
 * tona a própria imagem que já está lá. Conteúdo novo virou foco.
 *
 * É COMPONENTE DE CLIENTE POR DUAS RAZÕES, e as duas são pequenas: o gatilho de
 * entrada (um `IntersectionObserver`, no `useEmCena`) e a máscara do cursor.
 * O resto da seção continua sendo servidor.
 */
export function RadicalLivres() {
  const { ref: refCena, cena } = useEmCena<HTMLDivElement>();
  const refPalco = useRef<HTMLDivElement>(null);

  /**
   * A MÁSCARA QUE SEGUE O CURSOR.
   *
   * O círculo persegue o ponteiro com atraso — chega onde ele estava, não onde
   * ele está —, e é esse atraso que separa "uma camada da composição
   * respondendo" de "uma lupa colada no mouse". A perseguição é uma
   * interpolação simples a 12% da distância por quadro; sem ela o efeito é
   * técnico, com ela é atmosférico.
   *
   * ⚠️ NENHUM `setState` AQUI, E ISSO NÃO É OTIMIZAÇÃO PREMATURA. Um `setState`
   * por `pointermove` são ~120 renderizações de React por segundo arrastando
   * uma árvore com nove imagens; a posição do cursor não é estado da interface,
   * é um número que o CSS lê. Vai direto para duas variáveis no elemento, e o
   * navegador recompõe a máscara sem passar por layout nem por React.
   *
   * A CAIXA É MEDIDA DENTRO DO `requestAnimationFrame`, uma vez por quadro, e
   * não dentro do `pointermove`. Medir no evento intercalaria leituras de
   * layout com as escritas de estilo do quadro anterior — o padrão que produz
   * "layout thrashing". Uma leitura por quadro também é o que mantém o círculo
   * grudado no cursor DURANTE A ROLAGEM: o palco se move sob o ponteiro parado,
   * e a nova medida corrige a conta sozinha.
   *
   * O LAÇO SÓ RODA COM O PONTEIRO DENTRO DO PALCO. Ao sair, o alvo vai para
   * bem acima da seção e o círculo DESLIZA para fora em vez de piscar; quando
   * chega lá, o laço se encerra sozinho.
   *
   * DESLIGADO POR INTEIRO em ponteiro grosso, tela menor que 1024px ou pedido
   * de menos movimento — e "desligado" aqui quer dizer que o atributo nunca
   * entra, então nem a máscara nem o ouvinte existem. Nessas telas fica só o
   * pano desfocado, que é a composição em repouso (ver `.lanterna`).
   */
  useEffect(() => {
    const el = refPalco.current;
    if (!el) return;

    const podeSeguirCursor =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!podeSeguirCursor) return;

    el.dataset.cursor = "ativo";

    /* Longe o bastante para o círculo de 340px não encostar no palco: no
       repouso a lanterna tem que estar apagada, sem clarão nenhum na borda.
       Mexeu no raio do feixe, confira se este número ainda o comporta. */
    const FORA = -700;

    let ponteiroX = 0;
    let ponteiroY = 0;
    let dentro = false;
    let atualX = 0;
    let atualY = FORA;
    let quadro = 0;
    let rodando = false;

    const passo = () => {
      const caixa = el.getBoundingClientRect();
      const alvoX = ponteiroX - caixa.left;
      const alvoY = dentro ? ponteiroY - caixa.top : FORA;

      atualX += (alvoX - atualX) * 0.12;
      atualY += (alvoY - atualY) * 0.12;

      el.style.setProperty("--mx", `${atualX.toFixed(1)}px`);
      el.style.setProperty("--my", `${atualY.toFixed(1)}px`);

      /* Com o ponteiro dentro, o laço não pára: a rolagem move o palco debaixo
         de um mouse imóvel, e parar aqui deixaria o círculo para trás. */
      if (dentro || Math.abs(alvoY - atualY) > 1) {
        quadro = requestAnimationFrame(passo);
      } else {
        rodando = false;
      }
    };

    const acorda = () => {
      if (rodando) return;
      rodando = true;
      quadro = requestAnimationFrame(passo);
    };

    const move = (e: PointerEvent) => {
      ponteiroX = e.clientX;
      ponteiroY = e.clientY;
      dentro = true;
      acorda();
    };

    const sai = () => {
      dentro = false;
      acorda();
    };

    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", `${FORA}px`);
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", sai);

    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", sai);
      cancelAnimationFrame(quadro);
      delete el.dataset.cursor;
    };
  }, []);

  return (
    <div ref={refCena} data-cena={cena}>
      <div ref={refPalco} className={s.palco}>
        {/* eslint-disable @next/next/no-img-element */}

        {/* O PANO — a fotografia de tela cheia atrás de tudo, DESFOCADA. É a
            única imagem do palco que não é `lazy`: ela é o chão da composição
            inteira e precisa estar lá quando o resto chegar, senão o movimento
            entra com RADICAL sobre osso e a foto aparece depois, num salto de
            tom. `alt` de verdade porque, diferente da camada que ela
            substituiu, esta se vê — ver o `lib/quem-somos.ts`. */}
        <img
          src={pano.src}
          alt={pano.alt}
          width={pano.w}
          height={pano.h}
          decoding="async"
          className={s.pano}
        />

        {/* A LANTERNA — a mesma foto, nítida, existindo só dentro do círculo que
            segue o cursor. Duas cópias do mesmo arquivo e não duas fotos: o
            efeito é "a imagem escondida no fundo aparece onde você aponta", e
            para isso as duas têm de ser a mesma imagem no mesmo lugar. Não custa
            uma segunda requisição — mesmo `src`, mesmo arquivo já baixado.

            ⚠️ ELA É MAIS PRESENTE QUE O PANO (90% contra 50%), e é essa
            diferença que faz a lanterna acender em vez de só focar. Foi assim
            que esta peça passou a funcionar: quando as duas tinham a MESMA
            opacidade, o círculo somava as duas camadas em vez de trocar uma pela
            outra — o miolo saía mais escuro e mais sujo que a borda, e a nitidez
            medida sob o cursor subia 3% quando devia saltar.

            `aria-hidden` porque a cópia de baixo já descreveu a fotografia; ler
            a mesma imagem duas vezes é ruído para quem usa leitor de tela. */}
        <img
          src={pano.src}
          alt=""
          width={pano.w}
          height={pano.h}
          decoding="async"
          aria-hidden="true"
          className={s.lanterna}
        />

        {/* ── camada 1: RADICAL ──────────────────────────────────────────
            Três divs para uma palavra, e cada uma segura um canal de
            transformação diferente. O porquê está no módulo, em
            `.radicalDeriva` — resumo: `scale` da rolagem, `clip-path` da
            entrada e `background-clip: text` não podem morar no mesmo
            elemento sem se apagarem (ou sem derrubar o recorte no Safari).

            A palavra é um `<h3>` de verdade e o `<span>` de LIVRES vive no
            mesmo heading, lá embaixo? NÃO — e é decisão. As duas metades
            estão em `<h3>` separados porque entre elas há fotografias, e um
            heading que engloba meia composição não descreve nada para quem
            navega por títulos. Cada palavra é o título da própria metade,
            que é exatamente o que o texto diz que elas são. */}
        <h3 className={s.radicalDeriva}>
          <span className={s.radicalLinha}>
            <span className={s.radicalEntrada}>
              <span
                className={`${s.serifa} ${s.radical}`}
                style={
                  {
                    "--foto-radical": `url("${noTexto.src}")`,
                  } as React.CSSProperties
                }
              >
                {nome[0].palavra}
              </span>
            </span>
            <span className={`${s.micro} ${s.microRadical}`}>
              {nome[0].contra}
            </span>
          </span>
        </h3>

        {/* ── camada 0: a foto grande e desfocada, sangrando pela direita ── */}
        <img
          src={fundo.src}
          alt={fundo.alt}
          width={fundo.w}
          height={fundo.h}
          loading="lazy"
          decoding="async"
          className={`${s.palcoFoto} ${s.fundo}`}
        />

        {/* ── camada 2: as duas médias, nítidas ─────────────────────────── */}
        <img
          src={mediaA.src}
          alt={mediaA.alt}
          width={mediaA.w}
          height={mediaA.h}
          loading="lazy"
          decoding="async"
          className={`${s.palcoFoto} ${s.mediaA}`}
        />
        <img
          src={mediaB.src}
          alt={mediaB.alt}
          width={mediaB.w}
          height={mediaB.h}
          loading="lazy"
          decoding="async"
          className={`${s.palcoFoto} ${s.mediaB}`}
        />

        {/* ── camada 3: LIVRES ──────────────────────────────────────────── */}
        <h3 className={s.livresLinha}>
          <span className={s.livresDeriva}>
            <span className={`${s.micro} ${s.microLivres}`}>
              {nome[1].contra}
            </span>
            <span className={s.livresEntrada}>
              <span className={`${s.serifa} ${s.livres}`}>
                {nome[1].palavra}
              </span>
            </span>
          </span>
        </h3>

        {/* ── camada 4: a pequena, por cima de LIVRES ───────────────────── */}
        <img
          src={pequena.src}
          alt={pequena.alt}
          width={pequena.w}
          height={pequena.h}
          loading="lazy"
          decoding="async"
          className={`${s.palcoFoto} ${s.pequena}`}
        />
        {/* eslint-enable @next/next/no-img-element */}
      </div>

      {/* A CODA. Os dois parágrafos que explicam o nome — o texto que já
          estava no ar e que a composição acima não tem onde acomodar sem
          virar cartaz legendado. Ver o comentário de `.coda` no módulo. */}
      <div className={s.coda}>
        {nome.map((n) => (
          <div key={n.palavra}>
            <p className={s.codaRotulo}>
              {n.palavra} {n.contra}
            </p>
            <p className={s.codaTexto}>{n.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
