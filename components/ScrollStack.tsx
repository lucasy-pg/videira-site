"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import css from "./scroll-stack.module.css";

/**
 * ScrollStack — porte do componente do React Bits.
 *
 * O desenho é o do original: os itens sobem com a rolagem normal da página e vão
 * parando um degrau abaixo do anterior, cada um encolhendo um triz, de modo que
 * do já lido sobre sempre uma faixa à vista no topo. As props têm os mesmos
 * nomes e o mesmo significado do original — `itemDistance`, `itemScale`,
 * `itemStackDistance`, `stackPosition`, `scaleEndPosition`, `baseScale`,
 * `rotationAmount`, `blurAmount`, `onStackComplete`.
 *
 * O QUE MUDA EM RELAÇÃO AO ORIGINAL, e por quê:
 *
 * 1. SEM LENIS. O original move a página com rolagem suave própria. Aqui isso
 *    sequestraria a rolagem do site inteiro, e três coisas já dependem da
 *    rolagem nativa: o Header, que some ao descer e volta ao subir; o
 *    `scroll-behavior: smooth` do `globals.css`, que serve às âncoras; e o GSAP
 *    ScrollTrigger da galeria dos Radicais Livres.
 *
 * 2. O PIN É `position: sticky`, E É CONSEQUÊNCIA DIRETA DO ITEM 1. O original
 *    prende cada painel escrevendo `translateY` a cada quadro; isso só fica em
 *    fase com a rolagem porque o Lenis move a página no mesmo laço. Sem Lenis a
 *    página rola no compositor e o `transform` chega um quadro atrasado — o
 *    painel pinado anda os pixels da rolagem e volta, a cada quadro, e o efeito
 *    é um TREMOR bem visível. Foi o que aconteceu na primeira versão deste
 *    arquivo. Delegar o pin ao `sticky` tira o JavaScript do caminho: quem
 *    segura o painel é o layout do navegador, em fase com a rolagem por
 *    construção. A conta do `top` está no `scroll-stack.module.css` e é a mesma
 *    do original (`stackPosition + i * itemStackDistance`).
 *
 *    Ao JS sobrou a escala (e o giro e o desfoque, se pedidos), que variam
 *    1,5% ao longo de centenas de pixels: um quadro de atraso ali move menos de
 *    um pixel e não se vê. Só o pin precisava ser exato.
 *
 *    O preço é a SAÍDA DA PILHA. No original todos os painéis descolam juntos,
 *    num ponto calculado; com `sticky` cada um descola quando o pé do bloco pai
 *    o alcança, o que acontece primeiro com o de cima. O resultado é a pilha se
 *    fechando de cima para baixo — os quatro se alinham num só e vão embora
 *    juntos. É o movimento de entrada ao contrário, e ficou bom; mas é
 *    diferente do original e vale saber antes de estranhar.
 *
 * 3. O MODO DE CONTÊINER PRÓPRIO (`useWindowScroll={false}`), em que a pilha
 *    rola dentro de uma caixa com `overflow` próprio, não veio: aqui a pilha
 *    rola com a página, e a outra versão seria código morto.
 *
 * O que foi ACRESCENTADO é o `enabledQuery`. Fora dele o componente não escuta
 * nada, não escreve `transform` e não põe o `data-empilha` que liga o `sticky`
 * no CSS — os painéis viram uma sequência vertical de blocos comuns. É por aí
 * que o celular e quem pediu menos movimento no sistema saem do efeito, sem que
 * a media query precise ser repetida no CSS de quem usa o componente.
 */

export function ScrollStackItem({
  children,
  itemClassName = "",
  style,
}: {
  children: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`${css.card} ${itemClassName}`.trim()} style={style}>
      {children}
    </div>
  );
}

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Folga entre dois painéis antes de empilharem, em px. */
  itemDistance?: number;
  /** Quanto cada painel mais fundo na pilha encolhe a mais que o de cima. */
  itemScale?: number;
  /** O degrau da pilha, em px — é a faixa que sobra à vista de cada painel. */
  itemStackDistance?: number;
  /** Onde o topo da pilha pára. Aceita `%` da altura da janela. */
  stackPosition?: string | number;
  /** Onde a escala termina de encolher. Precisa ser MENOR que `stackPosition`. */
  scaleEndPosition?: string | number;
  /** Escala do painel mais fundo da pilha. */
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  /** Fora desta media query o componente é inerte e nada gruda. */
  enabledQuery?: string;
  onStackComplete?: () => void;
};

/** `"20%"` vira 20% da altura da janela; um número puro vira ele mesmo em px. */
function emPixels(valor: string | number, base: number) {
  if (typeof valor === "string" && valor.trim().endsWith("%")) {
    return (parseFloat(valor) / 100) * base;
  }
  return parseFloat(String(valor)) || 0;
}

/** A mesma medida escrita para o CSS, onde `%` da janela é `vh`. */
function emCss(valor: string | number) {
  if (typeof valor === "string" && valor.trim().endsWith("%")) {
    return `${parseFloat(valor)}vh`;
  }
  return `${parseFloat(String(valor)) || 0}px`;
}

/** Quanto já se andou de `inicio` a `fim`, preso entre 0 e 1. */
function avanco(atual: number, inicio: number, fim: number) {
  if (fim <= inicio) return atual >= fim ? 1 : 0;
  if (atual <= inicio) return 0;
  if (atual >= fim) return 1;
  return (atual - inicio) / (fim - inicio);
}

export function ScrollStack({
  children,
  className = "",
  style,
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  enabledQuery = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  onStackComplete,
}: ScrollStackProps) {
  const raizRef = useRef<HTMLDivElement>(null);
  const painesRef = useRef<HTMLElement[]>([]);
  /* Onde cada painel COMEÇA no fluxo, em pixels a partir do topo da raiz.
     Medido fora do quadro de rolagem, porque `getBoundingClientRect` de um
     painel pregado devolve a posição PREGADA, não a de fluxo — perguntar a ele
     a cada quadro realimentaria a própria conta. A soma de `offsetHeight` com a
     folga entre painéis não tem esse problema: altura é altura, grudado ou
     não. */
  const deslocamentos = useRef<number[]>([]);
  /* O último `transform` escrito em cada painel. Sem esta memória o componente
     reescreveria os quatro `style` a cada quadro de rolagem, inclusive nos
     trechos em que a escala já chegou ao fim e nada muda. */
  const escrito = useRef(new WeakMap<HTMLElement, string>());
  const encerrado = useRef(false);
  const quadro = useRef(0);

  /* Começa desligado nos dois lados: no servidor não há `matchMedia`, e no
     cliente o primeiro quadro tem que ser igual ao HTML que veio pronto. */
  const [ligado, setLigado] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(enabledQuery);
    const ler = () => setLigado(mq.matches);
    ler();
    mq.addEventListener("change", ler);
    return () => mq.removeEventListener("change", ler);
  }, [enabledQuery]);

  const medir = useCallback(() => {
    let acumulado = 0;
    deslocamentos.current = painesRef.current.map((painel) => {
      const inicio = acumulado;
      acumulado += painel.offsetHeight + itemDistance;
      return inicio;
    });
  }, [itemDistance]);

  const posicionar = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    const paineis = painesRef.current;
    const rolagem = window.scrollY;
    const janela = window.innerHeight;
    /* A raiz não é pregada nem transformada, então o retângulo dela é posição de
       layout de verdade — é a âncora que converte os deslocamentos medidos em
       posições no documento, que é onde a rolagem é medida. */
    const topoRaiz = raiz.getBoundingClientRect().top + rolagem;
    const parada = emPixels(stackPosition, janela);
    const fimEscala = emPixels(scaleEndPosition, janela);

    /* Qual painel está no topo da pilha agora. Só serve ao desfoque, que mede
       profundidade — quantos painéis existem por cima deste. */
    let noTopo = 0;
    if (blurAmount) {
      for (let j = 0; j < paineis.length; j++) {
        const gatilho =
          topoRaiz +
          deslocamentos.current[j] -
          parada -
          itemStackDistance * j;
        if (rolagem >= gatilho) noTopo = j;
      }
    }

    let ultimoParou = false;

    paineis.forEach((painel, i) => {
      const topoPainel = topoRaiz + deslocamentos.current[i];
      /* A linha em que este painel pára — a mesma que o CSS usa no `top` do
         `sticky`. Aqui ela só serve para saber QUANDO a escala começa. */
      const degrau = parada + itemStackDistance * i;
      const gatilho = topoPainel - degrau;

      if (i === paineis.length - 1) ultimoParou = rolagem >= gatilho;

      const p = avanco(rolagem, gatilho, topoPainel - fimEscala);
      const alvo = baseScale + i * itemScale;
      const escala = 1 - p * (1 - alvo);
      const giro = rotationAmount ? i * rotationAmount * p : 0;
      const desfoque = blurAmount && i < noTopo ? (noTopo - i) * blurAmount : 0;

      const t = `scale(${Math.round(escala * 10000) / 10000}) rotate(${
        Math.round(giro * 100) / 100
      }deg)`;

      if (escrito.current.get(painel) !== t) {
        painel.style.transform = t;
        painel.style.filter = desfoque ? `blur(${desfoque}px)` : "";
        escrito.current.set(painel, t);
      }
    });

    if (ultimoParou !== encerrado.current) {
      encerrado.current = ultimoParou;
      if (ultimoParou) onStackComplete?.();
    }
  }, [
    baseScale,
    blurAmount,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    const paineis = Array.from(
      raiz.querySelectorAll<HTMLElement>(`.${css.card}`)
    );
    painesRef.current = paineis;
    /* O índice de cada painel, que o CSS usa para calcular a linha de parada.
       Escrito uma vez, não a cada quadro. */
    paineis.forEach((painel, i) =>
      painel.style.setProperty("--stack-i", String(i))
    );

    const limpar = () => {
      paineis.forEach((p) => {
        p.style.transform = "";
        p.style.filter = "";
      });
      escrito.current = new WeakMap();
    };

    if (!ligado) {
      limpar();
      return;
    }

    const remedir = () => {
      medir();
      agendar();
    };

    const agendar = () => {
      if (quadro.current) return;
      quadro.current = requestAnimationFrame(() => {
        quadro.current = 0;
        posicionar();
      });
    };

    medir();
    posicionar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", remedir);
    /* As fotos chegam depois do primeiro quadro e mudam a altura dos painéis.
       Sem observar isso, a escala fica calculada em cima de uma geometria que
       não existe mais — e não há sintoma nenhum além de "está meio torto". */
    const ro = new ResizeObserver(remedir);
    ro.observe(raiz);

    return () => {
      if (quadro.current) cancelAnimationFrame(quadro.current);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", remedir);
      ro.disconnect();
      limpar();
    };
  }, [ligado, medir, posicionar]);

  return (
    <div
      ref={raizRef}
      className={`${css.raiz} ${className}`.trim()}
      data-empilha={ligado ? "" : undefined}
      style={
        {
          ...style,
          "--item-distance": `${itemDistance}px`,
          "--item-stack-distance": `${itemStackDistance}px`,
          "--stack-top": emCss(stackPosition),
        } as CSSProperties
      }
    >
      {children}
      <div className={css.fim} aria-hidden />
    </div>
  );
}
