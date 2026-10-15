import { moneyShort, num, portfolioStats, type Property } from "@/lib/properties";

// tone "dark" sits on the black page hero, "light" on a white section.
export function PropertyStats({ list, tone = "light" }: { list: Property[]; tone?: "dark" | "light" }) {
  const s = portfolioStats(list);
  const tiles = [
    { value: String(s.count), label: s.count === 1 ? "House" : "Houses" },
    { value: moneyShort(s.purchaseTotal), label: "What We Paid" },
    s.cityCount > 1
      ? { value: String(s.cityCount), label: "Cities" }
      : { value: num(s.sqftTotal), label: "Square Feet" },
  ];

  const dark = tone === "dark";

  return (
    <dl className="grid grid-cols-3 gap-3">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className={`rounded-lg border p-4 sm:p-5 ${
            dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
          }`}
        >
          <dd
            className={`font-display text-2xl font-extrabold leading-none tabular-nums sm:text-3xl ${
              dark ? "text-brand-yellow" : "text-brand-black"
            }`}
          >
            {tile.value}
          </dd>
          <dt className={`mt-3 text-xs leading-snug ${dark ? "text-white/70" : "text-gray-600"}`}>
            {tile.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
