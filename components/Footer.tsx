import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  GLIFOS,
  INSTAGRAM_IGREJA,
  WHATSAPP_IGREJA,
  YOUTUBE_IGREJA,
} from "@/lib/social";

/* Os desenhos dos três ícones saíram daqui para `lib/social.ts` quando o
   /radicais-livres passou a precisar do mesmo glifo do Instagram para a conta
   da REDE (@rlindaiatuba, que não é esta). Duas cópias do mesmo caminho SVG em
   arquivos diferentes é o tipo de duplicata que ninguém percebe estar
   divergindo. O do YouTube seguiu o mesmo caminho quando a Home ganhou a seção
   "Nos acompanhe". Só o Facebook continua escrito aqui: é o único endereço que
   nenhuma outra página usa. */
const socials = [
  {
    href: INSTAGRAM_IGREJA.url,
    label: "Instagram",
    path: GLIFOS.instagram,
  },
  {
    href: YOUTUBE_IGREJA.url,
    label: "YouTube",
    path: GLIFOS.youtube,
  },
  {
    href: "https://www.facebook.com/videiraindaiatuba/",
    label: "Facebook",
    path: GLIFOS.facebook,
  },
];

/* Lista propositalmente DIFERENTE da do Header: o rodapé é o mapa completo do
   site e mantém "Início" e "Contato", que saíram do topo por serem redundantes
   com o logo e com o botão de visita. Não reunifique as duas. */
const navItems = [
  { path: "/", label: "Início" },
  { path: "/sobre", label: "Sobre" },
  { path: "/celulas", label: "Células" },
  { path: "/radicais-livres", label: "Radicais Livres" },
  { path: "/radicais-kids", label: "Radicais Kids" },
  { path: "/trilho-do-vencedor", label: "Trilho do Vencedor" },
  { path: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-plum-deep">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <Reveal className="md:col-span-2" variant="left">
            <div className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/marca/logo-icone.png"
                  alt="Igreja Videira"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="font-display text-xl font-semibold text-white">
                Igreja Videira
              </span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Uma comunidade em células da graça, conectando vidas e
              transformando corações em Indaiatuba.
            </p>
            <div className="flex items-center gap-3 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-plum-deep hover:bg-grape-light hover:-translate-y-1 active:scale-90 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-grape-light mb-5">
              Navegue
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="group inline-flex items-center text-white/60 hover:text-white transition-colors"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-grape-light transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-grape-light mb-5">
              Visite
            </h3>
            <ul className="space-y-3 text-white/60">
              <li className="text-white/85">Domingo · 9h e 18h</li>
              <li>
                R. Augusto de Oliveira Camargo, 257 - Centro
                <br />
                Indaiatuba/SP
              </li>
              {/* Endereço real, informado pela igreja — substituiu o
                  "contato@igrejavideira.com.br" do rascunho, que não existia.
                  Repare que é "indaituba", sem o segundo "a": é assim mesmo na
                  conta. Clicável, igual ao telefone logo abaixo. */}
              <li className="pt-1">
                <a
                  href="mailto:igrejavideiraindaituba@hotmail.com"
                  className="break-all transition-colors hover:text-white"
                >
                  igrejavideiraindaituba@hotmail.com
                </a>
              </li>
              {/* Era "(19) 99999-9999", placeholder do rascunho, num rodapé que
                  aparece nas sete páginas. É o número real que o site inteiro
                  já linka, agora clicável como o resto — e vindo de
                  `lib/social.ts`, que passou a ser o único lugar onde ele está
                  escrito. */}
              <li>
                <a
                  href={WHATSAPP_IGREJA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {WHATSAPP_IGREJA.exibicao}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <span>
            © 2026 Igreja Videira Indaiatuba. Todos os direitos reservados.
          </span>
          <span>Feito com amor e graça.</span>
        </Reveal>
      </div>
    </footer>
  );
}
