import type { Metadata } from "next";
import { Instrument_Sans, Newsreader, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Footer } from "@/components/Footer";

/* Newsreader carrega o eixo `opsz`: o mesmo desenho afina e aperta sozinho no
   título de 84px e engrossa no wordmark de 18px. É daí que vem a elegância —
   não de uma segunda fonte. */
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

/* Poppins NÃO é variável: cada peso é um arquivo, e pedir um peso a mais aqui
   é mais um download. São dois porque a página /sobre usa dois — 500 nas
   manchetes e 400 nos destaques. O 600 chegou a entrar e saiu: no corpo de
   manchete a Poppins semibold pesa demais. Sem itálico: a /sobre não tem
   nenhum, e o itálico da casa mora na Newsreader. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-poppins",
});

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
      className={`${newsreader.variable} ${instrumentSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
