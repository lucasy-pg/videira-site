import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy, fotoConvite } from "@/lib/radicais";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { FotoAcervo } from "./FotoAcervo";
import s from "./radicais.module.css";

/**
 * SEÇÃO 13 — O CONVITE FINAL.
 *
 * A fotografia ocupa a tela e o texto vive dentro dela. É a única seção da
 * página com texto sobre foto em corpo grande, e por isso a única que precisa
 * de véu medido — ver `.conviteVeu` no módulo, onde está o porquê de serem dois
 * véus e não um.
 *
 * O RETRATO É DE UMA PESSOA SÓ, e não uma foto de turma. A escolha é
 * deliberada: a página inteira falou de uma geração, de uma rede, de um
 * movimento — e o convite final é para UMA pessoa, que está lendo isto sozinha.
 * Uma multidão aqui devolveria a conversa ao coletivo justo no momento em que
 * ela precisa ficar pessoal.
 *
 * ⚠️ NÃO TERMINA COMO FIM DE PÁGINA, e o briefing é explícito sobre isso: "o
 * final deve transmitir movimento e expectativa, e não sensação institucional
 * de fim de página". Por isso não há aqui nenhum dos gestos de fecho que o
 * resto do site usa — sem quina arredondada marcando passagem, sem faixa de
 * resumo, sem lista de links. Há uma frase, um botão e uma assinatura. O
 * rodapé global entra logo abaixo e faz o trabalho de fim de página, que é
 * dele.
 *
 * A ASSINATURA ("Jovens destinados ao Avivamento.") é a frase do movimento, e
 * ela FECHA O CÍRCULO: é a mesma que abre a seção 02, lá no alto, como manchete
 * da apresentação da rede. Aparecer duas vezes numa página é uma decisão, não
 * um descuido — no alto ela é a promessa e aqui é a assinatura de quem a fez.
 *
 * ⚠️ E ELA NÃO É UMA CÁPSULA. Nada de fundo, contorno ou pílula em versalete
 * sobre a foto: o Lucas tira esse tipo de etiqueta sempre que aparece. Aqui ela
 * é texto assinado embaixo de um filete, que é como se assina um cartaz.
 *
 * O CTA VAI PARA A `/contato`, que é o mesmo destino do botão principal da
 * capa. É o único botão da seção — a página inteira construiu um caminho, e
 * oferecer dois destinos no último passo é desfazer o caminho.
 */
export function ConviteFinal() {
  return (
    <section className={s.convite} aria-labelledby="convite-titulo">
      {/* A FOTOGRAFIA É `aria-hidden`? NÃO. Ela é a peça visual mais importante
          desta seção e o `alt` dela está escrito no `lib/radicais.ts`, vindo do
          `lib/galeria.ts` palavra por palavra. Só o VÉU por cima é decorativo,
          e é ele que sai da árvore de acessibilidade. */}
      <FotoAcervo
        foto={fotoConvite}
        grande
        sizes="100vw"
        className={s.conviteFoto}
      />
      <div className={s.conviteVeu} aria-hidden="true" />

      <div className="container mx-auto px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <Reveal>
          <h2 id="convite-titulo" className={`${s.display} ${s.conviteFrase}`}>
            {copy.convite.antes}
            <span className={s.tintaClara}>{copy.convite.tinta}</span>
            {copy.convite.depois}
          </h2>

          <div className="mt-10">
            <MagneticButton>
              <Link
                href="/contato"
                className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-9 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_-18px_rgba(0,0,0,0.7)] active:scale-95"
              >
                {copy.convite.cta}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </MagneticButton>
          </div>

          <p className={s.assinatura}>{copy.convite.assinatura}</p>
        </Reveal>
      </div>
    </section>
  );
}
