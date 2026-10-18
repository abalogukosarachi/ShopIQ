import type { Metadata } from "next";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="By using ShopIQ you agree to the simple rules below."
      crumbs={[{ label: "Legal" }]}
    >
      <Section heading="Using the site">
        <p>
          Please give correct details when you create an account or place an
          order, and keep your sign in details private.
        </p>
      </Section>
      <Section heading="Products and prices">
        <p>
          We work hard to keep product descriptions, sizes and prices accurate.
          Prices and stock can change, and the price shown at checkout is the
          price you pay.
        </p>
      </Section>
      <Section heading="Orders and delivery">
        <p>
          An order is confirmed once you complete checkout. Delivery times are
          estimates and may change because of traffic, weather or stock.
        </p>
      </Section>
      <Section heading="Age restricted items">
        <p>
          Drinks that contain alcohol are for adults aged 18 and above only.
        </p>
      </Section>
      <Section heading="Changes to these terms">
        <p>
          We may update these terms from time to time. The latest version will
          always be on this page.
        </p>
      </Section>
    </InfoPage>
  );
}
