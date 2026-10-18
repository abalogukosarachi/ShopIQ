import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import type { Product } from "@/types/product";

/** Lower-case, strip accents and apostrophes so "Nestlé" matches "nestle" and "Kellogg's" matches "kelloggs". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
);

function haystack(p: Product): { name: string; rest: string } {
  const name = normalize(`${p.name} ${p.brand}`);
  const rest = normalize(
    [
      p.subcategory,
      CATEGORY_LABELS[p.category] ?? "",
      p.description,
      ...p.variants.map((v) => v.label),
    ].join(" ")
  );
  return { name, rest };
}

/**
 * Finds products matching every word the shopper typed, looking at the
 * product name, brand, category, subcategory, description and size labels.
 * Name/brand matches are ranked first.
 */
export function searchProducts(query: string): Product[] {
  const tokens = normalize(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: { product: Product; score: number }[] = [];

  for (const product of PRODUCTS) {
    const { name, rest } = haystack(product);
    const all = `${name} ${rest}`;
    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      // allow simple plurals: "biscuits" also matches "biscuit"
      const variants =
        token.length > 3 && token.endsWith("s")
          ? [token, token.slice(0, -1)]
          : [token];
      if (!variants.some((t) => all.includes(t))) {
        matchedAll = false;
        break;
      }
      if (variants.some((t) => name.includes(t))) score += 3;
      else score += 1;
    }

    if (matchedAll) scored.push({ product, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
    .map((s) => s.product);
}
