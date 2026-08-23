import { GLIFOS } from "@/lib/social";

/**
 * O glifo do WhatsApp, para os botões que abrem uma conversa em vez de ir
 * para outra página do site.
 *
 * MORA NA RAIZ DE `components/` e não em `components/radicais/`, ao lado do
 * `IconeInstagram`: aquele é da rede de jovens e só o /radicais-livres o usa;
 * este serve a /celulas e serve qualquer página que venha a mandar alguém
 * para o WhatsApp da igreja.
 *
 * O desenho vem de `lib/social.ts` pelo motivo escrito lá: o `lucide-react`
 * tirou os ícones de marca e importar um deles quebra o build.
 *
 * `aria-hidden` porque o rótulo do botão já diz o que ele faz. O que o leitor
 * de tela precisa saber — que o link sai do site — não é o ícone que conta:
 * é o `target="_blank"` do próprio link.
 */
export function IconeWhatsApp({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={GLIFOS.whatsapp} />
    </svg>
  );
}
