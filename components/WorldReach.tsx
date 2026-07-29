import { WORLD_DOTS_PATH, WORLD_DOTS_VIEWBOX } from "@/lib/world-dots";

/**
 * Onde a rede Videira chegou — os países nomeados na fonte pública sobre a
 * rede (Wikipédia: "32 países, dentre eles..."). A lista publicada nomeia 18
 * dos 32; os outros não são divulgados, então o mapa marca só o que dá pra
 * afirmar e o número redondo mora no texto ao lado, não nos pins. Contar pins
 * aqui NÃO deve bater com "30+ países" — são coisas diferentes de propósito.
 *
 * Coordenadas em unidades do viewBox (416x184), não em lat/lon: já saíram
 * projetadas do mesmo script que gerou a grade de pontos, senão pin e
 * continente não caem no mesmo lugar.
 *
 * A Europa perdeu França, Holanda e Bélgica, e a América do Sul perdeu Chile e
 * Uruguai, na deduplicação: nessa escala eles caem a menos de 13 unidades de
 * um vizinho e viravam uma mancha só. Quem sobrou representa o cluster.
 *
 * Manchas regionais — não pinos: África e Índia entraram no mapa por
 * indicação direta de quem edita o site (crescimento recente, sem uma fonte
 * pública pra citar caso a caso como os PINS acima). Uma mancha larga e sem
 * fronteira definida é honesta sobre isso — não finge saber o país exato,
 * só sinaliza a região. Coordenadas pela mesma fórmula do resto do mapa
 * (lon/lat → viewBox), não é chute de posição na tela.
 */
const REGIONS = [
  { name: "África", cx: 224, cy: 107, rx: 52, ry: 58 },
  { name: "Índia", cx: 295, cy: 78, rx: 24, ry: 20 },
];

const PINS = [
  { name: "Goiânia", x: 143.5, y: 130, origin: true },
  { name: "Estados Unidos", x: 85.6, y: 53.6 },
  { name: "Canadá", x: 76.1, y: 30.2 },
  { name: "Peru", x: 112.9, y: 120.8 },
  { name: "Paraguai", x: 133.1, y: 138.7 },
  { name: "Argentina", x: 126, y: 153.8 },
  { name: "Inglaterra", x: 200.3, y: 35 },
  { name: "Portugal", x: 192.3, y: 52.9 },
  { name: "Alemanha", x: 214.4, y: 36.8 },
  { name: "Moçambique", x: 244.3, y: 132.8 },
  { name: "Iraque", x: 254, y: 61.5 },
  { name: "Afeganistão", x: 282.5, y: 60.6 },
  { name: "Japão", x: 366.1, y: 57 },
];

export function WorldReach({
  className = "",
  /* Separados porque o mapa serve nos dois fundos: os pontos formam o
     continente e os pinos são a informação sobre ele. Num fundo claro os dois
     precisam INVERTER — ponto escuro translúcido e pino em `grape` cheio —,
     e amarrar isso a `currentColor` só do <svg> deixaria ponto e pino presos
     na mesma cor. */
  dotClassName = "text-plum-deep/30",
  pinClassName = "text-grape",
  regionClassName = "text-grape",
}: {
  className?: string;
  dotClassName?: string;
  pinClassName?: string;
  regionClassName?: string;
}) {
  return (
    <svg
      viewBox={WORLD_DOTS_VIEWBOX}
      className={`w-full ${className}`}
      /* Decorativo: a informação ("30+ países", "1.300+ igrejas") está escrita
         em texto logo abaixo. Um leitor de tela anunciando 13 nomes de país
         soltos só atrapalharia. */
      role="presentation"
      aria-hidden
    >
      <defs>
        {/* Borda que se dissolve em vez de parar seca — reforça que é uma
            região aproximada, não um contorno de país como os pinos.
            `regionClassName` fica aqui, não na <ellipse> que usa o
            gradiente: um <stop currentColor> herda a cor de quem o DEFINE
            (a cadeia defs > radialGradient > stop), não de quem referencia
            o gradiente via `fill="url(#...)"` lá embaixo. */}
        <radialGradient id="region-glow" className={regionClassName}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={WORLD_DOTS_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        className={dotClassName}
      />

      {REGIONS.map((r) => (
        <ellipse
          key={r.name}
          cx={r.cx}
          cy={r.cy}
          rx={r.rx}
          ry={r.ry}
          fill="url(#region-glow)"
        />
      ))}

      {PINS.map((p) => (
        <g key={p.name} className={pinClassName}>
          {/* Halo. Só um círculo de baixa opacidade — a referência que inspirou
              isso usava glow de neon, que é vocabulário de dashboard e brigaria
              com o resto da página (serifada, quente, sem efeito de UI). */}
          <circle
            cx={p.x}
            cy={p.y}
            r={p.origin ? 8 : 5.5}
            fill="currentColor"
            opacity={p.origin ? 0.28 : 0.18}
          />
          <circle
            cx={p.x}
            cy={p.y}
            r={p.origin ? 3 : 2.2}
            fill="currentColor"
          />
        </g>
      ))}
    </svg>
  );
}
