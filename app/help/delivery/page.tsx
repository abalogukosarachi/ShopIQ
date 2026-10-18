import type { Metadata } from "next";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Delivery Info" };

export default function DeliveryPage() {
  return (
    <InfoPage
      title="Delivery Info"
      intro="Choose the delivery speed that works for you at checkout."
      crumbs={[{ label: "Help Center", href: "/help" }]}
    >
      <Section heading="Delivery options">
        <p>
          <span className="font-medium text-text">Standard Delivery:</span> 2
          to 3 business days, ₦2,000.
        </p>
        <p>
          <span className="font-medium text-text">Express Delivery:</span>{" "}
          tomorrow, ₦4,500.
        </p>
      </Section>
      <Section heading="Free delivery">
        <p>
          Free delivery is available on qualifying orders. Look out for the
          Free Delivery badge on products.
        </p>
      </Section>
      <Section heading="Delivery address">
        <p>
          Enter your street, city and state at checkout. You can also add
          delivery notes to help our rider find you.
        </p>
      </Section>
      <Section heading="Payment on delivery">
        <p>
          Cash on delivery is available. Please keep the exact amount ready
          when your order arrives.
        </p>
      </Section>
    </InfoPage>
  );
}
