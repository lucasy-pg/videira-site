/**
 * Conteúdo da página /sobre.
 *
 * TODO texto aqui sai do briefing oficial entregue pela igreja ("Sobre a
 * Videira"). Onde ele foi encurtado, foi encurtado CORTANDO palavras da fonte —
 * nenhuma frase institucional foi escrita para o site, e nenhum nome, data ou
 * cargo foi tocado.
 *
 * DUAS FRASES DA FONTE FICARAM DE FORA, e as duas pelo mesmo motivo — são as
 * construções que já haviam sido podadas na copy do /trilho-do-vencedor, a
 * pedido:
 *
 *   "Para nós, célula não é apenas mais uma atividade da igreja."  → "não é X"
 *   "Mais do que frequentar uma igreja, ..."                       → "mais do que X"
 *
 * Na primeira, o que a frase preparava ("É onde a igreja acontece de perto.")
 * é justamente o destaque da seção e sobrevive sozinho. Na segunda, cortar a
 * oração inicial deixa "Acreditamos que Deus nos chamou para viver em família,
 * crescer juntos e cumprir um propósito", que é a afirmação inteira. Se alguém
 * for reintroduzir uma delas, é decisão de conteúdo, não de layout.
 *
 * UMA TERCEIRA SAIU DEPOIS, e essa saiu por composição e não por copy. A capa
 * apresentava a igreja em três frases; o redesenho da hero deixou espaço para
 * uma só, dentro do cartão que pousa sobre a fotografia. Ficou de fora:
 *
 *   "Cremos em uma igreja onde cada pessoa pode crescer, ser cuidada,
 *    descobrir seu chamado e fazer diferença na vida de outros."
 *
 * Ela não está dita em nenhum outro lugar da página com estas palavras — o
 * que a página diz na mesma direção são os seis VALORES e a frase do ENCARGO.
 * Se ela precisar voltar, o lugar natural é a abertura da seção de valores,
 * não a capa: na capa ela era o terceiro bloco de texto antes da fotografia,
 * que é exatamente o que o redesenho veio desfazer.
 *
 * FOTOGRAFIA. Todas as fotos são reais e da própria Videira. Cinco já estavam
 * em `public/` (as duas de arquivo, a arena de Goiânia, a fachada e o casal de
 * pastores); quatro entraram com esta página, convertidas de `material/sobre/`:
 * a comunidade no gramado, os dois registros de culto e a família dos pastores
 * (que era um PNG de 2MB e virou JPG).
 */

export type { Foto } from "./foto";
import type { Foto } from "./foto";

/**
 * Uma manchete com o trecho que vai em roxo.
 *
 * ⚠️ `antes + forte + depois` CONCATENADOS FORMAM A FRASE EXATA da fonte,
 * espaços inclusive — o corte é de pintura, não de texto. Quem mexer aqui está
 * mexendo na copy da igreja, não no layout.
 *
 * É UM TRECHO SÓ POR TÍTULO, e essa é a regra que segura a página: com o
 * eyebrow já em roxo, um segundo destaque no mesmo título faria de cada seção
 * três manchas de cor. Quem renderiza é a `<Chave>` do `app/sobre/page.tsx`,
 * que escolhe entre `grape` (fundo claro) e `grape-light` (fundo escuro).
 */
export type Manchete = { antes?: string; forte: string; depois?: string };

/* ─────────────────────────────────────────────────────────────────────────
   01 · HERO
   ───────────────────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "Sobre a Videira",
  /** A legenda do canto oposto ao eyebrow. É datação editorial, não conteúdo:
   *  diz de onde e de quando a igreja fala, no corpo de uma nota de rodapé. O
   *  ano é o da Videira Indaiatuba (2013), não o da Videira (1999) — a página
   *  conta os dois logo abaixo, e aqui quem assina é a igreja local. */
  legenda: "Desde 2013 · Indaiatuba, SP",
  /** O ponto final é do desenho, não da gramática: fecha a manchete como uma
   *  afirmação e não como uma chamada de anúncio. */
  titulo: {
    antes: "Uma igreja para viver o ",
    forte: "propósito de Deus",
    depois: ".",
  } satisfies Manchete,
  /** O cartão que pousa sobre a fotografia. Ele é a apresentação inteira da
   *  igreja em três linhas — nome, o que é, e para onde ir. Duas frases da
   *  versão anterior desta capa foram fundidas numa só aqui; a que sobrou de
   *  fora está anotada no cabeçalho deste arquivo. */
  cartao: {
    titulo: "Videira Indaiatuba",
    texto:
      "Somos uma igreja em células, fundamentada em Cristo, na Palavra de Deus e em relacionamentos que geram vida.",
    acao: "Conheça nossa história",
  },
  /** A protagonista da página. Foi pedido que ela dissesse, antes de qualquer
   *  texto: esta igreja é feita de pessoas. */
  foto: {
    src: "/igreja/comunidade-no-gramado.jpg",
    alvo: "public/igreja/comunidade-no-gramado.jpg",
    alt: "A comunidade da Videira Indaiatuba reunida no gramado, em frente a uma fileira de árvores, com dezenas de pessoas juntas e muitos braços erguidos",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   02 · NOSSA HISTÓRIA
   ───────────────────────────────────────────────────────────────────────── */

export const HISTORIA = {
  eyebrow: "Nossa história",
  /* Sem campo de ano aqui, ao contrário do bloco de Indaiatuba: "1999" já está
     dentro do título, e um numeral grande repetindo ao lado seria a mesma data
     duas vezes na mesma tela. O "2013" do bloco seguinte existe porque lá o
     título NÃO traz o ano. */
  titulo: {
    antes: "Uma visão que começou em ",
    forte: "1999",
  } satisfies Manchete,
  paragrafos: [
    "A Igreja Videira nasceu em Goiânia, em 1999, fundada pelo Pr. Aluízio A. Silva e pelo Pr. Marcelo Almeida, com a visão de edificar uma igreja fundamentada em Cristo, na Palavra de Deus e na comunhão de casa em casa.",
    "Desde o início, as células se tornaram parte essencial dessa visão, aproximando pessoas, formando líderes e levando o cuidado da igreja para dentro dos lares.",
  ],
  fotoPrincipal: {
    src: "/igreja/aluizio-silva-inicio.jpg",
    alvo: "public/igreja/aluizio-silva-inicio.jpg",
    alt: "Registro dos primeiros anos: o pastor Aluízio Silva diante do letreiro original da Videira, Igreja em Células",
  } satisfies Foto,
  fotoSobreposta: {
    src: "/igreja/primeiros-anos.jpg",
    alvo: "public/igreja/primeiros-anos.jpg",
    alt: "Reunião nos primeiros anos da Videira: cerca de vinte pessoas sentadas em cadeiras numa sala simples, ouvindo a pregação",
  } satisfies Foto,
  /** A terceira foto da colagem é o argumento sem precisar de frase: a sala
   *  com vinte pessoas da foto do meio e este auditório lotado são a mesma
   *  igreja. É a única foto da página com legenda, e é por isso — sem o
   *  carimbo ela vira "um culto qualquer" no meio de duas fotos de arquivo. */
  fotoArena: {
    src: "/igreja/arena-hoje.jpg",
    alvo: "public/igreja/arena-hoje.jpg",
    alt: "Auditório lotado num culto da Videira, com a plateia de mãos levantadas diante do palco iluminado",
  } satisfies Foto,
  legendaArena: "Arena Videira",
};

/* ─────────────────────────────────────────────────────────────────────────
   03 · A CHEGADA A INDAIATUBA
   ───────────────────────────────────────────────────────────────────────── */

export const INDAIATUBA = {
  ano: "2013",
  titulo: {
    antes: "Essa história chegou a ",
    forte: "Indaiatuba",
  } satisfies Manchete,
  paragrafos: [
    "Em 2013, nasceu a Videira Indaiatuba, como fruto dessa mesma visão.",
    "Começamos reunindo famílias, construindo relacionamentos e vivendo a igreja de casa em casa.",
  ],
  /** A frase quebra em duas partes porque a segunda metade é o propósito, e
   *  ela vem em negrito na fonte. */
  propositoAntes: "Hoje, seguimos avançando com o mesmo propósito:",
  proposito:
    "amar pessoas, formar discípulos e conquistar nossa geração para Cristo.",
  foto: {
    src: "/igreja/fachada.jpg",
    alvo: "public/igreja/fachada.jpg",
    alt: "Fachada da Videira Indaiatuba à noite, com o letreiro iluminado",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   04 · NOSSA VISÃO
   ───────────────────────────────────────────────────────────────────────── */

/**
 * A frase oficial do encargo, partida em pedaços para o destaque tipográfico.
 *
 * ⚠️ NÃO REESCREVER ESTES TRECHOS. Concatenados na ordem, eles formam a frase
 * da fonte:
 *
 *   "Nosso encargo é edificar uma igreja de vencedores, onde cada membro é um
 *    ministro e cada casa uma extensão da igreja. Conquistando assim nossa
 *    geração para Cristo."
 *
 * DUAS DIFERENÇAS EM RELAÇÃO AO ARQUIVO ORIGINAL DA IGREJA, e as duas vieram
 * do Lucas, na composição que ele desenhou para esta seção: onde a fonte tinha
 * vírgula ("…extensão da igreja, conquistando…") agora há ponto, partindo a
 * frase em duas; e "Cristo" fecha em caixa alta. A caixa alta é só desenho —
 * a string aqui continua "Cristo" e quem sobe as letras é o CSS, para que o
 * texto copiado da página e o que o leitor de tela anuncia continuem
 * capitalizados como nome próprio.
 *
 * O DESTAQUE É UM SÓ, E É O DO MEIO. `forte` marca o trecho "cada membro é um
 * ministro e cada casa uma extensão da igreja" — que na tela vira roxo e
 * itálico de uma vez. Houve uma versão com QUATRO trechos destacados (os três
 * membros da frase mais "uma igreja de vencedores"), separados só pelo
 * itálico; ela saiu porque destacar quatro pedaços de uma frase de nove
 * palavras úteis é não destacar nenhum. O miolo ganhou a vez porque é ele que
 * diz o que a igreja faz — as pontas dizem quem ela é e para quem.
 */
export const ENCARGO: { texto: string; forte?: true; caixaAlta?: true }[] = [
  { texto: "Nosso encargo é edificar uma igreja de vencedores, onde " },
  {
    texto: "cada membro é um ministro e cada casa uma extensão da igreja",
    forte: true,
  },
  { texto: ". Conquistando assim nossa geração para " },
  { texto: "Cristo", caixaAlta: true },
  { texto: "." },
];

export const VISAO = {
  eyebrow: "Nossa visão",
  /* SEM `titulo` AQUI, e não é esquecimento. O subtítulo da fonte para esta
     seção é "Uma igreja de vencedores" — que são, palavra por palavra, as
     primeiras do `ENCARGO` logo acima. Como a frase inteira é a manchete da
     seção, um título com esse texto apareceria duas vezes com duas linhas de
     distância. */
  /* SEM `principios` TAMBÉM. Os três ("cada membro, um ministro" / "cada casa,
     uma extensão da igreja" / "uma geração para Cristo") são as três partes da
     frase do ENCARGO, e ficavam em três colunas logo abaixo dela repetindo em
     prosa o que a citação já diz. A seção agora é só a frase. O texto dos três
     continua no briefing, se um dia voltar a fazer falta em outro lugar. */
};

/* ─────────────────────────────────────────────────────────────────────────
   05 · IGREJA EM CÉLULAS
   ───────────────────────────────────────────────────────────────────────── */

export const CELULAS = {
  eyebrow: "Igreja em Células",
  /* O destaque cai em "além das celebrações" e não em "celebrações"
     sozinha: a seção existe para dizer que a igreja não para no culto, e
     pintar só a última palavra realçaria justamente o contrário. */
  titulo: {
    antes: "Igreja ",
    forte: "além das celebrações",
  } satisfies Manchete,
  destaque: "É onde a igreja acontece de perto.",
  paragrafos: [
    "Nos reunimos nas celebrações e também de casa em casa, construindo relacionamentos, crescendo na Palavra e cuidando uns dos outros.",
    "Nas células, ninguém precisa caminhar sozinho.",
  ],
  /** As duas fotos SÃO a frase "nos reunimos nas celebrações e também de casa
   *  em casa": uma célula numa casa e uma família num culto. Por isso são duas
   *  e não uma, e por isso a da célula é a maior — a seção é sobre ela. */
  fotoCelula: {
    src: "/celulas/celula-sao-lourenco.jpg",
    alvo: "public/celulas/celula-sao-lourenco.jpg",
    alt: "Célula reunida na varanda de uma casa: adultos, jovens e crianças posando juntos no fim do encontro",
  } satisfies Foto,
  fotoCelebracao: {
    src: "/igreja/familia-no-culto.jpg",
    alvo: "public/igreja/familia-no-culto.jpg",
    alt: "Pai com as duas filhas no colo durante um culto, uma delas com a cabeça apoiada no ombro dele",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   06 · NOSSOS VALORES
   ───────────────────────────────────────────────────────────────────────── */

export const VALORES = {
  eyebrow: "Nossos valores",
  titulo: {
    antes: "Aquilo que fundamenta ",
    forte: "quem somos",
  } satisfies Manchete,
  itens: [
    {
      n: "01",
      nome: "Evangelho da Graça",
      texto: "Vivemos na suficiência da obra de Cristo e no amor do Pai.",
    },
    {
      n: "02",
      nome: "Comunhão",
      texto:
        "Cremos em uma igreja viva, construída através de relacionamentos e também de casa em casa.",
    },
    {
      n: "03",
      nome: "Sacerdócio de Todos os Crentes",
      texto: "Cada membro é chamado, capacitado e enviado para servir.",
    },
    {
      n: "04",
      nome: "Vida no Espírito Santo",
      texto:
        "Dependemos da presença, direção e atuação do Espírito Santo.",
    },
    {
      n: "05",
      nome: "Relacionamentos de Aliança",
      texto:
        "Caminhamos juntos em amor, cuidado, transparência e compromisso.",
    },
    {
      n: "06",
      nome: "Multiplicação e Discipulado",
      texto:
        "Formamos discípulos e líderes para que o Reino de Deus continue avançando.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   07 · NO QUE CREMOS
   ───────────────────────────────────────────────────────────────────────── */

export const CREMOS = {
  eyebrow: "No que cremos",
  titulo: {
    antes: "Nossa fé está firmada na ",
    forte: "Palavra",
  } satisfies Manchete,
  /** Os oito fundamentos, no resumo da própria fonte — não há versão longa
   *  guardada em lugar nenhum porque a fonte não tem uma. */
  itens: [
    {
      titulo: "A Bíblia",
      texto:
        "Cremos nas Escrituras como Palavra de Deus e fundamento para nossa fé e vida.",
    },
    {
      titulo: "Deus",
      texto: "Cremos em um só Deus: Pai, Filho e Espírito Santo.",
    },
    {
      titulo: "Jesus Cristo",
      texto:
        "Cremos em Jesus Cristo, em sua morte e ressurreição e em seu retorno.",
    },
    {
      titulo: "Salvação pela Graça",
      texto:
        "Cremos que somos salvos pela graça de Deus, mediante a fé em Jesus Cristo.",
    },
    {
      titulo: "Espírito Santo",
      texto:
        "Cremos na presença e atuação do Espírito Santo na vida de todo cristão e de sua Igreja.",
    },
    {
      titulo: "A Igreja",
      texto:
        "Cremos na Igreja como Corpo de Cristo, chamada para viver em comunhão, fazer discípulos e anunciar o Evangelho.",
    },
    {
      titulo: "Batismo e Ceia",
      texto:
        "Praticamos o batismo nas águas e a Ceia do Senhor conforme ensinados por Jesus.",
    },
    {
      titulo: "Vida Eterna",
      texto: "Cremos na ressurreição e na vida eterna com Deus.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   08 · NOSSA LIDERANÇA
   ───────────────────────────────────────────────────────────────────────── */

export const LIDERANCA = {
  eyebrow: "Nossa liderança",
  titulo: {
    antes: "Pastoreando pessoas. ",
    forte: "Formando discípulos.",
  } satisfies Manchete,
  intro:
    "A Videira Indaiatuba é liderada pelo Pr. Thiago Duarte e pela Pra. Aline Duarte.",
  texto:
    "Juntos, servem à igreja com o propósito de formar discípulos, levantar líderes e conduzir pessoas a uma vida cada vez mais profunda em Cristo.",
  pastores: [
    { nome: "Pr. Thiago Duarte", cargo: "Pastor Local" },
    { nome: "Pra. Aline Duarte", cargo: "Pastora Local" },
  ],
  fotoCasal: {
    src: "/lideres/pastores-casal.jpg",
    alvo: "public/lideres/pastores-casal.jpg",
    alt: "Retrato do Pr. Thiago Duarte e da Pra. Aline Duarte, os dois de branco",
  } satisfies Foto,
  fotoFamilia: {
    src: "/lideres/pastores-familia.jpg",
    alvo: "public/lideres/pastores-familia.jpg",
    alt: "A família Duarte reunida: o casal sentado com os dois filhos atrás",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   09 · FECHO
   ───────────────────────────────────────────────────────────────────────── */

export const FECHO = {
  titulo: {
    antes: "Há um lugar para ",
    forte: "você",
    depois: " aqui.",
  } satisfies Manchete,
  texto:
    "Acreditamos que Deus nos chamou para viver em família, crescer juntos e cumprir um propósito.",
  destaque: "Venha fazer parte dessa história.",
  /* A PÁGINA FECHA COM DUAS PESSOAS E UMA ORAÇÃO. Era um pai com o filho no
     colo — bonita, mas dizia "família", que é o que o texto já diz duas vezes
     na mesma faixa. Esta diz outra coisa: alguém de cabeça baixa e alguém com
     a mão na cabeça dele. É gente sendo cuidada por gente, que é a promessa
     do "há um lugar para você aqui" no exato momento em que ela é cobrada.

     ⚠️ ELA MORA EM `public/radicais/` E ISSO É DE PROPÓSITO. A foto é do
     acervo dos Radicais Livres e já aparece na parede da galeria e na seção
     "Nossos encontros" de lá; apontar para o mesmo arquivo — em vez de gravar
     uma cópia em `public/igreja/` — é o que evita o visitante baixar a mesma
     imagem duas vezes. É a única foto de `public/radicais/` que entra pelo
     `next/image`; ela tem a variante `-800` ao lado, do regime da galeria, e
     esta página simplesmente não a usa (ver `docs/imagens.md`).

     ⚠️ O MESTRE TEM 1067px DE LARGURA, que é o original inteiro que existe no
     acervo — veio do WhatsApp e não há arquivo maior. Numa coluna de 50vw ela
     dá conta em tela comum e fica no limite em tela retina. Se um dia aparecer
     o original da câmera, é trocar o arquivo. */
  foto: {
    src: "/radicais/oracao-a-dois.jpg",
    alvo: "public/radicais/oracao-a-dois.jpg",
    /* Palavra por palavra o `alt` do `lib/galeria.ts`, onde a foto já existe:
       duas descrições diferentes da mesma imagem no mesmo site é ruído para
       quem navega por leitor de tela. */
    alt: "Dois rapazes abraçados junto à janela, um com a mão no ombro do outro, os dois de cabeça baixa",
  } satisfies Foto,
};
