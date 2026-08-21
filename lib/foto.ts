/**
 * Uma fotografia de página, com o estado vazio embutido.
 *
 * Nasceu no /radicais-kids e subiu para cá quando o /trilho-do-vencedor passou
 * a usar o mesmo desenho. Quem renderiza é a `<MolduraFoto>`.
 *
 * O campo `alvo` não é redundante com o `src`: é o caminho que a moldura
 * DESENHA NA TELA quando `src` está ausente ou o arquivo sumiu. Serve a duas
 * coisas, e nenhuma é decorativa:
 *
 * 1. Dá para desenhar e revisar uma página inteira ANTES das fotos chegarem,
 *    com cada espaço no recorte exato que a foto vai ocupar — por isso a página
 *    não muda de forma no dia em que elas entram.
 * 2. Se um arquivo for renomeado ou removido, o defeito aparece como um campo
 *    marcado com o caminho que falta, em vez de um 404 silencioso. Isso não é
 *    hipótese: a versão anterior do /trilho-do-vencedor apontava para
 *    `/encontro/encontro2.png`, que não existe mais na pasta, e ninguém tinha
 *    percebido.
 *
 * Não trocar por banco de imagens: é decisão da casa que foto real vence foto
 * de banco (ver o comentário do acervo em `docs/imagens.md`).
 */
export type Foto = {
  /** Caminho em `public/` quando a foto existir. */
  src?: string;
  /** Onde o arquivo deve ser gravado. Aparece no espaço vazio. */
  alvo: string;
  alt: string;
};
