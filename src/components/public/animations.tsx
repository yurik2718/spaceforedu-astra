import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Astro renders React components on the server, where useLayoutEffect would
// log a warning. Fall back to useEffect there; the hook only matters on the
// client anyway (we read DOM rects to suppress a hydration flash).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useInView(threshold = 0.1) {
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

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedRef.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const { ref, inView } = useInView();
  const [count, setCount] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setCount(value);
      return;
    }
    setCount(0);
    const duration = 1200;
    const step = 16;
    const increment = value / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

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
  const ref = useRef<HTMLDivElement>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [hidden, setHidden] = useState(false);

  // SSR renders the visible state (so non-JS users see content). On hydration
  // we only flip to the hidden state for elements that are actually below the
  // fold — otherwise above-fold content would flash invisible for one frame
  // before the IntersectionObserver async callback can restore it.
  // useLayoutEffect runs before paint, so the hidden state is committed
  // atomically with React's first reconciliation.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    setHidden(true);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const baseTransform = directionStyles[direction];
  const stateClass =
    !hidden || animateIn
      ? "opacity-100 translate-x-0 translate-y-0"
      : `opacity-0 ${baseTransform}`;

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${stateClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
