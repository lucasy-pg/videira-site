import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
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
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
