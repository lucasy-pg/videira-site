"use client";

import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    lines: ["Rua Augusto de Oliveira Camargo, 257", "Centro — Indaiatuba/SP"],
  },
  {
    icon: Phone,
    label: "Telefone",
    lines: ["(19) 99999-9999", "(19) 3875-0000"],
  },
  {
    icon: Mail,
    label: "E-mail",
    lines: ["contato@igrejavideira.com.br", "celulas@igrejavideira.com.br"],
  },
  {
    icon: Clock,
    label: "Horários",
    lines: ["Domingos: 10h e 18h", "Células: durante a semana", "Secretaria: Seg–Sex, 9h–17h"],
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-grape focus:ring-1 focus:ring-grape transition-colors";

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 sm:py-36 border-b border-border">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs text-grape uppercase tracking-widest font-medium mb-4">
              Fale conosco
            </p>
          </Reveal>
          <Reveal variant="blur" delay={80}>
            <h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-medium leading-none text-foreground"
            >
              Entre em<br />
              <span className="text-grape">
                Contato
              </span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Estamos aqui para você. Manda sua mensagem e a gente conversa!
            </p>
          </Reveal>
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {contactInfo.map((item, i) => (
                <Reveal key={i} delay={i * 90} variant="left">
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-lilac border border-grape/15 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-lilac group-hover:scale-110">
                      <item.icon size={17} className="text-grape" />
                    </div>
                    <div>
                      <h3
                        className="text-sm font-bold uppercase tracking-wide text-foreground mb-2"
                      >
                        {item.label}
                      </h3>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={contactInfo.length * 90} variant="left">
                <div className="mt-8 p-6 rounded-2xl bg-card border border-border transition-colors hover:border-grape/35">
                  <h3
                    className="text-base font-bold uppercase text-foreground mb-2"
                  >
                    Primeira Visita?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Adoraríamos conhecer você! Venha nos visitar e descubra como é fazer parte da família Videira.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal variant="right" delay={120} className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
                <h2
                  className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-8"
                >
                  Envie sua Mensagem
                </h2>

                {sent && (
                  <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-lilac border border-grape/15 text-grape text-sm animate-grid-in">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lilac">
                      <Check size={14} />
                    </span>
                    Mensagem enviada! Entraremos em contato em breve.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">
                      Nome Completo *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">
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
                      <label htmlFor="phone" className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="(19) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">
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
                      <option value="" className="bg-card">Selecione um assunto</option>
                      <option value="celula" className="bg-card">Participar de uma Célula</option>
                      <option value="visita" className="bg-card">Primeira Visita</option>
                      <option value="oracao" className="bg-card">Pedido de Oração</option>
                      <option value="evento" className="bg-card">Informações sobre Eventos</option>
                      <option value="outro" className="bg-card">Outro Assunto</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">
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
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-grape text-white font-semibold rounded-full hover:shadow-xl hover:shadow-grape/25 hover:-translate-y-0.5 active:scale-95 transition-all text-sm disabled:opacity-80 disabled:hover:translate-y-0 disabled:active:scale-100"
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
                        Enviar Mensagem
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                className="font-display text-3xl sm:text-4xl font-medium text-foreground"
              >
                Localização
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="text-grape flex-shrink-0" />
                Rua Augusto de Oliveira Camargo, 257 — Centro, Indaiatuba/SP
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Augusto+de+Oliveira+Camargo,+257,+Centro,+Indaiatuba+-+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 py-2.5 text-sm text-foreground transition-all hover:bg-foreground/10 hover:-translate-y-0.5 active:scale-95"
            >
              Como chegar
              <ArrowRight size={16} className="text-grape transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal variant="scale">
            <div className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-grape/35">
              <iframe
                title="Mapa da Igreja Videira — Rua Augusto de Oliveira Camargo, 257, Centro, Indaiatuba/SP"
                src="https://www.google.com/maps?q=Rua+Augusto+de+Oliveira+Camargo,+257,+Centro,+Indaiatuba+-+SP&z=16&hl=pt-BR&output=embed"
                className="h-[360px] w-full border-0 sm:h-[440px]"
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
