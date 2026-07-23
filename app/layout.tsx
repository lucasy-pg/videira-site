import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
