import { Zap } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { CountdownTimer } from "@/components/ui/CountdownTimer";

export function FlashDeals() {
  const dealProducts = PRODUCTS.filter((p) =>
    p.variants.some((v) => v.compareAtPrice)
  );

  if (dealProducts.length === 0) return null;

  return (
    <section className="bg-warning-light py-3xl">
      <div className="container-shopiq">
        <div className="mb-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={22} className="fill-warning text-warning" />
            <h2 className="font-heading text-2xl font-semibold text-text">
              Flash Deals
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-card">
            <span className="text-xs text-text-muted">Ends in</span>
            <CountdownTimer className="text-warning" />
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {dealProducts.map((product) => (
            <div key={product.id} className="w-48 shrink-0 sm:w-56">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
