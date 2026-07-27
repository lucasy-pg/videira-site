import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const socials = [
  {
    href: "https://www.instagram.com/videiraindaiatuba/",
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.12.3-.28.8-.32 1.7C3.25 8.5 3.25 8.9 3.25 12s0 3.5.07 4.7c.04.9.2 1.4.32 1.7.17.43.37.74.7 1.06.31.32.62.52 1.05.7.3.12.8.28 1.7.32 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c.9-.04 1.4-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.31.52-.62.7-1.05.12-.3.28-.8.32-1.7.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.04-.9-.2-1.4-.32-1.7a2.8 2.8 0 0 0-.7-1.06 2.8 2.8 0 0 0-1.05-.7c-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4Zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.15-1.44a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    href: "https://www.youtube.com/@igrejavideiraindaiatuba",
    label: "YouTube",
    path: "M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.4a2.5 2.5 0 0 0-1.8 1.8C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.4a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12Zm-13 3V9l5.2 3-5.2 3Z",
  },
  {
    href: "https://www.facebook.com/videiraindaiatuba/",
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.75-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
  },
];

const navItems = [
  { path: "/", label: "Início" },
  { path: "/sobre", label: "Sobre" },
  { path: "/celulas", label: "Células" },
  { path: "/radicais-livres", label: "Radicais Livres" },
  { path: "/radicais-kids", label: "Radicais Kids" },
  { path: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <Reveal className="md:col-span-2" variant="left">
            <div className="flex items-center gap-3 mb-4 group w-fit">
              <div className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo_icon.png"
                  alt="Igreja Videira"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span
                className="text-foreground font-semibold text-lg uppercase tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Igreja Videira
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Uma comunidade neopentecostal em células da graça, conectando
              vidas e transformando corações em Indaiatuba.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-white hover:bg-violet-600 hover:-translate-y-1 hover:rotate-6 active:scale-90 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3
              className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="group inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-violet-600 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <h3
              className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Indaiatuba — SP</li>
              <li>contato@igrejavideira.com.br</li>
              <li>(19) 99999-9999</li>
              <li className="pt-1">Dom: 10h e 18h</li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Igreja Videira Indaiatuba. Todos os direitos reservados.</span>
          <span>Feito com amor e graça.</span>
        </Reveal>
      </div>
    </footer>
  );
}
