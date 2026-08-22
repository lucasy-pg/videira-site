/**
 * O ACERVO E A COPY DAS SEÇÕES NOVAS DO /radicais-livres.
 *
 * Este arquivo é o irmão do `lib/quem-somos.ts` e existe pelo mesmo motivo que
 * ele: o `docs/estrutura.md` (seção 7) registra que enquanto texto e marcação
 * estiverem trançados, revisar copy exige abrir componente React. O redesenho
 * de 21/08/2026 acrescentou oito seções à página, e nenhuma delas escreve o
 * nome de uma foto nem uma frase dentro do JSX.
 *
 * ⚠️ A COPY DAQUI É ESTRUTURAL, NÃO DEFINITIVA. O briefing do redesenho é
 * explícito: "neste momento, a prioridade é reestruturar o design e a
 * arquitetura da página; a copy definitiva será desenvolvida em uma segunda
 * etapa". Então tudo o que está aqui ou (a) já estava no ar e foi preservado
 * palavra por palavra, ou (b) é o próprio texto do briefing. Nada foi inventado
 * para preencher — em especial, não há slogan novo e não há a construção "não é
 * X, é Y", que é a que mais aparece quando alguém tenta escrever copy de jovens
 * sem ter o que dizer.
 *
 * DE ONDE VEM CADA TEXTO está anotado bloco a bloco. Quando a redação
 * definitiva chegar, é aqui que ela entra.
 *
 * ── AS FOTOS ──────────────────────────────────────────────────────────────
 *
 * `public/radicais/` é do REGIME ANTIGO (ver `docs/imagens.md`): `<img>` crua,
 * sem `next/image`, com o `srcset` montado à mão a partir da variante `-800`
 * que o `preparar-galeria.py` grava ao lado de cada arquivo. É por isso que
 * toda foto daqui declara `w`/`h` reais — o número vira o descritor `w` do
 * `srcset`, e um valor inflado faz o navegador escolher o arquivo para vãos
 * maiores do que ele preenche (foto levemente macia, nada errado à vista no
 * código). Conferidos um a um com `sips` em 21/08/2026.
 *
 * OS `alt` SÃO OS DO `lib/galeria.ts`, palavra por palavra, em todas as fotos
 * que também vivem lá — que hoje são todas. Duas descrições diferentes da mesma
 * imagem no mesmo site é ruído para quem navega por leitor de tela.
 *
 * ⚠️ REPETIR FOTO DA GALERIA É PERMITIDO E PREFERIDO (mesmo arquivo, um
 * download só). O que NÃO pode é repetir a foto da seção VIZINHA — a regra que
 * o `lib/quem-somos.ts` já registrava. A conferência de agosto/2026:
 *
 *   02 abertura   turma-telao-rosa · ciclovia-de-costas · turma-rapazes
 *   03 radicais   turma-01 · tres-de-bigode · ajoelhados-na-noite
 *   03 livres     batismo-bracos-erguidos · cachoeira-no-mato · roda-vista-de-baixo
 *   04 contramão  duas-de-costas-na-rua · calcada-numero-257 · de-pe-entre-arvores
 *                 abraco-na-calcada · rapazes-na-calcada · mocas-na-parede-laranja
 *                 rapazes-na-pista-a-noite
 *   05 propósito  rostos-amontoados · roda-na-grama
 *   06 células    turma-luz-roxa · roda-de-amigas
 *   07 culto      culto-maos-erguidas · assistindo-ao-culto
 *   08 liderança  lideranca/casal
 *   09 limiar     lanternas-na-noite
 *   13 convite    adoracao-camiseta-branca
 *
 * Nenhuma se repete em seções adjacentes, e nenhuma repete as três da abertura.
 */

export type Foto = {
  src: string;
  /** Largura real do arquivo em `public/`, em pixels. */
  w: number;
  /** Altura real do arquivo em `public/`, em pixels. */
  h: number;
  alt: string;
  /** O mestre de 2400px, quando existe. Só duas fotos do acervo têm um. */
  grande?: string;
};

/**
 * O `srcset` de uma foto do regime antigo.
 *
 * É a mesma conta do `origensDaFoto` do `lib/galeria.ts`, e a duplicata é
 * consciente: o tipo `FotoGaleria` de lá carrega capítulo, camada e posição de
 * cena — coisas que não existem aqui —, e importar o módulo inteiro por causa
 * de seis linhas traria a partitura de 111 fotos junto. Se um dia um terceiro
 * lugar precisar disto, aí sim vale um `lib/srcset.ts` para os três.
 *
 * ⚠️ A LARGURA DO `-800` NÃO É 800 EM RETRATO. O `preparar-galeria.py` grava o
 * arquivo pequeno com 800 no LADO MAIOR: uma foto deitada vira 800×533 e uma em
 * pé vira 600×800. Anunciar `800w` numa foto em pé diz ao navegador que o
 * arquivo tem um terço a mais de pixels do que tem, e ele o escolhe para vãos
 * onde não dá conta. A conta devolve a largura real a partir da proporção.
 */
export function origens(foto: Foto, incluirGrande = false): string {
  const partes: string[] = [];
  if (foto.w > 800) {
    const largura = Math.round((800 * foto.w) / Math.max(foto.w, foto.h));
    partes.push(`${foto.src.replace(/\.jpg$/, "-800.jpg")} ${largura}w`);
  }
  partes.push(`${foto.src} ${foto.w}w`);
  if (incluirGrande && foto.grande) partes.push(`${foto.grande} 2400w`);
  return partes.join(", ");
}

/* ═══ 03 — RADICAIS / LIVRES ═══════════════════════════════════════════════
   As duas metades do nome, cada uma com o próprio ato.

   ⚠️ `turma-01` FICA ONDE ESTÁ, e é a única foto desta página que não pode ser
   trocada por gosto: a rede decidiu em 17/08/2026 que "a imagem no letreiro
   Radical deve permanecer o mesmo". Ela também é a escolha mais delicada da
   seção — aparece recortada pelas letras sobre fundo osso, então precisa ser
   ESCURA. Foto clara ali some dentro do próprio fundo e a palavra deixa de
   existir. `turma-01` é noturna, com pontos quentes de luzinha, e ainda leva um
   véu ameixa por cima no CSS. Se um dia entrar uma foto diurna aqui, medir o
   contraste antes: a legibilidade da palavra vem primeiro.

   AS DUAS TRINCAS FORAM ESCOLHIDAS POR TEMPERATURA, não por composição. O ato
   RADICAIS é noturno e sério — três rapazes sem sorrir, dois ajoelhados no
   escuro. O ato LIVRES é claro e aberto — água, braços erguidos, céu. A
   passagem de um para o outro é o que a seção conta, e ela acontece na
   fotografia antes de acontecer no texto. */
export const fotosRadicais = {
  /** Revelada DENTRO das letras de RADICAIS (`background-clip: text`). */
  noTexto: {
    src: "/radicais/turma-01.jpg",
    w: 1600,
    h: 1066,
    alt: "Foto de turma à noite numa varanda, uns em pé e outros agachados, com luzinhas roxas ao fundo",
  },
  umA: {
    src: "/radicais/tres-de-bigode.jpg",
    w: 1200,
    h: 1600,
    alt: "Três rapazes de bigode postiço posando sérios para a selfie dentro de um shopping",
  },
  umB: {
    src: "/radicais/ajoelhados-na-noite.jpg",
    w: 1200,
    h: 1600,
    alt: "Dois rapazes ajoelhados de braços abertos numa festa à noite, com fumaça e luzes atrás",
  },
} satisfies Record<string, Foto>;

export const fotosLivres = {
  doisA: {
    src: "/radicais/cachoeira-no-mato.jpg",
    w: 1280,
    h: 960,
    alt: "Grupo de rapazes dentro de um riacho no meio do mato, posando para a câmera",
  },
  doisB: {
    src: "/radicais/batismo-bracos-erguidos.jpg",
    w: 1068,
    h: 1600,
    alt: "Jovem de camiseta preta escrita “eu nasci de novo”, encharcado, com os dois braços erguidos e a boca aberta gritando",
  },
  doisC: {
    src: "/radicais/roda-vista-de-baixo.jpg",
    w: 960,
    h: 1280,
    alt: "Roda de jovens vista de baixo, os rostos debruçados sobre a câmera no escuro",
  },
} satisfies Record<string, Foto>;

/**
 * OS DOIS ATOS EM TEXTO.
 *
 * `contra`/`para` são as três linhas curtas do briefing, literais — "radical
 * contra o pecado, contra uma vida superficial, contra uma fé morna" e "livres
 * da condenação, da culpa, do medo, para viver sua identidade, para viver o
 * propósito de Deus". Elas entram como anotação de margem, não como lista.
 *
 * `texto` É A PROSA QUE JÁ ESTAVA NO AR — o `nome` do `lib/quem-somos.ts`,
 * palavra por palavra. Ela sobreviveu ao redesenho porque é a única parte desta
 * seção escrita pela rede; as linhas curtas acima são do briefing e são as que
 * a segunda etapa de copy vai revisar.
 */
export const atos = {
  radicais: {
    palavra: "Radicais",
    linhas: ["Contra o pecado.", "Contra a vida superficial.", "Contra a fé morna."],
    texto:
      "Uma postura de firmeza com os valores do Reino. Levamos nossa fé a sério e buscamos viver em santidade e verdade em todas as áreas da vida.",
  },
  livres: {
    palavra: "Livres",
    linhas: [
      "Da condenação.",
      "Da culpa.",
      "Do medo.",
      "Para viver o propósito de Deus.",
    ],
    texto:
      "Uma vida pautada pelo amor e pela graça aceita por Jesus. Caminhamos em constante aprendizado, expressando um evangelho vivo e autêntico no dia a dia.",
  },
};

/* ═══ 04 — A CONTRAMÃO ═════════════════════════════════════════════════════
   CINCO FOTOS NUMA FAIXA QUE ANDA PARA A ESQUERDA enquanto a manchete anda
   para a direita. O movimento é o argumento: as duas coisas se cruzam.

   A ESCOLHA É TODA DE GENTE ANDANDO OU PARADA NA RUA, e isso não é acaso —
   "contramão" precisa de uma via para ter sentido. Duas de costas numa
   avenida, um grupo na calçada, o portão 257, o rapaz contra as copas, a roda
   diante da lanchonete: são todas fotos de RUA, e é a rua que faz a metáfora
   funcionar. Trocar uma delas por foto de salão desmancha a seção sem que nada
   pareça errado no código.

   A ORDEM É A DA FAIXA, da esquerda para a direita, e ela alterna retrato e
   paisagem de propósito: fotos todas do mesmo formato viram tira de contato.

   ⚠️ SÃO SETE E NÃO CINCO, E A CONTAGEM É REQUISITO DE LAYOUT — não gosto. A
   faixa tem de ser MAIS LARGA QUE A JANELA em toda tela, senão o passeio dela
   abre buraco na borda (ver `.faixaPista` no módulo, onde está a conta). Com
   cinco fotos e o teto de 400px por foto, a pista media ~2.030px: sobrava
   pouco mais que a largura de um monitor de 1.920, e o passeio praticamente
   não acontecia lá. Com sete, ela mede ~2.900px e sobra curso em qualquer
   largura até um ultrawide.

   Quem tirar uma foto daqui está encurtando a pista. Abaixo de seis, confira o
   comportamento num monitor largo antes de commitar. */
export const contramao: Foto[] = [
  {
    src: "/radicais/duas-de-costas-na-rua.jpg",
    w: 960,
    h: 1280,
    alt: "Duas jovens de costas, de jaqueta, paradas na esquina de uma avenida com palmeiras",
  },
  {
    src: "/radicais/calcada-numero-257.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de jovens posando na calçada à noite, embaixo do número 257 no portão",
  },
  {
    src: "/radicais/lideres-eleitos.jpg",
    w: 1066,
    h: 1600,
    alt: "Rapaz em pé, fotografado de baixo contra o céu e as copas das árvores, com um grupo sentado ao fundo",
  },
  {
    src: "/radicais/abraco-na-calcada.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de rapazes abraçados em roda na calçada, diante da vitrine iluminada de uma lanchonete",
  },
  {
    src: "/radicais/rapazes-na-calcada.jpg",
    w: 960,
    h: 1280,
    alt: "Grupo de rapazes posando na calçada à noite em frente a uma loja iluminada, um deles com o braço erguido",
  },
  {
    src: "/radicais/mocas-na-parede-laranja.jpg",
    w: 1600,
    h: 1200,
    alt: "Grupo de moças posando lado a lado diante de uma parede laranja",
  },
  {
    src: "/radicais/rapazes-na-pista-a-noite.jpg",
    w: 1280,
    h: 960,
    alt: "Selfie de um grupo grande de rapazes numa pista à noite",
  },
];

/* ═══ 05 — UMA GERAÇÃO COM PROPÓSITO ═══════════════════════════════════════
   CINCO CONCEITOS, e o briefing proíbe explicitamente os cinco cards iguais
   alinhados. Aqui eles são cinco LINHAS de uma pauta: numeral discreto, palavra
   grande, uma frase curta, e a indentação crescendo e recuando — a mesma
   gramática da régua de missão/visão/propósito que fecha a seção, para as duas
   peças lerem como partes de um capítulo só.

   ⚠️ AS CINCO FRASES SÃO PLACEHOLDER ESTRUTURAL, e é importante que quem for
   revisar saiba disso: as PALAVRAS são do briefing (identidade, liberdade,
   propósito, liderança, pertencimento) e as frases foram escritas para caber no
   desenho sem inventar doutrina. Cada uma ecoa alguma coisa que a rede já disse
   em outro lugar da página — "cuidar de outros" e "formados" vêm da missão
   oficial; "graça" e "culpa" vêm da prosa de LIVRES; "caminha junto" vem do
   título da seção 06. Nenhuma é slogan novo.

   TRÊS A CINCO PALAVRAS CADA, e o teto não é estético: no desenho a frase vive
   ao lado de uma palavra de 40px em versalete, e a partir da segunda linha ela
   deixa de ser anotação e vira parágrafo. */
export const conceitos = [
  { palavra: "Identidade", frase: "Filhos, antes de qualquer outra coisa." },
  { palavra: "Liberdade", frase: "A graça de Jesus no lugar da culpa." },
  { palavra: "Propósito", frase: "O chamado de Deus começa agora." },
  { palavra: "Liderança", frase: "Formados para cuidar de outros." },
  { palavra: "Pertencimento", frase: "Uma geração que caminha junta." },
];

/** As duas fotos que quebram a pauta dos cinco conceitos — pequenas, soltas nas
 *  margens, com parallax leve. Não ilustram conceito nenhum em particular, e é
 *  por isso que são duas e não cinco: cinco viraria ícone de card. */
export const fotosProposito = {
  alta: {
    src: "/radicais/roda-na-grama.jpg",
    w: 960,
    h: 1280,
    alt: "Roda grande de jovens sentados na grama do parque, de costas para a câmera, com um deles em pé no meio",
  },
  baixa: {
    src: "/radicais/rostos-amontoados.jpg",
    w: 1080,
    h: 961,
    alt: "Selfie tirada de baixo, com cinco rostos de jovens amontoados sobre a câmera, todos rindo e fazendo careta",
  },
} satisfies Record<string, Foto>;

/* ═══ 06 — AS CÉLULAS ══════════════════════════════════════════════════════
   ⚠️ `turma-luz-roxa` FOI ESCOLHIDA PELA REDE em 17/08/2026 para representar a
   célula, e continua sendo a foto principal desta seção. Ela tem 1120px de
   largura, que é POUCO para o acervo (o normal é ~1600), e por isso o vão dela
   no CSS tem teto: `min(52vw, 720px)`. A 720px em CSS ela entrega 1440 físicos
   em tela retina, com 1120 disponíveis — fica no limite, e é o limite que o
   `docs/imagens.md` já registrava para esta foto exata. Se a seção crescer, a
   foto precisa de um mestre maior antes, não de um `scale`.

   O QUADRO É 4:3, e o arquivo é 1120×840 — a proporção exata, corte zero.

   A SEGUNDA FOTO é o inset pequeno, e existe para dizer o que a grande não diz:
   a grande mostra a rede reunida no salão, a pequena mostra a sala de uma casa,
   que é onde a célula acontece de verdade. */
export const fotosCelulas = {
  principal: {
    src: "/radicais/turma-luz-roxa.jpg",
    w: 1120,
    h: 840,
    alt: "Turma posando num salão com a parede lavada de luz roxa e o acrílico da bateria atrás",
  },
  inset: {
    src: "/radicais/roda-de-amigas.jpg",
    w: 1600,
    h: 1200,
    alt: "Roda de moças posando abraçadas na sala, algumas sentadas à mesa de madeira",
  },
} satisfies Record<string, Foto>;

/* ═══ 07 — O CULTO ═════════════════════════════════════════════════════════
   A ÚNICA SEÇÃO ESCURA ANTES DA GALERIA, e a inversão é o assunto: o culto é o
   momento em que a rede inteira se reúne, e as fotos que existem dele são todas
   de luz de palco sobre escuro. Sobre osso elas ficam cinzentas; sobre
   `plum-deep` elas acendem.

   `culto-maos-erguidas` TEM MESTRE DE 2400px (`-grande`), e é por isso que ela
   pode ocupar a largura toda: é uma das duas únicas fotos do acervo com esse
   tamanho (a outra é a `adoracao-camiseta-branca`, que fecha a página). Toda
   foto de `public/radicais/` tem ~1600px no lado maior e vem do WhatsApp — num
   vão de largura cheia em tela retina, 1600 fica no limite. Estas duas não.

   ── AS DUAS FOTOS DIZEM COISAS DIFERENTES, E É POR ISSO QUE SÃO DUAS ──────

   A larga mostra a congregação INTEIRA de pé, de mãos erguidas: o culto visto
   de longe, como volume. A alta mostra UM rosto no meio da plateia, de boné e
   mão no queixo, prestando atenção: o culto visto de perto, como atenção. Uma
   foto só teria de escolher entre as duas, e a seção precisa das duas — o
   texto ao lado fala em "celebrar, louvar e ouvir a Palavra juntos", e o
   "ouvir" não está na foto de braços erguidos.

   ⚠️ A ALTA MUDOU EM 22/08/2026, a pedido do Lucas: era a `microfone-luz-quente`
   (um jovem cantando ao microfone). A troca não foi de qualidade da foto, foi
   de assunto — a antiga mostrava quem está NO PALCO, e ao lado de uma foto que
   já mostra a congregação a seção acabava sendo duas vezes o mesmo ponto de
   vista de quem conduz. A nova mostra quem está na PLATEIA, que é para onde o
   convite da página aponta. A `microfone-luz-quente` continua no acervo e
   continua na galeria; ela só não é mais desta seção.

   ⚠️ E A `assistindo-ao-culto` É O CASO RARO DE FOTO QUE NÃO ESTÁ NA GALERIA —
   entrou direto por esta seção, vinda de `material/radicais/`. Então o `alt`
   dela foi ESCRITO AQUI e não copiado do `lib/galeria.ts`, que é de onde vêm
   todos os outros deste arquivo. Se um dia ela entrar na parede da galeria, a
   descrição de lá tem de nascer igual a esta, palavra por palavra.

   O ORIGINAL É UM PNG DE 5,6MB e 2071×3109; o que está no ar é o JPEG de
   1600px no lado maior (mais a variante `-800`), na qualidade 86 do
   `preparar-galeria.py`. A proporção do arquivo é 2:3 CRAVADO, que é exatamente
   a do quadro do inset no CSS — corte zero. Trocar por uma foto de outra
   proporção passa a cortar. */
export const fotosCulto = {
  larga: {
    src: "/radicais/culto-maos-erguidas.jpg",
    grande: "/radicais/culto-maos-erguidas-grande.jpg",
    w: 1600,
    h: 1068,
    alt: "Congregação de pé durante o culto, com dezenas de mãos erguidas e palmas, e um caixote de flores num canto",
  },
  alta: {
    src: "/radicais/assistindo-ao-culto.jpg",
    w: 1066,
    h: 1600,
    alt: "Jovem de boné e óculos, de casaco preto e com a mão no queixo, assistindo ao culto no meio de várias fileiras de outros jovens sentados atrás dele",
  },
} satisfies Record<string, Foto>;

/* ═══ 08 — A LIDERANÇA ═════════════════════════════════════════════════════
   ⚠️ A COPY DESTA SEÇÃO É DA REDE, entregue pelo Lucas em 22/08/2026, e é a
   única parte do redesenho em que texto definitivo chegou antes da segunda
   etapa de escrita. Não parafrasear: quando houver dúvida entre "está melhor
   assim" e "é o que eles escreveram", ganha o que eles escreveram.

   ELA FECHOU UMA PENDÊNCIA ANTIGA. O `docs/estrutura.md` listava "bio de
   Gustavo e Mariana Pires" como conteúdo que faltava desde a primeira versão
   da página; `bio` esteve vazia esse tempo todo e a seção rodava sem prosa
   nenhuma, com um respiro reservado no lugar. Os dois parágrafos abaixo são
   essa bio.

   ── O QUE MUDOU NOS CARGOS, E POR QUE ISSO É INFORMAÇÃO ───────────────────

   ⚠️ ANTES ERA UM CARGO SÓ E COMPARTILHADO ("Obreiros", para o casal); agora
   são DOIS NOMES com o cargo de cada um, e os dois cargos são compostos:
   "Líder de jovens · Obreiro" e "Líder de jovens · Obreira". A rede escreveu
   assim, e a diferença não é de redação:

     · LÍDER DE JOVENS é a função na rede — o que eles fazem aqui.
     · OBREIRO/OBREIRA é o cargo na igreja — o que eles são na Videira.

   As duas coisas coexistem e nenhuma substitui a outra. E OBREIRO NÃO É
   SINÔNIMO DE PASTOR NEM DE LÍDER: os três existem na Videira e significam
   coisas diferentes. Não "promover" para pastor achando que soa melhor — o
   casal à frente da rede de jovens não é o casal que pastoreia a igreja
   (esses são o Pr. Thiago e a Pra. Aline, no `lib/sobre.ts`), e a diferença é
   informação, não descuido de redação.

   O FORMATO É O DA /sobre, a pedido: manchete de duas frases inteiras (uma por
   linha, a segunda na tinta da casa), um parágrafo que apresenta e outro que
   explica, e os nomes numa régua de duas colunas com filete — nome em display,
   cargo em versalete. Lá é `LIDERANCA` no `lib/sobre.ts`; a diferença entre as
   duas é só quem são as pessoas. */
export const lideranca = {
  etiqueta: "Nossa liderança",
  /* DUAS FRASES INTEIRAS, uma por linha, e a quebra é escrita e não resultado
     de largura — é o mesmo par da /sobre ("Pastoreando pessoas." / "Formando
     discípulos."). A tinta cai na segunda linha inteira, que é a que carrega a
     promessa: cuidar é o presente, formar uma geração é o que se promete. */
  linha1: "Caminhando com jovens.",
  linha2: "Formando uma geração.",
  intro:
    "Gustavo e Mariana Pires servem na liderança de jovens da Videira Indaiatuba.",
  texto:
    "Juntos, cuidam, acompanham e inspiram uma nova geração a crescer em relacionamento com Deus, viver em comunidade e cumprir seu propósito em Cristo.",
  pessoas: [
    { nome: "Gustavo Pires", cargo: "Líder de jovens · Obreiro" },
    { nome: "Mariana Pires", cargo: "Líder de jovens · Obreira" },
  ],
  /* ⚠️ ESTA FOTO NÃO PASSA PELO `FotoAcervo` E NÃO TEM VARIANTE `-800`. Ela é
     a única da página que mora em `public/radicais/lideranca/` e não no acervo
     processado: o `preparar-galeria.py` mantém os retratos de liderança fora da
     parede da galeria e por isso não gera o arquivo pequeno para eles. Um
     `srcset` anunciando um `-800` que não existe dá 404 silencioso em metade
     das telas — foi exatamente esse o bug que a `retrato-no-quintal` tinha.

     Se um dia ela ganhar o `-800`, é trocar por `FotoAcervo` e mover esta
     entrada para junto das outras aqui em cima.

     O ENQUADRAMENTO: é uma selfie noturna de ~3:4 num quadro 4:5. Como o quadro
     é mais LARGO que o arquivo em proporção, o corte se dá na altura, e são só
     ~7% no total, repartidos entre topo e pé — os dois rostos, que ocupam a
     metade de cima, não chegam perto da borda. Se entrar um retrato bem mais
     alto que 3:4, conferir o enquadramento: aí o corte passa a doer. */
  foto: {
    src: "/radicais/lideranca/casal.jpg",
    w: 1186,
    h: 1599,
    alt: "Gustavo e Mariana Pires, líderes de jovens dos Radicais Livres, lado a lado e sorrindo durante um encontro da rede à noite",
  },
};

/* ═══ 09 — O LIMIAR ════════════════════════════════════════════════════════
   A foto que atravessa a passagem do claro para o escuro. `lanternas-na-noite`
   é a única do acervo em que a própria cena é uma travessia — uma fila de
   jovens de lanterna na cabeça andando por um gramado escuro. A seção escurece
   em volta dela enquanto ela cresce, e a foto já é noturna: não há um quadro em
   que a imagem brigue com o fundo.

   ELA É 1170×1154 (praticamente quadrada) e o teto do vão é `min(62vw, 760px)`
   pelo mesmo motivo da foto das células — 760 em CSS são 1520 físicos, e o
   arquivo tem 1170. Fica macia em retina e a cena escura esconde isso, que é
   exatamente a licença que o `docs/imagens.md` dá à `oracao-a-dois`. */
export const fotoLimiar: Foto = {
  src: "/radicais/lanternas-na-noite.jpg",
  w: 1170,
  h: 1154,
  alt: "Fila de jovens de lanterna na cabeça atravessando um gramado escuro à noite",
};

/* ═══ 13 — O CONVITE FINAL ═════════════════════════════════════════════════
   A segunda das duas fotos com mestre de 2400px, e ela fecha a página em
   largura cheia. É um retrato de UMA pessoa no meio da congregação — não uma
   foto de turma —, e a escolha é deliberada: a página inteira falou de uma
   geração, e o convite final é para uma pessoa. */
export const fotoConvite: Foto = {
  src: "/radicais/adoracao-camiseta-branca.jpg",
  grande: "/radicais/adoracao-camiseta-branca-grande.jpg",
  w: 1600,
  h: 1066,
  alt: "Jovem de camiseta branca cantando de olhos fechados no meio da congregação, com um braço erguido e a outra mão sobre o peito",
};

/**
 * A COPY DAS SEÇÕES 04, 05, 09, 12 e 13.
 *
 * ⚠️ AS MANCHETES SÃO AS DO BRIEFING, literais — "ANDAMOS NA CONTRAMÃO DO
 * MUNDO", "AINDA NÃO VIVEMOS TUDO", "A história continua por lá", "Você não
 * nasceu para viver uma vida morna", "JOVENS DESTINADOS AO AVIVAMENTO". Elas
 * chegaram escritas e não foram parafraseadas.
 *
 * CADA MANCHETE TEM UMA PALAVRA EM ROXO, uma só, e é sempre a palavra que
 * carrega a promessa. É o gesto da casa, e ele vale no site inteiro: a tinta
 * cai sobre a palavra que é promessa, nunca sobre a que é enfeite. Por isso a
 * copy vem REPARTIDA em `antes`/`tinta`/`depois` em vez de uma string com
 * marcação dentro — trocar o texto não deve exigir conferir onde a marcação
 * começa.
 */
export const copy = {
  contramao: {
    etiqueta: "Posicionamento",
    antes: "Andamos na ",
    tinta: "contramão",
    depois: " do mundo.",
  },
  proposito: {
    etiqueta: "Uma geração com propósito",
    antes: "O que a gente quer ver crescer em cada ",
    tinta: "jovem",
    depois: ".",
  },
  celulas: {
    etiqueta: "As células",
    antes: "Você não precisa caminhar ",
    tinta: "sozinho",
    depois: ".",
    /* A INFORMAÇÃO PRINCIPAL DA SEÇÃO, e ela é real: as células dos Radicais
       Livres acontecem aos sábados. A cadência aparece e a data não, que é a
       regra do site inteiro (ver `lib/cells.ts`): "todos os sábados" continua
       verdade daqui a um ano, "dia 14, às 19h30" não. */
    cadencia: "Todos os sábados",
    /* Prosa preservada do que já estava no ar. */
    texto:
      "Grupos pequenos que se reúnem aos sábados nas casas por toda a cidade. Um ambiente seguro de comunhão, louvor, Palavra, oração e lanche. É onde você é conhecido pelo nome, constrói amizades verdadeiras e vive a fé de forma prática no dia a dia.",
    cta: "Encontre uma célula",
  },
  culto: {
    etiqueta: "Culto de Jovens",
    /* DUAS LINHAS, quebra deliberada — é o par que o briefing pede ("Uma vez
       por mês. / Todos juntos."), e a coreografia revela uma depois da outra. */
    linha1: "Uma vez por mês.",
    antes2: "Todos ",
    tinta2: "juntos",
    depois2: ".",
    cadencia: "Uma vez por mês, aos sábados",
    texto:
      "O momento em que a rede inteira se reúne no prédio da igreja para celebrar, louvar e ouvir a Palavra juntos. Um ambiente de muita energia, ideal para você trazer amigos e experimentar o mover de Deus em comunidade.",
    /* A DATA DO CULTO NÃO ESTÁ NO SITE, e esta frase é o que faz disso uma
       informação em vez de uma lacuna. A rede não tem dia fixo: a data sai no
       Instagram, mês a mês, e é para lá que a pessoa tem que ir. Se um dia o
       culto ganhar dia fixo, este bloco é o primeiro a mudar. */
    aviso:
      "As datas mudam a cada mês e saem primeiro no Instagram da rede.",
  },
  limiar: {
    linha1: "Ainda não",
    antes2: "vivemos ",
    tinta2: "tudo",
    depois2: "!",
  },
  instagram: {
    etiqueta: "No dia a dia",
    antes: "A história continua ",
    tinta: "por lá",
    depois: ".",
    cta: "Acompanhe no Instagram",
  },
  convite: {
    antes: "Você não nasceu para viver uma vida ",
    tinta: "morna",
    depois: ".",
    cta: "Quero participar",
    assinatura: "Jovens destinados ao Avivamento.",
  },
};
