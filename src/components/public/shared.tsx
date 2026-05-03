import { ArrowRight, ChevronDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/public/animations";
import { cn } from "@/lib/utils";

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

export function GradientButton({
  children,
  href,
  className,
  external = false,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  external?: boolean;
} & Omit<React.ComponentProps<typeof Button>, "size">) {
  const btn = (
    <Button
      size="lg"
      className={cn(
        "group min-h-[44px] h-12 px-6 text-[15px] font-bold bg-brand-primary text-white border-0 rounded-2xl hover:bg-[var(--color-brand-primary-pressed)] active:bg-[var(--color-brand-primary-pressed)] transition-colors duration-150",
        className,
      )}
      {...rest}
    >
      <span className="flex items-center">
        {children}
        <ArrowRight
          aria-hidden="true"
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Button>
  );
  if (!href) return btn;
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {btn}
    </a>
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
  const hasIllustration = !!illustration;

  return (
    <section
      className={cn(
        "relative bg-[var(--surface-soft)] py-16 sm:py-24 lg:py-32 overflow-hidden flex items-center",
        fullBleed
          ? "min-h-[calc(100dvh-4rem)]"
          : "min-h-[60vh] sm:min-h-[80vh]",
      )}
    >
      <Container className="relative">
        <div
          className={
            hasIllustration
              ? "grid gap-12 lg:grid-cols-2 lg:items-center"
              : undefined
          }
        >
          <div className={hasIllustration ? undefined : "max-w-3xl"}>
            <Reveal direction="up">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[var(--ink)] leading-[1.05]">
                {title1}{" "}
                <span className="text-[var(--primary)]">
                  {titleAccent}
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </Reveal>
            {actions && (
              <Reveal direction="up" delay={200}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">{actions}</div>
              </Reveal>
            )}
            {footer && (
              <Reveal direction="up" delay={300}>
                <div className="mt-10">{footer}</div>
              </Reveal>
            )}
          </div>
          {illustration && (
            <Reveal direction="right" delay={100}>
              {illustration}
            </Reveal>
          )}
        </div>
      </Container>
      {fullBleed && <ScrollHint />}
    </section>
  );
}

function ScrollHint() {
  return (
    <div
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 pointer-events-none animate-[bounce_2s_ease-in-out_infinite]"
      aria-hidden="true"
    >
      <div className="rounded-full bg-white border border-[var(--hairline-soft)] p-1.5">
        <ChevronDown className="h-4 w-4 text-[var(--primary)]" strokeWidth={2.5} />
      </div>
    </div>
  );
}

export function PublicCta({
  title,
  subtitle,
  children,
  bgImage,
  overlayClass = "bg-zinc-900/62",
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bgImage?: string;
  overlayClass?: string;
}) {
  return (
    <section className="relative py-20 sm:py-32 bg-[var(--surface-dark)] text-white overflow-hidden">
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={cn("absolute inset-0", overlayClass)} />
        </>
      )}
      <Container className="relative text-center">
        <Reveal direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-lg">{title}</h2>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto drop-shadow">{subtitle}</p>
        </Reveal>
        <Reveal direction="up" delay={200}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FloatingBadge({
  className,
  duration = 6,
  delay = 0,
  children,
}: {
  className?: string;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 bg-white border border-[var(--hairline-soft)] rounded-full px-4 py-2.5 flex items-center gap-2 text-xs font-bold text-[var(--ink)] shadow-sm",
        className,
      )}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        ...(delay ? { animationDelay: `${delay}s` } : {}),
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function OutlineCtaButton({
  children,
  href,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto min-h-[44px] text-base bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all duration-300"
      >
        {children}
      </Button>
    </a>
  );
}

export function PublicSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  /** No-op now; kept for back-compat with existing call sites. */
  dots?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-32 relative", className)}>
      <Container className="relative">{children}</Container>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <Reveal direction="up">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}

const sizeClasses = {
  sm: { wrap: "p-2", glyph: "h-5 w-5" },
  md: { wrap: "p-2.5", glyph: "h-5 w-5" },
  lg: { wrap: "p-3", glyph: "h-6 w-6" },
} as const;

export function FeatureIcon({
  icon: Icon,
  size = "lg",
  hoverScale = true,
  className,
}: {
  icon: LucideIcon;
  size?: keyof typeof sizeClasses;
  hoverScale?: boolean;
  className?: string;
}) {
  const { wrap, glyph } = sizeClasses[size];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 rounded-2xl bg-[var(--surface-card)]",
        wrap,
        hoverScale && "transition-transform duration-300 group-hover:scale-110",
        className,
      )}
    >
      <Icon className={cn(glyph, "text-[var(--primary)]")} />
    </div>
  );
}
