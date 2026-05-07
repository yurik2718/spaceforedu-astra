import { type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";
import { PinSectionHead } from "@/components/public/pin/PinSectionHead";
import { useTranslation } from "@/lib/i18n/react";

export interface PinServiceItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  metaKey: string;
  href?: string;
}

export function PinServicesCard({
  item,
  delay = 0,
  arrowKey,
  arrowGlyph,
}: {
  item: PinServiceItem;
  delay?: number;
  arrowKey?: string;
  arrowGlyph?: string;
}) {
  const { t } = useTranslation();
  const { icon: Icon, titleKey, descKey, metaKey, href } = item;
  const arrow = arrowKey ? t(arrowKey) : (arrowGlyph ?? "→");

  const inner = (
    <div className="flex flex-col gap-3.5 h-full">
      <div className="w-11 h-11 rounded-2xl bg-[var(--surface-card)] text-[var(--primary)] flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-[20px] font-semibold text-[var(--ink)] tracking-[-0.01em] m-0">
        {t(titleKey)}
      </h3>
      <p className="text-[14px] leading-[1.5] text-[var(--mute)] flex-1 m-0">
        {t(descKey)}
      </p>
      <div className="flex items-center justify-between text-[13px] font-bold text-[var(--ink)]">
        {t(metaKey) && <span className="text-[var(--mute)] font-medium">{t(metaKey)}</span>}
        {href && (
          <span className="inline-flex items-center gap-1.5 text-[var(--ink-soft)]">
            {arrow}
          </span>
        )}
      </div>
    </div>
  );

  const cls =
    "block h-full bg-white rounded-2xl p-7 border border-[var(--hairline-soft)] hover:border-[var(--ash)] hover:-translate-y-0.5 transition-all duration-200 group";

  return (
    <Reveal direction="up" delay={delay}>
      {href ? (
        <a href={href} className={cls}>
          {inner}
        </a>
      ) : (
        <div className={cls.replace("block ", "")}>{inner}</div>
      )}
    </Reveal>
  );
}

export function PinServicesGrid({
  prefix,
  items,
  columns = 3,
  headingAlign = "split",
  background = "soft",
}: {
  prefix: string;
  items: readonly PinServiceItem[];
  columns?: 2 | 3 | 4;
  headingAlign?: "split" | "center";
  background?: "soft" | "white";
}) {
  const { t } = useTranslation();
  const colCls =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-3";
  const sectionBg =
    background === "white" ? "bg-white" : "bg-[var(--surface-soft)]";
  const arrowKey = `${prefix}.pin_service_arrow`;

  return (
    <section className={`py-16 sm:py-20 ${sectionBg}`}>
      <Container>
        <PinSectionHead
          title1={t(`${prefix}.pin_services_title_1`)}
          accent={t(`${prefix}.pin_services_title_accent`)}
          sub={t(`${prefix}.pin_services_sub`)}
          align={headingAlign}
        />
        <div className={`grid gap-4 ${colCls}`}>
          {items.map((item, i) => (
            <PinServicesCard
              key={item.titleKey}
              item={item}
              delay={i * 80}
              arrowKey={arrowKey}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
