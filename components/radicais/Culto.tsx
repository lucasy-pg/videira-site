import { copy, fotosCulto } from "@/lib/radicais";
import { INSTAGRAM_RADICAIS } from "@/lib/social";
import { Reveal } from "@/components/Reveal";
import { FotoAcervo } from "./FotoAcervo";
import { IconeInstagram } from "./IconeInstagram";
import s from "./radicais.module.css";

/**
 * SEÇÃO 07 — O CULTO DE JOVENS.
 *
 * A ÚNICA SEÇÃO ESCURA ANTES DA GALERIA, e a inversão é a informação. A célula
 * acontece na sala de uma casa, de tarde, com lanche; o culto acontece no
 * prédio da igreja, com luz de palco. As fotos que existem de cada um já são
 * assim — as do culto são todas de luz quente recortando gente no escuro —, e
 * sobre osso elas ficam cinzentas. O fundo `plum-deep` só termina de dizer o
 * que a fotografia já diz.
 *
 * É TAMBÉM O PRIMEIRO AVISO DE QUE A PÁGINA VAI ESCURECER. Entre esta seção e o
 * escuro definitivo há a liderança, que volta ao claro de propósito (gente,
 * rosto, respiro); depois disso a luz não volta mais. O ritmo é claro-escuro-
 * claro-escuro, e o último escuro é a galeria.
 *
 * A DATA DO CULTO NÃO ESTÁ NO SITE, e o aviso no pé é o que faz disso uma
 * informação em vez de uma lacuna: a rede não tem dia fixo, a data sai no
 * Instagram mês a mês, e é para lá que a pessoa tem que ir. Se um dia o culto
 * ganhar dia fixo, este bloco é o primeiro a mudar.
 *
 * ⚠️ O INSTAGRAM DAQUI É O DA REDE (@rlindaiatuba), NÃO o da igreja
 * (@videiraindaiatuba, o do rodapé). Ver `lib/social.ts`: são perfis diferentes
 * e não devem ser unificados — é pelo da rede que sai a data do culto.
 */
export function Culto() {
  return (
    <section className={`${s.encontro} ${s.encontroEscuro}`} aria-labelledby="culto-titulo">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className={`${s.encontroGrade} ${s.encontroInvertido}`}>
          <Reveal variant="right">
            <p className={`${s.etiqueta} ${s.etiquetaClara}`}>
              {copy.culto.etiqueta}
            </p>

            <h2
              id="culto-titulo"
              className={`${s.manchete} ${s.mancheteClara} mt-6`}
            >
              {/* AS DUAS LINHAS SÃO QUEBRA DELIBERADA, não resultado de
                  largura: é o par que o briefing pede, e o ponto final no meio
                  da frase é o que faz a segunda linha cair como um segundo
                  golpe em vez de continuar a primeira. */}
              <span className="block">{copy.culto.linha1}</span>
              <span className="block">
                {copy.culto.antes2}
                <span className={s.tintaClara}>{copy.culto.tinta2}</span>
                {copy.culto.depois2}
              </span>
            </h2>

            <p className={`${s.cadencia} ${s.cadenciaClara}`}>
              {copy.culto.cadencia}
            </p>

            <p className={`${s.prosa} ${s.prosaClara} mt-7`}>
              {copy.culto.texto}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={INSTAGRAM_RADICAIS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
              >
                <IconeInstagram />
                {INSTAGRAM_RADICAIS.arroba}
              </a>
              <p className="max-w-xs text-sm leading-relaxed text-white/50">
                {copy.culto.aviso}
              </p>
            </div>
          </Reveal>

          <Reveal variant="left" delay={100}>
            {/* UMA FOTO SÓ desde 14/09/2026: o retrato `assistindo-ao-culto`,
                que sangrava pela quina de baixo à esquerda, saiu a pedido do
                Lucas. A seção não tem mais inset — por isso não há reserva de
                margem embaixo nem recorte deslocado no celular. */}
            <div className="sm:ml-8">
              <figure className={s.encontroMoldura}>
                <FotoAcervo
                  foto={fotosCulto.larga}
                  grande
                  sizes="(min-width: 1440px) 720px, (min-width: 1024px) 52vw, 92vw"
                  className={s.encontroFoto}
                />
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
