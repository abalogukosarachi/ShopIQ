import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const FOOTER_LINKS = {
  Company: [
    { label: "About ShopIQ", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Help: [
    { label: "Help Center", href: "/help" },
    { label: "Returns", href: "/help/returns" },
    { label: "Delivery Info", href: "/help/delivery" },
    { label: "Track Order", href: "/account/orders" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-shopiq flex flex-col gap-3xl py-3xl">
        {/* Newsletter */}
        <div className="flex flex-col items-start justify-between gap-lg rounded-card bg-primary-light p-xl lg:flex-row lg:items-center">
          <div>
            <h3 className="font-heading text-lg font-semibold text-text">
              Stay updated with ShopIQ
            </h3>
            <p className="text-sm text-text-muted">
              Weekly deals, exclusive discounts, and new arrivals, straight
              to your inbox.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2 lg:w-auto">
            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-white"
              aria-label="Email address"
            />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-xl sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo imageClassName="h-14" showTagline />
            <div className="mt-4 flex gap-3 text-text-muted">
              <Link href="#" aria-label="Facebook" className="hover:text-primary">
                <Facebook size={18} />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-primary">
                <Instagram size={18} />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="mb-3 text-sm font-semibold text-text">
                {heading}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-lg text-xs text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} ShopIQ. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{" "}
            <span className="font-medium text-text">Favour.Dev</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
