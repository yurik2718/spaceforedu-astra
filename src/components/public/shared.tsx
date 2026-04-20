import { ArrowRight, ChevronDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  GradientOrbs,
  FloatingElements,
  Spotlight,
  DotGrid,
} from "@/components/public/animations";
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
        "group relative overflow-hidden min-h-[44px] text-base bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 border-0 shadow-lg shadow-brand-secondary/20 hover:shadow-xl hover:shadow-brand-secondary/30 transition-all duration-300",
        className,
      )}
      {...rest}
    >
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        style={{ backgroundSize: "200% 100%", animation: "shimmer 3s ease-in-out infinite" }}
      />
      <span className="relative flex items-center">
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
        "relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-24 lg:py-32 overflow-hidden flex items-center",
        fullBleed
          ? "min-h-[calc(100dvh-4rem)]"
          : "min-h-[60vh] sm:min-h-[80vh]",
      )}
    >
      <Spotlight />
      <FloatingElements />
      <DotGrid className="opacity-[0.25]" />
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
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {title1}{" "}
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
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
      <div className="rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/70 p-1.5 shadow-sm">
        <ChevronDown className="h-4 w-4 text-brand-secondary" strokeWidth={2.5} />
      </div>
    </div>
  );
}

export function PublicCta({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-white overflow-hidden">
      <GradientOrbs />
      <DotGrid className="opacity-[0.08]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent" />
      <Container className="relative text-center">
        <Reveal direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
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
        "absolute z-20 bg-white border border-slate-100 rounded-xl flex items-center gap-2 text-xs",
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
        className="w-full sm:w-auto min-h-[44px] text-base border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300"
      >
        {children}
      </Button>
    </a>
  );
}

export function PublicSection({
  children,
  className,
  dots = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dots?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-32 relative", className)}>
      {dots && <DotGrid className="opacity-[0.2]" />}
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
        "inline-flex shrink-0 rounded-lg bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10",
        wrap,
        hoverScale && "transition-transform duration-300 group-hover:scale-110",
        className,
      )}
    >
      <Icon className={cn(glyph, "text-brand-secondary")} />
    </div>
  );
}
