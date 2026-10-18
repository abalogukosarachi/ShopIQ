import { CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/product/CategoryCard";

export function Categories() {
  return (
    <section id="categories" className="container-shopiq py-3xl">
      <div className="mb-lg">
        <h2 className="font-heading text-2xl font-semibold text-text">
          Shop by Category
        </h2>
        <p className="text-sm text-text-muted">
          Everything organized, exactly like a real supermarket.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
