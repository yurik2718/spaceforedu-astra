import { Star } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { PinSectionHead } from "@/components/public/pin/PinSectionHead";
import { useTranslation } from "@/lib/i18n/react";

export function PinTestimonials({
  prefix,
  count = 3,
  background = "soft",
}: {
  prefix: string;
  count?: number;
  background?: "soft" | "white";
}) {
  const { t } = useTranslation();
  const sectionBg =
    background === "white" ? "bg-white" : "bg-[var(--surface-soft)]";

  return (
    <section className={`py-16 sm:py-20 ${sectionBg}`}>
      <Container>
        <PinSectionHead
          title1={t(`${prefix}.pin_test_title_1`)}
          accent={t(`${prefix}.pin_test_title_accent`)}
          sub={t(`${prefix}.pin_test_sub`)}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: count }, (_, idx) => idx + 1).map((n, i) => (
            <Reveal key={n} direction="up" delay={i * 80}>
              <article className="bg-white rounded-[32px] p-7 flex flex-col gap-4 border border-[var(--hairline-soft)] h-full">
                <div className="flex gap-0.5 text-[var(--primary)]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-[16px] leading-[1.5] text-[var(--body-color)] font-medium flex-1 m-0">
                  {t(`${prefix}.pin_test_${n}_quote`)}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--hairline-soft)]">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold font-display text-[16px]"
                    style={{ background: "linear-gradient(135deg,#c9a07f,#7a523a)" }}
                    aria-hidden="true"
                  >
                    {t(`${prefix}.pin_test_${n}_initials`)}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--ink)]">
                      {t(`${prefix}.pin_test_${n}_name`)}
                    </div>
                    <div className="text-[12px] text-[var(--mute)]">
                      {t(`${prefix}.pin_test_${n}_where`)}
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
