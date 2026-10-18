import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Help Center" };

const LINK = "font-medium text-primary hover:underline";

export default function HelpPage() {
  return (
    <InfoPage
      title="Help Center"
      intro="Quick answers to the questions we hear most."
    >
      <Section heading="How do I place an order?">
        <p>
          Find a product, choose your size or type, tap Add to Cart, then open
          your cart and follow the checkout steps. You will see your total
          before you confirm.
        </p>
      </Section>
      <Section heading="How do I track my order?">
        <p>
          Sign in and open{" "}
          <Link href="/account/orders" className={LINK}>
            My Orders
          </Link>{" "}
          to see each stage of your delivery.
        </p>
      </Section>
      <Section heading="How long does delivery take?">
        <p>
          Standard delivery takes 2 to 3 business days and express delivery
          arrives the next day. See our{" "}
          <Link href="/help/delivery" className={LINK}>
            Delivery Info
          </Link>{" "}
          page for the details.
        </p>
      </Section>
      <Section heading="What if something is wrong with my order?">
        <p>
          Read our{" "}
          <Link href="/help/returns" className={LINK}>
            Returns
          </Link>{" "}
          page, or send us a message on the{" "}
          <Link href="/contact" className={LINK}>
            Contact page
          </Link>
          .
        </p>
      </Section>
      <Section heading="Which payment methods can I use?">
        <p>
          You can pay by debit or credit card, bank transfer, or cash on
          delivery.
        </p>
      </Section>
    </InfoPage>
  );
}
