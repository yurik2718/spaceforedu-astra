import {
  FileCheck,
  GraduationCap,
  Languages,
  Clock,
  Shield,
  ShieldCheck,
  CreditCard,
  Bell,
  FolderOpen,
  Activity,
  MessageSquare,
  ListChecks,
} from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { UniversityLogoBar } from "@/components/public/UniversityLogoBar";
import { PinHeroCollage } from "@/components/public/pin/PinHeroCollage";
import { PinServicesGrid } from "@/components/public/pin/PinServicesCard";
import { PinComparison } from "@/components/public/pin/PinComparison";
import { PinPricingTeaser } from "@/components/public/pin/PinPricingTeaser";
import { PinRiskReversal } from "@/components/public/pin/PinRiskReversal";
import { PinReachSection } from "@/components/public/pin/PinReachSection";
import { PinTestimonials } from "@/components/public/pin/PinTestimonials";
import { PinFinalCta } from "@/components/public/pin/PinFinalCta";
import { publicRoute, publicPages } from "@/lib/routes";
import { FEATURE_DASHBOARD } from "@/lib/constants";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

const HOME_PREFIX = "public.home";

const RISK_ITEMS = [
  { icon: Shield, n: 1 },
  { icon: ShieldCheck, n: 2 },
  { icon: CreditCard, n: 3 },
] as const;

const REACH_COUNTRIES = [
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
] as const;

export function HomePage({
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

  const services = [
    {
      icon: FileCheck,
      titleKey: `${HOME_PREFIX}.service_homologacion_title`,
      descKey: `${HOME_PREFIX}.pin_service_homologation_desc`,
      metaKey: `${HOME_PREFIX}.pin_service_homologation_meta`,
      href: publicRoute(publicPages.homologacion, locale),
    },
    {
      icon: GraduationCap,
      titleKey: `${HOME_PREFIX}.service_universidad_title`,
      descKey: `${HOME_PREFIX}.pin_service_university_desc`,
      metaKey: `${HOME_PREFIX}.pin_service_university_meta`,
      href: publicRoute(publicPages.universidad, locale),
    },
    {
      icon: Languages,
      titleKey: `${HOME_PREFIX}.service_espanol_title`,
      descKey: `${HOME_PREFIX}.pin_service_spanish_desc`,
      metaKey: `${HOME_PREFIX}.pin_service_spanish_meta`,
      href: publicRoute(publicPages.espanol, locale),
    },
  ];

  return (
    <>
      <PinHeroCollage
        prefix={HOME_PREFIX}
        secondaryHref={preciosHref}
        main={{
          src: "/images/hero/hero-student-salamanca-docs.webp",
          alt: t(`${HOME_PREFIX}.hero_img_alt`),
        }}
        sideRight={{
          src: "/images/lifestyle/spain-flag-sky.webp",
          alt: "Spanish flag waving against a clear blue sky",
        }}
        sideLeft={{
          src: "/images/lifestyle/madrid-almudena-sunset.webp",
          alt: "Almudena Cathedral and the Royal Palace of Madrid at sunset",
        }}
        pills={[
          { kind: "dot", labelKey: "pin_hero_pill_1" },
          { kind: "icon", icon: Clock, labelKey: "pin_hero_pill_2" },
        ]}
      />
      <PinServicesGrid prefix={HOME_PREFIX} items={services} columns={3} />
      <UniversityLogoBar titleKey="public.home.logo_bar_title" noBorderTop />
      <PinComparison prefix={HOME_PREFIX} rowCount={5} />
      <PinPricingTeaser prefix={HOME_PREFIX} />
      <PinRiskReversal prefix={HOME_PREFIX} items={RISK_ITEMS} />
      {FEATURE_DASHBOARD && <DashboardPreviewSection />}
      <PinReachSection prefix={HOME_PREFIX} countries={REACH_COUNTRIES} />
      <PinTestimonials prefix={HOME_PREFIX} count={3} />
      <PinFinalCta prefix={HOME_PREFIX} sideItemCount={5} />
    </>
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
                    active ? "bg-white/8 text-white" : "text-white/65"
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
                <div
                  className="flex flex-col gap-2.5 relative"
                  style={{ paddingLeft: 22 }}
                >
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
