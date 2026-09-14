/**
 * A GALERIA IMERSIVA do /radicais-livres — acervo, capítulos e coreografia.
 *
 * Este arquivo é a partitura. O `components/galeria/` é a orquestra: ele não
 * sabe o nome de nenhuma foto nem onde ela fica na tela, só sabe ler daqui e
 * interpolar. Mexer na composição é mexer NESTE arquivo — nenhum componente
 * precisa ser aberto para trocar uma foto de lugar, de camada ou de cena.
 *
 * Era o requisito número um do desenho, e ele se pagou na primeira revisão: a
 * rede olhou a seção na tela e pediu duas coisas — que as fotos casassem com o
 * que o texto diz, e que TODO o acervo aparecesse. As duas se resolveram aqui.
 *
 * ── AS DUAS SUPERFÍCIES, E POR QUE SÃO DUAS ──────────────────────────────
 *
 *   O PALCO (Ato II)   40 fotos coreografadas. É narrativa: cada cena tem uma
 *                      palavra, uma legenda e um capítulo, e as fotos que
 *                      entram são as que DIZEM aquilo. Uma foto de culto na
 *                      cena que diz "célula" não é um detalhe — é o texto
 *                      desmentindo a imagem na frente do leitor.
 *
 *   O MURAL (Ato IV)   as 111 dos Radicais. É acervo: uma parede que rola para
 *                      o lado até
 *                      acabar, onde cada um procura a si mesmo. Aqui não há
 *                      curadoria a fazer — quem ficou de fora ficou de fora
 *                      da própria história, e era exatamente essa a queixa.
 *
 * A separação é o que permite as duas coisas ao mesmo tempo. Uma coreografia
 * de 116 fotos seria ilegível; um mural de 40 não cumpre a promessa de
 * "procure a sua". `fotosDoPalco` sai das cenas, `fotosDoMural` sai do acervo,
 * e nenhuma lista é mantida à mão.
 *
 * ── SOBRE OS METADADOS QUE NÃO EXISTEM ────────────────────────────────────
 *
 * Não há `evento`, `ano` nem `nota` em nenhuma foto, e isso é decisão, não
 * pendência. Do acervo de 113 originais, 11 tinham data no EXIF e uma delas
 * marcava o ano 2000 (relógio de câmera nunca acertado). As datas nos nomes
 * dos arquivos são a data em que a foto foi ENVIADA no WhatsApp: noventa delas
 * saíram da mesma conversa no mesmo dia, de eventos de anos diferentes.
 *
 * Legenda errada num site institucional custa mais que legenda nenhuma. Por
 * isso o painel da foto ampliada mostra só a imagem e as irmãs do mesmo
 * capítulo, e o cursor nunca diz "MEMÓRIA" — não há memória registrada para
 * mostrar.
 *
 * Onde há texto legível na imagem (cartaz, camiseta, telão), o texto entra no
 * alt — ele é parte do que a foto diz. É por isso que o `alt` de
 * `cartazes-de-batismo` é comprido: o que aquela foto tem de melhor está
 * escrito à mão nos dois cartazes, e quem não enxerga a imagem perderia a foto
 * inteira.
 *
 * ── DE ONDE VEIO O ACERVO DE 111 ─────────────────────────────────────────
 *
 * `material/_acervo/radicais-originais/`, a caixa de entrada, tem
 * 116 arquivos. Entraram 111: as 13 que ficaram de fora são 8 repetições
 * conferidas por comparação de pixels, 2 derivados de colagem, 1 logo, 1 arte
 * de grafismo e 1 print de tela com a barra de status do iOS. O motivo de cada
 * uma está escrito na tabela `NOMES` do `preparar-galeria.py`, junto do
 * arquivo — não aqui, para não haver duas listas divergindo.
 *
 * DUAS FOTOS DE `public/radicais/` NÃO ESTÃO NESTE ARQUIVO de propósito:
 * `parque-costas.jpg` e `parque-empe.jpg` têm 260px de largura e são recortes
 * do comp da seção "Quem somos", com canto arredondado embutido. Numa parede
 * de fotografia elas apareceriam como duas miniaturas borradas com quinas
 * transparentes.
 */

/**
 * Os QUATRO capítulos, na ordem em que a narrativa os revela — e a lista é a
 * mesma coisa que as quatro etapas do palco. Não há capítulo sem etapa nem
 * etapa sem capítulo: `etapas` sai daqui pelas cenas, e a conferência no fim
 * do arquivo recusa qualquer divergência entre as duas.
 *
 * ERAM CINCO. `fora` — "fora da igreja" — era o quinto, e ele saiu porque
 * nomeava um LUGAR enquanto os outros quatro nomeiam um MOMENTO da vida da
 * rede. Na tela isso aparecia como uma etapa que não continuava as outras: a
 * narrativa ia célula → culto → nós e terminava numa etiqueta que dizia onde a
 * foto tinha sido tirada. As 18 fotos dele são a mesma turma na rua, no parque
 * e na calçada, então elas passaram inteiras para `nos`, que é o capítulo das
 * pessoas — dentro e fora do prédio.
 */
export type Capitulo = "celulas" | "cultos" | "encontros" | "nos";

/**
 * A profundidade da foto na composição. Não é decoração: define o fator de
 * parallax, a nitidez e a sombra (ver `galeria.module.css`).
 *
 * `fundo` é a exceção da exceção — é a única camada que passa ATRÁS da palavra
 * gigante. Existe UMA foto assim na galeria inteira, e o efeito só é
 * perceptível porque é raro.
 *
 * É OPCIONAL porque a maioria das fotos não pisa no palco: das 116, 40 são
 * coreografadas e 76 existem só no mural, onde não há camada nenhuma — tudo
 * está no mesmo plano. Preencher `camada: "meio"` em 75 fotos seria escrever
 * um dado que nada lê.
 */
export type Camada = "fundo" | "longe" | "meio" | "perto";

export type FotoGaleria = {
  /** Identificador estável. É a chave dos quadros nas cenas. */
  id: string;
  src: string;
  /** Largura real do arquivo em `public/`, em pixels. */
  w: number;
  /** Altura real do arquivo em `public/`, em pixels. */
  h: number;
  alt: string;
  capitulo: Capitulo;
  /** Só para quem entra em cena no Ato II. Ver `Camada`. */
  camada?: Camada;
  /**
   * Entra no palco mas NÃO entra no mural.
   *
   * Existe por causa das fotos de célula, que vieram de outra pasta
   * (`public/celulas/`) e de outro assunto. O mural promete uma coisa
   * específica — "o acervo dos Radicais, todo ele, procure a sua" — e as
   * células da igreja inteira não fazem parte desse acervo: são reuniões de
   * família, com criança e com avó, e quem rola a parede procurando o próprio
   * rosto de um acampamento não está procurando lá.
   *
   * No PALCO elas fazem todo o sentido, porque o palco é narrativa: a etapa
   * diz CÉLULAS e mostra células. São dois contratos diferentes com o
   * visitante, e este campo é a linha que os separa.
   */
  foraDoMural?: boolean;
  /**
   * A versão de alta resolução, servida SÓ quando a foto é ampliada — no
   * clímax da Cena 5 e na abertura por clique. Sem isto, uma foto de 1600px
   * esticada a 92vw num monitor retina aparece borrada exatamente no instante
   * em que ela é a única coisa na tela.
   *
   * SÓ UMA FOTO DO ACERVO TEM ISTO, e não é escolha de gosto: das 111, apenas
   * duas vieram de câmera com 3008px (`culto-maos-erguidas` e `culto-lotado`).
   * Todo o resto passou por WhatsApp e chegou com 1280 ou 1600 no lado maior —
   * gerar um `-grande` delas seria ampliar borrão. É essa restrição, e não
   * uma preferência de composição, que decide qual foto pode ser o clímax.
   */
  grande?: string;
};

/**
 * O quadro de uma foto numa cena — o estado dela no INÍCIO da faixa.
 *
 * O motor interpola entre o quadro da cena N e o da cena N+1 ao longo da faixa
 * de N. Foto ausente de uma cena vale `opacidade: 0` no mesmo lugar em que
 * estava — ela some por transparência, sem saltar.
 *
 * ⚠️ `largura` É O ÚNICO CAMPO EM UNIDADE DE TELA (vw), e ele NÃO vira
 * `width` no CSS. O motor calcula a maior largura que a foto alcança em toda
 * a galeria, fixa essa medida como o tamanho de layout do elemento, e anima
 * `scale` para chegar às outras. É o que cumpre a regra de só animar
 * `transform` e `opacity` — animar `width` remede o layout a cada quadro.
 */
export type Quadro = {
  /** Posição do CENTRO da foto, em % da largura do palco. */
  x: number;
  /** Posição do CENTRO da foto, em % da altura do palco. */
  y: number;
  /** Largura desejada, em vw. Vira `scale` no motor. */
  largura: number;
  /** Entre -3 e 3. Fotografia sobre a mesa, não colagem bagunçada. */
  giro: number;
  opacidade: number;
};

export type Cena = {
  id: string;
  /** Faixa de progresso do pin, de 0 a 1. */
  faixa: [number, number];
  /** A palavra gigante ao fundo. Uma por cena, com fusão entre elas. */
  palavra?: string;
  legenda?: string;
  /** A palavra da legenda que recebe o roxo claro. Precisa existir na legenda. */
  realce?: string;
  /**
   * Onde a legenda se apoia, em % do palco — o CENTRO não, o canto de cima à
   * esquerda dela, que é como o CSS a posiciona.
   *
   * ISTO MOROU NO MOTOR, num mapa chamado `LUGAR_DA_LEGENDA`, e a mudança de
   * endereço é o ponto: a posição de uma legenda é composição, e o cabeçalho
   * deste arquivo promete que composição se edita aqui sem abrir componente
   * nenhum. Com o mapa lá, mover uma legenda dois pontos para o lado era mexer
   * no arquivo do pin — e era fácil mover a foto aqui e esquecer a legenda lá.
   *
   * A regra de desenho continua a mesma: nunca duas cenas seguidas no mesmo
   * canto. Legenda que não se move deixa de ser narração e vira interface.
   */
  legendaEm?: [number, number];
  /**
   * A etapa que ESTA cena abre. Só as quatro cenas de abertura declaram; as
   * outras herdam a etiqueta da anterior, e é essa herança que permite duas
   * cenas dentro da mesma etapa sem a etiqueta piscar na emenda.
   *
   * `id` é o capítulo de verdade, não o rótulo escrito. A versão anterior
   * casava as duas coisas comparando a string da tela ("Fora da igreja") com
   * uma tabela — um acento trocado desligava a conferência em silêncio.
   */
  capitulo?: { indice: string; id: Capitulo; rotulo: string };
  /**
   * Esta cena pode mostrar fotos de QUALQUER capítulo sob a etiqueta vigente.
   *
   * A regra normal existe para impedir o texto de desmentir a imagem: sob
   * "01 — CÉLULAS" não pode haver foto de culto. Ela vale para as oito cenas
   * que TÊM um assunto. As duas que não têm são a abertura e o respiro, e as
   * duas são exceção pela mesma razão, em pontas opostas da experiência: a
   * abertura é um prólogo que adianta um pouco de tudo, o respiro é um coda
   * que recolhe um pouco de tudo. A abertura não precisa deste campo porque
   * ainda não há etiqueta nenhuma na tela; o respiro precisa, porque herda a
   * de NÓS.
   *
   * NÃO É UMA VÁLVULA DE ESCAPE. Se alguém puser isto numa cena com palavra e
   * legenda, a trava inteira desta galeria deixa de valer para ela. Duas
   * cenas em onze podem misturar; as outras nove respondem pelo que mostram.
   */
  misturaCapitulos?: boolean;
  quadros: Record<string, Quadro>;
};

/* ═══════════════════════════════════════════════════════════════════════════
   O ACERVO — 111 fotos, agrupadas por capítulo

   A ORDEM AQUI É DE LEITURA HUMANA, não de exibição. O palco lê pelas cenas e
   o mural reordena (ver `fotosDoMural`), então agrupar por capítulo custa nada
   e faz a diferença quando alguém precisa achar "aquela foto de culto" no meio
   de cento e onze entradas.
   ═══════════════════════════════════════════════════════════════════════════ */

export const acervo: FotoGaleria[] = [

  /* ── CÉLULAS · 14 fotos ───────────────────────────────────────── */
  {
    id: "camisas-do-brasil",
    src: "/radicais/camisas-do-brasil.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de adolescentes de camisa do Brasil posando junto num salão à noite",
    capitulo: "celulas",
    camada: "longe",
  },
  {
    id: "grupo-embaixo-do-brasao",
    src: "/radicais/grupo-embaixo-do-brasao.jpg",
    w: 1280,
    h: 960,
    alt: "Grupo posando numa sala embaixo de um brasão pendurado na parede, alguns agachados à frente",
    capitulo: "celulas",
    camada: "meio",
  },
  {
    id: "mascaras-de-papel",
    src: "/radicais/mascaras-de-papel.jpg",
    w: 1280,
    h: 960,
    alt: "Grupo numa sala segurando máscaras gigantes de papel com rostos desenhados",
    capitulo: "celulas",
    camada: "perto",
  },
  {
    id: "mesa-de-lanche",
    src: "/radicais/mesa-de-lanche.jpg",
    w: 1200,
    h: 1600,
    alt: "Mesa redonda de lanchonete vista de cima, cheia de pratos e lanches, com duas jovens fazendo pose de um lado",
    capitulo: "celulas",
    camada: "perto",
  },
  {
    id: "mesa-de-restaurante",
    src: "/radicais/mesa-de-restaurante.jpg",
    w: 1600,
    h: 1200,
    alt: "Selfie numa mesa de restaurante: seis jovens espremidos no banco de madeira, todos rindo para a câmera",
    capitulo: "celulas",
    camada: "meio",
  },
  {
    id: "mocas-na-parede-laranja",
    src: "/radicais/mocas-na-parede-laranja.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de moças posando lado a lado diante de uma parede laranja",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "meio",
  },
  {
    id: "palavra-na-grama",
    src: "/radicais/palavra-na-grama.jpg",
    w: 960,
    h: 1280,
    alt: "Rapaz de costas, de braços abertos, falando para um grupo sentado na grama do parque",
    capitulo: "celulas",
    camada: "meio",
  },
  {
    id: "poses-na-parede-branca",
    src: "/radicais/poses-na-parede-branca.jpg",
    w: 720,
    h: 1280,
    alt: "Grupo posando encostado numa parede branca, quatro deles agachados à frente",
    capitulo: "celulas",
    camada: "perto",
  },
  {
    id: "roda-de-amigas",
    src: "/radicais/roda-de-amigas.jpg",
    w: 1600,
    h: 1200,
    alt: "Roda de moças posando abraçadas na sala, algumas sentadas à mesa de madeira",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "meio",
  },
  {
    id: "roda-na-grama",
    src: "/radicais/roda-na-grama.jpg",
    w: 960,
    h: 1280,
    alt: "Roda grande de jovens sentados na grama do parque, de costas para a câmera, com um deles em pé no meio",
    capitulo: "celulas",
    camada: "longe",
  },
  {
    id: "sala-de-casa-poses",
    src: "/radicais/sala-de-casa-poses.jpg",
    w: 1280,
    h: 720,
    alt: "Grupo amontoado na sala de uma casa, fazendo sinais com as mãos para a câmera",
    capitulo: "celulas",
    camada: "meio",
  },
  {
    id: "selfie-luzinhas",
    src: "/radicais/selfie-luzinhas.jpg",
    w: 1600,
    h: 900,
    alt: "Selfie de um grupo grande numa sala com luzinhas penduradas na parede",
    capitulo: "celulas",
    camada: "meio",
  },
  {
    id: "tres-na-sala-clara",
    src: "/radicais/tres-na-sala-clara.jpg",
    w: 1200,
    h: 1600,
    alt: "Três jovens posando encostados numa sala clara, um deles fazendo sinal de paz",
    capitulo: "celulas",
    camada: "meio",
  },
  {
    id: "turma-luz-roxa",
    src: "/radicais/turma-luz-roxa.jpg",
    w: 1120,
    h: 840,
    alt: "Turma posando num salão com a parede lavada de luz roxa e o acrílico da bateria atrás",
    capitulo: "celulas",
    camada: "longe",
  },

  /* ── CÉLULAS · as cinco que vieram de `public/celulas/` ──────────────
     NÃO SÃO DO ACERVO DOS RADICAIS. São fotos de célula de verdade, tiradas
     pelos próprios líderes, e entraram porque a etapa 01 do palco diz CÉLULAS
     e mostrava, até aqui, o que havia à mão: selfie de sala, mesa de
     lanchonete, roda de amigas. Nenhuma delas é uma célula reunida.

     Todas levam `foraDoMural`: pisam no palco e não entram na parede do fim.
     O porquê está no comentário do campo, lá em cima.

     TODAS SÃO HORIZONTAIS, e isso é a característica do assunto e não acaso:
     foto de célula é foto de turma reunida numa sala, e turma reunida se
     fotografa deitado. É por isso que a composição da etapa 01 não tem mais
     nenhum retrato — ver `CELULAS`, na coreografia. */
  {
    id: "celula-shalom",
    src: "/celulas/celula-shalom.jpg",
    w: 1600,
    h: 1200,
    alt: "Turma de adolescentes de preto sentada em dois degraus num salão claro, todos com os braços cruzados sobre o peito",
    capitulo: "celulas",
    camada: "perto",
    foraDoMural: true,
  },
  {
    id: "celula-united",
    src: "/celulas/celula-united.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de rapazes posando num salão claro, uma fileira em pé e três agachados à frente, com plantas e o telão atrás",
    capitulo: "celulas",
    camada: "perto",
    foraDoMural: true,
  },
  {
    id: "celula-valentes",
    src: "/celulas/celula-valentes.jpg",
    /* 1280 e não 1600: o arquivo que existe em `public/celulas/` tem 1280×720,
       e por um tempo estas duas linhas diziam 1600×900. A proporção batia, o
       recorte batia, e nada aparecia errado na tela — mas `origensDaFoto`
       anuncia `foto.w` como o `w` do `srcset`, e um número inflado faz o
       navegador escolher este arquivo para vãos maiores do que ele preenche.
       O sintoma seria esta foto (e só ela) levemente macia no palco. */
    w: 1280,
    h: 720,
    alt: "Selfie de uma turma grande de adolescentes num salão escuro, muitos rindo, fazendo careta e sinal de paz",
    capitulo: "celulas",
    camada: "meio",
    foraDoMural: true,
  },
  {
    id: "celula-aprisco",
    src: "/celulas/celula-aprisco.jpg",
    w: 661,
    h: 496,
    alt: "Selfie de uma célula à noite num parquinho, com a turma amontoada em volta de quem segura a câmera e os brinquedos amarelos atrás",
    capitulo: "celulas",
    camada: "perto",
    foraDoMural: true,
  },
  {
    /* 269px DE LARGURA — é a menor foto do palco, de longe, e a única que não
       chega aos 800 com folga. Ela aguenta o lugar que tem porque esse lugar
       é o pior possível para a nitidez importar: camada `longe`, 15vw, com
       `blur(2px)` do CSS e 85% de opacidade por cima. A 15vw ela ocupa 240px
       numa tela de 1600 — a foto tem 269. Cabe em tela comum e fica macia em
       tela retina, e o desfoque da camada já ia amaciá-la de todo jeito.

       Se um dia ela for para a camada `meio` ou `perto`, ou passar de 16vw,
       precisa de um original maior antes. */
    id: "celula-nazir",
    src: "/celulas/celula-nazir.jpg",
    w: 269,
    h: 235,
    alt: "Célula de jovens posando num salão claro, uma fileira em pé e quatro agachados à frente, com plantas e um tambor preto ao fundo",
    capitulo: "celulas",
    camada: "longe",
    foraDoMural: true,
  },

  /* ── CULTOS · 18 fotos ────────────────────────────────────────── */
  {
    /* UMA DAS TRÊS FOTOS DO ACERVO COM RESOLUÇÃO DE CÂMERA — o original tem
       6000×4000. É por isso que ela tem `grande`: das 117, só ela,
       `culto-maos-erguidas` e `culto-lotado` aguentam ser ampliadas na tela
       inteira sem virar borrão. Todo o resto passou por WhatsApp e chegou com
       1280 ou 1600 no lado maior. */
    id: "adoracao-camiseta-branca",
    src: "/radicais/adoracao-camiseta-branca.jpg",
    grande: "/radicais/adoracao-camiseta-branca-grande.jpg",
    w: 1600,
    h: 1066,
    alt: "Jovem de camiseta branca cantando de olhos fechados no meio da congregação, com um braço erguido e a outra mão sobre o peito",
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "batismo-bracos-erguidos",
    src: "/radicais/batismo-bracos-erguidos.jpg",
    w: 1068,
    h: 1600,
    alt: "Jovem de camiseta preta escrita “eu nasci de novo”, encharcado, com os dois braços erguidos e a boca aberta gritando",
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "batismo-nasci-de-novo",
    src: "/radicais/batismo-nasci-de-novo.jpg",
    w: 1068,
    h: 1600,
    alt: "Rapaz encharcado, de camiseta preta escrita “eu nasci de novo”, sorrindo de cabeça baixa depois do batismo",
    capitulo: "cultos",
  },
  {
    id: "cartazes-de-batismo",
    src: "/radicais/cartazes-de-batismo.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes segurando cartazes de papel escritos à mão: “droga, é o Brian! oficialmente nova criatura” e “oi, boa noite, será que tem batismo do Rayan hoje?”",
    capitulo: "cultos",
    camada: "meio",
  },
  {
    id: "culto-lotado",
    src: "/radicais/culto-lotado.jpg",
    w: 1600,
    h: 1068,
    alt: "Salão lotado visto de trás, com dezenas de jovens de pé e de mãos erguidas",
    capitulo: "cultos",
    camada: "longe",
  },
  {
    id: "culto-maos-erguidas",
    src: "/radicais/culto-maos-erguidas.jpg",
    grande: "/radicais/culto-maos-erguidas-grande.jpg",
    w: 1600,
    h: 1068,
    alt: "Congregação de pé durante o culto, com dezenas de mãos erguidas e palmas, e um caixote de flores num canto",
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "culto-turma-no-salao",
    src: "/radicais/culto-turma-no-salao.jpg",
    w: 1600,
    h: 900,
    alt: "Foto de turma num salão escuro, com a banda no palco iluminado ao fundo",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "longe",
  },
  {
    id: "fachada-videira",
    src: "/radicais/fachada-videira.jpg",
    w: 1600,
    h: 1063,
    alt: "Fachada da igreja à noite, com o letreiro iluminado “Videira — igreja em células”",
    capitulo: "cultos",
  },
  {
    id: "louvor-mao-no-peito",
    src: "/radicais/louvor-mao-no-peito.jpg",
    w: 1600,
    h: 1067,
    alt: "Jovem de mão no peito e braço erguido, cantando de olhos fechados no meio de um grupo",
    capitulo: "cultos",
    camada: "meio",
  },
  {
    id: "mao-sobre-a-cabeca",
    src: "/radicais/mao-sobre-a-cabeca.jpg",
    w: 1200,
    h: 1600,
    alt: "Jovem com a mão sobre a cabeça de outro, os dois de olhos fechados, no meio do salão",
    capitulo: "cultos",
  },
  {
    id: "microfone-cacheado",
    src: "/radicais/microfone-cacheado.jpg",
    w: 1067,
    h: 1600,
    alt: "Jovem de cabelo cacheado cantando ao microfone, iluminado por uma luz roxa",
    capitulo: "cultos",
  },
  {
    id: "microfone-luz-quente",
    src: "/radicais/microfone-luz-quente.jpg",
    w: 1023,
    h: 1537,
    alt: "Jovem cantando ao microfone à noite, recortado por uma luz quente atrás dele",
    capitulo: "cultos",
    camada: "fundo",
  },
  {
    id: "oracao-a-dois",
    src: "/radicais/oracao-a-dois.jpg",
    w: 1067,
    h: 1600,
    alt: "Dois rapazes abraçados junto à janela, um com a mão no ombro do outro, os dois de cabeça baixa",
    capitulo: "cultos",
  },
  {
    id: "palavra-no-escuro",
    src: "/radicais/palavra-no-escuro.jpg",
    w: 1067,
    h: 1600,
    alt: "Pregador de camiseta preta ao microfone, com o braço aberto, no escuro do salão",
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "pregacao",
    src: "/radicais/pregacao.jpg",
    w: 960,
    h: 1280,
    alt: "Pregador de camiseta clara ao microfone, de perfil, diante de uma parede iluminada",
    capitulo: "cultos",
  },
  {
    id: "teclado",
    src: "/radicais/teclado.jpg",
    w: 1600,
    h: 1068,
    alt: "Mãos de perto tocando um teclado num salão escuro",
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "telao-adoracao",
    src: "/radicais/telao-adoracao.jpg",
    w: 1200,
    h: 1600,
    alt: "Salão no escuro com o telão projetando “deixa subir a minha adoração” em rosa, e a plateia em silhueta",
    capitulo: "cultos",
    camada: "meio",
  },
  {
    id: "telao-rl",
    src: "/radicais/telao-rl.jpg",
    w: 828,
    h: 512,
    alt: "Salão escuro com a turma inteira reunida diante do telão, que projeta as letras “RL”",
    capitulo: "cultos",
    camada: "longe",
  },
  /* ═══ AS SETE FOTOS DE 22/08/2026 ═══════════════════════════════════════
     Entraram por pedido do Lucas, direto de `material/radicais/`, e são o
     primeiro lote a chegar DEPOIS do redesenho da página. Seis delas estão
     espalhadas por este acervo daqui para baixo; a sétima (`assistindo-ao-culto`)
     nunca esteve aqui — foi para a seção 07 e saiu do site em 14/09/2026.

     ⚠️ NENHUMA DELAS ENTRA EM CENA NO PALCO, e isso é decisão, não esquecimento.
     O Ato II é uma partitura fechada: cada foto tem quadro, camada e cena, e
     encaixar uma nova ali significa recalcular a composição da etapa inteira.
     Elas entram no MURAL, que é onde o acervo cabe todo e onde o pedido
     ("espalhadas") faz sentido — a parede é justamente a peça que promete "o
     acervo dos Radicais, todo ele, procure a sua".

     A CONSEQUÊNCIA PRÁTICA é que o `capitulo` delas é só uma ETIQUETA: ele
     agrupa a entrada no arquivo e não decide nada na tela, porque quem lê o
     capítulo é a coreografia do palco. Está preenchido honestamente, pelo que
     se vê na foto, para o dia em que alguma delas for promovida a uma cena.

     A POSIÇÃO DE CADA UMA é a alfabética dentro da corrida de capítulo em que
     ela cai — que é como este acervo sempre esteve organizado. No mural isso
     vira "espalhadas" de verdade: `montarLinhas` reparte as fotos pelas três
     faixas na ordem do arquivo, então seis entradas em seis pontos diferentes
     caem em faixas e alturas diferentes da parede. Enfileiradas no fim, as
     seis sairiam juntas na mesma ponta.

     O ORIGINAL DE CADA UMA É UM PNG PESADO (de 1,7MB a 18MB) e continua em
     `material/radicais/`, fora do git. O que está no ar saiu do mesmo pipeline
     do `preparar-galeria.py` — EXIF endireitado, LANCZOS, JPEG progressivo
     otimizado na qualidade 86, 1600px no lado maior e a variante `-800`.

     ⚠️ E UMA SÉTIMA FOTO DO LOTE NÃO ENTROU: a `selfie-almocando`. Ver a nota
     no fim deste bloco de comentário do arquivo — ela está em `material/` e
     não foi processada, de propósito. */
  {
    id: "tocando-teclado",
    src: "/radicais/tocando-teclado.jpg",
    w: 1067,
    h: 1600,
    alt: "Tecladista de gorro tocando no escuro, iluminado pela tela do notebook e por um cordão de luzinhas preso ao teclado, com uma mão erguida em adoração ao lado",
    capitulo: "cultos",
  },

  /* ── ENCONTROS · 23 fotos ─────────────────────────────────────── */
  {
    id: "bandeira-na-sala-branca",
    src: "/radicais/bandeira-na-sala-branca.jpg",
    w: 1280,
    h: 853,
    alt: "Turma enorme numa sala branca, com uma bandeira vermelha erguida no meio",
    capitulo: "encontros",
  },
  {
    id: "bandeira-revival",
    src: "/radicais/bandeira-revival.jpg",
    w: 1280,
    h: 960,
    alt: "Turma grande posando atrás de uma bandeira bordô escrita “revival”, embaixo de letras infláveis com a mesma palavra",
    capitulo: "encontros",
    camada: "longe",
  },
  {
    id: "camisetas-pintadas",
    src: "/radicais/camisetas-pintadas.jpg",
    w: 1200,
    h: 1600,
    alt: "Grupo de jovens com as camisetas e os rostos cobertos de tinta, posando embaixo de uma lâmpada",
    capitulo: "encontros",
    camada: "perto",
  },
  {
    id: "cartazes-nova-criatura",
    src: "/radicais/cartazes-nova-criatura.jpg",
    w: 1600,
    h: 1068,
    alt: "Grupo grande de jovens posando com cartazes escritos à mão, um deles dizendo “nova criatura”",
    capitulo: "encontros",
    camada: "perto",
  },
  {
    id: "descanso-na-grama",
    src: "/radicais/descanso-na-grama.jpg",
    w: 1170,
    h: 1157,
    alt: "Turma sentada em roda na grama de uma chácara, de mochila, ouvindo alguém em pé",
    capitulo: "encontros",
    camada: "longe",
  },
  {
    id: "dupla-no-pavilhao",
    src: "/radicais/dupla-no-pavilhao.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois homens posando abraçados num pavilhão cheio, um deles de terno e crachá",
    capitulo: "encontros",
  },
  {
    id: "lanternas-na-noite",
    src: "/radicais/lanternas-na-noite.jpg",
    w: 1170,
    h: 1154,
    alt: "Fila de jovens de lanterna na cabeça atravessando um gramado escuro à noite",
    capitulo: "encontros",
    camada: "meio",
  },
  {
    id: "quadra-poses",
    src: "/radicais/quadra-poses.jpg",
    w: 1600,
    h: 1066,
    alt: "Turma posando na quadra ao ar livre, uma fileira em pé e outra agachada, com o mato atrás",
    capitulo: "encontros",
  },
  {
    id: "selfie-no-pavilhao",
    src: "/radicais/selfie-no-pavilhao.jpg",
    w: 960,
    h: 1280,
    alt: "Selfie de três jovens num pavilhão de cadeiras brancas, com a plateia atrás",
    capitulo: "encontros",
  },
  {
    id: "trio-bandeira-roxa",
    src: "/radicais/trio-bandeira-roxa.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes e uma mulher posando num pavilhão de evento, com uma bandeira roxa erguida atrás",
    capitulo: "encontros",
  },
  {
    id: "turma-01",
    src: "/radicais/turma-01.jpg",
    w: 1600,
    h: 1066,
    alt: "Foto de turma à noite numa varanda, uns em pé e outros agachados, com luzinhas roxas ao fundo",
    capitulo: "encontros",
  },
  {
    id: "turma-02",
    src: "/radicais/turma-02.jpg",
    w: 1600,
    h: 1066,
    alt: "Grupo posando à noite numa varanda, um deles de terno e boina",
    capitulo: "encontros",
  },
  {
    id: "turma-03",
    src: "/radicais/turma-03.jpg",
    w: 1600,
    h: 1066,
    alt: "Turma numa festa à noite, alguns de gravata e de chapéu, agachados e em pé",
    capitulo: "encontros",
  },
  {
    id: "turma-04",
    src: "/radicais/turma-04.jpg",
    w: 1600,
    h: 1066,
    alt: "Turma posando embaixo de luzinhas roxas na varanda de uma chácara",
    capitulo: "encontros",
  },
  {
    id: "turma-de-azul",
    src: "/radicais/turma-de-azul.jpg",
    w: 1280,
    h: 679,
    alt: "Turma enorme de azul posando num salão, em várias fileiras",
    capitulo: "encontros",
  },
  {
    id: "turma-na-chacara",
    src: "/radicais/turma-na-chacara.jpg",
    w: 960,
    h: 1280,
    alt: "Turma grande posando à noite na escada de uma chácara, com o pergolado iluminado atrás",
    capitulo: "encontros",
  },
  {
    id: "turma-no-chao-do-pavilhao",
    src: "/radicais/turma-no-chao-do-pavilhao.jpg",
    w: 1600,
    h: 1200,
    alt: "Turma grande de preto sentada e deitada no chão de um pavilhão",
    capitulo: "encontros",
    camada: "meio",
  },
  {
    id: "turma-no-pergolado",
    src: "/radicais/turma-no-pergolado.jpg",
    w: 1280,
    h: 720,
    alt: "Turma grande sentada e em pé embaixo de um pergolado à noite, com a cidade iluminada ao fundo",
    capitulo: "encontros",
    camada: "meio",
  },
  {
    id: "turma-panoramica",
    src: "/radicais/turma-panoramica.jpg",
    w: 1280,
    h: 477,
    alt: "Foto panorâmica de uma turma enorme sentada e em pé na grama, num dia claro",
    capitulo: "encontros",
    camada: "longe",
  },
  {
    id: "turma-sala-branca",
    src: "/radicais/turma-sala-branca.jpg",
    w: 1600,
    h: 1066,
    alt: "Turma grande amontoada numa sala branca, todos virados para a câmera",
    capitulo: "encontros",
  },
  {
    id: "turma-salao-claro",
    src: "/radicais/turma-salao-claro.jpg",
    w: 1280,
    h: 720,
    alt: "Turma sentada e em pé no chão de um salão claro, com o telão apagado atrás",
    capitulo: "encontros",
  },
  {
    id: "turma-telao-rosa",
    src: "/radicais/turma-telao-rosa.jpg",
    w: 1280,
    h: 960,
    alt: "Foto de turma com mais de cem jovens sentados e em pé diante do telão, o salão inteiro tomado por uma luz rosa",
    capitulo: "encontros",
    camada: "perto",
  },
  {
    id: "turma-vista-do-alto",
    src: "/radicais/turma-vista-do-alto.jpg",
    w: 960,
    h: 1280,
    alt: "Foto de turma tirada do alto de uma escada, com todos olhando para cima",
    capitulo: "encontros",
    camada: "meio",
  },

  /* ── NÓS · na rua · 18 fotos ──────────────────────────────────────
     Era o capítulo `fora`. Continua sendo o bloco de fotos de rua, parque e
     calçada — só deixou de ser uma etapa própria. Ver o tipo `Capitulo`. */
  {
    id: "abraco-na-calcada",
    src: "/radicais/abraco-na-calcada.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de rapazes abraçados em roda na calçada, diante da vitrine iluminada de uma lanchonete",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "banco-da-praca",
    src: "/radicais/banco-da-praca.jpg",
    w: 1200,
    h: 1600,
    alt: "Duas jovens de camiseta bordô sentadas de pernas cruzadas num banco de praça, com as mãos unidas",
    capitulo: "nos",
  },
  {
    id: "cachoeira-no-mato",
    src: "/radicais/cachoeira-no-mato.jpg",
    w: 1280,
    h: 960,
    alt: "Grupo de rapazes dentro de um riacho no meio do mato, posando para a câmera",
    capitulo: "nos",
  },
  /* ⚠️ A POSIÇÃO DESTA ENTRADA NO ARRAY É DESENHO, NÃO ARRUMAÇÃO — é a única
     do acervo assim, e mexer nela move a foto na parede.

     O Lucas pediu a `foto-com-dog` num lugar específico do mural: a terceira
     foto da faixa do meio, logo no começo. Esse lugar não se escolhe
     diretamente em lugar nenhum — ele é RESULTADO de duas etapas em sequência,
     e a única alavanca que existe é o índice aqui:

       1. `fotosDoMural` embaralha o acervo por capítulo, num revezamento
          proporcional (logo abaixo neste arquivo). O que decide a vez de uma
          foto é a posição dela DENTRO DA FILA DO PRÓPRIO CAPÍTULO.
       2. `montarLinhas` varre essa ordem e joga cada foto na faixa mais curta
          no momento — então a faixa em que ela cai depende das larguras de
          todas as fotos que vieram antes.

     Simulando as duas etapas sobre o acervo inteiro, UMA posição acerta o
     alvo: esta, com `capitulo: "nos"`. É por isso que a entrada está no meio
     da corrida alfabética de `encontros` (entre `cachoeira-no-mato` e
     `calcada-numero-257`) em vez de junto das outras de `nos` — a organização
     alfabética do arquivo perde para o pedido, e esta é a exceção.

     ⚠️ E ELA É FRÁGIL DE UM JEITO ESPECÍFICO: acrescentar, remover ou trocar a
     PROPORÇÃO de qualquer foto que venha antes desta muda o resultado das duas
     etapas e leva a `foto-com-dog` para outro lugar da parede — sem erro, sem
     aviso, e sem nada parecer errado no código. Quem mexer no acervo e quiser
     manter o pedido de pé tem de simular de novo e reposicionar esta entrada.

     ── E O QUE ELA SUBSTITUIU ──────────────────────────────────────────────

     Esta foto entrou no lugar da `adoracao-bone` (um jovem de boné cantando de
     olhos fechados e mão erguida), por pedido do Lucas em 22/08/2026. A
     `adoracao-bone` saiu do acervo e os arquivos dela saíram do `public/`; ela
     só existia no mural — não estava em nenhuma cena do palco —, então a troca
     não encostou na experiência imersiva. */
  {
    id: "foto-com-dog",
    src: "/radicais/foto-com-dog.jpg",
    w: 1600,
    h: 1200,
    alt: "Dois rapazes posando para uma selfie ao lado de alguém fantasiado de cachorro no corredor de um shopping, um deles fazendo sinal de positivo",
    capitulo: "nos",
  },
  {
    id: "calcada-numero-257",
    src: "/radicais/calcada-numero-257.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de jovens posando na calçada à noite, embaixo do número 257 no portão",
    capitulo: "nos",
  },
  {
    id: "ciclovia-de-costas",
    src: "/radicais/ciclovia-de-costas.jpg",
    w: 1200,
    h: 1600,
    alt: "Três jovens de mochila caminhando de costas por uma ciclovia arborizada",
    capitulo: "nos",
  },
  {
    id: "cochilo-na-van",
    src: "/radicais/cochilo-na-van.jpg",
    w: 1171,
    h: 1600,
    alt: "Selfie dentro de uma van, com um rapaz dormindo de boca aberta no banco da frente",
    capitulo: "nos",
  },
  {
    id: "de-pe-entre-arvores",
    src: "/radicais/de-pe-entre-arvores.jpg",
    w: 1066,
    h: 1600,
    alt: "Rapaz em pé, fotografado de baixo contra o céu e as copas das árvores, com um grupo sentado ao fundo",
    capitulo: "nos",
  },
  {
    id: "duas-de-costas-na-rua",
    src: "/radicais/duas-de-costas-na-rua.jpg",
    w: 960,
    h: 1280,
    alt: "Duas jovens de costas, de jaqueta, paradas na esquina de uma avenida com palmeiras",
    capitulo: "nos",
  },
  {
    id: "farinha-no-rosto",
    src: "/radicais/farinha-no-rosto.jpg",
    w: 1200,
    h: 1600,
    alt: "Rapaz com o rosto coberto de farinha branca, de mão no peito, num campo de futebol",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "fogueira-a-noite",
    src: "/radicais/fogueira-a-noite.jpg",
    w: 1200,
    h: 1600,
    alt: "Fogueira acesa à noite, com uma figura de terno vermelho em pé ao lado e gente sentada em volta",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "gramado-fim-de-tarde",
    src: "/radicais/gramado-fim-de-tarde.jpg",
    w: 1600,
    h: 1600,
    alt: "Turma de jovens agachada e sentada na grama de uma praça, com os postes já acesos no fim da tarde",
    /* MUDOU DE CAPÍTULO — era `nos`. É uma célula que se reuniu no parque, e
       ela foi escolhida à mão para a composição da etapa 01; sob a etiqueta
       CÉLULAS, uma foto de capítulo `nos` faz a conferência reprovar a cena, e
       com razão: seria o texto desmentindo a imagem. */
    capitulo: "celulas",
    camada: "longe",
  },
  {
    id: "mural-de-asas",
    src: "/radicais/mural-de-asas.jpg",
    w: 1200,
    h: 1600,
    alt: "Rapaz em pé no meio de um mural de asas amarelas pintado na parede",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "parque-fim-de-tarde",
    src: "/radicais/parque-fim-de-tarde.jpg",
    w: 1280,
    h: 960,
    alt: "Grupo grande de rapazes posando no parque no fim da tarde, com as sombras compridas na grama",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "perto",
  },
  {
    id: "ponta-cabeca-no-parquinho",
    src: "/radicais/ponta-cabeca-no-parquinho.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes pendurados de cabeça para baixo na barra de um parquinho, à noite",
    capitulo: "nos",
  },
  {
    id: "rapazes-na-calcada",
    src: "/radicais/rapazes-na-calcada.jpg",
    w: 960,
    h: 1280,
    alt: "Grupo de rapazes posando na calçada à noite em frente a uma loja iluminada, um deles com o braço erguido",
    /* ERA `nos`, e a mudança é a mais discutível das três — a foto é na
       calçada, do lado de fora. Ela entrou em CULTOS porque a etapa passou a
       dizer "aqui a gente transborda": o culto que continua na rua depois de
       acabar é literalmente o que a palavra descreve, e sem esta foto a etapa
       fica inteira dentro do prédio. Se um dia a legenda voltar a ser "aqui a
       gente serve", esta foto volta para `nos` junto. */
    capitulo: "cultos",
    camada: "meio",
  },
  {
    id: "rapazes-na-pista-a-noite",
    src: "/radicais/rapazes-na-pista-a-noite.jpg",
    w: 1280,
    h: 960,
    alt: "Selfie de um grupo grande de rapazes numa pista à noite",
    capitulo: "nos",
  },
  {
    id: "roda-na-palmeira",
    src: "/radicais/roda-na-palmeira.jpg",
    w: 1200,
    h: 1600,
    alt: "Grupo de branco em volta do tronco de uma palmeira, cada um com uma das mãos no tronco",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "selfie-na-praca-de-alimentacao",
    src: "/radicais/selfie-na-praca-de-alimentacao.jpg",
    w: 900,
    h: 1600,
    alt: "Selfie numa praça de alimentação, com dois rapazes atrás segurando bebidas",
    capitulo: "nos",
  },
  {
    id: "selfie-no-parque",
    src: "/radicais/selfie-no-parque.jpg",
    w: 1600,
    h: 900,
    alt: "Selfie de seis rapazes sentados na grama de um parque no fim da tarde, com capacetes de moto no chão ao lado deles",
    capitulo: "encontros",
  },

  /* ── NÓS · de perto · 38 fotos ──────────────────────────────────── */
  {
    id: "abraco-de-lado",
    src: "/radicais/abraco-de-lado.jpg",
    w: 960,
    h: 1280,
    alt: "Dois jovens se abraçando de lado no meio de outras pessoas, num corredor claro",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "abraco-forte",
    src: "/radicais/abraco-forte.jpg",
    w: 960,
    h: 1280,
    alt: "Dois jovens se abraçando apertado no corredor da igreja, um deles de olhos fechados",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "ajoelhados-na-noite",
    src: "/radicais/ajoelhados-na-noite.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes ajoelhados de braços abertos numa festa à noite, com fumaça e luzes atrás",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "amigas-arrumadas",
    src: "/radicais/amigas-arrumadas.jpg",
    w: 1280,
    h: 960,
    alt: "Cinco amigas abraçadas à noite, arrumadas para a festa, uma delas de coroa dourada",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "meio",
  },
  {
    id: "bebe-com-hamburguer",
    src: "/radicais/bebe-com-hamburguer.jpg",
    w: 1600,
    h: 1600,
    alt: "Bebê de camiseta “revival” sentado no cadeirão de uma lanchonete, mordendo um hambúrguer com as duas mãos",
    capitulo: "nos",
  },
  {
    id: "careta-no-salao",
    src: "/radicais/careta-no-salao.jpg",
    w: 1200,
    h: 1600,
    alt: "Selfie de um rapaz de cabelo espetado fazendo careta, com o pessoal jogando atrás",
    capitulo: "nos",
  },
  {
    id: "cha-de-bebe",
    src: "/radicais/cha-de-bebe.jpg",
    w: 1280,
    h: 852,
    alt: "Chá de bebê com o nome “Daniel” em balões dourados e a bandeira do Brasil ao fundo, com um grupo de moças abraçando a mãe",
    capitulo: "nos",
  },
  {
    id: "colares-havaianos",
    src: "/radicais/colares-havaianos.jpg",
    w: 1280,
    h: 960,
    alt: "Quatro amigas de colar havaiano fazendo caretas e sinais com as mãos para a câmera",
    capitulo: "nos",
  },
  {
    id: "colares-na-varanda",
    src: "/radicais/colares-na-varanda.jpg",
    w: 1280,
    h: 960,
    alt: "Selfie de um grupo de moças com colares havaianos na varanda de uma chácara",
    capitulo: "nos",
  },
  {
    id: "deitado-no-colo",
    src: "/radicais/deitado-no-colo.jpg",
    w: 1200,
    h: 1600,
    alt: "Cinco jovens posando numa sala branca, um deles deitado sobre o colo dos outros",
    capitulo: "nos",
  },
  {
    id: "deitados-nas-almofadas",
    src: "/radicais/deitados-nas-almofadas.jpg",
    w: 960,
    h: 1280,
    alt: "Jovens deitados no gramado sobre almofadas, amontoados uns nos outros, olhando para a câmera",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "discipulado-eleitos",
    src: "/radicais/discipulado-eleitos.jpg",
    w: 1200,
    h: 1600,
    alt: "Grupo de sete jovens posando abraçados numa sala de paredes claras, quatro em pé atrás e três à frente",
    capitulo: "nos",
  },
  {
    id: "duas-amigas",
    src: "/radicais/duas-amigas.jpg",
    w: 1537,
    h: 1023,
    alt: "Duas amigas fazendo caretas e sinais com as mãos para a câmera, à noite",
    capitulo: "nos",
  },
  {
    id: "dupla-piscina",
    src: "/radicais/dupla-piscina.jpg",
    w: 1023,
    h: 1537,
    alt: "Duas jovens abraçadas à beira de uma piscina à noite, uma de camisa rosa com colar de flores e outra de camisa azul com gravata",
    capitulo: "nos",
  },
  {
    id: "equipe-bordo-no-corredor",
    src: "/radicais/equipe-bordo-no-corredor.jpg",
    w: 1200,
    h: 1600,
    alt: "Grupo de camiseta bordô posando num corredor branco, um deles agachado à frente, de camisa preta",
    capitulo: "nos",
  },
  {
    id: "equipe-com-buque",
    src: "/radicais/equipe-com-buque.jpg",
    w: 1280,
    h: 960,
    alt: "Grupo de camiseta bordô e vermelha posando numa sala, um deles com um buquê no colo",
    capitulo: "nos",
  },
  {
    id: "equipe-com-flores",
    src: "/radicais/equipe-com-flores.jpg",
    w: 1600,
    h: 1200,
    alt: "Equipe de jovens de camiseta bordô posando em duas fileiras numa sala branca, duas delas com buquês de flores",
    /* ERA `nos`. É a equipe do culto de camiseta REVIVAL com os buquês na mão
       depois de servir — o assunto é o serviço, não a amizade. */
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "equipe-com-flores-na-fachada",
    src: "/radicais/equipe-com-flores-na-fachada.jpg",
    w: 1200,
    h: 1600,
    alt: "Equipe de camiseta bordô posando na calçada em frente à fachada da igreja, várias delas com buquês de flores",
    capitulo: "nos",
  },
  {
    id: "jaqueta-college",
    src: "/radicais/jaqueta-college.jpg",
    w: 1023,
    h: 1537,
    alt: "Jovem de jaqueta college preta e rosa, de perfil, num salão escuro",
    /* ERA `nos`. Jovem de jaqueta college recortado pela luz de palco no meio
       do salão: é uma foto tirada DENTRO do culto. */
    capitulo: "cultos",
    camada: "perto",
  },
  {
    id: "jaquetas-ocean-de-costas",
    src: "/radicais/jaquetas-ocean-de-costas.jpg",
    w: 720,
    h: 427,
    alt: "A mesma turma de costas, mostrando as jaquetas escritas “ocean”, com um desenho de nuvens",
    capitulo: "nos",
  },
  {
    id: "jaquetas-ocean-de-frente",
    src: "/radicais/jaquetas-ocean-de-frente.jpg",
    w: 720,
    h: 406,
    alt: "Turma de jaqueta college azul-marinho posando de frente, fazendo sinais com as mãos",
    capitulo: "nos",
  },
  {
    id: "lideres-eleitos",
    src: "/radicais/lideres-eleitos.jpg",
    w: 900,
    h: 1200,
    /* 900px DE LARGURA, e é o original: o arquivo entregue tinha 900×1200 e o
       pipeline não amplia. É a segunda menor do acervo (só a `celula-nazir`,
       com 269, é menor) e por isso ela não tem variante de 1600 — o `-800` ao
       lado é redução de verdade, o mestre é o que veio. Na parede, onde a foto
       ocupa ~280px, sobra resolução; se um dia ela for para o palco ou para um
       vão grande, precisa de um original maior antes. */
    alt: "Três jovens posando embaixo de um pergolado de madeira numa chácara, um deles apontando para o outro",
    capitulo: "nos",
  },
  {
    id: "pintura-verde-e-amarela",
    src: "/radicais/pintura-verde-e-amarela.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes com o rosto pintado de verde e amarelo posando num salão de parede azul",
    capitulo: "nos",
  },
  {
    id: "polegar-para-cima",
    src: "/radicais/polegar-para-cima.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes ao lado de um homem de barba grisalha e óculos, um deles fazendo sinal de positivo",
    capitulo: "nos",
    camada: "meio",
  },
  {
    id: "quatro-amigas",
    src: "/radicais/quatro-amigas.jpg",
    w: 1600,
    h: 1200,
    alt: "Quatro amigas de camiseta rosa abraçadas e rindo, com o estacionamento e a cidade ao fundo",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "rapazes-sentados-a-noite",
    src: "/radicais/rapazes-sentados-a-noite.jpg",
    w: 1600,
    h: 1200,
    alt: "Fileira de rapazes sentados num muro de pedra à noite, de camisa de time",
    capitulo: "nos",
  },
  {
    id: "retrato-no-quintal",
    src: "/radicais/retrato-no-quintal.jpg",
    w: 1200,
    h: 1600,
    alt: "Rapaz de cabelo cacheado com a mão no queixo, olhando para a câmera no quintal, com amigos e uma piscina atrás",
    capitulo: "nos",
  },
  {
    id: "roda-vista-de-baixo",
    src: "/radicais/roda-vista-de-baixo.jpg",
    w: 960,
    h: 1280,
    alt: "Roda de jovens vista de baixo, os rostos debruçados sobre a câmera no escuro",
    capitulo: "nos",
  },
  {
    id: "rosto-pintado-de-verde",
    src: "/radicais/rosto-pintado-de-verde.jpg",
    w: 900,
    h: 1600,
    alt: "Jovem com o rosto pintado de verde e amarelo, de chapéu e com a bandeira do Brasil nos ombros",
    capitulo: "nos",
    camada: "longe",
  },
  {
    id: "rostos-amontoados",
    src: "/radicais/rostos-amontoados.jpg",
    w: 1080,
    h: 961,
    alt: "Selfie tirada de baixo, com cinco rostos de jovens amontoados sobre a câmera, todos rindo e fazendo careta",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "selfie-com-o-pastor",
    src: "/radicais/selfie-com-o-pastor.jpg",
    w: 960,
    h: 1280,
    alt: "Selfie de três pessoas num pavilhão de cadeiras brancas: o pastor à frente, um rapaz atrás fazendo sinal de paz e uma jovem de jaqueta bordô ao lado",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "selfie-consolidacao",
    src: "/radicais/selfie-consolidacao.jpg",
    w: 1600,
    h: 1200,
    alt: "Selfie de cinco jovens sentados na grama de uma praça no fim da tarde, todos sorrindo para a câmera",
    capitulo: "nos",
  },
  {
    id: "selfie-em-casa",
    src: "/radicais/selfie-em-casa.jpg",
    w: 1280,
    h: 960,
    alt: "Selfie de um grupo de jovens amontoados numa sala, fazendo caretas e sinais com as mãos",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "selfie-luz-rosa",
    src: "/radicais/selfie-luz-rosa.jpg",
    w: 1280,
    h: 960,
    alt: "Selfie de um grupo de amigas amontoadas, os rostos iluminados por uma luz rosa",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "selfie-muitos-rostos",
    src: "/radicais/selfie-muitos-rostos.jpg",
    w: 1280,
    h: 882,
    alt: "Selfie de perto com muitos rostos amontoados, todos rindo, num salão à noite",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "perto",
  },
  {
    id: "selfie-no-espelho",
    src: "/radicais/selfie-no-espelho.jpg",
    w: 960,
    h: 1280,
    alt: "Três moças em selfie no espelho de um banheiro, uma delas rindo debruçada",
    capitulo: "nos",
  },
  {
    id: "selfie-quatro-rostos",
    src: "/radicais/selfie-quatro-rostos.jpg",
    w: 899,
    h: 1599,
    alt: "Selfie girada com quatro rostos de moças empilhados na diagonal, todas rindo, num salão à noite",
    capitulo: "nos",
  },
  {
    id: "selfie-verde-e-amarelo",
    src: "/radicais/selfie-verde-e-amarelo.jpg",
    w: 1066,
    h: 1600,
    alt: "Selfie de uma moça de amarelo com o rosto pintado, e atrás dela um grupo de verde e amarelo",
    /* PASSOU PARA `encontros` quando a etapa 03 virou VÍNCULOS. Ver o
       comentário da composição `ENCONTROS`, na coreografia. */
    capitulo: "encontros",
    camada: "perto",
  },
  {
    id: "tres-de-bigode",
    src: "/radicais/tres-de-bigode.jpg",
    w: 1200,
    h: 1600,
    alt: "Três rapazes de bigode postiço posando sérios para a selfie dentro de um shopping",
    capitulo: "nos",
    camada: "perto",
  },
  {
    id: "tres-deitados-no-chao",
    src: "/radicais/tres-deitados-no-chao.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo posando numa sala clara, com três deles deitados no chão à frente",
    capitulo: "nos",
  },
  {
    id: "trio-revival",
    src: "/radicais/trio-revival.jpg",
    w: 1200,
    h: 1600,
    alt: "Três rapazes de camiseta bordô “revival” posando num salão vazio",
    capitulo: "nos",
  },
  {
    id: "turma-rapazes",
    src: "/radicais/turma-rapazes.jpg",
    w: 1600,
    h: 1066,
    alt: "Fileira de rapazes posando à noite, um deles de chapéu de palha e óculos escuros",
    capitulo: "nos",
  },];

export const porId = new Map(acervo.map((f) => [f.id, f]));

/**
 * O `srcset` de uma foto, montado a partir do que o `preparar-galeria.py`
 * grava: `<nome>-800.jpg` para toda foto acima de 800px, `<nome>.jpg` no
 * tamanho real, e `<nome>-grande.jpg` só para a do clímax.
 *
 * ISTO NÃO É OTIMIZAÇÃO PREVENTIVA — é o conserto de uma medição. Antes, o
 * `<img>` tinha `sizes` mas uma origem só, e `sizes` sem `srcset` não escolhe
 * nada: o celular baixava e decodificava o arquivo de 1600px para exibi-lo em
 * 300. No perfilador, com a CPU freada em 4×, o trecho pinado dava picos de
 * 283ms num quadro — vinte vezes o orçamento de 60fps —, e os picos caíam
 * exatamente nas viradas de cena, que é quando as `<img>` novas montam.
 *
 * A largura de 800 é declarada explicitamente em vez de derivada do nome do
 * arquivo em tempo de execução: o navegador precisa do número para escolher
 * ANTES de baixar qualquer coisa.
 *
 * O MURAL DEPENDE DISTO MAIS QUE O PALCO. São 111 imagens numa faixa que rola
 * para o lado; a de 800px é a que o navegador escolhe para praticamente todas
 * elas, e é a diferença entre a parede abrir e a aba engasgar.
 */
export function origensDaFoto(foto: FotoGaleria, incluirGrande = false): string {
  const partes: string[] = [];
  if (foto.w > 800) {
    /* A LARGURA DECLARADA NÃO É 800 EM RETRATO, e por uma revisão inteira foi.
       O `preparar-galeria.py` gera o arquivo pequeno com 800 no LADO MAIOR:
       uma foto deitada vira 800×533 e uma em pé vira 600×800. O `srcset`
       anunciava `800w` para as duas, então em toda foto em pé o navegador
       recebia a informação de que o arquivo tinha um terço a mais de pixels do
       que tem — e o escolhia para vãos onde ele não dava conta. O sintoma era
       foto em pé levemente macia, sem nada errado à vista no código.

       A conta devolve a largura real a partir da proporção, sem reprocessar
       arquivo nenhum: as 60 e tantas fotos em pé do acervo passam a dizer a
       verdade a partir daqui. */
    const largura = Math.round((800 * foto.w) / Math.max(foto.w, foto.h));
    partes.push(`${foto.src.replace(/\.jpg$/, "-800.jpg")} ${largura}w`);
  }
  partes.push(`${foto.src} ${foto.w}w`);
  // A versão de 2400px só entra quando a foto vai de fato ser ampliada. Numa
  // tela grande, oferecê-la sempre faria o navegador escolhê-la para o mosaico
  // — 2400px baixados para exibir 12vw.
  if (incluirGrande && foto.grande) partes.push(`${foto.grande} 2400w`);
  return partes.join(", ");
}

/* ═══════════════════════════════════════════════════════════════════════════
   A COREOGRAFIA — cinco composições e uma regra

   ── O RITMO, QUE É O ASSUNTO DESTA SEÇÃO ─────────────────────────────────

   A galeria tem QUATRO ETAPAS, e cada uma se atravessa em três movimentos:

       ENTRA    as fotos vêm das bordas e se encaixam no lugar
       PARA     nada se mexe. A palavra gigante atravessa a tela, a legenda
                aparece, e a composição fica montada para ser olhada
       SAI      as fotos voltam para as bordas enquanto a etapa seguinte chega

   A PARADA É A PEÇA QUE FALTAVA. Antes, toda foto estava sempre indo de um
   lugar para outro: o motor interpola da cena N para a N+1 e não havia duas
   cenas iguais, então a composição nunca chegava — ela passava. Quem rolava
   via uma deriva contínua de imagens que às vezes trocava de etiqueta, e não
   quatro etapas em que se entra e das quais se sai.

   O MECANISMO É UMA LINHA: duas cenas seguidas com os MESMOS quadros. O motor
   interpola entre elas e o resultado é imobilidade. `celulas` e `celulasFim`
   têm a mesma composição, e o trecho entre as duas é a parada.

   ── E POR QUE NÃO HÁ MAIS CLÍMAX ─────────────────────────────────────────

   Havia uma cena em que uma foto crescia até 92vw e o resto sumia, e ela
   custava duas coisas. A primeira era o ritmo: com a parada de cada etapa
   fazendo o seu trabalho, o clímax virava uma parada MUITO mais longa e sem
   composição nenhuma, bem no meio — a experiência engasgava ali. A segunda era
   que ele obrigava tudo em volta: só duas fotos do acervo têm resolução para
   92vw, as duas de culto, e por isso o clímax só podia morar em CULTOS e a
   etapa de ENCONTROS não achava lugar. Tirando o clímax, a estrutura ficou
   simétrica sozinha.

   ── AS COMPOSIÇÕES ───────────────────────────────────────────────────────

   Uma por etapa, mais o respiro do fim. Cada uma é um mapa de foto → quadro,
   escrito como se fosse a única coisa na tela — porque, durante a parada dela,
   é. As entradas e saídas NÃO são escritas à mão: `foraDoPalco()` deriva delas
   o lugar de fora da tela por onde cada foto entra e sai.

   COMO LER UM QUADRO: `x`/`y` é o CENTRO da foto em % do palco, `largura` é em
   vw, `giro` em graus. A composição foi escrita para 16:9; em telas mais altas
   o palco encolhe junto (ver `--palco-*` no CSS) e as proporções entre as
   fotos se mantêm. A altura que uma foto ocupa, em % do palco, é a largura
   dela vezes `h/w` vezes 1.78 — é essa conta que decide se duas se tocam.

   ── A FAIXA DO MEIO É DA PALAVRA ─────────────────────────────────────────

   AS QUATRO COMPOSIÇÕES SÃO ANEIS: fotos em cima, fotos embaixo, fotos nas
   duas bordas, e no meio a palavra gigante sozinha. Antes não era assim — a
   maior foto de cada etapa morava no centro (`sala-de-casa-poses` em 48/44,
   `palavra-no-escuro` em 50/59, `parque-fim-de-tarde` em 45/40) e comia a
   palavra inteira: COMUNHÃO aparecia partida ao meio, ALIMENTO sumia atrás do
   pregador. O letreiro é a única coisa da galeria que NOMEIA a etapa, e ele
   estava sendo usado como textura debaixo das fotos em vez de ser lido.

   A FAIXA A PRESERVAR, em coordenadas de palco: `y` de 41 a 59 no desktop, e
   entre 46 e 53 no celular (lá a palavra ocupa menos altura porque o corpo
   trava no mínimo de 90px enquanto a tela é o dobro de alta). Nas duas, a
   faixa vale de ponta a ponta em `x`.

   ENCOSTAR NAS PONTAS PODE, atravessar não. Uma foto na borda esquerda ou
   direita pode invadir a faixa e cobrir as primeiras ou as últimas letras —
   `palavra-no-escuro` e `rapazes-na-calcada` fazem isso em CULTOS de
   propósito, e é o que impede o anel de virar duas fileiras paradas. O que
   nenhuma pode é cruzar o miolo: entre 20% e 80% de `x`, a faixa fica limpa.

   O QUE DECIDE ONDE UMA FOTO CABE É A ALTURA DELA, não o gosto. Um retrato de
   1.5 a 13vw ocupa 35% da altura do palco e só cabe colado no topo ou no pé;
   uma paisagem de 0.56 a 16vw ocupa 16% e pode chegar a dez pontos da faixa.
   Por isso as fotos mais baixas de cada etapa são as que abraçam a palavra e
   as mais altas ficam nos cantos — é o que mantém o vazio do meio com cara de
   respiro em vez de corredor.

   E ISSO VALE DUAS VEZES, porque a mesma coordenada serve às duas telas. No
   celular a foto é 2,4× mais larga mas RELATIVAMENTE mais baixa (a tela é
   alta), então quem passa no desktop passa lá — o contrário não é verdade, e
   é por isso que a conferência de cada mudança se faz pelo desktop.

   ── A REGRA QUE A CONFERÊNCIA IMPÕE ──────────────────────────────────────

   TODA FOTO VISÍVEL NUMA ETAPA PERTENCE AO CAPÍTULO DELA. Sem exceção, e a
   exceção é justamente o que já esteve quebrado: a cena da palavra CÉLULA
   mostrava telão, pregação e batismo com a etiqueta ao lado dizendo CULTOS.
   O teste é mecânico e roda em `verificarCenas()`, no fim deste arquivo.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * O quadro de fora da tela por onde uma foto entra e sai: o MESMO lugar,
 * empurrado para além da borda mais próxima, menor, mais torto e invisível.
 *
 * ESTA FUNÇÃO SUBSTITUIU OITENTA LINHAS DE COORDENADAS ESCRITAS À MÃO, e a
 * troca não é de estilo. Antes, cada cena repetia todas as fotos da cena
 * vizinha em posições de borda inventadas uma a uma — e como as posições de
 * borda tinham de combinar com as de dentro, mover uma foto três pontos para a
 * esquerda pedia editar quatro lugares. Quem esquecesse um deles não via erro
 * nenhum: via a foto entrar de um canto e sair por outro.
 *
 * Agora a composição é a única fonte. Trocar uma foto de lugar (ou trocar a
 * foto) reescreve sozinha a entrada e a saída dela.
 *
 * A DIREÇÃO SAI DO PRÓPRIO QUADRO: a foto é empurrada na direção que já a
 * afasta do centro. Assim quem mora à esquerda entra pela esquerda, e as
 * saídas de uma composição se abrem em leque em vez de escorregarem todas para
 * o mesmo lado.
 *
 * A DISTÂNCIA É O MAIOR ENTRE 62 PONTOS DO CENTRO E 45 PONTOS DE ONDE A FOTO
 * ESTÁ, e o segundo termo não é redundância. O anel de cada etapa mora nas
 * bordas, e várias fotos ficam além dos 62 pontos por si só — `celula-nazir`
 * em 95%, `bandeira-revival` em 94%, `rapazes-na-calcada` em 91%. Para elas o
 * primeiro critério sozinho dava uma viagem de seis pontos: não entravam nem
 * saíam, só piscavam no lugar. Com o mínimo de 45, toda foto percorre uma
 * distância parecida, esteja ela onde estiver.
 *
 * O caso do CENTRO é o único que precisa de decisão: uma foto em (50, 50) não
 * tem direção nenhuma, e a conta dividiria por quase zero. Ela desce — é a
 * saída que menos disputa com as outras, que quase sempre são laterais.
 */
function foraDoPalco(quadro: Quadro): Quadro {
  const dx = quadro.x - 50;
  const dy = quadro.y - 50;
  const maior = Math.max(Math.abs(dx), Math.abs(dy));
  const [ux, uy] = maior < 8 ? [0, 1] : [dx / maior, dy / maior];
  const alcance = Math.max(62, maior + 45);
  return {
    x: Math.round((50 + ux * alcance) * 10) / 10,
    y: Math.round((50 + uy * alcance) * 10) / 10,
    // Menor e mais torta: a foto que chega vem de longe, e a que sai já
    // desistiu. Sem isto a entrada é um deslize plano, sem profundidade.
    largura: Math.round(quadro.largura * 0.85 * 10) / 10,
    giro: Math.round(quadro.giro * 1.5 * 10) / 10,
    opacidade: 0,
  };
}

/** As mesmas fotos, todas nas bordas e invisíveis. É o que uma cena de troca
 *  guarda da etapa vizinha — a que está chegando ou a que acabou de sair. */
function nasBordas(composicao: Record<string, Quadro>): Record<string, Quadro> {
  return Object.fromEntries(
    Object.entries(composicao).map(([id, q]) => [id, foraDoPalco(q)])
  );
}

/* ── A ABERTURA ────────────────────────────────────────────────────────────
   As cinco cartas agrupadas no meio da tela, do jeito que o Ato I as entrega.
   É a ÚNICA composição que mistura capítulos, e ela pode porque não tem
   etiqueta: sem rótulo na tela, não há o que a imagem desminta.

   UMA DELAS FICA — `gramado-fim-de-tarde` é a única das cinco que também está
   na composição de CÉLULAS, então ela não sai: cresce e vai para o lugar dela.
   É o fio que costura o mosaico à primeira etapa, e um só basta. As outras
   quatro saem, cada uma por uma borda diferente, para a saída não ler como um
   bloco escorregando. */
const ABERTURA_QUE_FICA: Record<string, Quadro> = {
  "gramado-fim-de-tarde": { x: 50, y: 55, largura: 11, giro: -1.4, opacidade: 1 },
};

const ABERTURA_QUE_SAI: Record<string, Quadro> = {
  "mesa-de-restaurante": { x: 46, y: 48, largura: 13, giro: -2, opacidade: 1 },
  "roda-na-grama": { x: 42, y: 53, largura: 8, giro: 1.6, opacidade: 1 },
  "abraco-forte": { x: 55, y: 43, largura: 9, giro: 2, opacidade: 1 },
  "selfie-luz-rosa": { x: 58, y: 51, largura: 10, giro: -1.8, opacidade: 1 },
};

/* ── 01 CÉLULAS ────────────────────────────────────────────────────────────
   NOVE FOTOS, TODAS DEITADAS, e a ausência de retrato é regra do assunto e não
   gosto: célula é turma reunida numa sala, e turma reunida se fotografa na
   horizontal. A composição anterior tinha três slots verticais (`mesa-de-
   lanche`, `tres-na-sala-clara`, `roda-na-grama`) e eles só existiam porque as
   fotos que havia à mão eram verticais — selfie de sala, mesa de lanchonete,
   roda de amigas. Não eram células.

   Cinco destas vêm de `public/celulas/`, fotografadas pelos próprios líderes:
   `celula-shalom`, `celula-united`, `celula-valentes`, `celula-aprisco` e
   `celula-nazir`. Elas pisam no palco e não entram no mural (ver `foraDoMural`,
   no tipo `FotoGaleria`).

   AS TRÊS LARGURAS QUE MUDARAM são as dos slots que eram verticais: um retrato
   de 9vw e uma paisagem de 9vw têm a mesma largura e menos da metade da altura,
   então trocar a foto sem trocar a medida deixaria três selos achatados nos
   cantos. Foram para 15, 16 e 14vw.

   O CANTO DE BAIXO À ESQUERDA FICA VAZIO de propósito — é onde a legenda mora
   nesta etapa. Vale para as quatro composições: ela abre o buraco, a legenda
   ocupa. Por isso a fileira de baixo começa em `celula-valentes`, a 44% de
   `x`: a legenda ocupa de 7 a 26 e a foto entra logo depois dela.

   É O ANEL MAIS FOLGADO DAS QUATRO, porque as nove são deitadas. `sala-de-casa-
   poses` e `celula-valentes`, as duas mais largas e baixas (0.56 de razão), são
   as que chegam mais perto da palavra — uma por cima, a 28% de `y`, outra por
   baixo, a 77%. As duas fotos de camada `longe` que sobraram vão para as
   bordas laterais, na altura da palavra: `camisas-do-brasil` à esquerda e
   `celula-nazir` à direita, desfocadas, encostando em COMUNHÃO sem cobrir uma
   letra inteira. */
const CELULAS: Record<string, Quadro> = {
  "celula-shalom": { x: 15, y: 20, largura: 19, giro: -1.1, opacidade: 1 },
  "sala-de-casa-poses": { x: 44, y: 17, largura: 25, giro: -0.6, opacidade: 1 },
  "selfie-luzinhas": { x: 70, y: 30, largura: 16, giro: 1.2, opacidade: 1 },
  "gramado-fim-de-tarde": { x: 93, y: 22, largura: 12, giro: -2.2, opacidade: 0.85 },
  "camisas-do-brasil": { x: 5, y: 52, largura: 15, giro: 0.8, opacidade: 0.85 },
  "celula-nazir": { x: 95, y: 50, largura: 13, giro: 1.4, opacidade: 0.85 },
  "celula-valentes": { x: 44, y: 70, largura: 16, giro: 1.5, opacidade: 1 },
  "celula-united": { x: 74, y: 81, largura: 19, giro: -1.2, opacidade: 1 },
  "celula-aprisco": { x: 93, y: 76, largura: 14, giro: -1.8, opacidade: 1 },
};

/* ── 02 CULTOS ─────────────────────────────────────────────────────────────
   NOVE FOTOS, E A COLUNA DO PREGADOR É O ASSUNTO — só que agora ela é a coluna
   DA ESQUERDA. `palavra-no-escuro` ocupa 18vw por quase metade da altura do
   palco, sobe do pé da tela até a linha da palavra e é a única composição da
   galeria construída em torno de UMA figura em vez de um arranjo. Culto tem
   alguém falando na frente; a composição faz a mesma coisa.

   ELA MORAVA NO MEIO, a 26vw e 69% de altura, e era o pior caso da galeria
   inteira: o pregador cobria ALIMENTO da letra L ao T e não sobrava palavra
   para ler. Encostado na borda esquerda ele cobre a primeira letra e o resto
   do letreiro atravessa a tela por cima do ombro dele — que é, aliás, a
   composição que a fotografia de culto já tem: o pregador de um lado, o salão
   se abrindo do outro.

   O ESCURO É MATERIAL AQUI. Metade destas fotos é salão apagado com um facho
   de luz — `palavra-no-escuro`, `microfone-luz-quente`, `jaqueta-college`,
   `telao-adoracao` —, e elas se sustentam justamente por serem quase pretas
   contra o fundo quase preto: o que se vê é o recorte de luz, não o retângulo
   da foto. É o oposto de CÉLULAS, que é toda sala acesa.

   `microfone-luz-quente` é a única foto de camada `fundo` da galeria: ela
   atravessa POR TRÁS da palavra gigante, e é a ÚNICA que pode morar no meio da
   faixa — a 0.24 de opacidade e atrás do letreiro, ela não disputa a leitura,
   dá fundo a ela.
   Fica grande e apagada porque a passagem precisa ser PERCEBIDA — pequena e
   opaca, ninguém nota; grande e nítida, vira um torso leitoso no meio da tela
   e as fotos em volta parecem colocadas sobre ele por engano. A regra que
   ficou: maior que as vizinhas, mais apagada que o fundo.

   TRÊS SANGRAM PELA BORDA de propósito: `telao-rl` encosta no canto de cima à
   esquerda, `culto-lotado` sai pela esquerda na altura da palavra e
   `rapazes-na-calcada` passa da direita. Uma parte de cada uma fica fora da
   tela mesmo durante a parada, e é isso que diz ao olho que a composição
   continua além do quadro.

   AS DUAS QUE ENCOSTAM NA PALAVRA são justamente as das bordas —
   `palavra-no-escuro` à esquerda e `rapazes-na-calcada` à direita — e é a
   única etapa em que isso acontece nas duas pontas ao mesmo tempo. O miolo do
   letreiro continua limpo; o que essas duas fazem é fechar o anel, para
   ALIMENTO parecer atravessar por trás da cena e não flutuar num vão.

   `rapazes-na-calcada` É A ÚNICA DE RUA, e ela fecha a etapa à direita porque
   é o que a legenda diz: o culto transbordando para a calçada. Ver o
   comentário no acervo, junto da foto.

   A LEGENDA MORA EM CIMA DE `telao-rl`, e não é descuido — é a única
   composição em que ela cai sobre uma foto. A foto é um salão lotado visto de
   longe, escuro e sem rosto legível no tamanho em que aparece; a sombra do
   texto dá conta. Foi assim que a disposição chegou pronta. */
const CULTOS: Record<string, Quadro> = {
  "telao-rl": { x: 15, y: 17, largura: 24, giro: -1.2, opacidade: 0.9 },
  "equipe-com-flores": { x: 84, y: 16, largura: 19, giro: 1.4, opacidade: 1 },
  "culto-lotado": { x: 5, y: 45, largura: 13, giro: -2.5, opacidade: 0.85 },
  "microfone-luz-quente": { x: 58, y: 50, largura: 12, giro: 1.1, opacidade: 0.24 },
  "palavra-no-escuro": { x: 13, y: 72, largura: 18, giro: -0.5, opacidade: 1 },
  "telao-adoracao": { x: 43, y: 84, largura: 11, giro: -2.4, opacidade: 0.8 },
  "jaqueta-college": { x: 68, y: 84, largura: 13, giro: 1.6, opacidade: 1 },
  "adoracao-camiseta-branca": { x: 50, y: 32, largura: 13, giro: 2.2, opacidade: 1 },
  "rapazes-na-calcada": { x: 91, y: 70, largura: 17, giro: -1.3, opacidade: 1 },
};

/* ── 03 ENCONTROS ──────────────────────────────────────────────────────────
   A ETAPA MUDOU DE ASSUNTO, e a composição é a consequência. Ela nasceu como
   "o Encontro" — o retiro, o fim de semana que vira a chave — e o acervo dela
   eram 23 fotos de TURMA, cem pessoas por quadro, cada rosto do tamanho de um
   grão. Agora a palavra é VÍNCULOS e a legenda diz "aqui a gente cria
   vínculos": o assunto deixou de ser o evento e passou a ser o que sobra dele.

   Por isso aqui há duas selfies, três rodas de amigas e um parque, e só duas
   fotos de multidão — a bandeira do REVIVAL e a turma no salão, que entram
   pequenas e apagadas, nas bordas. A multidão virou o CONTEXTO em que os
   vínculos acontecem, em vez de ser o assunto.

   SETE DESTAS OITO MUDARAM DE CAPÍTULO para caber aqui: vieram de `nos`, de
   `celulas` e de `cultos`. Não é malabarismo para calar a conferência — é a
   conferência funcionando: ela obriga a decidir, foto por foto, se a imagem
   diz o que a etiqueta promete. Sob VÍNCULOS, um grupo de amigas à mesa e uma
   turma no parque dizem exatamente isso.

   `parque-fim-de-tarde` É A ÂNCORA, a 28vw no alto à esquerda — a maior foto
   de qualquer composição da galeria. Ela pode porque é a única em que dá para
   contar os rostos E ver o lugar: trinta rapazes na grama, os ipês roxos, as
   sombras compridas do fim de tarde. É uma foto de vínculo e de tempo ao
   mesmo tempo.

   ELA ERA 31vw NO MEIO DA TELA e desceu três pontos para caber acima da faixa
   da palavra: a 28vw ela ocupa 37% da altura do palco, e centrada em 26% de
   `y` o pé dela para a nove pontos de VÍNCULOS. Continua sendo a maior; deixou
   de ser a que cobre o letreiro.

   ELA SAIU DO RESPIRO PARA VIR PARA CÁ. O respiro do fim (etapa 04) tinha
   ela, `roda-na-palmeira` e `mural-de-asas`; no lugar dela entrou
   `fogueira-a-noite`, que é `nos` e serve à mesma frase ("aqui a gente
   vive."). Uma foto não pode estar em dois capítulos, e o respiro herda a
   etiqueta de NÓS.

   O CANTO DE BAIXO À DIREITA FICA VAZIO — é onde a legenda mora nesta etapa,
   e é o único caso em que ela não está à esquerda. Por isso o anel daqui é
   assimétrico: as duas fotos de baixo (`roda-de-amigas` e `amigas-arrumadas`)
   ficam as duas à esquerda, e a coluna da direita se fecha com as duas de
   multidão empilhadas na borda — `bandeira-revival` na altura da palavra e
   `culto-turma-no-salao` logo abaixo, ambas desfocadas na camada `longe`. */
const ENCONTROS: Record<string, Quadro> = {
  "selfie-muitos-rostos": { x: 8, y: 22, largura: 11, giro: 1.6, opacidade: 1 },
  "parque-fim-de-tarde": { x: 31, y: 26, largura: 28, giro: -0.7, opacidade: 1 },
  "mocas-na-parede-laranja": { x: 81, y: 30, largura: 20, giro: 1.2, opacidade: 1 },
  "bandeira-revival": { x: 94, y: 56, largura: 13, giro: 2.1, opacidade: 0.9 },
  "selfie-verde-e-amarelo": { x: 7, y: 69, largura: 12, giro: -1.8, opacidade: 1 },
  "culto-turma-no-salao": { x: 93, y: 76, largura: 21, giro: -1.1, opacidade: 0.85 },
  "roda-de-amigas": { x: 22, y: 84, largura: 18, giro: 1.5, opacidade: 1 },
  "amigas-arrumadas": { x: 42, y: 86, largura: 17, giro: -1.4, opacidade: 1 },
};

/* ── 04 NÓS ────────────────────────────────────────────────────────────────
   SEIS FOTOS, e é a composição mais vazia da galeria de propósito. As outras
   três etapas têm oito ou nove; esta tem seis e muito preto em volta. Depois
   de CÉLULAS cheia de sala acesa, CULTOS cheia de salão e ENCONTROS cheia de
   turma, a última etapa afrouxa — e é o afrouxamento que prepara o respiro e o
   Ato III, que vêm logo depois. Encher esta tela seria não deixar a
   experiência desacelerar em lugar nenhum.

   AQUI NINGUÉM POSA EM FILEIRA. Repare no que estas seis têm em comum: gente
   ajoelhada no chão, gente deitada em cima de gente, rostos amontoados
   fotografados de baixo, um abraço em roda na calçada. É o oposto da foto de
   turma — não há uma única fileira organizada na etapa toda. "Família" não se
   fotografa em fileira.

   AS SEIS JÁ ERAM `nos` — não houve uma reclassificação sequer nesta etapa,
   contra sete na anterior. É o sinal de que o capítulo e a etapa voltaram a
   dizer a mesma coisa aqui: o acervo de `nos` sempre foi isto.

   É A ÚNICA COMPOSIÇÃO SEM NENHUMA FOTO NA CAMADA `longe`. Havia uma — um
   rosto pintado de verde, no canto de baixo à esquerda — e ela saiu. Não faz
   falta estrutural (nada obriga uma etapa a ter as três camadas), mas tem duas
   consequências que valem saber antes de mexer aqui: o canto ESQUERDO da tela
   ficou vazio acima da legenda, e no celular esta etapa passou a mostrar as
   seis fotos, porque é a camada `longe` que o CSS esconde lá.

   ── OS SETE PONTOS QUE ESTA COMPOSIÇÃO TEM A MAIS QUE AS OUTRAS ──────────

   Todo `y` daqui está escrito ACIMA de onde a foto aparece, e isso NÃO é a
   composição: é a compensação de uma deriva que só se vê aqui.

   As camadas sobem ao longo do pin (ver `DERIVA` no motor): a `perto` desliza
   9,2% de altura do começo ao fim, a `meio` 5,6%, a `longe` 2,8%. É o parallax
   que dá profundidade, e ele é cumulativo — no começo da rolagem vale zero e
   no fim vale tudo. CÉLULAS, que acontece em 14% do pin, sobe 1,3 ponto e
   ninguém nota. NÓS acontece em 74% e sobe quase 7.

   Na tela isso apareceu do jeito mais óbvio possível: a composição encostada
   no topo, a primeira foto cortada pela borda de cima, e um vão preto de um
   quarto da altura sobrando embaixo. Os números daqui já vêm com a deriva
   somada: 6,9 pontos para as fotos de camada `perto` e 4,2 para as de `meio`.
   Uma foto escrita em `y: 81` é uma foto que o visitante vê em 74.

   ⚠️ SE AS FAIXAS DAS CENAS MUDAREM, esta compensação sai de calibragem — ela
   supõe que a parada de NÓS mora perto de 74% do pin. É o preço de compensar
   aqui em vez de mexer na `DERIVA`, que teria mudado as quatro etapas de uma
   vez para consertar a última.

   ── O ANEL, COM SEIS FOTOS ───────────────────────────────────────────────

   Três em cima e três embaixo, e nada nas bordas laterais: é a única etapa que
   deixa as duas pontas de FAMÍLIA inteiramente livres. Com seis fotos não há
   com que fechar os lados sem abrir um buraco em outro lugar, e uma palavra
   sem nada encostando nela é o que a última etapa quer dizer de qualquer
   jeito. O canto de baixo à esquerda continua sendo da legenda — por isso a
   fileira de baixo só começa em 48% de `x`. */
const NOS: Record<string, Quadro> = {
  "ajoelhados-na-noite": { x: 20, y: 28, largura: 13, giro: -1.6, opacidade: 1 },
  "quatro-amigas": { x: 50, y: 28, largura: 19.5, giro: 1.2, opacidade: 1 },
  "selfie-com-o-pastor": { x: 80, y: 30, largura: 15, giro: 1.7, opacidade: 1 },
  "abraco-na-calcada": { x: 48, y: 78, largura: 17, giro: 1.5, opacidade: 1 },
  "deitados-nas-almofadas": { x: 72, y: 76, largura: 11, giro: -1.9, opacidade: 1 },
  "rostos-amontoados": { x: 90, y: 81, largura: 19.5, giro: 1.9, opacidade: 1 },
};

/* ── O RESPIRO ─────────────────────────────────────────────────────────────
   Três fotos, pequenas, a 85% de opacidade, e muito vazio. Ainda é NÓS — não
   há etiqueta nova aqui —, e a legenda final é a única com ponto final e a
   única em corpo grande.

   É UM CODA, E POR ISSO MISTURA CAPÍTULOS. Repare no que são as três:
   `farinha-no-rosto` é de `nos`, `cartazes-de-batismo` é de `cultos` e
   `tres-na-sala-clara` é de `celulas`. Uma de cada. Não é descuido — é o que
   "aqui a gente vive." quer dizer depois de quatro etapas: a vida é as
   quatro juntas, não a quarta. A cena carrega `misturaCapitulos` para a
   conferência saber que aqui a regra não se aplica (ver o tipo `Cena`), e
   essa é a única cena com palavra ou legenda que a carrega.

   O respiro é o que impede o Ato III de começar em corte seco. Nenhuma das
   três reaparece lá — no Ato III são outras quatro, todas de gente de costas,
   de cabeça para baixo ou indo embora. Se fossem as mesmas, a saída leria como
   repetição em vez de despedida.

   OS `y` DAQUI TAMBÉM ESTÃO COMPENSADOS, pela mesma razão que os de `NOS`: o
   respiro mora em 94% do pin, onde a deriva da camada `meio` já subiu 5,3
   pontos. As três são `meio`, então a compensação é uniforme — some 5,3 de
   cada `y` e você tem o que a tela mostra.

   AS TRÊS CRESCERAM UNS 45% em relação ao primeiro corte (9,9 / 12,1 / 8,7 vw
   viraram 14,5 / 17,5 / 12,5). O que estava errado não era o tamanho sozinho,
   era o tamanho CONTRA o espaçamento: três fotos pequenas espalhadas por uma
   tela inteira leem como três selos perdidos, não como um respiro. Crescendo,
   o vazio entre elas vira pausa em vez de vão.

   E A LEGENDA DESCEU DE 49 PARA 58 por causa disso. "aqui a gente vive." é a
   única legenda em corpo grande da galeria e ocupa uns 28vw; com a foto da
   esquerda a 14,5vw, as duas passaram a disputar a mesma faixa de tela. Não é
   ajuste de gosto — em 49 o texto atravessava a foto. */
const RESPIRO: Record<string, Quadro> = {
  "farinha-no-rosto": { x: 26, y: 28, largura: 14.5, giro: 0.7, opacidade: 0.85 },
  "cartazes-de-batismo": { x: 68, y: 52, largura: 17.5, giro: 1, opacidade: 0.85 },
  "tres-na-sala-clara": { x: 45, y: 80, largura: 12.5, giro: -1.3, opacidade: 0.85 },
};

/* ═══════════════════════════════════════════════════════════════════════════
   AS CENAS

   Onze marcos, e quase nenhum quadro escrito aqui: cada cena é uma composição
   mais o que as regras acima derivam. A leitura de cima a baixo é o roteiro.

     abertura       o mosaico. Durante ela, CÉLULAS chega das bordas
     celulas        PARADA · a palavra Comunhão atravessa
     celulasFim     mesma composição · durante ela, CÉLULAS sai e CULTOS chega
     cultos         PARADA · Propósito
     cultosFim      troca
     encontros      PARADA · Recomeço
     encontrosFim   troca
     nos            PARADA · Família
     nosFim         troca
     respiro        PARADA final · "aqui a gente vive."
     repouso        não é cena: é o destino do respiro, em 1.00

   AS FAIXAS: 0.09 para cada troca, 0.11 para cada parada. A parada é mais
   longa que a troca de propósito — é ela que o visitante lê como "cheguei numa
   etapa", e uma parada mais curta que o movimento que a precede não se
   percebe como parada, se percebe como o movimento tendo terminado.
   ═══════════════════════════════════════════════════════════════════════════ */

export const cenas: Cena[] = [
  {
    id: "abertura",
    faixa: [0, 0.09],
    quadros: {
      // CÉLULAS esperando nas bordas: é durante a abertura que ela chega
      ...nasBordas(CELULAS),
      ...ABERTURA_QUE_FICA,
      ...ABERTURA_QUE_SAI,
    },
  },

  {
    id: "celulas",
    faixa: [0.09, 0.2],
    palavra: "Comunhão",
    legenda: "aqui a gente se edifica",
    realce: "edifica",
    legendaEm: [7, 78],
    capitulo: { indice: "01", id: "celulas", rotulo: "Células" },
    quadros: { ...CELULAS, ...nasBordas(ABERTURA_QUE_SAI) },
  },

  {
    id: "celulasFim",
    faixa: [0.2, 0.29],
    quadros: { ...CELULAS, ...nasBordas(CULTOS) },
  },

  {
    id: "cultos",
    faixa: [0.29, 0.4],
    palavra: "Alimento",
    legenda: "aqui a gente transborda",
    realce: "transborda",
    legendaEm: [8, 22],
    capitulo: { indice: "02", id: "cultos", rotulo: "Cultos" },
    quadros: { ...CULTOS, ...nasBordas(CELULAS) },
  },

  {
    id: "cultosFim",
    faixa: [0.4, 0.49],
    quadros: { ...CULTOS, ...nasBordas(ENCONTROS) },
  },

  {
    id: "encontros",
    faixa: [0.49, 0.6],
    palavra: "Vínculos",
    legenda: "aqui a gente cria vínculos",
    realce: "vínculos",
    legendaEm: [58, 82],
    capitulo: { indice: "03", id: "encontros", rotulo: "Encontros" },
    quadros: { ...ENCONTROS, ...nasBordas(CULTOS) },
  },

  {
    id: "encontrosFim",
    faixa: [0.6, 0.69],
    quadros: { ...ENCONTROS, ...nasBordas(NOS) },
  },

  {
    id: "nos",
    faixa: [0.69, 0.8],
    palavra: "Família",
    legenda: "aqui a gente encontra família",
    realce: "família",
    /* 90, e não 78: a camada das legendas é a que mais deriva no pin (10,4%
       contra 9,2% da `perto`), então aqui ela chega à tela quase 8 pontos
       acima do que este número diz. Ver a compensação em `NOS`. */
    legendaEm: [8, 90],
    capitulo: { indice: "04", id: "nos", rotulo: "Nós" },
    quadros: { ...NOS, ...nasBordas(ENCONTROS) },
  },

  {
    id: "nosFim",
    faixa: [0.8, 0.89],
    quadros: { ...NOS, ...nasBordas(RESPIRO) },
  },

  {
    id: "respiro",
    faixa: [0.89, 1],
    legenda: "aqui a gente vive.",
    /* 58: a camada das legendas deriva 10,4% ao longo do pin e aqui já gastou
       quase tudo, então na tela isto vira 48. Ver a compensação em `RESPIRO`. */
    legendaEm: [12, 58],
    misturaCapitulos: true,
    quadros: { ...RESPIRO, ...nasBordas(NOS) },
  },

  {
    /* REPOUSO — não é uma cena, é o destino do respiro. O usuário nunca vê
       este estado parado: ele chega nele no último quadro do pin e o Ato III
       começa logo em seguida. Sem esta entrada, o respiro não teria para onde
       interpolar e as três últimas fotos congelariam no meio do movimento. */
    id: "repouso",
    faixa: [1, 1],
    // Mesmas três do respiro, e pela mesma razão: uma de cada capítulo.
    misturaCapitulos: true,
    quadros: {
      "farinha-no-rosto": { x: 25, y: 30, largura: 13.5, giro: 0.5, opacidade: 0.7 },
      "cartazes-de-batismo": { x: 69, y: 53, largura: 16, giro: 0.8, opacidade: 0.7 },
      "tres-na-sala-clara": { x: 44, y: 82, largura: 11.5, giro: -1.1, opacidade: 0.7 },
    },
  },
];

/**
 * Os quadros de uma foto em TODAS as cenas, com os buracos preenchidos.
 *
 * Uma foto ausente de uma cena fica exatamente onde estava, invisível: antes
 * da primeira aparição ela espera no lugar da primeira; depois da última, ela
 * fica onde a última a deixou. É isso que faz entrada e saída acontecerem por
 * transparência, sem a foto saltar de um canto para o outro.
 *
 * MORAVA NO MOTOR e subiu para cá porque passou a ter dois leitores: o motor,
 * que monta os tweens, e `emMovimentoNaCena`, que precisa saber se uma foto
 * muda de um marco para o outro. Duas cópias da regra de preenchimento é o
 * tipo de divergência que ninguém percebe até o `will-change` estar ligado nas
 * fotos erradas.
 */
export function quadrosDaFoto(id: string): Quadro[] {
  const definidos = cenas.map((c) => c.quadros[id]);
  const cheios: Quadro[] = [];
  let ultimo: Quadro | undefined;

  for (let i = 0; i < definidos.length; i++) {
    const atual = definidos[i];
    if (atual) {
      cheios.push(atual);
      ultimo = atual;
      continue;
    }
    const proximo = definidos.slice(i).find(Boolean);
    const base = ultimo ?? proximo;
    cheios.push({ ...(base as Quadro), opacidade: 0 });
  }

  return cheios;
}

/**
 * AS QUATRO ETAPAS — a estrutura que o visitante enxerga no canto da tela.
 *
 * SAI DAS CENAS. Uma etapa é o trecho em que a composição dela está na tela;
 * escrever isso à mão numa segunda lista seria manter dois relógios e
 * descobrir o desencontro só quando a barra de uma terminasse no meio da
 * outra.
 *
 * A FAIXA COMEÇA NA TROCA, NÃO NA PARADA, e essa linha é o desenho todo. A
 * cena que declara o capítulo é a PARADA — o momento em que a composição está
 * montada. Mas a etapa começa antes: começa quando as fotos dela entram, na
 * cena de troca anterior. Fazendo a faixa começar ali, a etiqueta acende junto
 * com a primeira foto que chega e apaga junto com a primeira que sai, em vez
 * de aparecer depois de o visitante já estar olhando a composição pronta.
 *
 * O efeito na tela é o encadeamento: 01 CÉLULAS enche o próprio traço, apaga
 * quando as células começam a sair, e 02 CULTOS acende no mesmo instante. Uma
 * por vez, do começo ao fim.
 */
export type Etapa = {
  id: Capitulo;
  /** "01" a "04". Escrito, e não derivado do índice, porque é texto de tela. */
  indice: string;
  rotulo: string;
  faixa: [number, number];
};

/**
 * Os índices das cenas que DECLARAM capítulo — as quatro paradas.
 *
 * Estava dentro do corpo de `etapas` e saiu para cá quando `fotosDaEtapa` e
 * `etapaDaCena` passaram a precisar da mesma conta. Três derivações lendo a
 * mesma lista é o que garante que elas não possam discordar sobre onde uma
 * etapa começa.
 */
const paradas = cenas.map((c, i) => (c.capitulo ? i : -1)).filter((i) => i >= 0);

/** Em que CENA a etapa da parada `i` começa: na cena de troca anterior. */
const cenaDeEntrada = (i: number) => Math.max(0, i - 1);

export const etapas: Etapa[] = (() => {
  /** Onde a etapa da parada `i` começa: no início da cena de troca anterior. */
  const entradaDe = (i: number) => cenas[i - 1]?.faixa[0] ?? cenas[i].faixa[0];

  return paradas.map((i, k) => {
    const proxima = paradas[k + 1];
    return {
      id: cenas[i].capitulo!.id,
      indice: cenas[i].capitulo!.indice,
      rotulo: cenas[i].capitulo!.rotulo,
      faixa: [entradaDe(i), proxima === undefined ? 1 : entradaDe(proxima)] as [
        number,
        number,
      ],
    };
  });
})();

/**
 * A ETAPA DE CADA CENA — a mesma conta que acende a etiqueta no canto da tela,
 * agora legível por índice de cena.
 *
 * `etapas` responde em progresso do pin (0 a 1), que é o que o motor anima; o
 * componente tem na mão a CENA em curso, que é outro sistema de coordenadas.
 * Converter um no outro no componente daria uma terceira cópia da regra de
 * onde uma etapa começa — e a regra é sutil (começa na troca, não na parada).
 *
 * A cena 0, a abertura, cai em CÉLULAS: é durante ela que as células chegam
 * das bordas, e é o que o trilho já mostra. O respiro cai em NÓS pela mesma
 * razão, do outro lado.
 */
export const etapaDaCena: Capitulo[] = cenas.map((_, i) => {
  let atual = cenas[paradas[0]].capitulo!.id;
  for (const parada of paradas) {
    if (i >= cenaDeEntrada(parada)) atual = cenas[parada].capitulo!.id;
  }
  return atual;
});

/**
 * AS FOTOS DE CADA ETAPA — a composição montada, e nada além dela.
 *
 * É o que o painel da foto ampliada oferece como "o que mais tem aqui". A
 * versão anterior oferecia quatro fotos quaisquer do mesmo CAPÍTULO, tiradas
 * do acervo inteiro — e capítulo não é o que o visitante está vendo. Ele
 * estava na etapa CÉLULAS, com nove fotos na tela, e o painel sugeria três
 * fotos de mural que nunca pisaram no palco e uma quarta de outra composição.
 * Um "veja também" que aponta para fora do que está na tela não é sugestão, é
 * ruído.
 *
 * SAI DA PARADA, não da faixa inteira da etapa. A parada é a cena em que a
 * composição está MONTADA — as fotos da troca anterior ainda estão saindo, e
 * incluí-las traria de volta a mistura que a etapa existe para separar. É por
 * isso também que só contam os quadros com opacidade maior que zero: os de
 * opacidade 0 são as fotos esperando nas bordas, que ninguém viu.
 *
 * Cada composição tem UM capítulo só — a conferência no fim deste arquivo
 * recusa qualquer outra coisa —, então indexar por `Capitulo` é fiel: não há
 * duas etapas disputando a mesma chave.
 */
export const fotosDaEtapa: Record<Capitulo, FotoGaleria[]> = (() => {
  const mapa = {} as Record<Capitulo, FotoGaleria[]>;
  for (const i of paradas) {
    const visiveis = new Set(
      Object.entries(cenas[i].quadros)
        .filter(([, quadro]) => quadro.opacidade > 0)
        .map(([id]) => id)
    );
    mapa[cenas[i].capitulo!.id] = acervo.filter((f) => visiveis.has(f.id));
  }
  return mapa;
})();

/**
 * As fotos que pisam no palco, na ordem do acervo.
 *
 * SAI DAS CENAS, e não de uma lista à mão — era isso ou manter duas listas
 * dizendo a mesma coisa até uma delas envelhecer. Com 116 fotos no acervo e 40
 * em cena, a lista errada seria a que ninguém percebe: 76 `<button>` vazios no
 * palco, invisíveis, tabuláveis, e cada um deles um destino de foco a mais
 * para quem navega por teclado.
 */
export const fotosDoPalco: FotoGaleria[] = (() => {
  const ids = new Set<string>();
  for (const cena of cenas) for (const id of Object.keys(cena.quadros)) ids.add(id);
  return acervo.filter((f) => ids.has(f.id));
})();

/**
 * A maior largura que cada foto alcança em toda a coreografia, em vw.
 *
 * É ISTO QUE PERMITE NÃO ANIMAR `width`. O motor fixa esta medida como a
 * largura de layout do elemento e chega às outras por `scale` — que roda no
 * compositor e não remede nada. Uma foto que vai de 9vw a 34vw tem um único
 * tamanho de caixa (34vw) e três valores de escala pelo caminho.
 *
 * O efeito colateral é bom: a escala nunca passa de 1 no Ato II, então nenhuma
 * foto é ampliada além do tamanho em que o navegador a rasterizou. A única
 * exceção é o clímax, e é justamente para ela que existe o arquivo `-grande`.
 */
export const larguraMaxima: Record<string, number> = (() => {
  const maior: Record<string, number> = {};
  for (const cena of cenas) {
    for (const [id, quadro] of Object.entries(cena.quadros)) {
      maior[id] = Math.max(maior[id] ?? 0, quadro.largura);
    }
  }
  return maior;
})();

/**
 * Em que cena cada foto aparece pela primeira e pela última vez.
 *
 * O componente usa isto para duas coisas: montar a `<img>` só na janela de
 * cenas vizinha à atual (a foto existe no DOM, o arquivo não é baixado antes
 * da hora) e ligar `will-change` só em quem está em movimento agora.
 */
export const janelaDaFoto: Record<string, [number, number]> = (() => {
  const janela: Record<string, [number, number]> = {};
  cenas.forEach((cena, i) => {
    for (const id of Object.keys(cena.quadros)) {
      // Quadro em opacidade 0 é a foto entrando ou saindo — ele conta para a
      // janela, senão a foto apareceria já no lugar, sem o movimento de entrada.
      const atual = janela[id];
      if (!atual) janela[id] = [i, i];
      else janela[id] = [Math.min(atual[0], i), Math.max(atual[1], i)];
    }
  });
  return janela;
})();

/**
 * Os ids que cada trecho da coreografia de fato MOVE.
 *
 * Existe para uma coisa só: decidir quem recebe `will-change`. E a distinção
 * em relação a `janelaDaFoto` é o ponto, porque as duas já foram a mesma
 * pergunta e não são — a janela decide se a `<img>` existe no DOM e é generosa
 * de propósito (uma cena de folga de cada lado, para o arquivo estar
 * decodificado antes de fazer falta); `will-change` promove o elemento a uma
 * camada de composição na GPU e deve ser mesquinho.
 *
 * COMPARA OS QUADROS, e não a lista de ids escrita em cada cena. A diferença
 * apareceu quando as paradas entraram: uma cena de parada REPETE a composição
 * inteira, mais as fotos da etapa vizinha estacionadas nas bordas — trinta e
 * tantos ids declarados num trecho em que, por definição, nada se move. Ligar
 * `will-change` neles é reservar trinta camadas de GPU para segurar uma
 * imagem parada.
 *
 * Comparando quadro a quadro, um trecho de parada devolve o conjunto vazio, e
 * é exatamente essa a resposta certa.
 */
export const emMovimentoNaCena: Set<string>[] = (() => {
  const ids = [...new Set(cenas.flatMap((c) => Object.keys(c.quadros)))];
  const cheios = new Map(ids.map((id) => [id, quadrosDaFoto(id)]));

  return cenas.map((_, i) =>
    ids.reduce((mexem, id) => {
      const a = cheios.get(id)![i];
      const b = cheios.get(id)![i + 1];
      if (
        b &&
        (a.x !== b.x ||
          a.y !== b.y ||
          a.largura !== b.largura ||
          a.giro !== b.giro ||
          a.opacidade !== b.opacidade)
      ) {
        mexem.add(id);
      }
      return mexem;
    }, new Set<string>())
  );
})();

/**
 * As fotos do Ato III, que só existem depois que o palco solta.
 *
 * A ORDEM É A POSIÇÃO. O componente casa o índice com uma das quatro classes
 * `saidaFotoA`..`D` do CSS, e cada uma tem canto e tamanho próprios:
 *
 *   0 → A   canto de cima à direita, 12vw   (a maior; abre o ato)
 *   1 → B   esquerda, 58vh abaixo, 10vw
 *   2 → C   direita, 88vh abaixo, 9vw
 *   3 → D   esquerda, 106vh abaixo, 8vw     (a menor; fecha)
 *
 * Elas ENCOLHEM na ordem, de 12vw a 8vw, e é isso que faz o ato inteiro
 * parecer que se afasta enquanto a página desce.
 *
 * AQUI NÃO HÁ REGRA DE CAPÍTULO — o Ato III não tem etiqueta, e por isso
 * `lanternas-na-noite` (de `encontros`) pode dividir a tela com três fotos de
 * `nos` sem desmentir nada. É a mesma liberdade da abertura e do respiro.
 */
export const fotosDaSaida = [
  "lanternas-na-noite",
  "pintura-verde-e-amarela",
  "ponta-cabeca-no-parquinho",
  "banco-da-praca",
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   O MURAL — Ato IV
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * As 111 na ordem em que aparecem na parede.
 *
 * NÃO É A ORDEM DO ACERVO, e a diferença é o que faz a parede funcionar. O
 * acervo está agrupado por capítulo para ser lido por gente; jogado assim na
 * parede, ele daria vinte e três fotos de turma seguidas, depois dezoito de
 * culto, depois cinquenta e seis de rosto. Quem rola para o lado atravessaria
 * blocos de assunto, e blocos de assunto são onde o olho decide que já viu o
 * suficiente e para.
 *
 * O REVEZAMENTO É PROPORCIONAL, e não por índice — foi aqui que a fusão de
 * `fora` dentro de `nos` cobrou o preço dela. O revezamento antigo tirava uma
 * foto de cada fila por rodada e parava de tirar da fila que esvaziava; com
 * filas de 14, 18, 23 e 56, isso deixava os últimos TRINTA E TRÊS quadros da
 * parede sendo só `nos`. Exatamente o bloco de assunto que o revezamento
 * existia para evitar, e no pior lugar possível: o fim, onde quem chegou até
 * lá rolando merece o contrário de monotonia.
 *
 * Agora cada fila avança na proporção do próprio tamanho: escolhe-se sempre a
 * fila cujo próximo item está MAIS ATRASADO em relação ao comprimento dela.
 * Uma fila de 56 sai quatro vezes mais vezes que uma de 14, e as quatro
 * terminam juntas — nenhuma esvazia antes e deixa as outras sozinhas.
 *
 * Continua DETERMINÍSTICO, igual no servidor e no cliente. Um `Math.random()`
 * aqui daria duas paredes diferentes na mesma visita — uma renderizada no
 * servidor, outra na hidratação — e o React reclamaria de cada uma das 111. O
 * meio passo (`+ 0.5`) no cálculo da posição e o desempate pela ordem das
 * filas existem só para isso: sem eles, quatro filas empatariam em 0 na
 * primeira rodada e o resultado dependeria da ordem de iteração.
 */
export const fotosDoMural: FotoGaleria[] = (() => {
  const daParede = acervo.filter((f) => !f.foraDoMural);
  const ordem: Capitulo[] = ["celulas", "cultos", "encontros", "nos"];
  const filas = ordem.map((c) => daParede.filter((f) => f.capitulo === c));
  const cursor = filas.map(() => 0);
  const parede: FotoGaleria[] = [];

  while (parede.length < daParede.length) {
    let escolhida = -1;
    let menor = Infinity;
    for (let i = 0; i < filas.length; i++) {
      if (cursor[i] >= filas[i].length) continue;
      const posicao = (cursor[i] + 0.5) / filas[i].length;
      if (posicao < menor) {
        menor = posicao;
        escolhida = i;
      }
    }
    if (escolhida < 0) break;
    parede.push(filas[escolhida][cursor[escolhida]++]);
  }

  return parede;
})();

/**
 * Reparte as fotos em faixas horizontais de comprimento parecido.
 *
 * COMO O MURAL SE MONTA: toda foto de uma faixa tem a MESMA ALTURA (uma
 * variável de CSS) e a largura que a proporção dela pedir. É o arranjo
 * "justificado" das paredes de fotografia — o oposto de uma grade de
 * quadradinhos, onde toda foto é cortada no meio para caber.
 *
 * A repartição é gulosa: cada foto vai para a faixa mais curta no momento. Com
 * 111 fotos e três faixas isso fecha com diferença de menos de uma foto entre
 * a mais longa e a mais curta — o bastante para não sobrar uma faixa terminando
 * dois metros antes das outras, que é o que faz a parede parecer inacabada.
 *
 * A LARGURA É MEDIDA EM MÚLTIPLOS DA ALTURA (`w / h`), não em pixels, porque
 * a altura da faixa muda com a tela e a repartição não pode mudar junto: se
 * mudasse, ela teria de ser refeita no cliente e a parede se remontaria depois
 * da hidratação.
 */
export function montarLinhas(
  fotos: FotoGaleria[],
  quantidade: number
): FotoGaleria[][] {
  const linhas: FotoGaleria[][] = Array.from({ length: quantidade }, () => []);
  const comprimentos = new Array<number>(quantidade).fill(0);
  for (const foto of fotos) {
    let menor = 0;
    for (let i = 1; i < quantidade; i++) {
      if (comprimentos[i] < comprimentos[menor]) menor = i;
    }
    linhas[menor].push(foto);
    comprimentos[menor] += foto.w / foto.h;
  }
  return linhas;
}

/* ═══════════════════════════════════════════════════════════════════════════
   A CONFERÊNCIA

   Roda em desenvolvimento e grita no console. Não é teste de unidade — é a
   trava da regra que esta revisão existiu para impor, no lugar onde ela pode
   ser quebrada: aqui dentro, editando um quadro.

   Uma foto trocada de cena é uma linha; perceber que a etiqueta passou a
   mentir é olhar a tela no ponto certo da rolagem, e é justamente isso que
   ninguém faz ao mover uma foto três pontos para a esquerda.
   ═══════════════════════════════════════════════════════════════════════════ */

function verificarCenas() {
  /* ── 1. as etapas ────────────────────────────────────────────────────
     Quatro, uma por capítulo, na ordem do acervo e numeradas 01..04. Não é
     zelo: `etapas` alimenta o trilho na tela, e um capítulo sem cena de
     abertura vira uma etapa que o visitante nunca alcança — a linha fica lá,
     apagada, do começo ao fim da rolagem. */
  const ordemDosCapitulos: Capitulo[] = ["celulas", "cultos", "encontros", "nos"];
  const idsDasEtapas = etapas.map((e) => e.id);
  if (idsDasEtapas.join() !== ordemDosCapitulos.join()) {
    console.error(
      `[galeria] as etapas são [${idsDasEtapas.join(", ")}] e os capítulos são ` +
      `[${ordemDosCapitulos.join(", ")}] — cada capítulo precisa de uma cena que o abra`
    );
  }
  etapas.forEach((etapa, i) => {
    const esperado = String(i + 1).padStart(2, "0");
    if (etapa.indice !== esperado) {
      console.error(
        `[galeria] a etapa "${etapa.id}" está numerada ${etapa.indice} e é a ${esperado}`
      );
    }
  });

  /* ── 2. a etiqueta não pode mentir ───────────────────────────────────
     A regra que esta trava existe para impor: TODA FOTO VISÍVEL numa cena
     pertence ao capítulo da etiqueta vigente. Quebrá-la é mover uma foto de
     cena — uma linha —, e perceber é olhar a tela no ponto exato da rolagem. */
  let vigente: Capitulo | null = null;

  for (const cena of cenas) {
    if (cena.capitulo) vigente = cena.capitulo.id;

    if (cena.realce && cena.legenda && !cena.legenda.includes(cena.realce)) {
      console.error(
        `[galeria] cena "${cena.id}": o realce "${cena.realce}" não está na legenda`
      );
    }
    if (cena.legenda && !cena.legendaEm) {
      console.error(`[galeria] cena "${cena.id}" tem legenda e não diz onde ela fica`);
    }

    // A abertura não tem etiqueta e por isso pode misturar capítulos; o
    // respiro tem, e pede a exceção explicitamente. Ver `misturaCapitulos`.
    if (!vigente || cena.misturaCapitulos) continue;

    for (const [id, quadro] of Object.entries(cena.quadros)) {
      const foto = porId.get(id);
      if (!foto) {
        console.error(`[galeria] cena "${cena.id}": não existe foto "${id}"`);
        continue;
      }
      // Quadro invisível é foto entrando ou saindo — ela não está na tela sob
      // a etiqueta, então não precisa pertencer ao capítulo dela.
      if (quadro.opacidade === 0) continue;
      if (foto.capitulo !== vigente) {
        console.error(
          `[galeria] cena "${cena.id}" mostra "${id}" (${foto.capitulo}) ` +
          `sob a etiqueta ${vigente}`
        );
      }
    }
  }

  /* ── 3. as camadas ───────────────────────────────────────────────────── */
  for (const foto of fotosDoPalco) {
    if (!foto.camada) {
      console.error(`[galeria] "${foto.id}" entra em cena e não tem camada`);
    }
  }
  const fundo = fotosDoPalco.filter((f) => f.camada === "fundo");
  if (fundo.length > 1) {
    console.error(
      `[galeria] ${fundo.length} fotos na camada "fundo"; o efeito vive de ser raro`
    );
  }

  /* ── 4. o teto de simultâneas ────────────────────────────────────────
     O desenho pede no máximo 9 fotos acima de 6% de opacidade ao mesmo tempo
     no desktop. Passar disso não quebra nada — só transforma uma composição
     em ruído, que é o defeito mais fácil de introduzir editando quadros e o
     mais difícil de enxergar lendo o diff. */
  for (const cena of cenas) {
    const visiveis = Object.entries(cena.quadros).filter(
      ([id, q]) =>
        q.opacidade > 0.06 &&
        // A foto de camada `fundo` não conta. Ela atravessa POR TRÁS da palavra
        // gigante, apagada abaixo do fundo da cena, e existe para dar passagem
        // — contá-la como décima foto reprovaria a cena de CULTOS, que tem
        // nove na frente e uma sombra atrás, que é exatamente o desenho.
        porId.get(id)?.camada !== "fundo"
    );
    if (visiveis.length > 9) {
      console.error(
        `[galeria] cena "${cena.id}" tem ${visiveis.length} fotos visíveis; o teto é 9`
      );
    }
  }
}

if (process.env.NODE_ENV !== "production") verificarCenas();
