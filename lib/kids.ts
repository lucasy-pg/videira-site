/**
 * Conteúdo da página /radicais-kids.
 *
 * TODO texto aqui é da rede — colhido de radicaiskids.com.br e transcrito em
 * `docs/radicais-kids-fonte.md`, que guarda as citações literais e a data da
 * coleta. Nada aqui é slogan escrito para o site: quando o texto foi encurtado,
 * foi encurtado cortando palavras da fonte, nunca inventando frase nova.
 *
 * ⚠️ É o site da REDE, não o da Videira Indaiatuba. Descreve o modelo
 * nacional/internacional. Onde a nossa casa fizer diferente, quem corrige é a
 * igreja — os pontos que dependem disso estão marcados com `PENDENTE` abaixo.
 */

/** O tipo mora em `lib/foto.ts` desde que o /trilho-do-vencedor passou a usar a
 *  mesma `<MolduraFoto>`. Continua reexportado daqui porque o `satisfies Foto`
 *  aparece dezenas de vezes neste arquivo.
 *
 *  As seis fotos desta página JÁ EXISTEM e estão publicadas em `public/kids/` —
 *  são fotos reais das crianças da Videira Indaiatuba, entregues pela igreja.
 *  Não trocar por banco de imagens: é decisão da casa que foto real vence foto
 *  de banco, e foto de criança tem consentimento dos pais no meio. */
export type { Foto } from "./foto";
import type { Foto } from "./foto";

export const LOGO_KIDS = "/kids/logo-horizontal-kids.avif";

/* Os personagens são da identidade da rede. Repare que eles são de
   NACIONALIDADES diferentes (um escocês de kilt, um mexicano de sombrero) —
   é o tema missionário da marca, e é por isso que eles aparecem justamente na
   seção do alcance, ao lado do número de nações. Não são enfeite ali. */
export const PERSONAGENS = {
  jesus: "/kids/personagem-abracado-jesus.avif",
  ensino: "/kids/personagem-ensino.avif",
  projetos: "/kids/personagem-projetos.avif",
  treinamento: "/kids/personagem-treinamento.avif",
} as const;

export const HERO = {
  titulo: "Radicais Kids",
  texto: "Ministério de crianças e juvenis da Igreja Videira.",
  foto: {
    src: "/kids/hero-criancas.jpg",
    alvo: "public/kids/hero-criancas.jpg",
    alt: "Crianças do Radicais Kids em pé, em oração, durante o culto",
  } satisfies Foto,
};

/** Números da rede, conforme publicado por ela.
 *
 *  ⚠️ O site escreve "mais de 252.829 mil crianças", que é erro de digitação
 *  dele: ou são 252.829, ou são 252 mil. Aqui fica "252 mil+", que é a leitura
 *  conservadora e a única que não repete o erro. */
export const ALCANCE = [
  { numero: "32", rotulo: "nações" },
  { numero: "11.656", rotulo: "células" },
  { numero: "252 mil+", rotulo: "crianças" },
];

export const VISAO = {
  texto:
    "Formar discípulos de Cristo desde a infância. O alvo principal é formar uma base espiritual firme na infância, pois esse é o começo para cumprirmos o propósito de Deus como igreja: fazer discípulos de todas as nações.",
  apoio:
    "Por meio do discipulado com mulheres, realizamos um trabalho com crianças e juvenis, visando ao evangelismo, ensino e treinamento.",
};

/**
 * Onde acontece: culto e célula, que é a mesma estrutura da igreja adulta.
 *
 * A distinção paralela/não paralela é a informação mais útil desta página para
 * quem tem filho, e não estava em lugar nenhum do site antes: responde "meu
 * filho vai junto na minha célula ou não?".
 *
 * PENDENTE: as faixas do Culto Kids (1–5, 6–9, 10–12) são a divisão da REDE.
 * Ninguém conferiu se Indaiatuba separa as salas assim. Antes de tratar isso
 * como informação local, perguntar à igreja.
 */
export const ONDE = [
  {
    id: "culto",
    titulo: "Culto Kids",
    texto:
      "Os cultos para crianças e juvenis acontecem no prédio da igreja, no mesmo dia e horário do culto de adultos e jovens. Tem dois momentos: a reunião maior, com várias idades juntas, e o ensino nas salas, com as idades separadas.",
    detalhes: ["1 a 5 anos", "6 a 9 anos", "10 a 12 anos"],
    detalhesRotulo: "Salas de ensino",
    foto: {
      src: "/kids/culto-kids.jpg",
      alvo: "public/kids/culto-kids.jpg",
      alt: "Equipe do Radicais Kids apresentando um teatro no culto das crianças",
    } satisfies Foto,
    /* Sem CTA: não existe página de culto no site. Quando existir, entra aqui. */
    href: undefined as string | undefined,
    hrefRotulo: undefined as string | undefined,
  },
  {
    id: "celulas",
    titulo: "Células Kids",
    texto:
      "A célula é a igreja que se reúne nas casas semanalmente. As paralelas se reúnem ao mesmo tempo que as células de adultos ou de jovens, no mesmo dia e local. As não paralelas são só de crianças e juvenis.",
    detalhes: ["Paralelas", "Não paralelas"],
    detalhesRotulo: "Dois formatos",
    foto: {
      src: "/kids/celula-kids.jpg",
      alvo: "public/kids/celula-kids.jpg",
      alt: "Célula de crianças reunida no chão de uma sala, com as líderes",
    } satisfies Foto,
    href: "/celulas",
    hrefRotulo: "Ver as células",
  },
];

export const PROCESSO_INTRO =
  "O processo espiritual na infância é um modelo de ministério que acontece por etapas planejadas. Trabalhamos por meio de um processo que alcança até os doze anos da vida da criança.";

/**
 * As três etapas, num sistema só.
 *
 * A SUPERFÍCIE DE CADA UMA FOI ESCOLHIDA PELO CONTRASTE DO ACENTO, não por
 * gosto — ver o comentário da paleta no `globals.css`. O amarelo só passa em
 * contraste sobre escuro, então Treinamento é a etapa escura; e como ela é a
 * terceira, a faixa escura cai no lugar certo do ritmo da página de qualquer
 * forma. As duas primeiras alternam `bone` e `sand`.
 */
export const ETAPAS = [
  {
    n: "01",
    titulo: "Evangelismo",
    texto:
      "Todos precisam ser salvos. Este é o ponto de partida para toda pessoa ter um relacionamento com Deus. O evangelismo acontece nas células, cultos, encontros, colônias de férias e eventos evangelísticos.",
    versiculo: {
      texto: "Ide por todo o mundo e pregai o evangelho a toda criatura.",
      ref: "Marcos 16.15",
    },
    superficie: "bone" as const,
    cor: "magenta" as const,
    personagem: undefined,
    foto: {
      src: "/kids/evangelismo.jpg",
      alvo: "public/kids/evangelismo.jpg",
      alt: "Salão cheio de crianças com os braços erguidos num evento do Radicais Kids",
    } satisfies Foto,
  },
  {
    n: "02",
    titulo: "Ensino",
    texto:
      "O alvo do ensino é a consolidação das crianças, na fé em Cristo e na vida da igreja. Concentramos em três aspectos bem práticos na aprendizagem: o conteúdo, a repetição e a prática. O ensino da Palavra é o mesmo na célula e no culto.",
    versiculo: undefined,
    superficie: "sand" as const,
    cor: "ciano" as const,
    personagem: PERSONAGENS.ensino,
    foto: {
      src: "/kids/ensino.jpg",
      alvo: "public/kids/ensino.jpg",
      alt: "Líder com a Bíblia aberta ensinando um grupo de crianças pequenas",
    } satisfies Foto,
  },
  {
    n: "03",
    titulo: "Treinamento",
    texto:
      "O alvo do treinamento é o sacerdócio de cada crente. Nosso objetivo não é apenas ensinar sobre salvação, mas ver crianças sendo salvas. Não queremos apenas ensinar sobre oração, mas que as crianças aprendam a orar. O treinamento acontece por meio de projetos.",
    versiculo: undefined,
    superficie: "escura" as const,
    cor: "amarelo" as const,
    /* Sem personagem de propósito. Os quatro personagens somam pouco e o brief
       pede que eles apoiem, não dominem — então cada um aparece UMA vez. O
       "personagem-treinamento" (o menino de sombrero) foi para a seção do
       alcance, onde a nacionalidade dele faz trabalho de verdade ao lado do
       número de nações; aqui a etapa se sustenta na foto e no numeral amarelo,
       que sobre o escuro é o acento mais forte da página. */
    personagem: undefined,
    foto: {
      src: "/kids/treinamento.jpg",
      alvo: "public/kids/treinamento.jpg",
      alt: "Crianças de mãos levantadas no louvor, com a equipe ministrando à frente",
    } satisfies Foto,
  },
];

/** Os quatro projetos anuais. Todos rodam em todas as células ao mesmo tempo.
 *  Samuel e Crescer Multiplicar caem nos jejuns de 21 dias da igreja. */
export const PROJETOS = [
  {
    n: "01",
    nome: "Samuel",
    quando: "Jejum de 21 dias, 1º semestre",
    texto:
      "Durante três semanas, as crianças são conduzidas a orar pela salvação de um membro da própria família. No fim do jejum, esses familiares são convidados para um evento-ponte.",
    cor: "magenta" as const,
  },
  {
    n: "02",
    nome: "Crescer Multiplicar",
    quando: "Jejum de 21 dias, 2º semestre",
    texto:
      "As crianças oram pela conversão de um amigo. O alvo é treinar os membros da célula para orar e evangelizar.",
    cor: "ciano" as const,
  },
  {
    n: "03",
    nome: "MT 28",
    quando: "Meses de férias",
    texto:
      "Baseado em Mateus 28.19. São as crianças e juvenis que conduzem as reuniões, nas células e nos cultos, repetindo as lições do semestre.",
    cor: "amarelo" as const,
  },
  {
    n: "04",
    nome: "Ide",
    quando: "Na virada dos 12 anos",
    texto:
      "Auxilia o envio dos juvenis de 12 anos para a Rede de Adolescentes. O coordenador da célula e o discipulador procuram uma célula de adolescentes perto da casa do juvenil.",
    cor: "roxo" as const,
  },
];
