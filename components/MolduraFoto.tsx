import Image from "next/image";
import type { Foto } from "@/lib/foto";

/**
 * O lugar de uma fotografia real, com ou sem a fotografia.
 *
 * As seis fotos da página já existem e estão em `public/kids/`, então hoje
 * todo slot cai no primeiro caminho. O estado vazio continua aqui por dois
 * motivos, e nenhum é decorativo:
 *
 * 1. Foi ele que permitiu desenhar e revisar a página inteira ANTES das fotos
 *    chegarem, com cada espaço no recorte exato que a foto viria a ocupar — por
 *    isso a página não mudou de forma no dia em que elas entraram.
 * 2. Se um arquivo for renomeado ou removido, o defeito aparece como um campo
 *    marcado com o caminho que falta, em vez de um 404 silencioso ou de uma
 *    imagem quebrada.
 *
 * NÃO transformar isto num placeholder cinza genérico: o valor está em ele
 * ocupar EXATAMENTE a área e o recorte que a foto vai ocupar, senão a página
 * muda de forma no dia em que as fotos chegarem.
 */
export function MolduraFoto({
  foto,
  className = "",
  sizes,
  eager = false,
  tom = "claro",
  posicao,
}: {
  foto: Foto;
  className?: string;
  sizes: string;
  /** Só para a foto do hero: carrega adiantado por ser o provável LCP.
   *  Next 16 depreciou `priority` — o caminho agora é `loading`/`fetchPriority`. */
  eager?: boolean;
  /** Em que superfície o vazio vai pousar, para o campo não sumir nem berrar. */
  tom?: "claro" | "escuro";
  /** `object-position`, para quando o recorte não pode ser o centro da foto.
   *  Só vale a pena quando a proporção do quadro é BEM diferente da do arquivo:
   *  se as duas forem parecidas, `object-cover` corta tão pouco que mover o
   *  ponto não muda nada na tela. O caso que pediu isto é a panorâmica do
   *  Encontro no /trilho-do-vencedor — a turma está no terço de baixo do
   *  quadro, e sem descer o ponto o corte come gente para sobrar copa de
   *  árvore. Vai como estilo e não como classe porque o valor é contínuo. */
  posicao?: string;
}) {
  if (foto.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={posicao ? { objectPosition: posicao } : undefined}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </div>
    );
  }

  const escuro = tom === "escuro";

  return (
    <div
      className={`relative overflow-hidden ${
        escuro ? "bg-white/[0.06]" : "bg-clay/70"
      } ${className}`}
      /* `role="img"` + `aria-label`: para o leitor de tela o espaço vazio
         descreve a foto que vai entrar, em vez de virar um <div> mudo. */
      role="img"
      aria-label={`Espaço reservado para fotografia: ${foto.alt}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.24em] ${
            escuro ? "text-white/45" : "text-muted-foreground"
          }`}
        >
          Fotografia
        </span>
        <span
          className={`max-w-full break-all font-mono text-[11px] leading-relaxed ${
            escuro ? "text-white/35" : "text-foreground/45"
          }`}
        >
          {foto.alvo}
        </span>
      </div>
    </div>
  );
}
