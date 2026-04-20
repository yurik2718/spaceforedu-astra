import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, TiltCard } from "@/components/public/animations";
import { FeatureIcon } from "@/components/public/shared";
import { useTranslation } from "@/lib/i18n/react";

interface FeatureCardItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid gap-6 sm:grid-cols-2",
  3: "grid gap-6 sm:grid-cols-3",
  4: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureCardGrid({
  items,
  columns = 4,
}: {
  items: readonly FeatureCardItem[];
  columns?: 2 | 3 | 4;
}) {
  const { t } = useTranslation();

  return (
    <div className={columnClasses[columns]}>
      {items.map(({ icon, titleKey, descKey }, i) => (
        <Reveal key={titleKey} direction="up" delay={i * 120} className="h-full">
          <TiltCard className="h-full">
            <Card className="h-full border bg-white transition-all duration-300 hover:shadow-xl hover:shadow-brand-secondary/5 group">
              <CardContent className="h-full p-6 text-center flex flex-col items-center">
                <FeatureIcon icon={icon} className="mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(descKey)}</p>
              </CardContent>
            </Card>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
