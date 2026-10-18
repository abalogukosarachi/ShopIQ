export type ProductBadge =
  | "bestseller"
  | "new"
  | "hot-deal"
  | "organic"
  | "frozen"
  | "free-delivery";

export interface ProductVariant {
  id: string;
  /** e.g. "1kg", "Pack of 5", "50cl" */
  label: string;
  price: number;
  compareAtPrice?: number; // original price, if discounted
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  /** Top-level nav category slug, e.g. "food-groceries" */
  category: string;
  /** Finer grouping shown in breadcrumbs/filters, e.g. "Grains" */
  subcategory: string;
  description: string;
  /** Filename under /public/products/. Falls back to a placeholder if absent. */
  image?: string;
  /** Full gallery — if set, the product page shows all of these with thumbnails. */
  images?: string[];
  rating: number; // 0-5
  reviewCount: number;
  badges?: ProductBadge[];
  /** What the choices are called in the picker: "size" (default), "colour" or "type". */
  optionName?: string;
  variants: ProductVariant[];
  deliveryEstimate: string;
}

export interface Category {
  slug: string;
  label: string;
  icon: string; // emoji fallback, used if no image is set
  /** Filename under /public/categories/. If set, shown instead of the emoji icon. */
  image?: string;
  description: string;
}
