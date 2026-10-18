import type { Metadata } from "next";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="This page explains what information ShopIQ collects and how it is used."
      crumbs={[{ label: "Legal" }]}
    >
      <Section heading="Information we collect">
        <p>
          When you create an account, place an order or contact us, we collect
          details such as your name, email address and delivery address.
        </p>
      </Section>
      <Section heading="How we use it">
        <p>
          We use your details to process and deliver your orders, to answer your
          questions, and to send updates you have asked for.
        </p>
      </Section>
      <Section heading="Sharing your information">
        <p>
          We only share what is needed to deliver your order, for example with
          our delivery partners. We do not sell your personal information.
        </p>
      </Section>
      <Section heading="Your choices">
        <p>
          You can update your details in your account settings, and you can ask
          us to remove your information at any time through the Contact page.
        </p>
      </Section>
    </InfoPage>
  );
}
