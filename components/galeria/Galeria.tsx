"use client";

import { memo, useEffect, useRef } from "react";
import gsap from "gsap";

import {
  cenas,
  emMovimentoNaCena,
  etapas,
  fotosDaEtapa,
  fotosDaSaida,
  fotosDoPalco,
  janelaDaFoto,
  larguraMaxima,
  origensDaFoto,
  porId,
  type FotoGaleria,
} from "@/lib/galeria";
import { precarregarVizinhas, useMotorDaGaleria } from "./useMotorDaGaleria";
import { useFotoAmpliada } from "./useFotoAmpliada";
import { FotoAmpliada } from "./FotoAmpliada";
import { Mural } from "./Mural";
import css from "./galeria.module.css";

/**
 * A GALERIA IMERSIVA do /radicais-livres.
 *
 * Quatro atos: a entrada em rolagem normal, a imersão com o palco pinado por
 * seis alturas de tela, a desaceleração de volta ao normal, e o mural.
 *
 * O Ato II se divide em QUATRO ETAPAS — Células, Cultos, Encontros, Nós. Cada
 * uma se atravessa em três movimentos: as fotos entram das bordas, a
 * composição PARA enquanto a palavra gigante cruza a tela, e as fotos saem
 * enquanto a etapa seguinte chega. A partitura está em `lib/galeria.ts`.
 *
 * ── O QUARTO ATO, E POR QUE ELE EXISTE ───────────────────────────────────
 *
 * Os três primeiros CONDUZEM: a rolagem da página é o relógio da composição, e
 * quem rola escolhe quando vê, não o que vê. É o certo para contar uma história
 * e o errado para procurar um rosto — e procurar o próprio rosto era o que a
 * rede queria da seção. O Ato IV é a resposta: as 111 fotos do acervo numa
 * parede que o visitante atravessa no ritmo dele. Ver `Mural.tsx`.
 *
 * ── ONDE ESTÁ CADA COISA ─────────────────────────────────────────────────
 *
 *   `lib/galeria.ts`          o acervo, os capítulos e os quadros de cada cena
 *   `useMotorDaGaleria.ts`    o pin, a interpolação, o parallax, a câmera
 *   `useFotoAmpliada.ts`      a abertura da foto pelo clique
 *   `FotoAmpliada.tsx`        a marcação da foto aberta, usada pelos dois atos
 *   `Mural.tsx`               o Ato IV
 *   `galeria.module.css`      a aparência e a geometria
 *   este arquivo              a marcação do palco, a janela de montagem e o cursor
 *
 * ── A JANELA DE MONTAGEM, E ONDE ELA DIVERGE DO DESENHO ──────────────────
 *
 * O desenho pedia que só as fotos das cenas `atual-1`, `atual` e `atual+1`
 * existissem no DOM. Aqui os ENVOLTÓRIOS das 40 do palco existem desde sempre;
 * o que entra e sai na janela é a `<img>` de dentro. (As 111 do mural são outra
 * história: lá quem segura o custo é `loading="lazy"` mais
 * `content-visibility`, porque não há linha do tempo para preservar.)
 *
 * A razão é o pin. A linha do tempo do Ato II é montada uma vez e endereça
 * cada foto por elemento; desmontar e remontar elementos no meio de uma
 * rolagem com `scrub` obriga a reconstruir a linha do tempo, e reconstruir uma
 * linha do tempo em curso produz um salto visível — justamente na virada de
 * cena, que é o momento mais delicado da experiência.
 *
 * E o custo que a regra queria evitar continua evitado: 40 `<div>` vazios
 * não pesam (nenhum layout, nenhuma pintura, nenhuma memória de imagem). O que
 * pesava eram 40 imagens decodificadas ao mesmo tempo — e essas continuam
 * entrando e saindo pela janela, com a cena seguinte precarregada por
 * `precarregarVizinhas`.
 */

/** A legenda com uma palavra em roxo claro. O realce vem dos dados, não da
 *  marcação — trocar qual palavra brilha não deveria pedir para abrir um
 *  componente React. */
function Legenda({ texto, realce }: { texto: string; realce?: string }) {
  if (!realce || !texto.includes(realce)) return <>{texto}</>;
  const [antes, ...resto] = texto.split(realce);
  return (
    <>
      {antes}
      <span className={css.legendaRealce}>{realce}</span>
      {resto.join(realce)}
    </>
  );
}

/* `memo` NÃO É PRECAUÇÃO AQUI — é o conserto de um pico medido.

   A cada virada de cena o `cenaAtual` muda, a `Galeria` renderiza de novo e,
   sem isto, as trinta e duas `Foto` renderizavam junto — mesmo as vinte cujas
   propriedades não mudaram nada. Num celular de gama média com a CPU freada em
   4×, esse trabalho caía no mesmo quadro em que as `<img>` novas montavam, e o
   perfilador marcava 300ms ali. Com `memo`, só renderizam as poucas fotos que
   entraram ou saíram da janela.

   As propriedades são todas primitivas menos `aoAbrir`, que vem de um
   `useCallback` sem dependências — sem essa estabilidade, `memo` não pegaria
   nada. */
const Foto = memo(function Foto({
  foto,
  montada,
  emMovimento,
  aoAbrir,
}: {
  foto: FotoGaleria;
  montada: boolean;
  emMovimento: boolean;
  aoAbrir: (id: string, elemento: HTMLElement) => void;
}) {
  const base = larguraMaxima[foto.id] ?? 20;
  const classes = [
    css.foto,
    foto.camada === "longe" && css.fotoLonge,
    foto.camada === "fundo" && css.fotoFundo,
    foto.camada === "perto" && css.fotoPerto,
    emMovimento && css.emMovimento,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      data-foto={foto.id}
      className={classes}
      style={{ ["--largura" as string]: `${base}vw` }}
      /* A foto é um botão porque ela ABRE alguma coisa. Um `<div onClick>`
         aqui deixaria a galeria inteira inacessível pelo teclado, e trinta
         fotos sem tabulação é trinta conteúdos inalcançáveis. */
      aria-label={`Ampliar: ${foto.alt}`}
      onClick={(e) => aoAbrir(foto.id, e.currentTarget)}
    >
      {/* O ENVOLTÓRIO INTERNO EXISTE PARA O HOVER, e a separação é obrigatória.
          O botão de fora tem `transform` e `opacity` escritos pela linha do
          tempo do pin, quadro a quadro; qualquer animação de hover nas mesmas
          propriedades ou brigaria com o `scrub` ou, com `overwrite`, mataria a
          coreografia da foto para o resto da rolagem. O hover mora aqui
          dentro, em transição de CSS, e as duas transformações se multiplicam
          sem se conhecer. */}
      <span className={css.fotoInterna}>
        {montada ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            /* A versão `-grande` NÃO entra aqui, e a ausência é decisão: no
               palco nenhuma foto passa de 34vw, e a de 2400px só serve para a
               foto AMPLIADA por clique — quem a pede é `FotoAmpliada`. Enquanto
               existia o clímax a 92vw, o palco precisava dela; sem ele, oferecê-
               la aqui faria o navegador escolher 2400px numa tela grande para
               desenhar uma foto de 12vw. */
            src={foto.src}
            srcSet={origensDaFoto(foto)}
            alt=""
            width={foto.w}
            height={foto.h}
            decoding="async"
            /* `lazy` mesmo com a janela de montagem, e as duas não brigam: a
               janela decide se o elemento existe, o `lazy` decide se o arquivo
               desce. Uma foto montada mas ainda fora do palco (opacidade 0,
               centro em -18%) não é baixada até fazer falta — e quando faz, o
               `precarregarVizinhas` já pôs o arquivo no cache uma cena antes. */
            loading="lazy"
            /* `sizes` é a maior largura que esta foto alcança na coreografia —
               a mesma que vira a caixa de layout. Sem isto o navegador presume
               100vw e baixa o arquivo grande para uma foto que aparece a 9vw. */
            sizes={`(max-width: 767px) ${Math.min(100, base * 2.4)}vw, ${base}vw`}
            style={{ aspectRatio: `${foto.w} / ${foto.h}` }}
          />
        ) : null}
      </span>
    </button>
  );
});

/* A VIZINHANÇA DE UMA FOTO DO PALCO É A COMPOSIÇÃO DA ETAPA DELA — as nove
   fotos que estavam na tela no instante do clique, e não o capítulo inteiro do
   acervo. As composições são de um capítulo só (a conferência de `lib/galeria`
   recusa o contrário), então o capítulo da foto endereça a etapa dela sem
   precisar consultar a cena em curso — o que também mantém a vizinhança certa
   quando o visitante anda de miniatura em miniatura com o diálogo aberto.

   FORA DO COMPONENTE de propósito: definida no corpo, ela seria uma função
   nova a cada renderização e a memória do gancho se refaria a cada virada de
   cena. */
const irmasNoPalco = (foto: FotoGaleria) => fotosDaEtapa[foto.capitulo];

export function Galeria() {
  const secaoRef = useRef<HTMLElement>(null);
  const envoltorioRef = useRef<HTMLDivElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextoRef = useRef<HTMLSpanElement>(null);

  const { cenaAtual } = useMotorDaGaleria({
    secao: secaoRef,
    envoltorio: envoltorioRef,
    palco: palcoRef,
  });

  /* O palco entra por parâmetro: é ele que recua e desfoca quando uma foto
     abre, e passá-lo assim evita o gancho devolver uma referência vazia para
     este componente preencher — preencher `.current` no corpo do componente é
     efeito colateral em renderização. */
  const ampliada = useFotoAmpliada(palcoRef, irmasNoPalco);

  /* O preload dirigido: ao entrar numa cena, busca as imagens da seguinte. A
     do clímax é pedida duas cenas antes (ver `precarregarVizinhas`). */
  useEffect(() => {
    precarregarVizinhas(cenaAtual);
  }, [cenaAtual]);

  /* ── O CURSOR ──────────────────────────────────────────────────────────
     Um ponto de 8px que vira um círculo de 64px com a palavra VER sobre uma
     foto. A posição é escrita por `gsap.quickTo`, que mantém a suavização sem
     criar um tween novo a cada movimento do mouse — e, principalmente, sem
     passar por `setState`: um `setState` por `pointermove` são cem
     renderizações do React por segundo para mover um ponto.

     NUNCA diz "MEMÓRIA". O desenho previa essa palavra para fotos com
     metadado, e o acervo não tem nenhum (ver `lib/galeria.ts`). Uma palavra
     que promete uma história e abre um painel sem texto é pior que a palavra
     que não promete nada. */
  useEffect(() => {
    const palco = palcoRef.current;
    const cursor = cursorRef.current;
    const texto = cursorTextoRef.current;
    if (!palco || !cursor || !texto) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches)
      return;

    const paraX = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
    const paraY = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });

    const aoMover = (e: PointerEvent) => {
      paraX(e.clientX);
      paraY(e.clientY);
    };
    const aoEntrar = () => gsap.to(cursor, { opacity: 1, duration: 0.2 });
    const aoSair = () => gsap.to(cursor, { opacity: 0, duration: 0.2 });

    /* O cursor só muda de TAMANHO sobre uma foto — o realce da foto e o
       apagamento das vizinhas são CSS (`:has()` no módulo), justamente para
       não escrever nas propriedades que a linha do tempo do pin controla. */
    const sobreFoto = (e: PointerEvent) => {
      const grande = Boolean(
        (e.target as HTMLElement).closest("[data-foto]")
      );
      gsap.to(cursor, {
        width: grande ? 64 : 8,
        height: grande ? 64 : 8,
        margin: grande ? "-32px 0 0 -32px" : "-4px 0 0 -4px",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(texto, { opacity: grande ? 1 : 0, duration: 0.2 });
    };

    palco.addEventListener("pointermove", aoMover);
    palco.addEventListener("pointerover", sobreFoto);
    palco.addEventListener("pointerenter", aoEntrar);
    palco.addEventListener("pointerleave", aoSair);
    return () => {
      palco.removeEventListener("pointermove", aoMover);
      palco.removeEventListener("pointerover", sobreFoto);
      palco.removeEventListener("pointerenter", aoEntrar);
      palco.removeEventListener("pointerleave", aoSair);
    };
  }, []);

  /* A JANELA DE MONTAGEM: só existem as `<img>` da cena anterior, da atual e da
     seguinte. É o que evita decodificar trinta imagens durante a coreografia.

     Havia aqui um escape — `if (semMovimento) return true`, que montava as
     trinta de uma vez para quem pedia menos movimento, porque nesse caso a
     coreografia não montava, a cena ficava parada na 0 para sempre e a parede
     estática do CSS apareceria com molduras vazias. Saiu junto com o resto da
     consulta (ver o topo de `app/globals.css`, 23/08/2026): o motor agora monta
     em todo aparelho, a cena troca, e a janela volta a ser só uma economia. */
  const naJanela = (id: string) => {
    const [entra, sai] = janelaDaFoto[id] ?? [0, 0];
    return cenaAtual >= entra - 1 && cenaAtual <= sai + 1;
  };

  /* `will-change` É OUTRA CONTA, E ELE ESTAVA PAGANDO A CONTA ERRADA.

     Ele recebia `naJanela(id)` — a mesma pergunta que decide se a `<img>`
     existe. São perguntas diferentes: a janela de montagem é generosa de
     propósito (a cena anterior, a atual e a seguinte, para o arquivo já estar
     decodificado quando a foto entrar), e `will-change` promove cada elemento
     que a recebe a uma camada de composição própria na GPU, que fica lá
     ocupando memória de textura até a classe sair.

     Na prática eram vinte e tantas camadas vivas, a maioria de fotos paradas e
     invisíveis nas bordas do palco. O comentário do CSS já dizia o que deveria
     acontecer — "só nas fotos da cena em curso" —, e o código dizia outra
     coisa. Agora a dica vai só para quem de fato MUDA de quadro no trecho, o
     que `emMovimentoNaCena` calcula comparando os quadros (ver `lib/galeria`).

     O TRECHO SEGUINTE ENTRA JUNTO, e essa soma é o que faz a conta funcionar
     agora que existem paradas. Numa parada ninguém se move, então o conjunto é
     vazio — e sem o olhar adiante a promoção só aconteceria no primeiro quadro
     da troca, tarde demais para servir de dica. Com ele, as fotos que vão
     entrar são promovidas DURANTE a parada, que é justamente o momento em que
     a máquina não tem nada para fazer. */
  const emMovimento = (id: string) => {
    return (
      (emMovimentoNaCena[cenaAtual]?.has(id) ?? false) ||
      (emMovimentoNaCena[cenaAtual + 1]?.has(id) ?? false)
    );
  };

  /* AS FOTOS DO PALCO SAEM DAS CENAS, não do acervo (ver `fotosDoPalco` em
     `lib/galeria.ts`). Enquanto o acervo tinha 32 fotos e todas entravam em
     cena, filtrar aqui pelo que não era do Ato III dava no mesmo; com 111 no
     acervo e 36 em cena, daria 75 botões vazios no palco — invisíveis, sem
     imagem, e todos tabuláveis. */
  const porCamada = (camada: FotoGaleria["camada"]) =>
    fotosDoPalco.filter((f) => f.camada === camada);

  return (
    <section id="galeria" ref={secaoRef} className={`${css.galeria} scroll-mt-16 sm:scroll-mt-20`}>
      {/* ═══ ATO I — A ENTRADA ═══ */}
      <div className={css.intro}>
        <div className={css.introTexto}>
          <h2 className={css.abertura}>
            <span className={css.aberturaLinha}>
              <span
                data-abertura-linha
                className={`${css.aberturaInterno} ${css.aberturaUm}`}
              >
                Isso é Radicais Livres.
              </span>
            </span>
            <span className={css.aberturaLinha}>
              <span
                data-abertura-linha
                className={`${css.aberturaInterno} ${css.aberturaDois}`}
              >
                Entre na experiência.
              </span>
            </span>
          </h2>

          <p data-preparacao className={css.preparacao}>
            Algumas coisas não cabem em palavras. Elas acontecem entre uma
            conversa, uma célula, um culto, uma viagem, uma risada.
          </p>

          <div data-dica className={css.dica}>
            Role para entrar
            <span data-dica-traco className={css.dicaTraco} aria-hidden />
          </div>
        </div>

        {/* O pré-mosaico não é desenhado aqui, e não é esquecimento: as cinco
            cartas agrupadas do começo da Cena 1 já são ele. O Ato I mede uma
            tela exata, o palco entra subindo com elas no meio, e o pin engata
            sobre a composição que o usuário acabou de ver. Ver
            `.intro { max-height }` no CSS. */}
      </div>

      {/* ═══ ATO II — O PALCO PINADO ═══ */}
      <div ref={envoltorioRef} className={css.envoltorio}>
        <div ref={palcoRef} className={css.palco}>
          {/* camada 0 — as palavras gigantes, e a única foto que passa atrás
              delas (a de camada `fundo`) */}
          <div
            data-camada="palavras"
            className={`${css.camada} ${css.camadaPalavras}`}
          >
            {/* As palavras gigantes ficam fora da árvore de acessibilidade:
                entre 7% e 18% de opacidade elas são textura, e um leitor de
                tela lendo "comunhão, célula, propósito" solto entre as fotos
                anunciaria uma estrutura que não existe. O que elas dizem já
                está dito pelas legendas, que são texto de verdade.

                Os dois valores de opacidade e o porquê de serem dois estão no
                `useMotorDaGaleria.ts`, junto do bloco que os aplica. */}
            {cenas
              .filter((c) => c.palavra)
              .map((c) => (
                <span
                  key={c.id}
                  data-palavra={c.id}
                  className={css.palavra}
                  aria-hidden
                >
                  {c.palavra}
                </span>
              ))}
            {porCamada("fundo").map((f) => (
              <Foto
                key={f.id}
                foto={f}
                montada={naJanela(f.id)}
                emMovimento={emMovimento(f.id)}
                aoAbrir={ampliada.abrir}
              />
            ))}
          </div>

          {(["longe", "meio", "perto"] as const).map((camada) => (
            <div
              key={camada}
              data-camada={camada}
              className={`${css.camada} ${
                camada === "longe"
                  ? css.camadaLonge
                  : camada === "meio"
                    ? css.camadaMeio
                    : css.camadaPerto
              }`}
            >
              {porCamada(camada).map((f) => (
                <Foto
                  key={f.id}
                  foto={f}
                  montada={naJanela(f.id)}
                  emMovimento={emMovimento(f.id)}
                  aoAbrir={ampliada.abrir}
                />
              ))}
            </div>
          ))}

          {/* camada 4 — as legendas narrativas */}
          <div
            data-camada="legendas"
            className={`${css.camada} ${css.camadaLegendas}`}
          >
            {cenas
              .filter((c) => c.legenda)
              .map((c) => (
                <p
                  key={c.id}
                  data-legenda={c.id}
                  className={`${css.legenda} ${
                    c.id === "respiro" ? css.legendaFinal : ""
                  }`}
                >
                  <Legenda texto={c.legenda!} realce={c.realce} />
                </p>
              ))}
          </div>

          {/* camada 5 — O TRILHO DA ETAPA.

              Não é filtro e não é botão: não há nada para clicar, ele acende
              conforme a narrativa anda. `aria-hidden` porque um leitor de tela
              que anunciasse "01 células, 02 cultos" a cada virada estaria lendo
              a moldura — o que as etapas dizem já está dito pelas legendas, que
              são texto de verdade.

              AS QUATRO SÃO RENDERIZADAS E SÓ UMA APARECE POR VEZ: o CSS as
              empilha no mesmo ponto e o motor cruza a opacidade delas na troca.
              Estarem todas no DOM desde o começo é o que permite o cruzamento
              ser uma animação e não uma remontagem.

              A lista sai de `etapas`, que sai das cenas. Não há aqui nenhum
              nome de capítulo escrito à mão. */}
          <div className={css.etapas} aria-hidden>
            {etapas.map((etapa) => (
              <div key={etapa.id} data-etapa={etapa.id} className={css.etapa}>
                <span className={css.etapaTrilho}>
                  <span data-etapa-preenchida className={css.etapaPreenchida} />
                </span>
                <span className={css.etapaRotulo}>
                  <span className={css.etapaIndice}>{etapa.indice}</span>{" "}
                  {etapa.rotulo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ATO III — A DESACELERAÇÃO ═══ */}
      <div className={css.saida}>
        <div className={css.saidaInterno}>
          <p data-saida className={css.saidaFrase}>
            No fim, não é sobre um lugar.
          </p>

          <p data-saida className={`${css.saidaFrase} ${css.saidaFraseDois}`}>
            É sobre quem a gente
            <span className={css.saidaItalico}>se torna nele.</span>
          </p>

          {fotosDaSaida.map((id, i) => {
            const f = porId.get(id);
            if (!f) return null;
            const lugar = [
              css.saidaFotoA,
              css.saidaFotoB,
              css.saidaFotoC,
              css.saidaFotoD,
            ][i];
            return (
              <figure
                key={id}
                data-saida
                data-saida-opacidade={i % 2 === 0 ? "0.7" : "0.85"}
                className={`${css.saidaFoto} ${lugar}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  srcSet={origensDaFoto(f)}
                  alt={f.alt}
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 30vw, 12vw"
                  style={{ aspectRatio: `${f.w} / ${f.h}` }}
                />
              </figure>
            );
          })}
        </div>
      </div>

      {/* ═══ ATO IV — O MURAL ═══
          As 111 fotos numa parede que rola para o lado. Ver `Mural.tsx`. */}
      <Mural />

      {/* A ASSINATURA VEM DEPOIS DO MURAL, e ela morava no fim do Ato III.
          Assinatura é o que se põe embaixo do que terminou: com a parede de
          111 fotos vindo depois dela, o nome aparecia no meio da seção e o
          visitante lia "acabou" com metade do conteúdo ainda por rolar. */}
      <p data-saida className={css.saidaAssinatura}>
        Radicais Livres
      </p>

      {/* ═══ O CURSOR ═══ */}
      <div ref={cursorRef} className={css.cursor} aria-hidden>
        <span ref={cursorTextoRef} className={css.cursorTexto}>
          Ver
        </span>
      </div>

      {/* ═══ A FOTO AMPLIADA ═══ */}
      <FotoAmpliada ampliada={ampliada} />
    </section>
  );
}
