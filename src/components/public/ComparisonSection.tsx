import {
  FileStack,
  Languages,
  Stamp,
  Building2,
  Clock,
  ShieldAlert,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/public/animations";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/react";

interface ComparisonRow {
  key: string;
  icon: LucideIcon;
}

const ROWS: readonly ComparisonRow[] = [
  { key: "docs", icon: FileStack },
  { key: "languages", icon: Languages },
  { key: "apostille", icon: Stamp },
  { key: "submission", icon: Building2 },
  { key: "timing", icon: Clock },
  { key: "rejection", icon: ShieldAlert },
] as const;

function ComparisonColumn({
  variant,
  translationPrefix,
}: {
  variant: "without" | "with";
  translationPrefix: string;
}) {
  const { t } = useTranslation();
  const isWith = variant === "with";
  const titleKey = isWith ? "compare_with_title" : "compare_without_title";
  const subtitleKey = isWith ? "compare_with_subtitle" : "compare_without_subtitle";
  const valueKeyPart = isWith ? "with" : "without";

  return (
    <Card
      className={cn(
        "relative h-full border rounded-2xl transition-colors duration-200",
        isWith
          ? "border-[var(--primary)] bg-white"
          : "border-[var(--hairline-soft)] bg-[var(--surface-card)]",
      )}
    >
      <CardContent className="relative p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div
            aria-hidden="true"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              isWith
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--secondary-bg)] text-[var(--ash)]",
            )}
          >
            {isWith ? (
              <Check className="h-5 w-5" strokeWidth={3} />
            ) : (
              <X className="h-5 w-5" strokeWidth={3} />
            )}
          </div>
          <div>
            <h3
              className={cn(
                "text-lg font-semibold leading-tight",
                isWith ? "text-foreground" : "text-slate-700",
              )}
            >
              {t(`${translationPrefix}.${titleKey}`)}
            </h3>
            <p
              className={cn(
                "text-xs mt-0.5",
                isWith ? "text-brand-secondary font-medium" : "text-slate-500",
              )}
            >
              {t(`${translationPrefix}.${subtitleKey}`)}
            </p>
          </div>
        </div>

        <ul className="space-y-4">
          {ROWS.map(({ key, icon: Icon }) => (
            <li key={key} className="flex items-start gap-3">
              <div
                aria-hidden="true"
                className={cn(
                  "shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg",
                  isWith
                    ? "bg-[var(--success-pale)] text-[var(--success-deep)]"
                    : "bg-[var(--surface-card)] text-[var(--ash)]",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-xs font-medium uppercase tracking-wide mb-0.5",
                    isWith ? "text-brand-secondary" : "text-slate-500",
                  )}
                >
                  {t(`${translationPrefix}.compare_row_${key}_label`)}
                </div>
                <div
                  className={cn(
                    "text-sm leading-snug",
                    isWith ? "text-foreground font-medium" : "text-slate-600",
                  )}
                >
                  {t(`${translationPrefix}.compare_row_${key}_${valueKeyPart}`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function ComparisonSection({ translationPrefix }: { translationPrefix: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
      <Reveal direction="up" className="order-2 lg:order-1 h-full">
        <ComparisonColumn variant="without" translationPrefix={translationPrefix} />
      </Reveal>
      <Reveal direction="up" delay={120} className="order-1 lg:order-2 h-full">
        <ComparisonColumn variant="with" translationPrefix={translationPrefix} />
      </Reveal>
    </div>
  );
}
