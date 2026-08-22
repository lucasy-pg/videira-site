import { lideranca } from "@/lib/radicais";
import { Reveal } from "@/components/Reveal";
import s from "./radicais.module.css";

/**
 * SEÇÃO 08 — A LIDERANÇA.
 *
 * Retrato grande de um lado, texto do outro, e os dois nomes numa régua de duas
 * colunas embaixo. Não é uma grade de cards de equipe — o briefing do redesenho
 * proíbe ("não construir uma grade corporativa de funcionários") e o formato
 * proibido é justamente o que faz gente parecer elenco.
 *
 * ⚠️ O FORMATO É O DA /sobre, a pedido do Lucas em 22/08/2026 — a mesma
 * composição da seção 08 de lá (`LIDERANCA` no `lib/sobre.ts`): manchete de
 * duas frases inteiras com a segunda na tinta da casa, um parágrafo que
 * apresenta e outro que explica, e os nomes numa `<dl>` de duas colunas com
 * filete por cima de cada um.
 *
 * O QUE NÃO FOI COPIADO DE LÁ, e por quê:
 *
 *   · A ETIQUETA. Na /sobre ela é roxa e sem filete; aqui é a `.etiqueta` desta
 *     página, com o traço de 40px. Padronizar a composição não é padronizar a
 *     mobília: as outras oito seções desta página abrem com essa mesma
 *     etiqueta, e trocar só a desta faria a seção destoar da vizinhança para
 *     parecer com uma página que o visitante talvez nem tenha aberto.
 *
 *   · A SEGUNDA FOTO. A /sobre monta o retrato do casal com a foto da família
 *     encaixada na quina. Aqui existe uma foto só — a rede não entregou outra —
 *     e inset com foto repetida seria enfeite. Ele só se justifica onde há duas
 *     fotos e duas coisas a dizer.
 *
 *   · O `next/image`. Lá as fotos entram pela `MolduraFoto`; esta mora em
 *     `public/radicais/lideranca/` e é do regime antigo (ver `docs/imagens.md`).
 *     Mandá-la para o `next/image` por atalho é o que o próprio documento
 *     desaconselha.
 *
 * ── A `<dl>` NÃO É DECORAÇÃO SEMÂNTICA ────────────────────────────────────
 *
 * Nome e cargo são um par termo/definição de verdade, e é assim que a /sobre
 * faz. Num leitor de tela isso é a diferença entre ouvir quatro linhas soltas e
 * ouvir dois nomes, cada um com a função dele.
 *
 * ── O QUE ESTA VERSÃO ENCERROU ────────────────────────────────────────────
 *
 * ⚠️ A BIO CHEGOU. `bio` esteve vazia desde a primeira versão da página, e no
 * lugar dela havia um `min-h-24` reservando o respiro para o dia em que o texto
 * viesse — os dois sumiram juntos. O `docs/estrutura.md` listava isso como
 * conteúdo que faltava; a linha morreu.
 *
 * ⚠️ O CARGO DEIXOU DE SER UM SÓ. Era "Obreiros", compartilhado pelo casal;
 * agora são dois nomes com "Líder de jovens · Obreiro" e "· Obreira". A
 * procedência de cada metade do cargo, e por que obreiro não vira pastor por
 * conveniência de redação, está no `lib/radicais.ts`.
 *
 * ⚠️ A GRADE DOS "DEMAIS LÍDERES" saiu no redesenho e não voltou aqui. Era uma
 * segunda camada em cards que nunca renderizou uma linha em produção (o array
 * ficou vazio do primeiro dia ao último). O commit dela está no histórico do
 * git, mas a decisão de desenho já é outra — vale reabrir a conversa antes de
 * reabrir o arquivo.
 */
export function Lideranca() {
  return (
    <section
      className="relative overflow-x-clip bg-bone py-24 sm:py-28 lg:py-32"
      aria-labelledby="lideranca-titulo"
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        {/* 1.05fr / 0.95fr é a mesma repartição da /sobre: o retrato ganha um
            fio a mais que a coluna de texto, o bastante para ele ser o assunto
            sem que o texto fique espremido. */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal variant="left">
            <figure className="overflow-hidden rounded-[1.5rem] lg:rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lideranca.foto.src}
                alt={lideranca.foto.alt}
                width={lideranca.foto.w}
                height={lideranca.foto.h}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <p className={s.etiqueta}>{lideranca.etiqueta}</p>

            {/* AS DUAS LINHAS SÃO QUEBRA ESCRITA, não resultado de largura —
                são duas frases inteiras, e o par só funciona uma por linha. É o
                mesmo desenho do "Pastoreando pessoas. / Formando discípulos."
                da /sobre. */}
            <h2
              id="lideranca-titulo"
              className={`${s.manchete} ${s.mancheteLideranca} mt-6`}
            >
              <span className="block">{lideranca.linha1}</span>
              <span className={`block ${s.tinta}`}>{lideranca.linha2}</span>
            </h2>

            {/* O primeiro parágrafo APRESENTA e fica na tinta cheia; o segundo
                EXPLICA e recua para o cinza. A hierarquia entre os dois é a
                mesma da /sobre, e é ela que faz a seção ser lida na ordem certa
                por quem só passa o olho. */}
            <p className="mt-7 max-w-md leading-relaxed text-foreground">
              {lideranca.intro}
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              {lideranca.texto}
            </p>

            <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {lideranca.pessoas.map((pessoa) => (
                <div key={pessoa.nome} className="border-t border-border pt-5">
                  <dt className="font-display text-[1.25rem] font-medium leading-tight text-foreground">
                    {pessoa.nome}
                  </dt>
                  <dd className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {pessoa.cargo}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
