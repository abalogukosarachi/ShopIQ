import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS, getBestSellers } from "@/data/products";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Pagination } from "@/components/ui/Pagination";
import { paginate } from "@/lib/paginate";

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/**
 * /shop — the page behind the search bar, "Shop Now" and "View all best
 * sellers". Supports:
 *   /shop                      all products
 *   /shop?q=rice               search results
 *   /shop?filter=bestsellers   best sellers only
 */
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = first(params.q).trim();
  const filter = first(params.filter);

  let products = PRODUCTS;
  let title = "All Products";

  if (query) {
    products = searchProducts(query);
    title = `Search results for “${query}”`;
  } else if (filter === "bestsellers") {
    products = getBestSellers();
    title = "Best Sellers";
  }

  const { pageItems, page, totalPages, from, to, total } = paginate(
    products,
    first(params.page)
  );
  const keep: Record<string, string> = {};
  if (query) keep.q = query;
  if (filter) keep.filter = filter;

  return (
    <main className="container-shopiq py-3xl">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          ...(query || filter === "bestsellers"
            ? [{ label: "Shop", href: "/shop" }, { label: title }]
            : [{ label: "Shop" }]),
        ]}
      />

      <div className="my-lg">
        <h1 className="font-heading text-2xl font-semibold text-text">
          {title}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {total} {total === 1 ? "product" : "products"}
          {total > 0 && totalPages > 1 ? `, showing ${from} to ${to}` : ""}
        </p>
      </div>

      {/* Category shortcuts */}
      <div className="mb-lg flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-text hover:border-primary hover:bg-primary-light"
          >
            {c.label}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-3xl text-center">
          <span className="text-4xl">🔍</span>
          <p className="font-medium text-text">
            No products found{query ? ` for “${query}”` : ""}
          </p>
          <p className="max-w-sm text-sm text-text-muted">
            Check the spelling, try a shorter word (like “rice” or “milk”), or
            browse by category above.
          </p>
          <Link
            href="/shop"
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            View all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        basePath="/shop"
        page={page}
        totalPages={totalPages}
        params={keep}
      />
    </main>
  );
}
