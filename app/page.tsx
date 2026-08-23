import Link from "next/link";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { MolduraFoto } from "@/components/MolduraFoto";
import { YOUTUBE_IGREJA } from "@/lib/social";
import type { Manchete } from "@/lib/home";
import {
  CELULAS,
  CULTOS,
  FECHO,
  HERO,
  MINISTERIOS,
  QUEM_SOMOS,
  TRILHO,
  VISAO,
  YOUTUBE,
} from "@/lib/home";

/**
 * A palavra-chave em roxo dentro de uma manchete.
 *
 * Vai DENTRO do `<h1>`/`<h2>`, não no lugar dele: assim cada título mantém as
 * próprias classes de escala e quebra, e o único trabalho daqui é pintar o
 * trecho. Para o leitor de tela nada muda — um `<span>` colorido no meio de um
 * cabeçalho não parte o nome acessível dele.
 *
 * `escuro` troca o `grape` (6.9:1 sobre bone) pelo `grape-light` (9.6:1 sobre
 * plum-deep). Cada um só passa em contraste na sua metade do par: inverter os
 * dois publica uma palavra-chave ilegível.
 *
 * ⚠️ É A TERCEIRA CÓPIA DESTE COMPONENTE no site (as outras estão no /sobre e
 * no /trilho-do-vencedor) e a repetição é consciente: a do Trilho aceita um
 * SEGUNDO trecho pintado e escolhe entre quatro tintas de curso, e unificar as
 * três significaria uma API com quatro parâmetros opcionais para pintar um
 * `<span>`. Se um dia uma quarta página precisar de uma, aí sim vale extrair —
 * e o que se extrai é esta versão, que é a simples.
 */
function Chave({ t, escuro = false }: { t: Manchete; escuro?: boolean }) {
  return (
    <>
      {t.antes}
      <span className={escuro ? "text-grape-light" : "text-grape"}>
        {t.forte}
      </span>
      {t.depois}
    </>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * O SISTEMA DESTA PÁGINA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * A Home é a porta de entrada do site, e o briefing dela cabe numa frase:
 * "menos elementos, mais intenção". Ela não explica a Videira — apresenta o
 * necessário de cada assunto e oferece um caminho para aprofundar. Toda seção
 * termina num CTA que sai desta página.
 *
 * A NARRATIVA, que precisa ser legível só rolando, sem ler:
 *
 *   1 a igreja viva, agora        → vídeo de culto em tela cheia
 *   2 quem nós somos              → editorial em duas áreas, muito respiro
 *   3 venha num domingo           → fotografia de culto + os horários grandes
 *   4 e no meio da semana         → composição invertida, célula numa casa
 *   5 e na idade que você tem     → o par de cards, Kids e Livres
 *   6 há um caminho a percorrer   → faixa roxa, a arte oficial do Trilho
 *   7 é esta a visão              → pausa tipográfica, a frase do encargo
 *   8 continue conosco na semana  → duas colunas limpas, quadro de vídeo
 *   9 agora entra você            → a comunidade inteira, foto sangrando
 *
 * As quatro do meio (3 a 6) são as portas, e a ordem delas é uma escada de
 * compromisso: assistir a um culto, entrar numa casa, achar o seu grupo,
 * começar a ser formado. Trocar duas de lugar é trocar o que a página pede
 * primeiro.
 *
 * RITMO DE SUPERFÍCIE. escura → bone → sand → bone → sand → ROXA → sand →
 * bone → fotografia escura. O roxo em bloco aparece UMA VEZ (o Trilho), que é
 * o que o briefing pede ao dizer "evitar aplicar roxo em todas as seções" — no
 * resto da página ele só existe como palavra-chave das manchetes e como
 * eyebrow. (Os dois cards dos ministérios são escuros, mas são FOTOGRAFIA sob
 * véu, não faixa de cor: é a mesma tinta que o fecho da página usa.)
 *
 * AS TRÊS COSTURAS. Onde a superfície muda de família (escuro→claro,
 * roxo→claro, claro→fotografia), a seção de baixo SOBE por cima da de cima com
 * margem negativa e canto arredondado, em vez de encostar numa linha reta. São
 * exatamente três, e é de propósito que não sejam mais: repetido em toda
 * emenda o gesto vira tique, e entre duas faixas claras não há o que suavizar.
 *
 * ONDE O ROXO ENTRA, e a regra é de contagem: UM TRECHO POR MANCHETE, mais o
 * eyebrow. Quem pinta é a `<Chave>` logo acima, e o corte de cada frase mora
 * no `lib/home.ts`, onde `antes + forte + depois` remontam a frase exata do
 * briefing. Nenhuma manchete leva dois destaques.
 *
 * TIPOGRAFIA. Nada nesta página escolhe fonte: manchete e corpo saem dos
 * tokens `--font-display` e `--font-body` do `globals.css`, que hoje valem
 * Manrope nos dois. A página já rodou em Newsreader (serifa) e depois em
 * Poppins, por uma classe `manchetes-poppins` que ficava neste <div> raiz — a
 * classe saiu em 22/08/2026, quando a Manrope passou a ser a família única do
 * site e a exceção deixou de ter o que excetuar.
 *
 * O QUE SEPARA MANCHETE DE CORPO AQUI É ESCALA, NÃO PESO: toda manchete é 500
 * (`font-medium`), da capa ao card, e o texto corrido é 400. Chegaram a ser 700
 * na capa e 600 nos títulos de seção; o Lucas olhou e pediu mais leve
 * (22/08/2026). O 600 sobrou para navegação, botões e rótulos em caixa alta.
 *
 * ⚠️ E CONTINUA SENDO UMA PÁGINA SEM ITÁLICO. A Manrope é uma família só
 * romana; todo `<em>` que aparecer aqui cai no oblíquo sintético do navegador.
 * Nenhuma frase desta página tem um — e a versão original da Home era
 * construída em cima de itálico (o gesto da Newsreader, que era a fonte de
 * manchete dela). Quem for reintroduzir um itálico aqui está reabrindo essa
 * decisão, não ajustando um detalhe.
 *
 * E POR ISSO AS MANCHETES NÃO USAM `clamp(...vw...)`. O `container` do
 * Tailwind não cresce liso: ele TRAVA numa largura fixa e só pula no
 * breakpoint seguinte. Uma fonte em `vw` continua crescendo dentro desse
 * degrau, e às 1279px ela fica ~25% maior do que às 1024 com exatamente a
 * mesma largura de coluna para caber — era aí que a manchete estourava na
 * tela de notebook. Os tamanhos daqui pulam nos MESMOS breakpoints do
 * container. É a mesma escada do /sobre, e mexer num tamanho é mexer numa
 * quebra. A troca para a Manrope não mexeu em nenhum: ela é MAIS ESTREITA que
 * a Poppins no mesmo corpo, então toda manchete ganhou folga em vez de perder,
 * e o `text-wrap: balance` do `.font-display` reparte as linhas sozinho.
 *
 * FOTOGRAFIA. Nove imagens, todas reais e da própria Videira, todas pela
 * `<MolduraFoto>` — ou seja, todas por `next/image`, que gera as larguras
 * responsivas a partir de um arquivo só. A Home ANTES era o oposto disso:
 * `<img>` cruas, sem `srcset`, e duas fotos de banco carregadas ao vivo do
 * Unsplash (o card do Radicais Kids e uma de culto). As duas dependências
 * morreram aqui. Ver `docs/imagens.md`.
 *
 * MOVIMENTO. Só `<Reveal>` (fade e deslocamento curto na entrada), o hover dos
 * CTAs e a seta que flutua no fim da capa. Nada de GSAP, nada de parallax,
 * nada preso à rolagem: o briefing pede que nenhuma animação chame mais
 * atenção que o conteúdo. Todas tocam em todo aparelho — o site deixou de
 * consultar "reduzir movimento" do sistema (ver o topo do globals.css).
 */
export default function Home() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ 01 · HERO ══════════════════════════════════════════════════════
          A FILMAGEM OCUPA A TELA INTEIRA, sem moldura e sem margem — a versão
          anterior punha o vídeo dentro de um retângulo arredondado com bone em
          volta, e o briefing novo pede o contrário: o vídeo é a primeira tela.
          Por isso a "/" entrou em `OVERLAY_ROUTES` (lib/overlay-routes.ts): é
          essa lista que solta o `pt-16` que o <main> reserva para o header e
          que manda a barra ficar transparente com texto branco enquanto está
          no topo. Sem ela, uma faixa bone de 4rem apareceria acima da
          filmagem.

          `100svh` E NÃO `100vh`: no Safari do iPhone o `vh` conta a barra do
          navegador que se esconde ao rolar, então uma capa em `100vh` nasce
          mais alta que a tela e empurra o texto para fora. O `svh` mede a
          viewport com as barras VISÍVEIS, que é o estado em que a página é
          vista ao abrir.

          É `min-h` e não `h` para o caso do celular deitado: em 390×844 o
          título, o parágrafo e o botão cabem com folga, mas numa janela de
          360px de altura eles empurram a seção em vez de serem cortados. */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-plum-deep">
        {/* Culto real da Videira, mudo e em loop. O poster (~75KB) pinta a
            primeira tela na hora; o vídeo entra por cima quando carrega — sem
            ele a capa abre preta no 4G. `aria-hidden` porque é ambiência: o
            que a seção diz está no texto por cima. */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO.video.src}
          poster={HERO.video.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />

        {/* DOIS VÉUS, e o mínimo necessário para a leitura — o briefing pede
            para não esconder a filmagem. O vertical garante o contraste do
            texto, que vive no terço de baixo; o horizontal escurece só o canto
            esquerdo, onde o texto começa, e some antes da metade da tela, de
            modo que o lado direito continua sendo vídeo limpo. No `lg` os dois
            afrouxam: a tela fica bem mais larga que alta e o mesmo bloco de
            texto passa a ocupar uma fração bem menor dela — o véu que o
            celular precisa, ali, escureceria filmagem à toa. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/55 to-plum-deep/25 lg:via-plum-deep/40 lg:to-plum-deep/15"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-plum-deep/70 via-plum-deep/20 to-transparent lg:from-plum-deep/75 lg:via-plum-deep/10"
        />

        {/* O texto encostado no canto inferior esquerdo, e não centralizado —
            é pedido do briefing, e é o que deixa a maior parte do quadro para
            a filmagem. O `pb` grande reserva a faixa onde a seção seguinte
            sobe por cima (ver a costura logo abaixo) mais o indicador de
            rolagem, para que nem um nem outro encoste no botão. */}
        <div className="container relative mx-auto px-5 pb-28 pt-32 sm:px-8 sm:pb-32 lg:px-12 lg:pb-36">
          <Reveal variant="blur" delay={200}>
            <h1 className="font-display max-w-[15ch] text-[2.75rem] font-medium leading-[0.98] text-white sm:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.5rem]">
              <Chave t={HERO.titulo} escuro />
            </h1>
          </Reveal>

          <Reveal delay={480}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              {HERO.texto}
            </p>
          </Reveal>

          <Reveal delay={700}>
            <MagneticButton className="mt-9">
              <Link
                href={HERO.acao.href}
                className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] active:scale-95"
              >
                {HERO.acao.rotulo}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </MagneticButton>
          </Reveal>
        </div>

        {/* O INDICADOR DE CONTINUIDADE, no canto oposto ao texto. Fica à
            direita justamente porque o texto está à esquerda: no centro ele
            cairia sobre o botão no celular, e embaixo do botão viraria um
            segundo CTA. `animate-seta-flutua` (globals.css) é a mesma seta que
            a /sobre usa.

            É SÓ A SETA, sem rótulo. Chegou a ter um "Role" em caixa alta por
            cima dela e saiu: uma seta que flutua para baixo na beira da
            primeira tela já é a convenção inteira, e a palavra só acrescentava
            uma segunda voz no canto onde a composição pedia silêncio. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-24 right-5 text-white/70 sm:right-8 sm:bottom-28 lg:right-12 lg:bottom-32"
        >
          <ChevronDown size={18} className="animate-seta-flutua" />
        </div>
      </section>

      {/* ═══ 02 · QUEM SOMOS ════════════════════════════════════════════════
          A PRIMEIRA COSTURA. A seção sobe por cima do pé do vídeo com margem
          negativa e canto arredondado, em vez de a filmagem terminar numa
          linha reta contra o bone. `relative` é o que faz o bone pintar por
          cima do vídeo: sem posicionamento, a margem negativa aproxima os dois
          e o vídeo (que está numa seção com `isolate`) continua por cima.

          A COMPOSIÇÃO É EM DUAS ÁREAS, não em duas colunas iguais: à esquerda
          o identificador, a manchete e a fotografia; à direita só o texto e o
          caminho. O vazio que sobra embaixo do texto, na coluna da direita, é o
          respiro que o briefing pede — é ele que faz a manchete parecer grande
          sem precisar de corpo maior.

          A FOTOGRAFIA OCUPA QUASE A COLUNA INTEIRA. Ela já foi pequena (60% da
          coluna, teto de 17rem) e sumia: nesta seção ela é a única imagem, e
          numa página em que todas as outras sangram ou preenchem meia tela, um
          selo de 270px lia como miniatura esquecida, não como escolha. */}
      <section className="relative -mt-10 rounded-t-[2rem] bg-bone pt-24 pb-24 sm:pt-28 sm:pb-28 lg:-mt-14 lg:rounded-t-[3rem] lg:pt-32 lg:pb-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <div>
              <Reveal>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                  {QUEM_SOMOS.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={90}>
                <h2 className="font-display mt-5 max-w-[14ch] text-[2rem] font-medium leading-[1.05] text-foreground sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem]">
                  <Chave t={QUEM_SOMOS.titulo} />
                </h2>
              </Reveal>

              {/* O CORTE COME AS PERNAS, e é ele que decide a proporção do
                  quadro — não o contrário.

                  O arquivo é 1122×1402 (quase 4:5) e mostra os dois
                  voluntários de corpo inteiro, do céu ao pé. Num quadro 4:5 o
                  `object-cover` não tinha o que cortar: entrava a fotografia
                  inteira, e metade dela era calçada, calça e sapato — a foto
                  ficava sobre pernas e não sobre os dois rostos e as duas
                  placas, que são o assunto.

                  `aspect-[9/8]` com o recorte preso no TOPO (`50% 0%`) mostra
                  os 71% de cima do arquivo, o que corta exatamente abaixo da
                  borda de baixo das placas. A conta que amarra os dois números:
                  o `cover` escala pela largura (o quadro é mais largo que o
                  arquivo em proporção), então a fração visível é
                  1 / (9/8 × 1402/1122) = 0,71 — mexer na proporção do quadro é
                  mexer em ONDE a foto é cortada, e uma proporção mais larga
                  começa a comer as placas por baixo. */}
              <Reveal variant="scale" delay={220}>
                <MolduraFoto
                  foto={QUEM_SOMOS.foto}
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  posicao="50% 0%"
                  className="mt-12 aspect-[9/8] w-[92%] max-w-[32rem] rounded-[1.25rem] lg:mt-16 lg:rounded-[1.75rem]"
                />
              </Reveal>
            </div>

            {/* `lg:pt-14` desce o parágrafo um degrau, para que a coluna da
                direita comece na altura da MANCHETE e não na do eyebrow — sem
                ele o texto nasce colado no topo da grade, ao lado de uma tarja
                em caixa alta de 11px, e a seção lê como um formulário com
                rótulo. É um degrau só, e não um desalinho grande: as duas
                colunas continuam sendo o mesmo bloco. */}
            <Reveal variant="right" delay={140} className="lg:pt-14">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                {QUEM_SOMOS.texto}
              </p>
              <Link
                href={QUEM_SOMOS.acao.href}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-plum-deep transition-colors duration-300 hover:text-grape"
              >
                {QUEM_SOMOS.acao.rotulo}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 03 · CULTOS ════════════════════════════════════════════════════
          O texto à esquerda, a fotografia à direita, e OS HORÁRIOS numa laje
          que atravessa a quina de baixo da foto. É essa laje que responde às
          duas linhas do briefing ao mesmo tempo: "parcialmente sobreposta à
          fotografia" e "evitar colocar tudo dentro de um card convencional" —
          só os horários estão nela, o resto da seção mora direto na areia.

          E é por isso que os horários são a maior tipografia da seção depois da
          manchete: eles são o que a pessoa que não conhece a igreja veio
          buscar, e o briefing pede que tenham presença de desenho, não de
          tabela.

          A LAJE SÓ FLUTUA A PARTIR DE `lg`. Abaixo disso ela desce para o
          fluxo, embaixo da foto: em 900px de largura um bloco legível já toma
          metade do quadro, e não há quina que ele não cubra. O `-left-10` cai
          dentro do vão de 4rem da grade, então ele nunca encosta na coluna de
          texto. */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal variant="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                {CULTOS.eyebrow}
              </span>
              <h2 className="font-display mt-5 max-w-[15ch] text-[2rem] font-medium leading-[1.05] text-foreground sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem]">
                <Chave t={CULTOS.titulo} />
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
                {CULTOS.texto}
              </p>
              <MagneticButton className="mt-9">
                <Link
                  href={CULTOS.acao.href}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-plum-deep px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
                >
                  {CULTOS.acao.rotulo}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
            </Reveal>

            <Reveal variant="right" delay={140}>
              <figure className="relative">
                {/* Retrato (4:5) e não paisagem: o arquivo é 1800×1202 e a
                    congregação ocupa a largura inteira, então cortar nas
                    laterais aproxima os rostos em vez de mostrar parede. O
                    ponto em `18%` puxa o recorte para a esquerda da foto, o
                    que joga fora justamente o terço direito — onde estão o
                    caixote de flores e a coluna de som. */}
                <MolduraFoto
                  foto={CULTOS.foto}
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  posicao="18% center"
                  className="aspect-[4/5] w-full rounded-[1.5rem] sm:aspect-[3/2] lg:aspect-[4/5] lg:rounded-[2rem]"
                />

                {/* `sm:max-w-[20rem]` só existe para a faixa entre `sm` e
                    `lg`, onde a laje está no fluxo mas a coluna já é larga:
                    sem teto ela vira uma barra de 900px com duas linhas de
                    horário perdidas na ponta esquerda. */}
                <div className="mt-6 sm:max-w-[20rem] lg:absolute lg:-left-10 lg:bottom-10 lg:mt-0 lg:w-[17rem] lg:max-w-none">
                  <div className="rounded-[1.25rem] bg-bone p-7 lg:rounded-[1.5rem] lg:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {CULTOS.horarios.dia}
                    </p>
                    <div className="mt-4 space-y-1">
                      {CULTOS.horarios.faixas.map((faixa) => (
                        <p
                          key={faixa}
                          className="font-display text-[1.75rem] font-medium leading-tight text-foreground lg:text-[2rem]"
                        >
                          {faixa}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 04 · CÉLULAS ═══════════════════════════════════════════════════
          A LÓGICA DA SEÇÃO ANTERIOR, INVERTIDA — é o que o briefing pede para
          criar ritmo: lá o texto à esquerda e a foto à direita, aqui o
          contrário. Trocam também a superfície (bone depois da areia) e a
          proporção do quadro (4:3 depois de 4:5), senão a inversão sozinha lê
          como a mesma seção espelhada.

          SÃO DUAS FOTOGRAFIAS e nenhum card: a célula inteira numa sala de
          casa e, pendurado na quina, um abraço. É a diferença entre dizer
          "comunhão, cuidado e crescimento" com três cards de benefício — que o
          briefing manda evitar — e mostrar as duas coisas que a frase quer
          dizer. O anel na cor da faixa (`ring-bone`) é o que separa uma foto da
          outra; sem ele as bordas se dissolvem. */}
      <section className="bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal variant="left" className="lg:order-1">
              {/* A COLAGEM NÃO USA `absolute`, e é decisão herdada da /sobre.
                  A `<MolduraFoto>` já desenha a própria `<div>` com
                  `relative`, e `relative` e `absolute` disputam a MESMA
                  propriedade — quem vence é a ordem das regras no CSS gerado,
                  não a ordem das classes escritas aqui. Quem posicionasse
                  teria de ser um embrulho, e aí o encaixe passaria a depender
                  de percentuais amarrados na mão.

                  Aqui o abraço está NO FLUXO e sobe por cima da quina da foto
                  grande com margem negativa. Margem em % resolve contra a
                  LARGURA do bloco (não a altura), então o encaixe é o mesmo em
                  qualquer viewport.

                  O ABRAÇO É CORTADO UM TRIZ ABAIXO DO CENTRO (`50% 52%`) e isso resolve
                  duas coisas de uma vez: o arquivo traz a marca d'água da
                  igreja no alto do quadro, que um recorte quadrado centrado
                  mostraria pela metade, e as duas cabeças estão no terço
                  superior — num corte mais baixo sobrava roupa escura e o
                  quadradinho lia como uma mancha preta. */}
              <figure>
                <MolduraFoto
                  foto={CELULAS.foto}
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className="aspect-[4/3] w-full rounded-[1.5rem] lg:rounded-[2rem]"
                />
                <div className="-mt-[13%] flex justify-end pr-6 lg:pr-10">
                  <MolduraFoto
                    foto={CELULAS.fotoAbraco}
                    sizes="(min-width: 1024px) 16vw, 32vw"
                    posicao="50% 52%"
                    className="aspect-square w-[32%] max-w-[12rem] rounded-[1.25rem] ring-[8px] ring-bone lg:rounded-[1.5rem]"
                  />
                </div>
              </figure>
            </Reveal>

            <Reveal variant="right" delay={140} className="lg:order-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                {CELULAS.eyebrow}
              </span>
              <h2 className="font-display mt-5 max-w-[15ch] text-[2rem] font-medium leading-[1.05] text-foreground sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem]">
                <Chave t={CELULAS.titulo} />
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
                {CELULAS.texto}
              </p>
              <Link
                href={CELULAS.acao.href}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-plum-deep transition-colors duration-300 hover:text-grape"
              >
                {CELULAS.acao.rotulo}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 05 · PARA CADA GERAÇÃO ═════════════════════════════════════════
          A ÚNICA SEÇÃO DA PÁGINA EM CARDS, e é o formato certo justamente aqui:
          são dois ministérios irmãos, do mesmo peso, e um par de cards é a
          forma que diz "escolha entre dois" sem precisar escrever isso. Nas
          outras seções o card seria o atalho preguiçoso que o briefing manda
          evitar; nesta ele É a composição, e por isso ela não repete a forma de
          nenhuma vizinha.

          SÃO DOIS E SÓ DOIS. Um terceiro card (famílias, música, o que for)
          transformaria a seção num menu de ministérios, que é outra página —
          e no `md` a grade de dois vira duas colunas iguais e limpa; três
          viram três colunas magras ou uma órfã embaixo.

          NÃO HÁ TARJA DE IDADE sobre as fotos. A versão anterior tinha
          ("0 — 14 ANOS", "12 — 29 ANOS") e ela saiu por decisão da casa; o
          porquê está em `MINISTERIOS.cards`, no `lib/home.ts`.

          O TEXTO DE ABERTURA FICA NUM BLOCO SÓ, à esquerda, e não em duas
          áreas como na seção "Quem somos": lá a divisão em duas colunas era a
          composição inteira, aqui quem faz o trabalho embaixo é o par de
          cards, e um cabeçalho partido em dois roubaria dele. */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
              {MINISTERIOS.eyebrow}
            </span>
            {/* `20ch` e não os `14–16ch` das outras manchetes: "intensamente"
                tem doze caracteres e, numa medida curta, virava uma linha
                inteira sozinha — a manchete quebrava em quatro linhas, uma
                delas só com a palavra roxa, e o destaque passava a ler como
                erro de composição. Em 20ch ela fecha em duas. */}
            <h2 className="font-display mt-5 max-w-[20ch] text-[2rem] font-medium leading-[1.05] text-foreground sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem]">
              <Chave t={MINISTERIOS.titulo} />
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-muted-foreground">
              {MINISTERIOS.texto}
            </p>
          </Reveal>

          {/* `gap-5` e não `gap-12`: os dois cards são um par, e um vão largo
              entre eles os separaria em duas ilhas. É o mesmo vão que a página
              usa entre a fotografia e a laje dos horários. */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
            {MINISTERIOS.cards.map((card, i) => (
              <Reveal
                key={card.nome}
                variant={i === 0 ? "left" : "right"}
                delay={i * 120}
              >
                {/* ⚠️ A ALTURA MÍNIMA MORA AQUI, NO CARTÃO, e não no bloco de
                    texto lá embaixo. Numa primeira versão ela estava no texto,
                    e o efeito era o oposto do pretendido: o `justify-end`
                    encostava no pé do cartão um bloco que tinha 34rem de
                    altura própria, então o texto começava no TOPO desse bloco
                    — ou seja, no meio do cartão — com um vão morto embaixo e
                    justamente fora da parte forte do véu.

                    No cartão, o `min-h` dá o vão que a fotografia precisa para
                    respirar; o texto volta a ter a altura do próprio conteúdo
                    e o `justify-end` faz o que promete. O `h-full` iguala os
                    dois cartões, que têm parágrafos de alturas diferentes. */}
                <Link
                  href={card.acao.href}
                  className="group relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-plum-deep sm:min-h-[28rem] lg:min-h-[32rem] lg:rounded-[2rem]"
                >
                  {/* O `absolute` mora no embrulho e não na moldura — a
                      moldura já nasce `relative` e as duas classes disputam a
                      mesma propriedade (ver a colagem das células, acima).

                      A FOTO É O FUNDO e o texto é irmão dela, não filho: é
                      isso que faz o card crescer com o texto (os dois cartões
                      têm parágrafos de alturas diferentes e `h-full` os iguala)
                      em vez de ter altura ditada pela proporção da imagem. O
                      `aspect` do vão vive no `min-h` abaixo. */}
                  <div className="absolute inset-0">
                    <MolduraFoto
                      foto={card.foto}
                      tom="escuro"
                      sizes="(min-width: 768px) 46vw, 92vw"
                      className="h-full w-full transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* O VÉU É FORTE EMBAIXO E QUASE NADA EM CIMA, e as posições
                      dos stops (`via-42%`) importam tanto quanto as opacidades:
                      o texto vive nos 40% de baixo, e as duas fotografias têm
                      fundo claro exatamente ali — cadeiras brancas numa, piso
                      branco na outra. Concentrando o escurecimento nessa faixa,
                      a metade de cima de cada fotografia continua sendo
                      fotografia. Aliviar o `from` é apagar o parágrafo. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/60 via-42% to-plum-deep/8"
                  />

                  <div className="relative p-8 lg:p-10">
                    <h3 className="font-display text-[1.75rem] font-medium leading-tight text-white lg:text-[2.1rem]">
                      {card.nome}
                    </h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-white/75">
                      {card.texto}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-grape-light">
                      {card.acao.rotulo}
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 06 · TRILHO DO VENCEDOR ════════════════════════════════════════
          A ÚNICA FAIXA ROXA DA PÁGINA, e é ela o "momento de maior presença da
          identidade" que o ritmo do briefing pede. Vem depois de duas seções
          claras seguidas de propósito: o contraste é o assunto aqui.

          A ARTE OFICIAL faz o trabalho do "destaque visual" — as três palavras
          estão no letreiro dela, e por isso não são compostas de novo em
          tipografia ao lado. O porquê, com todas as letras, está no comentário
          de `TRILHO.arte` em `lib/home.ts`.

          O canto arredondado em cima é a segunda costura: aqui é o roxo que
          sobe por cima do bone, e não o contrário, porque a faixa escura é o
          elemento que chega. */}
      <section className="relative -mt-6 rounded-t-[2rem] bg-plum-deep py-24 sm:py-28 lg:-mt-8 lg:rounded-t-[3rem] lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <Reveal variant="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape-light">
                {TRILHO.eyebrow}
              </span>
              <h2 className="font-display mt-5 max-w-[14ch] text-[2rem] font-medium leading-[1.05] text-white sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem]">
                <Chave t={TRILHO.titulo} escuro />
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-white/70">
                {TRILHO.texto}
              </p>
              <MagneticButton className="mt-9">
                <Link
                  href={TRILHO.acao.href}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] active:scale-95"
                >
                  {TRILHO.acao.rotulo}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
            </Reveal>

            <Reveal variant="scale" delay={160}>
              {/* A arte é quase quadrada (1222×1154) e entra inteira, sem
                  corte: é peça gráfica com letreiro, e `object-cover` num
                  quadro de outra proporção comeria as palavras. */}
              <MolduraFoto
                foto={TRILHO.arte}
                tom="escuro"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[1222/1154] w-full rounded-[1.5rem] lg:rounded-[2rem]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 07 · NOSSA VISÃO ═══════════════════════════════════════════════
          A PAUSA. Depois da faixa roxa, uma seção que é quase só tipografia e
          ar — não há CTA, não há fotografia e não há nada para clicar, porque
          o trabalho dela é dar um respiro antes das duas últimas.

          A FRASE DO ENCARGO É A MANCHETE, e é o conteúdo inteiro da seção.
          Aqui estavam "Ganhar. Consolidar. Treinar. Enviar." numa escada de
          quatro degraus — uma composição de que eu gostava e que caiu por um
          motivo que não é de desenho: aquele quarteto é vocabulário do modelo
          G12, que a Videira não segue, e apresentá-lo como a visão da casa era
          publicar como dela uma visão de outra igreja. A visão da Videira é o
          encargo, e é ele que está aqui agora (`lib/home.ts`, que importa a
          frase do `lib/sobre.ts` para não haver duas cópias dela no site).

          É A MESMA COMPOSIÇÃO DO /sobre, e isso é decisão do Lucas: frase
          centralizada, entre aspas penduradas nas quinas opostas, na largura
          inteira do container. Aqui ela já foi ALINHADA À ESQUERDA e sem
          aspas, com o argumento de que "a Home DIZ o encargo e o /sobre o
          CITA" — na tela a diferença não lia como intenção, lia como duas
          versões da mesma frase com dois tratamentos, e a alinhada à esquerda
          parecia um parágrafo grande e não a pausa que a seção é. As duas
          páginas agora mostram a MESMA citação; quem vem da Home reconhece.

          ⚠️ POR ISSO ESTA SEÇÃO E A 04 DO /sobre ANDAM JUNTAS. São duas
          cópias do mesmo desenho em dois arquivos (o texto, esse sim, é um
          só: `ENCARGO`, em `lib/sobre.ts`, importado pelos dois). Mexeu na
          composição aqui, mexa lá — e se um dia uma TERCEIRA página quiser a
          citação, aí ela vira componente em vez de uma terceira cópia. É a
          mesma regra do `Chave` no topo deste arquivo.

          O QUE NÃO VEIO IGUAL É A ENTRELINHA. O /sobre fixa `leading-[64px]`
          em todos os tamanhos, o que no celular abre 64px de entrelinha para
          uma fonte de 22px. Aqui é `leading-[1.55]`: dá os mesmos ~64px no
          `xl`, onde a composição foi desenhada, e acompanha o corpo para
          baixo em vez de esparramar a frase no telefone.

          O DESTAQUE CONTINUA SENDO UM SÓ (o miolo, roxo e itálico de uma vez)
          e "CRISTO" continua subindo por CSS e não no texto — as duas
          decisões são da frase, não da página, e estão explicadas no
          `ENCARGO` em `lib/sobre.ts`. Este é o terceiro lugar da Home em que
          o roxo entra em texto.

          ⚠️ `text-pretty`, NÃO o `text-balance` do resto da página: numa frase
          longa o `balance` encolhe todas as linhas até a mais curta caber e
          devolve o bloco para o meio da medida, desfazendo a largura que a
          seção existe para ter. */}
      <section className="relative -mt-6 rounded-t-[2rem] bg-sand py-24 sm:py-28 lg:-mt-8 lg:rounded-t-[3rem] lg:py-36">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="block text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
              {VISAO.eyebrow}
            </span>
          </Reveal>

          <Reveal variant="blur" delay={120}>
            {/* ⚠️ O `px` deste bloco e o `py` do <h2> são a FOLGA DAS ASPAS,
                não respiro solto: sem eles a primeira e a última linha
                encostam nos dois glifos das quinas na tela estreita.

                As aspas são DESENHO — ficam fora do texto, em `grape-light`,
                e vão com `aria-hidden` para o leitor de tela ouvir a frase
                limpa em vez de dois caracteres soltos no meio dela. */}
            <div className="relative mt-10 px-8 sm:mt-12 sm:px-14 lg:mt-14 lg:px-16">
              <span
                aria-hidden
                className="font-display absolute left-0 top-0 select-none text-[clamp(3rem,5vw,4.5rem)] leading-none text-grape-light"
              >
                {"“"}
              </span>

              <h2 className="font-display text-pretty py-8 text-center text-[1.4rem] font-medium leading-[1.55] text-foreground sm:py-10 sm:text-[1.9rem] lg:text-[2.3rem] xl:text-[2.6rem]">
                {VISAO.encargo.map((pedaco, i) =>
                  pedaco.forte ? (
                    /* `not-italic` obrigatório: o `<em>` fica pela semântica,
                       mas a Manrope é uma família só romana e a inclinação
                       viria do navegador, não da fonte. O destaque é a cor. */
                    <em key={i} className="not-italic text-grape">
                      {pedaco.texto}
                    </em>
                  ) : (
                    <span
                      key={i}
                      className={pedaco.caixaAlta ? "uppercase" : undefined}
                    >
                      {pedaco.texto}
                    </span>
                  )
                )}
              </h2>

              <span
                aria-hidden
                className="font-display absolute bottom-0 right-0 select-none text-[clamp(3rem,5vw,4.5rem)] leading-none text-grape-light"
              >
                {"”"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 08 · NOS ACOMPANHE ═════════════════════════════════════════════
          A seção mais simples da página, e de propósito: sem feed, sem
          carrossel e sem embed. O quadro à direita é uma fotografia com um
          tratamento discreto que remete a vídeo — um véu leve e o glifo de
          play —, não uma imitação da interface do YouTube.

          O QUADRO INTEIRO É O LINK, e o botão à esquerda também — dois
          caminhos para o mesmo canal, o que normalmente eu evitaria. Vale aqui
          porque uma foto com botão de play que não responde ao clique é uma
          promessa quebrada.

          O QUADRO SAI DA ORDEM DE TABULAÇÃO (`tabIndex={-1}`) para que a
          duplicata não custe uma parada a quem navega por teclado: o botão ao
          lado, esse sim tabulável, leva ao mesmo lugar e diz para onde vai.
          Não leva `aria-hidden` junto porque o `alt` da fotografia é conteúdo
          — esconder o elemento apagaria a descrição da imagem, e um link com
          nome acessível na ordem de leitura não atrapalha ninguém. */}
      <section className="bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="left">
              <h2 className="font-display max-w-[12ch] text-[2rem] font-medium leading-[1.05] text-foreground sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem]">
                <Chave t={YOUTUBE.titulo} />
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
                {YOUTUBE.texto}
              </p>
              <MagneticButton className="mt-9">
                <a
                  href={YOUTUBE_IGREJA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-plum-deep px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
                >
                  <Play size={15} className="fill-current" />
                  {YOUTUBE.acao}
                </a>
              </MagneticButton>
            </Reveal>

            <Reveal variant="right" delay={140}>
              <a
                href={YOUTUBE_IGREJA.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="group relative block overflow-hidden rounded-[1.5rem] bg-plum-deep lg:rounded-[2rem]"
              >
                <MolduraFoto
                  foto={YOUTUBE.foto}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="aspect-[16/10] w-full transition-transform duration-700 motion-safe:group-hover:scale-[1.03] sm:aspect-video"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-plum-deep/55 via-transparent to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone/90 text-plum-deep backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 lg:h-20 lg:w-20"
                >
                  {/* `translate-x-[2px]` acerta o centro ÓPTICO do triângulo:
                      centrado pela caixa, um play parece deslocado para a
                      esquerda dentro de um círculo. */}
                  <Play
                    size={24}
                    className="translate-x-[2px] fill-current lg:size-7"
                  />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 09 · CTA FINAL ═════════════════════════════════════════════════
          A página termina como começou: gente ocupando a tela inteira, com o
          texto encostado no canto inferior esquerdo. A rima com a capa é o
          fecho — o briefing pede que a Home não acabe em informação
          institucional, e o rodapé escuro logo abaixo continua a fotografia
          sem emenda de cor.

          A terceira e última costura está aqui, e é a mais necessária das três:
          sem ela uma fotografia de borda a borda encostaria numa linha reta no
          bone da seção do YouTube.

          `min-h` em `svh` pelo mesmo motivo da capa.

          ⚠️ A ALTURA AQUI É ENQUADRAMENTO, NÃO ESPAÇO. A fotografia é 1.94:1 e
          a comunidade ocupa uma FAIXA no meio dela, com copa de árvore em cima
          e grama embaixo. Numa seção de proporção parecida com a do arquivo, o
          `object-cover` não tem o que cortar: a foto entra quase inteira e as
          pessoas viram uma tira fina no meio de um paredão de árvore. Foi o que
          aconteceu na primeira versão, com `85svh`.

          Em `100svh` a seção fica MAIS ALTA que o arquivo, o corte passa a ser
          horizontal e a mesma foto entra 21% maior — as pessoas crescem, a
          árvore some pelas laterais. Encurtar esta seção não a torna mais
          discreta; torna a comunidade menor, que é o oposto do que ela existe
          para fazer.

          E OS VÉUS SÃO MAIS LEVES QUE OS DA CAPA, ao contrário do que a rima
          entre as duas sugeriria. Lá embaixo do texto há filmagem escura de
          culto; aqui há gente de camiseta clara em plena luz do dia, e os
          mesmos stops da capa (que começavam OPACOS nos 15% de baixo)
          apagavam justamente a fileira de rostos. O texto continua legível
          porque o roxo do lado esquerdo dá conta dele sozinho. */}
      <section className="relative isolate -mt-6 flex min-h-[75svh] flex-col justify-end overflow-hidden rounded-t-[2rem] bg-plum-deep lg:-mt-8 lg:min-h-[100svh] lg:rounded-t-[3rem]">
        {/* O `absolute` mora no embrulho e não na moldura — a moldura já nasce
            `relative`, e as duas classes disputam a mesma propriedade (ver o
            comentário da colagem das células, acima).

            O ponto do recorte desce um pouco (`58%`) para o caso do celular,
            onde a seção é MUITO mais alta que larga e o corte vira quase todo
            horizontal: ali o que decide o enquadramento é a coluna do meio da
            foto, e um ponto centrado deixaria mais céu do que gente. No
            desktop ele quase não tem efeito, porque sobra pouca altura para
            cortar. */}
        <div className="absolute inset-0">
          <MolduraFoto
            foto={FECHO.foto}
            tom="escuro"
            sizes="100vw"
            posicao="50% 58%"
            className="h-full w-full"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/45 to-plum-deep/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-plum-deep/80 via-plum-deep/25 to-transparent lg:via-plum-deep/15"
        />

        <div className="container relative mx-auto px-5 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
          <Reveal variant="blur">
            <h2 className="font-display max-w-[14ch] text-[2.25rem] font-medium leading-[1.02] text-white sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.9rem]">
              <Chave t={FECHO.titulo} escuro />
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-lg leading-relaxed text-white/75">
              {FECHO.texto}
            </p>
          </Reveal>

          <Reveal delay={240}>
            {/* Dois caminhos, e o segundo NÃO é um botão cheio: dois botões
                sólidos lado a lado disputam o clique e nenhum dos dois lê como
                o principal. O contorno diz "também dá para ir por aqui". */}
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <MagneticButton>
                <Link
                  href={FECHO.acoes[0].href}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] active:scale-95"
                >
                  {FECHO.acoes[0].rotulo}
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <Link
                href={FECHO.acoes[1].href}
                /* `self-start` no celular: empilhados, os dois botões são
                   itens de um flex em coluna e o segundo esticaria de borda a
                   borda enquanto o primeiro (embrulhado no `MagneticButton`,
                   que é `inline-block`) fica do tamanho do texto. Duas pílulas
                   de larguras diferentes uma sobre a outra parecem defeito. */
                className="group inline-flex items-center justify-center gap-2.5 self-start rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 active:scale-95 sm:self-auto"
              >
                {FECHO.acoes[1].rotulo}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}


