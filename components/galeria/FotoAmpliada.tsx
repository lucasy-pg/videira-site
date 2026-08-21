"use client";

import { origensDaFoto } from "@/lib/galeria";
import type { useFotoAmpliada } from "./useFotoAmpliada";
import css from "./galeria.module.css";

/**
 * A MARCAÇÃO DA FOTO ABERTA — o véu, o clone, o painel e o botão de fechar.
 *
 * Ela morava dentro da `Galeria`, e saiu de lá quando o MURAL passou a abrir
 * foto também. A alternativa era copiar sessenta linhas de marcação para o
 * segundo componente, e marcação copiada é a que envelhece torta: a correção
 * de foco entra num lado e não no outro, e o defeito só aparece para quem abre
 * a foto pelo lugar errado.
 *
 * ELA NÃO TEM ESTADO NENHUM. Tudo vem do gancho `useFotoAmpliada`, que é
 * instanciado por quem monta a superfície — a `Galeria` passa o palco, o
 * `Mural` passa a própria faixa. É por isso que o parâmetro é o retorno inteiro
 * do gancho e não uma lista de propriedades soltas: o que este componente
 * precisa é exatamente o que o gancho devolve, e enumerar os sete campos aqui
 * só criaria um lugar a mais para esquecer de acrescentar o oitavo.
 */
export function FotoAmpliada({
  ampliada,
}: {
  ampliada: ReturnType<typeof useFotoAmpliada>;
}) {
  const { aberta, irmas, fechar, abrir, cloneRef, veuRef, painelRef, botaoRef } =
    ampliada;

  if (!aberta) return null;

  /* A VIZINHANÇA VEM PRONTA DO GANCHO, e a única coisa que este componente faz
     com ela é tirar a foto que já está aberta — uma miniatura que reabre o que
     está na tela é um clique que não leva a lugar nenhum. Qual é a vizinhança
     de cada superfície está decidido em quem monta o gancho (ver a caixa "O
     PAINEL" em `useFotoAmpliada`). */
  const outras = irmas.filter((f) => f.id !== aberta.foto.id);

  return (
    <div role="dialog" aria-modal="true" aria-label={aberta.foto.alt}>
      <div ref={veuRef} className={css.veu} onClick={fechar} />

      <div ref={cloneRef} className={css.clone}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={aberta.foto.grande ?? aberta.foto.src}
          srcSet={origensDaFoto(aberta.foto, true)}
          sizes="(max-width: 767px) 90vw, 62vw"
          alt={aberta.foto.alt}
          width={aberta.foto.w}
          height={aberta.foto.h}
        />
      </div>

      <div ref={painelRef} className={css.painel}>
        {/* SÓ IMAGEM. O painel não tem legenda nem rótulo: a descrição vivia
            no `alt`, que é texto de acessibilidade e soava a laudo quando
            impresso na tela. Ele continua no `aria-label` do diálogo e no de
            cada miniatura — lido por quem precisa, invisível para quem está
            olhando a foto. */}
        {outras.length > 0 ? (
          <div className={css.irmas}>
            {outras.map((f) => (
              <button
                key={f.id}
                type="button"
                className={css.irma}
                aria-label={`Ver: ${f.alt}`}
                onClick={(e) => abrir(f.id, e.currentTarget)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  srcSet={origensDaFoto(f)}
                  alt=""
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <button
        ref={botaoRef}
        type="button"
        className={css.fechar}
        onClick={fechar}
        aria-label="Fechar a foto"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
