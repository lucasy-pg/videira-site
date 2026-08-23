/**
 * Os perfis da igreja e os glifos das redes.
 *
 * POR QUE OS DESENHOS MORAM AQUI E NÃO VÊM DE UMA BIBLIOTECA. O `lucide-react`,
 * que serve todos os outros ícones do site, TIROU os ícones de marca — importar
 * `Instagram` dele hoje quebra o build com "Export Instagram doesn't exist".
 * Logos de terceiros saíram de lá por questão de licença de marca, e não vão
 * voltar. Então os três caminhos são desenhados à mão e ficam neste arquivo,
 * em vez de repetidos em cada componente que precisa de um.
 *
 * ATENÇÃO ÀS DUAS CONTAS DE INSTAGRAM: são perfis DIFERENTES e não devem ser
 * unificados. `@videiraindaiatuba` é a igreja e aparece no rodapé de todas as
 * páginas; `@rlindaiatuba` é a rede de jovens e aparece só no /radicais-livres,
 * onde carrega uma função que o outro não cumpre — é por ele que sai a data de
 * cada Culto de Jovens, que de propósito não é publicada no site.
 */

/** Caminhos SVG em viewBox 0 0 24 24, para preencher com `fill="currentColor"`. */
export const GLIFOS = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.12.3-.28.8-.32 1.7C3.25 8.5 3.25 8.9 3.25 12s0 3.5.07 4.7c.04.9.2 1.4.32 1.7.17.43.37.74.7 1.06.31.32.62.52 1.05.7.3.12.8.28 1.7.32 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c.9-.04 1.4-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.31.52-.62.7-1.05.12-.3.28-.8.32-1.7.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.04-.9-.2-1.4-.32-1.7a2.8 2.8 0 0 0-.7-1.06 2.8 2.8 0 0 0-1.05-.7c-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4Zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.15-1.44a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  youtube:
    "M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.4a2.5 2.5 0 0 0-1.8 1.8C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.4a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12Zm-13 3V9l5.2 3-5.2 3Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.75-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
  /* O WHATSAPP É O ÚNICO DESTES QUE NÃO É UM PERFIL: ele não aparece no
     rodapé junto dos outros três. Entrou porque os dois botões da /celulas
     abrem uma conversa no WhatsApp, e uma seta genérica não avisa disso —
     quem toca espera outra página do site e cai num aplicativo.

     O desenho é a MARCA, com o fone dentro do balão, e o balão precisa da
     ponta embaixo à esquerda: sem ela vira um círculo com um telefone, que é
     o ícone de "ligar" e não o do WhatsApp. É a única forma que as pessoas
     reconhecem sem ler. */
  whatsapp:
    "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.34M12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41Z",
} as const;

/** O perfil da IGREJA — o do rodapé, em todas as páginas. */
export const INSTAGRAM_IGREJA = {
  url: "https://www.instagram.com/videiraindaiatuba/",
  arroba: "@videiraindaiatuba",
};

/** O perfil da REDE DE JOVENS — só no /radicais-livres. */
export const INSTAGRAM_RADICAIS = {
  url: "https://www.instagram.com/rlindaiatuba/",
  arroba: "@rlindaiatuba",
};

/**
 * O WHATSAPP DA IGREJA — o número real, e o único canal do site em que há
 * gente do outro lado respondendo.
 *
 * Estava escrito à mão em três lugares (rodapé, /contato e agora a /celulas),
 * e é o mesmo tipo de duplicata silenciosa que trouxe os glifos daqui para
 * cima: o dia em que a igreja trocar de número, quem esquecer um dos arquivos
 * publica um telefone morto na página cujo assunto é falar com a igreja.
 *
 * `exibicao` não é derivado do `numero` de propósito: formatar DDI+DDD+9
 * dígitos em pt-BR pede uma regex que erra em número antigo de oito dígitos, e
 * o custo de manter as duas linhas coerentes é ler uma ao lado da outra.
 */
export const WHATSAPP_IGREJA = {
  numero: "5519978201132",
  exibicao: "(19) 97820-1132",
  url: "https://wa.me/5519978201132",
};

/**
 * O mesmo WhatsApp com uma primeira mensagem já escrita.
 *
 * Serve a quem está do LADO DE CÁ e a quem está do lado de lá: o visitante não
 * precisa formular o pedido numa janela em branco (que é onde a maior parte
 * desiste), e quem atende já sabe de que página a pessoa veio e o que ela quer.
 *
 * A mensagem vai na primeira pessoa e sem gíria de marketing — ela aparece
 * como se o próprio visitante tivesse digitado, e é assim que ela precisa
 * soar. `encodeURIComponent` porque acento e quebra de linha em querystring
 * viram lixo do outro lado.
 */
export const linkWhatsApp = (mensagem: string) =>
  `${WHATSAPP_IGREJA.url}?text=${encodeURIComponent(mensagem)}`;

/**
 * O CANAL DA IGREJA NO YOUTUBE.
 *
 * Subiu para cá pelo mesmo motivo dos glifos e do WhatsApp: o endereço estava
 * escrito à mão no rodapé, e a Home passou a precisar dele numa seção inteira
 * ("Nos acompanhe"). Duas cópias de uma URL em arquivos diferentes é o tipo de
 * duplicata que ninguém percebe estar divergindo — e um canal com o @ errado
 * é uma página de erro do YouTube, não um link quebrado visível.
 */
export const YOUTUBE_IGREJA = {
  url: "https://www.youtube.com/@igrejavideiraindaiatuba",
  arroba: "@igrejavideiraindaiatuba",
};
