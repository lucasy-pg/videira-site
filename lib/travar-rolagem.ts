/**
 * Trava a rolagem da página enquanto alguma coisa está aberta por cima dela —
 * o menu de cápsulas e a foto ampliada da galeria.
 *
 * ── POR QUE ISTO NÃO É `document.body.style.overflow = "hidden"` ──────────
 *
 * Porque nesta base de código aquilo NÃO FUNCIONA, e o defeito é silencioso:
 * o estilo é aplicado, o `getComputedStyle` confirma `hidden`, e a página rola
 * assim mesmo. Medido no navegador, com o menu aberto: a roda do mouse movia o
 * documento normalmente por trás do véu.
 *
 * A causa está a uma regra de distância, no `app/globals.css`:
 *
 *     html { overflow-x: clip; }
 *
 * O `overflow` do `<body>` só governa a rolagem da PÁGINA por propagação, e a
 * propagação só acontece enquanto o `<html>` está em `visible`. Com o `html`
 * declarando qualquer outro valor — e `clip` é outro valor —, a propagação
 * deixa de existir: o `overflow` do body passa a valer para o próprio body, que
 * não é o contêiner de rolagem de nada. O comentário do `globals.css` já
 * registra esse mesmo mecanismo, na direção oposta (foi por ele que a regra de
 * recorte horizontal teve de sair do body e ir para o html).
 *
 * A trava, então, vai no elemento que de fato rola: o `<html>`.
 *
 * ── A COMPENSAÇÃO DA BARRA ────────────────────────────────────────────────
 *
 * Esconder a rolagem tira a barra, e tirar a barra alarga o viewport em ~15px
 * no desktop — a página inteira pula de lado no instante em que o menu abre. O
 * `padding-right` devolve exatamente a largura que a barra ocupava.
 *
 * Aqui isso importa duas vezes: atrás do véu pode estar o palco pinado da
 * galeria, cuja composição é calculada em porcentagem da largura da tela. Sem a
 * compensação, abrir o menu recomporia trinta fotos.
 *
 * ── USO ───────────────────────────────────────────────────────────────────
 *
 *     useEffect(() => {
 *       if (!aberto) return;
 *       return travarRolagem();
 *     }, [aberto]);
 *
 * Devolve a função que desfaz — feita para ser o retorno de um `useEffect`.
 * Ela restaura os valores que ESTAVAM lá, e não valores fixos: se um dia duas
 * camadas se sobrepuserem, a de baixo não é apagada pela de cima ao fechar.
 */
export function travarRolagem(): () => void {
  const raiz = document.documentElement;
  const folga = window.innerWidth - raiz.clientWidth;

  const antes = {
    overflowY: raiz.style.overflowY,
    paddingRight: raiz.style.paddingRight,
  };

  // `overflowY` e não `overflow`: o `overflow-x: clip` do `globals.css` é o que
  // mata a rolagem lateral no celular, e escrever no atalho o apagaria.
  raiz.style.overflowY = "hidden";
  if (folga > 0) raiz.style.paddingRight = `${folga}px`;

  return () => {
    raiz.style.overflowY = antes.overflowY;
    raiz.style.paddingRight = antes.paddingRight;
  };
}
