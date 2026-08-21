"use client";

import { memo, useCallback, useEffect, useRef } from "react";

import {
  fotosDoMural,
  montarLinhas,
  origensDaFoto,
  type FotoGaleria,
} from "@/lib/galeria";
import { useFotoAmpliada } from "./useFotoAmpliada";
import { FotoAmpliada } from "./FotoAmpliada";
import css from "./galeria.module.css";

/**
 * O MURAL — Ato IV do /radicais-livres.
 *
 * As 111 fotos do acervo numa parede única que rola para o lado até acabar. É
 * a resposta a um pedido de uma frase: "a pessoa vai passando para o lado
 * procurando a sua imagem".
 *
 * ── POR QUE ELE NÃO É MAIS COREOGRAFIA ───────────────────────────────────
 *
 * O Ato II conduz: o palco fica pinado e a rolagem da página vira o relógio da
 * composição — quem rola não escolhe o que vê, escolhe QUANDO vê. Isso é o
 * certo para contar uma história e é exatamente o errado para procurar um
 * rosto. Procurar é ir e voltar, parar numa foto, passar batido por vinte.
 *
 * Por isso aqui não há pin, não há `scrub` e não há GSAP: é um contêiner com
 * `overflow-x: auto` e o usuário no comando. A única coisa que este arquivo
 * acrescenta ao que o navegador já faz é o que falta para um MOUSE conseguir
 * atravessar dez mil pixels — arrastar e a roda.
 *
 * ── O TRÊS EM VEZ DE QUATRO ──────────────────────────────────────────────
 *
 * São sempre TRÊS faixas, no celular e no monitor, e é decisão de hidratação
 * antes de ser de estética: a repartição das 111 fotos acontece em
 * `montarLinhas` durante a renderização, e se o número de faixas dependesse
 * da largura da janela, o servidor montaria uma parede e o cliente outra. O
 * que muda entre telas é a ALTURA da faixa, que é CSS puro e não mexe em qual
 * foto vai para onde.
 */

/* As faixas do mural. Ver a caixa acima: o número é fixo de propósito. */
const FAIXAS = 3;

/* Quanto o teclado anda por tecla, e quanto a roda do mouse multiplica. O 1.1
   da roda é quase transparente: sem ele, um "clique" de roda anda ~100px numa
   parede de dez mil, e atravessar viraria trabalho braçal. */
const PASSO_DA_RODA = 1.1;

/* Abaixo disto, o ponteiro só tremeu e o gesto continua sendo um clique. Seis
   pixels é o que a mão faz sem querer ao apertar o botão; acima, é arrasto e o
   clique tem de ser engolido, senão toda tentativa de puxar a parede abre uma
   foto. */
const TOLERANCIA_DO_CLIQUE = 6;

const FotoDoMural = memo(function FotoDoMural({
  foto,
  aoAbrir,
}: {
  foto: FotoGaleria;
  aoAbrir: (id: string, elemento: HTMLElement) => void;
}) {
  const proporcao = foto.w / foto.h;

  return (
    <button
      type="button"
      className={css.muralFoto}
      /* A LARGURA VEM DA PROPORÇÃO, e ela é escrita aqui e não deixada para o
         `<img>` resolver. Sem a medida, a caixa nasce com zero de largura e
         só ganha tamanho quando o arquivo chega — com `loading="lazy"` numa
         faixa de dez mil pixels, isso é a parede inteira mudando de
         comprimento a cada foto que carrega, e a posição do usuário na
         rolagem escorregando junto. */
      style={{ ["--proporcao" as string]: proporcao }}
      aria-label={`Ampliar: ${foto.alt}`}
      onClick={(e) => aoAbrir(foto.id, e.currentTarget)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.src}
        srcSet={origensDaFoto(foto)}
        alt=""
        width={foto.w}
        height={foto.h}
        loading="lazy"
        decoding="async"
        draggable={false}
        /* A foto renderiza com ~280px de largura no monitor e ~180 no celular.
           Sem isto o navegador presume 100vw e baixa o arquivo de 1600px cento
           e onze vezes. */
        sizes="(max-width: 767px) 180px, 280px"
      />
    </button>
  );
});

/* NO MURAL A VIZINHANÇA É O CAPÍTULO INTEIRO DA PAREDE, e a diferença para o
   palco é o contrato de cada ato: lá o visitante está numa etapa de nove fotos
   e a sugestão é a composição dela; aqui ele está no acervo, atravessando a
   parede à procura de um rosto, e cortar a sugestão em quatro seria esconder
   parede de quem veio ver parede. São de 13 a 49 por capítulo — a grade do
   painel rola quando não cabem.

   A ordem é a da PAREDE, não a do acervo: a miniatura leva de volta para onde
   a foto está lá fora. */
const irmasNoMural = (foto: FotoGaleria) =>
  fotosDoMural.filter((f) => f.capitulo === foto.capitulo);

export function Mural() {
  const faixaRef = useRef<HTMLDivElement>(null);
  const barraRef = useRef<HTMLSpanElement>(null);

  /* O gancho da foto ampliada é instanciado AQUI, com a faixa no lugar do
     palco: quando uma foto abre, quem recua e desfoca atrás do véu é o mural,
     que é o que está na tela. Reaproveitar a instância da `Galeria` faria o
     palco — seis alturas de tela acima — receber um `blur` que ninguém vê, e
     `filter` num elemento daquele tamanho não é de graça. */
  const ampliada = useFotoAmpliada(faixaRef, irmasNoMural);

  /* Estado de arrasto em REF, não em `useState`: são dezenas de eventos por
     segundo e nada disto vai para a marcação. Com estado, cada pixel puxado
     seria uma renderização das 111 fotos. */
  const arrasto = useRef({
    ativo: false,
    x0: 0,
    rolagem0: 0,
    andou: 0,
    /* Se o ponteiro já foi capturado. Ver a caixa do `aoMover`: a captura é
       adiada de propósito, então saber se ela aconteceu não é redundante com
       `ativo`. */
    capturado: false,
  });

  /* ── a barra de progresso ──────────────────────────────────────────────
     Ela existe porque uma parede que rola para o lado não tem barra de rolagem
     visível em macOS e em nenhum celular: sem um traço na tela, não há como
     saber se falta um terço ou nove décimos. É a única informação da seção
     sobre onde o usuário está. */
  const atualizarBarra = useCallback(() => {
    const faixa = faixaRef.current;
    const barra = barraRef.current;
    if (!faixa || !barra) return;
    const percorrivel = faixa.scrollWidth - faixa.clientWidth;
    const razao = percorrivel > 0 ? faixa.scrollLeft / percorrivel : 0;
    // `scaleX` e não `width`: largura remede o layout a cada quadro da rolagem,
    // escala roda no compositor. É a mesma regra do Ato II.
    barra.style.transform = `scaleX(${Math.max(0.02, Math.min(1, razao))})`;
  }, []);

  /* ── a roda do mouse ───────────────────────────────────────────────────
     Quem tem trackpad já rola de lado; quem tem mouse, não. Sem esta tradução,
     metade dos visitantes de desktop vê uma parede que não anda.

     A REGRA QUE IMPEDE ISSO DE VIRAR SEQUESTRO DE ROLAGEM: só se converte o
     movimento vertical enquanto a parede AINDA TEM PARA ONDE IR naquele
     sentido. Chegou na ponta, o `preventDefault` não acontece e o evento segue
     para a página, que volta a rolar normalmente. O usuário nunca fica preso —
     ele atravessa a parede e a página continua.

     Vai no `useEffect` com `{ passive: false }` porque `preventDefault` num
     ouvinte passivo é ignorado, e o React registra `onWheel` como passivo. */
  useEffect(() => {
    const faixa = faixaRef.current;
    if (!faixa) return;

    const aoRodar = (e: WheelEvent) => {
      // Gesto horizontal de trackpad: o navegador já faz o certo sozinho.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const limite = faixa.scrollWidth - faixa.clientWidth;
      const naPonta =
        (e.deltaY > 0 && faixa.scrollLeft >= limite - 1) ||
        (e.deltaY < 0 && faixa.scrollLeft <= 1);
      if (naPonta) return; // devolve a rolagem para a página

      e.preventDefault();
      faixa.scrollLeft += e.deltaY * PASSO_DA_RODA;
    };

    faixa.addEventListener("wheel", aoRodar, { passive: false });
    return () => faixa.removeEventListener("wheel", aoRodar);
  }, []);

  /* ── arrastar com o ponteiro ───────────────────────────────────────────
     No toque isto é desnecessário — o `overflow-x` do navegador já dá o
     arrasto com inércia, e mexer nele só pioraria. Por isso o ouvinte sai fora
     quando o ponteiro é grosso: `pointerType` conta, e o `touch` volta cedo.

     O clique é engolido no `capture` para chegar antes do `onClick` do botão
     da foto — no borbulhamento seria tarde, a foto já teria aberto. */
  const aoApertar = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const faixa = faixaRef.current;
    if (!faixa) return;
    arrasto.current = {
      ativo: true,
      x0: e.clientX,
      rolagem0: faixa.scrollLeft,
      andou: 0,
      capturado: false,
    };
  }, []);

  /* ⚠️ A CAPTURA DO PONTEIRO SÓ ACONTECE DEPOIS QUE O ARRASTO COMEÇA, e esta
     linha é o conserto de um defeito que passou pelo teste de arrastar e
     quebrava a única coisa que a parede tem além de rolar.

     `setPointerCapture` redireciona para o elemento capturador não só os
     `pointermove` seguintes, mas também o `pointerup` E O `click` resultante.
     Capturando já no `pointerdown`, todo clique numa foto chegava no `<div>`
     da faixa em vez de chegar no `<button>` da foto — e clicar numa foto do
     mural não abria absolutamente nada. Verificado no alvo dos eventos:
     `pointerdown` caía em IMG, `pointerup` e `click` caíam em DIV.

     Adiando a captura para o momento em que o ponteiro passa da tolerância, o
     clique parado mantém o alvo natural e o arrasto de verdade continua
     recebendo os eventos mesmo quando a mão sai da faixa. */
  const aoMover = useCallback((e: React.PointerEvent) => {
    const estado = arrasto.current;
    const faixa = faixaRef.current;
    if (!estado.ativo || !faixa) return;
    const desloca = e.clientX - estado.x0;
    estado.andou = Math.max(estado.andou, Math.abs(desloca));
    if (!estado.capturado && estado.andou > TOLERANCIA_DO_CLIQUE) {
      estado.capturado = true;
      faixa.setPointerCapture(e.pointerId);
    }
    faixa.scrollLeft = estado.rolagem0 - desloca;
  }, []);

  const aoSoltar = useCallback((e: React.PointerEvent) => {
    const estado = arrasto.current;
    if (!estado.ativo) return;
    estado.ativo = false;
    if (estado.capturado) {
      estado.capturado = false;
      faixaRef.current?.releasePointerCapture(e.pointerId);
    }
  }, []);

  const aoClicar = useCallback((e: React.MouseEvent) => {
    if (arrasto.current.andou > TOLERANCIA_DO_CLIQUE) {
      e.preventDefault();
      e.stopPropagation();
    }
    arrasto.current.andou = 0;
  }, []);

  const linhas = montarLinhas(fotosDoMural, FAIXAS);

  return (
    <div id="mural" className={css.mural}>
      <div className={css.muralTexto}>
        <h3 className={css.muralTitulo}>Todo mundo está aqui.</h3>
        <p className={css.muralConvite}>
          São {fotosDoMural.length} fotos do acervo dos Radicais, sem escolher
          nenhuma. Vá para o lado até achar a sua.
        </p>
      </div>

      <div
        ref={faixaRef}
        className={css.muralFaixa}
        /* `region` com nome é o que dá ao leitor de tela um contêiner
           anunciável e rolável; o `tabIndex` é o que faz as setas do teclado
           andarem na parede quando ela está em foco. Sem ele, um contêiner com
           `overflow` não recebe foco e as setas rolam a página. */
        role="region"
        tabIndex={0}
        aria-label={`Mural com ${fotosDoMural.length} fotos dos Radicais Livres`}
        onScroll={atualizarBarra}
        onPointerDown={aoApertar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onClickCapture={aoClicar}
      >
        <div className={css.muralLinhas}>
          {linhas.map((linha, i) => (
            <div key={i} className={css.muralLinha}>
              {linha.map((foto) => (
                <FotoDoMural
                  key={foto.id}
                  foto={foto}
                  aoAbrir={ampliada.abrir}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={css.muralBarra} aria-hidden>
        <span ref={barraRef} className={css.muralBarraCheia} />
      </div>

      <FotoAmpliada ampliada={ampliada} />
    </div>
  );
}
