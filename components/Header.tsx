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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-[headerIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both] ${
        scrolled || isMenuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_icon.png"
                alt="Igreja Videira"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              />
            </div>
            <div>
              <div
                className="text-foreground font-semibold text-base sm:text-lg leading-tight tracking-wide uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Igreja Videira
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Indaiatuba
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors rounded-md ${
                  isActive(item.path)
                    ? "text-violet-700"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute left-4 right-4 -bottom-0.5 h-px origin-left bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 ${
                    isActive(item.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/contato"
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:shadow-lg hover:shadow-violet-600/30 hover:-translate-y-0.5 active:scale-95 transition-all"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Participar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <X
              size={24}
              className={`transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute inset-2"}`}
            />
            <Menu
              size={24}
              className={`transition-all duration-300 ${isMenuOpen ? "rotate-90 opacity-0 absolute inset-2" : "rotate-0 opacity-100"}`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
            isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-6 pt-2 border-t border-border">
              {navItems.map((item, i) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-4 py-3 text-base font-medium uppercase tracking-wider transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-violet-700"
                      : "text-muted-foreground hover:text-foreground hover:translate-x-1"
                  } ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    transitionDelay: isMenuOpen ? `${i * 50}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div
                className={`mt-4 px-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                style={{ transitionDelay: isMenuOpen ? `${navItems.length * 50}ms` : "0ms" }}
              >
                <Link
                  href="/contato"
                  className="block text-center px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold uppercase tracking-wider rounded-full active:scale-95 transition-transform"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Participar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
