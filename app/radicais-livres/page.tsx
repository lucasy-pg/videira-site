import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CapaRadicais } from "@/components/CapaRadicais";
import { QuemSomos } from "@/components/quem-somos/QuemSomos";
import { Galeria } from "@/components/galeria/Galeria";
import { GLIFOS, INSTAGRAM_RADICAIS } from "@/lib/social";

/**
 * A FONTE QUE SÓ ESTA ROTA CARREGA.
 *
 * Declarada AQUI e não no `app/layout.tsx`, e a diferença é real: o `next/font`
 * amarra o arquivo à rota em que é importado, então quem abre a Home ou
 * qualquer outra rota não baixa nem um byte dela. No layout, o site inteiro
 * pagaria por uma tipografia que existe numa seção de uma página.
 *
 * INSTRUMENT SERIF É A VOZ DO "QUEM SOMOS", e ela NÃO substitui a Newsreader —
 * convive com ela. A Newsreader continua sendo a serifa da casa em todas as
 * manchetes do site, inclusive na capa desta página, logo acima. A Instrument
 * Serif entra só na seção 2, e entra porque a seção pede uma coisa que a
 * Newsreader não faz: ela é uma serifa de TEXTO com eixo óptico, desenhada para
 * afinar e apertar conforme cresce — exatamente o oposto do que um corpo de
 * 280px precisa. A Instrument Serif é display de nascença: hastes finíssimas,
 * contraste alto, e um itálico que se inclina de verdade em vez de se limitar a
 * pender. A palavra LIVRES depende inteira desse itálico.
 *
 * É A MESMA FAMÍLIA DA INSTRUMENT SANS que o site já usa no corpo do texto —
 * são companheiras de projeto, do mesmo estúdio. Não é coincidência aproveitada
 * depois do fato: é o que garante que a seção nova não leia como um enxerto de
 * outro site.
 *
 * PESO 400 É O ÚNICO QUE EXISTE, e a fonte não tem eixo variável nenhum. Isso é
 * bom aqui: dois arquivos pequenos (romano e itálico), os dois usados, nenhum
 * byte de eixo que ninguém percorre.
 *
 * `display: "swap"` com o `adjustFontFallback` padrão do next/font: a fonte é
 * precarregada nesta rota e o substituto do sistema já vem com as métricas
 * ajustadas, então a troca não empurra o layout — que é o que realmente
 * importaria num RADICAL de 280px.
 *
 * `variable` sem `className`: quem escolhe a fonte é o `.serifa` do
 * `quem-somos.module.css`, não o elemento raiz da página. A variável entra na
 * <div> raiz, lá embaixo, e a seção a consulta por `var()`.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Radicais Livres — Igreja Videira Indaiatuba",
  description:
    "A rede de jovens e adolescentes da Igreja Videira. Quem somos, as células de sábado, o Culto de Jovens e como participar em Indaiatuba.",
};

/**
 * A rede de jovens, na sequência que a liderança pediu: banner, quem somos,
 * nossos encontros, liderança, galeria, faça parte.
 *
 * O QUE ESTA VERSÃO DEIXOU PARA TRÁS, para quem for procurar no histórico: a
 * página tinha um FAQ de seis perguntas ("tenho 12 anos, vou ser o mais novo?"),
 * uma seção sobre a Conferência de setembro no Serra Dourada e uma seção
 * própria sobre a origem do movimento. As três saíram por decisão de escopo —
 * a origem sobreviveu condensada dentro do Quem Somos. Se o FAQ voltar um dia,
 * ele estava em `<details>` nativo e vale reabrir o commit em vez de reescrever.
 *
 * As fontes do conteúdo doutrinário são da própria rede — o blog e a carta do
 * pr. Naor Pedroza, fundador do movimento —, nunca do site antigo da Videira
 * Indaiatuba, que é justamente o que este projeto está substituindo.
 *
 * Faixa etária: 12 a 29 anos. Não são "15 a 30", que é o que o rascunho
 * original dizia e estava errado.
 *
 * Componente de servidor inteiro, e a galeria não roda uma linha de script: a
 * repartição das colunas da parede é calculada aqui, na renderização, e o
 * acender das fotos é linha do tempo de rolagem em CSS. Numa página que vai
 * passar de quarenta imagens, foi a decisão de peso — ver a seção 5.
 */

/** O Instagram da REDE (`lib/social.ts`), que NÃO é o da igreja
    (@videiraindaiatuba, o do rodapé). É por ele que sai a data do Culto de
    Jovens, e por isso ele aparece duas vezes na página: onde a promessa é
    feita (Nossos Encontros) e onde ela é cobrada (Faça Parte). */
const INSTAGRAM = INSTAGRAM_RADICAIS;

/* O `lucide-react` não serve ícone de marca — ele TIROU os logos de terceiros,
   e `import { Instagram } from "lucide-react"` hoje quebra o build. O desenho
   vem de `lib/social.ts`, o mesmo que o rodapé usa.

   `aria-hidden` porque o texto ao lado do ícone já diz o que ele é; anunciar
   "imagem: instagram" antes de "@rlindaiatuba" é ler a mesma coisa duas
   vezes. */
function IconeInstagram({ className = "h-[17px] w-[17px]" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={GLIFOS.instagram} />
    </svg>
  );
}

/* AS TRÊS LISTAS QUE MORAVAM AQUI — `leque`, `nome` e `identidade` — MUDARAM
   PARA `lib/quem-somos.ts`, junto com o resto do acervo e da copy da seção 2.
   Foi a primeira parcela da dívida registrada no `docs/estrutura.md` (seção 7):
   "enquanto texto e marcação estiverem trançados, revisar copy exige mexer em
   componente React". A seção 2 inteira agora vive em `components/quem-somos/`.

   As outras listas desta página (`encontros`, `liderancaRede`, `lideranca`)
   continuam aqui de propósito: elas servem seções que este redesenho não
   tocou, e movê-las junto misturaria duas mudanças num commit só. */

/**
 * Os dois encontros da rede, na ordem em que alguém os conhece: primeiro a
 * célula, que é semanal e perto de casa; depois o culto, que é mensal e reúne
 * todo mundo.
 *
 * A CADÊNCIA APARECE, A DATA NÃO — e isso não é descuido. O site inteiro segue
 * a regra de não publicar informação que apodrece (ver `lib/cells.ts` e
 * `docs/estrutura.md`): "todos os sábados" e "uma vez por mês" continuam
 * verdade daqui a um ano, "dia 14, às 19h30" não. É também por isso que o
 * Culto de Jovens manda a pessoa para o Instagram: lá a data é atualizada por
 * quem realmente publica.
 *
 * AS DUAS CAPAS FORAM ESCOLHIDAS PELA REDE em 17/08/2026, e chegaram com os
 * nomes `radical celula` e `radical culto`. Antes daqui, a célula era
 * `oracao-a-dois` (dois rapazes orando) e o culto era `culto-lotado`. A
 * primeira mostrava um GESTO, não um grupo, ao lado de um texto que fala em
 * "grupos pequenos" e "amizades verdadeiras": quem lia via duas pessoas.
 *
 * ⚠️ OS APELIDOS NÃO SÃO OS NOMES ENTREGUES, e procurar por "celula" ou
 * "culto" em `public/radicais/` não acha nenhuma das duas:
 *
 *   radical celula  ->  turma-luz-roxa.jpg          (entrou no acervo agora)
 *   radical culto   ->  cartazes-nova-criatura.jpg  (já estava lá)
 *
 * A do culto não virou arquivo novo porque é BIT A BIT a mesma fotografia que
 * a galeria já servia — conferido por comparação de pixels, diferença média de
 * 1,2 em 255, que é só a recompressão do JPEG. Gravá-la de novo sob outro nome
 * faria a página baixar a mesma imagem duas vezes e daria a ela duas descrições
 * diferentes. Pela mesma razão o `alt` dela é o do `lib/galeria.ts`, palavra
 * por palavra. A tabela `NOMES` do `material/_acervo/colagem-radicais/preparar-galeria.py`
 * registra a decisão e é por onde se refaz o arquivo.
 *
 * ⚠️ A REGRA QUE VALE AQUI: nada nesta seção pode repetir a seção VIZINHA
 * (`lib/quem-somos.ts`, logo acima). Conferido — nenhuma das duas está na
 * colagem de abertura nem no palco de RADICAL LIVRES. Repetir a GALERIA, ao
 * contrário, é permitido e até preferido (mesmo arquivo, um download só): é o
 * que a colagem do Quem Somos já faz com `mesa-de-restaurante`.
 *
 * O QUADRO LÁ EMBAIXO É 4:3. `turma-luz-roxa` é 1120×840 — a proporção exata,
 * corte zero. `cartazes-nova-criatura` é 3:2 e perde ~11% de cada lado: o
 * cartaz "convocado para a eternidade", na quina de baixo à esquerda, passa
 * raspando. Trocar por um arquivo mais largo exige conferir esse canto.
 */
const encontros = [
  {
    rotulo: "Todos os sábados",
    titulo: "As células de jovens",
    texto:
      "Grupos pequenos que se reúnem aos sábados nas casas por toda a cidade. Um ambiente seguro de comunhão, louvor, Palavra, oração e lanche. É onde você é conhecido pelo nome, constrói amizades verdadeiras e vive a fé de forma prática no dia a dia.",
    foto: "/radicais/turma-luz-roxa.jpg",
    alt: "Cerca de quinze jovens posando juntos no salão da igreja, uma fileira agachada na frente da outra, com a parede ao fundo lavada por uma luz roxa",
    href: "/celulas",
    cta: "Ver as células",
  },
  {
    rotulo: "Uma vez por mês",
    titulo: "O Culto de Jovens",
    texto:
      "O momento em que a rede inteira se reúne no prédio da igreja para celebrar, louvar e ouvir a Palavra juntos. Um ambiente de muita energia, ideal para você trazer amigos e experimentar o mover de Deus em comunidade.",
    foto: "/radicais/cartazes-nova-criatura.jpg",
    alt: "Grupo grande de jovens posando com cartazes escritos à mão, um deles dizendo “nova criatura”",
  },
];

/**
 * O CASAL À FRENTE DA REDE — o destaque da seção 4: retrato grande de um lado,
 * nome, função e prosa do outro. Uma pessoa (ou um casal) por vez, com espaço
 * para uma bio de verdade, é o formato certo para quem lidera; grade de cards
 * iguais é para elenco.
 *
 * NOME E FUNÇÃO CONFERIDOS COM A REDE em 11/08/2026, junto com a foto.
 *
 * "OBREIROS" É O CARGO, E NÃO É SINÔNIMO DE PASTOR NEM DE LÍDER. Os três
 * existem na Videira e significam coisas diferentes; a rede disse obreiros, e
 * é obreiros que fica. Não "promover" para pastor achando que soa melhor — o
 * casal à frente da rede de jovens não é o casal que pastoreia a igreja, e a
 * diferença é informação, não descuido de redação.
 *
 * A palavra aparece sozinha, sem "da rede de jovens" pendurado: a etiqueta
 * logo acima já diz "Nossa liderança" e a página inteira é a rede, então o
 * escopo vem do contexto. Acrescentar seria escrever mais do que a rede disse.
 *
 * A BIO AINDA NÃO VEIO, e por isso `bio` está vazia — o bloco de prosa não
 * imprime parágrafo nenhum (o `.map` numa lista vazia não gera nada). Isso é
 * diferente do placeholder que esteve aqui antes ("Edite aqui com a história
 * do casal…"): aquilo fazia sentido enquanto TUDO era rascunho e servia de
 * lembrete na tela. Agora que nome e função são reais, texto de rascunho ao
 * lado deles viraria a única coisa falsa da seção. Descrição é opcional
 * desde a especificação da página; sem texto a seção está completa, não
 * incompleta — o que fica reservado (a pedido do usuário, ver `min-h-24` no
 * JSX) é só o RESPIRO abaixo de "Obreiros", pra coluna não terminar colada
 * nele enquanto o texto não chega.
 *
 * Para publicar uma bio, é só pôr um ou dois parágrafos na lista.
 *
 * A FOTO é uma selfie noturna, formato ~3:4, e cai num quadro 4:5. Como o
 * quadro é mais LARGO que o arquivo em proporção, o corte se dá na altura, e
 * são só ~7% no total, repartidos entre topo e pé: os dois rostos, que ocupam
 * a metade de cima, não chegam perto da borda. Se um dia entrar um retrato bem
 * mais alto que 3:4, conferir o enquadramento — aí o corte passa a doer.
 */
const liderancaRede = {
  nomes: "Gustavo e Mariana Pires",
  funcao: "Obreiros",
  bio: [] as string[],
  foto: "/radicais/lideranca/casal.jpg",
  alt: "Gustavo e Mariana Pires, obreiros dos Radicais Livres, lado a lado e sorrindo durante um encontro da rede à noite",
};

/**
 * OS DEMAIS LÍDERES — a segunda camada da seção, em grade, embaixo do casal.
 *
 * ⚠️ VAZIO DE PROPÓSITO, E A GRADE NÃO RENDERIZA ENQUANTO ESTIVER ASSIM (ver o
 * `lideranca.length > 0` lá embaixo). Diferente do casal, aqui não há nem foto:
 * seria uma fileira de cards vazios. Nome de líder é o tipo de fato que não se
 * preenche por aproximação — publicar o nome de quem já saiu da função é
 * exatamente o dano que este site existe para não causar.
 *
 * Para publicar, basta preencher — o layout já está pronto e se adapta a
 * qualquer quantidade (2 ou 3 colunas conforme a largura):
 *
 *   { nome: "Fulano de Tal",
 *     funcao: "Líder de célula",
 *     descricao: "Uma ou duas frases, opcional.",
 *     foto: "/radicais/lideranca/fulano.jpg",
 *     alt: "Retrato de ..." }
 *
 * A FOTO é recorte 4:5 (retrato). Ponha o original em `material/lideres/`,
 * acrescente uma linha ao `LIDERANCA` do `preparar-galeria.py` e rode o script:
 * ele endireita, reduz e grava em `public/radicais/lideranca/` — e mantém o
 * retrato fora da parede da galeria. Sem `foto`, o card cai num monograma com a
 * inicial, que é melhor do que uma silhueta cinza de "usuário sem avatar".
 *
 * `descricao` é opcional; `nome` e `funcao` não são.
 */
type Lider = {
  nome: string;
  funcao: string;
  descricao?: string;
  foto?: string;
  alt?: string;
};

const lideranca: Lider[] = [];

export default function RadicaisLivres() {
  return (
    /* A variável de fonte entra aqui, na raiz da página, porque o `.serifa` do
       `quem-somos.module.css` a consulta por `var()` — e uma variável CSS só
       existe para quem está dentro do elemento que a declara. Fora desta <div>
       ela é desconhecida, que é exatamente o efeito desejado: nenhuma outra
       rota herda esta tipografia. */
    <div className={`${instrumentSerif.variable} bg-bone text-foreground`}>
      {/* ═══ 0. A NAVEGAÇÃO DESTA ROTA ═══
          A barra do topo é a MESMA do resto do site — o `Header` do
          `app/layout.tsx` —, e nada é montado aqui. A diferença é que nesta
          rota ela é ESTÁTICA: desenha no alto do documento, sobre a capa, e vai
          embora com a rolagem em vez de acompanhá-la. Ver
          `ROTAS_HEADER_ESTATICO` em `lib/overlay-routes.ts`.

          A razão é a página: são três peças em tela cheia em sequência — a capa
          com a colagem vagueando, o letreiro RADICAL LIVRES e a galeria com o
          palco pinado por seis alturas de tela. Uma barra fixa disputava o
          quadro com as três, e sobre o trecho pinado era pior que isso: some e
          volta com a direção da rolagem, então piscava em cima de uma
          composição que não se move junto.

          O QUE ISTO SUBSTITUIU: um `BubbleMenu` — botão redondo no canto que
          abria a tela inteira em cápsulas tortas, com entrada em GSAP —, que
          existia só nesta rota e trocava a barra por completo. Ele saiu por
          decisão de escopo: a navegação do site volta a ser uma só. Os arquivos
          eram `components/BubbleMenu.tsx` e `components/bubble-menu.module.css`
          e nunca chegaram a ser commitados — não há o que reabrir no histórico
          se um dia a ideia voltar. */}

      {/* ═══ 1. CAPA — a janela que se abre sozinha ═══
          A página abre com uma moldura PEQUENA no meio do escuro e o nome da
          rede por cima dela; a moldura cede sozinha, assim que a página entra,
          até a colagem sangrar nas quatro bordas, e etiqueta, texto e botões
          chegam em escada atrás dela. São `@keyframes` com `animation-delay` —
          nenhuma linha de JavaScript, e nada preso à rolagem.

          A peça mora em `components/CapaRadicais.tsx` e
          `components/capa-radicais.module.css`, e é lá que estão as contas: por
          que o recorte é `clip-path` e não `scale`, por que a colagem NÃO
          cresce (ela já está do tamanho final o tempo todo, vagueando), e por
          que o estado final é o padrão do CSS em vez do inicial.

          ESTA ROTA CONTINUA EM `OVERLAY_ROUTES` (`lib/overlay-routes.ts`): o
          `<main>` solta o `pt-16 sm:pt-20` que reservava a altura da nav e o
          Header fica transparente no topo. As duas pontas precisam concordar —
          se só uma soubesse da lista, daria uma faixa bone acima da capa ou
          nav branca sobre fundo claro, ilegível.

          ⚠️ A NAV ASSISTE À ABERTURA INTEIRA, e isso é novo: a capa se abre
          sem rolagem, então a barra ainda está em cena quando a colagem chega
          às bordas. Ela atravessa dois fundos, e os dois estão cobertos — com
          a moldura fechada, o `plum-deep` chapado da seção; com ela aberta, o
          véu de nav do `CapaRadicais` (a faixa `h-40` do topo), que é o que
          garante os 9,8:1 sobre a colagem em movimento. O véu está DENTRO da
          moldura, ou seja, entra em cena junto com a colagem que ele protege —
          nunca há um quadro com foto clara e nav branca sem véu no meio. */}
      <CapaRadicais />

      {/* ═══ 2. QUEM SOMOS ═══
          QUATRO MOVIMENTOS numa faixa `bone` só — abertura, o letreiro RADICAL
          LIVRES com fotografia dentro das letras, a frase de impacto e a régua
          de missão/visão/propósito. A seção inteira mora em
          `components/quem-somos/`; o `QuemSomos.tsx` explica o desenho, o que
          foi aposentado e por quê, e o `quem-somos.module.css` carrega a
          composição e a coreografia de rolagem.

          É A ÚNICA SEÇÃO DA PÁGINA QUE NÃO ESTÁ ESCRITA AQUI, e a exceção se
          paga: são quatro movimentos, nove fotografias, uma linha do tempo de
          entrada e uma interação de cursor. Numa página que já tem mil linhas,
          isso era o bastante para o resto virar apêndice. */}
      <QuemSomos />


      {/* ═══ 3. NOSSOS ENCONTROS ═══
          Dois blocos alternados, foto de um lado e texto do outro. A alternância
          sai do índice — o segundo bloco inverte a ordem das colunas no desktop
          (`lg:[&>*:first-child]:order-2`), e no celular os dois caem no mesmo
          empilhamento, foto em cima. */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          {/* AS DUAS LINHAS SÃO EXPLÍCITAS (o `block` no segundo span), então o
              `max-w-4xl` não está resolvendo quebra nenhuma — é só teto de
              segurança. A manchete anterior ("Toda semana perto de casa, uma
              vez por mês todo mundo junto") dependia dele de verdade: no `2xl`
              das outras manchetes ela sobrava a palavra "junto" sozinha numa
              terceira linha. Esta é curta o bastante para caber inteira mesmo
              no `2xl`, e a folga a mais só serve para telas onde a fonte
              renderiza mais larga. */}
          <Reveal className="max-w-4xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Nossos encontros
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Fique ligado nas{" "}
              <span className="block font-normal italic text-grape">
                programações.
              </span>
            </h2>
          </Reveal>

          <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
            {encontros.map((e, i) => (
              <Reveal key={e.titulo} delay={i * 60}>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                    }`}
                >
                  <figure className="overflow-hidden rounded-[2rem]">
                    <ImageWithFallback
                      src={e.foto}
                      alt={e.alt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </figure>

                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-grape">
                      {e.rotulo}
                    </span>
                    <h3 className="font-display mt-4 text-[clamp(1.6rem,3.2vw,2.25rem)] font-medium leading-tight text-foreground">
                      {e.titulo}
                    </h3>
                    <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                      {e.texto}
                    </p>
                    {e.href ? (
                      <Link
                        href={e.href}
                        className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-grape"
                      >
                        {e.cta}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* A DATA DO CULTO NÃO ESTÁ NO SITE, e este parágrafo é o que faz
              disso uma informação em vez de uma lacuna. Ele existe porque a
              rede não tem dia fixo: a data sai no Instagram, mês a mês, e é
              para lá que a pessoa tem que ir. Se um dia o culto ganhar dia
              fixo, este bloco é o primeiro a mudar. */}
          <Reveal delay={120}>
            <div className="mt-16 flex flex-col gap-6 rounded-[2rem] bg-bone p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:mt-24">
              <div>
                <h3 className="font-display text-xl font-medium text-foreground">
                  Acompanhe as datas do nosso Culto de Jovens
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  Nosso encontro mensal tem datas dinâmicas. Divulgamos os dias, horários e todas as novidades diretamente no perfil do Instagram da rede.
                </p>
              </div>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-plum-deep px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
              >
                <IconeInstagram />
                {INSTAGRAM.arroba}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 4. NOSSA LIDERANÇA ═══
          O DESENHO, ponto a ponto: retrato 4:5 arredondado em `rounded-[2rem]`
          à esquerda, coluna de texto à direita na ordem etiqueta → manchete →
          nomes em display → função em versalete → prosa, `items-center` entre
          as duas e `variant="left"`/`"right"` nos dois `Reveal`, que faz as
          colunas entrarem uma contra a outra.

          Uma foto só, e por isso sem inset encaixado no canto do retrato
          grande: inset com foto repetida seria enfeite. Ele só se justifica
          onde há duas fotos e duas coisas a dizer.

          O FUNDO É `bone` porque a seção 3, logo acima, é `sand`. A alternância
          é o que separa as faixas sem precisar de linha divisória.

          A GRADE DOS DEMAIS LÍDERES vem depois, e só aparece quando houver
          alguém cadastrado (ver o `lideranca` lá em cima). Enquanto vazia, some
          inteira — inclusive o próprio subtítulo, que sem cards embaixo ficaria
          anunciando uma lista que não existe. */}
      <section className="bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="left">
              <figure className="overflow-hidden rounded-[2rem]">
                <ImageWithFallback
                  src={liderancaRede.foto}
                  alt={liderancaRede.alt}
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>
            </Reveal>

            <Reveal variant="right" delay={100}>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Nossa liderança
              </span>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
                Nossa liderança{" "}
                <span className="font-normal italic text-grape">
                  de jovens
                </span>
              </h2>
              <p className="font-display mt-7 text-2xl font-medium text-foreground">
                {liderancaRede.nomes}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                {liderancaRede.funcao}
              </p>
              {/* RESPIRO RESERVADO PRA BIO, mesmo sem texto ainda — pedido do
                  usuário pra a coluna já não terminar colada em "Obreiros"
                  enquanto a rede não manda a prosa. Sem `.length > 0` aqui:
                  o espaço existe de qualquer jeito; o que muda é só se tem
                  texto dentro dele ou não. Quando a bio chegar, o `space-y-4`
                  cuida do respiro ENTRE parágrafos e este `mt-6` continua
                  sendo o respiro ATÉ o primeiro. */}
              <div className="mt-6 min-h-24 space-y-4 leading-relaxed text-muted-foreground">
                {liderancaRede.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {lideranca.length > 0 ? (
            <div className="mt-20 border-t border-foreground/10 pt-16 lg:mt-24">
              <Reveal>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Também lideram por aqui
                </h3>
              </Reveal>
              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {lideranca.map((lider, i) => (
                  <Reveal key={lider.nome} delay={(i % 3) * 90}>
                    <figure>
                      {lider.foto ? (
                        <div className="overflow-hidden rounded-[1.5rem]">
                          <ImageWithFallback
                            src={lider.foto}
                            alt={lider.alt ?? `Retrato de ${lider.nome}`}
                            className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                          />
                        </div>
                      ) : (
                        /* Sem foto, um monograma — a inicial na tinta da casa.
                           É melhor que a silhueta cinza de "usuário sem avatar",
                           que num site de igreja lê como cadastro incompleto. */
                        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[1.5rem] bg-lilac">
                          <span className="font-display text-6xl font-medium text-grape">
                            {lider.nome.charAt(0)}
                          </span>
                        </div>
                      )}
                      <figcaption className="mt-5">
                        <h4 className="font-display text-xl font-medium text-foreground">
                          {lider.nome}
                        </h4>
                        <p className="mt-1 text-sm italic text-grape">
                          {lider.funcao}
                        </p>
                        {lider.descricao ? (
                          <p className="mt-3 leading-relaxed text-muted-foreground">
                            {lider.descricao}
                          </p>
                        ) : null}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ═══ 5. GALERIA — a imersão ═══
          O grande destaque da página, e a única seção escura dela. A inversão
          é o assunto: a página inteira é osso, e aqui ela vira noite.

          TRÊS ATOS. Entrada em rolagem normal, um palco PINADO por seis
          alturas de tela em que a composição inteira se recompõe cena a cena,
          e uma desaceleração de volta ao normal. Trinta e duas fotografias,
          sete cenas, uma que cresce até tomar a tela.

          A PEÇA MORA EM `components/galeria/`, e é lá que estão as contas: o
          `Galeria.tsx` explica a janela de montagem das imagens, o
          `useMotorDaGaleria.ts` explica por que existe um único ScrollTrigger
          e por que nada anima `width`, e o `galeria.module.css` explica por
          que ESTA seção usa GSAP quando o resto do site não usa.

          A COMPOSIÇÃO NÃO ESTÁ AQUI NEM LÁ: ela está em `lib/galeria.ts`, em
          números. Trocar uma foto de lugar, de camada ou de cena é editar uma
          linha de dados — nenhum componente precisa ser aberto.

          O QUE ISTO SUBSTITUIU: a parede de masonry em quatro colunas, com o
          `distribuirEmColunas` do `lib/radicais-fotos.ts`. Os dois saíram
          juntos; os `alt` das dezoito fotos que já estavam no ar foram para o
          `lib/galeria.ts` palavra por palavra. Se a parede voltar um dia, ela
          está inteira no histórico do git. */}
      <Galeria />

      {/* ═══ 6. FAÇA PARTE ═══
          Continua no mesmo escuro da galeria e desce direto para o rodapé — a
          página escurece na galeria e não clareia mais. Por isso esta seção
          NÃO tem o topo arredondado que fecha as outras páginas: o arredondado
          existe para marcar a passagem do claro para o escuro, e aqui não há
          passagem nenhuma.

          O FUNDO É O `--gal-bg` DA GALERIA (#17131F) E NÃO O `plum-deep` DO
          SITE (#180929), que era o que estava aqui antes. Os dois são escuros
          e primos, e é justamente por isso que a emenda entre eles aparecia:
          duas tintas quase iguais lado a lado leem como erro de impressão, não
          como mudança de seção. A galeria trouxe a paleta do desenho, menos
          saturada, e esta seção segue a vizinha de cima. */}
      <section className="relative overflow-hidden bg-[#17131F]">
        <div className="container relative mx-auto px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <Reveal variant="scale" className="text-center">
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.02] text-white">
              Você é{" "}
              <span className="block font-normal italic text-grape-light">
                bem-vindo aqui
              </span>
            </h2>

            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <Link
                  href="/contato"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-9 py-4 text-sm font-semibold text-plum-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_-18px_rgba(0,0,0,0.7)] active:scale-95"
                >
                  Quero participar
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-9 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
              >
                <IconeInstagram />
                Seguir {INSTAGRAM.arroba}
              </a>
            </div>

            <p className="mx-auto mt-8 max-w-sm text-sm leading-relaxed text-white/50">
              No Instagram sai a data de cada Culto de Jovens e o que está
              acontecendo na rede.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
