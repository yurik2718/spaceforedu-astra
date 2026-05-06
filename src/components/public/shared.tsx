import { forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/public/animations";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function FeatureIcon({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary",
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-6 w-6" />
    </div>
  );
}

export const GradientButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function GradientButton({ className, children, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold px-6 py-3 text-base min-h-[44px] transition-opacity hover:opacity-90 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export function OutlineCtaButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border-2 border-white text-white font-semibold px-6 py-3 text-base min-h-[44px] transition-colors hover:bg-white hover:text-brand-primary",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function PublicSection({
  children,
  className,
  dots = false,
}: {
  children: React.ReactNode;
  className?: string;
  dots?: boolean;
}) {
  return (
    <section className={cn("py-16 sm:py-24 relative", className)}>
      {dots && (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      <Container className="relative">{children}</Container>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16 max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <Reveal direction="up">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </Reveal>
    </div>
  );
}

export function PublicHero({
  title1,
  titleAccent,
  subtitle,
  actions,
  footer,
  illustration,
  fullBleed = false,
}: {
  title1: string;
  titleAccent: string;
  subtitle: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  illustration?: React.ReactNode;
  fullBleed?: boolean;
}) {
  return (
    <section
      className={cn(
        "bg-[var(--surface-soft)] pt-16 pb-8 sm:pt-20",
        fullBleed && "overflow-hidden",
      )}
    >
      <Container>
        <div
          className={cn(
            "grid gap-12 lg:gap-16 items-center",
            illustration ? "lg:grid-cols-[1.1fr_1fr]" : "max-w-3xl",
          )}
        >
          <div>
            <Reveal direction="up">
              <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[64px] font-semibold tracking-[-0.022em] text-[var(--ink)] leading-[1.05]">
                {title1}{" "}
                <span className="text-[var(--primary)]">{titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={80}>
              <div className="mt-5 text-[18px] leading-[1.5] text-[var(--mute)] max-w-[520px]">
                {subtitle}
              </div>
            </Reveal>
            {actions && (
              <Reveal direction="up" delay={160}>
                <div className="mt-8">{actions}</div>
              </Reveal>
            )}
            {footer && (
              <Reveal direction="up" delay={220}>
                <div className="mt-6">{footer}</div>
              </Reveal>
            )}
          </div>
          {illustration && (
            <Reveal direction="left" delay={100}>
              {illustration}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

export function PublicCta({
  title,
  subtitle,
  bgImage,
  overlayClass = "bg-brand-primary/60",
  children,
}: {
  title: string;
  subtitle?: string;
  bgImage?: string;
  overlayClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className={cn("absolute inset-0", overlayClass)} />
      <Container className="relative text-center text-white">
        <Reveal direction="up">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">{subtitle}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
