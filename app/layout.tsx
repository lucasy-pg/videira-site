import type { Metadata } from "next";
import { Instrument_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Footer } from "@/components/Footer";

/* ── A FONTE DA CASA É A MANROPE, e ela é UMA SÓ ──────────────────────────
   Manrope é variável (eixo `wght`, 200–800): um arquivo só entrega os três
   pesos que o site usa — 400 no texto corrido, 500 em TODA manchete (da capa
   da página ao título de card) e 600 na navegação, nos botões, nos rótulos em
   caixa alta e nas labels de formulário. Pedir pesos avulsos aqui seria trocar
   um download por três, e um deles mudaria de valor na próxima revisão: as
   manchetes já foram 700/600 e o Lucas pediu mais leve. Ser variável é o que
   torna essa revisão gratuita.

   Ela ocupa os DOIS tokens de `globals.css`: `--font-display` (manchete) e
   `--font-body` (corpo), nas SETE rotas. Saíram daqui, nesta ordem, a
   Newsreader (serifa de manchete), a Instrument Sans (corpo — que sobrevive só
   na /radicais-livres, ver abaixo) e a Poppins. Se um dia alguém quiser
   qualquer uma de volta, ela volta como token, não como `font-family` solto em
   componente.

   ⚠️ A MANROPE NÃO TEM ITÁLICO no Google Fonts — a família é só romana. Todo
   `<em>`/`italic` que sobrar no site cai no oblíquo sintético do navegador, que
   é exatamente a situação que a Poppins já impunha antes dela; nada regrediu,
   mas nada foi liberado também. O único itálico real que resta no projeto é o
   da Instrument Serif, dentro da /radicais-livres. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

/* ── A INSTRUMENT SANS SERVE UMA ROTA SÓ: /radicais-livres ────────────────
   Ela NÃO é mais a fonte de corpo do site — é a Manrope. Fica aqui porque o
   TEXTO CORRIDO da /radicais-livres continua nela: é companheira de projeto da
   Instrument Serif (mesmo estúdio), que é a fonte de cartaz daquela página, e
   o par serifa/grotesca é parte da direção de arte de lá. Quem devolve o token
   é a classe `.tipografia-radicais` (globals.css), que só a raiz daquela
   página põe.

   Por isso a variável continua no <html>: quem redefine o token numa subárvore
   precisa que a fonte já tenha sido carregada no documento. Tirar esta linha
   apaga o corpo de texto da /radicais-livres.

   ⚠️ A POPPINS MORAVA AQUI E FOI EMBORA. Ela foi a fonte de manchete do site,
   depois só da /radicais-livres, e saiu do projeto em 22/08/2026 a pedido do
   Lucas — a manchete daquela rota também é Manrope agora. Não vale reintroduzir
   um `Poppins()` sem antes ler o cabeçalho de `app/radicais-livres/page.tsx`:
   as medidas em `ch` e os `letter-spacing` dos módulos de lá foram todos
   reacertados para a Manrope. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Igreja Videira Indaiatuba — Apaixonados por Jesus",
  description:
    "Uma comunidade neopentecostal viva, conectada em células pela graça de Deus — em cada bairro, em cada casa de Indaiatuba.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* `data-scroll-behavior="smooth"` NÃO é decoração e não pode sumir daqui.
       Ele avisa o Next que o `scroll-behavior: smooth` do globals.css deve ser
       SUSPENSO durante a troca de rota: o router põe `auto`, salta pro topo
       instantaneamente e devolve o `smooth` depois.

       Sem esse atributo (o padrão do Next 16 — até o 15 o router fazia isso
       sozinho), sair do rodapé de uma página e clicar noutra no menu vira uma
       rolagem ANIMADA do fim ao topo do documento novo. No caminho, a página
       inteira desfila pela viewport e cada <Reveal> dispara o próprio
       IntersectionObserver — que se desconecta na primeira intersecção. O
       resultado é a página chegando ao topo com todas as animações já gastas:
       o usuário desce e não acontece mais nada.

       Ver `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`,
       seção "Scroll Behavior Override". A alternativa seria tirar o `smooth` do
       CSS, mas aí todo atalho de âncora do site passa a saltar em vez de
       deslizar. */
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
