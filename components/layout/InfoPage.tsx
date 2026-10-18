import { ReactNode } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface InfoPageProps {
  title: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
  children: ReactNode;
}

/** Simple shared layout for the footer pages (About, Help, Legal and so on). */
export function InfoPage({ title, intro, crumbs = [], children }: InfoPageProps) {
  return (
    <main className="container-shopiq py-3xl">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, ...crumbs, { label: title }]}
      />
      <div className="mx-auto mt-lg max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-text">
          {title}
        </h1>
        {intro && <p className="mt-2 text-base text-text-muted">{intro}</p>}
        <div className="mt-xl flex flex-col gap-lg text-sm leading-relaxed text-text">
          {children}
        </div>
      </div>
    </main>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-heading text-lg font-semibold text-text">
        {heading}
      </h2>
      <div className="flex flex-col gap-2 text-text-muted">{children}</div>
    </section>
  );
}
