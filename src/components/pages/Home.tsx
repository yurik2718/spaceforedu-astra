import {
  FileCheck,
  GraduationCap,
  Languages,
  Stamp,
  Scale,
  Users,
  BookOpen,
  Briefcase,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, AnimatedCounter } from "@/components/public/animations";
import {
  Container,
  FeatureIcon,
  GradientButton,
  PublicCta,
  PublicSection,
  SectionHeading,
} from "@/components/public/shared";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";
import { UniversityLogoBar } from "@/components/public/UniversityLogoBar";
import { publicRoute, publicPages } from "@/lib/routes";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

export function HomePage({
  locale,
  messages,
}: {
  locale: Locale | string;
  messages: Messages;
}) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <HeroSection />
      <UniversityLogoBar titleKey="public.home.logo_bar_title" noBorderTop />
      <ServicesSection locale={locale} />
      <ApproachSection />
      <NumbersStrip />
      <FinalCtaSection />
    </I18nProvider>
  );
}

function HeroSection() {
  const { t } = useTranslation();
  const stats = [
    { value: "1700+", label: t("public.home.stat_students") },
    { value: "20+", label: t("public.home.stat_countries") },
    { value: "15+", label: t("public.home.stat_years") },
  ];

  return (
    <section className="relative bg-slate-50 py-20 sm:py-32 lg:py-40">
      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal direction="up">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-6">
              {t("public.home.hero_eyebrow")}
            </p>
          </Reveal>
          <Reveal direction="up" delay={50}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05]">
              {t("public.home.hero_title_1")}{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {t("public.home.hero_title_accent")}
              </span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("public.home.hero_subtitle")}
            </p>
          </Reveal>
          <Reveal direction="up" delay={250}>
            <div className="mt-12">
              <ConsultationDialog>
                <GradientButton>{t("public.home.cta_start")}</GradientButton>
              </ConsultationDialog>
            </div>
          </Reveal>
          <Reveal direction="up" delay={350}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {stats.map(({ value, label }, i) => (
                <div key={value} className="flex items-baseline gap-2">
                  {i > 0 && <span className="text-border hidden sm:inline">·</span>}
                  <span className="font-bold text-foreground text-base">{value}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ServicesSection({ locale }: { locale: Locale | string }) {
  const { t } = useTranslation();

  const leadServices = [
    {
      icon: FileCheck,
      title: t("public.home.service_homologacion_title"),
      desc: t("public.home.service_homologacion_desc"),
      href: publicRoute(publicPages.homologacion, locale),
    },
    {
      icon: GraduationCap,
      title: t("public.home.service_universidad_title"),
      desc: t("public.home.service_universidad_desc"),
      href: publicRoute(publicPages.universidad, locale),
    },
    {
      icon: Languages,
      title: t("public.home.service_espanol_title"),
      desc: t("public.home.service_espanol_desc"),
      href: publicRoute(publicPages.espanol, locale),
    },
  ];

  const additionalServices = [
    { icon: Stamp, labelKey: "service_visas_title" },
    { icon: Scale, labelKey: "service_legal_title" },
    { icon: Users, labelKey: "service_relocation_title" },
    { icon: BookOpen, labelKey: "service_postgrad_title" },
    { icon: Briefcase, labelKey: "service_internship_title" },
    { icon: Building2, labelKey: "service_b2b_title" },
  ];

  return (
    <PublicSection className="bg-white">
      <SectionHeading
        title={t("public.home.services_title")}
        subtitle={t("public.home.services_subtitle")}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {leadServices.map(({ icon, title, desc, href }, i) => (
          <Reveal key={title} direction="up" delay={i * 120}>
            <a href={href} className="block h-full group">
              <Card className="h-full border bg-white transition-all duration-300 hover:shadow-xl hover:shadow-brand-secondary/5 hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col h-full">
                  <FeatureIcon icon={icon} className="mb-4 self-start" />
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {desc}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-medium text-brand-secondary">
                    {t("public.home.learn_more")}
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </CardContent>
              </Card>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 max-w-5xl mx-auto">
        <Reveal direction="up">
          <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            {t("public.home.additional_label")}
          </p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {additionalServices.map(({ icon, labelKey }, i) => (
            <Reveal key={labelKey} direction="up" delay={i * 60}>
              <ConsultationDialog>
                <button
                  type="button"
                  className="group flex items-center gap-3 w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-secondary/40 hover:shadow-md transition-all duration-300 min-h-[44px]"
                >
                  <FeatureIcon icon={icon} size="sm" hoverScale={false} />
                  <span className="flex-1 text-sm font-medium">
                    {t(`public.home.${labelKey}`)}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground group-hover:text-brand-secondary group-hover:translate-x-0.5 transition-all"
                  />
                </button>
              </ConsultationDialog>
            </Reveal>
          ))}
        </div>
      </div>
    </PublicSection>
  );
}

function ApproachSection() {
  const { t } = useTranslation();
  return (
    <PublicSection className="bg-slate-50" dots>
      <SectionHeading
        title={t("public.home.approach_title")}
        subtitle={t("public.home.approach_subtitle")}
      />
      <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
        {[1, 2, 3, 4].map((n, i) => (
          <Reveal key={n} direction="up" delay={i * 100}>
            <Card className="border bg-white h-full transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 flex gap-5">
                <div
                  className="shrink-0 text-4xl sm:text-5xl font-bold tracking-tighter leading-none text-slate-300 select-none w-12 sm:w-14"
                  aria-hidden="true"
                >
                  {String(n).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5">
                    {t(`public.home.approach_${n}_title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`public.home.approach_${n}_desc`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </PublicSection>
  );
}

function NumbersStrip() {
  const { t } = useTranslation();
  const numbers = [
    { value: 1700, suffix: "+", labelKey: "stat_students" },
    { value: 20, suffix: "+", labelKey: "stat_countries" },
    { value: 15, suffix: "+", labelKey: "stat_years" },
    { value: 98, suffix: "%", labelKey: "stat_success" },
  ] as const;

  return (
    <section aria-labelledby="home-numbers-heading" className="py-16 sm:py-20 bg-white">
      <Container>
        <h2 id="home-numbers-heading" className="sr-only">
          {t("public.home.numbers_heading")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {numbers.map(({ value, suffix, labelKey }, i) => (
            <Reveal key={labelKey} direction="up" delay={i * 100}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter leading-none bg-gradient-to-br from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(`public.home.${labelKey}`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  const { t } = useTranslation();
  return (
    <PublicCta
      title={t("public.home.cta_title")}
      subtitle={t("public.home.cta_subtitle")}
    >
      <ConsultationDialog>
        <GradientButton className="w-full sm:w-auto">
          {t("public.home.cta_final_start")}
        </GradientButton>
      </ConsultationDialog>
    </PublicCta>
  );
}
