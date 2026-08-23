import { MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { IconeWhatsApp } from "@/components/IconeWhatsApp";
import { WHATSAPP_IGREJA, linkWhatsApp } from "@/lib/social";

/**
 * A /contato.
 *
 * NÃO HÁ FORMULÁRIO AQUI, e não é esquecimento. O que existia era um `<form>`
 * de cinco campos que não mandava nada para lugar nenhum: um `setTimeout` de
 * 900ms fingia o envio e mostrava "Mensagem enviada!" — quer dizer, a página
 * cujo assunto é falar com a igreja engolia em silêncio tudo o que era
 * escrito nela. A igreja atende no WHATSAPP, com gente do outro lado, e é
 * para lá que todo "enviar mensagem" do site aponta agora.
 *
 * A ORDEM DA PÁGINA é: abertura → COMO CHEGAR (com o mapa) → as demais
 * informações. Quem abre a /contato quase sempre quer uma de duas coisas:
 * falar com alguém (o botão está na abertura, antes de qualquer rolagem) ou
 * saber onde é (a seção seguinte). Telefone, e-mail e horários são consulta,
 * e consulta fica embaixo.
 */

/* A mensagem já vai escrita, pelo motivo que o `lib/celulas.ts` explica no
   `ACAO_ENCONTRAR_CELULA`: janela em branco é onde a maior parte das pessoas
   desiste, e do lado de lá quem atende já sabe de onde a pessoa veio. Esta é
   mais aberta que a das células de propósito — aqui o assunto ainda não está
   definido. */
const ACAO_FALAR = linkWhatsApp(
  "Olá! Vi o site da Videira e queria falar com alguém da igreja.",
);

const ENDERECO = "Rua Augusto de Oliveira Camargo, 257 — Centro, Indaiatuba/SP";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Augusto+de+Oliveira+Camargo,+257,+Centro,+Indaiatuba+-+SP";

/* Os quadradinhos de ícone (`h-10 w-10 rounded-xl bg-lilac`) que ficavam ao
   lado de cada item saíram: é o mesmo elemento genérico-SaaS que já tinha sido
   cortado da Home. Sem eles a coluna vira uma lista tipográfica.

   O ENDEREÇO NÃO ESTÁ NESTA LISTA porque a seção inteira acima é sobre ele —
   a rua aparece lá em cima com o mapa e o botão do Google Maps. Repeti-lo aqui
   é ocupar um quarto da lista com a informação que a pessoa acabou de ler. */
const contactInfo = [
  {
    /* O número real da igreja é o mesmo do WhatsApp que o site inteiro já
       linka (wa.me/5519978201132). Antes havia aqui um "(19) 99999-9999" de
       rascunho, que é placeholder óbvio numa página cujo assunto é justamente
       como falar com a igreja. O segundo número (fixo/secretaria) segue
       PENDENTE — pedir o real. */
    label: "Telefone e WhatsApp",
    lines: [WHATSAPP_IGREJA.exibicao],
  },
  {
    /* Endereço real, informado pela igreja. Os dois anteriores
       (contato@ e celulas@igrejavideira.com.br) vinham do rascunho do design e
       não existiam — mandar alguém escrever para uma caixa inexistente é pior
       do que não publicar e-mail nenhum. Só há UM endereço; não invente o
       segundo para preencher a coluna. */
    label: "E-mail",
    lines: ["igrejavideiraindaituba@hotmail.com"],
  },
  {
    /* O horário de secretaria ("Seg–Sex, 9h–17h") saiu daqui: era do rascunho e
       nunca foi confirmado. Numa página cujo assunto é como chegar até a
       igreja, um expediente inventado faz alguém bater numa porta fechada. */
    label: "Horários",
    lines: ["Domingos: 9h–11h e 18h–20h", "Células: durante a semana"],
  },
];

/* O anel de foco, pelo mesmo motivo da /celulas: o do navegador some sobre
   `bone`, e esta é uma página cujo objetivo é um clique. */
const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grape";

export function ContactView() {
  return (
    <div className="bg-bone text-foreground">
      {/* ═══ ABERTURA — tipográfica ═══ */}
      {/* AQUI HAVIA UM `manchetes-poppins` NESTA SEÇÃO, e ele saiu junto com a
          troca do site para a Manrope (22/08/2026): a abertura rodava numa
          geométrica enquanto as manchetes do formulário e do mapa ficavam na
          serifa, e não existe mais nem uma nem outra — a página inteira é
          Manrope, pelo token, e a diferença entre abertura e seção passou a ser
          só de corpo e de peso.
          O destaque do <h1> continua sendo COR e não itálico: a Manrope é uma
          família só romana, então `italic` aqui renderia o oblíquo sintético do
          navegador. */}
      <section className="bg-bone pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Fale conosco
            </span>
          </Reveal>
          <Reveal variant="blur" delay={90}>
            <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[0.98] text-foreground">
              Envie uma mensagem,{" "}
              <span className="block font-normal text-grape">
                nós respondemos
              </span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            {/* O subtítulo NÃO leva `.font-display`, e a razão continua a mesma
                de quando este parágrafo apontava para a Poppins no braço: a
                classe carrega o tracking de manchete (-0.02em) e o `text-wrap:
                balance`, e num parágrafo de corpo os dois atrapalham. Hoje ele
                simplesmente herda o `--font-body` do site — que é a mesma
                Manrope do título, então o casamento saiu de graça e a família
                escrita à mão no markup pôde ir embora. */}
            <p className="mt-7 max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
              Para visitar pela primeira vez, entrar numa célula, pedir oração
              ou apenas tirar uma dúvida.
            </p>
          </Reveal>
          <Reveal delay={260}>
            {/* O ÚNICO BOTÃO DA ABERTURA, e ele abre uma conversa. `<a>` e não
                `<Link>` porque o destino é o WhatsApp, fora do site; o glifo
                avisa disso antes do toque, que uma seta genérica não faria. */}
            <MagneticButton className="mt-9">
              <a
                href={ACAO_FALAR}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-grape px-9 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-grape/25 active:scale-95 ${FOCO}`}
              >
                <IconeWhatsApp className="h-[18px] w-[18px] shrink-0" />
                Falar no WhatsApp
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ═══ COMO CHEGAR ═══ */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Como chegar
              </span>
              {/* Destaque só na cor, sem itálico e no mesmo peso da manchete —
                  a regra da casa. */}
              <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
                Estamos{" "}
                <span className="block text-grape">no Centro de Indaiatuba</span>
              </h2>
              <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-grape" />
                {ENDERECO}
              </p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${FOCO}`}
            >
              Abrir no Google Maps
              <ArrowRight
                size={16}
                className="text-grape transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>

          <Reveal variant="scale">
            <div className="mt-12 overflow-hidden rounded-[2rem] bg-card">
              <iframe
                title="Mapa da Igreja Videira — Rua Augusto de Oliveira Camargo, 257, Centro, Indaiatuba/SP"
                src="https://www.google.com/maps?q=Rua+Augusto+de+Oliveira+Camargo,+257,+Centro,+Indaiatuba+-+SP&z=16&hl=pt-BR&output=embed"
                className="h-[360px] w-full border-0 sm:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ AS DEMAIS INFORMAÇÕES ═══ */}
      <section className="bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* ── Coluna esquerda: o convite a conversar ── */}
            <div className="lg:col-span-2">
              <Reveal variant="left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Mais informações
                </span>
                <h2 className="font-display mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.05] text-foreground">
                  Onde a igreja <span className="text-grape">atende</span>
                </h2>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  Entre em contato.
                </p>
                <MagneticButton className="mt-8">
                  <a
                    href={ACAO_FALAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-grape px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-grape/25 active:scale-95 ${FOCO}`}
                  >
                    <IconeWhatsApp className="h-[17px] w-[17px] shrink-0" />
                    Falar no WhatsApp
                  </a>
                </MagneticButton>
              </Reveal>
            </div>

            {/* ── Coluna direita: telefone, e-mail e horários ── */}
            {/* Linhas divisórias em vez de caixinhas — cards seguidos numa
                coluna viram parede (mesma decisão do "No Que Cremos"). O
                padding vai no PRÓPRIO <Reveal>, que é o irmão real dentro do
                `divide-y`: num div interno, cada um seria filho único do seu
                Reveal e o `first:`/`last:` casaria com todos, zerando o
                respiro da lista inteira. */}
            <div className="divide-y divide-foreground/10 border-t border-foreground/10 lg:col-span-3">
              {contactInfo.map((item, i) => (
                <Reveal
                  key={item.label}
                  delay={i * 80}
                  variant="right"
                  className="py-6 first:pt-8 last:pb-0"
                >
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {item.label}
                  </h3>
                  <div className="mt-2.5 space-y-0.5">
                    {item.lines.map((line) => (
                      <p key={line} className="leading-relaxed text-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
