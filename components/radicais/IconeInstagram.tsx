import { GLIFOS } from "@/lib/social";

/**
 * O glifo do Instagram.
 *
 * O `lucide-react`, que serve todos os outros ícones do site, TIROU os ícones
 * de marca — `import { Instagram } from "lucide-react"` hoje quebra o build com
 * "Export Instagram doesn't exist". Logos de terceiros saíram de lá por questão
 * de licença e não vão voltar. O desenho vem de `lib/social.ts`, o mesmo que o
 * rodapé usa.
 *
 * ⚠️ ESTA CÓPIA SUBSTITUIU A QUE MORAVA NO `app/radicais-livres/page.tsx`. Ela
 * estava escrita lá dentro porque só a página a usava; com o redesenho são três
 * seções em três arquivos diferentes que precisam dela, e função repetida três
 * vezes é o começo de três versões diferentes do mesmo ícone.
 *
 * `aria-hidden` porque o texto ao lado do ícone já diz o que ele é: anunciar
 * "imagem: instagram" antes de "@rlindaiatuba" é ler a mesma coisa duas vezes.
 */
export function IconeInstagram({ className = "h-[17px] w-[17px]" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={GLIFOS.instagram} />
    </svg>
  );
}
