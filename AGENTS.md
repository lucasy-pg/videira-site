<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Imagens e vídeos

`material/` é o cru (fora do git), `public/` é o pronto. O Lucas joga o arquivo
original em `material/<pasta>/`; você converte, redimensiona, renomeia e escreve
em `public/<mesma pasta>/`. Nunca commite o original.

Antes de dizer que uma imagem não existe, **abra `docs/acervo.html`** — é o
catálogo de tudo que há nas duas pastas, com miniatura e caminho. Regere com
`node scripts/gerar-acervo.js` depois de mexer nas pastas.

Convenção de nome, tamanhos e o mapa das pastas: `docs/imagens.md`.
