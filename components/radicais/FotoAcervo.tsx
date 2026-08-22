import { origens, type Foto } from "@/lib/radicais";

/**
 * UMA FOTOGRAFIA DO ACERVO DOS RADICAIS, servida pelo regime antigo.
 *
 * `public/radicais/` NÃO passa por `next/image` (ver `docs/imagens.md`): o
 * arquivo que entra na pasta é exatamente o que o visitante baixa, e quem monta
 * o `srcset` é o código. Este componente existe para que essa montagem aconteça
 * num lugar só nas seções novas da página — antes do redesenho ela estava
 * repetida em cada `<img>`, e o erro que isso produz é silencioso: uma foto
 * levemente macia, sem nada errado à vista.
 *
 * NÃO É UM `ImageWithFallback`. Aquele é componente de CLIENTE — existe pelo
 * `onError`, que precisa de estado — e usá-lo aqui tornaria de cliente sete
 * seções que hoje são de servidor inteiro, por causa de um caso (arquivo
 * faltando em produção) que nesta página não acontece: as fotos são versionadas
 * junto com o código, e o `docs/acervo.html` é o catálogo que impede alguém
 * apontar para um arquivo que não existe.
 *
 * `sizes` É OBRIGATÓRIO E NÃO TEM PADRÃO. Um `srcset` em `w` sem `sizes` faz o
 * navegador assumir `100vw` e baixar sempre o arquivo maior — que é exatamente
 * o custo que o `srcset` existe para evitar. Sem padrão, esquecer dá erro de
 * tipo em vez de dar uma foto de 1600px num vão de 200.
 */
export function FotoAcervo({
  foto,
  sizes,
  className,
  style,
  grande = false,
  prioridade = false,
}: {
  foto: Foto;
  /** A largura do VÃO em cada faixa de tela, na sintaxe do atributo `sizes`. */
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  /** Anuncia o mestre de 2400px. Só para as duas fotos que o têm, e só quando
   *  o vão de fato é grande — oferecê-lo sempre faria o navegador escolhê-lo
   *  para uma miniatura. */
  grande?: boolean;
  /** Sai da fila do `lazy`. Reservado para foto acima da dobra; nenhuma desta
   *  página está, então o padrão é `false`. */
  prioridade?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={foto.src}
      srcSet={origens(foto, grande)}
      sizes={sizes}
      alt={foto.alt}
      width={foto.w}
      height={foto.h}
      loading={prioridade ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
