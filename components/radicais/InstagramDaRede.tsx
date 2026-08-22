import { copy } from "@/lib/radicais";
import { INSTAGRAM_RADICAIS } from "@/lib/social";
import { Reveal } from "@/components/Reveal";
import { IconeInstagram } from "./IconeInstagram";
import s from "./radicais.module.css";

/**
 * SEÇÃO 12 — O INSTAGRAM DA REDE.
 *
 * A pausa entre a experiência e o convite final. Ela é curta de propósito:
 * quem chegou aqui acabou de atravessar a galeria inteira, e o que a página
 * precisa fazer neste ponto é respirar antes do último gesto.
 *
 * FICA NO ESCURO DA GALERIA (#17131f) e não no `plum-deep` do site. Os dois são
 * primos e é por isso mesmo que a emenda entre eles apareceria — duas tintas
 * quase iguais lado a lado leem como erro de impressão. A página escureceu no
 * limiar e não clareia mais até o rodapé.
 *
 * ⚠️ SEM FEED DINÂMICO, por decisão do briefing. E vale registrar por quê, para
 * o dia em que alguém propuser: um feed embutido é um `<iframe>` de terceiro
 * que baixa ~300kB de script, quebra quando a conta troca de handle e passa a
 * mostrar caixas vazias quando a API muda de regra — coisas que ninguém vai
 * notar do lado de cá. O @ escrito à mão continua certo em qualquer um desses
 * cenários.
 *
 * ⚠️ O PERFIL É O DA REDE (@rlindaiatuba), NÃO o da igreja
 * (@videiraindaiatuba, o do rodapé). Ver `lib/social.ts`: são contas diferentes
 * e não devem ser unificadas. É esta que aparece duas vezes na página — onde a
 * promessa é feita (o culto, seção 07) e onde ela é cobrada (aqui).
 */
export function InstagramDaRede() {
  return (
    <section
      className="bg-[#17131f] py-24 sm:py-28 lg:py-32"
      aria-labelledby="instagram-titulo"
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`${s.etiqueta} ${s.etiquetaClara}`}>
                {copy.instagram.etiqueta}
              </p>

              <h2
                id="instagram-titulo"
                className={`${s.manchete} ${s.mancheteClara} mt-6`}
              >
                {copy.instagram.antes}
                <span className={s.tintaClara}>{copy.instagram.tinta}</span>
                {copy.instagram.depois}
              </h2>

              {/* O @ EM CORPO DE MANCHETE, e não dentro do botão: ele é a
                  informação da seção. Quem não vai clicar agora precisa
                  conseguir LER o nome do perfil e procurar depois — num
                  aplicativo, no celular de outra pessoa, dias depois. Escondido
                  dentro do botão, o @ só existe para quem clica. */}
              <p
                className={`${s.display} mt-7 text-[clamp(1.75rem,4vw,3rem)] leading-none text-white`}
              >
                {INSTAGRAM_RADICAIS.arroba}
              </p>
            </div>

            <a
              href={INSTAGRAM_RADICAIS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center justify-center gap-2.5 self-start rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95 lg:self-auto"
            >
              <IconeInstagram />
              {copy.instagram.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
