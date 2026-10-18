import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getProductsByCategory } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="container-shopiq flex flex-col gap-3xl py-3xl">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          ...(category
            ? [{ label: category.label, href: `/shop/${category.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <ProductDetailView product={product} />

      {related.length > 0 && (
        <section className="flex flex-col gap-lg">
          <h2 className="font-heading text-xl font-semibold text-text">
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
