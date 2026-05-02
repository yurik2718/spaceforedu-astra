import {
  BookOpen,
  Award,
  GraduationCap,
  Building2,
  Search,
  FileText,
  Link2,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversityIllustration } from "@/components/public/UniversityIllustration";
import { UniversityLogoBar } from "@/components/public/UniversityLogoBar";
import {
  GradientButton,
  PublicHero,
  PublicCta,
  PublicSection,
  SectionHeading,
} from "@/components/public/shared";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";
import { CrossSellCard } from "@/components/public/CrossSellCard";
import { FaqSection } from "@/components/public/FaqSection";
import { TimelineSection } from "@/components/public/TimelineSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { FeatureCardGrid } from "@/components/public/FeatureCardGrid";
import { publicRoute, publicPages } from "@/lib/routes";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

const ADVANTAGES = [
  { icon: Search, titleKey: "public.universidad.adv_matching_title", descKey: "public.universidad.adv_matching_desc" },
  { icon: FileText, titleKey: "public.universidad.adv_support_title", descKey: "public.universidad.adv_support_desc" },
  { icon: Building2, titleKey: "public.universidad.adv_local_title", descKey: "public.universidad.adv_local_desc" },
  { icon: Link2, titleKey: "public.universidad.adv_combo_title", descKey: "public.universidad.adv_combo_desc" },
] as const;

const ADMISSION_TYPES = [
  { icon: BookOpen, titleKey: "public.universidad.type_grado_title", descKey: "public.universidad.type_grado_desc" },
  { icon: Award, titleKey: "public.universidad.type_master_title", descKey: "public.universidad.type_master_desc" },
  { icon: GraduationCap, titleKey: "public.universidad.type_fp_title", descKey: "public.universidad.type_fp_desc" },
] as const;

export function UniversidadPage({
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
        title1={t("public.universidad.hero_title_1")}
        titleAccent={t("public.universidad.hero_title_accent")}
        subtitle={t("public.universidad.hero_subtitle")}
        actions={
          <div className="flex flex-col sm:flex-row gap-3">
            <ConsultationDialog>
              <GradientButton className="w-full sm:w-auto">
                {t("public.universidad.cta_consult")}
              </GradientButton>
            </ConsultationDialog>
            <a href={preciosHref}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-h-[44px] text-base transition-all duration-300"
              >
                {t("public.universidad.cta_pricing")}
              </Button>
            </a>
          </div>
        }
        footer={
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-6 gap-y-1 text-sm text-muted-foreground">
            {[
              { value: "80+", key: "universities" },
              { value: "1 000+", key: "programs" },
              { value: "1700+", key: "success" },
            ].map(({ value, key }, i) => (
              <div key={key} className="flex items-center gap-x-2 sm:gap-x-6">
                {i > 0 && <span className="text-border">·</span>}
                <span>
                  <span className="font-semibold text-foreground">{value}</span>{" "}
                  {t(`public.universidad.hero_stat_${key}`)}
                </span>
              </div>
            ))}
          </div>
        }
        illustration={<UniversityIllustration />}
      />

      <PublicSection className="bg-white">
        <SectionHeading
          title={t("public.universidad.adv_title")}
          subtitle={t("public.universidad.adv_subtitle")}
        />
        <FeatureCardGrid items={ADVANTAGES} columns={4} />
      </PublicSection>

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading title={t("public.universidad.types_title")} />
        <FeatureCardGrid items={ADMISSION_TYPES} columns={3} />
      </PublicSection>

      <PublicSection className="bg-white">
        <SectionHeading title={t("public.universidad.process_title")} />
        <TimelineSection translationPrefix="public.universidad" count={5} />
      </PublicSection>

      <UniversityLogoBar />

      <PublicSection className="bg-white">
        <SectionHeading title={t("public.universidad.testimonials_title")} />
        <TestimonialsSection translationPrefix="public.universidad" />
      </PublicSection>

      <CrossSellCard
        title={t("public.universidad.crosssell_title")}
        description={t("public.universidad.crosssell_desc")}
        links={[
          {
            label: t("public.universidad.crosssell_espanol"),
            href: publicRoute(publicPages.espanol, locale),
          },
          {
            label: t("public.universidad.crosssell_homologacion"),
            href: publicRoute(publicPages.homologacion, locale),
          },
        ]}
        badgeLabel={t("public.universidad.crosssell_badge")}
        badgeIcon={Languages}
      />

      <PublicSection className="bg-slate-50" dots>
        <SectionHeading title={t("public.universidad.faq_title")} />
        <FaqSection translationPrefix="public.universidad" count={5} />
      </PublicSection>

      <PublicCta
        title={t("public.universidad.cta_title")}
        subtitle={t("public.universidad.cta_subtitle")}
      >
        <ConsultationDialog>
          <GradientButton className="w-full sm:w-auto">
            {t("public.universidad.cta_button")}
          </GradientButton>
        </ConsultationDialog>
      </PublicCta>
    </>
  );
}
