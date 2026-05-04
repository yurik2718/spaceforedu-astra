import { Container } from "@/components/public/shared";
import { PinSectionHead } from "@/components/public/pin/PinSectionHead";
import { PinPricingPlan } from "@/components/public/pin/PinPricingPlan";
import { useTranslation } from "@/lib/i18n/react";

export function PinPricingTeaser({
  prefix,
  background = "soft",
}: {
  prefix: string;
  background?: "soft" | "white";
}) {
  const { t } = useTranslation();
  const sectionBg =
    background === "white" ? "bg-white" : "bg-[var(--surface-soft)]";

  return (
    <section className={`py-16 sm:py-20 ${sectionBg}`}>
      <Container>
        <PinSectionHead
          title1={t(`${prefix}.pin_pricing_title_1`)}
          accent={t(`${prefix}.pin_pricing_title_accent`)}
          sub={t(`${prefix}.pin_pricing_sub`)}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <PinPricingPlan
            title={t(`${prefix}.pin_plan_review_title`)}
            desc={t(`${prefix}.pin_plan_review_desc`)}
            price={t(`${prefix}.pin_plan_review_price`)}
            unit={t(`${prefix}.pin_plan_review_unit`)}
            features={[1, 2, 3].map((n) =>
              t(`${prefix}.pin_plan_review_feat_${n}`),
            )}
            cta={t(`${prefix}.pin_plan_review_cta`)}
            ctaVariant="secondary"
          />
          <PinPricingPlan
            title={t(`${prefix}.pin_plan_full_title`)}
            desc={t(`${prefix}.pin_plan_full_desc`)}
            price={t(`${prefix}.pin_plan_full_price`)}
            unit={t(`${prefix}.pin_plan_full_unit`)}
            features={[1, 2, 3, 4, 5].map((n) =>
              t(`${prefix}.pin_plan_full_feat_${n}`),
            )}
            cta={t(`${prefix}.pin_plan_full_cta`)}
            ctaVariant="primary"
            featured
            popLabel={t(`${prefix}.pin_plan_full_pop`)}
          />
          <PinPricingPlan
            title={t(`${prefix}.pin_plan_path_title`)}
            desc={t(`${prefix}.pin_plan_path_desc`)}
            price={t(`${prefix}.pin_plan_path_price`)}
            unit={t(`${prefix}.pin_plan_path_unit`)}
            features={[1, 2, 3, 4, 5].map((n) =>
              t(`${prefix}.pin_plan_path_feat_${n}`),
            )}
            cta={t(`${prefix}.pin_plan_path_cta`)}
            ctaVariant="secondary"
          />
        </div>
      </Container>
    </section>
  );
}
