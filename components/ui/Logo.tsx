import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo/shopiq-logo.png";

interface LogoProps {
  className?: string;
  /** Height class for the logo image. Defaults to a size legible in the navbar. */
  imageClassName?: string;
  /**
   * Show "Smart Shopping. Better Living." as real, crisp text next to the
   * mark. The tagline is baked into the logo image too, but at navbar size
   * that text is too small to read — this renders it as actual HTML text
   * instead, which stays sharp at any size.
   */
  showTagline?: boolean;
}

/** ShopIQ's real logo, used everywhere the brand mark appears. */
export function Logo({
  className,
  imageClassName = "h-11",
  showTagline = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label="ShopIQ. Smart Shopping. Better Living."
    >
      <Image
        src={logo}
        alt="ShopIQ"
        priority
        className={`w-auto object-contain ${imageClassName}`}
      />
      {showTagline && (
        <span className="hidden text-sm font-medium leading-tight text-text-muted sm:block">
          Smart Shopping.
          <br />
          Better Living.
        </span>
      )}
    </Link>
  );
}
