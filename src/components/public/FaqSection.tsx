import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/public/animations";
import { useTranslation } from "@/lib/i18n/react";

interface FaqSectionProps {
  translationPrefix: string;
  count: number;
}

export function FaqSection({ translationPrefix, count }: FaqSectionProps) {
  const { t } = useTranslation();

  return (
    <Reveal direction="up" delay={100}>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {Array.from({ length: count }, (_, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {t(`${translationPrefix}.faq_${i + 1}_q`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t(`${translationPrefix}.faq_${i + 1}_a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Reveal>
  );
}
