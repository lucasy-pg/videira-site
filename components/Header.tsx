"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", label: "Início" },
  { path: "/sobre", label: "Sobre" },
  { path: "/celulas", label: "Células" },
  { path: "/radicais-livres", label: "Radicais Livres" },
  { path: "/radicais-kids", label: "Radicais Kids" },
  { path: "/contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  // O menu guarda a rota em que foi aberto: ao navegar, ele fecha sozinho
  // sem precisar de um efeito que dispara setState em cascata.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const isMenuOpen = menu.open && menu.path === pathname;
  const toggleMenu = () => setMenu({ open: !isMenuOpen, path: pathname });

  useEffect(() => {
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
  }, []);

  // Some ao descer, volta ao subir — mas nunca some com o menu mobile aberto.
  const isHidden = hidden && !isMenuOpen;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    // Nenhum hero é full-bleed escuro — o vídeo da Home mora num retângulo
    // com margem. O header sempre senta no bone; a única mudança no scroll é
    // o fio de sombra que separa da página.
    <header
      className={`fixed inset-x-0 top-0 z-50 animate-[headerIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both] bg-bone/85 backdrop-blur-xl transition-all duration-500 ${isHidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "shadow-[0_1px_0_rgba(28,21,35,0.08)]" : ""}`}
    >
      <nav className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-colorida.png"
              alt="Igreja Videira"
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 sm:h-10 sm:w-10"
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-medium text-foreground sm:text-xl">
                Igreja Videira
              </div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Indaiatuba
              </div>
            </div>
          </Link>

          {/* Navegação desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${isActive(item.path)
                  ? "text-grape"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-grape transition-transform duration-300 ${isActive(item.path)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-[0.6]"
                    }`}
                />
              </Link>
            ))}
            <Link
              href="/contato"
              className="ml-5 rounded-full bg-plum-deep px-6 py-2.5 text-sm font-semibold text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
            >
              Planeje sua visita
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <button
            onClick={toggleMenu}
            className="relative p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
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
          className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">
            <div className="pb-7 pt-3">
              {navItems.map((item, i) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-display block px-2 py-2.5 text-2xl transition-all duration-300 ${isActive(item.path)
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
                    ? `${navItems.length * 45}ms`
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
