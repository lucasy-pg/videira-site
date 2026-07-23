import type { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contato — Igreja Videira Indaiatuba",
  description:
    "Fale com a Igreja Videira Indaiatuba. Endereço, telefone, e-mail, horários e formulário de contato.",
};

export default function Contact() {
  return <ContactView />;
}
