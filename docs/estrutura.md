# Estrutura do site — Igreja Videira Indaiatuba

Documento de arquitetura. Define **o que existe, onde mora e por quê**.
Antes de criar qualquer página ou seção nova, a pergunta é respondida aqui.

Levantado em 04/08/2026, com a igreja, para o lançamento da v1 em 07/08/2026.

---

## 1. Propósito

**Objetivo nº 1:** dar credibilidade institucional à igreja e informar.

**Público prioritário:** quem é de fora. Ainda não há dados de audiência — a
decisão é uma aposta deliberada, não uma medição. Quando houver analytics,
revisar.

**Como saberemos que deu certo:** pessoas chegando à igreja através do site, ou
ao menos chegando já informadas.

Três consequências que valem para o site inteiro:

1. **Fato verificável vale mais que prosa.** Texto morno e genérico não machuca
   ninguém e se refina depois. Horário errado, e-mail que não existe ou número
   inventado destroem exatamente aquilo que o site existe para construir.
2. **Nada que exija manutenção semanal.** Não há quem atualize nos próximos
   meses. Informação desatualizada é pior que informação ausente.
3. **O site informa, não transaciona.** Sem doação, inscrição, área de membro ou
   transmissão na v1.

---

## 2. Mapa do site

```
/                        Início
/sobre                   Sobre        ← A REFAZER do zero (página apagada)
/celulas                 Células      ← A DESENHAR do zero
/radicais-livres         Jovens
/radicais-kids           Crianças
/trilho-do-vencedor      O caminho    ← A CRIAR (v1)
/contato                 Contato
```

Sete rotas, um só nível. **Não há subpáginas, e isso é uma decisão.** Um site de
sete páginas com menu de um nível é navegável por qualquer pessoa sem
aprendizado. Hierarquia só se justifica quando um pai tem quatro ou mais filhos
com peso próprio — não é o caso hoje.

### Menu do topo ≠ mapa do site

O **header** carrega só o que exige escolha: Células · Radicais Livres ·
Radicais Kids · Trilho do Vencedor, mais o botão *Planeje sua visita*.
(Sobre sai da lista enquanto a rota não existir — repor quando ela voltar.)
"Início" e "Contato" saíram: o logo e o botão já levam a esses dois destinos.
Acima de seis itens a linha quebra no laptop.

O **rodapé** é o mapa completo, com as sete rotas. As duas listas divergem de
propósito.

---

## 3. A regra de decisão

Toda vez que aparecer coisa nova para publicar:

| Vira **página** quando… | Vira **seção** quando… | **Não entra** quando… |
|---|---|---|
| tem nome e identidade próprios | é parte da igreja fazendo o que faz | exige atualização que ninguém vai fazer |
| alguém procuraria por ele no Google | só faz sentido dentro de outro assunto | não temos o fato confirmado |
| sustenta uma página inteira sem encher linguiça | cabe em três parágrafos | é promessa que a igreja não cumpre hoje |

Aplicando ao inventário levantado:

**Viraram página** — Radicais Livres, Radicais Kids, Células, e agora o Trilho
do Vencedor (que absorve a Escola de Ministérios inteira).

**Viraram seção** — cultos e horários, Escola de Ministérios, Cursos da Família,
equipes de serviço, eventos fixos.

**Ficaram de fora** — agenda com datas, blog, doação online, inscrições.

---

## 4. O Trilho do Vencedor — a página que faltava

É a espinha que o site não tinha. Quem chega de fora entende hoje que existem
células, jovens e crianças, mas nada responde **"e se eu entrar nessa igreja, o
que acontece comigo?"**. O Trilho responde, e a igreja já o estruturou — não há
nada a inventar.

### O caminho

| # | Etapa | Formato | Cadência |
|---|---|---|---|
| 1 | Célula | encontro semanal numa casa | semanal |
| 2 | Encontro com Deus | sexta à noite a domingo à tarde, fora | 2× por semestre |
| 3 | Consolidação | 4 semanas | contínuo |
| 4 | Curso das Águas | uma noite, 2h | antes de cada batismo |
| 5 | Batismo | celebração | 1× por semestre |
| 6 | Maturidade no Espírito | 3 meses | — |

E então, **mediante desejo e chamado** — não é continuação automática, e a
página deixa isso claro numa faixa escura própria:

| Curso | Duração | Formato |
|---|---|---|
| Curso de Treinamento de Líderes | 3 meses | Presencial e telepresencial |
| Seminário Pastoral | 2 anos | Presencial e telepresencial |

**Como se entra em qualquer etapa:** a pessoa está numa célula e fala com o
líder. Não há secretaria de inscrição nem formulário. É por isso que a célula é
a etapa 1 — ela não é só o começo, é a porta de todas as outras — e é por isso
que o CTA desta página aponta para `/celulas` e não para `/contato`, contra o
padrão do resto do site.

### Escola de Ministérios

Nome guarda-chuva de **todos** os cursos da igreja — tanto os do trilho quanto
os da família. Dentro dela, os **Cursos da Família**, trilha paralela que não
depende de estágio no trilho:

- Finanças à Maneira de Deus
- Curso de Noivos
- Curso de Vida Conjugal
- Curso de Criação de Filhos

⚠️ **São normalmente para membros.** A página não pode sugerir porta de entrada
aberta para quem chega de fora — seria a promessa mais fácil de quebrar aqui.

### Onde o caminho termina: servir

Louvor, Mídia e Limpeza fecham a página. Três equipes não sustentam uma página
própria, mas dão ao trilho um fim concreto: o caminho vai de visitante a quem
serve. Sem isso a página termina num curso, o que é anticlimático.

---

## 5. Onde cada coisa do inventário mora

| O que a igreja tem | Onde vive no site |
|---|---|
| Cultos, domingo 9h–11h e 18h–20h | Home, /contato, rodapé |
| Células de adultos, jovens, juvenis e crianças | /celulas — **a definir com a igreja** |
| Radicais Livres | página própria |
| Radicais Kids | página própria |
| Trilho do Vencedor (6 etapas) | /trilho-do-vencedor |
| Escola de Ministérios | seção em /trilho-do-vencedor |
| Cursos da Família (4 cursos) | seção em /trilho-do-vencedor |
| Equipes: Louvor, Mídia, Limpeza | fecho de /trilho-do-vencedor |
| HolyFest (fevereiro) | /radicais-livres |
| Encontro com Deus, Batismo | etapas do trilho, com cadência em texto |
| Conferências | **não publicadas** — ver abaixo |

### Por que não há página de Agenda

A igreja tem eventos fixos, mas cadência variável ("conferências mediante
programação"), e ninguém para atualizar por alguns meses. Uma agenda com o
último evento em fevereiro comunica igreja parada — o oposto exato do objetivo
nº 1. Por isso Encontro com Deus e Batismo aparecem com a **cadência escrita**
("duas vezes por semestre"), que não vence a validade.

Quando houver quem publique semanalmente, a agenda passa a fazer sentido.

---

## 6. Pendências de fato

O que o site afirma e a igreja ainda não confirmou. **Cada linha aqui é um
risco de credibilidade, não um to-do de conteúdo.**

| Pendência | Onde | Situação |
|---|---|---|
| E-mail `igrejavideiraindaituba@hotmail.com` | rodapé, /contato | Informado pela igreja. Grafia sem o 2º "a" de Indaiatuba — **testar envio antes do lançamento** |
| Lista de células | [`lib/cells.ts`](../lib/cells.ts) | Provisória, herdada do site antigo. Mantida por decisão consciente. Faltam jovens e juvenis |
| "Juvenis" como quarto público | `lib/cells.ts` só conhece Adultos/Jovens/Kids | A igreja tem quatro; o site tem três |
| Prosa das seis etapas | /trilho-do-vencedor | Formato e duração são fatos conferidos. **O texto que descreve cada etapa é nosso** e não passou pela liderança |
| Legenda da foto do Encontro | /trilho-do-vencedor | Afirma que a foto é de um Encontro com Deus — veio do nome do arquivo, não de conferência |
| Bio de Gustavo e Mariana Pires | /radicais-livres, seção Liderança | **Não é pendência de fato — é conteúdo que falta.** A descrição é opcional desde a especificação da página, e a seção está no ar sem ela: nome, função e foto são conferidos. Um ou dois parágrafos em `liderancaRede.bio` e o bloco aparece |
| Missão da rede | /radicais-livres, seção Quem somos | Redação nossa. Visão e propósito vêm do encargo do pr. Naor (2000); a missão não tem fonte, e por isso está escrita sem número, meta ou promessa |
| Células de jovens "todos os sábados" | /radicais-livres | Cadência informada pela liderança em 11/08/2026. `lib/cells.ts` ainda não tem nenhuma célula de jovens listada, então o botão "Ver as células" leva a uma lista onde elas não aparecem |
| "Começou com 350 jovens" | /radicais-livres | Sem fonte |
| **Missão** dos Radicais Livres | /radicais-livres | Redação nossa, não passou pela liderança. Visão e propósito, ao lado dela, são citação do pr. Naor — só a missão é nossa. Escrita sem número e sem promessa de propósito, para ser segura enquanto não for conferida |
| **Liderança** dos Radicais Livres | /radicais-livres | Seção construída e **não publicada**: o array `lideranca` está vazio e a seção inteira não renderiza. Falta nome, função e foto de cada líder |
| **Células de jovens no sábado** | /radicais-livres | A cadência ("todos os sábados") veio da liderança nesta rodada. Vale conferir junto com as células que faltam em `lib/cells.ts` |
| Três etapas do Kids | /radicais-kids | Sem fonte |
| FAQ | /radicais-kids | Sem fonte. O do /radicais-livres foi removido na reestruturação da página |
| Telefone fixo / secretaria | /contato | Só existe o WhatsApp (19) 97820-1132 |

### Corrigido em 04/08/2026

- **Horário dos cultos.** O site dizia "10h e 18h" em quatro lugares (rodapé das
  sete páginas, Home, /contato e o fecho do /radicais-kids). O correto é
  9h–11h e 18h–20h.
- **E-mail inexistente.** `contato@igrejavideira.com.br` nunca existiu.
  Substituído pelo real. Um segundo endereço inventado (`celulas@…`) foi
  removido do /contato.
- **Horário de secretaria inventado** ("Seg–Sex, 9h–17h") removido do /contato.
- **"Seja voluntário no Kids"** — seção inteira removida. O programa não existe.
- **"Todos os voluntários são verificados e treinados"** — removido do
  /radicais-kids. Era uma garantia de segurança dada a pais, escrita sem fonte,
  e a igreja confirmou que não funciona assim. A afirmação mais cara do site.
- **Rolagem horizontal no celular.** Seis das sete páginas tinham 20px de
  rolagem lateral: os `<Reveal>` com `variant="right"` começam deslocados 40px
  no eixo X e estouravam a borda do documento. Resolvido com `overflow-x: clip`
  no `html` (não `hidden`, que criaria contêiner de rolagem e quebraria
  `position: sticky` — verificado).

---

## 7. Depois do lançamento

Fora de escopo até 07/08, e deliberadamente:

- **Catálogo de blocos.** Cada página hoje é um arquivo de 500–700 linhas com o
  padrão copiado à mão. O vocabulário visual já é consistente, mas nunca foi
  extraído: hero, seção alternada bone/sand/plum-deep, grade de cards, FAQ,
  fecho escuro de topo arredondado. Extrair transforma página nova em montagem.
- **Conteúdo fora do JSX.** Hoje só [`lib/cells.ts`](../lib/cells.ts) separa
  conteúdo de layout. Enquanto texto e marcação estiverem trançados, revisar
  copy exige mexer em componente React.
- **Agenda e blog**, quando houver quem atualize.
- **CMS**, no momento em que a igreja — e não o desenvolvedor — precisar
  publicar.

A janela de alguns meses antes das atualizações constantes é exatamente o tempo
para isso.
