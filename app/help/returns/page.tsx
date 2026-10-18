import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Returns"
      intro="If something is not right with your order, we want to make it right."
      crumbs={[{ label: "Help Center", href: "/help" }]}
    >
      <Section heading="When you can return an item">
        <p>
          You can ask for a return or a replacement if an item arrives damaged,
          expired, spoiled or different from what you ordered.
        </p>
      </Section>
      <Section heading="How to ask for a return">
        <p>
          Tell us within 24 hours of delivery. Include your order number and a
          short description of the problem, and a photo if you can. You can
          reach us on the{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact page
          </Link>
          .
        </p>
      </Section>
      <Section heading="Items we cannot take back">
        <p>
          For hygiene and safety, we cannot take back opened personal care
          items, opened baby products, or frozen and fresh items that were
          stored badly after delivery.
        </p>
      </Section>
      <Section heading="Refunds">
        <p>
          Once your return is approved, we will either replace the item or
          refund you using the same method you paid with.
        </p>
      </Section>
    </InfoPage>
  );
}
