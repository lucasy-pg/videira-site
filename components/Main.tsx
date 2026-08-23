"use client";

import { usePathname } from "next/navigation";
import { isOverlayRoute } from "@/lib/overlay-routes";

/* O `<main>` reserva a altura do header fixo com padding — menos nas rotas de
   hero full-bleed, onde a foto tem que subir por baixo da nav. É client só por
   causa do `usePathname`; o conteúdo continua sendo server component. */
export function Main({ children }: { children: React.ReactNode }) {
  const overlay = isOverlayRoute(usePathname());

  return (
    <main className={`recorte-lateral flex-1 ${overlay ? "" : "pt-16 sm:pt-20"}`}>
      {children}
    </main>
  );
}
