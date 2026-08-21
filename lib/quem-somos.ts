/**
 * O acervo e a copy da seção "Quem somos" do /radicais-livres.
 *
 * POR QUE ISTO SAIU DO JSX. O `docs/estrutura.md` (seção 7) registra que hoje só
 * o `lib/cells.ts` separa conteúdo de layout, e que enquanto texto e marcação
 * estiverem trançados revisar copy exige mexer em componente React. Esta seção
 * é a primeira a pagar a dívida: são quatro movimentos, nove fotografias e um
 * punhado de textos que a liderança ainda pode devolver corrigidos — mexer em
 * qualquer um deles não deveria pedir para abrir um arquivo de layout.
 *
 * ⚠️ AS FOTOS DAQUI NÃO SE REPETEM DENTRO DA SEÇÃO, e a lista foi montada para
 * também não repetir as duas que a seção "Nossos encontros" usa logo abaixo
 * (`oracao-a-dois` e `culto-lotado`). Elas REPETEM as da parede da galeria, e
 * isso é consciente — as 18 da parede são todas as que existem hoje, e a mesma
 * regra já valia na versão anterior desta seção.
 *
 * `w`/`h` SÃO O TAMANHO REAL DO ARQUIVO, pela mesma razão do `lib/radicais-
 * fotos.ts`: é a razão entre eles que reserva a altura da foto antes de ela
 * chegar. Numa composição em camadas sobrepostas isso importa ainda mais que
 * na parede — sem a proporção, cada imagem que carrega reposiciona as vizinhas
 * e a colagem inteira dança durante a rolagem. Trocou o arquivo, troca os
 * números junto.
 *
 * OS `alt` VÊM DO `lib/radicais-fotos.ts` onde a foto já existe lá, palavra por
 * palavra. Duas descrições diferentes da mesma imagem no mesmo site é ruído
 * para quem navega por leitor de tela.
 */
export type FotoQuemSomos = {
  src: string;
  /** Largura real do arquivo em `public/`, em pixels. */
  w: number;
  /** Altura real do arquivo em `public/`, em pixels. */
  h: number;
  /** Descreve o que se vê. Toda foto desta seção hoje se vê, então nenhuma
   *  está vazia — a única que estava era a camada que acendia sob o cursor, e
   *  ela saiu em 17/08/2026. Vazio continua sendo o certo para camada
   *  decorativa, se algum dia voltar a existir uma. */
  alt: string;
};

/**
 * A COLAGEM DA ABERTURA — TRÊS cartas.
 *
 * ⚠️ A ORDEM DESTA LISTA É A DA COMPOSIÇÃO, não a de importância. Cada índice
 * cai numa posição fixa, num QUADRO de proporção própria e num ÂNGULO próprio
 * no `quem-somos.module.css` (`.carta1` a `.carta3`) — trocar duas de lugar
 * aqui não reordena nada, embaralha o desenho:
 *
 *   1ª  a dominante, deitada, no alto à direita — a turma inteira no telão
 *   2ª  a vertical que segura o lado esquerdo — as costas na ciclovia
 *   3ª  a pequena que fecha embaixo — a turma dos rapazes na varanda
 *
 * TODAS AS TRÊS JÁ MORAVAM NO ACERVO com outro nome, e conferir isso por
 * comparação de pixels ANTES de gravar arquivo novo virou passo do processo
 * justamente por causa desta seção — seis entregas seguidas, seis fotos que já
 * estavam lá: `radicais 8` é a `turma-telao-rosa` (0,10 em 255), `quem somos 3`
 * é a `ciclovia-de-costas` (0,2) e `quem somos 7` é a `turma-rapazes` (0,12).
 * Reaproveitá-las em vez de gravar cópias é o que evita a página baixar o mesmo
 * arquivo duas vezes.
 *
 * ⚠️ O `alt` DA 1ª E DA 2ª É O DO `lib/galeria.ts`, palavra por palavra — duas
 * descrições diferentes da mesma imagem no mesmo site é ruído para quem navega
 * por leitor de tela. O da 3ª foi escrito aqui porque a `turma-rapazes` é o caso
 * raro: está no acervo processado, mas NÃO na parede da galeria, então não havia
 * descrição de onde copiar. Se um dia ela entrar na parede, o `alt` de lá tem de
 * nascer igual a este.
 *
 * ⚠️ ERAM QUATRO ATÉ 18/08/2026, e a que saiu foi a `equipe-com-flores` (a
 * `quem somos 2`, que era a maior de todas). O pedido foi por uma abertura
 * "mais minimalista e abstrata", e a conta que decidiu qual tirar está no
 * módulo: das quatro, é a única diurna, com quinze rostos, buquês e fachada de
 * vidro, e a única que perdia metade da altura no corte. As três que ficaram
 * têm uma leitura só cada uma à distância. Devolver a entrada aqui e escrever a
 * `.carta4` no módulo traz ela de volta — mas traz junto o quarto assunto.
 *
 * ⚠️ ESTA SEÇÃO REPETE FOTO DA SEÇÃO "NOSSOS ENCONTROS"? Não: as duas de lá
 * (`turma-luz-roxa` e `cartazes-nova-criatura`, desde 17/08/2026) continuam
 * fora daqui. A regra vale só para aquela vizinhança e continua valendo. Quem
 * trocar uma foto lá tem que conferir esta lista, e vice-versa.
 *
 * ⚠️ A LISTA GIROU DUAS VEZES DEPOIS DA REDUÇÃO PARA TRÊS, ainda em 18/08/2026.
 * Primeiro a 1ª saiu de `lanternas-na-noite` para `turma-rapazes`; depois a
 * `turma-rapazes` DESCEU para a 3ª e a 1ª virou a `turma-telao-rosa`. O
 * movimento faz sentido de longe: a posição dominante passou a ser a única foto
 * da seção que mostra a rede INTEIRA, mais de cem pessoas de uma vez, e as duas
 * de baixo são recortes dela — três costas e sete rapazes. Da multidão para o
 * grupo para os amigos.
 *
 * ⚠️ CADA TROCA MEXEU NO ENQUADRAMENTO, e as duas foram na direção contrária.
 * A 3ª PERDEU o `object-position` (a `turma-rapazes` é 1,50 num quadro de 1,45:
 * o corte virou horizontal e some em 3% de largura); a 1ª GANHOU um (a
 * `turma-telao-rosa` é 1,33 num quadro de 1,55, e os 14% que sobram têm de sair
 * do chão vazio do pé, não do telão). Ver o módulo — a conta está lá.
 *
 * O QUE AS RODADAS DE AGOSTO APOSENTARAM: `duas-amigas`, `dupla-piscina`,
 * `deitados-nas-almofadas`, `equipe-com-flores`, `lanternas-na-noite` e agora
 * `mesa-de-restaurante`. Todas continuam no acervo, e as que estão na parede da
 * galeria continuam lá — o acervo é maior do que a página.
 */
export const colagemAbertura: FotoQuemSomos[] = [
  {
    src: "/radicais/turma-telao-rosa.jpg",
    w: 1280,
    h: 960,
    alt: "Foto de turma com mais de cem jovens sentados e em pé diante do telão, o salão inteiro tomado por uma luz rosa",
  },
  {
    src: "/radicais/ciclovia-de-costas.jpg",
    w: 1200,
    h: 1600,
    alt: "Três jovens de mochila caminhando de costas por uma ciclovia arborizada",
  },
  {
    src: "/radicais/turma-rapazes.jpg",
    w: 1600,
    h: 1066,
    alt: "Um grupo de rapazes posando abraçados, ombro a ombro, numa varanda à noite — um deles de chapéu de palha, dois de óculos escuros —, com luzinhas coloridas acesas na parede ao fundo",
  },
];

/**
 * AS FOTOS DO MOVIMENTO 2 — a composição em camadas do "Radical Livres".
 *
 * Cada uma tem um trabalho de PROFUNDIDADE, e é por isso que estão nomeadas
 * por papel e não por índice: trocar o arquivo é fácil, trocar o papel
 * desmancha a composição.
 *
 *   pano              o fundo de tela cheia, atrás de tudo
 *   fundo             camada 0 — grande, desfocada, sangrando pela direita
 *   mediaA / mediaB   camada 2 — nítidas, entre RADICAL e LIVRES
 *   pequena           camada 4 — a única que passa POR CIMA de LIVRES
 *   noTexto           revelada DENTRO das letras de RADICAL (background-clip)
 *
 * ⚠️ A `noTexto` É A ÚNICA QUE NÃO MUDOU NO COMP DE 17/08/2026, e foi decisão
 * explícita da rede — "a imagem no letreiro Radical deve permanecer o mesmo".
 * Ela também é a escolha mais delicada da seção: aparece recortada pelas letras
 * sobre fundo bone, então precisa ser ESCURA — foto clara ali some dentro do
 * próprio fundo e a palavra deixa de existir. `turma-01` é noturna, com pontos
 * quentes de luzinha, e ainda leva um véu ameixa por cima no CSS (ver
 * `--foto-radical` no módulo). Se um dia entrar uma foto diurna aqui, medir o
 * contraste antes: a legibilidade da palavra vem primeiro.
 *
 * ⚠️ A CAMADA 0 (`fundo`) TAMBÉM MUDOU DE VALOR: era a `turma-04`, noturna
 * (brilho médio 73/255), e passou a ser a das amigas de colar havaiano, diurna
 * (106/255). Ela é a "borrada" do comp — recua por desfoque de 5px e 72% de
 * opacidade, e agora recua sobre um pano fotográfico em vez de sobre osso, o
 * que a faz sumir menos. Se um dia ela precisar recuar mais, o botão é a
 * opacidade, não o desfoque: mais desfoque numa foto clara vira mancha.
 *
 * ⚠️ A `pequena` MUDOU NA SEGUNDA RODADA DE 17/08/2026: saiu `farinha-no-rosto`
 * e entrou `mao-sobre-a-cabeca` (a `radical 6` da entrega). A PROPORÇÃO É A
 * MESMA, 1200×1600, e é isso que fez a troca ser só de arquivo — a camada 4
 * atravessa LIVRES por cima, com posição e tamanho calculados no módulo, e um
 * retrato de outra proporção teria mexido em quanto da palavra fica coberto.
 * Trocar de novo por uma foto deitada exige refazer essa conta.
 *
 * A `farinha-no-rosto` ficou sem uso na página, e isso é normal: o acervo é
 * maior do que a página. O arquivo continua em `public/radicais/`.
 *
 * TODAS TÊM `alt` DE VERDADE AGORA. A seção já teve uma camada com `alt` vazio
 * — a que acendia sob o cursor, invisível no repouso —, e o vazio era decisão:
 * anunciá-la seria descrever para quem não vê uma imagem que quem vê também não
 * via. Ela saiu, e com ela o único caso de descrição vazia daqui.
 */
export const fotosRadicalLivres = {
  /* O PANO DE FUNDO — a fotografia de tela cheia sobre a qual o letreiro
     inteiro se apoia. É a camada mais atrás de todas, e a única que não recua
     por desfoque: ela recua por opacidade, lavada pelo osso da seção.

     ⚠️ ESTA POSIÇÃO É NOVA, e ela substituiu a "foto que acendia sob o cursor" —
     uma imagem a 6% de opacidade que só existia de verdade dentro de um círculo
     perseguindo o mouse. As duas não podiam coexistir: aquele efeito revelava
     foto SOBRE O OSSO, e com um pano de fundo fotográfico ele passaria a
     revelar foto sobre foto, que é lama. Saiu o efeito, entrou o pano — decisão
     da rede no comp de 17/08/2026. O código do cursor está no histórico do git
     (`RadicalLivres.tsx`, a máscara em `requestAnimationFrame`).

     `alt` DE VERDADE, e isto mudou junto: a camada anterior era invisível e
     entrava como decorativa. Esta se vê, então descreve. */
  pano: {
    src: "/radicais/bebe-com-hamburguer.jpg",
    w: 1600,
    h: 1600,
    alt: "Bebê de camiseta bordô da rede sentado no cadeirão de uma lanchonete, mordendo um hambúrguer com as duas mãos",
  },
  fundo: {
    src: "/radicais/colares-havaianos.jpg",
    w: 1280,
    h: 960,
    alt: "Quatro amigas de colar havaiano fazendo caretas e chifrinhos para a câmera na varanda de uma casa",
  },
  mediaA: {
    src: "/radicais/rapazes-sentados-a-noite.jpg",
    w: 1600,
    h: 1200,
    alt: "Cinco rapazes sentados lado a lado num banco de pedra à noite, de boné e camisas de time",
  },
  mediaB: {
    src: "/radicais/tres-de-bigode.jpg",
    w: 1200,
    h: 1600,
    alt: "Três rapazes de bigode com os rostos encostados, olhando para a câmera sem sorrir",
  },
  pequena: {
    src: "/radicais/mao-sobre-a-cabeca.jpg",
    w: 1200,
    h: 1600,
    alt: "Um jovem de camiseta verde com a mão sobre a cabeça de outro, de boné e olhos fechados, os dois no meio do salão cheio",
  },
  noTexto: {
    src: "/radicais/turma-01.jpg",
    w: 1600,
    h: 1066,
    alt: "Turma de jovens posando junta à noite no pátio, alguns agachados na frente, com luzinhas penduradas ao fundo",
  },
} satisfies Record<string, FotoQuemSomos>;

/**
 * AS DUAS METADES DO NOME, que apontam para lados opostos de propósito.
 *
 * Isto desarma a leitura errada mais comum: "radical" soa como intolerância, e
 * é exatamente o contrário do que o movimento quer dizer. Se um dia esta copy
 * for reescrita, manter as duas direções — radical aponta para dentro, livre
 * aponta contra a religiosidade. Perder isso é perder o nome inteiro.
 *
 * `contra` É O MICROTEXTO da composição, solto ao lado da palavra gigante como
 * anotação de margem de revista. `texto` é a prosa que explica, e ela vive
 * DEPOIS da composição, na coda — ver o comentário lá no `RadicalLivres.tsx`.
 */
export const nome = [
  {
    palavra: "Radical",
    contra: "contra o pecado",
    texto:
      "Uma postura de firmeza com os valores do Reino. Levamos nossa fé a sério e buscamos viver em santidade e verdade em todas as áreas da vida.",
  },
  {
    palavra: "Livres",
    contra: "da religiosidade",
    texto:
      "Uma vida pautada pelo amor e pela graça aceita por Jesus. Caminhamos em constante aprendizado, expressando um evangelho vivo e autêntico no dia a dia.",
  },
];

/**
 * A MÃO DOS RADICAIS, usada como marca d'água atrás da régua de missão, visão e
 * propósito.
 *
 * NÃO É FOTOGRAFIA DO ACERVO — é a marca do movimento, e por isso mora na raiz
 * do `public/` junto dos outros ativos de identidade, e não em
 * `public/radicais/`. O arquivo veio da oficina de imagem
 * (`material/_acervo/`, que é ignorada pelo git); o que está versionado é
 * só este derivado, pela mesma regra do resto das imagens do site.
 *
 * ELA É DECORATIVA E ENTRA COMO `background`, não como `<img>`: não acrescenta
 * informação nenhuma a quem lê o texto por cima dela, e anunciá-la num leitor
 * de tela seria interromper a leitura da missão para descrever um carimbo. Por
 * isso não tem `alt` aqui — se um dia ela virar conteúdo, aí sim precisa de um.
 *
 * O CAMINHO MORA NESTE ARQUIVO, e não no CSS, pela mesma razão do
 * `--foto-radical` do movimento 2: nome de arquivo é acervo, e acervo mora
 * aqui. O módulo recebe a URL pronta por variável.
 *
 * `w`/`h` são o tamanho real do arquivo. O módulo usa a razão entre eles
 * (`aspect-ratio`) para a mão nunca deformar — trocou o arquivo, troca os
 * números junto.
 */
export const marcaDagua = {
  src: "/marca/logo-radicais-fundo.webp",
  w: 468,
  h: 500,
};

/**
 * Missão, visão e propósito.
 *
 * AS TRÊS SÃO DA REDE, e a missão passou a ser em 17/08/2026. O propósito é
 * citação literal do pr. Naor Pedroza, de 2000, e a visão é o desdobramento
 * dessa mesma frase. A MISSÃO era redação nossa e estava marcada como pendência
 * no `docs/estrutura.md` justamente por isso — a liderança devolveu a versão
 * oficial no Figma do redesenho, e é ela que está aqui. A pendência morreu.
 *
 * Se a missão for revista de novo, é trocar o texto abaixo — não acrescentar um
 * quarto item.
 *
 * OS TEXTOS SÃO OS QUE JÁ ESTAVAM NO SITE, e não os do briefing do redesenho,
 * que divergiam em três pontos ("onde ele está" por "onde ele já está",
 * "líderes e pastores" por "líderes e de pastores", "assumirão o comando, e
 * governo" por "assumirá o comando, o governo"). Numa citação atribuída a uma
 * pessoa real, a versão que já foi conferida ganha da versão parafraseada.
 */
export const identidade = [
  {
    rotulo: "Missão",
    texto:
      "Alcançar o jovem onde ele estiver, na escola, no trabalho ou na roda de amigos, e formá-lo através das células para cuidar de outros.",
  },
  {
    rotulo: "Visão",
    texto:
      "Uma geração de líderes e de pastores sendo formada agora para assumir, adiante, o governo desta nação.",
  },
  {
    rotulo: "Propósito",
    /* Citação literal, e é a única das três que não pode ser reescrita: é o
       encargo do pr. Naor. Vem separada da prosa porque na régua ela recebe
       aspas, itálico e assinatura — misturar as duas coisas num campo só
       obrigaria a página a adivinhar onde a citação começa. */
    citacao:
      "Edificar uma geração de líderes, de pastores, que assumirá o comando, o governo desta nação.",
    fonte: "pastor Naor Pedroza, 2000",
  },
] satisfies { rotulo: string; texto?: string; citacao?: string; fonte?: string }[];

/**
 * A COPY DOS QUATRO MOVIMENTOS, fora do JSX pelo mesmo motivo das fotos.
 *
 * ⚠️ TUDO AQUI VEIO DO FIGMA DO REDESENHO, em 17/08/2026, e é a redação da
 * própria rede — não paráfrase nossa. Quando houver dúvida entre "está mais
 * bonito assim" e "é o que eles escreveram", ganha o que eles escreveram.
 *
 * O QUE ESTA RODADA APOSENTOU, para quem for procurar no histórico: a abertura
 * era "O nome não é estilo. / É uma decisão."; a introdução era um parágrafo
 * corrido que trazia a faixa etária ("dos 12 aos 29 anos") e a frase "Indaiatuba
 * é uma dessas casas"; e o movimento 3 era "Livres para viver. / Radicais para
 * permanecer.", com um fechamento sobre fé que não cabe dentro das paredes da
 * igreja. A FAIXA ETÁRIA NÃO SUMIU DA PÁGINA — ela continua na etiqueta da capa
 * ("Jovens e adolescentes · 12 a 29 anos"), que é onde alguém procura por ela.
 */
export const copy = {
  etiqueta: "Quem somos",
  abertura: {
    primeira: "Jovens destinados ao",
    segunda: "Avivamento!",
  },

  /* A INTRODUÇÃO É UMA LISTA DE PEDAÇOS, E NÃO UMA STRING, porque metade dela é
     negrito — e o negrito não é enfeite: ele carrega quem somos (jovens e
     adolescentes), de quem (Igreja Videira em Indaiatuba), o alcance (mais de 30
     países) e os três compromissos (Palavra, discipulado, comunhão através das
     células). Quem lê só os pedaços em negrito já recebe o parágrafo inteiro,
     que é exatamente o que o desenho quer.

     Numa string só, o componente teria de achar esses trechos por regex ou por
     índice, e revisar a copy passaria a exigir conferir um `slice` — o oposto do
     motivo de este arquivo existir. Aqui, trocar é trocar: mexer no texto é
     mexer no texto, mexer no destaque é mexer no `forte`. */
  introducao: [
    { texto: "Somos a rede de " },
    { texto: "jovens e adolescentes", forte: true },
    { texto: " da " },
    { texto: "Igreja Videira em Indaiatuba", forte: true },
    { texto: ". Nascido em Goiânia no ano 2000, o movimento " },
    { texto: "Radicais Livres", forte: true },
    { texto: " hoje se espalha por " },
    { texto: "mais de 30 países", forte: true },
    { texto: ", reunindo uma geração comprometida com a " },
    { texto: "Palavra", forte: true },
    { texto: ", com o " },
    { texto: "discipulado", forte: true },
    { texto: " e com a " },
    { texto: "comunhão através das células", forte: true },
    { texto: "." },
  ] satisfies { texto: string; forte?: boolean }[],

  /* A SEGUNDA LINHA VEM REPARTIDA porque a tinta da casa cai DENTRO dela, e não
     sobre a linha inteira: só "geração." recebe o roxo. Mesmo motivo da lista
     acima — repartido, trocar a copy não exige conferir onde a marcação começa.

     AS DUAS LINHAS SÃO QUEBRA DELIBERADA, não resultado de largura: a
     coreografia revela uma 150ms depois da outra (ver `FraseImpacto.tsx`), e é
     esse par que a composição do Figma mostra. Se um dia virar uma frase só, a
     escada perde o degrau.

     O ITÁLICO SAIU nesta rodada. Ele existia porque a frase antiga ecoava a
     composição do movimento 2, virando "Radicais" do romano para o itálico como
     LIVRES vira lá em cima. A frase nova não tem essa palavra para virar, e
     itálico sem o que ecoar é só enfeite. */
  impacto: {
    primeira: "Fomos chamados para",
    segunda: { texto: "marcar a nossa ", tinta: "geração." },
  },

  fechamento:
    "Somos uma geração apaixonada por Jesus, comprometida em levar o Evangelho e conquistar a nossa cidade em cada escola, faculdade, trabalho e família.",
};
