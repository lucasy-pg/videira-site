/* Rotas cujo hero é full-bleed e escuro, passando POR BAIXO do header.
   Duas coisas dependem desta lista e precisam concordar: o `<main>` do layout
   (que solta o `pt-16` reservado pro header) e o próprio Header (que fica
   transparente e troca o texto pra branco enquanto está no topo). Se as duas
   discordassem daria um de dois defeitos: nav branca sobre fundo bone —
   ilegível — ou uma faixa bone de 80px acima da foto que deveria sangrar. */
/* /radicais-livres VOLTOU para cá. Ela saiu quando a capa de lá era do tipo
   header sólido em cima, foto começando abaixo dele. Desde que a capa virou
   colagem com a câmera vagueando, cortar 4rem fora dela não tinha mais o que
   defender: a parede é o assunto e ela ganha a tela inteira. */
/* /radicais-kids entrou junto do redesenho: o herói de lá é uma faixa
   `plum-deep` full-bleed, e sem esta linha o `<main>` reservaria 4rem de bone
   acima dela — uma tira clara entre a nav e o roxo, que é exatamente o defeito
   que esta lista existe para evitar. */
/* A "/" entrou com o redesenho da Home. A capa dela era um retângulo de vídeo
   com margem bone em volta e header sólido por cima; virou a filmagem ocupando
   `100svh` inteiro, e sem esta linha o <main> reservaria 4rem de bone acima do
   vídeo — a tira clara entre a nav e a imagem que é exatamente o defeito que
   esta lista existe para evitar. A barra continua FIXA (a Home não está na
   `ROTAS_HEADER_ESTATICO`): ela flutua transparente sobre o vídeo e ganha
   fundo assim que a página sai do topo. */
export const OVERLAY_ROUTES = [
  "/",
  "/radicais-livres",
  "/radicais-kids",
];

export const isOverlayRoute = (pathname: string) =>
  OVERLAY_ROUTES.includes(pathname);

/* Rotas em que a barra do topo é ESTÁTICA: ela desenha no alto do documento,
   por cima do herói, e sai de cena com a rolagem como qualquer outro conteúdo.
   Nada de `fixed`, nada de sumir ao descer e voltar ao subir, nada de ganhar
   fundo ao sair do topo.

   POR QUE A /radicais-livres É ASSIM. A página é uma sequência de peças em tela
   cheia: a capa com a colagem vagueando, o letreiro RADICAL LIVRES e, no fim, a
   galeria com o palco pinado por seis alturas de tela. Uma barra fixa
   atravessada no alto disputa o quadro com as três — e no trecho pinado ela é
   pior do que isso: some e volta com a direção da rolagem, então pisca em cima
   de uma composição que não se move junto. Estática, ela cumpre o papel dela
   nos primeiros metros da página e depois some para não voltar.

   ⚠️ ISTO E A `OVERLAY_ROUTES` SÃO LISTAS DIFERENTES, e a diferença importa:
   overlay é "o herói passa POR BAIXO da barra" (a /radicais-kids está aí, com
   barra fixa); esta é "a barra não acompanha a rolagem". Uma rota pode estar
   nas duas
   — a /radicais-livres está — porque o `<main>` continua precisando saber que
   não deve reservar a altura de uma barra que não ocupa espaço no fluxo. */
export const ROTAS_HEADER_ESTATICO = ["/radicais-livres"];

export const temHeaderEstatico = (pathname: string) =>
  ROTAS_HEADER_ESTATICO.includes(pathname);
