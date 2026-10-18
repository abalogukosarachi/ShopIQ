import Image from "next/image";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Pagination } from "@/components/ui/Pagination";
import { paginate } from "@/lib/paginate";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { category: categorySlug } = await params;
  const query = await searchParams;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const pageParam = Array.isArray(query.page) ? query.page[0] : query.page;
  const { pageItems, page, totalPages } = paginate(products, pageParam);

  return (
    <main className="container-shopiq py-3xl">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: category.label }]}
      />

      {/* Category banner */}
      <div className="my-lg flex items-center gap-4 rounded-card bg-primary-light p-6">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-card bg-white sm:h-24 sm:w-24">
          {category.image ? (
            <Image
              src={`/categories/${category.image}`}
              alt={category.label}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-4xl">
              {category.icon}
            </span>
          )}
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-text">
            {category.label}
          </h1>
          <p className="text-sm text-text-muted">{category.description}</p>
          <p className="mt-1 text-xs text-text-muted">
            {products.length} products
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-3xl text-center">
          <span className="text-4xl">🛒</span>
          <p className="font-medium text-text">No products here yet</p>
          <p className="text-sm text-text-muted">
            We&apos;re adding {category.label.toLowerCase()} soon, check
            back shortly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        basePath={`/shop/${category.slug}`}
        page={page}
        totalPages={totalPages}
      />
    </main>
  );
}
