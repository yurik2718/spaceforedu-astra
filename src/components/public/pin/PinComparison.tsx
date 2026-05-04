import { Check, X } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { PinSectionHead } from "@/components/public/pin/PinSectionHead";
import { useTranslation } from "@/lib/i18n/react";

export function PinComparison({
  prefix,
  rowCount = 5,
  background = "soft",
}: {
  prefix: string;
  rowCount?: number;
  background?: "soft" | "white";
}) {
  const { t } = useTranslation();
  const rows = Array.from({ length: rowCount }, (_, i) => i + 1);

  const sectionBg =
    background === "white" ? "bg-white" : "bg-[var(--surface-soft)]";

  return (
    <section className={`py-16 sm:py-20 ${sectionBg}`}>
      <Container>
        <PinSectionHead
          title1={t(`${prefix}.pin_compare_title_1`)}
          accent={t(`${prefix}.pin_compare_title_accent`)}
          sub={t(`${prefix}.pin_compare_sub`)}
        />
        <Reveal direction="up">
          <div className="bg-white rounded-[32px] overflow-hidden border border-[var(--hairline-soft)]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-[var(--surface-card)] border-b border-[var(--hairline)]">
              <div className="px-4 sm:px-6 py-5 text-[13px] font-semibold text-[var(--mute)]">
                &nbsp;
              </div>
              <div className="px-4 sm:px-6 py-5 text-[14px] sm:text-[16px] font-semibold text-[var(--ink)]">
                {t(`${prefix}.pin_compare_them`)}
              </div>
              <div className="px-4 sm:px-6 py-5 text-[14px] sm:text-[16px] font-bold text-[var(--primary)]">
                {t(`${prefix}.pin_compare_us`)}
              </div>
            </div>
            {rows.map((n) => (
              <div
                key={n}
                className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--hairline-soft)] last:border-b-0"
              >
                <div className="px-4 sm:px-6 py-4 text-[14px] font-semibold text-[var(--ink)]">
                  {t(`${prefix}.pin_compare_row_${n}_label`)}
                </div>
                <div className="px-4 sm:px-6 py-4 text-[14px] text-[var(--mute)]">
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[var(--surface-card)] text-[var(--ash)] mr-2 align-middle shrink-0">
                    <X className="h-3 w-3" />
                  </span>
                  {t(`${prefix}.pin_compare_row_${n}_them`)}
                </div>
                <div
                  className="px-4 sm:px-6 py-4 text-[14px] font-semibold text-[var(--ink)]"
                  style={{ background: "rgba(232,69,60,0.04)" }}
                >
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[var(--success-pale)] text-[var(--success-deep)] mr-2 align-middle shrink-0">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t(`${prefix}.pin_compare_row_${n}_us`)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
