/**
 * Fonte única das células. A Home e a página /celulas leem daqui — os números
 * anunciados na Home (26 células, 16 bairros) são DERIVADOS desta lista, não
 * digitados à mão. Antes eram, e a Home dizia '8 bairros' quando já eram 16.
 */
export type CellGroup = {
  name: string;
  address: string;
  neighborhood: string;
  day: string;
  time: string;
  audience: string;
  tag: string;
};

export const cellGroups: CellGroup[] = [
  { name: "Alto da Colina", address: "R. Júlia Augusta Steffen", neighborhood: "Alto da Colina", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Campo Bonito", address: "Av. Ottilia Ferraz de Camargo Brasil", neighborhood: "Campo Bonito", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Cecap", address: "R. Amadeu Furlan — Núcleo Hab.", neighborhood: "Cecap", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Cidade Nova II", address: "R. Amazonas", neighborhood: "Cidade Nova", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Epifania", address: "R. Olívio Nicola D'Ercoli — Jd. Esplanada", neighborhood: "Jd. Esplanada", day: "Sábado", time: "19h30", audience: "Jovens", tag: "Jovens" },
  { name: "Esplanada II", address: "R. Romão Pérez Corral — Jd. Esplanada II", neighborhood: "Jd. Esplanada II", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Filipenses", address: "R. Tupaciguara — Jd. Renata", neighborhood: "Jd. Renata", day: "Quinta", time: "19h00", audience: "Adultos", tag: "Adultos" },
  { name: "Jardim Adriana", address: "R. Sidney Vianna", neighborhood: "Jd. Adriana", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Alice", address: "R. Humberto Batisti", neighborhood: "Jd. Alice", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol", address: "R. Lourenço Rossi", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol I", address: "R. Maria José de Assis Lyra", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol II", address: "R. Carlos Alberto Garcia", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol III", address: "R. Antônio Magnusson", neighborhood: "Jd. Morada do Sol", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol IV", address: "R. Paulo Von Ah", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Morada do Sol V", address: "R. João Narezzi", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Paulistano", address: "R. Freguesia do Ó", neighborhood: "Jd. Paulistano", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Regina", address: "R. Ricieri Scachetti", neighborhood: "Jd. Regina", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Renata", address: "R. Eliza Aléssio Martins", neighborhood: "Jd. Renata", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Jardim Renata II", address: "R. Tupaciguara", neighborhood: "Jd. Renata", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Kairós", address: "R. Carlos Alberto Garcia — Morada do Sol", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Jovens", tag: "Jovens" },
  { name: "Manancial", address: "R. Júlia Augusta Steffen — Alto da Colina", neighborhood: "Alto da Colina", day: "Quinta", time: "19h30", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Monte Verde", address: "R. Guarino Vanucci", neighborhood: "Monte Verde", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Morada do Sol", address: "R. Custódio Cândido Carneiro", neighborhood: "Jd. Morada do Sol", day: "Sexta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Parque das Nações", address: "R. José Francisco Ceccon", neighborhood: "Parque das Nações", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Parque Res. Indaiá", address: "R. Pedro Batista Apolinário", neighborhood: "Parque Res. Indaiá", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
  { name: "Pq. São Lourenço", address: "R. Giórgio Clini", neighborhood: "Pq. São Lourenço", day: "Quinta", time: "20h00", audience: "Adultos e Crianças", tag: "Família" },
];

/** Bairros distintos, em ordem alfabética pt-BR — a lista que a Home recita. */
export const neighborhoods = [
  ...new Set(cellGroups.map((c) => c.neighborhood)),
].sort((a, b) => a.localeCompare(b, 'pt-BR'));
