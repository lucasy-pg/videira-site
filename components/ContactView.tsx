"use client";

import { MapPin, ArrowRight, Check, Loader2, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { WHATSAPP_IGREJA } from "@/lib/social";

/* Os quadradinhos de ícone (`h-10 w-10 rounded-xl bg-lilac`) que ficavam ao
   lado de cada item saíram: é o mesmo elemento genérico-SaaS que já tinha sido
   cortado da Home. Sem eles a coluna vira uma lista tipográfica. */
const contactInfo = [
  {
    label: "Endereço",
    lines: ["Rua Augusto de Oliveira Camargo, 257", "Centro — Indaiatuba/SP"],
  },
  {
    /* O número real da igreja é o mesmo do WhatsApp que o site inteiro já
       linka (wa.me/5519978201132). Antes havia aqui um "(19) 99999-9999" de
       rascunho, que é placeholder óbvio numa página cujo assunto é justamente
       como falar com a igreja. O segundo número (fixo/secretaria) segue
       PENDENTE — pedir o real. */
    label: "Telefone",
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

export function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);
    // Simula o envio (formulário ainda é client-side, sem backend)
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 900);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Campo em `bg-sand` DENTRO do card branco: na faixa greige o card é o
     branco, então o campo precisa ser mais escuro que ele pra ler como campo.
     O `bg-secondary` de antes era o bege órfão do sistema antigo. */
  const inputClass =
    "w-full rounded-xl border border-foreground/10 bg-sand px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-grape focus:outline-none focus:ring-1 focus:ring-grape";

  const labelClass =
    "mb-2 block text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground";

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
              ou apenas tirar uma dúvida — não é preciso ter um motivo formal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTATO + FORMULÁRIO ═══ */}
      <section className="bg-sand py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* ── Coluna esquerda ── */}
            <div className="lg:col-span-2">
              {/* O WhatsApp vem ANTES do formulário na leitura da coluna: é o
                  canal que a igreja realmente atende (o mesmo número que as
                  células usam), e é resposta de gente, não de caixa de
                  entrada. */}
              <Reveal variant="left">
                <div className="rounded-[1.75rem] bg-card p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-grape">
                    Jeito mais rápido
                  </span>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    No WhatsApp há alguém do outro lado, com nome e rosto — é
                    possível perguntar qualquer coisa antes de aparecer.
                  </p>
                  <MagneticButton className="mt-6">
                    <a
                      href={WHATSAPP_IGREJA.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-grape px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-grape/25 active:scale-95"
                    >
                      <Phone size={16} />
                      Falar no WhatsApp
                    </a>
                  </MagneticButton>
                </div>
              </Reveal>

              {/* Linhas divisórias em vez de quatro caixinhas — quatro cards
                  seguidos numa coluna estreita viram parede (mesma decisão do
                  "No Que Cremos"). O padding vai no PRÓPRIO <Reveal>, que é o
                  irmão real dentro do `divide-y`: no div interno, cada um é
                  filho único do seu Reveal e o `first:`/`last:` casaria com
                  todos, zerando o respiro da lista inteira. */}
              <div className="mt-10 divide-y divide-foreground/10 border-t border-foreground/10">
                {contactInfo.map((item, i) => (
                  <Reveal
                    key={item.label}
                    delay={i * 80}
                    variant="left"
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

            {/* ── Coluna direita: o formulário ── */}
            <Reveal variant="right" delay={120} className="lg:col-span-3">
              <div className="rounded-[1.75rem] bg-card p-8 sm:p-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Ou escreva aqui
                </span>
                {/* DESTAQUE SÓ NA COR, sem itálico e sem baixar o peso — a
                    regra da casa, a mesma da `<Chave>` da /celulas. Este
                    trecho já foi `font-normal italic`: funcionava enquanto a
                    manchete era Newsreader, que tem itálico de verdade. Sob a
                    Manrope, que é uma família só romana, o `italic` virava
                    oblíquo sintético (a letra torta por software) e o
                    `font-normal` abria um degrau de peso no meio da linha. */}
                <h2 className="font-display mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.05] text-foreground">
                  Envie sua <span className="text-grape">mensagem</span>
                </h2>

                {sent && (
                  <div className="animate-grid-in mt-8 flex items-center gap-3 rounded-xl bg-lilac p-4 text-sm text-grape">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-grape text-white">
                      <Check size={14} />
                    </span>
                    Mensagem enviada! Entraremos em contato em breve.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="(19) 90000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Assunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="celula">Participar de uma célula</option>
                      <option value="visita">Primeira visita</option>
                      <option value="oracao">Pedido de oração</option>
                      <option value="evento">Informações sobre eventos</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || sent}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-grape px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-grape/25 active:scale-95 disabled:opacity-80 disabled:hover:translate-y-0 disabled:active:scale-100 sm:w-auto"
                  >
                    {sending ? (
                      <>
                        Enviando
                        <Loader2 size={18} className="animate-spin" />
                      </>
                    ) : sent ? (
                      <>
                        Enviado
                        <Check size={18} />
                      </>
                    ) : (
                      <>
                        Enviar mensagem
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ MAPA ═══ */}
      <section className="bg-bone py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Como chegar
              </span>
              {/* Mesmo caso do título do formulário acima: destaque só na cor,
                  sem itálico e no mesmo peso da manchete. */}
              <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.05] text-foreground">
                Estamos{" "}
                <span className="block text-grape">no Centro de Indaiatuba</span>
              </h2>
              <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-grape" />
                Rua Augusto de Oliveira Camargo, 257 — Centro, Indaiatuba/SP
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Augusto+de+Oliveira+Camargo,+257,+Centro,+Indaiatuba+-+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
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
    </div>
  );
}
