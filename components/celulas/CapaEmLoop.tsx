"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Foto } from "@/lib/foto";

/**
 * A FAIXA DA CAPA, TROCANDO DE CÉLULA SOZINHA.
 *
 * Era uma fotografia só. O argumento da página é "existem vinte e quatro
 * dessas, uma perto de você", e uma foto só mostrava UMA casa — a faixa agora
 * mostra várias sem que o visitante precise clicar em nada.
 *
 * O RITMO É "ANDA, PARA, ANDA", não uma esteira contínua. Esteira de fotos
 * (marquee) nunca deixa nenhuma imagem parada tempo suficiente para ser vista:
 * o olho segue o movimento e não lê nenhum rosto. Aqui cada foto fica
 * PARADA por `ESPERA` e a passagem leva `DESLIZE` — a foto é o assunto e o
 * movimento é só a emenda entre duas.
 *
 * ⚠️ NÃO TEM SETA, PONTO NEM BOTÃO. Não é esquecimento: uma capa que se
 * anuncia como carrossel convida a pessoa a operar a capa, e o que a página
 * quer que ela opere é o botão "Encontrar uma célula" logo abaixo. Quem quiser
 * ver todas as células tem o mosaico da seção 07, que é uma parede parada.
 *
 * ═══ COMO O LOOP FECHA SEM VOLTAR CORRENDO ═══
 *
 * A pista tem uma foto A MAIS: uma CÓPIA da primeira, no fim. Ao chegar nela,
 * a tela mostra a foto 1 — e nesse instante o componente desliga a transição e
 * salta para a foto 1 de verdade, no começo da pista. O salto é entre dois
 * quadros idênticos, então não se vê. Sem esse truque, fechar o ciclo seria um
 * `translateX` de volta ao zero: as quatro fotos desfilando de trás para a
 * frente em meio segundo, que é o defeito clássico de carrossel caseiro.
 *
 * ⚠️ O `requestAnimationFrame` DUPLO na volta não é superstição. Reativar a
 * transição no mesmo quadro em que a posição volta a zero faz o browser
 * ANIMAR a volta — que é exatamente o que o salto existe para evitar. O
 * primeiro quadro pinta a posição nova sem transição; o segundo devolve a
 * transição.
 */

/* Em milissegundos. `ESPERA` é a foto parada, `DESLIZE` é a passagem.
   A soma é o tempo de cada foto no ar, e é ela que o `setInterval` usa.
   Quatro segundos parada é o piso para uma foto de turma: é uma cena com
   quinze rostos, e abaixo disso ninguém termina de olhar. */
const ESPERA = 4000;
const DESLIZE = 900;

export function CapaEmLoop({
  fotos,
  className = "",
}: {
  /** A primeira é a que abre a página — e é o provável LCP da rota. */
  fotos: (Foto & { recorte?: string })[];
  className?: string;
}) {
  const [indice, setIndice] = useState(0);
  const [desliza, setDesliza] = useState(true);
  const [parado, setParado] = useState(false);
  const quadro = useRef<number | null>(null);

  const total = fotos.length;
  /* A cópia da primeira, no fim da pista. Ver o cabeçalho. */
  const pista = [...fotos, fotos[0]];

  /* Quem move. Não roda quando `parado` — e `parado` cobre dois casos: o
     ponteiro em cima da faixa (a pessoa está olhando aquela foto) e o
     `prefers-reduced-motion`, que congela a capa na primeira imagem. */
  useEffect(() => {
    if (parado || total < 2) return;
    const t = window.setInterval(
      () => setIndice((v) => v + 1),
      ESPERA + DESLIZE,
    );
    return () => window.clearInterval(t);
  }, [parado, total]);

  /* O salto invisível, quando a pista chega na cópia. */
  useEffect(() => {
    if (indice !== total) return;
    const t = window.setTimeout(() => {
      setDesliza(false);
      setIndice(0);
    }, DESLIZE);
    return () => window.clearTimeout(t);
  }, [indice, total]);

  /* E a transição de volta, dois quadros depois. */
  useEffect(() => {
    if (desliza) return;
    quadro.current = requestAnimationFrame(() => {
      quadro.current = requestAnimationFrame(() => setDesliza(true));
    });
    return () => {
      if (quadro.current !== null) cancelAnimationFrame(quadro.current);
    };
  }, [desliza]);

  /* QUEM PEDIU MENOS MOVIMENTO NÃO RECEBE MOVIMENTO NENHUM — a capa fica na
     primeira foto, parada. É a mesma promessa que a seta de rolagem e os
     `<Reveal>` desta página já cumprem pelo CSS; aqui ela tem que ser em JS
     porque o que se desliga é um temporizador, não uma animação.

     O `addEventListener` no lugar de uma leitura única: quem muda a
     preferência no sistema com a página aberta é atendido na hora. */
  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplica = () => setParado(consulta.matches);
    aplica();
    consulta.addEventListener("change", aplica);
    return () => consulta.removeEventListener("change", aplica);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      /* `aria-roledescription` avisa o leitor de tela que isto é um
         carrossel; o `aria-live="off"` impede que ele anuncie cada troca de
         foto, que seria uma interrupção a cada cinco segundos para dizer
         algo que já está no `alt` da imagem. */
      role="group"
      aria-roledescription="carrossel"
      aria-label="Fotografias de células da Videira"
      aria-live="off"
      /* Parar com o ponteiro em cima é o que dá controle a quem quer olhar
         uma foto específica sem precisar de botão. `onFocus`/`onBlur` fazem o
         mesmo para o teclado — o botão da capa fica logo abaixo, e a faixa
         parava de se mexer no meio da leitura sem isto. */
      onPointerEnter={() => setParado(true)}
      onPointerLeave={() => setParado(false)}
      onFocusCapture={() => setParado(true)}
      onBlurCapture={() => setParado(false)}
    >
      {/* A PISTA. Ela mede o mesmo que a faixa (`w-full`) e cada foto também
          (`w-full shrink-0`), então as fotos transbordam da pista e a faixa
          recorta — é isso que faz `translateX(-100%)` andar EXATAMENTE uma
          foto, em qualquer largura de tela, sem medir nada em JS. */}
      <div
        className={`flex h-full w-full ${
          desliza
            ? "transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            : ""
        }`}
        style={{ transform: `translateX(-${indice * 100}%)` }}
      >
        {pista.map((foto, i) => {
          const copia = i === total;
          return (
            <div
              key={`${foto.src}-${i}`}
              className="relative h-full w-full shrink-0"
              /* A cópia é a mesma foto de novo: para o leitor de tela ela não
                 existe, senão a lista de fotos termina repetindo a primeira. */
              aria-hidden={copia || undefined}
            >
              <Image
                src={foto.src!}
                alt={copia ? "" : foto.alt}
                fill
                sizes="100vw"
                className={`object-cover ${foto.recorte ?? "object-center"}`}
                /* ⚠️ TODAS EAGER, e é uma conta feita. Preguiçosas elas nunca
                   chegariam a tempo: o `loading="lazy"` do next/image observa
                   a interseção com a JANELA, e uma foto que está fora da faixa
                   pela LATERAL não intersecta — o download só começaria quando
                   ela já estivesse entrando na tela, e a passagem mostraria um
                   retângulo vazio. Só a primeira vai em prioridade alta (é o
                   LCP da rota); as outras entram em `low` e chegam na esteira,
                   depois do que importa. */
                loading="eager"
                fetchPriority={i === 0 ? "high" : "low"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
