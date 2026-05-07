import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";
import { whatsappLink } from "@/lib/routes";
import { CONTACT_WHATSAPP } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/react";

export function PinFinalCta({
  prefix,
  bgImage = "/images/lifestyle/salamanca-university-courtyard-sunset.webp",
  bgColor = "#C9342C",
  sideItemCount = 5,
  background = "soft",
}: {
  prefix: string;
  bgImage?: string;
  bgColor?: string;
  sideItemCount?: number;
  background?: "soft" | "white";
}) {
  const { t } = useTranslation();
  const waHref = CONTACT_WHATSAPP ? whatsappLink(CONTACT_WHATSAPP) : "#";
  const sectionBg =
    background === "white" ? "bg-white" : "bg-[var(--surface-soft)]";

  return (
    <section className={`py-12 sm:py-16 ${sectionBg}`}>
      <Container>
        <Reveal direction="up">
          <div
            className="relative rounded-[32px] p-10 sm:p-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center text-white overflow-hidden"
            style={{
              backgroundColor: bgColor,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "multiply",
            }}
          >
            <div>
              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[48px] font-bold tracking-[-0.025em] leading-[1.05] m-0 mb-4 text-white">
                {t(`${prefix}.pin_final_title`)}
              </h2>
              <p className="text-[16px] leading-[1.5] text-white/90 m-0 mb-6 max-w-[520px]">
                {t(`${prefix}.pin_final_sub`)}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ConsultationDialog>
                  <button className="pin-btn pin-btn-on-red h-12 px-6 text-[15px]">
                    {t(`${prefix}.pin_final_cta_primary`)}
                  </button>
                </ConsultationDialog>
                {waHref !== "#" && (
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    <button className="pin-btn pin-btn-on-red-ghost h-12 px-6 text-[15px]">
                      {t(`${prefix}.pin_final_cta_secondary`)}
                    </button>
                  </a>
                )}
              </div>
            </div>
            <div className="bg-black/25 border border-white/20 rounded-2xl p-6">
              <h3 className="text-[15px] font-bold text-white m-0 mb-2.5">
                {t(`${prefix}.pin_final_side_title`)}
              </h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {Array.from({ length: sideItemCount }, (_, i) => i + 1).map((n) => (
                  <li
                    key={n}
                    className="text-[13px] text-white/85 flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                    {t(`${prefix}.pin_final_side_${n}`)}
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
