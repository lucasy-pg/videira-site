import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy, fotosCelulas } from "@/lib/radicais";
import { Reveal } from "@/components/Reveal";
import { FotoAcervo } from "./FotoAcervo";
import s from "./radicais.module.css";

/**
 * SEÇÃO 06 — VOCÊ NÃO PRECISA CAMINHAR SOZINHO.
 *
 * A seção do PERTENCIMENTO, e é o que ela tem de vender. O detalhe operacional
 * — onde, com quem, em que bairro — é da `/celulas`, que existe inteira para
 * isso; duplicar aqui a lista de células daria duas fontes da mesma informação
 * e uma delas ficaria desatualizada.
 *
 * A INFORMAÇÃO QUE FICA É A CADÊNCIA: as células dos Radicais Livres acontecem
 * aos sábados. Ela aparece com peso de dado (filete, versalete, tinta da marca)
 * logo abaixo da manchete, e não como etiqueta de topo — é o fato principal da
 * seção, não a categoria dela.
 *
 * A DATA NÃO APARECE, e isso é regra do site inteiro (ver `lib/cells.ts` e o
 * `docs/estrutura.md`): "todos os sábados" continua verdade daqui a um ano,
 * "dia 14, às 19h30" não.
 *
 * O CTA VAI PARA A `/celulas`, que é o que o briefing pede. É o único botão da
 * seção — um destino só é um destino; dois viram uma escolha que ninguém pediu
 * para fazer.
 */
export function Celulas() {
  return (
    <section className={`${s.encontro} ${s.encontroClaro}`} aria-labelledby="celulas-titulo">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className={s.encontroGrade}>
          <Reveal variant="left">
            <p className={s.etiqueta}>{copy.celulas.etiqueta}</p>

            <h2 id="celulas-titulo" className={`${s.manchete} mt-6`}>
              {copy.celulas.antes}
              <span className={s.tinta}>{copy.celulas.tinta}</span>
              {copy.celulas.depois}
            </h2>

            <p className={s.cadencia}>{copy.celulas.cadencia}</p>

            <p className={`${s.prosa} mt-7`}>{copy.celulas.texto}</p>

            <Link
              href="/celulas"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-plum-deep px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
            >
              {copy.celulas.cta}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal variant="right" delay={100}>
            {/* A margem de baixo reserva o espaço em que o inset sangra para
                fora da moldura (`bottom: -2rem`). Sem ela, a segunda foto
                encostaria na borda da seção nas telas em que a coluna termina
                perto do fim do respiro. No celular o inset vira uma faixa
                embaixo da foto e a reserva deixa de ser necessária — daí o
                `sm:`. */}
            <div className="relative sm:mb-10 sm:mr-6">
              <figure className={s.encontroMoldura}>
                <FotoAcervo
                  foto={fotosCelulas.principal}
                  sizes="(min-width: 1440px) 720px, (min-width: 1024px) 52vw, 92vw"
                  className={s.encontroFoto}
                />
              </figure>
              <FotoAcervo
                foto={fotosCelulas.inset}
                sizes="(min-width: 1024px) 240px, 92vw"
                className={s.encontroInset}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
