import { useEffect, useRef, useState } from "react";

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
  const { ref, inView } = useInView();

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
