// A schematic (not literal) view of how the site's page categories link to
// each other. Decorative/illustrative, not a nav element itself, the pill
// buttons below on the Explore page are the real, accessible way to click
// through. Categories, not every individual page, since 60+ nodes would be
// unreadable rather than useful.

type Node = { id: string; label: string; x: number; y: number; primary?: boolean };
type Edge = [string, string];

const nodes: Node[] = [
  { id: "home", label: "Home", x: 300, y: 220, primary: true },
  { id: "we-buy-houses", label: "We Buy Houses", x: 130, y: 90 },
  { id: "cities", label: "Cities (21)", x: 20, y: 20 },
  { id: "counties", label: "Counties (4)", x: 40, y: 170 },
  { id: "sell-your-house", label: "Sell Your House", x: 470, y: 90 },
  { id: "situations", label: "Situations (12)", x: 580, y: 20 },
  { id: "about", label: "About", x: 470, y: 350 },
  { id: "team", label: "Our Team (4)", x: 580, y: 420 },
  { id: "reviews", label: "Reviews", x: 130, y: 350 },
  { id: "projects", label: "Projects", x: 30, y: 300 },
  { id: "blog", label: "Blog", x: 300, y: 430 },
  { id: "faq", label: "FAQ", x: 380, y: 40 },
  { id: "contact", label: "Contact", x: 220, y: 40 },
];

const edges: Edge[] = [
  ["home", "we-buy-houses"],
  ["home", "sell-your-house"],
  ["home", "about"],
  ["home", "reviews"],
  ["home", "projects"],
  ["home", "blog"],
  ["home", "faq"],
  ["home", "contact"],
  ["we-buy-houses", "cities"],
  ["we-buy-houses", "counties"],
  ["cities", "counties"],
  ["sell-your-house", "situations"],
  ["about", "team"],
  ["we-buy-houses", "sell-your-house"],
];

function findNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function SiteWebDiagram() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <svg viewBox="0 0 600 460" className="w-full" role="img" aria-label="Diagram of how pages on the site link to each other">
        {edges.map(([a, b], i) => {
          const from = findNode(a);
          const to = findNode(b);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#d9ac0c"
              strokeWidth={1.5}
              strokeOpacity={0.5}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.primary ? 34 : 24}
              fill={n.primary ? "#0a0a0a" : "#ffffff"}
              stroke={n.primary ? "#f5c518" : "#0a0a0a"}
              strokeWidth={n.primary ? 3 : 1.5}
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={n.primary ? 11 : 9}
              fontWeight={n.primary ? 700 : 600}
              fill={n.primary ? "#f5c518" : "#0a0a0a"}
            >
              {n.label.split(" ").length > 2 ? n.label.split(" ").slice(0, -1).join(" ") : n.label}
            </text>
            {n.label.split(" ").length > 2 && (
              <text
                x={n.x}
                y={n.y + 11}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill={n.primary ? "#f5c518" : "#0a0a0a"}
              >
                {n.label.split(" ").slice(-1)}
              </text>
            )}
          </g>
        ))}
      </svg>
      <p className="mt-2 text-center text-xs text-gray-400">
        A simplified view of how the site connects, grouped by category. The full,
        clickable list is below.
      </p>
    </div>
  );
}
