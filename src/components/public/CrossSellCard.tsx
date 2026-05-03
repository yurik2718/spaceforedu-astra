import { Rocket, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/public/animations";
import { FeatureIcon, PublicSection } from "@/components/public/shared";

export interface CrossSellLink {
  label: string;
  href: string;
}

export function CrossSellCard({
  title,
  description,
  links,
  badgeLabel,
  badgeIcon: BadgeIcon,
}: {
  title: string;
  description: string;
  links: CrossSellLink[];
  badgeLabel: string;
  badgeIcon: LucideIcon;
}) {
  return (
    <PublicSection className="bg-[var(--surface-soft)]">
      <Reveal direction="up">
        <Card className="max-w-4xl mx-auto border bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="grid sm:grid-cols-[1fr,auto] items-center">
              <div className="p-8 sm:p-10">
                <FeatureIcon
                  icon={Rocket}
                  size="md"
                  hoverScale={false}
                  className="mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-lg">
                  {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {links.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      className="text-sm font-medium text-brand-secondary hover:underline"
                    >
                      {label} &rarr;
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex bg-[var(--surface-card)] items-center justify-center p-10 self-stretch">
                <div className="text-center space-y-2">
                  <BadgeIcon
                    aria-hidden="true"
                    className="h-10 w-10 text-[var(--ash)] mx-auto"
                  />
                  <p className="text-xs text-muted-foreground font-medium max-w-[140px]">
                    {badgeLabel}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </PublicSection>
  );
}
