# ShopIQ

Shop Smart. Live Better. — A premium online grocery marketplace built with Next.js, TypeScript, and Tailwind CSS.

## Setup (in VS Code)

1. Unzip this project and open the folder in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 — you'll see the Sprint 1 component preview page.

## Status: Sprint 3 — Real Homepage ✅ COMPLETE

Homepage is now the real designed page, not a component demo:
- [x] `Hero` — headline, subheading, Shop Now / Browse Categories buttons, product collage
- [x] `Categories` — Shop by Category grid, live product counts per category, links to `/shop/[category]`
- [x] `FlashDeals` — horizontal scroll of discounted products with a live countdown timer
- [x] `BestSellers` — grid of badged best-seller products
- [x] `CategoryCard`, `CountdownTimer` — new reusable components

## Fixes applied
- [x] Removed em dash from hero subheading and page description
- [x] Removed "Fresh Produce" category entirely
- [x] Logo enlarged (56px in navbar) with "Smart Shopping. Better Living." rendered as real, crisp text

## Status: Sprint 4 — Category page + Product Details page ✅ COMPLETE
- [x] `/shop/[category]` — category banner, breadcrumb, product grid, empty state for categories with no products yet
- [x] `/product/[slug]` — full image area, size selector (pill buttons, updates price/stock live), quantity stepper, wishlist, Add to Cart + Buy Now, delivery badge, description, Related Products
- [x] `Breadcrumb` — new reusable component
- [x] Category cards and product cards across the site now link to real, working pages

## Real product photos added
7 of your photos matched existing catalog items and are now live: Mama Gold Rice, Mama's Pride Rice, Big Bull Rice, Golden Penny Spaghetti, Golden Penny Macaroni, Peak Milk, and Indomie Chicken Noodles (which now has a real 2-image gallery — the product page shows thumbnails to switch between them).

2 more of your photos didn't match anything in the catalog yet, so I added them as new products: **Golden Penny Instant Noodles (Chicken)** and **Indomie Hungry Man Size**. Catalog is now 27 products.

`types/product.ts` now supports an optional `images: string[]` array for a real multi-photo gallery with thumbnails on the product page — used automatically when a product has more than one photo.

## Status: Sprint 5 — Real Cart & Wishlist ✅ COMPLETE
- [x] `CartContext` / `WishlistContext` — shared state via React Context, persisted to `localStorage` so it survives a page refresh
- [x] `AppProviders` wraps the whole app in `app/layout.tsx`
- [x] Navbar cart/wishlist icons now show **real, live counts**
- [x] `ProductCard` and `ProductDetailView` both read/write the same shared cart and wishlist — add an item on any product page, see it everywhere instantly
- [x] `/cart` — real cart page: quantity controls, remove, order summary, empty state
- [x] `/wishlist` — real wishlist page using the same `ProductCard`, empty state

Note: the "Proceed to Checkout" button links to `/checkout`, which doesn't exist yet — that's next.

## Status: Sprint 6 — Checkout Flow ✅ COMPLETE
- [x] `/checkout` — 5-step flow: Customer Info → Delivery Address → Delivery Method → Payment Method → Review Order
- [x] `CheckoutStepper` — progress indicator across the top
- [x] `RadioCard` — reusable selectable card for delivery/payment options
- [x] Order Summary sidebar updates live as delivery method changes
- [x] Success screen with generated order number, estimated delivery, Track Order / Continue Shopping — clears the cart on completion
- [x] Empty-cart guard redirects to a friendly message instead of a blank form

**Payment is UI-only right now** — selecting a method doesn't charge anything. Real payment processing (Stripe/Paystack) needs a backend, which is Sprint 8.

## Status: Sprint 7 — Auth + User Dashboard ✅ COMPLETE
- [x] `AuthContext` — demo sign up/sign in/sign out (⚠️ localStorage only, not real security — flagged in code comments)
- [x] `OrdersContext` — orders placed at checkout are now actually saved and tied to the signed-in user's email
- [x] `AddressBookContext` — saved addresses, add/remove
- [x] `/account` — Sign In/Sign Up forms when logged out; full dashboard (greeting, quick links, recent orders) when logged in
- [x] `/account/orders` — real order history with an expandable visual status tracker (Preparing → Packed → Out for Delivery → Delivered)
- [x] `/account/addresses` — add/view/remove saved addresses
- [x] `/account/settings` — profile view + sign out
- [x] Checkout now prefills name/email from a logged-in user and actually saves the order

**Try it:** sign up on `/account`, add items to your cart, complete checkout, then visit `/account/orders` — your order is really there.

Next: **Sprint 8 — Backend** (Prisma + PostgreSQL, real password hashing via NextAuth.js, and the Admin Dashboard for managing products/orders/customers). This is the point where ShopIQ stops being frontend-only.

Done so far (Sprint 1 + 2):
- [x] Project scaffold, design tokens, fonts
- [x] `Button`, `Badge`, `Input`, `SearchBar`, `Logo` (real logo)
- [x] `AnnouncementBar`, `Navbar`, `Footer` — live on every page
- [x] `types/product.ts` — Product, ProductVariant, Category types
- [x] `data/categories.ts` — all 10 ShopIQ categories
- [x] `data/products.ts` — 10 real products (Mama Gold Rice, Cap Rice, Royal Stallion, Indomie, Golden Penny Spaghetti, Coca-Cola, Peak Milk, Gino Tomato Paste, Frozen Whole Chicken, Ariel), each with real brand, multiple sizes/variants, individual pricing & stock
- [x] `RatingStars` — reusable ⭐ display
- [x] `ProductImagePlaceholder` — consistent placeholder until real photos are added
- [x] `ProductCard` — the universal card: image, badges, wishlist heart, size selector, live price, stock status, Add to Cart with "✔ Added" confirmation
- [x] Homepage now renders Best Sellers + Full Catalog using real data

**To add a real product photo:** drop the file into `public/products/` (e.g. `public/products/mama-gold-rice.jpg`) and set `image: "/products/mama-gold-rice.jpg"` on that product in `data/products.ts`. The card picks it up automatically — no component changes needed.

Next: **Sprint 3 — Hero banner, Shop by Category, and Flash Deals sections**, replacing this temporary homepage with the real one.

## Design tokens reference

| Token | Value |
|---|---|
| Primary (Royal Blue) | `#1E40AF` |
| Gold | `#F59E0B` |
| Success (Green) | `#16A34A` |
| Warning (Orange) | `#F97316` |
| Danger (Red) | `#DC2626` |
| Background | `#FAFAFA` |
| Text | `#1F2937` |
| Card radius | `16px` |
| Button/Input radius | `12px` |

All components pull from these tokens via Tailwind — never hardcode a hex value in a component.

## Folder structure

```
app/                  Next.js App Router pages
components/ui/        Base design-system components (Button, Input, Badge...)
components/layout/    Navbar, Footer, AnnouncementBar
components/home/      Hero, Categories, FlashDeals, BestSellers, Newsletter
components/product/   ProductCard, ProductGallery, ProductInfo, ProductReviews
data/                 Product/category/brand seed data
lib/                  Shared utilities (cn, formatPrice)
```
