import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, Section } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Careers at ShopIQ" };

export default function CareersPage() {
  return (
    <InfoPage
      title="Careers"
      intro="Join the team that is making grocery shopping easier for Nigerian families."
    >
      <Section heading="Open roles">
        <p>
          We do not have any open roles right now, but we are growing and new
          positions will be listed here as soon as they are ready.
        </p>
      </Section>
      <Section heading="Stay in touch">
        <p>
          If you would like to work with us in the future, send us a short note
          on our{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact page
          </Link>{" "}
          and tell us what you do best.
        </p>
      </Section>
    </InfoPage>
  );
}
