/**
 * Conteúdo da página /trilho-do-vencedor.
 *
 * TODO texto aqui sai da copy entregue pela igreja ("Copy Pagina Trilho do
 * Vencedor"). Onde ele foi encurtado, foi encurtado CORTANDO palavras da
 * fonte — nenhuma frase foi escrita para o site. Três construções da copy
 * original foram deixadas de fora de propósito, a pedido: "não apenas X, mas
 * Y", "mais do que X" e "antes de X, é preciso Y". Elas aparecem no original
 * em quatro lugares (visão, primeiros passos, CME, missão da Escola) e em
 * todos o sentido sobrevive à poda. Se alguém for reintroduzir uma, é decisão
 * de conteúdo, não de layout.
 *
 * ⚠️ NÃO EXISTEM PÁGINAS INDIVIDUAIS DOS CURSOS. A copy pede um "Conheça o
 * CME →" em cada bloco, e um link com esse rótulo teria de cair numa página
 * do curso — que não existe. Enquanto não existir, o CTA de cada curso é um
 * convite a FALAR com a igreja (destino real, rótulo honesto) e o texto
 * completo de cada curso fica guardado em `completo` aqui embaixo, intacto,
 * esperando a página que vai publicá-lo. Ver o comentário de `FORMACOES`.
 */

export type { Foto } from "./foto";
import type { Foto } from "./foto";

/**
 * Uma manchete com o trecho que vai em cor.
 *
 * ⚠️ `antes + forte + depois` CONCATENADOS FORMAM A FRASE EXATA da fonte,
 * espaços inclusive — o corte é de pintura, não de texto. Quem mexer aqui está
 * mexendo na copy da igreja, não no layout.
 *
 * É UM TRECHO POR TÍTULO e um TÍTULO SÓ POR SEÇÃO: com o eyebrow já em roxo,
 * um segundo destaque na mesma faixa faria de cada seção três manchas de cor.
 * Por isso o "Nossa missão", o fecho da visão e os nomes das quatro primeiras
 * etapas ficam pretos — a manchete da seção deles já está pintada.
 *
 * `forteFim`/`fim` ABREM UMA SEGUNDA PINTURA NO MESMO TÍTULO, e existem por
 * causa de um caso só: a manchete do herói, onde os dois trechos que carregam
 * o sentido ("jornada" e "propósito de Deus") estão separados por três
 * palavras de ligação. É exceção pedida, não a regra — quem for pintar um
 * segundo trecho noutro título deste site está saindo do sistema. Numa
 * manchete de seção comum, dois destaques deixam de destacar.
 *
 * Quem renderiza é a `<Chave>` do `app/trilho-do-vencedor/page.tsx`, que
 * decide a tinta: roxo na página inteira, a cor do curso nos três blocos de
 * formação (ver `COR`).
 */
export type Manchete = {
  antes?: string;
  forte: string;
  depois?: string;
  forteFim?: string;
  fim?: string;
};

/** As três tintas dos cursos, resolvidas em classe.
 *
 *  Ficam num mapa só pelo mesmo motivo do `COR` do /radicais-kids: para que o
 *  numeral, a palavra-chave do título e o filete de um mesmo curso não possam
 *  divergir por engano, e para dar como varrer a página e ver onde a cor entra.
 *
 *  ⚠️ É ESTA COR, E NÃO O ROXO, QUE PINTA A CHAVE DOS TRÊS TÍTULOS DE CURSO.
 *  O resto da página segue o `grape` da casa, mas aqui a manchete divide o
 *  bloco com a arte oficial do curso — verde no CME, azul no CTL, laranja no
 *  Seminário. Uma palavra roxa ao lado de uma arte verde é exatamente o que a
 *  exceção documentada no `globals.css` existe para evitar.
 *
 *  `sobreEscuro` existe porque o laranja do Seminário só passa em contraste
 *  numa das duas superfícies: sobre `bone` ele dá 4.8:1, sobre `plum-deep`
 *  cairia para 3.8:1. O bloco do Seminário é o escuro, então lá ele troca pelo
 *  tom claro (8.2:1). A licença e a conta estão no `globals.css`. */
export const COR = {
  cme: { texto: "text-cme", fundo: "bg-cme", sobreEscuro: "text-cme" },
  ctl: { texto: "text-ctl", fundo: "bg-ctl", sobreEscuro: "text-ctl" },
  seminario: {
    texto: "text-seminario",
    fundo: "bg-seminario",
    sobreEscuro: "text-seminario-claro",
  },
} as const;

export type Cor = keyof typeof COR;

export const HERO = {
  eyebrow: "Trilho do Vencedor",
  /** A ÚNICA MANCHETE DO SITE COM DOIS TRECHOS PINTADOS, a pedido. Os dois
   *  carregam o sentido e estão longe um do outro: "jornada" é o que esta
   *  página é (a /sobre abre com quase a mesma frase — "Uma igreja para viver
   *  o propósito de Deus" — e é a palavra que separa uma da outra), e
   *  "propósito de Deus" é onde a jornada chega. O que fica em preto é só a
   *  ligação entre eles. Ver o comentário de `Manchete` antes de repetir isto
   *  noutro título. */
  titulo: {
    antes: "Uma ",
    forte: "jornada",
    depois: " para viver o ",
    forteFim: "propósito de Deus",
  } satisfies Manchete,
  texto:
    "Uma jornada de crescimento espiritual criada para ajudar cada pessoa a conhecer mais profundamente a Deus, firmar sua fé, amadurecer e ser preparada para cumprir o seu chamado.",
  /** É ARTE, não fotografia — e por isso o quadro que a exibe segue a
   *  proporção DELA (1222×1154), em vez de a arte se ajustar ao quadro:
   *  "CRESCER / LIDERAR / MULTIPLICAR" ocupa a largura inteira, então
   *  qualquer `object-cover` num recorte mais estreito come letra. */
  foto: {
    src: "/trilho-vencedor/capa-home.jpg",
    alvo: "public/trilho-vencedor/capa-home.jpg",
    alt: "Arte do Trilho do Vencedor: uma mão erguendo um troféu dourado sobre as palavras Crescer, Liderar e Multiplicar",
  } satisfies Foto,
};

export const VISAO = {
  eyebrow: "Nossa visão",
  /** Quatro verbos, e a cor vai no último: é onde a sequência chega. Pintar um
   *  do meio faria o olho parar antes do fim da frase. */
  titulo: {
    antes: "Ganhar, consolidar, ",
    forte: "treinar e enviar",
    depois: ".",
  } satisfies Manchete,
  texto:
    "Cremos que todo cristão foi chamado para crescer, fazer discípulos e cumprir um propósito. Por isso, o Trilho do Vencedor acompanha cada pessoa em sua caminhada: dos primeiros passos na fé ao amadurecimento espiritual e à formação de líderes capazes de cuidar de pessoas e multiplicar aquilo que receberam.",
  fecho: "Discípulos de Cristo que geram outros discípulos.",
};

export const PRIMEIROS_PASSOS = {
  titulo: { antes: "Primeiros ", forte: "passos" } satisfies Manchete,
  intro:
    "Os primeiros passos do Trilho são dedicados a estabelecer fundamentos sólidos para uma caminhada com Deus.",
  /** A ENTRADA DO TRILHO, e a única das quatro que ganha foto e corpo maior.
   *  O destaque é hierarquia, não decoração: é por aqui que se começa. */
  entrada: {
    n: "1º",
    titulo: "Encontro com Deus",
    texto:
      "Um retiro espiritual preparado para proporcionar uma experiência profunda com o amor e a graça de Deus. Por meio da Palavra, de ministrações e de momentos de busca, cada pessoa é conduzida a experimentar restauração, liberdade e uma compreensão mais profunda da nova vida em Cristo.",
    foto: {
      src: "/encontro/grupo-de-bracos-erguidos.jpg",
      alvo: "public/encontro/grupo-de-bracos-erguidos.jpg",
      alt: "Foto do grupo inteiro do Encontro com Deus, com todos de braços erguidos",
    } satisfies Foto,
  },
  /** As outras três, em tipografia. Curso das Águas e Batismo continuam sendo
   *  DOIS itens, e não um: a copy trata os dois no mesmo trecho, mas quem lê
   *  precisa entender que um é a preparação e o outro é a decisão pública. */
  demais: [
    {
      n: "2º",
      titulo: "Consolidação",
      texto:
        "Depois do Encontro começa um tempo de acompanhamento. Uma pessoa mais experiente na fé ajuda você a compreender os princípios da vida cristã e a visão da igreja, fortalecendo os fundamentos para continuar crescendo.",
    },
    {
      n: "3º",
      titulo: "Curso das Águas",
      texto:
        "Prepara você para compreender o significado bíblico do batismo e a importância dessa decisão na caminhada cristã.",
    },
    {
      n: "4º",
      titulo: "Batismo",
      texto:
        "O momento em que o crente declara publicamente sua fé e sua decisão de viver uma nova vida em Cristo.",
    },
  ],
};

/**
 * As três formações principais — o destaque visual da página.
 *
 * `resumo` é o que aparece na página: duas a quatro linhas, o suficiente para
 * a pessoa saber se o curso é para ela agora. `completo` é a copy inteira,
 * preservada palavra por palavra, para a página individual do curso quando ela
 * existir. Não apagar: é a única cópia dela dentro do projeto.
 *
 * `href`/`hrefRotulo` são o par que muda no dia em que essas páginas nascerem:
 * hoje apontam para o /contato com um rótulo que descreve o que o link faz de
 * verdade ("Falar sobre o CME"); no dia em que houver `/trilho-do-vencedor/cme`
 * viram esse caminho e o rótulo pedido pela copy ("Conheça o CME").
 *
 * A `superficie` de cada bloco não é gosto: sand → bone → plum-deep é o que
 * separa os três blocos sem precisar de moldura, linha ou seta entre eles. O
 * degrau abre em `sand` porque "Primeiros passos", logo acima, é `bone`: era a
 * faixa lilás da transição que ficava entre os dois, e ela saiu.
 */
export const FORMACOES = [
  {
    n: "5º",
    sigla: "CME",
    titulo: { forte: "Maturidade", depois: " no Espírito" } satisfies Manchete,
    resumo:
      "O Curso de Maturidade no Espírito aprofunda os fundamentos da vida cristã. Ao longo do curso, você aprenderá princípios para compreender a Palavra, receber revelação e desenvolver uma vida sensível à direção do Espírito Santo.",
    completo: [
      "O Curso de Maturidade no Espírito — CME foi desenvolvido para aprofundar os fundamentos da vida cristã e conduzir cada aluno a um relacionamento mais sólido com Deus.",
      "Ao longo do curso, você aprenderá princípios para compreender a Palavra, receber revelação e desenvolver uma vida sensível à direção do Espírito Santo.",
      "É amadurecer por dentro para viver aquilo que Deus tem para você.",
    ],
    arte: {
      src: "/trilho-vencedor/capa-cme.jpg",
      alvo: "public/trilho-vencedor/capa-cme.jpg",
      alt: "Arte oficial do CME — Curso de Maturidade no Espírito",
    } satisfies Foto,
    cor: "cme" as Cor,
    superficie: "sand" as const,
    href: "/contato",
    hrefRotulo: "Falar sobre o CME",
  },
  {
    n: "6º",
    sigla: "CTL",
    titulo: { antes: "Treinamento de ", forte: "Líderes" } satisfies Manchete,
    resumo:
      "O Curso de Treinamento de Líderes prepara o crente vencedor para assumir responsabilidades de liderança dentro da vida da igreja e das células. É uma formação prática para quem deseja aprender a cuidar de pessoas, servir e liderar.",
    completo: [
      "O Curso de Treinamento de Líderes — CTL prepara o crente vencedor para assumir responsabilidades de liderança e desenvolver seu chamado dentro da vida da igreja e das células.",
      "É uma formação prática para quem deseja aprender a cuidar de pessoas, servir, liderar e cooperar com a multiplicação de novos discípulos.",
      "Porque aquilo que Deus fez em nós também pode alcançar outras pessoas através de nós.",
    ],
    arte: {
      src: "/trilho-vencedor/capa-ctl.jpg",
      alvo: "public/trilho-vencedor/capa-ctl.jpg",
      alt: "Arte oficial do CTL — Curso de Treinamento de Líderes",
    } satisfies Foto,
    cor: "ctl" as Cor,
    superficie: "bone" as const,
    href: "/contato",
    hrefRotulo: "Falar sobre o CTL",
  },
  {
    n: "7º",
    sigla: "Seminário",
    titulo: { antes: "Seminário ", forte: "Pastoral" } satisfies Manchete,
    resumo:
      "O Seminário Pastoral é para quem deseja aprofundar o conhecimento da Palavra de Deus, desenvolvendo uma compreensão bíblica mais sólida e uma visão ministerial mais ampla.",
    completo: [
      "O Seminário Pastoral é para aqueles que desejam ir além e aprofundar seu conhecimento da Palavra de Deus, desenvolvendo uma compreensão bíblica mais sólida e uma visão ministerial mais ampla.",
      "É um novo nível de preparação para homens e mulheres que desejam crescer em revelação, serviço e liderança, sendo capacitados para cooperar de maneira ainda mais profunda com aquilo que Deus está fazendo através da igreja.",
    ],
    arte: {
      src: "/trilho-vencedor/capa-seminario.jpg",
      alvo: "public/trilho-vencedor/capa-seminario.jpg",
      alt: "Arte oficial do Seminário Pastoral",
    } satisfies Foto,
    cor: "seminario" as Cor,
    superficie: "escura" as const,
    href: "/contato",
    hrefRotulo: "Falar sobre o Seminário",
  },
];

export const ESCOLA_FAMILIA = {
  eyebrow: "Formações",
  titulo: { antes: "Escola da ", forte: "Família" } satisfies Manchete,
  subtitulo: "Crescendo com Deus em cada fase da vida",
  intro:
    "Uma vida cristã saudável também alcança nossos relacionamentos, nossa casa e a maneira como administramos aquilo que Deus colocou em nossas mãos. Por isso, a Escola da Família oferece formações específicas para diferentes momentos e desafios da vida familiar.",
  cursos: [
    {
      nome: "Noivos",
      texto:
        "Princípios para quem está se preparando para o casamento e deseja começar essa nova jornada sobre fundamentos sólidos.",
    },
    {
      nome: "Vida Conjugal",
      texto:
        "Ensinos e princípios para desenvolver um relacionamento saudável, maduro e alinhado à Palavra de Deus.",
    },
    {
      nome: "Finanças",
      texto:
        "Princípios para cuidar dos seus recursos de maneira responsável, equilibrada e consciente.",
    },
    {
      nome: "Criação de Filhos",
      texto:
        "Princípios para pais que desejam conduzir seus filhos com intencionalidade, amor e valores fundamentados na Palavra de Deus.",
    },
  ],
};

export const ESCOLA_MINISTERIOS = {
  eyebrow: "Formação ministerial",
  titulo: {
    antes: "Escola Videira de ",
    forte: "Ministérios",
  } satisfies Manchete,
  intro:
    "A Escola tem servido à visão de formar homens e mulheres espiritualmente maduros, capacitados para servir, liderar e fazer discípulos.",
  logo: {
    src: "/trilho-vencedor/escola-ministerios.png",
    alt: "Logo da Escola Videira de Ministério",
    /** O arquivo é o logo oficial, recortado da margem transparente e reduzido
     *  a 1100px. Existe também a versão branca em
     *  `material/trilho-vencedor/logo-transparente-light.png`, para o dia em
     *  que esta seção for parar numa faixa escura. */
    largura: 1100,
    altura: 548,
  },
  marcos: [
    {
      ano: "1999",
      texto:
        "A Escola nasce, fundada pelo Pr. Aluízio A. Silva, no mesmo ano em que nasceu a Videira — Igreja em Células.",
    },
    {
      ano: "2012",
      texto:
        "A história chega a Indaiatuba. Desde então, muitos membros têm sido treinados, preparados e enviados para servir à igreja local e impactar pessoas através de ministérios fortes e dedicados.",
    },
  ],
  missao: {
    titulo: "Nossa missão",
    lead: "Formar discípulos preparados para cumprir o chamado de Deus.",
    texto:
      "A missão da Escola de Ministérios é capacitar cada cristão a viver plenamente seu chamado, seguindo o modelo de Cristo de fazer discípulos. Por meio de um ensino bíblico, espiritual e prático, buscamos formar líderes maduros, preparados para servir pessoas, fortalecer a igreja e expandir o Reino de Deus.",
  },
};

/**
 * O CTA que fecha a página.
 *
 * Ele estava escrito à mão no JSX, e a manchete partida trouxe ele para cá: o
 * corte da frase é conteúdo, e conteúdo desta página mora neste arquivo. Roda
 * sobre `plum-deep`, então a chave é `grape-light` — o `grape` reprova em
 * contraste no escuro.
 */
export const FECHO = {
  titulo: {
    antes: "Seu ",
    forte: "próximo passo",
    depois: " começa aqui.",
  } satisfies Manchete,
  texto: "Fale com a gente e alguém combina com você por onde começar.",
  botao: "Quero começar o Trilho",
  href: "/contato",
};
