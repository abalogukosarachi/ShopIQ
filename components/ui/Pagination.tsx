import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  basePath: string;
  page: number;
  totalPages: number;
  /** Other query values to keep in the links, such as q or filter. */
  params?: Record<string, string>;
}

function hrefFor(basePath: string, params: Record<string, string>, page: number) {
  const qs = new URLSearchParams(params);
  if (page > 1) qs.set("page", String(page));
  const text = qs.toString();
  return text ? `${basePath}?${text}` : basePath;
}

/** Simple numbered page links so long product lists load fast. */
export function Pagination({ basePath, page, totalPages, params = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1
  );

  const linkClass =
    "flex h-9 min-w-9 items-center justify-center rounded-button border border-border bg-white px-3 text-sm text-text hover:border-primary hover:bg-primary-light";

  return (
    <nav aria-label="Pagination" className="mt-xl flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(basePath, params, page - 1)} className={linkClass}>
          Previous
        </Link>
      )}
      {pages.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - pages[i - 1] > 1 && (
            <span className="text-text-muted">...</span>
          )}
          <Link
            href={hrefFor(basePath, params, n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              linkClass,
              n === page && "border-primary bg-primary text-white hover:bg-primary hover:text-white"
            )}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < totalPages && (
        <Link href={hrefFor(basePath, params, page + 1)} className={linkClass}>
          Next
        </Link>
      )}
    </nav>
  );
}
