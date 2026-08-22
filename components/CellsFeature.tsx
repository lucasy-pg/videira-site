import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cells, neighborhoods } from "@/lib/cells";

/**
 * Os quatro momentos de uma noite de célula.
 *
 * A copy aqui existe pra derrubar UMA objeção específica: "não sei o que
 * acontece lá dentro". Entrar na casa de um desconhecido é o pedido mais
 * pesado do site inteiro — mais pesado que ir num culto —, então cada card
 * responde o que a pessoa está com medo de perguntar (vou ter que falar em
 * público? preciso saber cantar? e se eu discordar?). Se um dia essa copy for
 * reescrita, manter esse critério: descrever, nunca vender.
 *
 * A rampa de cor é escuro→claro de propósito: a noite começa quieta e termina
 * no café. É a MESMA matiz em quatro luminosidades, nunca quatro cores —
 * cor categórica em blocos grandes já foi reprovada neste projeto antes.
 */
const night = [
  {
    n: "01",
    title: "Boas-vindas",
    desc: "Você chega, alguém abre a porta e apresenta você ao grupo. É possível apenas observar na primeira vez.",
    card: "bg-plum-deep",
    text: "text-white",
    body: "text-white/70",
    ghost: "text-white/[0.07]",
  },
  {
    n: "02",
    title: "Adoração",
    desc: "Duas ou três músicas, no violão mesmo. Uns cantam, outros apenas ouvem — os dois são normais.",
    card: "bg-plum",
    text: "text-white",
    body: "text-white/70",
    ghost: "text-white/[0.07]",
  },
  {
    n: "03",
    title: "Palavra",
    desc: "Alguém abre um texto curto da Bíblia e a conversa fica aberta. É possível perguntar, discordar ou apenas escutar.",
    card: "bg-grape",
    text: "text-white",
    body: "text-white/75",
    ghost: "text-white/[0.10]",
  },
  {
    n: "04",
    title: "Comunhão",
    desc: "Café, bolo e conversa solta. É a parte que costuma durar mais — e é onde a amizade de verdade começa.",
    card: "bg-grape-light",
    text: "text-plum-deep",
    body: "text-plum-deep/70",
    ghost: "text-plum-deep/[0.12]",
  },
];

/**
 * "A igreja acontece nas casas" + a noite de célula, numa seção só.
 *
 * A coluna da esquerda fica pregada (`lg:sticky` + `lg:self-start` — sem o
 * self-start o item de grid estica e nunca gruda) enquanto os quatro cards
 * empilham à direita.
 *
 * O empilhamento é CSS puro: os quatro cards são IRMÃOS dentro do mesmo pai,
 * cada um `sticky` com `top` um pouco maior que o anterior. Sticky é limitado
 * pelo bloco do PAI, não pelo próprio card — por isso o card 01 continua
 * grudado enquanto 02, 03 e 04 sobem por cima. Se alguém envolver esses cards
 * em wrappers individuais, o efeito morre na hora.
 *
 * Cuidado: `transform` e `will-change: transform` num ancestral quebram
 * `position: sticky`. Por isso esta seção NÃO usa <Reveal> (que aplica os
 * dois) — o próprio scroll já é o movimento aqui.
 */
export function CellsFeature() {
  return (
    <section className="bg-bone py-24 sm:py-28 lg:py-32">
      <div className="container mx-auto grid gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12">
        {/* Coluna pregada — o que é uma célula.
            Vem PRIMEIRO no DOM e é jogada pra direita só no desktop
            (`lg:order-2`). No mobile a ordem do DOM é a que vale, e a manchete
            precisa vir antes dos cards — leitor de tela e celular leem a
            explicação primeiro, a pilha depois. */}
        <div className="lg:sticky lg:top-24 lg:order-2 lg:self-start">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Sistema de células
          </span>
          {/* DESTAQUE SÓ NA COR, sem itálico e no mesmo peso — a regra da
              casa. O `italic` daqui vinha de quando a manchete do site era
              Newsreader; a Manrope não tem arquivo itálico e o navegador
              entortaria a letra por software. */}
          <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
            A igreja acontece <span className="block text-grape">nas casas</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Toda semana, em casas espalhadas pela cidade, grupos de 8 a 15
            pessoas se reúnem para comer junto, conversar e cuidar uns dos
            outros. É assim que somos igreja no meio da semana.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {cells.length} células
            </span>{" "}
            em{" "}
            <span className="font-medium text-foreground">
              {neighborhoods.length} bairros
            </span>{" "}
            de Indaiatuba, abertas a quem quiser começar.
          </p>

          <Link
            href="/celulas"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-plum-deep px-8 py-4 text-sm font-semibold text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum active:scale-95"
          >
            Encontrar a célula mais perto de você
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* Pilha — como é a noite. Visualmente à esquerda no desktop. */}
        <div className="lg:order-1">
          {/* Mesmo elemento e mesmas classes da eyebrow da coluna vizinha —
              como as duas ficam lado a lado, `<p>` de um lado e `<span>` do
              outro desalinhavam a linha de base em ~6px. */}
          <span className="mb-7 block text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Como é uma noite
          </span>

          {night.map((m, i) => (
            <div
              key={m.n}
              // Cada card gruda um pouco mais abaixo que o anterior: é essa
              // diferença que deixa a faixa do card de baixo aparecendo.
              className="sticky pb-5"
              style={{ top: `${7 + i * 1.15}rem` }}
            >
              {/* Altura fixa e `justify-between` de propósito: o card precisa
                  encher a área visível pra que só UM seja lido por vez — com
                  card baixo aparecem três de uma vez e o efeito de pilha some. */}
              <div
                className={`relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-8 shadow-[0_18px_50px_-30px_rgba(24,9,41,0.55)] sm:min-h-[26rem] sm:p-10 ${m.card}`}
              >
                {/* O número sangra pela borda de propósito: pequeno e alinhado
                    ele deixava um vazio morto no miolo do card. Grande e
                    cortado, o próprio tipo vira a textura do fundo. É
                    decorativo — `aria-hidden`, a ordem já está no texto. */}
                <span
                  aria-hidden
                  className={`font-display pointer-events-none absolute -right-6 -top-10 select-none text-[13rem] font-medium leading-none ${m.ghost}`}
                >
                  {m.n}
                </span>

                <div className="relative mt-auto">
                  <h3 className={`font-display text-2xl font-medium ${m.text}`}>
                    {m.title}
                  </h3>
                  <p className={`mt-3 max-w-md leading-relaxed ${m.body}`}>
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
