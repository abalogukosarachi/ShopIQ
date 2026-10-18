import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/product";
import { getProductsByCategory } from "@/data/products";

interface CategoryCardProps {
  category: Category;
}

/** One category card: image (or emoji fallback), name, and live product count. */
export function CategoryCard({ category }: CategoryCardProps) {
  const count = getProductsByCategory(category.slug).length;

  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group flex flex-col items-center gap-2 rounded-card border border-border bg-white p-4 text-center shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-background">
        {category.image ? (
          <Image
            src={`/categories/${category.image}`}
            alt={category.label}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-3xl">
            {category.icon}
          </span>
        )}
      </div>
      <span className="text-sm font-medium text-text group-hover:text-primary">
        {category.label}
      </span>
      <span className="text-xs text-text-muted">{count} Products</span>
    </Link>
  );
}
