import {
  FileCheck,
  CheckCircle2,
  Clock,
  FileText,
  Building2,
  Scale,
  UserCheck,
  Award,
  Monitor,
  Handshake,
  Globe,
  MessageSquare,
  Bell,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, AnimatedCounter } from "@/components/public/animations";
import {
  FeatureIcon,
  FloatingBadge,
  GradientButton,
  PublicHero,
  PublicCta,
  PublicSection,
  SectionHeading,
} from "@/components/public/shared";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";
import { FaqSection } from "@/components/public/FaqSection";
import { TimelineSection } from "@/components/public/TimelineSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { FeatureCardGrid } from "@/components/public/FeatureCardGrid";
import { ComparisonSection } from "@/components/public/ComparisonSection";
import { publicRoute, publicPages } from "@/lib/routes";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

const ADVANTAGES = [
  { icon: UserCheck, titleKey: "public.homologacion.adv_advisor_title", descKey: "public.homologacion.adv_advisor_desc" },
  { icon: Award, titleKey: "public.homologacion.adv_expertise_title", descKey: "public.homologacion.adv_expertise_desc" },
  { icon: Monitor, titleKey: "public.homologacion.adv_transparency_title", descKey: "public.homologacion.adv_transparency_desc" },
  { icon: Handshake, titleKey: "public.homologacion.adv_partners_title", descKey: "public.homologacion.adv_partners_desc" },
] as const;

const DASHBOARD_FEATURES = [
  { icon: Globe, key: "realtime" },
  { icon: Shield, key: "secure" },
  { icon: MessageSquare, key: "chat" },
  { icon: Bell, key: "notifications" },
] as const;

const WHAT_ITEMS = [
  { icon: Scale, titleKey: "public.homologacion.what_legal_title", descKey: "public.homologacion.what_legal_desc" },
  { icon: Building2, titleKey: "public.homologacion.what_work_title", descKey: "public.homologacion.what_work_desc" },
  { icon: FileCheck, titleKey: "public.homologacion.what_study_title", descKey: "public.homologacion.what_study_desc" },
] as const;

const HERO_FACTS = [
  { icon: Clock, valueKey: "hero_fact_time_value", labelKey: "hero_fact_time_label" },
  { icon: FileCheck, valueKey: "hero_fact_docs_value", labelKey: "hero_fact_docs_label" },
  { icon: Award, valueKey: "hero_fact_success_value", labelKey: "hero_fact_success_label" },
] as const;

export function HomologacionPage({
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
      <PublicHero
        fullBleed
        title1={t("public.homologacion.hero_title_1")}
        titleAccent={t("public.homologacion.hero_title_accent")}
        subtitle={
          <span
            dangerouslySetInnerHTML={{
              __html: t("public.homologacion.hero_subtitle"),
            }}
          />
        }
        actions={
          <ConsultationDialog>
            <GradientButton className="w-full sm:w-auto">
              {t("public.homologacion.cta_start")}
            </GradientButton>
          </ConsultationDialog>
        }
        footer={
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
            {HERO_FACTS.map(({ icon, valueKey, labelKey }) => (
              <div
                key={valueKey}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3 shadow-sm"
              >
                <FeatureIcon icon={icon} size="sm" hoverScale={false} />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-foreground leading-tight">
                    {t(`public.homologacion.${valueKey}`)}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight mt-0.5">
                    {t(`public.homologacion.${labelKey}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        illustration={
          <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-primary/25 to-brand-secondary/25 blur-3xl" />
            <img
              src="/images/hero_homologacion.webp"
              alt={t("public.homologacion.hero_photo_alt")}
              width={914}
              height={836}
              fetchPriority="high"
              decoding="async"
              className="relative rounded-2xl shadow-2xl shadow-brand-secondary/20 w-full h-auto object-cover"
            />
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white/95 pointer-events-none">
              <Building2 className="h-3 w-3 shrink-0" />
              <span>{t("public.homologacion.hero_caption_place")}</span>
            </div>
            <FloatingBadge className="-top-4 -right-3 sm:-right-6 shadow-xl px-3.5 py-2.5 font-semibold">
              <div className="shrink-0 h-5 w-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <span className="text-slate-800">
                {t("public.homologacion.hero_badge_result")}
              </span>
            </FloatingBadge>
            <FloatingBadge
              className="-bottom-4 -left-3 sm:-left-6 shadow-xl px-3.5 py-2.5 font-semibold"
              duration={7}
              delay={1.5}
            >
              <div className="shrink-0 h-5 w-5 rounded-full bg-brand-secondary/15 flex items-center justify-center">
                <Award className="h-3.5 w-3.5 text-brand-secondary" />
              </div>
              <span className="text-slate-800">
                {t("public.homologacion.hero_badge_experience")}
              </span>
            </FloatingBadge>
          </div>
        }
      />

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading
          title={t("public.homologacion.compare_title")}
          subtitle={t("public.homologacion.compare_subtitle")}
        />
        <ComparisonSection translationPrefix="public.homologacion" />
      </PublicSection>

      <PublicSection className="bg-white">
        <SectionHeading
          title={t("public.homologacion.adv_title")}
          subtitle={t("public.homologacion.adv_subtitle")}
        />
        <FeatureCardGrid items={ADVANTAGES} columns={4} />
      </PublicSection>

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading
          title={t("public.homologacion.what_title")}
          subtitle={t("public.homologacion.what_desc")}
        />
        <FeatureCardGrid items={WHAT_ITEMS} columns={3} />
      </PublicSection>

      <PublicSection className="bg-white">
        <SectionHeading
          title={t("public.homologacion.dashboard_title")}
          subtitle={t("public.homologacion.dashboard_subtitle")}
        />
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {DASHBOARD_FEATURES.map(({ icon, key }, i) => (
            <Reveal key={key} direction="up" delay={i * 100}>
              <div className="flex items-start gap-4 p-4 rounded-xl border bg-slate-50/50 transition-all duration-300 hover:bg-white hover:shadow-md group">
                <FeatureIcon icon={icon} size="md" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    {t(`public.homologacion.dash_${key}_title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`public.homologacion.dash_${key}_desc`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </PublicSection>

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading title={t("public.homologacion.process_title")} />
        <TimelineSection translationPrefix="public.homologacion" count={4} />
      </PublicSection>

      <PublicSection className="bg-white">
        <SectionHeading
          title={t("public.homologacion.testimonials_title")}
          subtitle={t("public.homologacion.testimonials_subtitle")}
        />
        <TestimonialsSection translationPrefix="public.homologacion" />
      </PublicSection>

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading
          title={t("public.homologacion.proof_title")}
          subtitle={t("public.homologacion.proof_subtitle")}
        />
        <div className="grid gap-4 sm:gap-8 sm:grid-cols-3 max-w-3xl mx-auto text-center">
          {[
            { value: 1700, suffix: "+", key: "clients" },
            { value: 20, suffix: "+", key: "countries" },
            { value: 15, suffix: "+", key: "years" },
          ].map(({ value, suffix, key }, i) => (
            <Reveal key={key} direction="up" delay={i * 150}>
              <div className="p-4 sm:p-6">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-medium">
                  {t(`public.homologacion.proof_${key}`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PublicSection>

      <PublicSection className="bg-white">
        <SectionHeading title={t("public.homologacion.costs_title")} />
        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {[
            {
              icon: Clock,
              iconClass: "text-brand-secondary",
              titleKey: "timeline_title",
              descKey: "timeline_desc",
              href: null as string | null,
            },
            {
              icon: FileText,
              iconClass: "text-brand-primary",
              titleKey: "cost_title",
              descKey: "cost_desc",
              href: preciosHref,
            },
          ].map(({ icon: Icon, iconClass, titleKey, descKey, href }, i) => {
            const card = (
              <Card
                className={`h-full border transition-all duration-300 hover:shadow-lg hover:shadow-brand-secondary/5 group ${
                  href ? "hover:-translate-y-1" : ""
                }`}
              >
                <CardContent className="p-6 text-center flex flex-col h-full">
                  <Icon
                    aria-hidden="true"
                    className={`h-8 w-8 ${iconClass} mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}
                  />
                  <h3 className="font-semibold mb-1">
                    {t(`public.homologacion.${titleKey}`)}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {t(`public.homologacion.${descKey}`)}
                  </p>
                  {href && (
                    <span className="mt-4 inline-flex items-center justify-center text-sm font-medium text-brand-secondary">
                      {t("public.homologacion.see_pricing")}
                      <ArrowRight
                        aria-hidden="true"
                        className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  )}
                </CardContent>
              </Card>
            );
            return (
              <Reveal key={titleKey} direction="up" delay={i * 120}>
                {href ? (
                  <a href={href} className="block h-full">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </PublicSection>

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading title={t("public.homologacion.faq_title")} />
        <FaqSection translationPrefix="public.homologacion" count={5} />
      </PublicSection>

      <PublicCta
        title={t("public.homologacion.cta_title")}
        subtitle={t("public.homologacion.cta_subtitle")}
      >
        <ConsultationDialog>
          <GradientButton className="w-full sm:w-auto">
            {t("public.homologacion.cta_button")}
          </GradientButton>
        </ConsultationDialog>
      </PublicCta>
    </>
  );
}
