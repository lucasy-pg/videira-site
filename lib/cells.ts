/**
 * Fonte única das células. A Home e a página /celulas leem daqui — os números
 * anunciados no site (células, bairros) são DERIVADOS desta lista, nunca
 * digitados à mão. Antes eram, e havia duas versões diferentes da mesma
 * verdade: a Home dizia "26 células" enquanto a lista tinha 22.
 *
 * O que o site publica sobre cada célula é, de propósito, só BAIRRO e PÚBLICO.
 * Dia, horário, rua e líder mudam com frequência demais pra viver num arquivo
 * versionado — informação desatualizada num site institucional é pior do que
 * informação ausente, porque manda alguém pra uma casa em que não tem ninguém.
 * Quem se identifica com o bairro fala no WhatsApp e recebe o endereço certo.
 *
 * A unidade aqui é a CÉLULA, uma por linha, e não o bairro: é o que permite
 * dizer "7 células no Morada do Sol" e, quando filtrado por Jovens, dizer "1"
 * no mesmo bairro. Um registro por bairro com um campo `quantidade` não
 * conseguiria as duas coisas. Pra cadastrar uma célula nova, acrescente uma
 * linha — os agrupamentos, contagens e a lista de bairros se refazem sozinhos.
 */

/** Uma célula pode atender mais de um público (o caso comum é Adultos + Kids). */
export type Audience = "Adultos" | "Jovens" | "Kids";

export type Cell = {
  neighborhood: string;
  audience: Audience[];
};

/** Ordem de exibição dos públicos — não alfabética, e é intencional: é a ordem
    em que a igreja fala deles ("adultos, jovens e kids"). */
export const AUDIENCES: Audience[] = ["Adultos", "Jovens", "Kids"];

/**
 * ⚠️ LISTA PROVISÓRIA — herdada do site anterior e ainda não conferida.
 * Os bairros e as contagens vieram do cadastro antigo; o público está marcado
 * como "Adultos + Kids" em todas porque era o único rótulo que existia lá.
 * Substituir pela lista real (bairro + quantas células + público de cada uma).
 *
 * FALTAM AS CÉLULAS DE JOVENS. Elas EXISTEM (confirmado com a igreja) e não
 * estão aqui — o cadastro antigo não as trazia. Enquanto não entrarem, o filtro
 * "Jovens" do índice de bairros não aparece, porque `activeAudiences` só oferece
 * o que a lista tem: é o comportamento correto, não um bug. Assim que as linhas
 * com `audience: ["Jovens"]` forem acrescentadas, o botão surge sozinho e o
 * /radicais-livres passa a ter para onde apontar.
 */
export const cells: Cell[] = [
  { neighborhood: "Alto da Colina", audience: ["Adultos", "Kids"] },
  { neighborhood: "Campo Bonito", audience: ["Adultos", "Kids"] },
  { neighborhood: "Cecap", audience: ["Adultos", "Kids"] },
  { neighborhood: "Cidade Nova", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Adriana", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Alice", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Esplanada II", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Morada do Sol", audience: ["Adultos", "Kids"] },
  /* ⚠️ AS DUAS LINHAS ABAIXO NÃO VIERAM DO CADASTRO — vieram do briefing da
     página /celulas, que lista o Jd. Paulista e o Rêmulo Zoppi entre os
     bairros com célula e o cadastro antigo não trazia nenhum dos dois.

     UMA LINHA CADA É PISO, NÃO MEDIDA: o briefing diz que HÁ célula ali, não
     quantas. Como tudo nesta página é derivado desta lista, cravar duas ou
     três aqui seria publicar um número inventado; uma é o mínimo que a fonte
     sustenta. Quando a lista real chegar, estas duas entram na conferência
     junto com as outras 22. */
  { neighborhood: "Jd. Paulista", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Paulistano", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Regina", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Renata", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Renata", audience: ["Adultos", "Kids"] },
  { neighborhood: "Jd. Regente", audience: ["Adultos", "Kids"] },
  { neighborhood: "Monte Verde", audience: ["Adultos", "Kids"] },
  { neighborhood: "Parque das Nações", audience: ["Adultos", "Kids"] },
  { neighborhood: "Parque Res. Indaiá", audience: ["Adultos", "Kids"] },
  { neighborhood: "Pq. São Lourenço", audience: ["Adultos", "Kids"] },
  { neighborhood: "Rêmulo Zoppi", audience: ["Adultos", "Kids"] },
];

export type NeighborhoodGroup = {
  name: string;
  /** Total de células no bairro. */
  total: number;
  /** Quantas células atendem cada público. Uma célula "Adultos + Kids" conta
      nos DOIS, então a soma daqui é maior que `total` — de propósito: a
      pergunta que isto responde é "quantas células de kids tem aqui?". */
  byAudience: Record<Audience, number>;
};

/** Bairros com célula, em ordem alfabética pt-BR. */
export const neighborhoodGroups: NeighborhoodGroup[] = (() => {
  const grouped = new Map<string, Cell[]>();
  for (const cell of cells) {
    const list = grouped.get(cell.neighborhood);
    if (list) list.push(cell);
    else grouped.set(cell.neighborhood, [cell]);
  }

  return [...grouped]
    .map(([name, list]) => ({
      name,
      total: list.length,
      byAudience: Object.fromEntries(
        AUDIENCES.map((a) => [
          a,
          list.filter((c) => c.audience.includes(a)).length,
        ]),
      ) as Record<Audience, number>,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
})();

/** Só os nomes — a lista que a Home recita. */
export const neighborhoods = neighborhoodGroups.map((g) => g.name);

/** Públicos que existem de fato na lista, na ordem de `AUDIENCES`. Os filtros
    da página saem daqui: se um dia não houver nenhuma célula de jovens, o
    botão "Jovens" some sozinho em vez de filtrar pra uma lista vazia. */
export const activeAudiences = AUDIENCES.filter((a) =>
  cells.some((c) => c.audience.includes(a)),
);

/* Instanciado uma vez no módulo, não a cada render: construir um Intl.*
   é caro e o resultado aqui é sempre o mesmo. */
const listFormatter = new Intl.ListFormat("pt-BR", {
  style: "long",
  type: "conjunction",
});

/** "adultos e kids", "adultos, jovens e kids" — pra ler dentro de uma frase. */
export const formatAudiences = (list: Audience[]) =>
  listFormatter.format(list.map((a) => a.toLowerCase()));
