# Colagem dos Radicais Livres — contexto para tocar fora deste repo

Este documento existe para o trabalho de montar a colagem sair da pasta do site.
São ~150 fotos originais mais um recorte PNG por foto: centenas de MB que não
têm por que viver no repo do site. **Mova este arquivo para a pasta nova e
trabalhe de lá.** Só o resultado final — um arquivo de imagem — volta para cá.

---

## 1. O que é

Uma colagem no estilo daquelas paredes de série de TV (a referência é a do
*Friends*, com o letreiro do Central Perk): dezenas de fotos encostadas,
sobrepostas, algumas **recortadas no contorno das pessoas** e outras deixadas
como retângulo. Caótica de perto, harmônica de longe.

Destino: a capa da página `/radicais-livres` do site da Igreja Videira
Indaiatuba. Público: a rede de jovens, 12 a 29 anos.

### A regra que não se negocia: sem fundo aparecendo

Densidade de ponta a ponta, **zero buraco**. Se sobrar fundo entre as peças, a
colagem lê como inacabada. Na referência do Friends não existe um milímetro de
vazio — é foto encostando em foto o quadro inteiro, e é isso que faz o caos
virar textura em vez de bagunça.

Tentativas anteriores erraram exatamente aqui: ilhas de foto boiando num fundo
escuro. Não repetir.

### O que NÃO entra

Sem frases em caixinha, sem letreiro, sem badge de texto em caixa alta sobre as
fotos. Só imagem. O título da página é `<h1>` de verdade em HTML, desenhado por
cima da colagem pelo site — não deve ser embutido no arquivo.

---

## 2. O recorte já está resolvido (e testado)

Não precisa de rembg, de Photoshop nem de serviço pago. O **Vision da Apple**
faz o recorte — é o mesmo motor do "copiar assunto" do app Fotos. Roda offline,
local, de graça, ~1 a 2s por foto.

Testado em 10/08/2026 em 6 fotos reais do acervo, macOS 26.5 / Swift 6.2: as 6
saíram limpas. Cabelo cacheado e afro saem fio a fio, e **foto de turma sai como
peça única mantendo os vãos entre as pessoas** — o buraco entre um braço e outro
fica transparente de verdade. É exatamente a matéria-prima que a colagem pede.

### O programa

Salve como `recorte.swift`:

```swift
// Recorta as pessoas do fundo com o Vision da Apple.
// É o mesmo motor do "copiar assunto" do app Fotos — offline, sem download.
import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("uso: recorte <entrada> <saida.png>\n".data(using: .utf8)!)
    exit(1)
}
let src = URL(fileURLWithPath: args[1])
let dst = URL(fileURLWithPath: args[2])

let handler = VNImageRequestHandler(url: src, options: [:])
let req = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([req])
    guard let obs = req.results?.first else {
        print("SEM ASSUNTO  \(src.lastPathComponent)")
        exit(2)
    }
    let n = obs.allInstances.count
    let buf = try obs.generateMaskedImage(
        ofInstances: obs.allInstances,
        from: handler,
        croppedToInstancesExtent: true
    )
    let ci = CIImage(cvPixelBuffer: buf)
    let ctx = CIContext()
    try ctx.writePNGRepresentation(
        of: ci,
        to: dst,
        format: .RGBA8,
        colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
    )
    let w = Int(ci.extent.width), h = Int(ci.extent.height)
    print("OK  \(n) assunto(s)  \(w)x\(h)  \(src.lastPathComponent)")
} catch {
    print("ERRO  \(src.lastPathComponent): \(error)")
    exit(3)
}
```

Compilar e rodar:

```bash
swiftc -O recorte.swift -o recorte
./recorte "originais/IMG_1234.JPG" "recortes/IMG_1234.png"
```

`croppedToInstancesExtent: true` já devolve a peça aparada na caixa do assunto,
sem margem transparente sobrando — é o que se quer para posicionar depois.

### Falhas conhecidas, para não tomar susto

- **Objeto encostado na pessoa vem junto.** Num teste, um corrimão branco veio
  grudado no braço erguido. Não tem conserto automático: ou descarta a peça, ou
  posiciona de um jeito que o intruso fique escondido atrás de outra.
- **Quem está cortado pela borda da foto fica com corte reto.** Um cantor cortado
  na cintura termina numa linha serrilhada. Resolve na composição: essa peça
  sangra para fora do quadro ou fica atrás de outra.
- **Reserve triagem humana.** Estimativa: 10 a 15% dos recortes saem ruins.
  Gere todos, monte uma folha de contato dos PNGs sobre fundo escuro, e descarte
  olhando. (Folha de contato com PIL: colar cada PNG com `im` como máscara sobre
  um fundo sólido, grade de 3 ou 4 colunas.)
- **Resolução importa.** Selfie de celular pequena serve como peça média ou
  pequena. As 2 ou 3 peças grandes que ancoram a colagem precisam vir de foto
  grande.

---

## 3. Composição — onde mora o trabalho de verdade

Recortar é a parte fácil e está pronta. O difícil é o "caótico porém harmônico".
Isso não sai de sorteio aleatório. Olhando a referência, a harmonia vem de
quatro coisas concretas:

1. **Uma cama de retângulos densa por baixo**, e as peças recortadas por cima
   quebrando a grade. Só recorte flutuando não funciona — vira ilha em fundo
   vazio, que é o erro descrito na seção 1.
2. **Equilíbrio de valor**: claro e escuro espalhados pelo quadro inteiro, nunca
   empilhados num canto. Vale medir a luminância média de cada peça e usar isso
   como critério de posicionamento, não só o acaso.
3. **Hierarquia de escala**: 2 ou 3 peças grandes ancoram, o resto é médio e
   pequeno. Tudo do mesmo tamanho mata o efeito.
4. **Nenhum rosto importante coberto** por outra peça.

Isso é iterativo por natureza: gera, olha, ajusta as regras, gera de novo. Não
acerta na primeira e não deve tentar.

**Exporte também um SVG com cada peça como elemento separado** (fotos embutidas
em base64 — o Figma não busca arquivo externo na importação). Assim o arranjo do
gerador vira ponto de partida editável à mão no Figma, em vez de veredito. Um
gerador antigo neste repo já fazia isso e o padrão vale a pena repetir.

---

## 4. Matéria-prima

**As fotos novas** (~150, ainda não me passaram o caminho da pasta) são o
grosso. Pelos prints, boa parte é selfie e foto de celular — ver a ressalva de
resolução acima.

**Do repo do site, vale trazer** (opcional, é acervo antigo já tratado):

- `material/_acervo/colagem-radicais/` — 20 originais em resolução cheia. Algumas são fotos
  de câmera boa (DSC_*, IMG_*), que servem bem como peça grande.
- `public/radicais/` — 18 dessas mesmas, já endireitadas pelo EXIF e reduzidas a
  1600px no lado maior.
- ⚠️ **Tem duplicata entre as duas pastas.** Confirmado: a
  `WhatsApp Image 2026-07-13 at 14.18.44.jpeg` e a `turma-01.jpg` são a mesma
  foto. Deduplicar antes de montar — foto repetida na parede denuncia o truque.
- Os quatro arquivos `ChatGPT Image ...` são fotos reais que passaram por edição
  no ChatGPT, não imagens inventadas. Só o nome assusta; podem entrar.

**Regra herdada do repo:** comprimir duas vezes borra. Guarde os originais
intactos e gere o resultado final numa passada só, direto do PNG.

---

## 5. Como o resultado volta para o site — JÁ FEITO em 10/08/2026

A primeira colagem fechou e **está no ar**. O que foi para o repo do site:

- `public/radicais-mosaico.avif` — 4800×2533, 1,08 MB. Derivado do
  `mosaico-radicais-livres.png` (8000×4222, 51 MB), reduzido e encodado numa
  passada só. AVIF porque em JPG ou WebP a mesma imagem passaria de 1,5 MB.
- `app/radicais-livres/page.tsx`, seção 1 — `src`, `alt` e o comentário da capa.
- `app/globals.css` — o `@keyframes capaVagueia` e a classe `.capa-vagueia`,
  onde está toda a geometria e o porquê de cada número.

**A capa não é mais estática:** a colagem é maior que a tela e a janela vagueia
por ela no trajeto do protetor de tela do DVD (seção 7). Ao trocar a arte, o
que importa é manter a proporção do arquivo em sincronia com o `--prop` do
`.capa-vagueia` — é dele que sai a largura desenhada e, por consequência, o
quanto de sobra existe para percorrer.

Regra do `alt`, que continua valendo: descreve o que se vê, **sem nome de
pessoa** (a igreja não pediu autorização para publicar nomes).

**As pastas de trabalho agora estão no `.gitignore`** (`/material/`
~360 MB). Elas nunca foram commitadas; a linha só garante
que continue assim.

---

## 6. Pendências

- ~~O formato do mobile nunca foi decidido.~~ **Resolvido pela capa navegável.**
  Não existe mais uma segunda colagem em retrato para manter: é um arquivo só, e
  o celular usa uma janela menor e caminha mais.
- **A colagem no ar não tem recorte nenhum** — é mosaico de retângulos
  justificados, denso de ponta a ponta. Todo o trabalho de recorte no contorno
  das pessoas (seções 2 e 3) continua valendo e é a próxima versão da arte, não
  uma alternativa descartada.
- **Nitidez medida, para decidir com número e não com achismo:** o arquivo cobre
  0,91× do necessário num desktop 1440×900 em DPR 2, e 0,64× num celular
  390×844 em DPR 3. Ou seja, no celular ele é visivelmente macio. Subir para
  5600px levaria o arquivo a ~1,4 MB; foi decidido não pagar isso enquanto a
  colagem estiver debaixo de um véu e em movimento.

---

## 7. A capa navegável — o vaguear está pronto, o arrastar não

**Feito e no ar:** a colagem é muito maior que a tela e a capa é uma janela que
vagueia sobre ela — reta até bater na borda, reflete, segue. Sem JavaScript
nenhum: o ricochete foi simulado offline e virou keyframes CSS, então a animação
roda no compositor da GPU e a página segue sendo componente de servidor sem
script. Desligada no `prefers-reduced-motion`, onde a colagem para centrada.

Números que ficaram (todos verificados no navegador, não estimados):

- Trajeto de 14 ricochetes que **fecha exatamente** — o quadro de 100% é idêntico
  ao de 0%, então o loop não emenda. Direção 3:4, sem batida de quina.
- 380s no desktop e 560s no celular, o que dá ~23px/s nos dois. Uma volta leva
  ~6min no desktop e ~9min no celular.
- Cobertura conferida em 12 pontos do ciclo em desktop, celular e ultrawide:
  **nenhum buraco de fundo em nenhum**. Numa tela larga e baixa demais a sobra
  horizontal chega a zero e o passeio vira só vertical — feio de medir, mas
  nunca abre buraco.

**Guardado para depois:** a fase 2, **arrastar para explorar**, com o vaguear
continuando sozinho e o dedo ou o mouse podendo empurrar a câmera. É o único
pedaço que exige JavaScript e deve entrar como melhoria progressiva.

**Consequência para a arte, e vale mais que qualquer outra regra deste arquivo:**
no ricochete a janela encosta nas quatro bordas. A colagem precisa estar densa
até a última borda — a regra da seção 1 não é perfeccionismo, é consequência
direta do movimento.
