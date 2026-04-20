import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/public/animations";
import { useTranslation } from "@/lib/i18n/react";

interface TestimonialsSectionProps {
  translationPrefix: string;
  count?: number;
}

export function TestimonialsSection({
  translationPrefix,
  count = 3,
}: TestimonialsSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
      {Array.from({ length: count }, (_, idx) => {
        const i = idx + 1;
        return (
          <Reveal key={i} direction="up" delay={i * 120}>
            <Card className="h-full border bg-white transition-all duration-300 hover:shadow-lg hover:shadow-brand-secondary/5">
              <CardContent className="p-6 flex flex-col h-full">
                <Quote
                  aria-hidden="true"
                  className="h-6 w-6 text-brand-secondary/20 mb-3 shrink-0"
                />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t(`${translationPrefix}.testimonial_${i}_text`)}
                </p>
                <div className="mt-4 pt-4 border-t flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center text-sm font-bold text-brand-secondary"
                  >
                    {t(`${translationPrefix}.testimonial_${i}_name`).charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {t(`${translationPrefix}.testimonial_${i}_name`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(`${translationPrefix}.testimonial_${i}_role`)}
                    </p>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label={t("public.testimonial_rating_label")}
                  className="flex gap-0.5 mt-3"
                >
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      aria-hidden="true"
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
