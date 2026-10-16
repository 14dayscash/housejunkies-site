import { RichText } from "@/components/RichText";
import { californiaBaseline, cityFacts, usBaseline, type CityFacts } from "@/lib/cityFacts";

// "By the numbers" and "About" sections for a city page. Every number comes
// from lib/cityFacts.ts (Census Bureau data). The sentences are built from
// those numbers, so each city reads differently because its data differs.

const n = (x: number) => x.toLocaleString("en-US");
const usd = (x: number) => `$${n(Math.round(x))}`;
const pct = (x: number) => `${x}%`;

// "12% below", "5% above", or "about the same as"
function compare(value: number, base: number, noun: string): string {
  const diff = ((value - base) / base) * 100;
  if (Math.abs(diff) < 2) return `about the same as ${noun}`;
  return `${Math.round(Math.abs(diff))}% ${diff < 0 ? "below" : "above"} ${noun}`;
}

function paragraphs(name: string, f: CityFacts): string[] {
  const out: string[] = [];
  const ca = californiaBaseline;
  const us = usBaseline;

  // People and place
  let first = `${name} had ${n(f.pop2020)} people at the 2020 Census.`;
  if (f.popEstimate2025) {
    const change = ((f.popEstimate2025 - f.pop2020) / f.pop2020) * 100;
    const size = Math.abs(change) < 0.1 ? "about the same as" : `${Math.abs(Math.round(change * 10) / 10)}% ${change < 0 ? "lower" : "higher"} than`;
    first += ` The Census Bureau's July 2025 estimate is ${n(f.popEstimate2025)}, which is ${size} the 2020 count.`;
  }
  if (f.landAreaSqMi && f.densityPerSqMi) {
    first += ` The area covers ${f.landAreaSqMi} square miles, which works out to about ${n(Math.round(f.densityPerSqMi))} people per square mile.`;
  } else if (f.landAreaSqMi) {
    first += ` The area covers ${f.landAreaSqMi} square miles${f.elevationFt ? ` and sits at about ${n(f.elevationFt)} feet above sea level` : ""}.`;
  }
  if (f.landAreaSqMi && f.densityPerSqMi && f.elevationFt) {
    first += ` ${name} sits at about ${n(f.elevationFt)} feet above sea level.`;
  }
  out.push(first);

  // Home values
  if (f.medianHomeValue) {
    out.push(
      `The median value of an owner-occupied home in ${name} is ${usd(f.medianHomeValue)}. That is ${compare(f.medianHomeValue, ca.medianHomeValue, `the California median of ${usd(ca.medianHomeValue)}`)}, and ${compare(f.medianHomeValue, us.medianHomeValue, `the U.S. median of ${usd(us.medianHomeValue)}`)}. A house that needs repairs usually sells for less than these citywide numbers, and we price that in. [See how we calculate your offer](/how-we-calculate-your-offer).`,
    );
  }

  // Owners and renters
  if (f.ownerOccupiedRate) {
    const renters = Math.round((100 - f.ownerOccupiedRate) * 10) / 10;
    let s = `About ${pct(f.ownerOccupiedRate)} of occupied homes in ${name} are lived in by their owners, so about ${pct(renters)} are rented. The owner rate is ${pct(ca.ownerOccupiedRate)} across California and ${pct(us.ownerOccupiedRate)} across the U.S.`;
    if (f.ownerOccupiedRate < 50) {
      s += ` With that many renters, a lot of the houses here are rentals, and we buy [houses with tenants](/sell-your-house/with-tenants) as-is.`;
    } else if (f.ownerOccupiedRate >= 65) {
      s += ` Most homes here are lived in by their owners. If you own one and need to sell, we buy houses [as-is](/sell-your-house/as-is).`;
    }
    out.push(s);
  }

  // Rent, income, household size, education
  const bits: string[] = [];
  if (f.medianRent) {
    bits.push(`The median rent in ${name} is ${usd(f.medianRent)} a month, compared with ${usd(ca.medianRent)} in California and ${usd(us.medianRent)} across the U.S.`);
  }
  if (f.medianHouseholdIncome) {
    const label = f.incomeLabel ? ` (${f.incomeLabel})` : "";
    bits.push(`The median household income is ${usd(f.medianHouseholdIncome)}${label}.`);
  }
  if (f.personsPerHousehold) {
    bits.push(`The average household has ${f.personsPerHousehold} people, compared with ${ca.personsPerHousehold} in California.`);
  }
  if (f.bachelorsOrHigher) {
    bits.push(`${pct(f.bachelorsOrHigher)} of adults 25 and older have a bachelor's degree or higher, compared with ${pct(ca.bachelorsOrHigher)} in California.`);
  }
  if (bits.length) out.push(bits.join(" "));

  return out;
}

export function CityFactsSection({ slug, name }: { slug: string; name: string }) {
  const f = cityFacts[slug];
  if (!f) return null;

  const paras = paragraphs(name, f);
  const about = [
    ...(f.incorporated
      ? [/^\d{4}$/.test(f.incorporated) ? `${name} was incorporated in ${f.incorporated}.` : `${name} was incorporated on ${f.incorporated}.`]
      : []),
    ...(f.about ?? []),
  ];

  const rows: { label: string; city: string; ca?: string; us?: string }[] = [
    { label: "People (2020 Census)", city: n(f.pop2020) },
    ...(f.medianHomeValue ? [{ label: "Median home value", city: usd(f.medianHomeValue), ca: usd(californiaBaseline.medianHomeValue), us: usd(usBaseline.medianHomeValue) }] : []),
    ...(f.ownerOccupiedRate ? [{ label: "Homes lived in by owners", city: pct(f.ownerOccupiedRate), ca: pct(californiaBaseline.ownerOccupiedRate), us: pct(usBaseline.ownerOccupiedRate) }] : []),
    ...(f.medianRent ? [{ label: "Median rent per month", city: usd(f.medianRent), ca: usd(californiaBaseline.medianRent), us: usd(usBaseline.medianRent) }] : []),
    ...(f.medianHouseholdIncome && f.source === "quickfacts" ? [{ label: "Median household income", city: usd(f.medianHouseholdIncome), ca: usd(californiaBaseline.medianHouseholdIncome), us: usd(usBaseline.medianHouseholdIncome) }] : []),
    ...(f.personsPerHousehold ? [{ label: "People per household", city: String(f.personsPerHousehold), ca: String(californiaBaseline.personsPerHousehold), us: String(usBaseline.personsPerHousehold) }] : []),
    ...(f.bachelorsOrHigher ? [{ label: "Adults with a bachelor's degree or higher", city: pct(f.bachelorsOrHigher), ca: pct(californiaBaseline.bachelorsOrHigher), us: pct(usBaseline.bachelorsOrHigher) }] : []),
  ];
  const showCompare = rows.some((r) => r.ca);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-xl font-bold text-brand-black">{name} Housing and Neighborhood Data</h2>
        <div className="mt-3 max-w-3xl space-y-3 text-gray-600">
          {paras.map((p, i) => (
            <p key={i}>
              <RichText text={p} />
            </p>
          ))}
        </div>

        {rows.length > 1 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <caption className="sr-only">{name} compared with California and the United States</caption>
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-2 pr-4 font-semibold text-brand-black">{name} at a glance</th>
                <th className="py-2 pr-4 font-semibold text-brand-yellow-dark">{name}</th>
                {showCompare && <th className="py-2 pr-4 font-semibold text-gray-500">California</th>}
                {showCompare && <th className="py-2 font-semibold text-gray-500">U.S.</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-brand-black">{r.label}</td>
                  <td className="py-2 pr-4 font-semibold text-brand-black">{r.city}</td>
                  {showCompare && <td className="py-2 pr-4 text-gray-500">{r.ca ?? ""}</td>}
                  {showCompare && <td className="py-2 text-gray-500">{r.us ?? ""}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        <p className="mt-3 max-w-3xl text-xs text-gray-400">
          {f.source === "quickfacts" ? (
            <>
              Source:{" "}
              <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                U.S. Census Bureau QuickFacts
              </a>
              , 2020 Census and 2020-2024 American Community Survey estimates. These are citywide numbers, not an
              offer on your house. Call for a number on your address.
            </>
          ) : (
            <>
              Source: 2020 Census figures as listed on{" "}
              <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                Wikipedia&apos;s {name} page
              </a>
              . Census QuickFacts does not cover places this small, so only the 2020 count is shown.
            </>
          )}
        </p>
      </section>

      {about.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <h2 className="text-xl font-bold text-brand-black">About {name}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {about.map((line, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="mt-1 text-brand-yellow-dark">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
