import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { WorldReach } from "@/components/WorldReach";
import { InteractiveDots } from "@/components/InteractiveDots";

export const metadata: Metadata = {
  title: "Sobre — Igreja Videira Indaiatuba",
  description:
    "Nossa história, missão, visão e no que cremos. Uma comunidade neopentecostal em células na graça de Deus, em Indaiatuba.",
};

const beliefs = [
  {
    title: "A Graça de Deus",
    desc: "Somos salvos pela graça mediante a fé, não por obras. O amor de Deus é incondicional e transformador.",
  },
  {
    title: "A Autoridade da Bíblia",
    desc: "A Palavra de Deus é nossa única regra de fé e prática, inspirada e inerrante.",
  },
  {
    title: "O Batismo no Espírito Santo",
    desc: "Cremos na atualidade dos dons espirituais e no poder do Espírito Santo para capacitar e transformar vidas.",
  },
  {
    title: "A Igreja em Células",
    desc: "As células são o ambiente ideal para discipulado, comunhão e multiplicação da igreja.",
  },
  {
    title: "A Grande Comissão",
    desc: "Somos chamados a fazer discípulos, batizando e ensinando tudo o que Jesus ordenou.",
  },
];

/* PLACEHOLDER — bio ainda é de rascunho e a foto de família ainda falta.
   `familyImg` aponta pra um arquivo que não existe: as fotos disponíveis são
   prints do carrossel do Instagram, com as setas de navegação e os pontinhos
   queimados na própria imagem (mesmo problema que o antigo `/pastores.png`
   já teve). Pedir pra família o export limpo, sem a UI do Instagram, e trocar
   o caminho abaixo — até lá o `ImageWithFallback` mostra o ícone de erro no
   lugar. */
const pastors = {
  names: "Pastor Thiago Duarte & Pastora Aline Duarte",
  role: "Pastores locais",
  bio: [
    "Edite aqui com a história real do casal: como se conheceram, o chamado para o ministério e há quanto tempo estão à frente da Videira.",
    "Pode incluir também um pouco do coração deles pela igreja e pela cidade de Indaiatuba.",
  ],
  img: "/foto-pastores.jpeg",
  familyImg: "/foto-pastores-3.png",
};

const mvv = [
  {
    label: "Missão",
    text: "Fazer discípulos de Jesus Cristo através de células, vivendo e compartilhando a graça de Deus em Indaiatuba e além.",
  },
  {
    label: "Visão",
    text: "Ser uma igreja em células relevante e impactante, transformando vidas através do evangelho da graça.",
  },
  {
    label: "Valores",
    text: "Graça, comunidade, autenticidade, excelência e paixão pelas pessoas e pela presença de Deus.",
  },
];

export default function About() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ CAPA — a foto do encontro sangrando na tela inteira ═══
          Diferente do hero da Home, que é um retângulo com margem: aqui a foto
          vai de borda a borda. A altura desconta a do header (`pt-16 sm:pt-20`
          do <main> no layout), senão a capa nasce já empurrada e nunca cabe
          numa tela só.

          `svh` e não `vh`: no celular o `vh` conta a barra do navegador que
          some ao rolar, e a capa ficava alta demais, cortando o texto embaixo.

          A foto é um panorama bem largo (1942x809): quanto mais estreita a
          janela em relação a essa proporção, mais sobra corte horizontal pro
          `object-position` empurrar — e isso depende da largura real da
          janela, não de ser celular ou desktop (um desktop não-maximizado
          ou um notebook menor tem tanta sobra quanto um celular). Ancorado
          35% fechou demais e descompensou o outro lado; em 42% fecha a faixa de poste/vazio que sobrava entre a mão erguida
          do rapaz e a borda direita. Numa janela BEM larga (ultrawide, tela
          cheia) pode não sobrar corte nenhum e esse valor não muda nada —
          sem problema, é inofensivo nesse caso. */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-plum-deep sm:min-h-[calc(100svh-5rem)]">
        <ImageWithFallback
          src="/encontro.png"
          alt="Grupo grande da Igreja Videira Indaiatuba reunido ao ar livre, em frente a uma fileira de árvores, com muitos braços erguidos"
          className="absolute inset-0 h-full w-full object-cover object-[42%_center]"
        />
        {/* Mesmo par de véus cruzados da Home. A foto já é escura, então os
            stops são mais leves que os de lá — com a força da Home a fachada
            virava um borrão preto e a placa sumia. */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/90 via-plum-deep/45 to-plum-deep/20 lg:via-plum-deep/20 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-deep/45 via-transparent to-transparent lg:from-transparent lg:via-plum-deep/20 lg:to-plum-deep/75" />

        {/* O `container` volta só aqui dentro: a FOTO sangra, o texto continua
            alinhado com o resto da página. */}
        <div className="container relative z-10 mx-auto px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <Reveal>
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
              Nossa história
            </span>
          </Reveal>
          <Reveal variant="blur" delay={90}>
            <h1 className="font-display mt-5 max-w-3xl text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95] text-white">
              Igreja{" "}
              <span className="block font-normal italic text-grape-light">
                Videira
              </span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-lg leading-relaxed text-white/75 sm:text-lg">
              Uma comunidade neopentecostal em Indaiatuba, comprometida com a
              graça de Deus e o discipulado através das células.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ A REDE VIDEIRA ═══
          Duas colunas: texto à esquerda (manchete+parágrafo, depois os
          números), mapa e fotos à direita.

          Na versão anterior as fotos ocupavam a largura inteira do container
          numa faixa própria e o mapa ficava espremido numa coluna — a arena
          virava a coisa maior da página e o mapa quase sumia. Agora os dois
          dividem a MESMA coluna, então a foto nunca passa da metade da tela e
          o mapa ganha o mesmo peso dela.

          Abre logo depois da capa: antes de qualquer detalhe institucional
          (encargo, missão, crenças, pastores), a igreja se situa dentro do
          panorama maior da rede — o contexto antes do detalhe. */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto grid items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          {/* ── Coluna esquerda: dois blocos de texto ── */}
          <div>
            <Reveal>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                A rede Videira
              </span>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
                Um só chamado,{" "}
                <span className="block font-normal italic text-grape">
                  espalhado em 30+ países.
                </span>
              </h2>
              <p className="mt-7 leading-relaxed text-muted-foreground">
                A Videira começou em 1997, em Goiânia, quando o pastor Aluízio
                Silva reuniu um pequeno grupo em torno de uma ideia simples:
                uma igreja vivida dentro de casa, organizada em células. Da
                sala de estar para a sala de visitas do vizinho, a igreja
                cresceu multiplicando pessoas, não apenas reunindo-as.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Décadas depois, o mesmo modelo se espalhou por mais de 30
                países, sempre com a mesma convicção: que cada célula é uma
                igreja em miniatura e cada casa, uma extensão do corpo de
                Cristo. A Videira Indaiatuba nasceu dentro dessa visão e segue
                multiplicando o mesmo chamado — de célula em célula, de casa
                em casa.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-foreground/10 pt-8">
                <div>
                  <p className="font-display text-4xl text-grape">1997</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    início em Goiânia
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl text-grape">1.300+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    igrejas Videira
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Coluna direita: mapa em cima, fotos embaixo ── */}
          <div>
            <Reveal variant="scale" delay={120}>
              <WorldReach />
            </Reveal>

            {/* As duas fotos de arquivo montam por cima da foto de hoje: o
                encontro das camadas É o argumento — a sala com vinte pessoas e
                a arena lotada são a mesma igreja. O anel na cor da faixa
                (`sand`) é o que separa as menores da foto atrás; sem ele as
                bordas se dissolvem uma na outra. */}
            <Reveal delay={190}>
              <div className="relative mt-12 pb-[22%]">
                <figure className="overflow-hidden rounded-[1.5rem]">
                  <ImageWithFallback
                    src="/videira-arena-hoje.jpg"
                    alt="Auditório lotado num culto da Videira, com a plateia de mãos levantadas diante do palco iluminado"
                    className="aspect-[16/9] w-full object-cover"
                  />
                </figure>

                <figure className="absolute bottom-0 left-4 w-[38%] overflow-hidden rounded-[1rem] ring-[5px] ring-sand">
                  <ImageWithFallback
                    src="/videira-primeiros-anos.jpg"
                    alt="Reunião nos primeiros anos da Videira: cerca de vinte pessoas sentadas em cadeiras numa sala simples, ouvindo a pregação"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </figure>

                <figure className="absolute bottom-8 left-[46%] w-[32%] overflow-hidden rounded-[1rem] ring-[5px] ring-sand">
                  <ImageWithFallback
                    src="/aluizio-silva-inicio.jpg"
                    alt="O pastor Aluízio Silva nos primeiros anos, diante do letreiro original: Videira — Igreja em Células"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </figure>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ NOSSO ENCARGO ═══
          Antes era foto à esquerda + texto à direita, herdado do molde da
          "Nossa História". Sem uma foto que realmente ilustrasse o encargo
          (a de estoque não dizia nada específico da Videira), a citação sozinha
          e centralizada pesa mais — vira uma declaração da casa, não mais um
          bloco de texto ao lado de uma imagem genérica.

          Fica logo acima de Missão/Visão/Valores: o encargo é a declaração
          maior, e a MVV entra na sequência como o desdobramento prático dele. */}
      <section className="bg-bone py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal variant="scale" className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-7 w-7 text-grape/35" />
            <span className="mt-4 block text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Nosso encargo
            </span>
            <blockquote className="font-display mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.2] text-foreground">
              Nosso encargo é edificar uma igreja de vencedores, onde{" "}
              <span className="font-normal italic text-grape">
                cada membro é um ministro e cada casa uma extensão da igreja
              </span>
              . Conquistando assim nossa geração para CRISTO.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ═══ MISSÃO / VISÃO / VALORES — faixa greige, cards brancos ═══ */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {mvv.map((item, i) => (
              <Reveal key={item.label} delay={i * 110}>
                <div className="flex h-full flex-col rounded-[1.75rem] bg-card p-8 lg:p-9">
                  <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-grape">
                    {item.label}
                  </span>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NO QUE CREMOS ═══ */}
      <section className="bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Fundamentos
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              No que{" "}
              <span className="font-normal italic text-grape">cremos</span>
            </h2>
          </Reveal>

          {/* Linhas divisórias em vez de cards: são cinco itens de texto puro e
              cinco caixas seguidas viravam parede. */}
          <div className="mt-14 divide-y divide-foreground/10 border-t border-foreground/10">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="grid gap-3 py-8 sm:grid-cols-3 sm:gap-8">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {b.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground sm:col-span-2">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NOSSOS PASTORES ═══
          Logo depois dos fundamentos e bem antes do fechamento: a igreja diz
          no que crê, depois apresenta quem lidera localmente essa crença. */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto grid items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <Reveal variant="left">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem]">
                <ImageWithFallback
                  src={pastors.img}
                  alt={pastors.names}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              {/* Inset com a família: o retrato grande apresenta o casal como
                  pastores, esse canto mostra o outro lado — quem eles são em
                  casa. `ring-sand` repete o mesmo truque de recorte da seção
                  da Rede, um parágrafo acima: o anel na cor do FUNDO da
                  seção faz a moldura sumir e a foto pequena parecer encaixada
                  na grande, não só empilhada por cima. */}
              <figure className="absolute bottom-4 right-4 w-[44%] overflow-hidden rounded-[1.1rem] ring-[5px] ring-sand shadow-[0_18px_36px_-14px_rgba(0,0,0,0.45)]">
                <ImageWithFallback
                  src={pastors.familyImg}
                  alt={`${pastors.names} com os filhos`}
                  className="aspect-square w-full object-cover"
                />
              </figure>
            </div>
          </Reveal>
          <Reveal variant="right" delay={100}>
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Liderança
            </span>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
              Nossos{" "}
              <span className="font-normal italic text-grape">Pastores</span>
            </h2>
            <p className="font-display mt-7 text-2xl font-medium text-foreground">
              {pastors.names}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              {pastors.role}
            </p>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              {pastors.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FECHAMENTO — CTA simples e claro, no molde da faixa de
          Células ("Não sabe qual célula escolher?"), não o fechamento
          dramático escuro da Home. */}
      <section className="relative overflow-hidden bg-bone py-24 sm:py-32">
        {/* Grade de pontinhos que reage ao cursor — em vez de reaproveitar o
            mapa da rede (repetiria a seção logo acima) ou uma foto (as
            únicas disponíveis têm marca d'água do Instagram embutida). */}
        <InteractiveDots />
        <Reveal
          variant="scale"
          className="relative z-10 container mx-auto px-5 text-center sm:px-8 lg:px-12"
        >
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] text-foreground">
            Venha fazer{" "}
            <span className="font-normal italic text-grape">
              parte da família
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Você é bem-vindo para conhecer a Igreja Videira e descobrir a
            transformação que a graça faz na vida de pessoas reais.
          </p>
          <MagneticButton className="mt-10">
            <Link
              href="/contato"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-grape px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-grape/25 active:scale-95"
            >
              Entre em contato
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  );
}
