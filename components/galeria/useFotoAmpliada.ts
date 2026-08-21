"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { porId, type FotoGaleria } from "@/lib/galeria";
import { travarRolagem } from "@/lib/travar-rolagem";

/**
 * A ABERTURA DA FOTO — e ela NÃO é um modal.
 *
 * A diferença não é vocabulário. Um modal aparece do nada no centro da tela e
 * a foto clicada não tem participação nenhuma no que acontece; aqui a foto
 * clicada É o que se move. O usuário nunca perde de vista qual imagem ele
 * pediu, porque ela nunca deixa de estar na tela.
 *
 * ── COMO ─────────────────────────────────────────────────────────────────
 *
 * 1. mede-se o retângulo da foto na tela (`getBoundingClientRect`);
 * 2. um CLONE `position: fixed` nasce exatamente sobre ele — o original fica
 *    onde está, só invisível, para o palco não mudar de altura;
 * 3. o clone anima até o destino;
 * 4. ao fechar, a linha do tempo é REVERTIDA. Não se anima "de volta para o
 *    retângulo": reverte-se o mesmo caminho. É o que faz a volta cair no pixel
 *    exato, mesmo que a página tenha rolado um pouco no meio.
 *
 * ── O QUE NÃO SE FAZ AQUI, E POR QUÊ ─────────────────────────────────────
 *
 * NÃO se chama `ScrollTrigger.refresh()` na abertura nem no fechamento. O pin
 * do Ato II mede a altura da seção; um refresh com o corpo travado mediria a
 * página sem barra de rolagem, e o palco saltaria alguns pixels ao fechar.
 * Refresh só no redimensionamento — que é onde ele está, no motor.
 *
 * NÃO se desmonta o palco. Ele continua montado atrás do véu, recuado e
 * levemente desfocado. Desmontar economizaria pintura por meio segundo e
 * custaria o pin inteiro.
 *
 * ── O PAINEL, E QUEM DECIDE O QUE ELE MOSTRA ─────────────────────────────
 *
 * Ele não tem texto nenhum — decisão registrada. O acervo não tem metadado de
 * evento, data nem descrição (ver o cabeçalho de `lib/galeria.ts`), e a única
 * frase que havia era o `alt` da foto impresso na tela, que lido em voz alta
 * soava a laudo de catálogo. O `alt` segue vivo onde serve, nos rótulos de
 * acessibilidade.
 *
 * O que sobrou no painel são as VIZINHAS — e quais são elas NÃO se decide
 * aqui. Vem de `irmasDe`, que quem monta a superfície passa, porque "o que
 * mais tem aqui" quer dizer coisas diferentes nos dois atos:
 *
 *   no PALCO   a composição da etapa em que a foto pisa. Nove fotos, as
 *              mesmas que estavam na tela um instante antes do clique.
 *   no MURAL   o capítulo inteiro da parede. Lá não há etapa nenhuma, e o
 *              contrato do ato é o acervo completo.
 *
 * Antes disto o gancho filtrava o acervo pelo capítulo e o painel cortava
 * quatro — e as quatro saíam do acervo INTEIRO, então quem abria uma foto na
 * etapa Células recebia como sugestão três fotos que nunca pisaram no palco.
 * Sugestão que aponta para fora do que está na tela não é sugestão.
 *
 * A MESMA LISTA MANDA NAS SETAS ← →. Ter o painel andando num conjunto e o
 * teclado noutro é o tipo de divergência que só aparece para quem usa os dois.
 */

type Estado = {
  foto: FotoGaleria;
  origem: HTMLElement;
};

/** O palco entra por parâmetro em vez de o gancho criar a referência: quem
 *  monta o palco é a `Galeria`, e devolver uma referência vazia para ela
 *  preencher obrigaria a escrever em `.current` durante a renderização. */
export function useFotoAmpliada(
  palcoRef: React.RefObject<HTMLElement | null>,
  /** A vizinhança da foto aberta — ver a caixa "O PAINEL" acima. Precisa ser
   *  estável entre renderizações (uma função de módulo, não uma criada no
   *  corpo do componente), senão a memória abaixo se refaz a cada quadro. */
  irmasDe: (foto: FotoGaleria) => FotoGaleria[]
) {
  const [aberta, setAberta] = useState<Estado | null>(null);
  const linhaRef = useRef<gsap.core.Timeline | null>(null);

  const cloneRef = useRef<HTMLDivElement | null>(null);
  const veuRef = useRef<HTMLDivElement | null>(null);
  const painelRef = useRef<HTMLDivElement | null>(null);
  const botaoRef = useRef<HTMLButtonElement | null>(null);

  const abrir = useCallback((id: string, origem: HTMLElement) => {
    const foto = porId.get(id);
    if (foto) setAberta({ foto, origem });
  }, []);

  const fechar = useCallback(() => {
    const linha = linhaRef.current;
    if (!linha) {
      setAberta(null);
      return;
    }
    linha.eventCallback("onReverseComplete", () => setAberta(null));
    linha.reverse();
  }, []);

  /* ── a trava da rolagem ────────────────────────────────────────────────
     ISTO JÁ ESTEVE ERRADO AQUI, e o erro não aparecia em teste de estado: a
     versão anterior escrevia `overflow: hidden` no `<body>`, o `getComputedStyle`
     confirmava `hidden`, e a página rolava atrás da foto assim mesmo. A causa
     está no `overflow-x: clip` do `<html>`, que desliga a propagação do
     `overflow` do body para a página — o porquê inteiro está em
     `lib/travar-rolagem.ts`. */
  useEffect(() => {
    if (!aberta) return;
    return travarRolagem();
  }, [aberta]);

  /* ── a coreografia ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!aberta) return;
    const clone = cloneRef.current;
    const veu = veuRef.current;
    if (!clone || !veu) return;

    const origem = aberta.origem.getBoundingClientRect();
    const foto = aberta.foto;

    // O destino: ~62vw, centralizado na vertical, deslocado à esquerda para o
    // painel caber à direita sem cobrir a imagem. No celular não há coluna
    // lateral, então a foto ocupa a largura toda e o painel desce para o pé.
    const estreito = window.innerWidth < 768;
    const larguraAlvo = estreito
      ? window.innerWidth * 0.9
      : window.innerWidth * 0.62;
    const alturaAlvo = larguraAlvo * (foto.h / foto.w);
    const maxAltura = window.innerHeight * (estreito ? 0.62 : 0.86);
    const escala = alturaAlvo > maxAltura ? maxAltura / alturaAlvo : 1;
    const larguraFinal = larguraAlvo * escala;
    const alturaFinal = alturaAlvo * escala;
    const esquerdaFinal = estreito
      ? (window.innerWidth - larguraFinal) / 2
      : window.innerWidth * 0.06;
    const topoFinal = estreito
      ? window.innerHeight * 0.08
      : (window.innerHeight - alturaFinal) / 2;

    gsap.set(clone, {
      left: origem.left,
      top: origem.top,
      width: origem.width,
      height: origem.height,
      borderRadius: 4,
    });

    const linha = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 0.7 },
    });
    linhaRef.current = linha;

    linha
      .to(veu, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
      // A largura e a altura ANIMAM aqui, e é a única vez em todo o arquivo.
      // A regra de só mexer em `transform` existe para o que roda durante a
      // rolagem, com trinta elementos ao mesmo tempo. Aqui é um elemento, uma
      // vez, por 700ms — e `scale` deformaria a foto, porque o retângulo de
      // origem e o de destino têm proporções diferentes (o de origem é o
      // recorte na tela, o de destino é a proporção real do arquivo).
      .to(
        clone,
        {
          left: esquerdaFinal,
          top: topoFinal,
          width: larguraFinal,
          height: alturaFinal,
          borderRadius: 0,
        },
        0
      )
      .to(
        palcoRef.current,
        { scale: 0.98, filter: "blur(3px)", duration: 0.6, ease: "power2.out" },
        0
      )
      .fromTo(
        painelRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        0.25
      )
      .fromTo(
        botaoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.3
      );

    // O palco é lido aqui e guardado para a limpeza: no momento em que ela
    // roda, a referência pode já apontar para outro nó.
    const palco = palcoRef.current;
    return () => {
      linha.kill();
      linhaRef.current = null;
      gsap.set(palco, { scale: 1, filter: "none" });
    };
  }, [aberta, palcoRef]);

  /* A vizinhança INCLUI a foto aberta: é ela que dá o ponto de partida das
     setas. Quem desenha o painel é que a tira da grade — lá ela seria uma
     miniatura que reabre o que já está aberto. */
  const irmas = useMemo(
    () => (aberta ? irmasDe(aberta.foto) : []),
    [aberta, irmasDe]
  );

  /* ── teclado: ESC fecha, ← → andam pela vizinhança ─────────────────────── */
  useEffect(() => {
    if (!aberta) return;

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
        return;
      }
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (!irmas.length) return;
      e.preventDefault();
      const i = irmas.findIndex((f) => f.id === aberta.foto.id);
      const passo = e.key === "ArrowRight" ? 1 : -1;
      const proxima = irmas[(i + passo + irmas.length) % irmas.length];
      // Troca só a foto, mantendo o retângulo de origem: a navegação lateral
      // não deve reabrir a animação inteira a cada seta.
      setAberta((atual) => (atual ? { ...atual, foto: proxima } : atual));
    };

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberta, fechar, irmas]);

  /* ── o foco ────────────────────────────────────────────────────────────
     A armadilha de foco é curta de propósito: dentro do diálogo há o botão de
     fechar e as miniaturas das irmãs, e nada mais. Ao fechar, o foco volta
     para a foto de onde ele saiu — quem navega por teclado precisa reencontrar
     o lugar da galeria em que estava, não o começo da página. */
  useEffect(() => {
    if (!aberta) return;
    const origem = aberta.origem;
    const dialogo = cloneRef.current?.parentElement;
    botaoRef.current?.focus();

    const aoTabular = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogo) return;
      const focaveis = dialogo.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    window.addEventListener("keydown", aoTabular);
    return () => {
      window.removeEventListener("keydown", aoTabular);
      origem.focus?.();
    };
  }, [aberta]);

  // As referências saem soltas e nomeadas, não dentro de um objeto `refs`:
  // agrupadas, cada uso vira `ampliada.refs.veu` no meio da marcação, que lê
  // como acesso a referência durante a renderização — e é assim que a regra
  // `react-hooks/refs` o entende, com razão.
  return { aberta, irmas, abrir, fechar, cloneRef, veuRef, painelRef, botaoRef };
}
