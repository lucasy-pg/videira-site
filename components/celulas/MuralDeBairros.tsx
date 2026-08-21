import { neighborhoodGroups } from "@/lib/cells";
import { nomeExtenso } from "@/lib/celulas";

/**
 * OS BAIRROS COM CÉLULA, COMO TIPOGRAFIA — não como lista.
 *
 * Dezessete bairros empilhados em coluna com marcador viram um formulário de
 * endereço: a pessoa procura o próprio bairro, não acha, e fecha a página. Em
 * linha corrida e em corpo grande, a mesma informação vira uma frase só —
 * "a igreja está em toda parte" — e o bairro de cada um aparece dentro dela.
 *
 * ⚠️ TODOS OS NOMES TÊM O MESMO CORPO, e isso é a decisão da seção — não uma
 * simplificação por falta de dado. Havia uma escala aqui: o nome crescia com o
 * número de células do bairro, e "Jardim Morada do Sol" (sete células) saía
 * três vezes maior que os outros dezesseis. Ela vinha com uma legenda em caixa
 * alta explicando a regra, e quando a legenda saiu a escala ficou sem sentido
 * — quem chega vê um bairro gigante e quinze pequenos, e lê como capricho de
 * layout ou, pior, como "este bairro importa mais". Um mural que existe para a
 * pessoa achar o PRÓPRIO bairro não pode dar a nenhum deles um lugar melhor.
 *
 * Então: um corpo só. Quem quiser a escala de volta precisa da legenda de
 * volta junto — as duas foram desenhadas como uma coisa só.
 *
 * `bairro.total` continua existindo no `lib/cells.ts` e não é lido aqui de
 * propósito: o número serve à contagem acima do mural ("24 células em 17
 * bairros"), não ao tamanho da palavra.
 *
 * SEMÂNTICA: é uma `<ul>` de verdade, porque para o leitor de tela isto é uma
 * lista de bairros e nada mais. Os pontos entre os nomes são desenho —
 * `aria-hidden`, senão a lista é lida como "Cecap, ponto, Cidade Nova, ponto".
 */

/* O CORPO ÚNICO. Vai em `clamp` porque aqui, ao contrário das manchetes da
   página, o que limita não é a coluna: é a largura da própria palavra, e ela
   precisa acompanhar a tela sem degrau.

   O teto de 1,75rem foi escolhido pelo NOME MAIS LONGO da lista, "Parque
   Residencial Indaiá": em Poppins caixa alta ele ocupa cerca de 15em, e a
   partir daí ele começa a exigir uma linha inteira só para si — o que devolve
   ao mural exatamente a aparência de lista empilhada que ele existe para
   evitar. O piso de 1rem é o que mantém o nome legível no celular sem que a
   faixa vire oito linhas.

   ⚠️ REMEDIDO NA POPPINS. Os números antigos vinham da Newsreader, que escreve
   a mesma palavra uns 10% mais estreita — em caixa alta a diferença cresce. Se
   a fonte mudar de novo, este número muda junto. */
const CORPO = "text-[clamp(1rem,2.6vw,1.75rem)]";

export function MuralDeBairros() {
  return (
    <ul className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3">
      {neighborhoodGroups.map((bairro, i) => (
        <li key={bairro.name} className="flex items-baseline gap-4 sm:gap-6">
          {/* O ponto vem ANTES do nome (menos no primeiro) em vez de depois:
              assim o último item da última linha não termina num separador
              solto, que é o defeito clássico deste tipo de faixa quando ela
              quebra em número ímpar.

              E É UM PONTO DESENHADO, não o glifo "•". Como bullet de texto ele
              herdava o corpo da `<li>` (16px, e não o do nome ao lado): num
              mural de tipografia grande ele virava um cisco de 9px que sumia.
              Uma bolinha de 5px em `bg-grape` é menor E mais visível, e é o
              mesmo ponto da linha do tempo da seção "Como funciona" — a página
              passa a ter um separador só. O `translate-y` o levanta da linha de
              base até o meio das maiúsculas. */}
          {i > 0 && (
            <span
              aria-hidden
              className="h-[5px] w-[5px] shrink-0 -translate-y-[0.35em] rounded-full bg-grape/55"
            />
          )}
          <span
            className={`font-display font-medium uppercase leading-[1.1] tracking-[0.01em] text-foreground ${CORPO}`}
          >
            {nomeExtenso(bairro.name)}
          </span>
        </li>
      ))}
    </ul>
  );
}
