import { useEffect, useRef, useState, useCallback } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

type FadeDirection = "up" | "down" | "left" | "right" | "none";

const directionStyles: Record<FadeDirection, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: FadeDirection;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);

  const baseTransform = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        inView
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${baseTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useInView(0.3);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-secondary/8 blur-[100px] animate-pulse" />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-primary/8 blur-[100px] animate-pulse"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-secondary/5 blur-[120px] animate-pulse"
        style={{ animationDelay: "2s", animationDuration: "4s" }}
      />
    </div>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-[0.4] ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

export function ShimmerBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group h-full ${className}`}>
      <div
        className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary opacity-30 group-hover:opacity-60 blur-[1px] transition-opacity duration-500"
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
        }}
      />
      <div className="relative bg-white rounded-xl h-full">{children}</div>
    </div>
  );
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 right-[15%] w-4 h-4 rounded-full border-2 border-brand-secondary/20"
        style={{ animation: "float 6s ease-in-out infinite" }}
      />
      <div
        className="absolute top-40 left-[10%] w-3 h-3 rounded-sm bg-brand-primary/10 rotate-45"
        style={{ animation: "float 8s ease-in-out infinite", animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 right-[20%] w-5 h-5 rounded-full border-2 border-brand-primary/15"
        style={{ animation: "float 7s ease-in-out infinite", animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 left-[25%] w-2 h-2 rounded-full bg-brand-secondary/15"
        style={{ animation: "float 5s ease-in-out infinite", animationDelay: "3s" }}
      />
    </div>
  );
}

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function Spotlight({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const blob = blobRef.current;
      if (!container || !blob) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - 300;
      const y = e.clientY - rect.top - 300;
      blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        ref={blobRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(45,127,249,0.06) 0%, transparent 70%)",
          transition: "transform 300ms ease-out",
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />
    </div>
  );
}
