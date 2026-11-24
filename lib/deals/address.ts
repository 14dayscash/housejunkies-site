// Address matching for the "already submitted" check, so
// "765 South C Street, Tulare" matches "765 S C St, Tulare, CA 93274".

const WORDS: Record<string, string> = {
  street: "st", avenue: "ave", av: "ave", road: "rd", drive: "dr", boulevard: "blvd",
  lane: "ln", court: "ct", place: "pl", circle: "cir", terrace: "ter", highway: "hwy",
  parkway: "pkwy", trail: "trl", square: "sq",
  north: "n", south: "s", east: "e", west: "w",
  northeast: "ne", northwest: "nw", southeast: "se", southwest: "sw",
};
const DROP = new Set(["ca", "california", "usa", "us"]);

function normalize(part: string) {
  return part
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !DROP.has(t) && !/^\d{5}$/.test(t))
    .map((t) => WORDS[t] ?? t)
    .join(" ");
}

function keys(address: string) {
  const parts = address.split(",").map(normalize).filter(Boolean);
  return { street: parts[0] ?? "", full: parts.join(" "), hasCity: parts.length > 1 };
}

export function sameAddress(a: string, b: string) {
  const x = keys(a);
  const y = keys(b);
  if (!x.street || !y.street) return false;
  if (x.hasCity && y.hasCity) return x.full === y.full;
  // One side was typed without commas: compare the street part.
  const short = x.hasCity ? x.street : x.full;
  const other = y.hasCity ? y.street : y.full;
  return x.street === y.street || short === other || x.full.startsWith(y.street + " ") || y.full.startsWith(x.street + " ");
}
