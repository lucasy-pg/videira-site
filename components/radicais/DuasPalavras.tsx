import { atos, fotosLivres, fotosRadicais } from "@/lib/radicais";
import { FotoAcervo } from "./FotoAcervo";
import s from "./radicais.module.css";

/**
 * SEÇÃO 03 — RADICAIS → LIVRES.
 *
 * A peça conceitual da página, e a única que prende o palco. Dois atos que se
 * atravessam durante a rolagem: RADICAIS ocupa a largura da tela com uma
 * fotografia revelada dentro das letras e sai por cima; LIVRES sobe por baixo,
 * itálico e roxo, com as fotos claras. Em nenhum quadro os dois estão inteiros
 * ao mesmo tempo — é isso que faz a peça ler como uma coisa VIRANDO outra em
 * vez de um letreiro com duas palavras.
 *
 * TODA A GEOMETRIA E TODA A COREOGRAFIA ESTÃO NO `radicais.module.css` — a
 * conta que dimensiona a palavra pela largura da tela, o intervalo `contain` da
 * linha do tempo, o vão de 24% que impede a leitura dupla, o desenho de celular
 * (que é a base, não um conserto) e as duas degradações. Aqui fica só a
 * marcação e o acervo.
 *
 * NÃO HÁ UMA LINHA DE JAVASCRIPT NESTA SEÇÃO. Ela é componente de servidor
 * inteiro: o pin é `position: sticky` e o progresso é `view-timeline`, os dois
 * nativos. É a diferença desta peça para a galeria, que é a exceção nomeada do
 * GSAP no site — ver o cabeçalho do `galeria.module.css`.
 *
 * ⚠️ AS DUAS PALAVRAS SÃO `<h2>` SEPARADOS, e não um heading só com um `<span>`
 * dentro. Entre elas há fotografia, prosa e uma travessia inteira; um heading
 * que englobasse as duas não descreveria nada para quem navega por títulos.
 * Cada palavra é o título do próprio ato, que é exatamente o que elas são.
 *
 * A ORDEM DO DOM É A ORDEM DA LEITURA — ato 1 inteiro, depois ato 2 inteiro —,
 * e ela não depende do CSS: quem lê com leitor de tela, quem imprime a página e
 * quem está num navegador sem linha do tempo de rolagem recebem a mesma
 * sequência.
 */
export function DuasPalavras() {
  return (
    <section className={s.duas} aria-label="Radicais e livres">
      <div className={s.duasTrilho}>
        {/* ═══ ATO 1 — RADICAIS ═══ */}
        <div className={`${s.ato} ${s.atoUm}`}>
          <div className={s.palavraCaixa}>
            <h2
              className={`${s.cartaz} ${s.palavra} ${s.palavraFoto}`}
              style={
                {
                  "--foto": `url("${fotosRadicais.noTexto.src}")`,
                } as React.CSSProperties
              }
            >
              {atos.radicais.palavra}
            </h2>
          </div>

          {/* A fotografia que vive DENTRO das letras não aparece como `<img>`:
              ela é `background` recortado pelo `background-clip: text`. Por
              isso a descrição dela entra aqui, uma vez, num bloco que só
              existe para leitor de tela — sem isso a única imagem da
              composição seria invisível para quem não vê a tela. */}
          <p className="sr-only">{fotosRadicais.noTexto.alt}</p>

          <div className={s.atoTexto}>
            <ul className={s.notas}>
              {atos.radicais.linhas.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </ul>
            <p className={s.prosa}>{atos.radicais.texto}</p>
          </div>

          <div className={s.atoFotos}>
            <FotoAcervo
              foto={fotosRadicais.umA}
              sizes="(min-width: 1600px) 250px, (min-width: 768px) 15vw, 45vw"
              className={`${s.atoFoto} ${s.umA}`}
            />
            <FotoAcervo
              foto={fotosRadicais.umB}
              sizes="(min-width: 1600px) 215px, (min-width: 768px) 13vw, 45vw"
              className={`${s.atoFoto} ${s.umB}`}
            />
          </div>
        </div>

        {/* ═══ ATO 2 — LIVRES ═══ */}
        <div className={`${s.ato} ${s.atoDois}`}>
          <div className={s.palavraCaixa}>
            <h2 className={`${s.cartaz} ${s.palavra} ${s.palavraLivres}`}>
              {atos.livres.palavra}
            </h2>
          </div>

          <div className={s.atoTexto}>
            <ul className={`${s.notas} ${s.notasLivres}`}>
              {atos.livres.linhas.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </ul>
            <p className={s.prosa}>{atos.livres.texto}</p>
          </div>

          <div className={s.atoFotos}>
            <FotoAcervo
              foto={fotosLivres.doisA}
              sizes="(min-width: 1700px) 270px, (min-width: 768px) 16vw, 34vw"
              className={`${s.atoFoto} ${s.doisA}`}
            />
            <FotoAcervo
              foto={fotosLivres.doisB}
              sizes="(min-width: 1650px) 205px, (min-width: 768px) 12.5vw, 34vw"
              className={`${s.atoFoto} ${s.doisB}`}
            />
            <FotoAcervo
              foto={fotosLivres.doisC}
              sizes="(min-width: 1650px) 165px, (min-width: 768px) 10vw, 34vw"
              className={`${s.atoFoto} ${s.doisC}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
