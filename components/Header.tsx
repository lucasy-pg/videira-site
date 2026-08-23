"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { isOverlayRoute, temHeaderEstatico } from "@/lib/overlay-routes";

/* O menu do topo NÃO é o mapa do site — o rodapé é. Aqui só entra o que a
   pessoa precisa escolher, e por isso "Início" e "Contato" saíram: o logo à
   esquerda já leva à Home e o botão "Planeje sua visita" à direita já leva ao
   /contato, então os dois ocupavam espaço para repetir um destino que a mesma
   barra oferece. O espaço que sobrou é para o "Trilho do Vencedor", que é a
   página que faltava. Passar de seis itens quebra a linha no laptop.

   ⚠️ O "Início" VOLTOU, MAS SÓ NA GAVETA DO CELULAR — ver `itensMobile`, logo
   abaixo. Esta lista aqui continua sendo a da barra do desktop. */
const navItems = [
  { path: "/sobre", label: "Sobre" },
  { path: "/celulas", label: "Células" },
  { path: "/radicais-livres", label: "Radicais Livres" },
  { path: "/radicais-kids", label: "Radicais Kids" },
  { path: "/trilho-do-vencedor", label: "Trilho do Vencedor" },
];

/* A GAVETA DO CELULAR TEM UM ITEM A MAIS, e a lista é outra por isso.
   O argumento que tirou o "Início" da barra é o logo à esquerda, que leva à
   Home — mas na gaveta aberta o logo fica LÁ EM CIMA, fora da lista, ao lado do
   X de fechar: a pessoa está lendo uma coluna de destinos e o caminho de volta
   não é um deles. No desktop os cinco links e o logo dividem a mesma linha e a
   vizinhança resolve; aqui não.

   ⚠️ E NÃO CABE UM SEXTO NA BARRA DE CIMA: a medida está no comentário da
   navegação desktop, logo abaixo. É por isso que este item existe só aqui, e
   não voltando ao `navItems`.

   PRIMEIRO DA LISTA porque é o começo do mapa, não uma opção a mais no fim — e
   é o único item que aponta para fora da hierarquia das páginas internas. */
const itensMobile = [{ path: "/", label: "Início" }, ...navItems];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  /* A BARRA ESTÁTICA (hoje só a /radicais-livres): desenha no alto do
     documento, sobre o herói, e vai embora com a rolagem. Ela ignora TUDO o
     que o resto do site faz no scroll — não some ao descer, não volta ao
     subir, não ganha fundo nem sombra ao sair do topo. Ver o porquê em
     `lib/overlay-routes.ts`. */
  const estatico = temHeaderEstatico(pathname);

  // O menu guarda a rota em que foi aberto: ao navegar, ele fecha sozinho
  // sem precisar de um efeito que dispara setState em cascata.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const isMenuOpen = menu.open && menu.path === pathname;
  const toggleMenu = () => setMenu({ open: !isMenuOpen, path: pathname });

  useEffect(() => {
    // Na barra estática nada do que este ouvinte mede é consultado — nem o
    // fundo, nem o esconde/aparece. Sair aqui evita medir a rolagem justamente
    // na página que mais rola (a galeria tem seis alturas de tela pinadas).
    if (estatico) return;

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Só esconde depois de passar a altura do próprio header, senão ele
      // pisca ao menor scroll perto do topo.
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [estatico]);

  // Some ao descer, volta ao subir — mas nunca some com o menu mobile aberto.
  const isHidden = hidden && !isMenuOpen && !estatico;

  /* Este componente já publicou o estado da barra num `data-nav` no <html>,
     para que seções pregadas pudessem reagir só com CSS à faixa de 5rem que
     fica sem dono quando ela sai. Ficou sem nenhum leitor e virava enfeite.
     Quem precisar do estado de novo: é uma linha, mas confira antes se a seção
     não resolve sozinha com a altura da janela, que não depende de
     JavaScript. */

  /* Nas rotas de hero full-bleed (ver `OVERLAY_ROUTES`) o header flutua sobre a
     foto e inverte o texto pra branco. Volta a ser sólido assim que sai do topo
     — e também com o menu mobile aberto, senão a gaveta de links cai sobre a
     imagem e vira texto branco sobre foto clara. */
  /* NA BARRA ESTÁTICA O "SAIR DO TOPO" NÃO EXISTE: ela não flutua, então nunca
     deixa de estar sobre o herói. Virar sólida no meio da rolagem seria pintar
     uma faixa bone por cima da colagem escura e depois levá-la embora — por
     isso o `scrolled` não entra na conta aqui. O menu mobile continua entrando:
     a gaveta precisa de fundo para os links escuros ficarem legíveis. */
  const onPhoto = estatico
    ? !isMenuOpen
    : isOverlayRoute(pathname) && !scrolled && !isMenuOpen;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    /* Fora das rotas de overlay o header sempre senta no bone e a única
       mudança no scroll é o fio de sombra que separa da página.

       `absolute` E NÃO `fixed` na barra estática, e nunca `relative`: ela
       precisa continuar FORA do fluxo para o herói full-bleed subir por baixo
       dela (é a mesma razão de a rota estar em `OVERLAY_ROUTES`, que é o que
       tira o `pt-16` do `<main>`). Sem ancestral posicionado, o `absolute`
       resolve contra o bloco inicial, ou seja, o alto do documento — que é
       exatamente onde ela deve ficar parada enquanto a página rola por cima. */
    <header
      className={`${estatico ? "absolute" : "fixed"} inset-x-0 top-0 z-50 animate-[headerIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both] transition-all duration-500 ${estatico ? "" : isHidden ? "-translate-y-full" : "translate-y-0"
        } ${onPhoto
          ? "bg-transparent"
          : `bg-bone/85 backdrop-blur-xl ${scrolled && !estatico ? "shadow-[0_1px_0_rgba(28,21,35,0.08)]" : ""}`
        }`}
    >
      <nav className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/logo-colorida.png"
              alt="Igreja Videira"
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 sm:h-10 sm:w-10"
            />
            <div className="leading-tight">
              <div
                className={`font-display text-lg font-semibold transition-colors duration-500 sm:text-xl ${onPhoto ? "text-white" : "text-foreground"}`}
              >
                Igreja Videira
              </div>
              <div
                className={`text-[10px] uppercase tracking-[0.24em] transition-colors duration-500 ${onPhoto ? "text-white/65" : "text-muted-foreground"}`}
              >
                Indaiatuba
              </div>
            </div>
          </Link>

          {/* Navegação desktop — vira a partir de `xl` (1280px), não de `lg`.
              Quando eram quatro links a linha media ~980px somando logo, links
              e botão, e o container em `lg` oferece 928px: em 1024px exatos os
              links passavam por baixo do botão. Entre 1024 e 1279 mostra-se a
              gaveta, que é completa e animada — melhor que uma barra quebrada.
              Se um dia algum rótulo encurtar, dá para voltar a `lg`.

              O "Sobre" entrou como quinto link junto da página /sobre, e foi
              medido: em 1280px o bloco de links dá 730px e o logo 159px contra
              1184px de container — 295px de folga, a barra não encosta. Um
              sexto link pede medida nova. */}
          <div className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${onPhoto
                  ? isActive(item.path)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                  : isActive(item.path)
                    ? "text-grape"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-300 ${onPhoto ? "bg-white" : "bg-grape"} ${isActive(item.path)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-[0.6]"
                    }`}
                />
              </Link>
            ))}
            {/* Sobre a foto o plum-deep sumiria no véu escuro do hero — o botão
                inverte pro par claro, o mesmo do CTA principal da Home. */}
            <Link
              href="/contato"
              className={`ml-5 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${onPhoto
                ? "bg-bone text-plum-deep hover:bg-white"
                : "bg-plum-deep text-bone hover:bg-plum"
                }`}
            >
              Planeje sua visita
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <button
            onClick={toggleMenu}
            className={`relative p-2 transition-colors xl:hidden ${onPhoto ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            <X
              size={24}
              className={`transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "absolute inset-2 -rotate-90 opacity-0"}`}
            />
            <Menu
              size={24}
              className={`transition-all duration-300 ${isMenuOpen ? "absolute inset-2 rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            />
          </button>
        </div>

        {/* Navegação mobile */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out xl:hidden ${isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">
            <div className="pb-7 pt-3">
              {itensMobile.map((item, i) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-display block px-2 py-2.5 text-2xl font-semibold transition-all duration-300 ${isActive(item.path)
                    ? "text-grape"
                    : "text-foreground/70 hover:translate-x-1 hover:text-foreground"
                    } ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                  style={{
                    transitionDelay: isMenuOpen ? `${i * 45}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div
                className={`mt-5 px-2 transition-all duration-300 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                style={{
                  transitionDelay: isMenuOpen
                    ? `${itensMobile.length * 45}ms`
                    : "0ms",
                }}
              >
                <Link
                  href="/contato"
                  className="block rounded-full bg-plum-deep px-6 py-3.5 text-center text-sm font-semibold text-bone transition-transform active:scale-95"
                >
                  Planeje sua visita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
