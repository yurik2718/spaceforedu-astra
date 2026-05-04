import {
  ShieldCheck,
  Shield,
  CreditCard,
  Check,
  Minus,
  Monitor,
  MessageCircle,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";
import { UniversityLogoBar } from "@/components/public/UniversityLogoBar";
import { FaqSection } from "@/components/public/FaqSection";
import { PinSectionHead } from "@/components/public/pin/PinSectionHead";
import { PinPricingPlan } from "@/components/public/pin/PinPricingPlan";
import { PinRiskReversal } from "@/components/public/pin/PinRiskReversal";
import { PinTestimonials } from "@/components/public/pin/PinTestimonials";
import { PinFinalCta } from "@/components/public/pin/PinFinalCta";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import { FEATURE_DASHBOARD } from "@/lib/constants";

const PREFIX = "public.precios";

type PlanKey = "basico" | "completo" | "premium";
const PLAN_KEYS: readonly PlanKey[] = ["basico", "completo", "premium"] as const;

interface Plan {
  key: PlanKey;
  features: number;
  highlighted: boolean;
}

const PLANS: readonly Plan[] = [
  { key: "basico", features: 4, highlighted: false },
  { key: "completo", features: 8, highlighted: true },
  { key: "premium", features: 8, highlighted: false },
];

const INCLUDED_ICONS: readonly LucideIcon[] = [
  Monitor,
  MessageCircle,
  BarChart3,
  ShieldCheck,
];

const COMPARISON_MATRIX: readonly (readonly [boolean, boolean, boolean])[] = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
] as const;

const HERO_STRIP_IMAGES = [
  {
    src: "/images/services/homologacion/salamanca-streets-university-garden.webp",
    alt: "Salamanca historic university quarter",
  },
  {
    src: "/images/services/espanol/students-spanish-class-focused.webp",
    alt: "Spanish class with native teacher",
  },
  {
    src: "/images/lifestyle/graduates-celebration-success.webp",
    alt: "International graduates celebrating",
  },
] as const;

const RISK_ITEMS = [
  { icon: Shield, n: 1 },
  { icon: ShieldCheck, n: 2 },
  { icon: CreditCard, n: 3 },
] as const;

export function PreciosPage({
  locale,
  messages,
}: {
  locale: Locale | string;
  messages: Messages;
}) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <PricingHero />
      <UniversityLogoBar titleKey="public.precios.trust_bar_title" noBorderTop />
      <HowItWorksSection />
      <PricingPlansSection />
      <PinTestimonials prefix={PREFIX} count={3} />
      {FEATURE_DASHBOARD && <IncludedFeaturesSection />}
      <ComparisonTableSection />
      <PinRiskReversal prefix={PREFIX} items={RISK_ITEMS} background="white" />
      <FaqBlock />
      <PinFinalCta
        prefix={PREFIX}
        bgImage="/images/lifestyle/spain-flag-waving-blue-sky.webp"
        sideItemCount={5}
      />
    </I18nProvider>
  );
}

function PricingHero() {
  const { t } = useTranslation();

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[var(--surface-soft)] pt-20 pb-12 sm:pt-24 sm:pb-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--hairline-soft)] px-4 py-1.5 text-[12px] font-semibold text-[var(--ink)] mb-6">
              <ShieldCheck
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--success-deep)] shrink-0"
              />
              <span>{t(`${PREFIX}.hero_guarantee_badge`)}</span>
            </span>
          </Reveal>
          <Reveal direction="up" delay={50}>
            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[64px] font-semibold tracking-[-0.022em] text-[var(--ink)] leading-[1.05] m-0">
              {t(`${PREFIX}.hero_title_1`)}{" "}
              <span className="text-[var(--primary)]">
                {t(`${PREFIX}.hero_title_accent`)}
              </span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <p className="mt-5 text-[18px] leading-[1.5] text-[var(--mute)] max-w-[560px] mx-auto">
              {t(`${PREFIX}.hero_subtitle`)}
            </p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <ConsultationDialog>
                <button className="pin-btn pin-btn-primary h-12 px-6 text-[15px]">
                  {t(`${PREFIX}.hero_action_verify`)}
                </button>
              </ConsultationDialog>
              <button
                type="button"
                onClick={scrollToPlans}
                className="text-[14px] font-medium text-[var(--mute)] hover:text-[var(--ink)] transition-colors min-h-[44px] inline-flex items-center"
              >
                <span className="border-b border-transparent hover:border-[var(--ink)] transition-colors">
                  {t(`${PREFIX}.hero_secondary_link`)}
                </span>
                <span aria-hidden="true" className="ml-1.5">
                  →
                </span>
              </button>
            </div>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {HERO_STRIP_IMAGES.map(({ src, alt }) => (
                <div
                  key={src}
                  className="rounded-2xl overflow-hidden bg-[var(--surface-card)] aspect-[4/3]"
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HowItWorksSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <PinSectionHead
          title1={t(`${PREFIX}.how_works_title`)}
          accent=""
          sub={t(`${PREFIX}.how_works_subtitle`)}
          align="center"
        />
        <div className="grid gap-12 sm:gap-10 sm:grid-cols-3 max-w-5xl mx-auto">
          {[1, 2, 3].map((n) => (
            <Reveal key={n} direction="up" delay={(n - 1) * 120}>
              <div className="text-center">
                <div
                  aria-hidden="true"
                  className="font-display text-[64px] sm:text-[72px] font-bold tracking-[-0.03em] text-[var(--hairline)] leading-none select-none"
                >
                  {String(n).padStart(2, "0")}
                </div>
                <div
                  aria-hidden="true"
                  className="mx-auto my-5 h-px w-10 bg-[var(--primary)]"
                />
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[var(--ink)] tracking-[-0.01em] mb-2">
                  {t(`${PREFIX}.hero_step_${n}_title`)}
                </h3>
                <p className="text-[14px] leading-[1.5] text-[var(--mute)] max-w-xs mx-auto">
                  {t(`${PREFIX}.hero_step_${n}_desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PricingPlansSection() {
  const { t } = useTranslation();
  return (
    <section
      id="plans"
      className="py-16 sm:py-20 bg-[var(--surface-soft)]"
    >
      <Container>
        <PinSectionHead
          title1={t(`${PREFIX}.pin_pricing_title_1`)}
          accent={t(`${PREFIX}.pin_pricing_title_accent`)}
          sub={t(`${PREFIX}.pin_pricing_sub`)}
          align="center"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const features = Array.from(
              { length: plan.features },
              (_, i) =>
                t(`${PREFIX}.plan_${plan.key}_feature_${i + 1}`),
            );
            const rawPrice = t(`${PREFIX}.plan_${plan.key}_price`);
            const cleanPrice = rawPrice.replace(/^€\s*/, "");
            return (
              <PinPricingPlan
                key={plan.key}
                title={t(`${PREFIX}.plan_${plan.key}_title`)}
                desc={t(`${PREFIX}.plan_${plan.key}_desc`)}
                price={cleanPrice}
                unit={t(`${PREFIX}.plan_${plan.key}_unit`)}
                features={features}
                cta={t(`${PREFIX}.choose_plan`)}
                ctaVariant={plan.highlighted ? "primary" : "secondary"}
                featured={plan.highlighted}
                popLabel={
                  plan.highlighted ? t(`${PREFIX}.popular`) : undefined
                }
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function IncludedFeaturesSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <PinSectionHead
          title1={t(`${PREFIX}.included_title`)}
          accent=""
          sub=""
          align="center"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {INCLUDED_ICONS.map((Icon, i) => (
            <Reveal key={i} direction="up" delay={i * 80}>
              <div className="text-center space-y-3">
                <div
                  aria-hidden="true"
                  className="mx-auto w-12 h-12 rounded-2xl bg-[var(--surface-card)] flex items-center justify-center"
                >
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-[14px] sm:text-[15px] text-[var(--ink)]">
                  {t(`${PREFIX}.included_${i + 1}_title`)}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[var(--mute)] leading-[1.5]">
                  {t(`${PREFIX}.included_${i + 1}_desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ComparisonTableSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <PinSectionHead
          title1={t(`${PREFIX}.compare_title`)}
          accent=""
          sub=""
          align="center"
        />
        <Reveal direction="up" delay={100}>
          <div className="max-w-5xl mx-auto bg-white rounded-[32px] border border-[var(--hairline-soft)] overflow-hidden">
            <ComparisonMobile />
            <ComparisonDesktop />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ComparisonMobile() {
  const { t } = useTranslation();
  const includedLabel = t(`${PREFIX}.compare_included`);
  const notIncludedLabel = t(`${PREFIX}.compare_not_included`);

  return (
    <div className="sm:hidden divide-y divide-[var(--hairline-soft)]">
      {COMPARISON_MATRIX.map((row, i) => (
        <div key={i} className="p-5">
          <div className="text-[14px] font-semibold text-[var(--ink)] leading-snug mb-3">
            {t(`${PREFIX}.compare_feature_${i + 1}`)}
          </div>
          <div className="flex flex-wrap gap-2">
            {PLAN_KEYS.map((planKey, j) => (
              <div
                key={planKey}
                className={`flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-full border ${
                  row[j]
                    ? "bg-[var(--success-pale)] text-[var(--success-deep)] border-[var(--success-pale)]"
                    : "bg-[var(--surface-card)] text-[var(--ash)] border-[var(--hairline-soft)]"
                }`}
                aria-label={`${t(`${PREFIX}.plan_${planKey}_title`)}: ${
                  row[j] ? includedLabel : notIncludedLabel
                }`}
              >
                {row[j] ? (
                  <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                ) : (
                  <Minus aria-hidden="true" className="h-3 w-3" />
                )}
                <span className="font-semibold">
                  {t(`${PREFIX}.plan_${planKey}_title`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComparisonDesktop() {
  const { t } = useTranslation();
  const includedLabel = t(`${PREFIX}.compare_included`);
  const notIncludedLabel = t(`${PREFIX}.compare_not_included`);

  return (
    <table className="hidden sm:table w-full">
      <thead>
        <tr className="bg-[var(--surface-card)]">
          <th className="text-left py-4 px-6 text-[13px] font-semibold text-[var(--mute)]">
            {t(`${PREFIX}.compare_feature`)}
          </th>
          {PLAN_KEYS.map((planKey) => (
            <th
              key={planKey}
              className={`py-4 px-6 text-center text-[14px] font-bold ${
                planKey === "completo"
                  ? "text-[var(--primary)]"
                  : "text-[var(--ink)]"
              }`}
            >
              {t(`${PREFIX}.plan_${planKey}_title`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {COMPARISON_MATRIX.map((row, i) => (
          <tr
            key={i}
            className="border-t border-[var(--hairline-soft)]"
          >
            <td className="py-4 px-6 text-[14px] text-[var(--ink)] font-medium">
              {t(`${PREFIX}.compare_feature_${i + 1}`)}
            </td>
            {row.map((included, j) => {
              const isCompleto = PLAN_KEYS[j] === "completo";
              const cellStyle = isCompleto
                ? { background: "rgba(232,69,60,0.04)" }
                : undefined;
              return (
                <td
                  key={j}
                  className="py-4 px-6 text-center"
                  style={cellStyle}
                >
                  {included ? (
                    <>
                      <span className="sr-only">{includedLabel}</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--success-pale)] text-[var(--success-deep)] mx-auto">
                        <Check
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          strokeWidth={3}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="sr-only">{notIncludedLabel}</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--surface-card)] text-[var(--ash)] mx-auto">
                        <Minus aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FaqBlock() {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <PinSectionHead
          title1={t(`${PREFIX}.pin_faq_title_1`)}
          accent={t(`${PREFIX}.pin_faq_title_accent`)}
          sub={t(`${PREFIX}.pin_faq_sub`)}
          align="center"
        />
        <FaqSection translationPrefix={PREFIX} count={7} />
      </Container>
    </section>
  );
}
