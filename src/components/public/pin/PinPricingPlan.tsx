import { Check } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { ConsultationDialog } from "@/components/public/ConsultationDialog";

export function PinPricingPlan({
  title,
  desc,
  price,
  unit,
  features,
  cta,
  ctaVariant,
  ctaHref,
  featured = false,
  popLabel,
  footnote,
}: {
  title: string;
  desc: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  ctaVariant: "primary" | "secondary";
  ctaHref?: string;
  featured?: boolean;
  popLabel?: string;
  footnote?: string;
}) {
  const cardBg = featured ? "bg-[var(--ink)]" : "bg-white";
  const titleColor = featured ? "text-white" : "text-[var(--ink)]";
  const descColor = featured ? "text-[var(--on-dark-mute)]" : "text-[var(--mute)]";
  const featBorder = featured ? "border-white/12" : "border-[var(--hairline-soft)]";
  const featTextColor = featured ? "text-white" : "text-[var(--body-color)]";
  const priceUnitColor = featured ? "text-[var(--on-dark-mute)]" : "text-[var(--mute)]";

  const btnClass =
    ctaVariant === "primary"
      ? "pin-btn pin-btn-primary h-11 w-full"
      : "pin-btn pin-btn-secondary h-11 w-full";

  const ctaBtn = ctaHref ? (
    <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="block">
      <button className={btnClass}>{cta}</button>
    </a>
  ) : ctaVariant === "primary" ? (
    <ConsultationDialog>
      <button className={btnClass}>{cta}</button>
    </ConsultationDialog>
  ) : (
    <ConsultationDialog>
      <button className={btnClass}>{cta}</button>
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
        {footnote && (
          <p className={`text-[11px] leading-[1.4] -mt-2 mb-1 ${featured ? "text-[var(--on-dark-mute)]" : "text-[var(--ash)]"}`}>
            {footnote}
          </p>
        )}
        {ctaBtn}
      </div>
    </Reveal>
  );
}
