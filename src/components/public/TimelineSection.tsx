import { Reveal } from "@/components/public/animations";
import { useTranslation } from "@/lib/i18n/react";

interface TimelineSectionProps {
  translationPrefix: string;
  count: number;
  keyPattern?: string;
}

export function TimelineSection({
  translationPrefix,
  count,
  keyPattern = "process",
}: TimelineSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto">
      {Array.from({ length: count }, (_, i) => {
        const isLast = i === count - 1;
        return (
          <Reveal key={i} direction="left" delay={i * 120}>
            <div className="flex gap-5 sm:gap-8 items-stretch">
              <div className="flex flex-col items-center shrink-0 w-12 sm:w-14">
                <div
                  aria-hidden="true"
                  className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-none text-[var(--primary)] select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {!isLast && (
                  <div
                    className="mt-3 w-px flex-1 bg-[var(--hairline)]"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className={`flex-1 ${isLast ? "" : "pb-10 sm:pb-12"}`}>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  {t(`${translationPrefix}.${keyPattern}_${i + 1}_title`)}
                </h3>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed mt-1.5">
                  {t(`${translationPrefix}.${keyPattern}_${i + 1}_desc`)}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
