"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  cenas,
  etapas,
  larguraMaxima,
  origensDaFoto,
  porId,
  quadrosDaFoto,
  type Quadro,
} from "@/lib/galeria";

gsap.registerPlugin(ScrollTrigger);

/* O REDIMENSIONAMENTO QUE NÃO É REDIMENSIONAMENTO.

   No celular, esconder e mostrar a barra de endereço durante a rolagem dispara
   `resize` e muda a altura da janela em 60 a 120px. O ScrollTrigger, ao ser
   atualizado, remede a distância do pin e reposiciona a rolagem para o novo
   cálculo — no meio de um gesto de rolar. Na tela isso é um solavanco: a
   composição salta, e o dedo que estava rolando parece ter escorregado.

   `ignoreMobileResize` faz o ScrollTrigger ignorar mudanças que sejam SÓ de
   altura em aparelho de toque. É a metade da correção; a outra metade está no
   ouvinte de `resize` deste arquivo, que também precisou passar a olhar a
   largura antes de pedir um refresh. */
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * O MOTOR DA GALERIA — uma linha do tempo, um ScrollTrigger, quarenta
 * fotos.
 *
 * Ele não conhece nenhuma foto pelo nome: lê `lib/galeria.ts`, encontra os
 * elementos por `data-foto` e interpola. Trocar a composição não passa por
 * aqui.
 *
 * ── AS QUATRO DECISÕES QUE EXPLICAM O ARQUIVO ─────────────────────────────
 *
 * 1. UM GATILHO SÓ. O desenho pedia isso e a razão é medível: quarenta
 *    fotos com gatilho próprio são quarenta cálculos de posição a cada
 *    quadro de rolagem, e outros tantos `refresh()` a cada redimensionamento.
 *    Aqui existe UM
 *    ScrollTrigger com `scrub`, e tudo o mais são tweens dentro da linha do
 *    tempo dele, endereçados por tempo normalizado de 0 a 1 — que é
 *    exatamente o "progresso do pin" da especificação.
 *
 * 2. NADA DE `width`, `left` OU `top` ANIMADOS. Cada foto tem UMA largura de
 *    layout — a maior que ela alcança na coreografia inteira (`larguraMaxima`)
 *    — e todo o resto é `scale`. A posição é `x`/`y` em pixels, calculada por
 *    FUNÇÃO a partir do tamanho do palco, o que faz o `invalidateOnRefresh`
 *    recalcular tudo no redimensionamento sem uma linha extra.
 *
 * 3. AS FUNÇÕES DE POSIÇÃO SÃO A RAZÃO DE `invalidateOnRefresh: true`. Sem
 *    ele, girar o celular deixaria a composição inteira calculada para a
 *    largura antiga — as fotos ficariam fora da tela, e ninguém desconfiaria
 *    do motivo.
 *
 * 4. O PARALLAX É SOMADO, NÃO MULTIPLICADO. A especificação pede fatores por
 *    camada; multiplicá-los pelas posições absolutas das cenas desmancharia as
 *    composições desenhadas (uma foto em 34% viraria 24% ou 44% conforme a
 *    camada). Em vez disso cada CAMADA deriva alguns por cento de altura ao
 *    longo do pin, na proporção dos fatores do desenho. A profundidade
 *    aparece, a composição fica de pé.
 */

/** Quanto cada camada deriva na vertical ao longo do pin inteiro, em % da tela.
 *  As proporções são as do desenho (0.20 / 0.35 / 0.70 / 1.15 / 1.30); o que
 *  muda é a origem — aqui elas viram deslocamento próprio em vez de fator
 *  sobre a posição da cena. */
const DERIVA = {
  palavras: -1.6,
  longe: -2.8,
  meio: -5.6,
  perto: -9.2,
  legendas: -10.4,
} as const;

/** O quanto cada camada responde ao mouse, em pixels. Direto do desenho. */
const CAMERA = { longe: 6, meio: 12, perto: 20 } as const;

type Alvos = {
  secao: HTMLElement;
  envoltorio: HTMLElement;
  palco: HTMLElement;
};

export function useMotorDaGaleria(alvos: {
  secao: React.RefObject<HTMLElement | null>;
  envoltorio: React.RefObject<HTMLDivElement | null>;
  palco: React.RefObject<HTMLDivElement | null>;
}) {
  /** A cena em curso. Alimenta a janela de montagem das <img> e o `will-change`.
   *  Só muda na virada de cena — dez vezes na experiência inteira, não a cada
   *  quadro de rolagem. */
  const [cenaAtual, setCenaAtual] = useState(0);
  const cenaAtualRef = useRef(0);

  useLayoutEffect(() => {
    const secao = alvos.secao.current;
    const envoltorio = alvos.envoltorio.current;
    const palco = alvos.palco.current;
    if (!secao || !envoltorio || !palco) return;

    const contexto = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* QUEM PEDIU MENOS MOVIMENTO NÃO RECEBE MOTOR NENHUM. Não é uma versão
         reduzida da coreografia: é a galeria sem coreografia, que o CSS já
         desenha como parede (ver o `prefers-reduced-motion` no módulo). Montar
         a linha do tempo e depois pará-la deixaria as fotos empilhadas em
         `position: absolute` umas sobre as outras. */
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          celular: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (faixa) => {
          const { desktop } = faixa.conditions as { desktop: boolean };
          const desligarCamera = montarAtoII(
            { secao, envoltorio, palco },
            desktop,
            (i) => {
              if (cenaAtualRef.current === i) return;
              cenaAtualRef.current = i;
              setCenaAtual(i);
            }
          );
          montarAtoI(secao);
          montarAtoIII(secao);
          return desligarCamera;
        }
      );

      /* O REDIMENSIONAMENTO, E POR QUE ELE OLHA SÓ A LARGURA.

         Este ouvinte existia para remedir depois que a barra de endereço do
         celular terminasse de recolher. Fazia o contrário do que prometia: a
         barra recolhendo É o evento, e o `refresh()` 200ms depois caía com a
         rolagem ainda em curso, remedindo o pin e sacudindo a composição no
         meio do gesto. Era a origem do travamento mais visível da seção no
         celular, e nenhum perfilador o mostrava — não é quadro perdido, é
         medida refeita na hora errada.

         Girar o aparelho ou redimensionar a janela MUDA A LARGURA; recolher a
         barra de endereço não. Guardar a largura e comparar separa os dois
         casos com uma linha, e o `ignoreMobileResize` no topo do arquivo cobre
         o mesmo buraco do lado do ScrollTrigger. */
      let temporizador: number;
      let larguraAnterior = window.innerWidth;
      const aoRedimensionar = () => {
        if (window.innerWidth === larguraAnterior) return;
        larguraAnterior = window.innerWidth;
        window.clearTimeout(temporizador);
        temporizador = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      window.addEventListener("resize", aoRedimensionar);

      /* E o refresh depois que as primeiras imagens chegam: enquanto elas não
         carregam, a altura do Ato I e do Ato III ainda não é a final, e o pin
         começaria alguns pixels fora do lugar. */
      const aoCarregar = () => ScrollTrigger.refresh();
      window.addEventListener("load", aoCarregar);

      return () => {
        window.removeEventListener("resize", aoRedimensionar);
        window.removeEventListener("load", aoCarregar);
        window.clearTimeout(temporizador);
      };
    }, secao);

    return () => contexto.revert();
  }, [alvos.secao, alvos.envoltorio, alvos.palco]);

  return { cenaAtual };
}

/* ═══════════════════════════════════════════════════════════════════════════
   ATO II — o palco pinado
   ═══════════════════════════════════════════════════════════════════════════ */

function montarAtoII(
  { secao, envoltorio, palco }: Alvos,
  desktop: boolean,
  aoTrocarCena: (i: number) => void
) {
  const buscar = <T extends Element>(seletor: string) =>
    Array.from(secao.querySelectorAll<T>(seletor));

  /* AS MEDIDAS DO PALCO FICAM EM CACHE, e isto conserta um defeito medido.
     A versão anterior era `const largura = () => palco.clientWidth`, chamada
     de dentro dos valores-função de cada foto. Parece inofensivo e não é:
     `clientWidth` é uma propriedade de layout, e lê-la obriga o navegador a
     recalcular o layout ali, na hora, de forma síncrona. Com trinta fotos
     reavaliando os valores durante o `scrub`, o perfilador de CPU num celular
     freado em 4× marcou 170ms só dentro dessa função — mais tempo que o GSAP
     inteiro gastou renderizando.

     O cache é seguro exatamente porque o ScrollTrigger avisa quando ele deixa
     de valer: `invalidateOnRefresh` já reavalia todos os valores-função depois
     de um refresh, e `refreshInit` roda ANTES disso. As duas leituras do DOM
     acontecem uma vez por redimensionamento, não trinta vezes por quadro. */
  const medidas = { w: palco.clientWidth, h: palco.clientHeight };
  const remedir = () => {
    medidas.w = palco.clientWidth;
    medidas.h = palco.clientHeight;
  };
  ScrollTrigger.addEventListener("refreshInit", remedir);

  const largura = () => medidas.w;
  const altura = () => medidas.h;

  const linha = gsap.timeline();

  ScrollTrigger.create({
    trigger: envoltorio,
    start: "top top",
    // A distância vem do CSS (`--gal-curso`), não de uma constante aqui: o
    // ritmo da experiência é decisão de desenho, e ela mora junto do resto do
    // desenho. 600% no desktop, 320% no celular.
    end: () =>
      `+=${getComputedStyle(secao).getPropertyValue("--gal-curso").trim() || 600}%`,
    pin: palco,
    /* 0.6 EM VEZ DE 1. O `scrub` é o atraso, em segundos, que a composição leva
       para alcançar a posição de rolagem — é ele que dá o deslizado. Em 1s, e
       com quatro etapas em vez de uma deriva contínua, o atraso passava a
       trabalhar contra o desenho: a rolagem parava e a cena continuava
       chegando por quase um segundo, então a virada de etapa acontecia DEPOIS
       de o dedo ter soltado. Lido na tela, isso não é suavidade, é atraso.

       0.6 mantém a inércia (sem `scrub` numérico a composição gruda no pixel
       da rolagem e treme) e devolve o começo e o fim de cada etapa para dentro
       do gesto que os provocou. */
    scrub: 0.6,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: linha,
    onUpdate: (self) => {
      const p = self.progress;
      const i = cenas.findIndex(
        (c, idx) => p >= c.faixa[0] && (p < c.faixa[1] || idx === cenas.length - 2)
      );
      aoTrocarCena(i < 0 ? 0 : i);
    },
  });

  /* ── as fotos ──────────────────────────────────────────────────────────
     Um `fromTo` por trecho entre cenas, todos com `immediateRender: false`
     menos o primeiro. É o que torna a busca na linha do tempo determinística:
     com `to`, o GSAP grava o valor inicial na primeira vez que o tween roda, e
     quem rola para o meio da galeria e depois volta encontraria outro começo. */
  for (const foto of buscar<HTMLElement>("[data-foto]")) {
    // No celular a camada distante e a foto de fundo não são desenhadas (ver
    // o `@media (max-width: 767px)` no módulo). Sem esta guarda elas ainda
    // receberiam um tween por quadro para não aparecer em lugar nenhum.
    if (!desktop) {
      const camada = foto.closest("[data-camada]")?.getAttribute("data-camada");
      if (camada === "longe" || camada === "palavras") continue;
    }
    const id = foto.dataset.foto!;
    const quadros = quadrosDaFoto(id);
    const base = larguraMaxima[id] ?? 20;

    const geometria = (q: Quadro) => ({
      x: () => (q.x / 100) * largura(),
      y: () => (q.y / 100) * altura(),
      scale: q.largura / base,
      rotation: q.giro,
    });

    gsap.set(foto, {
      xPercent: -50,
      yPercent: -50,
      ...geometria(quadros[0]),
      opacity: quadros[0].opacidade,
    });

    for (let i = 0; i < quadros.length - 1; i++) {
      const inicio = cenas[i].faixa[0];
      const fim = cenas[i + 1].faixa[0];
      if (fim <= inicio) continue;
      const duration = fim - inicio;

      linha.fromTo(
        foto,
        geometria(quadros[i]),
        {
          ...geometria(quadros[i + 1]),
          duration,
          /* `power2.inOut` EM TODO TRECHO, e antes era linear em quase todos.
             A troca é o que dá o "encaixe".

             Linear, uma foto atravessa a tela em velocidade constante e chega
             à posição nova do mesmo jeito que saiu da antiga: sem começo nem
             fim, só passagem. Com `inOut` ela desprende devagar, cruza rápido e
             DESACELERA nos últimos pontos antes de parar — e como o trecho
             seguinte é uma parada de verdade (a mesma composição repetida), a
             desaceleração desemboca em imobilidade em vez de emendar no
             próximo movimento. É esse par, curva mais parada, que se lê como a
             composição se montando.

             Nos trechos de parada a curva não faz diferença nenhuma: os dois
             quadros são iguais e interpolar entre valores idênticos dá o mesmo
             valor com qualquer curva. */
          ease: "power2.inOut",
          immediateRender: false,
        },
        inicio
      );

      /* A OPACIDADE TEM TWEEN PRÓPRIO, E ISSO CONSERTA UM DEFEITO DE VERDADE.
         Junto da geometria, ela usava a mesma curva linear e levava a faixa
         inteira para ir de 1 a 0 — no meio de uma virada de cena havia quinze
         fotos na tela, seis saindo e seis entrando, todas em meia
         transparência empilhadas umas sobre as outras. Medido: 15 elementos
         acima de 6% de opacidade, contra o teto de 9 do desenho.

         Separada, ela ganha uma curva por DIREÇÃO: quem sai apaga cedo
         (`power2.out` derruba a opacidade no primeiro terço) e quem entra
         acende tarde (`power2.in`). A foto continua se movendo pela faixa
         toda — o movimento não foi encurtado —, mas o cruzamento de
         transparências fica comprimido junto às bordas da cena, que é onde ele
         não atrapalha ninguém. */
      const de = quadros[i].opacidade;
      const para = quadros[i + 1].opacidade;

      /* A OPACIDADE TEM TWEEN PRÓPRIO, E ISSO CONSERTA UM DEFEITO DE VERDADE.
         Junto da geometria, ela usava a mesma curva e levava o trecho inteiro
         para ir de 1 a 0 — no meio de uma troca havia quinze fotos na tela,
         as que saem e as que entram, todas em meia transparência empilhadas
         umas sobre as outras. Medido: 15 elementos acima de 6% de opacidade,
         contra o teto de 9 do desenho.

         Separada, ela ganha uma curva por DIREÇÃO, e em `power3`: quem sai cai
         quase todo no primeiro quarto do trecho e quem entra só acende no
         último. A foto continua se movendo pelo trecho todo — o movimento não
         foi encurtado —, mas o cruzamento de transparências fica comprimido
         junto às bordas. Sobra, no meio, uma batida em que a tela tem a palavra
         gigante e mais nada, e é essa batida que separa uma etapa da outra. */
      linha.fromTo(
        foto,
        { opacity: de },
        {
          opacity: para,
          duration,
          ease: para < de ? "power3.out" : para > de ? "power3.in" : "none",
          immediateRender: false,
        },
        inicio
      );
    }
  }

  /* ── as palavras gigantes ──────────────────────────────────────────────
     Uma por cena, atravessando a tela de `xPercent: 8` a `-8` durante a
     própria faixa, com fusão nas pontas. As fusões ocupam 18% da faixa de cada
     lado — o bastante para nunca haver duas legíveis ao mesmo tempo, que é a
     única regra que importa aqui. */
  for (const palavra of buscar<HTMLElement>("[data-palavra]")) {
    const cena = cenas.find((c) => c.id === palavra.dataset.palavra);
    if (!cena) continue;
    const [inicio, fim] = cena.faixa;
    const duracao = fim - inicio;
    const fusao = duracao * 0.18;

    gsap.set(palavra, { xPercent: 8, opacity: 0 });
    linha
      .to(palavra, { opacity: 0.07, duration: fusao, ease: "none" }, inicio)
      .to(
        palavra,
        { xPercent: -8, duration: duracao, ease: "none" },
        inicio
      )
      .to(
        palavra,
        { opacity: 0, duration: fusao, ease: "none" },
        fim - fusao
      );
  }

  /* ── as legendas ──────────────────────────────────────────────────────── */
  for (const legenda of buscar<HTMLElement>("[data-legenda]")) {
    const cena = cenas.find((c) => c.id === legenda.dataset.legenda);
    if (!cena) continue;
    const [inicio, fim] = cena.faixa;
    const lugar = cena.legendaEm ?? [8, 78];
    legenda.style.setProperty("--leg-x", `${lugar[0]}%`);
    legenda.style.setProperty("--leg-y", `${lugar[1]}%`);

    const entrada = Math.min(0.055, (fim - inicio) * 0.34);
    /** A última legenda da coreografia — nenhuma cena posterior tem legenda. */
    const ultima = !cenas.some((c) => c.legenda && c.faixa[0] > cena.faixa[0]);

    gsap.set(legenda, { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" });
    linha
      .to(
        legenda,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: entrada,
          ease: "power3.out",
        },
        inicio + entrada * 0.4
      )
      /* A ÚLTIMA LEGENDA ("aqui a gente vive.") NÃO SAI: ela é o repouso do
         Ato II, e apagá-la deixaria a tela vazia justo no momento em que a
         experiência precisa respirar antes de soltar o palco.

         A cena é encontrada pela ausência de uma seguinte, e não pelo id
         escrito: `cena.id === "desaceleracao"` era o teste antigo, e ele
         sobreviveu por uma revisão inteira depois de a cena ter sido
         renomeada — a legenda final apagava e ninguém via o motivo no código,
         porque a linha continuava dizendo a intenção certa sobre uma cena que
         não existia mais. */
      .to(
        legenda,
        {
          opacity: ultima ? 1 : 0,
          y: ultima ? 0 : -12,
          duration: entrada,
          ease: "power2.in",
        },
        fim - entrada
      );
  }

  /* ── o trilho da etapa ────────────────────────────────────────────────
     UMA POR VEZ, e as quatro sobrepostas no mesmo canto (ver `.etapa` no
     módulo de CSS). A etiqueta que sai e a que entra cruzam em opacidade, sem
     empurrar uma à outra.

     A FAIXA DE CADA ETAPA COMEÇA NA TROCA que traz a composição dela, não na
     parada — quem decide isso é `etapas`, em `lib/galeria.ts`. O efeito aqui é
     o encadeamento: a etiqueta acende junto com a primeira foto que chega e
     apaga junto com a primeira que sai.

     O TRAÇO MEDE A ETAPA, não a seção. Ele enche uma vez por etapa e recomeça
     do zero na seguinte — a versão anterior era uma barra só, indo de 0 a 100
     ao longo do pin inteiro, que respondia "você está na metade" sem dizer de
     quê. */
  for (const marca of buscar<HTMLElement>("[data-etapa]")) {
    const etapa = etapas.find((e) => e.id === marca.dataset.etapa);
    if (!etapa) continue;
    const [inicio, fim] = etapa.faixa;

    /* A acesa e a apagada duram 0.02 do pin — cerca de 12vh de rolagem no
       desktop. Instantâneo demais pisca; lento demais deixa duas etiquetas
       meio-acesas sobrepostas, que é a única leitura errada possível aqui. */
    gsap.set(marca, { opacity: 0 });
    linha.fromTo(
      marca,
      { opacity: 0 },
      { opacity: 1, duration: 0.02, ease: "power2.out", immediateRender: false },
      inicio
    );

    /* A APAGADA COMEÇA EM `fim`, e não em `fim - 0.02`: em `fim - 0.02` ela
       terminaria no instante em que a etapa seguinte começa a acender, e
       haveria um quadro com o canto vazio — um piscar. Começando em `fim`, as
       duas cruzam na mesma janela.

       A última não apaga. Ela é onde a experiência termina, e apagá-la
       deixaria o canto vazio no fim do Ato II. */
    if (fim < 1) {
      linha.fromTo(
        marca,
        { opacity: 1 },
        { opacity: 0, duration: 0.02, ease: "power2.in", immediateRender: false },
        fim
      );
    }

    const preenchida = marca.querySelector<HTMLElement>("[data-etapa-preenchida]");
    if (preenchida) {
      gsap.set(preenchida, { scaleX: 0 });
      linha.fromTo(
        preenchida,
        { scaleX: 0 },
        { scaleX: 1, duration: fim - inicio, ease: "none", immediateRender: false },
        inicio
      );
    }
  }

  /* ── a profundidade: deriva por camada ─────────────────────────────────
     Cada camada desliza alguns por cento de altura ao longo do pin inteiro. É
     pouco de propósito: parallax que se nota deixa de ser profundidade e vira
     efeito. */
  for (const [nome, deriva] of Object.entries(DERIVA)) {
    const camada = secao.querySelector<HTMLElement>(`[data-camada="${nome}"]`);
    if (!camada) continue;
    linha.fromTo(
      camada,
      { yPercent: 0 },
      { yPercent: deriva, duration: 1, ease: "none" },
      0
    );
  }

  /* ── a dica de rolagem some quando o pin engata ────────────────────────── */
  const dica = secao.querySelector<HTMLElement>("[data-dica]");
  if (dica) {
    gsap.to(dica, {
      opacity: 0,
      y: 8,
      scrollTrigger: { trigger: envoltorio, start: "top 92%", end: "top top", scrub: true },
    });
    // O respiro em laço, que é o que faz a dica parecer um convite e não um
    // rótulo. Fora da linha do tempo do pin: ele não depende da rolagem.
    gsap.to(dica.querySelector("[data-dica-traco]"), {
      y: 8,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  /* ── a câmera do mouse ────────────────────────────────────────────────
     Escrita direto no `style.translate` dentro de um laço de animação. Não
     passa por estado do React e não passa por `transform` — o `transform` das
     camadas é do GSAP (a deriva acima), e as duas propriedades se compõem sem
     disputar a mesma matriz.

     Só em ponteiro fino e tela grande: num aparelho de toque não existe
     "posição do cursor", e o laço ficaria rodando para sempre sem nada a
     fazer. */
  if (desktop && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const camadas: { el: HTMLElement; forca: number }[] = [];
    for (const nome of ["longe", "meio", "perto"] as const) {
      const el = secao.querySelector<HTMLElement>(`[data-camada="${nome}"]`);
      if (el) camadas.push({ el, forca: CAMERA[nome] });
    }

    let alvoX = 0;
    let alvoY = 0;
    const atual = camadas.map(() => ({ x: 0, y: 0 }));
    let quadro = 0;

    const aoMover = (e: PointerEvent) => {
      const r = palco.getBoundingClientRect();
      // Inversamente proporcional: o cursor à direita empurra as camadas para
      // a esquerda. É o que dá a sensação de olhar em volta de uma cena, em
      // vez de arrastar um plano de fundo.
      alvoX = -((e.clientX - r.left) / r.width - 0.5) * 2;
      alvoY = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const passo = () => {
      camadas.forEach((camada, i) => {
        const p = atual[i];
        p.x += (alvoX * camada.forca - p.x) * 0.06;
        p.y += (alvoY * camada.forca - p.y) * 0.06;
        camada.el.style.translate = `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px`;
      });
      quadro = requestAnimationFrame(passo);
    };

    palco.addEventListener("pointermove", aoMover);
    quadro = requestAnimationFrame(passo);

    /* O `gsap.context()` desfaz tweens e ScrollTriggers sozinho, mas não sabe
       de ouvintes de evento nem de `requestAnimationFrame`. Por isso esta
       função sobe até o `matchMedia`, que a chama quando a consulta de mídia
       deixa de valer ou quando o componente sai. Sem ela, o laço continuaria
       rodando depois de a galeria desmontar. */
    return () => {
      palco.removeEventListener("pointermove", aoMover);
      cancelAnimationFrame(quadro);
      camadas.forEach((c) => (c.el.style.translate = ""));
      ScrollTrigger.removeEventListener("refreshInit", remedir);
    };
  }

  // Sem a câmera do mouse não há nada além do ouvinte de medidas para desligar.
  return () => ScrollTrigger.removeEventListener("refreshInit", remedir);
}

/* ═══════════════════════════════════════════════════════════════════════════
   ATO I — a entrada
   ═══════════════════════════════════════════════════════════════════════════ */

function montarAtoI(secao: HTMLElement) {
  const linhas = secao.querySelectorAll("[data-abertura-linha]");
  if (linhas.length) {
    gsap.fromTo(
      linhas,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: linhas[0], start: "top 82%" },
      }
    );
  }

  const preparacao = secao.querySelector("[data-preparacao]");
  if (preparacao) {
    gsap.fromTo(
      preparacao,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: { trigger: preparacao, start: "top 88%" },
      }
    );
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ATO III — a desaceleração

   Um gatilho POR FRASE, e é isso que garante a pausa: se as duas dividissem um
   gatilho, elas apareceriam juntas, e o desenho é explícito em que não podem
   caber na mesma tela. O CSS separa as duas por 46vh; aqui, cada uma espera a
   própria vez.
   ═══════════════════════════════════════════════════════════════════════════ */

function montarAtoIII(secao: HTMLElement) {
  for (const alvo of Array.from(
    secao.querySelectorAll<HTMLElement>("[data-saida]")
  )) {
    gsap.fromTo(
      alvo,
      { opacity: 0, y: 26 },
      {
        opacity: alvo.dataset.saidaOpacidade
          ? Number(alvo.dataset.saidaOpacidade)
          : 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: alvo, start: "top 84%" },
      }
    );
  }
}

/**
 * As imagens da cena seguinte, buscadas E DECODIFICADAS antes de a cena virar.
 *
 * O `decode()` é a parte que importa, e ele entrou depois de uma medição. Só
 * baixar (`new Image().src = ...`) deixa o arquivo no cache, mas a
 * TRANSFORMAÇÃO em bitmap continua acontecendo na hora em que a `<img>` monta
 * e pinta — no meio da rolagem, na thread principal. Com a CPU freada em 4×, o
 * perfilador mostrava quadros de 283ms exatamente nas viradas de cena. O
 * `decode()` faz esse trabalho fora do caminho crítico, enquanto a cena
 * anterior ainda está rolando.
 *
 * O `catch` vazio é intencional e não é preguiça: `decode()` rejeita quando a
 * imagem é substituída ou a busca falha, e nada disso é um erro a tratar — a
 * `<img>` da cena vai carregar normalmente, só sem o adiantamento.
 *
 * `origensDaFoto` entra aqui pela mesma razão que entra na marcação: sem ele o
 * preload buscaria o arquivo de 1600px e o navegador, na hora de pintar,
 * pediria o de 800 — dois downloads e nenhum adiantamento.
 */
export function precarregarVizinhas(indice: number) {
  const pedir = (src: string, srcset?: string) => {
    const img = new Image();
    if (srcset) img.srcset = srcset;
    img.src = src;
    img.decode?.().catch(() => {});
  };

  const proxima = cenas[indice + 1];
  if (proxima) {
    for (const id of Object.keys(proxima.quadros)) {
      const foto = porId.get(id);
      if (foto) pedir(foto.src, origensDaFoto(foto));
    }
  }

}
