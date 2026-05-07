import { type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { useTranslation } from "@/lib/i18n/react";

export interface PinRiskItem {
  icon: LucideIcon;
  n: number;
}

export function PinRiskReversal({
  prefix,
  items,
  background = "soft",
}: {
  prefix: string;
  items: readonly PinRiskItem[];
  background?: "soft" | "white";
}) {
  const { t } = useTranslation();
  const sectionBg =
    background === "white" ? "bg-white" : "bg-[var(--surface-soft)]";

  return (
    <section className={`py-12 sm:py-16 ${sectionBg}`}>
      <Container>
        <Reveal direction="up">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[var(--hairline-soft)] grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <h3 className="font-display text-[28px] sm:text-[36px] font-bold tracking-[-0.025em] leading-[1.1] text-[var(--ink)] m-0">
              {t(`${prefix}.pin_risk_title_1`)}{" "}
              <span className="text-[var(--primary)]">
                {t(`${prefix}.pin_risk_title_accent`)}
              </span>
            </h3>
            <div className="flex flex-col gap-3.5">
              {items.map(({ icon: Icon, n }) => (
                <div key={n} className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-2xl bg-[var(--success-pale)] text-[var(--success-deep)] flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[var(--ink)] m-0 mb-1">
                      {t(`${prefix}.pin_risk_item_${n}_title`)}
                    </h4>
                    <p className="text-[14px] leading-[1.45] text-[var(--mute)] m-0">
                      {t(`${prefix}.pin_risk_item_${n}_desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
