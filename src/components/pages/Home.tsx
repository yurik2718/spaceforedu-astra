import {
  FileCheck,
  GraduationCap,
  Languages,
  Check,
  Shield,
  ShieldCheck,
  CreditCard,
  Bell,
  FolderOpen,
  Activity,
  MessageSquare,
  ListChecks,
  Star,
  CheckCircle2,
  X,
} from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";
import { UniversityLogoBar } from "@/components/public/UniversityLogoBar";
import { publicRoute, publicPages, whatsappLink } from "@/lib/routes";
import { CONTACT_WHATSAPP } from "@/lib/constants";
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
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />
      <UniversityLogoBar titleKey="public.home.logo_bar_title" noBorderTop />
      <ComparisonSection />
      <PricingTeaserSection />
      <RiskReversalSection />
      <DashboardPreviewSection />
      <ReachSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </I18nProvider>
  );
}

function HeroSection({ locale }: { locale: Locale | string }) {
  const { t } = useTranslation();
  const preciosHref = publicRoute(publicPages.precios, locale);

  return (
    <section className="bg-[var(--surface-soft)] pt-16 pb-8 sm:pt-20">
      <Container>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal direction="up">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-blue)] mb-5">
                {t("public.home.pin_hero_eyebrow")}
              </span>
            </Reveal>
            <Reveal direction="up" delay={50}>
              <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[64px] font-semibold tracking-[-0.022em] text-[var(--ink)] leading-[1.05] m-0">
                {t("public.home.pin_hero_title_1")}{" "}
                <span className="text-[var(--primary)]">
                  {t("public.home.pin_hero_title_accent")}
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <p className="mt-5 text-[18px] leading-[1.5] text-[var(--mute)] max-w-[520px]">
                {t("public.home.pin_hero_subtitle")}
              </p>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <ConsultationDialog>
                  <button className="pin-btn pin-btn-primary h-12 px-6 text-[15px]">
                    {t("public.home.pin_hero_cta_primary")}
                  </button>
                </ConsultationDialog>
                <a href={preciosHref}>
                  <button className="pin-btn pin-btn-secondary h-12 px-6 text-[15px]">
                    {t("public.home.pin_hero_cta_secondary")}
                  </button>
                </a>
              </div>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <p className="mt-7 text-[13px] text-[var(--mute)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22a655] inline-block" />
                {t("public.home.pin_hero_reassure")}
              </p>
            </Reveal>
            <Reveal direction="up" delay={250}>
              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-[var(--hairline-soft)]">
                {[1, 2, 3].map((n) => (
                  <div key={n}>
                    <div className="font-display text-[28px] sm:text-[36px] font-bold text-[var(--ink)] tracking-[-0.03em] leading-none">
                      {t(`public.home.pin_hero_stat_${n}_value`)}
                    </div>
                    <div className="text-[13px] text-[var(--mute)] mt-1.5 leading-tight">
                      {t(`public.home.pin_hero_stat_${n}_label`)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={100}>
            <div className="relative h-[460px] sm:h-[560px] hidden md:block">
              <div className="absolute top-0 right-0 w-[62%] h-[64%] rounded-[32px] overflow-hidden bg-[var(--surface-card)]">
                <img
                  src="/images/hero/hero-student-salamanca-docs.webp"
                  alt={t("public.home.hero_img_alt")}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-[14%] w-[46%] h-[38%] rounded-[32px] overflow-hidden"
                style={{ background: "linear-gradient(135deg,#e2c9a3,#a37b4a)" }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-[8%] left-0 w-[38%] h-[42%] rounded-[32px] overflow-hidden"
                style={{ background: "linear-gradient(135deg,#d8c9a0,#8d6c3a)" }}
                aria-hidden="true"
              />
              <div
                className="absolute top-[18%] left-0 w-[30%] h-[30%] rounded-[32px] flex flex-col items-center justify-center text-center p-4 box-border"
                style={{ background: "#f4e9d7", color: "var(--primary)" }}
              >
                <span className="font-display text-[36px] font-bold tracking-[-0.03em] leading-none">
                  {t("public.home.pin_hero_badge_years")}
                </span>
                <small className="text-[11px] text-[var(--mute)] font-medium leading-tight mt-1 font-sans">
                  {t("public.home.pin_hero_badge_years_label")}
                </small>
              </div>
              <div className="absolute top-[36%] right-[-8px] bg-white border border-[var(--hairline-soft)] rounded-full px-4 py-2.5 flex items-center gap-2 text-[13px] font-bold text-[var(--ink)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#22a655] inline-block" />
                {t("public.home.pin_hero_pill_1")}
              </div>
              <div className="absolute bottom-[14%] left-[32%] bg-white border border-[var(--hairline-soft)] rounded-full px-4 py-2.5 flex items-center gap-2 text-[13px] font-bold text-[var(--ink)] shadow-sm">
                <GraduationCap className="h-4 w-4 text-[var(--primary)]" />
                {t("public.home.pin_hero_pill_2")}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PinSectionHead({
  title1,
  accent,
  sub,
  align = "split",
}: {
  title1: string;
  accent: string;
  sub: string;
  align?: "split" | "center";
}) {
  if (align === "center") {
    return (
      <Reveal direction="up">
        <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <h2 className="font-display text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] text-[var(--ink)] leading-[1.1] m-0">
            {title1} <span className="text-[var(--primary)]">{accent}</span>
          </h2>
          <p className="mt-4 text-[15px] text-[var(--mute)] leading-[1.5]">{sub}</p>
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal direction="up">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-6 mb-9">
        <h2 className="font-display text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] text-[var(--ink)] leading-[1.1] m-0 max-w-[640px]">
          {title1} <span className="text-[var(--primary)]">{accent}</span>
        </h2>
        <p className="text-[15px] text-[var(--mute)] leading-[1.5] max-w-[360px] sm:text-right">
          {sub}
        </p>
      </div>
    </Reveal>
  );
}

function ServicesSection({ locale }: { locale: Locale | string }) {
  const { t } = useTranslation();

  const services = [
    {
      icon: FileCheck,
      titleKey: "service_homologacion_title",
      descKey: "pin_service_homologation_desc",
      metaKey: "pin_service_homologation_meta",
      href: publicRoute(publicPages.homologacion, locale),
    },
    {
      icon: GraduationCap,
      titleKey: "service_universidad_title",
      descKey: "pin_service_university_desc",
      metaKey: "pin_service_university_meta",
      href: publicRoute(publicPages.universidad, locale),
    },
    {
      icon: Languages,
      titleKey: "service_espanol_title",
      descKey: "pin_service_spanish_desc",
      metaKey: "pin_service_spanish_meta",
      href: publicRoute(publicPages.espanol, locale),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <PinSectionHead
          title1={t("public.home.pin_services_title_1")}
          accent={t("public.home.pin_services_title_accent")}
          sub={t("public.home.pin_services_sub")}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {services.map(({ icon: Icon, titleKey, descKey, metaKey, href }, i) => (
            <Reveal key={titleKey} direction="up" delay={i * 80}>
              <a
                href={href}
                className="block h-full bg-white rounded-2xl p-7 border border-[var(--hairline-soft)] hover:border-[var(--ash)] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex flex-col gap-3.5 h-full">
                  <div className="w-11 h-11 rounded-2xl bg-[var(--surface-card)] text-[var(--primary)] flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-[var(--ink)] tracking-[-0.01em] m-0">
                    {t(`public.home.${titleKey}`)}
                  </h3>
                  <p className="text-[14px] leading-[1.5] text-[var(--mute)] flex-1 m-0">
                    {t(`public.home.${descKey}`)}
                  </p>
                  <div className="flex items-center justify-between text-[13px] font-bold text-[var(--ink)]">
                    <span className="text-[var(--mute)] font-medium">
                      {t(`public.home.${metaKey}`)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[var(--ink-soft)]">
                      {t("public.home.pin_service_arrow")}
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ComparisonSection() {
  const { t } = useTranslation();
  const rows = [1, 2, 3, 4, 5];
  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <PinSectionHead
          title1={t("public.home.pin_compare_title_1")}
          accent={t("public.home.pin_compare_title_accent")}
          sub={t("public.home.pin_compare_sub")}
        />
        <Reveal direction="up">
          <div className="bg-white rounded-[32px] overflow-hidden border border-[var(--hairline-soft)]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-[var(--surface-card)] border-b border-[var(--hairline)]">
              <div className="px-4 sm:px-6 py-5 text-[13px] font-semibold text-[var(--mute)]">&nbsp;</div>
              <div className="px-4 sm:px-6 py-5 text-[14px] sm:text-[16px] font-semibold text-[var(--ink)]">
                {t("public.home.pin_compare_them")}
              </div>
              <div className="px-4 sm:px-6 py-5 text-[14px] sm:text-[16px] font-bold text-[var(--primary)]">
                {t("public.home.pin_compare_us")}
              </div>
            </div>
            {rows.map((n) => (
              <div
                key={n}
                className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--hairline-soft)] last:border-b-0"
              >
                <div className="px-4 sm:px-6 py-4 text-[14px] font-semibold text-[var(--ink)]">
                  {t(`public.home.pin_compare_row_${n}_label`)}
                </div>
                <div className="px-4 sm:px-6 py-4 text-[14px] text-[var(--mute)]">
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[var(--surface-card)] text-[var(--ash)] mr-2 align-middle shrink-0">
                    <X className="h-3 w-3" />
                  </span>
                  {t(`public.home.pin_compare_row_${n}_them`)}
                </div>
                <div
                  className="px-4 sm:px-6 py-4 text-[14px] font-semibold text-[var(--ink)]"
                  style={{ background: "rgba(232,69,60,0.04)" }}
                >
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[var(--success-pale)] text-[var(--success-deep)] mr-2 align-middle shrink-0">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t(`public.home.pin_compare_row_${n}_us`)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PricingTeaserSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <PinSectionHead
          title1={t("public.home.pin_pricing_title_1")}
          accent={t("public.home.pin_pricing_title_accent")}
          sub={t("public.home.pin_pricing_sub")}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <PricingPlan
            title={t("public.home.pin_plan_review_title")}
            desc={t("public.home.pin_plan_review_desc")}
            price={t("public.home.pin_plan_review_price")}
            unit={t("public.home.pin_plan_review_unit")}
            features={[1, 2, 3].map((n) => t(`public.home.pin_plan_review_feat_${n}`))}
            cta={t("public.home.pin_plan_review_cta")}
            ctaVariant="secondary"
          />
          <PricingPlan
            title={t("public.home.pin_plan_full_title")}
            desc={t("public.home.pin_plan_full_desc")}
            price={t("public.home.pin_plan_full_price")}
            unit={t("public.home.pin_plan_full_unit")}
            features={[1, 2, 3, 4, 5].map((n) =>
              t(`public.home.pin_plan_full_feat_${n}`),
            )}
            cta={t("public.home.pin_plan_full_cta")}
            ctaVariant="primary"
            featured
            popLabel={t("public.home.pin_plan_full_pop")}
          />
          <PricingPlan
            title={t("public.home.pin_plan_path_title")}
            desc={t("public.home.pin_plan_path_desc")}
            price={t("public.home.pin_plan_path_price")}
            unit={t("public.home.pin_plan_path_unit")}
            features={[1, 2, 3, 4, 5].map((n) =>
              t(`public.home.pin_plan_path_feat_${n}`),
            )}
            cta={t("public.home.pin_plan_path_cta")}
            ctaVariant="secondary"
          />
        </div>
      </Container>
    </section>
  );
}

function PricingPlan({
  title,
  desc,
  price,
  unit,
  features,
  cta,
  ctaVariant,
  featured = false,
  popLabel,
}: {
  title: string;
  desc: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  ctaVariant: "primary" | "secondary";
  featured?: boolean;
  popLabel?: string;
}) {
  const cardBg = featured ? "bg-[var(--ink)]" : "bg-white";
  const titleColor = featured ? "text-white" : "text-[var(--ink)]";
  const descColor = featured ? "text-[var(--on-dark-mute)]" : "text-[var(--mute)]";
  const featBorder = featured
    ? "border-white/12"
    : "border-[var(--hairline-soft)]";
  const featTextColor = featured ? "text-white" : "text-[var(--body-color)]";
  const priceUnitColor = featured ? "text-[var(--on-dark-mute)]" : "text-[var(--mute)]";

  const ctaBtn =
    ctaVariant === "primary" ? (
      <ConsultationDialog>
        <button className="pin-btn pin-btn-primary h-11 w-full">{cta}</button>
      </ConsultationDialog>
    ) : (
      <ConsultationDialog>
        <button className="pin-btn pin-btn-secondary h-11 w-full">{cta}</button>
      </ConsultationDialog>
    );

  return (
    <Reveal direction="up">
      <div
        className={`relative rounded-[32px] p-8 flex flex-col gap-3.5 border ${
          featured ? "border-[var(--ink)]" : "border-[var(--hairline-soft)]"
        } ${cardBg} h-full`}
      >
        {popLabel && (
          <span className="absolute top-[-12px] left-8 bg-[var(--primary)] text-white px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase">
            {popLabel}
          </span>
        )}
        <h3 className={`text-[18px] font-semibold m-0 ${titleColor}`}>{title}</h3>
        <p className={`text-[13px] m-0 ${descColor}`}>{desc}</p>
        <div className="flex items-baseline gap-1.5 mt-2 mb-1">
          <span className={`text-[18px] font-semibold ${priceUnitColor}`}>€</span>
          <span
            className={`font-display text-[42px] font-bold tracking-[-0.025em] leading-none ${titleColor}`}
          >
            {price}
          </span>
          <span className={`text-[13px] ml-1 ${priceUnitColor}`}>{unit}</span>
        </div>
        <div
          className={`flex flex-col gap-2.5 mt-3 mb-4 pt-4 border-t flex-1 ${featBorder}`}
        >
          {features.map((f) => (
            <span
              key={f}
              className={`flex items-start gap-2 text-[14px] leading-[1.4] ${featTextColor}`}
            >
              <Check
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--primary)]"
                strokeWidth={2.5}
              />
              {f}
            </span>
          ))}
        </div>
        {ctaBtn}
      </div>
    </Reveal>
  );
}

function RiskReversalSection() {
  const { t } = useTranslation();
  const items = [
    { icon: Shield, n: 1 },
    { icon: ShieldCheck, n: 2 },
    { icon: CreditCard, n: 3 },
  ];
  return (
    <section className="py-12 sm:py-16 bg-[var(--surface-soft)]">
      <Container>
        <Reveal direction="up">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[var(--hairline-soft)] grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <h3 className="font-display text-[28px] sm:text-[36px] font-bold tracking-[-0.025em] leading-[1.1] text-[var(--ink)] m-0">
              {t("public.home.pin_risk_title_1")}{" "}
              <span className="text-[var(--primary)]">
                {t("public.home.pin_risk_title_accent")}
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
                      {t(`public.home.pin_risk_item_${n}_title`)}
                    </h4>
                    <p className="text-[14px] leading-[1.45] text-[var(--mute)] m-0">
                      {t(`public.home.pin_risk_item_${n}_desc`)}
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

function DashboardPreviewSection() {
  const { t } = useTranslation();
  const navItems = [
    { key: "overview", icon: Activity, active: true },
    { key: "documents", icon: FolderOpen },
    { key: "timeline", icon: ListChecks },
    { key: "chat", icon: MessageSquare },
    { key: "notif", icon: Bell },
    { key: "billing", icon: CreditCard },
  ];

  const tlSteps = [
    { n: 1, state: "done" as const },
    { n: 2, state: "done" as const },
    { n: 3, state: "done" as const },
    { n: 4, state: "now" as const },
    { n: 5, state: "" as const },
    { n: 6, state: "" as const },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[var(--surface-dark)] text-white">
      <Container>
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-6 mb-9">
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] text-white leading-[1.1] m-0 max-w-[640px]">
              {t("public.home.pin_dash_title_1")}{" "}
              <span className="text-[var(--primary)]">
                {t("public.home.pin_dash_title_accent")}
              </span>
            </h2>
            <p className="text-[15px] text-[var(--on-dark-mute)] leading-[1.5] max-w-[360px] sm:text-right">
              {t("public.home.pin_dash_sub")}
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <div
            className="rounded-[32px] p-5 sm:p-6 grid lg:grid-cols-[240px_1fr] gap-4 border min-h-[420px]"
            style={{ background: "#1a1a16", borderColor: "#2e2e29" }}
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map(({ key, icon: Icon, active }) => (
                <div
                  key={key}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold ${
                    active
                      ? "bg-white/8 text-white"
                      : "text-white/65"
                  }`}
                >
                  {active ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  ) : (
                    <Icon className="h-3.5 w-3.5 opacity-70" />
                  )}
                  {t(`public.home.pin_dash_nav_${key}`)}
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              style={{ background: "#262622" }}
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    k: "status",
                    val: "pin_dash_kpi_status_value",
                    meta: "pin_dash_kpi_status_meta",
                    metaColor: "rgba(255,255,255,0.5)",
                  },
                  {
                    k: "eta",
                    val: "pin_dash_kpi_eta_value",
                    meta: "pin_dash_kpi_eta_meta",
                    metaColor: "#8be0a8",
                  },
                  {
                    k: "docs",
                    val: "pin_dash_kpi_docs_value",
                    meta: "pin_dash_kpi_docs_meta",
                    metaColor: "#8be0a8",
                  },
                ].map(({ k, val, meta, metaColor }) => (
                  <div
                    key={k}
                    className="rounded-2xl p-3 sm:p-4 border"
                    style={{ background: "#1a1a16", borderColor: "#2e2e29" }}
                  >
                    <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-white/55">
                      {t(`public.home.pin_dash_kpi_${k}`)}
                    </div>
                    <div className="font-display text-[20px] sm:text-[24px] font-bold tracking-[-0.02em] mt-1.5">
                      {t(`public.home.${val}`)}
                    </div>
                    <div className="text-[12px] mt-1" style={{ color: metaColor }}>
                      {t(`public.home.${meta}`)}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-2xl p-4 sm:p-5 border"
                style={{ background: "#1a1a16", borderColor: "#2e2e29" }}
              >
                <div className="text-[13px] font-bold text-white mb-3.5">
                  {t("public.home.pin_dash_tl_heading")}
                </div>
                <div className="flex flex-col gap-2.5 relative pl-5.5" style={{ paddingLeft: 22 }}>
                  <div
                    className="absolute top-1.5 bottom-1.5 w-0.5"
                    style={{ left: 6, background: "#2e2e29" }}
                  />
                  {tlSteps.map(({ n, state }) => (
                    <div key={n} className="relative">
                      <span
                        className="absolute top-[5px] w-3.5 h-3.5 rounded-full"
                        style={{
                          left: -22,
                          background:
                            state === "done"
                              ? "#22a655"
                              : state === "now"
                                ? "var(--primary)"
                                : "#2e2e29",
                          border: "3px solid #1a1a16",
                          boxShadow:
                            state === "now"
                              ? "0 0 0 4px rgba(232,69,60,0.25)"
                              : "none",
                        }}
                      />
                      <div className="text-[13px] text-white font-semibold">
                        {t(`public.home.pin_dash_tl_${n}`)}
                      </div>
                      <div className="text-[11px] text-white/50">
                        {t(`public.home.pin_dash_tl_${n}_when`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ReachSection() {
  const { t } = useTranslation();
  const countries = [
    "Argentina",
    "Colombia",
    "Mexico",
    "Venezuela",
    "Peru",
    "Cuba",
    "Russia",
    "Ukraine",
    "Belarus",
    "Kazakhstan",
    "Uzbekistan",
    "Georgia",
    "Armenia",
    "Brazil",
    "Chile",
    "+5 more",
  ];
  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="up">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-blue)] mb-3">
                {t("public.home.pin_reach_eyebrow")}
              </span>
              <h2 className="font-display text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--ink)] m-0 mb-4">
                {t("public.home.pin_reach_title_1")}{" "}
                <span className="text-[var(--primary)]">
                  {t("public.home.pin_reach_title_accent")}
                </span>{" "}
                {t("public.home.pin_reach_title_2")}
              </h2>
              <p className="text-[15px] leading-[1.55] text-[var(--mute)] m-0 mb-3">
                {t("public.home.pin_reach_sub")}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {countries.map((c) => (
                  <span
                    key={c}
                    className="bg-[var(--surface-card)] rounded-full px-3 py-1.5 text-[13px] font-semibold text-[var(--body-color)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <div className="bg-white rounded-[32px] overflow-hidden border border-[var(--hairline-soft)] p-8">
              <img
                src="/images/world.svg"
                alt="World map showing client origins"
                className="w-full block"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function TestimonialsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-soft)]">
      <Container>
        <PinSectionHead
          title1={t("public.home.pin_test_title_1")}
          accent={t("public.home.pin_test_title_accent")}
          sub={t("public.home.pin_test_sub")}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <Reveal key={n} direction="up" delay={i * 80}>
              <article className="bg-white rounded-[32px] p-7 flex flex-col gap-4 border border-[var(--hairline-soft)] h-full">
                <div className="flex gap-0.5 text-[var(--primary)]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-[16px] leading-[1.5] text-[var(--body-color)] font-medium flex-1 m-0">
                  {t(`public.home.pin_test_${n}_quote`)}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--hairline-soft)]">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold font-display text-[16px]"
                    style={{
                      background: "linear-gradient(135deg,#c9a07f,#7a523a)",
                    }}
                    aria-hidden="true"
                  >
                    {t(`public.home.pin_test_${n}_initials`)}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--ink)]">
                      {t(`public.home.pin_test_${n}_name`)}
                    </div>
                    <div className="text-[12px] text-[var(--mute)]">
                      {t(`public.home.pin_test_${n}_where`)}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  const { t } = useTranslation();
  const waHref = CONTACT_WHATSAPP ? whatsappLink(CONTACT_WHATSAPP) : "#";
  return (
    <section className="py-12 sm:py-16 bg-[var(--surface-soft)]">
      <Container>
        <Reveal direction="up">
          <div
            className="relative rounded-[32px] p-10 sm:p-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center text-white overflow-hidden"
            style={{
              backgroundColor: "#C9342C",
              backgroundImage:
                "url(/images/lifestyle/salamanca-university-courtyard-sunset.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "multiply",
            }}
          >
            <div>
              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[48px] font-bold tracking-[-0.025em] leading-[1.05] m-0 mb-4 text-white">
                {t("public.home.pin_final_title")}
              </h2>
              <p className="text-[16px] leading-[1.5] text-white/90 m-0 mb-6 max-w-[520px]">
                {t("public.home.pin_final_sub")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ConsultationDialog>
                  <button className="pin-btn pin-btn-on-red h-12 px-6 text-[15px]">
                    {t("public.home.pin_final_cta_primary")}
                  </button>
                </ConsultationDialog>
                {waHref !== "#" && (
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    <button className="pin-btn pin-btn-on-red-ghost h-12 px-6 text-[15px]">
                      {t("public.home.pin_final_cta_secondary")}
                    </button>
                  </a>
                )}
              </div>
            </div>
            <div className="bg-black/25 border border-white/20 rounded-2xl p-6">
              <h4 className="text-[15px] font-bold text-white m-0 mb-2.5">
                {t("public.home.pin_final_side_title")}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li
                    key={n}
                    className="text-[13px] text-white/85 flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                    {t(`public.home.pin_final_side_${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
