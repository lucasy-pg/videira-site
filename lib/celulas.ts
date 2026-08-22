import type { Foto } from "@/lib/foto";
import { linkWhatsApp } from "@/lib/social";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * O TEXTO E AS FOTOS DA /celulas
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Mesma divisão de trabalho do `lib/sobre.ts`: aqui mora o que a página DIZ,
 * lá em `app/celulas/page.tsx` mora como ela se PARECE. Quem for revisar a
 * copy com a igreja não precisa abrir JSX nenhum.
 *
 * O QUE NÃO ESTÁ AQUI, e é decisão herdada do `lib/cells.ts`: dia, horário,
 * endereço e nome de líder. A página inteira leva a uma conversa no WhatsApp
 * justamente porque esses quatro dados mudam demais para viver num arquivo
 * versionado — publicar um horário velho manda alguém para uma casa vazia.
 *
 * OS NÚMEROS TAMBÉM NÃO ESTÃO AQUI. "24 células em 17 bairros" não é digitado
 * em lugar nenhum: sai de `cells.length` e `neighborhoodGroups.length`. Foi
 * assim que a Home parou de anunciar 26 células enquanto o cadastro tinha 22.
 */

/* ── Tipos ────────────────────────────────────────────────────────────────
   `Titulo` é o mesmo desenho do `Manchete` da /sobre — a manchete partida em
   três para que UM trecho possa ser destacado sem tirar o resto do `<h2>`.
   Não foi promovido a um arquivo comum de propósito: o que as duas páginas
   compartilham é o FORMATO, não o desenho — e o desenho ainda pode divergir
   (hoje as duas são Poppins e pintam o destaque só de roxo; foi Newsreader
   itálico aqui até a página trocar de fonte). Se uma terceira quiser o mesmo,
   aí vale subir os dois juntos.

   ⚠️ `antes` e `depois` são colados no `forte` SEM ESPAÇO NENHUM: o espaço que
   separa as palavras tem que estar digitado dentro da string, e ele mora no
   `antes`/`depois`, não no `forte` — senão o roxo pinta um espaço solto na
   ponta da palavra. O `depois` também é onde mora a pontuação final, e ele
   fica VAZIO quando o `forte` já termina em ponto ou em interrogação: um
   `depois: "."` depois de "encontro de célula?" publica "célula?." na tela. */
export type Titulo = { antes: string; forte: string; depois: string };

/** Um pedaço de parágrafo, para quando uma frase do meio precisa de peso. */
export type Pedaco = { texto: string; forte?: boolean };

/* ── A AÇÃO ───────────────────────────────────────────────────────────────
   "Encontre uma célula" aparece três vezes na página (capa, bairros e fecho) e
   as três apontam para AQUI. Uma constante e não três `href` soltos: o dia em
   que a igreja tiver um formulário próprio, a página muda numa linha.

   POR QUE WHATSAPP E NÃO UM FORMULÁRIO. É o canal que a igreja de fato
   atende, é o mesmo número do rodapé e do /contato, e é a ponte que o
   `lib/cells.ts` já descreve: quem se identifica com o bairro fala no
   WhatsApp e recebe o endereço certo, que é o dado que o site não publica.

   A MENSAGEM JÁ VAI ESCRITA. Uma janela em branco é onde a maior parte das
   pessoas desiste — ainda mais quando o pedido é "quero entrar na casa de
   alguém que eu não conheço". Ela está na primeira pessoa porque aparece do
   lado de lá como se o visitante tivesse digitado. */
export const ACAO_ENCONTRAR_CELULA = linkWhatsApp(
  "Olá! Vi o site da Videira e queria encontrar uma célula perto de mim.",
);

/* ── 01 · CAPA ────────────────────────────────────────────────────────── */
export const HERO = {
  eyebrow: "Células Videira",
  titulo: { antes: "Tem um lugar ", forte: "para você", depois: "." } as Titulo,
  texto:
    "Encontre uma célula, construa relacionamentos, cresça na fé e viva a igreja de perto.",
  acao: "Encontrar uma célula",
  acaoSecundaria: "Conheça as células",

  /* ── A FOTOGRAFIA DA CAPA ──────────────────────────────────────────────
     UMA FOTO SÓ, E PARADA. A faixa já passou quatro células em carrossel; a
     troca automática tirava do visitante a única coisa que a capa tem para
     dar — tempo em cima de uma cena com trinta rostos. O movimento que
     sobrou é a entrada: a imagem nasce 6% maior e recua para o tamanho dela
     quando a página carrega (`capa-afasta`, no globals.css), uma vez, e
     acabou. As outras células aparecem no mosaico da seção 07 e no mural de
     bairros da 08, que são paredes paradas.

     ⚠️ É ESTA E NÃO UMA DAS DEZENAS DE SELFIES DO ACERVO: nela dá para ver o
     lugar inteiro — a parede, a decoração de Dia das Mães ao fundo, o chão —
     e três gerações no mesmo quadro, avós, pais e as crianças sentadas na
     frente. É a única do material que mostra ao mesmo tempo o LUGAR e a
     MISTURA DE IDADES, que são as duas coisas que a manchete promete.

     ⚠️ É O LCP DA ROTA, então carrega em prioridade alta, e precisa ser 16:9
     nativa: a faixa é 16:9 e uma foto de outra proporção entraria cortada.
     O recorte sobe acima do centro (ver `posicao`, na página) porque embaixo
     é chão e joelho, e em cima é a parede. */
  foto: {
    src: "/celulas/celula-filipenses.jpg",
    alvo: "public/celulas/celula-filipenses.jpg",
    alt: "Célula reunida na sala de uma casa: adultos em pé ao fundo e as crianças sentadas no chão à frente",
  } satisfies Foto,
};

/* ── 02 · O QUE É UMA CÉLULA ──────────────────────────────────────────── */
export const O_QUE_E = {
  eyebrow: "O que é uma célula?",
  titulo: {
    antes: "",
    forte: "Muito mais",
    depois: " que uma reunião semanal.",
  } as Titulo,
  paragrafos: [
    [
      { texto: "Uma célula é um pequeno grupo de pessoas que se reúne semanalmente para " },
      { texto: "compartilhar a vida, aprender a Palavra e orar juntas", forte: true },
      { texto: "." },
    ],
    [
      {
        texto:
          "É onde construímos relacionamentos, somos cuidados e crescemos na nossa caminhada com Deus.",
      },
    ],
    [
      { texto: "Porque acreditamos que a igreja não acontece apenas aos domingos. " },
      { texto: "Ela continua durante a semana, de casa em casa.", forte: true },
    ],
  ] as Pedaco[][],
  fotoPrincipal: {
    src: "/celulas/celula-leandro.jpg",
    alvo: "public/celulas/celula-leandro.jpg",
    alt: "Roda de pessoas amontoadas na sala de estar de uma casa, rindo, sob a luz quente do abajur",
  } satisfies Foto,
  /* A segunda foto é a MESMA que a /sobre usa na seção de células, e é
     reencontro de propósito: quem vem de lá reconhece a varanda. Ela entra
     menor e por baixo da quina da grande porque o que ela acrescenta é o
     LUGAR — telhado, varal de luzinhas, quintal —, não os rostos. */
  fotoSobreposta: {
    src: "/celulas/celula-sao-lourenco.jpg",
    alvo: "public/celulas/celula-sao-lourenco.jpg",
    alt: "Célula reunida na varanda de uma casa à noite, sob um varal de luzinhas, com as crianças sentadas na frente segurando copos",
  } satisfies Foto,
};

/* ── 03 · NOSSA VISÃO ─────────────────────────────────────────────────── */
export const VISAO = {
  eyebrow: "Nossa visão",
  /* "ALÉM DAS QUATRO PAREDES" SAIU e não volta: era metáfora de púlpito, e a
     seção passa a dizer a mesma coisa com o fato — a igreja acontece de casa
     em casa. O roxo cai em "de casa em casa" porque é ele que carrega a ideia;
     "uma igreja" sozinho não é a visão de ninguém. */
  titulo: {
    antes: "Uma igreja ",
    forte: "de casa em casa",
    depois: ".",
  } as Titulo,
  /* DOIS PARÁGRAFOS E É TUDO. Eram três, e o terceiro ("assim como a igreja do
     primeiro século…") dizia pela terceira vez o que os outros dois já tinham
     dito duas — a seção inteira era a mesma frase em três tamanhos.

     O ENCARGO ("cada membro um ministro, cada casa uma extensão da igreja")
     APARECE UMA VEZ SÓ NA PÁGINA, e é aqui, dentro do primeiro parágrafo. Ele
     também era o bloco tipográfico gigante no pé desta seção — a mesma frase
     escrita duas vezes na mesma tela, uma sussurrada e uma gritada. Ficou a
     sussurrada. Quem quiser o encargo em voz alta tem a /sobre, que o exibe
     entre aspas no meio da página; e a seção 09 desta página ainda o repete
     como refrão, longe daqui, para fechar o argumento. */
  paragrafos: [
    [
      { texto: "Na Videira, cremos que " },
      {
        texto:
          "cada membro é um ministro e cada casa uma extensão da igreja",
        forte: true,
      },
      { texto: "." },
    ],
    [
      {
        texto:
          "Por isso, além de nos reunirmos para celebrar, durante a semana vivemos a igreja através das células: ",
      },
      {
        texto:
          "compartilhando a fé, cuidando de pessoas e fazendo discípulos",
        forte: true,
      },
      { texto: "." },
    ],
  ] as Pedaco[][],
  versiculo:
    "Partiam o pão em suas casas e juntos participavam das refeições, com alegria e sinceridade de coração.",
  referencia: "Atos 2:46",
};

/* ── 04 · POR QUE PARTICIPAR ──────────────────────────────────────────── */
export const BENEFICIOS = {
  eyebrow: "Por que participar?",
  titulo: {
    antes: "Um lugar para ",
    forte: "pertencer e crescer",
    depois: ".",
  } as Titulo,
  /* Os quatro em ordem de PROXIMIDADE crescente com a pessoa: primeiro o que
     ela recebe (discipulado, amizade, cuidado), depois o que ela vira. O
     quarto é o único que fala de dar em vez de receber, e é por isso que ele
     fecha a lista — é a ponte para a seção de multiplicação, mais abaixo.

     ⚠️ SÃO QUATRO PORQUE A GRADE É 2 + 2. Um quinto item deixa a última linha
     com um órfão do lado de um buraco; se a igreja quiser um quinto, a grade
     do `page.tsx` precisa voltar a ser assimétrica junto. */
  itens: [
    {
      n: "01",
      rotulo: "Discipulado",
      titulo: "Cresça acompanhado.",
      texto:
        "Tenha pessoas por perto para ajudar você a avançar na sua caminhada com Deus.",
    },
    {
      n: "02",
      rotulo: "Relacionamentos",
      titulo: "Construa amizades.",
      texto:
        "Compartilhe a vida com pessoas que caminham na mesma fé.",
    },
    {
      n: "03",
      rotulo: "Cuidado",
      titulo: "Tenha com quem contar.",
      texto:
        "Encontre apoio, oração e cuidado nos diferentes momentos da vida.",
    },

    {
      n: "04",
      rotulo: "Propósito",
      titulo: "Descubra que Deus também quer usar você.",
      texto:
        "Desenvolva seus dons, aprenda a servir e comece a cuidar de outras pessoas.",
    },
  ],
};

/* ── 05 · COMO FUNCIONA ───────────────────────────────────────────────── */

/* O QUADRO DAS QUATRO FOTOS DA LINHA DO TEMPO, um só. Está em constante e não
   repetido quatro vezes justamente porque o valor de tê-lo é ele ser o MESMO:
   quem mudar a proporção muda as quatro juntas, que é a única forma de a fila
   continuar alinhada. 4:3 porque é a proporção nativa da maioria das fotos de
   turma do acervo — nela o `object-cover` quase não corta. */
const QUADRO = "aspect-[4/3]";
const ALTURA = "lg:h-full";
export const ENCONTRO = {
  eyebrow: "Como funciona",
  titulo: {
    antes: "Como é um ",
    forte: "encontro de célula?",
    depois: "",
  } as Titulo,
  intro: [
    { texto: "Os encontros acontecem " },
    { texto: "uma vez por semana", forte: true },
    { texto: " e duram aproximadamente " },
    { texto: "1h30", forte: true },
    {
      texto:
        ". Cada célula tem sua própria personalidade, mas normalmente vivemos quatro momentos.",
    },
  ] as Pedaco[],
  /* OS QUATRO MOMENTOS TÊM O MESMO QUADRO: mesma proporção (4:3), mesma
     altura, mesma base. Cada um tinha o seu — 4:3, quadrado, 3:4 — e cada um
     pousava numa altura diferente (100%, 74%, 88%) para a fila parecer montada
     à mão. Parecia desalinhada: quatro fotos de mesma natureza, em quatro
     tamanhos, lado a lado, leem como erro de recorte e não como composição.
     A régua horizontal e os pontos roxos já dão o ritmo da seção; as fotos não
     precisam dar também.

     A REGRA DE QUAL FOTO VAI EM QUAL MOMENTO É LITERAL: braços para o alto na
     chegada, o teclado no louvor, os balões e a mesa na comunhão. A da Palavra
     é a exceção — ver o comentário do momento 03.

     ⚠️ A DO LOUVOR É A ÚNICA QUE NÃO É UMA TURMA, e é de propósito. As outras
     três mostram gente reunida; esta é um close de duas mãos no teclado. Não
     foi falta de opção — foi a única cena de louvor no acervo inteiro, e ela
     acabou sendo a melhor escolha possível: o momento de louvor e oração é o
     que ninguém fotografa de frente, e uma selfie de turma sorrindo no lugar
     dele seria uma cena que não é a cena. O detalhe diz "aqui se canta" sem
     fingir um retrato que não existe.

     Ela também é a única na vertical do enquadramento original (3:2 contra os
     4:3 das outras) e entra no mesmo quadro por corte central — as mãos estão
     no meio do quadro, então o corte não come nada. */
  momentos: [
    {
      n: "01",
      titulo: "Quebra-gelo",
      texto:
        "Um momento leve para conversar, interagir e conectar as pessoas.",
      foto: {
        src: "/celulas/celula-hebrom.jpg",
        alvo: "public/celulas/celula-hebrom.jpg",
        alt: "Turma de uma célula na área externa de uma casa à noite, alguns com os braços levantados, todos rindo",
      } satisfies Foto,
      /* Cada foto tem proporção E altura diferentes, e todas pousam na MESMA
         linha de base — é isso que faz a fileira parecer montada à mão em vez
         de recortada em série. `altura` só vale do `lg` para cima, onde a
         faixa é horizontal; no celular a timeline é vertical e o que manda é a
         largura. Ver o comentário da faixa no `page.tsx`. */
      proporcao: QUADRO,
      altura: ALTURA,
    },
    {
      n: "02",
      titulo: "Louvor e oração",
      texto: "Um momento para agradecer a Deus e orar uns pelos outros.",
      foto: {
        src: "/celulas/celula-teclado.jpg",
        alvo: "public/celulas/celula-teclado.jpg",
        alt: "Close das duas mãos de alguém tocando um teclado branco durante o louvor de uma célula",
      } satisfies Foto,
      proporcao: QUADRO,
      altura: ALTURA,
    },
    {
      n: "03",
      titulo: "Palavra",
      texto:
        "Um compartilhar prático e participativo baseado nos ensinamentos da Bíblia.",
      /* A ÚNICA DAS QUATRO QUE NÃO ILUSTRA O MOMENTO AO PÉ DA LETRA. Aqui
         estava a `celula-vitor`, com a Bíblia junto ao peito — cena literal,
         mas a MESMA foto abre a seção de células na Home (ver `lib/home.ts`),
         e a repetição pesava mais do que a literalidade valia. A Kingdom é uma
         turma inteira de jovens em pé numa sala, que é o retrato do que essa
         célula é; o texto do lado já diz que a Palavra é "compartilhar
         prático e participativo", e uma turma reunida sustenta isso.

         Vertical no original (3024×4032) — entra no quadro 4:3 por um corte
         alto, não centralizado: o centro geométrico decapitaria a fileira de
         trás e cortaria o estandarte. */
      foto: {
        src: "/celulas/celula-kingdom.jpg",
        alvo: "public/celulas/celula-kingdom.jpg",
        alt: "Turma de jovens da célula Kingdom reunida numa sala, segurando um estandarte azul com uma coroa dourada",
      } satisfies Foto,
      proporcao: QUADRO,
      altura: ALTURA,
    },
    {
      n: "04",
      titulo: "Comunhão",
      texto:
        "Um tempo para conversar, tomar um café e fortalecer os relacionamentos.",
      foto: {
        src: "/celulas/celula-betel.jpg",
        alvo: "public/celulas/celula-betel.jpg",
        alt: "Célula reunida numa varanda decorada com balões vermelhos, adultos e crianças juntos",
      } satisfies Foto,
      proporcao: QUADRO,
      altura: ALTURA,
    },
  ],
};

/* ── 06 · PARA QUEM É ─────────────────────────────────────────────────── */
export const PARA_QUEM = {
  eyebrow: "Para quem é?",
  titulo: {
    antes: "Tem uma ",
    forte: "célula",
    depois: " para você.",
  } as Titulo,
  /* DOIS PARÁGRAFOS, UM EMBAIXO DO OUTRO na coluna da direita — não duas
     colunas lado a lado, que foi como esta seção nasceu. Cada um tem um
     trabalho: o primeiro derruba o pretexto ("não sei nada de igreja") e o
     segundo diz o que existe. Trocar a ordem troca o argumento.

     Lado a lado eles pareciam duas informações concorrentes e deixavam a
     coluna da esquerda com um parágrafo curto solto embaixo do nada.
     Empilhados na mesma coluna eles leem como uma resposta em dois tempos, e
     a esquerda fica só com o título. Um terceiro parágrafo aqui é seguro —
     entra na pilha, não cria coluna nova. */
  paragrafos: [
    [
      {
        texto:
          "Você não precisa ter experiência com igreja ou conhecimento bíblico para participar.",
      },
    ],
    [
      {
        texto:
          "Temos células para diferentes idades e fases da vida. Encontre um grupo onde você possa conhecer pessoas, crescer com Deus e viver a fé em comunidade.",
      },
    ],
  ] as Pedaco[][],
  /* AS CATEGORIAS SÃO UMA LISTA DE VERDADE e não uma string com pontos no
     meio. Como texto corrido ("Crianças · Jovens · Adultos…") o leitor de tela
     lia tudo numa respiração só e o separador virava parte do nome; e no
     celular a linha quebrava em qualquer lugar, deixando "Casais ·" pendurado.
     Cada uma é um item, e o ponto entre elas é desenho do `page.tsx`.

     ⚠️ NÃO VIRAR CARTÃO. Já foram um bloco de texto colado no fim de um
     parágrafo e agora são uma faixa própria — mas o passo seguinte, que seria
     dar a cada uma uma caixa com borda, transforma uma frase em formulário de
     seleção, e não há nada para selecionar. */
  categorias: ["Crianças", "Jovens", "Adultos", "Casais", "Famílias"],
};

/* ── 07 · A PAREDE DE CÉLULAS ─────────────────────────────────────────── */
export const GALERIA = {
  frase: "Extensões da igreja",
  /* ⚠️ ERAM SEIS FOTOS SOLTAS NUM MOSAICO E AGORA É A COLAGEM INTEIRA. As
     seis foram escolhidas na época pela variedade — três gerações, adultos,
     adolescentes, jovens, crianças, sala apertada — para que a parede não
     dissesse "célula é gente da mesma idade num sofá". A colagem faz isso
     sozinha e melhor: são as VINTE E QUATRO células no mesmo quadro, e a
     variedade deixa de ser uma curadoria de seis para ser o retrato do que a
     igreja tem.

     Nenhuma foto se perdeu no caminho: as seis estão dentro da colagem.

     ELA NÃO É UMA FOTO DE SEÇÃO, é uma PAREDE que fica atrás da página. Quem
     monta a janela é o `page.tsx` com a classe `.janela` do `globals.css`, e
     é lá que está escrito por que o pin é `sticky` e não `fixed`.

     A MESMA COLAGEM ERA A TEXTURA DA SEÇÃO 08, a 5,5% e desfocada, e saiu de
     lá: as duas seções são vizinhas, e a mesma imagem em cheio e logo em
     seguida apagada lê como erro de exportação, não como rima.

     `alt` VAZIO e `aria-hidden` porque para quem não a vê ela não existe: é
     uma textura de fundo, e descrevê-la seria despejar "vinte e seis fotos de
     grupos de pessoas" no meio da leitura. O que a seção DIZ está na frase, e
     a frase é texto de verdade. */
  /* ⚠️ O ARQUIVO EM `public/` NÃO É CÓPIA DO DE `material/`. As calhas da
     colagem — os vãos entre as fotos — eram creme com barras violeta e foram
     PINTADAS DE PRETO no arquivo publicado. Atrás dos véus escuros da seção,
     o creme virava uma grade clara atravessando a parede e roubava a frase;
     em preto as fotos passam a flutuar.

     Quem copiar `material/celulas/celulas-colagem.jpg` por cima do de
     `public/` DESFAZ isso e as barras violeta voltam.

     COMO FOI FEITO, porque não dá para repetir no olho. Pintar por cor não
     funciona — parede branca dentro de foto tem a mesma tinta do vão, e o
     preenchimento vazava para dentro das salas. A grade foi achada por
     PROJEÇÃO: as colunas em que quase toda a altura é fundo (deu as três
     calhas verticais) e, dentro de cada coluna, as linhas em que quase toda a
     largura é fundo (deu as 26 fotos). Com os 26 retângulos na mão, a colagem
     foi REMONTADA num fundo preto: cada foto teve 3px aparados na borda (a
     franja de JPEG entre a calha e a imagem), foi reescalada para a nova
     largura de coluna e recortada no centro.

     OS VÃOS SÃO 8px, e eram uns 27. A margem de topo e de base é 4px porque
     nasceu para ser somada consigo mesma na emenda de um looping de duas
     cópias — 4+4 dando os mesmos 8px dos vãos internos. Esse looping não
     existe mais e o motivo está no `app/globals.css`, em `.janela-parede`: a
     ÚLTIMA FILEIRA DE CADA COLUNA é uma fatia truncada pela borda do arquivo
     (96px na coluna 1, 158 na 2, 146 na 3, 169 na 4 — cabeças cortadas), e a
     primeira também. A emenda era perfeita em geometria e colava as duas
     faixas de sobras no meio da tela.

     ⚠️ REFAZER ESTA COLAGEM É O QUE DEVOLVE O LOOPING INFINITO. O que falta é
     cada coluna somar exatamente a altura do arquivo em FOTOS INTEIRAS mais
     as calhas — hoje elas fecham a conta com sobras nas duas pontas. Feito
     isso, duas cópias voltam a emendar sem mostrar foto cortada, e aí os 4px
     de margem passam a valer de novo. */
  parede: {
    src: "/celulas/celulas-colagem.jpg",
    alvo: "public/celulas/celulas-colagem.jpg",
    alt: "",
  } satisfies Foto,
};

/* ── 08 · CÉLULAS POR INDAIATUBA ──────────────────────────────────────── */
export const BAIRROS = {
  eyebrow: "Células em Indaiatuba",
  titulo: {
    antes: "De casa em casa. ",
    forte: "Por toda Indaiatuba",
    depois: ".",
  } as Titulo,
  copy: "Temos células espalhadas por diferentes regiões de Indaiatuba.",

  /* ⚠️ ESTA SEÇÃO NÃO TEM MAIS FUNDO. A colagem de todas as células ficava
     aqui atrás, a 5,5% e desfocada — era o "elemento abstrato ao fundo" que o
     briefing pedia, e era melhor que um mapa estilizado porque um mapa com
     pino promete endereço, que é o dado que este site não publica.

     Ela saiu quando a seção 07, que é a VIZINHA DE CIMA, virou uma janela
     para essa mesma colagem em tamanho real. A mesma imagem em cheio e, na
     rolagem seguinte, quase apagada não lê como rima: lê como a mesma coisa
     duas vezes, a segunda com defeito. O mural de bairros aguenta o `sand`
     puro — o que sustenta a seção é a tipografia, não a textura. */
};

/* ── 09 · MULTIPLICAÇÃO ───────────────────────────────────────────────── */
export const MULTIPLICACAO = {
  eyebrow: "Crescimento e Propósito",
  titulo: {
    antes: "Na célula, você cresce para também ",
    forte: "cuidar de pessoas",
    depois: ".",
  } as Titulo,
  paragrafos: [
    "Com o tempo, cada pessoa é encorajada a crescer na fé, descobrir seus dons, servir e ajudar outras pessoas em sua caminhada com Deus.",
  ],
  refraoIntro: "É assim que vivemos nossa visão:",
  refrao: [
    "Cada membro como um ministro.",
    "Cada casa como uma extensão da igreja.",
  ],
  link: "Conheça o Trilho do Vencedor",
  href: "/trilho-do-vencedor",
};

/* ── 10 · FECHO ───────────────────────────────────────────────────────── */
export const FECHO = {
  titulo: {
    antes: "Sua próxima história pode começar ",
    forte: "em uma célula",
    depois: ".",
  } as Titulo,
  /* ⚠️ DUAS FRASES, DOIS PARÁGRAFOS. O `page.tsx` percorre esta lista e emite
     um `<p>` por item — antes ele imprimia o array inteiro de uma vez e o
     React colava as duas strings sem espaço nenhum ("…receber você.Fale com a
     gente"). Quem acrescentar uma terceira frase ganha um terceiro parágrafo
     de graça; quem quiser DUAS FRASES NO MESMO parágrafo tem que juntá-las
     numa string só, com o espaço digitado. */
  texto: [
    "Tem uma célula pronta para receber você.",
    "Fale com a gente e vamos ajudar a encontrar um grupo de acordo com sua região e fase da vida.",
  ],
  acao: "Encontre uma célula",
  /* A ÚNICA FOTO DA PÁGINA COM TEXTO POR CIMA, e por isso é uma selfie de
     sala cheia: o véu escuro come contraste, e uma foto já apertada de gente
     encostada uma na outra continua legível como "muita gente junta" mesmo
     escurecida. Uma foto de plano aberto viraria mancha. */
  foto: {
    src: "/celulas/celula-danilo.jpg",
    alvo: "public/celulas/celula-danilo.jpg",
    alt: "Célula reunida na sala de uma casa, adultos e crianças espremidos para caber na mesma foto",
  } satisfies Foto,
};

/* ── O MURAL DE BAIRROS ───────────────────────────────────────────────────
   `lib/cells.ts` guarda os nomes na forma do cadastro ("Jd. Morada do Sol",
   "Pq. São Lourenço"), que é curta porque lá ela vive dentro de linha de
   tabela. No mural os nomes viram tipografia grande, e abreviação em corpo de
   manchete lê como erro de digitação — "JD. MORADA DO SOL" parece nome
   cortado, "JARDIM MORADA DO SOL" parece um bairro.

   A expansão mora AQUI e não no `lib/cells.ts` porque é decisão de exibição
   desta página: o cadastro continua sendo a fonte, e quem quiser a forma
   curta (a Home, um filtro) continua tendo. */
const EXPANSOES: [RegExp, string][] = [
  [/^Jd\. /, "Jardim "],
  [/^Pq\. /, "Parque "],
  [/ Res\. /, " Residencial "],
  [/^Cecap$/, "CECAP"],
];

export const nomeExtenso = (nome: string) =>
  EXPANSOES.reduce((n, [de, para]) => n.replace(de, para), nome);
