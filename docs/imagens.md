# Onde moram as imagens

## O catálogo, primeiro

**`docs/acervo.html`** mostra as 429 imagens do projeto numa página só: miniatura,
nome, caminho, tamanho e — nas que estão no ar — em que página do site aparecem.

É por aí que se começa. Não abra o Finder para procurar foto; abra o catálogo,
ache com o olho, clique e o caminho vai pra área de transferência.

Para regerar depois de mexer nas pastas:

```
node scripts/gerar-acervo.js
```

## Os dois lugares

Antes eram cinco pastas (`public/`, `public/radicais/`, `fotos-radicais-livres/`,
`colagem-fotos/` e a raiz do projeto). Agora são dois, e a diferença entre eles
é uma pergunta só: **isso está no ar?**

- **`public/`** — o que o site serve. Tudo aqui é URL pública, sendo usado ou
  não. Hoje são 170 imagens e **todas** estão referenciadas no código: não há
  mais foto publicada que nenhuma página mostra.
- **`material/`** — o cru. Original da câmera, foto do WhatsApp, PNG pesado que
  já virou JPG, descarte de versão anterior. Não vai pro git, não vai pro ar.

Dentro dos dois, as mesmas pastas, com os mesmos nomes:

| Pasta               | No ar (`public/`) | Cru (`material/`) | O que é |
| ------------------- | ----------------: | ----------------: | ------- |
| `celulas/`          |          21 |        26 | células reunidas em casas     |
| `igreja/`           |          11 |         5 | fachada, cultos, institucional |
| `lideres/`          |           2 |         0 | pastores e liderança          |
| `sobre/`            |           — |         9 | o cru da página /sobre (ver abaixo) |
| `encontro/`         |           4 |         8 | Encontro com Deus             |
| `radicais/`         |         228 |       113 | Radicais Livres (114 + `-800`) |
| `kids/`             |          12 |        16 | Radicais Kids: fotos, logo e personagens |
| `trilho-vencedor/`  |           4 |         5 | artes do CME, do CTL e do Seminário, e o logo da Escola de Ministérios |
| `marca/`            |           3 |         3 | logos                         |
| `videos/`           |           3 |         1 | `horizontal/` e `vertical/`   |

`material/sobre/` É A EXCEÇÃO da tabela: é a única pasta do cru sem par no
`public/`, e de propósito. "Sobre" é o nome de uma PÁGINA, não de um assunto —
e as pastas aqui são por assunto. O que o Lucas jogou lá dentro escorre para as
duas pastas que já guardavam essas mesmas fotos: a comunidade no gramado, os
registros de arquivo, a arena e a fachada vão para `public/igreja/`; o casal e a
família dos pastores, para `public/lideres/`. Quem for procurar `public/sobre/`
não vai achar, e não é esquecimento.

`igreja/` e `marca/` não existem na pasta do Figma — foram criadas aqui porque
fachada, culto e logo não cabiam em nenhuma das outras. Se preferir outro nome,
é só renomear dos dois lados e rodar o gerador.

E mais uma, que é depósito e não pasta de trabalho:

- **`material/_acervo/`** — o que já foi processado e não se mexe mais: os 124
  originais que viraram `public/radicais/`, os scripts de colagem
  (`preparar-galeria.py`, `montar-colagem.py`, `make_tileable.py`) e as saídas
  intermediárias de mosaico. Fica no catálogo para consulta; ninguém precisa
  abrir.

## O fluxo

1. Você joga o arquivo em `material/<pasta>/`, do jeito que estiver — HEIC da
   câmera, `WhatsApp Image 2026-08-14.jpeg`, MOV de 400MB, tanto faz.
2. Diz o que é e onde entra no site.
3. Eu converto, redimensiono, renomeio e escrevo em `public/<mesma pasta>/`.
   O original continua no `material/`, intacto.

```
material/celulas/IMG_4821.HEIC   →  public/celulas/celula-shalom-domingo.jpg
material/videos/vertical/…MOV    →  public/videos/vertical/convite-encontro.mp4
```

Ferramentas na máquina: `sips` (imagem) e `ffmpeg` (vídeo). Não há ImageMagick,
`cwebp` nem `avifenc` — o AVIF que está no repo veio de fora.

## Como nomear

Minúsculas, sem acento, hífen no lugar do espaço. `celula-shalom-domingo.jpg`,
não `Célula Shalom (domingo).jpg`. Tudo em `public/` vira endereço de internet,
e acento e espaço em URL viram lixo (`Células` chega como `C%C3%A9lulas`).

O nome descreve **o que se vê**, não a origem: `abraco-na-calcada.jpg` diz mais
que `IMG_4821.jpg`. Foi assim que as 114 fotos dos Radicais foram batizadas, e é
por isso que dá para achar qualquer uma sem abrir pasta nenhuma.

Sem data no nome, a não ser que a data seja o assunto. As datas nos arquivos do
WhatsApp são de envio, não do evento.

## O que entra no `public/`

Depende da página, e desde o redesenho do `/radicais-kids` são **dois regimes**.

**O regime antigo, que vale em quase todo o site:** nada de `next/image`. Não há
otimização automática, o arquivo que entra aqui é exatamente o que o visitante
baixa, e o tamanho que eu exportar é o que vai pro celular de quem abrir. Foto
que aparece grande leva uma versão `-800` ao lado (`abraco-forte.jpg` +
`abraco-forte-800.jpg`), como em `public/radicais/`; quem monta o `srcset` é o
[`lib/galeria.ts`](../lib/galeria.ts).

**O regime do `/radicais-kids`, do `/trilho-do-vencedor`, do `/sobre` e da
`/celulas`:** essas páginas usam
`next/image` de verdade (via
[`components/MolduraFoto.tsx`](../components/MolduraFoto.tsx)), então o Next
gera as larguras responsivas sozinho a partir de um arquivo só. Por isso
`public/kids/` e `public/trilho-vencedor/` **não têm** variantes `-800` e não
devem ganhar: seriam arquivos que ninguém pede. O que exporto aqui é um mestre
de ~1800px no lado maior (as artes dos cursos são menores, ~1400px, porque é o
tamanho do original), e o Next serve dele para baixo.

É esse regime que segura `public/encontro/encontro4.png`, um PNG de 7MB: o
`next/image` converte e redimensiona, e o visitante não baixa os 7MB. Se um dia
essa foto for parar numa `<img>` crua, ela precisa virar JPG antes.

Antes de acrescentar foto numa pasta, olhe qual regime a página que vai usá-la
segue — misturar os dois gera ou arquivo morto ou foto grande demais no 4G.

⚠️ E DUAS PASTAS HOJE SERVEM OS DOIS REGIMES — `public/igreja/` e
`public/celulas/`.

Em `public/celulas/` a divisão é esta, e vale conferir antes de acrescentar
arquivo lá:

- **Regime antigo (`<img>` crua + `srcset` montado à mão).** As cinco fotos que
  o palco da galeria dos Radicais Livres exibe — `celula-shalom`,
  `celula-united`, `celula-valentes`, `celula-aprisco` e `celula-nazir`. As três
  que passam de 800px têm a variante `-800` ao lado, porque é ela que o
  [`lib/galeria.ts`](../lib/galeria.ts) anuncia no `srcset`; as duas menores não
  têm e não devem ganhar. `celula-vitor.jpg`, que a Home lê num card, também é
  desse regime — sem `srcset`, então o arquivo é servido inteiro e por isso foi
  reencodado mais leve.
- **Regime do `next/image`.** Todas as outras, que existem para a `/celulas` e
  para a `/sobre` e entram pela [`MolduraFoto`](../components/MolduraFoto.tsx).
  Essas **não** levam variante `-800`: o Next gera as larguras sozinho, e um
  `-800` ali seria arquivo que ninguém pede.

⚠️ AS DIMENSÕES DECLARADAS NO `lib/galeria.ts` PRECISAM BATER com o arquivo de
verdade. O campo `w`/`h` de lá não é enfeite: ele vira o descritor `w` do
`srcset`, e um número inflado faz o navegador escolher o arquivo para vãos
maiores do que ele preenche — a foto sai levemente macia e não há nada de
errado à vista no código. Já aconteceu com a `celula-valentes` (declarada
1600×900, arquivo 1280×720).

Sobre a `public/igreja/`: A Home lê `fachada.jpg`,
`boas-vindas.jpg`, `abraco.jpg`, `adoracao-jovens.jpg` e `culto-todos-juntos.jpg`
numa `<img>` crua; o `/sobre` lê `comunidade-no-gramado.jpg`, os dois registros
de arquivo, a arena, a fachada e os dois de culto pelo `next/image`. A
consequência é prática: os três arquivos que
entraram com o `/sobre` são mestres grandes (1.3MB o do gramado) e só são
aceitáveis porque quem os serve redimensiona antes. **Se algum dia a Home for
usar um deles numa `<img>` crua, ele precisa de uma versão menor antes** — é o
mesmo alerta do `encontro4.png` logo acima, e é por isso que ele está aqui e não
só lá.

Vídeo original (`.MOV`) não entra — o `.gitignore` barra. Sobe só o `.mp4`.

## Onde os caminhos são escritos no código

Não há um registro central; o caminho é string literal, em três padrões:

1. **Manifesto em `lib/`** — [`galeria.ts`](../lib/galeria.ts) (114 fotos com
   `src`, dimensão e `alt`) e [`quem-somos.ts`](../lib/quem-somos.ts). Os
   componentes não sabem o nome de nenhuma foto: leem daqui. É o padrão bom.
2. **Constante no topo da página** — `welcomePhotos` e `IMG` em
   [`app/page.tsx`](../app/page.tsx), o array `noite` em
   [`CellsView.tsx`](../components/CellsView.tsx).
3. **String solta no JSX** — os logos no `Header` e no `Footer`, o `<video>` da
   Home. Só aparecem se você abrir o arquivo.

Enquanto for assim, o catálogo é o que dá a lista completa — é ele que sabe o
que existe e quem usa.

## Duas fotos que não são suas

[`app/page.tsx`](../app/page.tsx) carrega duas imagens direto do Unsplash, ao
vivo, do servidor deles: o card do Radicais Kids e uma de culto. Não estão no
`public/`, não estão no `material/`, não estão no repo. Se o Unsplash mudar a
URL, o card fica vazio e ninguém é avisado — e a do Kids é criança genérica de
banco de imagem representando o ministério infantil da Videira.

Assim que houver foto real, ela entra em `material/` e essa dependência morre.
