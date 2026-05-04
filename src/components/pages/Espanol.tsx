import {
  Users,
  User,
  Target,
  BookOpen,
  Briefcase,
  Award,
  TrendingUp,
  Home,
  Clock,
  Shield,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { CrossSellCard } from "@/components/public/CrossSellCard";
import { FaqSection } from "@/components/public/FaqSection";
import { TimelineSection } from "@/components/public/TimelineSection";
import { PinHeroCollage } from "@/components/public/pin/PinHeroCollage";
import { PinSectionHead } from "@/components/public/pin/PinSectionHead";
import { PinServicesCard } from "@/components/public/pin/PinServicesCard";
import { PinComparison } from "@/components/public/pin/PinComparison";
import { PinPricingTeaser } from "@/components/public/pin/PinPricingTeaser";
import { PinRiskReversal } from "@/components/public/pin/PinRiskReversal";
import { PinTestimonials } from "@/components/public/pin/PinTestimonials";
import { PinFinalCta } from "@/components/public/pin/PinFinalCta";
import { publicRoute, publicPages } from "@/lib/routes";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

const PREFIX = "public.espanol";

const FORMATS = [
  {
    icon: User,
    titleKey: `${PREFIX}.format_individual_title`,
    descKey: `${PREFIX}.format_individual_desc`,
    metaKey: `${PREFIX}.format_individual_meta`,
  },
  {
    icon: Users,
    titleKey: `${PREFIX}.format_group_title`,
    descKey: `${PREFIX}.format_group_desc`,
    metaKey: `${PREFIX}.format_group_meta`,
  },
  {
    icon: TrendingUp,
    titleKey: `${PREFIX}.format_intensive_title`,
    descKey: `${PREFIX}.format_intensive_desc`,
    metaKey: `${PREFIX}.format_intensive_meta`,
  },
] as const;

const LEVELS = [
  {
    level: "A1–A2",
    icon: BookOpen,
    key: "beginner",
    color: "bg-[var(--success-deep)]",
  },
  {
    level: "B1–B2",
    icon: Briefcase,
    key: "intermediate",
    color: "bg-[var(--accent-blue)]",
  },
  {
    level: "C1–C2",
    icon: Award,
    key: "advanced",
    color: "bg-[var(--primary)]",
  },
] as const;

const RISK_ITEMS = [
  { icon: Shield, n: 1 },
  { icon: ShieldCheck, n: 2 },
  { icon: CreditCard, n: 3 },
] as const;

export function EspanolPage({
  locale,
  messages,
}: {
  locale: Locale | string;
  messages: Messages;
}) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <PageBody locale={locale} />
    </I18nProvider>
  );
}

function PageBody({ locale }: { locale: Locale | string }) {
  const { t } = useTranslation();
  const preciosHref = publicRoute(publicPages.precios, locale);

  return (
    <>
      <PinHeroCollage
        prefix={PREFIX}
        secondaryHref={preciosHref}
        main={{
          src: "/images/services/espanol/students-spanish-class-focused.webp",
          alt: t(`${PREFIX}.hero_img_alt`),
        }}
        sideRight={{
          src: "/images/lifestyle/sevilla-plaza-espana-golden-hour.webp",
          alt: "Plaza de España, Seville at golden hour",
        }}
        sideLeft={{
          src: "/images/lifestyle/spain-flag-sky.webp",
          alt: "Spanish flag waving against a clear blue sky",
        }}
        pills={[
          { kind: "dot", labelKey: "pin_hero_pill_1" },
          { kind: "icon", icon: Clock, labelKey: "pin_hero_pill_2" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <PinSectionHead
            title1={t(`${PREFIX}.pin_formats_title_1`)}
            accent={t(`${PREFIX}.pin_formats_title_accent`)}
            sub={t(`${PREFIX}.pin_formats_sub`)}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {FORMATS.map((item, i) => (
              <PinServicesCard key={item.titleKey} item={item} delay={i * 80} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
        <Container>
          <PinSectionHead
            title1={t(`${PREFIX}.pin_journey_title_1`)}
            accent={t(`${PREFIX}.pin_journey_title_accent`)}
            sub={t(`${PREFIX}.pin_journey_sub`)}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {LEVELS.map(({ level, icon: Icon, key, color }, i) => (
              <Reveal key={key} direction="up" delay={i * 80}>
                <div className="h-full bg-white rounded-[32px] border border-[var(--hairline-soft)] overflow-hidden flex flex-col">
                  <div className={`${color} px-7 py-5 text-white flex items-center justify-between`}>
                    <span className="font-display text-[26px] font-bold tracking-[-0.025em]">
                      {level}
                    </span>
                    <Icon aria-hidden="true" className="h-5 w-5 opacity-90" />
                  </div>
                  <div className={`${color} px-7 pb-5 -mt-1 text-white`}>
                    <p className="text-[14px] font-medium opacity-95 m-0">
                      {t(`${PREFIX}.journey_${key}_label`)}
                    </p>
                  </div>
                  <div className="p-7 flex flex-col gap-3 flex-1">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <Target
                          aria-hidden="true"
                          className="h-4 w-4 text-[var(--primary)] mt-0.5 shrink-0"
                        />
                        <span className="text-[14px] leading-[1.45] text-[var(--body-color)]">
                          {t(`${PREFIX}.journey_${key}_${j}`)}
                        </span>
                      </div>
                    ))}
                    <p className="text-[12px] font-bold text-[var(--ink)] pt-3 mt-auto border-t border-[var(--hairline-soft)] m-0">
                      {t(`${PREFIX}.journey_${key}_time`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PinComparison prefix={PREFIX} rowCount={5} background="white" />

      <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
        <Container>
          <PinSectionHead
            title1={t(`${PREFIX}.pin_steps_title_1`)}
            accent={t(`${PREFIX}.pin_steps_title_accent`)}
            sub={t(`${PREFIX}.pin_steps_sub`)}
          />
          <TimelineSection
            translationPrefix={PREFIX}
            count={4}
            keyPattern="step"
          />
        </Container>
      </section>

      <PinPricingTeaser prefix={PREFIX} background="white" />

      <PinTestimonials prefix={PREFIX} count={3} />

      <PinRiskReversal prefix={PREFIX} items={RISK_ITEMS} background="white" />

      <CrossSellCard
        title={t(`${PREFIX}.crosssell_title`)}
        description={t(`${PREFIX}.crosssell_desc`)}
        links={[
          {
            label: t(`${PREFIX}.crosssell_homologacion`),
            href: publicRoute(publicPages.homologacion, locale),
          },
          {
            label: t(`${PREFIX}.crosssell_universidad`),
            href: publicRoute(publicPages.universidad, locale),
          },
        ]}
        badgeLabel={t(`${PREFIX}.crosssell_badge`)}
        badgeIcon={Home}
      />

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <PinSectionHead
            title1={t(`${PREFIX}.pin_faq_title_1`)}
            accent={t(`${PREFIX}.pin_faq_title_accent`)}
            sub={t(`${PREFIX}.pin_faq_sub`)}
            align="center"
          />
          <FaqSection translationPrefix={PREFIX} count={5} />
        </Container>
      </section>

      <PinFinalCta
        prefix={PREFIX}
        bgImage="/images/lifestyle/sevilla-plaza-espana-golden-hour.webp"
        sideItemCount={5}
      />
    </>
  );
}
