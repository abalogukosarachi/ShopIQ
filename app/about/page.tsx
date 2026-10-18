import type { Metadata } from "next";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "About ShopIQ" };

export default function AboutPage() {
  return (
    <InfoPage
      title="About ShopIQ"
      intro="ShopIQ is a Nigerian online supermarket built to make everyday shopping simple."
    >
      <Section heading="Who we are">
        <p>
          ShopIQ brings groceries, fresh produce, frozen foods, drinks,
          household essentials, baby products, beauty and kitchen items
          together in one place, so you can fill your basket without going
          from shop to shop.
        </p>
      </Section>
      <Section heading="What we care about">
        <p>
          We care about clear product names, honest descriptions and sizes you
          can trust. Every product page shows the brand, the pack size and the
          price before you add anything to your cart.
        </p>
      </Section>
      <Section heading="Shop smart, live better">
        <p>
          Browse by category, search for a brand, choose your size or type, and
          pick the delivery speed that suits you. We are always adding more
          products, so check back often.
        </p>
      </Section>
    </InfoPage>
  );
}
