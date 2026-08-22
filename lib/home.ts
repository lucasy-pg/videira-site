/**
 * Conteúdo da Home.
 *
 * TODO texto aqui sai do briefing da Home entregue pela igreja. Nenhuma frase
 * foi escrita para o site: onde o briefing dá a frase, ela está aqui inteira;
 * onde ele só descreve o que a frase deve dizer ("texto curto convidando a
 * pessoa a conhecer a Videira presencialmente", na seção de Cultos), o texto
 * veio da copy anterior da própria igreja ("Copy da Home — Videira
 * Indaiatuba"), cortada, e não de invenção minha.
 *
 * DUAS CONSTRUÇÕES DA COPY ANTIGA NÃO ENTRARAM, pelas mesmas razões já
 * registradas em `lib/sobre.ts` e `lib/trilho.ts`: "não é X, é Y" e "mais do
 * que X". Nenhuma delas sobrevive no briefing novo, então não houve o que
 * podar — fica o registro para quem for reintroduzir copy antiga aqui.
 *
 * A SEÇÃO DOS MINISTÉRIOS ("Para cada geração") NÃO ESTÁ NO BRIEFING NOVO — o
 * ritmo dele vai de Células direto ao Trilho —, e por isso ela chegou a sair
 * daqui. Voltou a pedido: sem ela a Home não tinha uma única porta para o
 * /radicais-kids e o /radicais-livres fora do menu e do rodapé, e os dois são
 * páginas inteiras do site. O lugar dela é o mesmo de sempre, entre Células e
 * Trilho: é onde a página termina de dizer ONDE você se encaixa, antes de
 * passar a dizer COMO você cresce.
 *
 * O texto dela sai da copy anterior da igreja ("Copy da Home", seção 05), e é
 * a copy DELES que está aqui — não a que o site tinha na versão anterior desta
 * seção, que era escrita para o site ("vivendo a fé sem medo e sem religião",
 * "Discípulos desde a infância") e não sobreviveria à mesma régua que podou o
 * resto desta página.
 *
 * ⚠️ NENHUMA FOTO DE BANCO. As duas imagens do Unsplash que a Home carregava
 * ao vivo (o card do Radicais Kids e uma de culto) morreram com este
 * redesenho — as nove fotografias abaixo são todas reais e da própria Videira.
 * A do Kids é a que mais custou a existir: era criança genérica de banco de
 * imagem representando o ministério infantil da Videira. Ver
 * `docs/imagens.md`.
 */

export type { Foto } from "./foto";
import type { Foto } from "./foto";
import { ENCARGO } from "./sobre";

/**
 * Uma manchete com o trecho que vai em roxo.
 *
 * ⚠️ `antes + forte + depois` CONCATENADOS FORMAM A FRASE EXATA do briefing,
 * espaços inclusive — o corte é de pintura, não de texto. Quem mexer aqui está
 * mexendo na copy da igreja, não no layout.
 *
 * É UM TRECHO SÓ POR MANCHETE, a mesma regra do /sobre e do
 * /trilho-do-vencedor: com o eyebrow já em roxo, um segundo destaque no mesmo
 * título faria de cada seção três manchas de cor, e duas manchas na mesma
 * frase fazem o olho parar na tinta em vez de na palavra. Quem renderiza é a
 * `<Chave>` do `app/page.tsx`, que escolhe entre `grape` (fundo claro) e
 * `grape-light` (fundo escuro).
 */
export type Manchete = { antes?: string; forte: string; depois?: string };

/* ─────────────────────────────────────────────────────────────────────────
   01 · HERO
   ───────────────────────────────────────────────────────────────────────── */

export const HERO = {
  /** A filmagem real de um culto, muda e em loop. 58s, 1920×1080, ~17MB
   *  (H.264, CRF 26, reencodada dos 148MB originais). O poster de 75KB pinta a
   *  primeira tela enquanto o vídeo carrega — sem ele a capa abre preta. */
  video: {
    src: "/videos/horizontal/capa-inicio.mp4",
    poster: "/videos/horizontal/capa-inicio-poster.jpg",
  },
  titulo: {
    antes: "Há um lugar para ",
    forte: "você",
    depois: " aqui.",
  } satisfies Manchete,
  texto:
    "Uma igreja para viver Cristo, construir relacionamentos e cumprir o propósito de Deus.",
  acao: { rotulo: "Conheça a Videira", href: "/sobre" },
};

/* ─────────────────────────────────────────────────────────────────────────
   02 · QUEM SOMOS
   ───────────────────────────────────────────────────────────────────────── */

export const QUEM_SOMOS = {
  eyebrow: "Quem somos",
  titulo: {
    antes: "Uma igreja de ",
    forte: "vencedores",
    depois: ".",
  } satisfies Manchete,
  texto:
    "Cremos em uma igreja onde cada membro é um ministro e cada casa uma extensão da igreja. Vivemos para conhecer a Cristo, cuidar de pessoas e alcançar nossa geração.",
  /** O briefing pede este mesmo rótulo no hero e aqui, e os dois caem no
   *  /sobre. Foi mantido como está: é a copy da igreja, e o mapa de destinos
   *  do próprio briefing diz "Sobre → Conheça a Videira" uma vez só. */
  acao: { rotulo: "Conheça a Videira", href: "/sobre" },
  /** A "pequena fotografia integrada à composição" que o briefing permite.
   *  É pequena de propósito: esta seção é o respiro da página, e uma foto
   *  grande aqui a transformaria no bloco tradicional de imagem + texto que o
   *  briefing manda evitar. */
  foto: {
    src: "/igreja/boas-vindas.jpg",
    alvo: "public/igreja/boas-vindas.jpg",
    alt: "Dois voluntários da Videira recebendo visitantes com placas escritas 'Seja bem-vindo' e 'É um privilégio termos você conosco hoje'",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   03 · CULTOS
   ───────────────────────────────────────────────────────────────────────── */

export const CULTOS = {
  eyebrow: "Nossos cultos",
  titulo: {
    antes: "",
    forte: "Domingo",
    depois: " é dia de estarmos juntos.",
  } satisfies Manchete,
  /** As duas frases vêm da copy anterior da igreja, cortadas. O briefing novo
   *  pede aqui "texto curto convidando a pessoa a conhecer a Videira
   *  presencialmente" sem escrever a frase — e o lugar de onde tirar uma frase
   *  que a igreja já disse é a copy dela, não um parágrafo novo. */
  texto:
    "Um tempo para adorar a Deus, ouvir Sua Palavra e celebrar como igreja. Se você ainda não conhece a Videira, será uma alegria receber você e sua família.",
  horarios: { dia: "Domingo", faixas: ["09h — 11h", "18h — 20h"] },
  acao: { rotulo: "Planeje sua visita", href: "/contato" },
  foto: {
    src: "/igreja/culto-todos-juntos.jpg",
    alvo: "public/igreja/culto-todos-juntos.jpg",
    alt: "Congregação da Videira de pé num culto de domingo, cantando de mãos erguidas",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   04 · CÉLULAS
   ───────────────────────────────────────────────────────────────────────── */

export const CELULAS = {
  eyebrow: "Células",
  /** O trecho pintado é "casa em casa" e NÃO "de casa em casa": com o "de"
   *  junto, o roxo começava no meio de uma linha e engolia a linha seguinte
   *  inteira — duas linhas e meia de cor numa manchete de três. Deixando o
   *  "de" em preto, o destaque cai exatamente sobre a última linha, que é o
   *  mesmo peso de cor que "Domingo" tem na seção dos cultos. */
  titulo: {
    antes: "Igreja também acontece de ",
    forte: "casa em casa",
    depois: ".",
  } satisfies Manchete,
  texto:
    "As células são lugares de comunhão, cuidado e crescimento. Durante a semana, nos reunimos para compartilhar a vida, crescer em Deus e construir relacionamentos que vão além dos domingos.",
  acao: { rotulo: "Encontre uma célula", href: "/celulas" },
  /** As duas fotos desta seção respondem ao que o briefing pede dela —
   *  "protagonismo aos rostos e às relações entre as pessoas". A primeira é a
   *  célula inteira numa sala de casa; a segunda é um abraço, e é ela que diz
   *  "cuidado" sem precisar de um card explicando o benefício. */
  foto: {
    src: "/celulas/celula-vitor.jpg",
    alvo: "public/celulas/celula-vitor.jpg",
    alt: "Célula reunida na sala de uma casa, adultos e crianças posando juntos para a foto",
  } satisfies Foto,
  fotoAbraco: {
    src: "/igreja/abraco.jpg",
    alvo: "public/igreja/abraco.jpg",
    alt: "Abraço apertado entre dois membros da Videira",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   05 · PARA CADA GERAÇÃO (Radicais Livres e Radicais Kids)
   ───────────────────────────────────────────────────────────────────────── */

export const MINISTERIOS = {
  /** O eyebrow é o NOME que a própria copy da igreja dá à seção ("05. Para
   *  cada geração"), e não o antetítulo que ela traz por cima do título
   *  ("UMA IGREJA PARA TODA A FAMÍLIA"): esse tem 28 caracteres e, em caixa
   *  alta com `tracking-[0.28em]`, viraria uma régua de quase 400px ao lado de
   *  eyebrows de uma a três palavras. */
  eyebrow: "Para cada geração",
  titulo: {
    antes: "Uma geração vivendo ",
    forte: "intensamente",
    depois: " para Deus.",
  } satisfies Manchete,
  texto:
    "Queremos ver crianças, adolescentes, jovens e famílias conhecendo a Cristo e crescendo em uma vida apaixonada por Deus.",
  /**
   * A ORDEM É LIVRES PRIMEIRO, KIDS DEPOIS, e é escolha do Lucas. Ela já foi
   * a da copy da igreja (Kids primeiro, na mesma ordem do parágrafo acima:
   * "crianças, adolescentes, jovens e famílias") e foi invertida a pedido — o
   * `/radicais-livres` é a página mais trabalhada do site e a que a Home tem
   * mais interesse em abrir primeiro. Quem for reordenar de novo mexe SÓ neste
   * array: o `variant` do `<Reveal>` no `app/page.tsx` sai do índice, então os
   * dois cartões continuam entrando um de cada lado sozinhos.
   *
   * O RÓTULO DE CADA CTA NOMEIA O DESTINO em vez de dizer "Saiba mais" duas
   * vezes. É a copy da igreja, e é também a versão que funciona no leitor de
   * tela: dois links com o mesmo nome acessível numa página só obrigam quem
   * navega ouvindo a sair do link para descobrir para onde ele vai.
   *
   * ⚠️ SEM TARJA DE FAIXA ETÁRIA. A versão anterior punha "0 — 14 ANOS" e
   * "12 — 29 ANOS" numa pílula em caixa alta sobre cada foto. Saiu por
   * decisão da casa (nada de badge de texto em caixa alta sobre card e sobre
   * fotografia), e a idade também não é o argumento: as duas páginas dizem
   * para quem são logo na primeira tela.
   */
  cards: [
    {
      nome: "Radicais Livres",
      texto:
        "Uma geração de jovens apaixonados por Jesus, vivendo relacionamentos verdadeiros e sendo desafiados a fazer diferença onde estiverem.",
      acao: { rotulo: "Conheça o Radicais Livres", href: "/radicais-livres" },
      /**
       * ⚠️ ESTE ARQUIVO SERVE A DOIS REGIMES DE IMAGEM. Ele é uma das fotos do
       * mural do /radicais-livres, onde entra em `<img>` crua com o `srcset`
       * montado à mão pelo `lib/galeria.ts` (e por isso tem um `-800` ao
       * lado); aqui ele entra pela `<MolduraFoto>`, ou seja, por `next/image`,
       * que gera as larguras a partir do mestre e ignora o `-800`.
       *
       * Não há conflito — o `-800` continua sendo pedido pelo mural —, mas
       * quem for TROCAR esta foto precisa saber que mexer no arquivo mexe nas
       * duas páginas, e que as dimensões declaradas no `lib/galeria.ts`
       * (1600×1066) têm de continuar batendo com o arquivo. É a segunda
       * exceção desse tipo em `public/radicais/`; a primeira é a
       * `oracao-a-dois.jpg`, no fecho do /sobre. Ver `docs/imagens.md`.
       *
       * ⚠️ E O TAMANHO DO MESTRE É O QUE DECIDIU A ESCOLHA, não o gosto. A
       * primeira candidata foi a `turma-luz-roxa.jpg`, que é a foto mais bonita
       * do acervo para este lugar — turma inteira, de frente, sob a luz roxa da
       * própria marca. Ela tem 1120px de largura, e o card pede ~590px em CSS,
       * ou seja 1180px numa tela retina: ficaria macia por 60 pixels. Esta tem
       * 1600px e cobre o vão com folga. O acervo dos Radicais veio do WhatsApp
       * e não tem original de câmera, então não há de onde tirar um mestre
       * maior — a escolha era essa ou uma foto levemente borrada.
       */
      foto: {
        src: "/radicais/quadra-poses.jpg",
        alvo: "public/radicais/quadra-poses.jpg",
        alt: "Turma de jovens dos Radicais Livres reunida em poses descontraídas em quadra poliesportiva",
      } satisfies Foto,
    },
    {
      nome: "Radicais Kids",
      texto:
        "Um ambiente preparado para que as crianças conheçam Jesus, construam princípios e descubram desde cedo a alegria de viver para Deus.",
      acao: { rotulo: "Conheça o Radicais Kids", href: "/radicais-kids" },
      /**
       * ⚠️ TERCEIRA EXCEÇÃO DE REGIME EM `public/radicais/` — vale aqui tudo
       * o que está escrito no cartão acima: o arquivo é do mural do
       * /radicais-livres (por isso tem `-800` ao lado) e aqui entra por
       * `next/image`. As dimensões no `lib/galeria.ts` (1600×1600) têm de
       * continuar batendo com o arquivo.
       *
       * A FOTO É ESCOLHA DO LUCAS e ela troca o registro da seção de propósito.
       * O que estava aqui era a `kids/hero-criancas.jpg`, a fotografia que abre
       * o /radicais-kids: fileira de crianças em pé, em oração, num culto —
       * institucional, e a rima com a página de destino era o argumento dela.
       * Esta é o oposto: uma criança da igreja com a camiseta do REVIVA,
       * atacando um hambúrguer numa cadeirinha de lanchonete. Não mostra o
       * ministério funcionando; mostra o que ele é para quem tem essa idade.
       *
       * O MESTRE É QUADRADO (1600×1600) e o cartão é quase quadrado também
       * (~590×512 no desktop), então o `object-cover` corta pouquíssimo: entra
       * praticamente a foto inteira. O rosto e o hambúrguer ficam na metade de
       * cima, longe do texto, que pousa sobre as embalagens na mesa. É o tipo
       * de sorte que não se repete — trocar por um arquivo em retrato ou em
       * paisagem pede conferir o recorte de novo.
       */
      foto: {
        src: "/radicais/bebe-com-hamburguer.jpg",
        alvo: "public/radicais/bebe-com-hamburguer.jpg",
        alt: "Criança pequena da Videira, de camiseta do REVIVA, mordendo um hambúrguer com as duas mãos numa cadeirinha de lanchonete",
      } satisfies Foto,
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   06 · TRILHO DO VENCEDOR
   ───────────────────────────────────────────────────────────────────────── */

export const TRILHO = {
  eyebrow: "Trilho do Vencedor",
  titulo: {
    antes: "Todo ",
    forte: "vencedor",
    depois: " tem um caminho.",
  } satisfies Manchete,
  texto:
    "Do primeiro encontro com Cristo à formação de novos líderes, existe um caminho para crescer, amadurecer e viver plenamente o propósito de Deus.",
  acao: { rotulo: "Conheça o Trilho", href: "/trilho-do-vencedor" },
  /**
   * ⚠️ É A ARTE OFICIAL DO TRILHO, E É ELA QUE CARREGA O "CRESCER. LIDERAR.
   * MULTIPLICAR." QUE O BRIEFING PEDE COMO DESTAQUE VISUAL.
   *
   * A alternativa era compor as três palavras em tipografia minha AO LADO
   * de uma foto. Não foi feito porque a arte já traz as três palavras no
   * próprio letreiro: as duas coisas juntas seriam a mesma frase dita duas
   * vezes, em dois desenhos diferentes, na mesma tela.
   *
   * É também o que o briefing chama de "conectar visualmente com a página do
   * Trilho do Vencedor" no sentido mais literal possível: este arquivo é o
   * herói de `/trilho-do-vencedor` (ver `lib/trilho.ts`). Quem clica no CTA
   * cai numa página que abre com a imagem que acabou de ver.
   *
   * Por isso o `alt` nomeia as três palavras — para quem não vê a arte, é
   * dele que o destaque visual chega.
   */
  arte: {
    src: "/trilho-vencedor/capa-home.jpg",
    alvo: "public/trilho-vencedor/capa-home.jpg",
    alt: "Arte do Trilho do Vencedor: uma mão erguendo um troféu sobre as palavras Crescer, Liderar, Multiplicar",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   07 · NOSSA VISÃO
   ───────────────────────────────────────────────────────────────────────── */

export const VISAO = {
  eyebrow: "Nossa visão",
  /**
   * A FRASE É A DO /sobre, E VEM DE LÁ POR IMPORTAÇÃO — não há uma segunda
   * cópia dela neste arquivo de propósito. É a frase oficial da igreja, com o
   * mesmo ⚠️ de não reescrever que está em `lib/sobre.ts`; duas cópias do
   * mesmo encargo em dois arquivos de conteúdo é uma delas envelhecendo
   * sozinha na primeira vez que alguém ajustar uma vírgula.
   *
   * AQUI ANTES ESTAVAM QUATRO PALAVRAS — "Ganhar. Consolidar. Treinar.
   * Enviar." — numa escada tipográfica, apresentadas como a visão da casa.
   * Elas saíram porque não são a visão da Videira: esse quarteto é vocabulário
   * do modelo G12 (Castellanos), que a Videira não segue, e metade do material
   * sobre células na internet mistura as duas coisas. A visão da Videira é o
   * encargo, e é ele que a Home passa a dizer.
   *
   * SEM `complemento` AGORA. A frase que ficava embaixo ("Fazemos discípulos
   * para alcançar nossa geração e cumprir o propósito de Deus.") dizia em
   * prosa o mesmo que o fim do encargo já diz — "conquistando assim nossa
   * geração para Cristo" —, e esta é a seção de respiro da página. Vale a
   * mesma decisão do /sobre: depois da frase não vem mais nada.
   */
  encargo: ENCARGO,
};

/* ─────────────────────────────────────────────────────────────────────────
   08 · NOS ACOMPANHE
   ───────────────────────────────────────────────────────────────────────── */

export const YOUTUBE = {
  titulo: { antes: "Nos ", forte: "acompanhe", depois: "." } satisfies Manchete,
  texto:
    "Cultos, mensagens e conteúdos para continuar conectado com tudo o que Deus está fazendo na Videira Indaiatuba.",
  acao: "Acompanhe no YouTube",
  foto: {
    src: "/igreja/adoracao-jovens.jpg",
    alvo: "public/igreja/adoracao-jovens.jpg",
    alt: "Jovem da Videira em adoração num culto, uma das mãos erguida e a outra sobre o peito",
  } satisfies Foto,
};

/* ─────────────────────────────────────────────────────────────────────────
   09 · CTA FINAL
   ───────────────────────────────────────────────────────────────────────── */

export const FECHO = {
  titulo: {
    antes: "Há um ",
    forte: "próximo passo",
    depois: " para você.",
  } satisfies Manchete,
  texto:
    "Seja chegando pela primeira vez, entrando em uma célula ou começando sua jornada de crescimento, queremos caminhar com você.",
  acoes: [
    { rotulo: "Encontre uma célula", href: "/celulas" },
    { rotulo: "Conheça o Trilho", href: "/trilho-do-vencedor" },
  ],
  /** A igreja inteira numa foto só. É a mesma que abre o /sobre, e a repetição
   *  é assumida: o briefing pede que a Home termine "com pessoas", numa
   *  "fotografia ampla e emocional da comunidade", e esta é a única do acervo
   *  em que a comunidade aparece INTEIRA. Uma foto de recorte menor no lugar
   *  dela cumpriria a forma e não o pedido. */
  foto: {
    src: "/igreja/comunidade-no-gramado.jpg",
    alvo: "public/igreja/comunidade-no-gramado.jpg",
    alt: "A comunidade da Videira Indaiatuba reunida no gramado, de braços erguidos, para uma foto de todos juntos",
  } satisfies Foto,
};
