import { type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/public/animations";
import { Container } from "@/components/public/shared";

export interface CrossSellLink {
  label: string;
  href: string;
}

export function CrossSellCard({
  title,
  description,
  links,
  badgeLabel,
  badgeIcon: BadgeIcon,
}: {
  title: string;
  description: string;
  links: CrossSellLink[];
  badgeLabel: string;
  badgeIcon: LucideIcon;
}) {
  return (
    <section className="py-12 sm:py-16 bg-[var(--surface-soft)]">
      <Container>
        <Reveal direction="up">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[var(--hairline-soft)]">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-blue)] mb-4">
              <BadgeIcon aria-hidden="true" className="h-3.5 w-3.5" />
              {badgeLabel}
            </span>
            <h3 className="font-display text-[24px] sm:text-[32px] font-bold tracking-[-0.025em] leading-[1.15] text-[var(--ink)] m-0 mb-3 max-w-2xl">
              {title}
            </h3>
            <p className="text-[15px] leading-[1.55] text-[var(--mute)] m-0 mb-5 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 bg-[var(--surface-card)] hover:bg-[var(--secondary-bg)] rounded-full px-4 py-2 text-[14px] font-bold text-[var(--ink)] transition-colors duration-150"
                >
                  {label}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
