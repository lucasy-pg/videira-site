import type { Metadata } from "next";
import { CellsView } from "@/components/CellsView";

export const metadata: Metadata = {
  title: "Células — Igreja Videira Indaiatuba",
  description:
    "26 células espalhadas por Indaiatuba. Encontre a sua comunidade perto de onde você mora.",
};

export default function Cells() {
  return <CellsView />;
}
