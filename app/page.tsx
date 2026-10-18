import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FlashDeals } from "@/components/home/FlashDeals";
import { BestSellers } from "@/components/home/BestSellers";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FlashDeals />
      <BestSellers />
    </main>
  );
}
