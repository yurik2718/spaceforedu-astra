import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/public/animations";
import { FeatureIcon } from "@/components/public/shared";
import { useTranslation } from "@/lib/i18n/react";

interface FeatureItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const colClass: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureCardGrid({
  items,
  columns = 3,
}: {
  items: readonly FeatureItem[];
  columns?: 2 | 3 | 4;
}) {
  const { t } = useTranslation();

  return (
    <div className={cn("grid gap-6", colClass[columns])}>
      {items.map(({ icon, titleKey, descKey }, i) => (
        <Reveal key={titleKey} direction="up" delay={i * 100}>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-border hover:shadow-lg transition-shadow duration-300 h-full">
            <FeatureIcon icon={icon} className="mb-4" />
            <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
              {t(titleKey)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(descKey)}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
