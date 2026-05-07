import { Reveal } from "@/components/public/animations";

export function PinSectionHead({
  title1,
  accent,
  sub,
  align = "split",
}: {
  title1: string;
  accent: string;
  sub: string;
  align?: "split" | "center";
}) {
  if (align === "center") {
    return (
      <Reveal direction="up">
        <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <h2 className="font-display text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] text-[var(--ink)] leading-[1.1] m-0">
            {title1} <span className="text-[var(--primary)]">{accent}</span>
          </h2>
          <p className="mt-4 text-[15px] text-[var(--mute)] leading-[1.5]">{sub}</p>
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal direction="up">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-6 mb-9">
        <h2 className="font-display text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] text-[var(--ink)] leading-[1.1] m-0 max-w-[640px]">
          {title1} <span className="text-[var(--primary)]">{accent}</span>
        </h2>
        <p className="text-[15px] text-[var(--mute)] leading-[1.5] max-w-[360px] sm:text-right">
          {sub}
        </p>
      </div>
    </Reveal>
  );
}
