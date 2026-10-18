import Link from "next/link";
import { getBestSellers } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export function BestSellers() {
  const bestSellers = getBestSellers();

  return (
    <section className="container-shopiq py-3xl">
      <div className="mb-lg flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-text">
            Best Sellers
          </h2>
          <p className="text-sm text-text-muted">
            Products customers buy most
          </p>
        </div>
        <Link href="/shop?filter=bestsellers">
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
