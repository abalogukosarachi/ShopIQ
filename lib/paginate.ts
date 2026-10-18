export const PAGE_SIZE = 24;

/** Returns one page of items plus the numbers needed to draw page links. */
export function paginate<T>(items: T[], pageParam: string | undefined) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const requested = Number.parseInt(pageParam ?? "1", 10);
  const page = Number.isFinite(requested)
    ? Math.min(Math.max(requested, 1), totalPages)
    : 1;
  const start = (page - 1) * PAGE_SIZE;
  return {
    pageItems: items.slice(start, start + PAGE_SIZE),
    page,
    totalPages,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + PAGE_SIZE, items.length),
    total: items.length,
  };
}
