import type { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contato — Igreja Videira Indaiatuba",
  description:
    "Fale com a Igreja Videira Indaiatuba pelo WhatsApp. Como chegar, endereço, telefone, e-mail e horários.",
};

export default function Contact() {
  return <ContactView />;
}
