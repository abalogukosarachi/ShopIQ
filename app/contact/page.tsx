import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { ContactForm } from "@/components/layout/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact Us"
      intro="Have a question about an order or a product? Send us a message and our team will get back to you."
    >
      <ContactForm />
    </InfoPage>
  );
}
