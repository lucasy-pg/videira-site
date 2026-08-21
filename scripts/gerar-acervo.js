/**
 * Regera `docs/acervo.html` — o catálogo visual de TODAS as imagens do projeto.
 *
 *     node scripts/gerar-acervo.js
 *
 * Varre `public/` e `material/`, faz uma miniatura de 200px de cada imagem com
 * o `sips` (nativo do macOS, nada a instalar), embute tudo como data URI e
 * cruza com o código para marcar quais estão no ar e em que página.
 *
 * As miniaturas são geradas num diretório temporário e descartadas — o único
 * arquivo que sobra é o HTML. Ele fica grande (~3,5MB) porque carrega as
 * imagens dentro dele: é de propósito, assim a página funciona publicada, sem
 * depender de nenhum arquivo do seu computador.
 *
 * Rode depois de mexer no `material/` ou no `public/`, e peça pro Claude
 * republicar — o link do catálogo continua o mesmo.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const RAIZ = path.resolve(__dirname, "..");
const SAIDA = path.join(RAIZ, "docs", "acervo.html");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "acervo-"));

/* `-800.jpg` é o derivado responsivo de uma foto que já está na lista — mostrar
   os dois seria a mesma imagem duas vezes. */
function varrer(dir, teste, achados = []) {
  if (!fs.existsSync(dir)) return achados;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) varrer(p, teste, achados);
    else if (teste(e.name)) achados.push(path.relative(RAIZ, p));
  }
  return achados;
}
/* AVIF e MP4 entram também: a capa dos Radicais é `.avif` e a da Home é vídeo —
   ficar de fora do catálogo justo as duas capas seria o pior buraco possível.
   O `sips` não lê nenhum dos dois; para esses a miniatura sai do `ffmpeg`. */
const ehImagem = (n) => /\.(jpe?g|png|webp|avif|mp4)$/i.test(n) && !/-800\.jpg$/.test(n);
const precisaFfmpeg = (n) => /\.(avif|mp4)$/i.test(n);
const ehCodigo = (n) => /\.(tsx?|css)$/.test(n);

const lista = [
  ...varrer(path.join(RAIZ, "public"), ehImagem),
  ...varrer(path.join(RAIZ, "material"), ehImagem),
].sort();

/* quem usa o quê: os caminhos literais escritos no código */
const usos = {};
for (const d of ["app", "components", "lib"]) {
  for (const f of varrer(path.join(RAIZ, d), ehCodigo)) {
    fs.readFileSync(path.join(RAIZ, f), "utf8").split("\n").forEach((linha, i) => {
      for (const m of linha.matchAll(/"(\/[A-Za-z0-9 _./-]+\.(?:png|jpe?g|JPG|webp|avif|mp4))"/g)) {
        (usos[m[1]] ||= []).push({ arq: f, linha: i + 1 });
      }
    });
  }
}

const dados = lista.map((p, i) => {
  const n = i + 1;
  const abs = path.join(RAIZ, p);
  const thumb = path.join(TMP, String(n).padStart(4, "0") + ".jpg");
  try {
    if (precisaFfmpeg(p)) {
      cp.execFileSync("ffmpeg", ["-y", "-i", abs, "-frames:v", "1",
                                 "-vf", "scale=200:-1", "-q:v", "6", thumb], { stdio: "ignore" });
    } else {
      cp.execFileSync("sips", ["-Z", "200", "-s", "format", "jpeg",
                               "-s", "formatOptions", "45", abs, "--out", thumb], { stdio: "ignore" });
    }
  } catch (e) { /* o que nenhum dos dois ler entra sem miniatura */ }
  let dim = "";
  try {
    if (precisaFfmpeg(p)) {
      const saida = cp.execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0",
                      "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", abs], { encoding: "utf8" });
      dim = saida.trim().replace("x", "×");
    } else {
      const m = cp.execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", abs], { encoding: "utf8" })
                  .match(/pixelWidth: (\d+)[\s\S]*pixelHeight: (\d+)/);
      if (m) dim = m[1] + "×" + m[2];
    }
  } catch (e) {}
  const url = p.startsWith("public/") ? p.slice("public".length) : null;
  return { i: n, p, url, dim, kb: Math.round(fs.statSync(abs).size / 1024), usos: url ? (usos[url] || []) : [] };
});
const PAGINA = {
  "app/page.tsx": "Home",
  "components/CellsFeature.tsx": "Células",
  "app/radicais-livres/page.tsx": "Radicais Livres",
  "components/CapaRadicais.tsx": "Radicais Livres",
  "lib/galeria.ts": "Radicais Livres",
  "lib/quem-somos.ts": "Radicais Livres",
  "app/radicais-kids/page.tsx": "Radicais Kids",
  "lib/kids.ts": "Radicais Kids",
  "app/trilho-do-vencedor/page.tsx": "Trilho do Vencedor",
  "lib/trilho.ts": "Trilho do Vencedor",
  "components/Header.tsx": "Todo o site",
  "components/Footer.tsx": "Todo o site",
};

const GRUPOS = [
  ["public/celulas",  "Células",        "no-ar"],
  ["public/igreja",   "Igreja",         "no-ar"],
  ["public/lideres",  "Líderes",        "no-ar"],
  ["public/encontro", "Encontro",       "no-ar"],
  ["public/radicais", "Radicais Livres","no-ar"],
  ["public/kids",     "Radicais Kids",  "no-ar"],
  ["public/trilho-vencedor", "Trilho do Vencedor", "no-ar"],
  ["public/marca",    "Marca",          "no-ar"],
  ["public/videos",   "Vídeos",         "no-ar"],
  ["material/celulas","Células",        "material"],
  ["material/igreja", "Igreja",         "material"],
  ["material/lideres","Líderes",        "material"],
  ["material/encontro","Encontro",      "material"],
  ["material/kids",   "Radicais Kids",  "material"],
  ["material/trilho-vencedor", "Trilho do Vencedor", "material"],
  ["material/marca",  "Marca",          "material"],
  ["material/radicais","Radicais Livres","material"],
  ["material/videos", "Vídeos",         "material"],
  ["material/_acervo/radicais-originais", "Originais dos Radicais", "acervo"],
  ["material/_acervo/colagem-radicais",   "Bastidores da colagem",  "acervo"],
  ["material/_acervo/colagem-celulas",    "Bastidores do mosaico",  "acervo"],
];

const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const b64 = (i) => {
  const f = path.join(TMP, String(i).padStart(4, "0") + ".jpg");
  try { return fs.readFileSync(f).toString("base64"); } catch (e) { return ""; }
};

function grupoDe(p) {
  const g = GRUPOS.filter(([dir]) => p.startsWith(dir + "/"))
                  .sort((a, b) => b[0].length - a[0].length)[0];
  return g || ["outros", "Outros", "acervo"];
}

const secoes = new Map();
for (const d of dados) {
  const [dir, rotulo, tipo] = grupoDe(d.p);
  if (!secoes.has(dir)) secoes.set(dir, { dir, rotulo, tipo, itens: [] });
  secoes.get(dir).itens.push(d);
}
const ordenadas = GRUPOS.map(([dir]) => secoes.get(dir)).filter(Boolean);

let noAr = 0, soltas = 0;
const cartao = (d) => {
  const paginas = [...new Set(d.usos.map((u) => PAGINA[u.arq] || u.arq))];
  const usada = paginas.length > 0;
  if (usada) noAr++; else if (d.p.startsWith("public/")) soltas++;
  const ref = d.url || d.p;
  const busca = esc((d.p + " " + paginas.join(" ")).toLowerCase());
  return `<button class="cartao${usada ? " viva" : ""}" data-ref="${esc(ref)}" data-busca="${busca}" data-uso="${usada ? "sim" : "nao"}" type="button">
  <span class="moldura"><img src="data:image/jpeg;base64,${b64(d.i)}" alt="${esc(d.p.split("/").pop())}" loading="lazy" width="200"></span>
  <span class="nome">${esc(d.p.split("/").pop())}</span>
  <span class="ref">${esc(ref)}</span>
  <span class="meta"><span class="dim">${esc(d.dim)}</span><span class="kb">${d.kb} KB</span></span>
  ${usada ? `<span class="paginas">${paginas.map((p) => `<span class="pag">${esc(p)}</span>`).join("")}</span>` : ""}
</button>`;
};

const corpo = ordenadas.map((s) => {
  const cards = s.itens.map(cartao).join("\n");
  return `<section class="secao" data-tipo="${s.tipo}" id="s-${s.dir.replace(/[^a-z]+/gi, "-")}">
  <header class="cabeca">
    <h2>${esc(s.rotulo)}</h2>
    <code class="pasta">${esc(s.dir)}/</code>
    <span class="conta">${s.itens.length}</span>
  </header>
  <div class="grade">${cards}</div>
</section>`;
}).join("\n");

const total = dados.length;
const navegacao = ordenadas.map((s) =>
  `<a class="salto" href="#s-${s.dir.replace(/[^a-z]+/gi, "-")}" data-tipo="${s.tipo}">${esc(s.rotulo)}<span>${s.itens.length}</span></a>`
).join("");

fs.writeFileSync(SAIDA, `<title>Acervo Videira</title>
<style>
:root{
  --bone:#fdfbf7; --sand:#edeae3; --clay:#ded9d0; --lilac:#efe8fc;
  --grape:#6d28d9; --grape-light:#c3aef5; --plum:#2c1250; --plum-deep:#180929;
  --chao:var(--bone); --papel:#ffffff; --recuo:var(--sand);
  --tinta:var(--plum-deep); --tinta-fraca:#6c6473; --regua:var(--clay);
  --realce:var(--grape); --realce-chao:var(--lilac); --realce-tinta:#ffffff;
  --sombra:0 1px 2px rgba(24,9,41,.06), 0 8px 24px -16px rgba(24,9,41,.3);
  --serif:Georgia,"Times New Roman",serif;
  --sans:system-ui,-apple-system,"Segoe UI",sans-serif;
  --mono:ui-monospace,SFMono-Regular,Menlo,monospace;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --chao:var(--plum-deep); --papel:#22103a; --recuo:#2a1545;
    --tinta:#f4eefb; --tinta-fraca:#a596b8; --regua:rgba(244,238,251,.14);
    --realce:var(--grape-light); --realce-chao:rgba(195,174,245,.16); --realce-tinta:var(--plum-deep);
    --sombra:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -16px rgba(0,0,0,.8);
  }
}
:root[data-theme="dark"]{
  --chao:var(--plum-deep); --papel:#22103a; --recuo:#2a1545;
  --tinta:#f4eefb; --tinta-fraca:#a596b8; --regua:rgba(244,238,251,.14);
  --realce:var(--grape-light); --realce-chao:rgba(195,174,245,.16); --realce-tinta:var(--plum-deep);
  --sombra:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -16px rgba(0,0,0,.8);
}
*{box-sizing:border-box}
body{margin:0;background:var(--chao);color:var(--tinta);font-family:var(--sans);
  font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.env{max-width:1400px;margin:0 auto;padding:0 clamp(16px,3vw,40px)}

.topo{padding:clamp(36px,6vw,72px) 0 28px}
.olho{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--tinta-fraca);margin:0 0 14px}
h1{font-family:var(--serif);font-weight:400;font-size:clamp(34px,5.5vw,54px);line-height:1.05;
  margin:0 0 16px;letter-spacing:-.015em;text-wrap:balance}
.resumo{max-width:62ch;color:var(--tinta-fraca);margin:0;font-size:16px}
.resumo b{color:var(--tinta);font-weight:600}

.barra{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--chao) 88%,transparent);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--regua);padding:12px 0;margin-top:28px}
.controles{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
#busca{flex:1 1 240px;min-width:200px;padding:10px 14px;border:1px solid var(--regua);
  border-radius:10px;background:var(--papel);color:var(--tinta);font:inherit;font-family:var(--mono);font-size:13px}
#busca:focus{outline:2px solid var(--realce);outline-offset:1px;border-color:transparent}
#busca::placeholder{color:var(--tinta-fraca)}
.filtros{display:flex;gap:6px}
.filtro{padding:9px 14px;border:1px solid var(--regua);border-radius:999px;background:transparent;
  color:var(--tinta-fraca);font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}
.filtro:hover{border-color:var(--realce);color:var(--tinta)}
.filtro[aria-pressed="true"]{background:var(--realce);border-color:var(--realce);color:var(--realce-tinta);font-weight:600}
.filtro:focus-visible{outline:2px solid var(--realce);outline-offset:2px}
#placar{font-family:var(--mono);font-size:12px;color:var(--tinta-fraca);font-variant-numeric:tabular-nums;margin-left:auto}

.atalhos{display:flex;flex-wrap:wrap;gap:5px;padding:14px 0 0}
.salto{display:inline-flex;align-items:baseline;gap:6px;padding:5px 11px;border-radius:999px;
  border:1px solid var(--regua);text-decoration:none;color:var(--tinta-fraca);font-size:12.5px}
.salto span{font-family:var(--mono);font-size:10.5px;opacity:.65;font-variant-numeric:tabular-nums}
.salto:hover{border-color:var(--realce);color:var(--realce)}
.salto[data-tipo="no-ar"]{color:var(--tinta)}

main{padding:34px 0 90px;display:flex;flex-direction:column;gap:46px}
.secao[hidden]{display:none}
.cabeca{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;
  padding-bottom:10px;border-bottom:1px solid var(--regua);margin-bottom:20px}
.cabeca h2{font-family:var(--serif);font-weight:400;font-size:24px;margin:0;letter-spacing:-.01em}
.pasta{font-family:var(--mono);font-size:12px;color:var(--tinta-fraca);background:var(--recuo);
  padding:2px 8px;border-radius:5px}
.conta{margin-left:auto;font-family:var(--mono);font-size:12px;color:var(--tinta-fraca);font-variant-numeric:tabular-nums}
.secao[data-tipo="no-ar"] .cabeca h2::before{content:"";display:inline-block;width:7px;height:7px;
  border-radius:50%;background:var(--realce);margin-right:9px;vertical-align:middle}

.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:14px}
.cartao{display:flex;flex-direction:column;gap:0;text-align:left;padding:0;border:1px solid var(--regua);
  border-radius:12px;background:var(--papel);cursor:pointer;overflow:hidden;font:inherit;color:inherit;
  transition:border-color .12s,transform .12s,box-shadow .12s}
.cartao:hover{border-color:var(--realce);transform:translateY(-2px);box-shadow:var(--sombra)}
.cartao:focus-visible{outline:2px solid var(--realce);outline-offset:2px}
.cartao[hidden]{display:none}
.moldura{display:block;aspect-ratio:4/3;background:var(--recuo);overflow:hidden}
.moldura img{width:100%;height:100%;object-fit:cover;display:block}
.nome{padding:9px 10px 0;font-size:12.5px;font-weight:600;line-height:1.3;word-break:break-word}
.ref{padding:3px 10px 0;font-family:var(--mono);font-size:10.5px;color:var(--tinta-fraca);word-break:break-all;line-height:1.35}
.meta{display:flex;gap:8px;padding:6px 10px 10px;font-family:var(--mono);font-size:10px;
  color:var(--tinta-fraca);font-variant-numeric:tabular-nums}
.paginas{display:flex;flex-wrap:wrap;gap:4px;padding:0 10px 10px;margin-top:-4px}
.pag{font-size:10px;padding:2px 7px;border-radius:999px;background:var(--realce-chao);color:var(--realce);font-weight:600}
.cartao.viva .moldura{position:relative}
.cartao.viva .moldura::after{content:"";position:absolute;top:7px;right:7px;width:7px;height:7px;
  border-radius:50%;background:var(--realce);box-shadow:0 0 0 2.5px var(--papel)}

#vazio{display:none;padding:56px 0;text-align:center;color:var(--tinta-fraca)}
#vazio.mostra{display:block}
#aviso{position:fixed;left:50%;bottom:26px;transform:translate(-50%,14px);background:var(--tinta);
  color:var(--chao);padding:10px 18px;border-radius:999px;font-family:var(--mono);font-size:12.5px;
  opacity:0;pointer-events:none;transition:opacity .16s,transform .16s;z-index:50;max-width:88vw;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#aviso.ver{opacity:1;transform:translate(-50%,0)}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>

<div class="env">
  <header class="topo">
    <p class="olho">Igreja Videira Indaiatuba</p>
    <h1>Todas as imagens que existem no projeto</h1>
    <p class="resumo"><b>${total} arquivos</b> em dois lugares: <b>public/</b> é o que está no ar,
    <b>material/</b> é o cru que ainda não virou site. Clique em qualquer foto para copiar o caminho dela —
    é isso que você me manda junto do print do Figma.</p>
  </header>
</div>

<div class="barra">
  <div class="env">
    <div class="controles">
      <input id="busca" type="search" placeholder="buscar por nome, pasta ou página…" autocomplete="off">
      <div class="filtros">
        <button class="filtro" data-f="tudo" aria-pressed="true" type="button">Tudo</button>
        <button class="filtro" data-f="no-ar" aria-pressed="false" type="button">No ar</button>
        <button class="filtro" data-f="material" aria-pressed="false" type="button">Material</button>
        <button class="filtro" data-f="acervo" aria-pressed="false" type="button">Acervo</button>
      </div>
      <span id="placar"></span>
    </div>
    <nav class="atalhos">${navegacao}</nav>
  </div>
</div>

<div class="env">
  <main>${corpo}</main>
  <p id="vazio">Nenhuma imagem com esse nome.</p>
</div>
<div id="aviso" role="status" aria-live="polite"></div>

<script>
const cartoes = [...document.querySelectorAll(".cartao")];
const secoes  = [...document.querySelectorAll(".secao")];
const busca   = document.getElementById("busca");
const placar  = document.getElementById("placar");
const vazio   = document.getElementById("vazio");
const aviso   = document.getElementById("aviso");
let filtro = "tudo";

function aplicar(){
  const q = busca.value.trim().toLowerCase();
  let vistos = 0;
  for (const s of secoes){
    const okTipo = filtro === "tudo" || s.dataset.tipo === filtro;
    let naSecao = 0;
    for (const c of s.querySelectorAll(".cartao")){
      const ok = okTipo && (!q || c.dataset.busca.includes(q));
      c.hidden = !ok;
      if (ok) naSecao++;
    }
    s.hidden = naSecao === 0;
    vistos += naSecao;
  }
  placar.textContent = vistos + (vistos === 1 ? " imagem" : " imagens");
  vazio.classList.toggle("mostra", vistos === 0);
}

busca.addEventListener("input", aplicar);
for (const b of document.querySelectorAll(".filtro")){
  b.addEventListener("click", () => {
    filtro = b.dataset.f;
    document.querySelectorAll(".filtro").forEach(o => o.setAttribute("aria-pressed", String(o === b)));
    aplicar();
  });
}

let relogio;
function anunciar(txt){
  aviso.textContent = txt;
  aviso.classList.add("ver");
  clearTimeout(relogio);
  relogio = setTimeout(() => aviso.classList.remove("ver"), 1900);
}
for (const c of cartoes){
  c.addEventListener("click", async () => {
    const ref = c.dataset.ref;
    try { await navigator.clipboard.writeText(ref); anunciar("copiado  " + ref); }
    catch (e) { anunciar(ref); }
  });
}
document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== busca){ e.preventDefault(); busca.focus(); }
  if (e.key === "Escape" && document.activeElement === busca){ busca.value = ""; aplicar(); busca.blur(); }
});
aplicar();
</script>`);
fs.rmSync(TMP, { recursive: true, force: true });
console.log(`docs/acervo.html — ${total} imagens, ${noAr} no ar, ${(fs.statSync(SAIDA).size / 1048576).toFixed(1)}MB`);
