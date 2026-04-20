/**
 * Lightweight flag icon — renders a static SVG from public/images/flags/.
 * Only 3 flags for the language switcher (es, gb, ru).
 */

const AVAILABLE_FLAGS = new Set(["es", "gb", "ru"]);

export function FlagIcon({
  code,
  className = "",
}: {
  /** ISO 3166-1 alpha-2 code, lowercase (e.g. "ru", "gb") */
  code: string;
  className?: string;
}) {
  const lc = code.toLowerCase();

  if (!AVAILABLE_FLAGS.has(lc)) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm bg-muted text-[9px] font-bold text-muted-foreground shrink-0 ${className}`}
        style={{ width: "1.25em", height: "1em" }}
      >
        {code.toUpperCase().slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={`/images/flags/${lc}.svg`}
      alt={`${code.toUpperCase()} flag`}
      className={`inline-block rounded-sm shrink-0 object-cover ${className}`}
      style={{ width: "1.25em", height: "1em" }}
      loading="lazy"
    />
  );
}
