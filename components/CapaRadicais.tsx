import { ArrowRight, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { MagneticButton } from "@/components/MagneticButton";
import s from "./capa-radicais.module.css";

/**
 * A CAPA DO /radicais-livres — a janela que se abre sozinha.
 *
 * A página não abre com a colagem tomando a tela. Abre com uma moldura pequena
 * e arredondada no meio do escuro, o nome da rede transbordando por cima dela.
 * A moldura cede SOZINHA, assim que a página entra, até sangrar nas quatro
 * bordas — e o resto do hero chega em escada atrás dela, em ~2,5s no total.
 *
 * A ABERTURA NÃO DEPENDE MAIS DA ROLAGEM. Ela já foi amarrada a uma
 * `view-timeline` com a seção pinada por 120svh; hoje são `@keyframes` comuns
 * com `animation-delay`, e a seção voltou a ter 100svh. O histórico da troca,
 * com as percentagens antigas convertidas em atrasos, está no
 * `capa-radicais.module.css`.
 *
 * TODA A COREOGRAFIA ESTÁ NESSE MESMO ARQUIVO — inclusive o porquê do recorte
 * em vez de `scale`, o porquê de a colagem não crescer e o porquê de o estado
 * final ser o padrão em vez do estado inicial. Aqui fica só a marcação.
 *
 * NÃO HÁ UMA LINHA DE JAVASCRIPT NA ABERTURA, e continua não havendo depois da
 * troca. Os únicos componentes de cliente daqui são o `ImageWithFallback` (que
 * existe pelo `onError`) e o `MagneticButton`, e os dois já eram da versão
 * anterior.
 *
 * ⚠️ O QUE ESTA CAPA HERDOU E NÃO PODE PERDER, para quem for mexer:
 *
 *   · A COLAGEM CONTINUA VAGUEANDO. `.capa-vagueia` (globals.css) não foi
 *     tocada: a geometria dela nasce de `--caixa: 100svh`, e o bloco que a
 *     contém aqui continua tendo exatamente 100svh. Trocar a altura desse
 *     bloco desregula o passeio inteiro — não é uma classe de enfeite.
 *
 *   · OS VÉUS SÃO CONTRASTE MEDIDO, não escurecimento a gosto. O de cima
 *     existe para a nav flutuante: sem ele, o texto branco do header encontra
 *     4,4:1 no pior quadro do ciclo da colagem, abaixo do mínimo de 4,5 da
 *     WCAG; com ele, 9,8:1. O comentário original com a medição está no
 *     histórico do `page.tsx`.
 *
 *   · O VÉU CHAPADO SUBIU DE 30% PARA 45%, e a razão é o texto ter ido para o
 *     centro. Encostado embaixo, ele era protegido pelo gradiente inferior;
 *     no meio da tela, o que passa atrás dele é o miolo da colagem, que é a
 *     parte mais clara e mais agitada dela.
 */
export function CapaRadicais() {
  return (
    <section className={s.expansor}>
      <div className={s.grude}>
        {/* A camada recortada: colagem e véus. O texto fica de fora, e é por
            isso que o nome da rede transborda a moldura fechada em vez de ser
            cortado por ela. */}
        <div className={s.moldura}>
          <ImageWithFallback
            src="/radicais/mosaico.avif"
            alt="Colagem de centenas de fotos dos Radicais Livres encostadas umas nas outras, sem espaço entre elas: turmas inteiras posando juntas, rodas de amigos abraçados, células reunidas em casas e o grupo todo no palco, com camisetas da rede e um jovem recém-batizado com os dizeres 'eu nasci de novo'"
            fetchPriority="high"
            decoding="async"
            className="capa-vagueia"
          />

          {/* O piso de contraste, e ele nasceu com o movimento da colagem: o
              que passa por trás do texto muda o tempo todo — ora um recorte
              escuro, ora uma parede branca estourada — e sem um mínimo chapado
              a legibilidade oscilava junto. */}
          <div className="absolute inset-0 bg-plum-deep/35" />
          {/* O VÉU ELÍPTICO É O QUE SALVOU A COLAGEM. Com o texto no centro da
              tela, o escurecimento tem de ser mais forte justamente no miolo —
              que é a parte mais clara e mais agitada da arte. Feito com um véu
              chapado mais pesado, a capa inteira apagava: medido, o texto
              ficava legível e a colagem virava uma mancha ameixa uniforme, sem
              nenhum dos rostos que ela existe para mostrar.

              Aqui o peso vai só onde o texto está e some antes das bordas: o
              miolo escurece o bastante para o parágrafo passar dos 4,5:1 da
              WCAG e as quatro quinas continuam com a colagem em cor cheia. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_50%,rgba(24,9,41,0.74)_0%,rgba(24,9,41,0.45)_55%,transparent_80%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/78 via-transparent to-plum-deep/45" />
          {/* O véu da nav — curto de propósito (`h-40`): cobre os 4–5rem do
              header e some antes de virar tarja sobre a arte. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-plum-deep/70 to-transparent" />

          {/* AS CORTINAS — a abertura inteira mora aqui.
              Quatro retângulos opacos que deslizam para fora da tela e quatro
              quadradinhos que arredondam as quinas do vão enquanto ele cresce.
              Por que a abertura é FEITA ASSIM, e não com o `clip-path` que
              estava aqui antes, está no cabeçalho do
              `capa-radicais.module.css` — em uma frase: `clip-path` anima na
              main thread, e a main thread desta rota está ocupada hidratando a
              galeria justamente durante a revelação.

              `aria-hidden` porque são tinta: quem não vê a tela não perde nada
              se elas não existirem, e anunciá-las seria ler mobília. */}
          <div className={s.cortinas} aria-hidden="true">
            <div className={`${s.cortina} ${s.cortinaTopo}`} />
            <div className={`${s.cortina} ${s.cortinaBase}`} />
            <div className={`${s.cortina} ${s.cortinaEsq}`} />
            <div className={`${s.cortina} ${s.cortinaDir}`} />
            <div className={`${s.quina} ${s.quinaNO}`} />
            <div className={`${s.quina} ${s.quinaNE}`} />
            <div className={`${s.quina} ${s.quinaSO}`} />
            <div className={`${s.quina} ${s.quinaSE}`} />
          </div>
        </div>

        <div className={s.palcoTexto}>
          <p className={s.etiqueta}>Jovens e adolescentes</p>

          <h1 className={`font-display ${s.nome}`}>
            Radicais
            <span className={s.nomeVirado}>Livres</span>
          </h1>

          {/* A DEFINIÇÃO DO PRÓPRIO MOVIMENTO, e é o que a página abaixo
              destrincha — "contramão do mundo" volta como manchete inteira na
              seção 04. A frase que estava aqui antes desta dizia "vivendo a fé
              sem medo e sem religião": bonito e vazio.

              ⚠️ ELA ENCOLHEU NO REDESENHO DE 21/08/2026. Eram duas frases; é
              uma. A primeira ("A rede de jovens da Igreja Videira em
              Indaiatuba") dizia o que a etiqueta logo acima e o título da aba
              já dizem, e o briefing pede aqui "uma frase de apoio curta" —
              curta sendo o ponto. O que a capa precisa entregar é a promessa,
              não a ficha técnica. */}
          <p className={s.descricao}>
            Uma geração que decidiu andar na contramão do mundo.
          </p>

          {/* ⚠️ NENHUM DOS DOIS LEVA À /contato, E ISSO É A DECISÃO DESTE
              BLOCO. O botão daqui já foi "Quero participar" apontando para lá,
              e o pedido do Lucas em 22/08/2026 foi direto ao ponto: "não faz
              sentido mandar para o contato logo de primeira".

              Ele está certo sobre a narrativa da página. A /contato é onde
              alguém fala com a igreja — é o passo em que a pessoa se
              identifica, e pedir isso na primeira dobra é cobrar compromisso de
              quem ainda não sabe do que se trata. A página inteira foi
              construída para levar até lá: o convite final (seção 13) é que
              aponta para a /contato, depois de nove seções explicando quem são
              os Radicais. Aqui, o pedido certo é menor.

              OS DOIS DESTINOS SÃO OS DOIS JEITOS DE COMEÇAR, e nenhum deles
              pede nada em troca — nem sequer uma troca de página. Os dois são
              ÂNCORAS INTERNAS, e é isso que faz a capa parar de ser uma
              bifurcação e virar um convite a descer:

                · QUEM SOMOS leva à seção 02, logo abaixo. O rótulo do botão é
                  a etiqueta da seção de destino, palavra por palavra — quem
                  clica sabe onde chegou porque a primeira coisa que lê ali é o
                  que estava escrito no botão.
                · VER A GALERIA é a saída para quem quer VER antes de ler. Numa
                  página com mais de cem fotografias essa é uma vontade
                  legítima; o botão existia na capa anterior, saiu no redesenho
                  e voltou a pedido.

              ⚠️ A /celulas ESTEVE AQUI E SAIU, em 22/08/2026, pelo mesmo
              raciocínio que tirou a /contato: mandar alguém para outra página
              antes de a capa ter dito o que é isto é interromper a narrativa no
              primeiro parágrafo. As células continuam a um clique — na seção
              06, que existe para vendê-las, e no Header, que está na tela o
              tempo todo.

              A HIERARQUIA CONTINUA SENDO UMA SÓ: um sólido e um de contorno.
              Dois botões do mesmo peso não são dois caminhos, são nenhum — e
              foi por isso que os TRÊS da versão antiga viraram dois, e não
              três de novo.

              OS DOIS SÃO `<a>` CRUS E NÃO `<Link>`: o Link do Next existe para
              trocar de rota, e para um pulo dentro da mesma página ele só
              acrescentaria trabalho de roteador. Os dois destinos têm
              `scroll-mt` e o `html` da casa tem `scroll-behavior: smooth`,
              então o pulo é suave sem uma linha de script.

              ⚠️ MEXEU NA CONTAGEM DE BOTÕES, MEXEU NO `--assenta`. No celular
              eles empilham, então cada botão a mais ou a menos desloca o centro
              da coluna — a conta está no `capa-radicais.module.css`. */}
          <div className={s.botoes}>
            <MagneticButton>
              <a
                href="#quem-somos"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95 sm:w-auto"
              >
                Quem somos
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </MagneticButton>
            <a
              href="#galeria"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95 sm:w-auto"
            >
              Ver a galeria
            </a>
          </div>
        </div>

        {/* A seta acende por último, depois de os botões assentarem, e fica:
            ela não faz mais parte da abertura (que se explica sozinha) — diz
            que a página continua embaixo. `aria-hidden` porque ela não é
            informação para quem não vê: quem navega por teclado ou leitor de
            tela alcança os links pela ordem do documento, que não depende da
            rolagem. */}
        <div className={s.seta} aria-hidden="true">
          <ChevronDown size={26} className="animate-seta-flutua" />
        </div>
      </div>
    </section>
  );
}
