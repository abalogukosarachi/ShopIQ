import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const HERO_TILES = [
  { src: "/hero/rice.jpg", alt: "Rice spilling from a sack" },
  { src: "/hero/milk.jpg", alt: "Fresh milk poured into a glass" },
  { src: "/hero/frozen.jpg", alt: "Assorted frozen foods" },
  { src: "/hero/tomato.jpg", alt: "Fresh red tomatoes" },
  { src: "/hero/juice.jpg", alt: "Glass of orange juice with fresh orange" },
  { src: "/hero/tissue.jpg", alt: "Box of facial tissue" },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-light to-white">
      <div className="container-shopiq grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-gold-light px-3 py-1 text-xs font-semibold text-gold">
            🚚 Fast delivery across Enugu &amp; beyond
          </span>
          <h1 className="font-heading text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            Everything You Need,{" "}
            <span className="text-primary">Delivered Fresh</span> to Your
            Doorstep
          </h1>
          <p className="max-w-md text-text-muted">
            Shop groceries, frozen foods, household essentials, beverages,
            baby products and more, all in one trusted marketplace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop">
              <Button size="lg">
                <ShoppingBag size={18} /> Shop Now
              </Button>
            </Link>
            <Link href="#categories">
              <Button size="lg" variant="secondary">
                Browse Categories <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Photo collage — images live in public/hero/ */}
        <div className="grid grid-cols-3 gap-3">
          {HERO_TILES.map((tile) => (
            <div
              key={tile.src}
              className="relative aspect-square overflow-hidden rounded-card bg-white shadow-card"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 15vw, 30vw"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
