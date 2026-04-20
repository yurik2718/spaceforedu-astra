import { CheckCircle, ArrowRight, MessageCircle, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/public/shared";
import { CONTACT_WHATSAPP, CONTACT_EMAIL } from "@/lib/constants";
import { formatPhone } from "@/lib/utils";
import { publicRoute, publicPages } from "@/lib/routes";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import type { Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

export function ConsultationThankYouPage({
  locale,
  messages,
}: {
  locale: Locale | string;
  messages: Messages;
}) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <Body locale={locale} />
    </I18nProvider>
  );
}

function Body({ locale }: { locale: Locale | string }) {
  const { t } = useTranslation();
  const homeHref = publicRoute(publicPages.home, locale);

  const steps = [
    {
      icon: Mail,
      title: t("public.consultation_thanks.step_1_title"),
      desc: t("public.consultation_thanks.step_1_desc"),
    },
    {
      icon: Clock,
      title: t("public.consultation_thanks.step_2_title"),
      desc: t("public.consultation_thanks.step_2_desc"),
    },
    {
      icon: MessageCircle,
      title: t("public.consultation_thanks.step_3_title"),
      desc: t("public.consultation_thanks.step_3_desc"),
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 inline-flex rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t("public.consultation_thanks.title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            {t("public.consultation_thanks.subtitle")}
          </p>

          <div className="grid gap-4 sm:grid-cols-3 text-left mb-10">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} className="border bg-white">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-2.5">
                    <Icon className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border bg-slate-50 mb-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-3">
                {t("public.consultation_thanks.contact_hint")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {CONTACT_WHATSAPP && (
                  <a
                    href={`https://wa.me/${CONTACT_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp: {formatPhone(CONTACT_WHATSAPP)}
                  </a>
                )}
                {CONTACT_EMAIL && (
                  <>
                    <span className="hidden sm:inline text-muted-foreground">·</span>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand-secondary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {CONTACT_EMAIL}
                    </a>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <a href={homeHref}>
            <Button
              size="lg"
              className="min-h-[44px] text-base bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 border-0"
            >
              {t("public.consultation_thanks.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
