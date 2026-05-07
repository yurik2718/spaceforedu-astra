import { useEffect, useRef, useState } from "react";

const SPAIN = { x: 979, y: 236 };

const SOURCES = [
  // Latin America
  { x: 449, y: 336, delay: 0 },    // Mexico City
  { x: 542, y: 318, delay: 150 },  // Havana
  { x: 629, y: 378, delay: 300 },  // Caracas
  { x: 589, y: 406, delay: 450 },  // Bogotá
  { x: 572, y: 486, delay: 600 },  // Lima
  { x: 734, y: 503, delay: 750 },  // Brasília
  { x: 607, y: 588, delay: 900 },  // Santiago
  { x: 676, y: 593, delay: 1050 }, // Buenos Aires
  // Eastern Europe / CIS
  { x: 1153, y: 172, delay: 80 },  // Minsk
  { x: 1169, y: 188, delay: 220 }, // Kyiv
  { x: 1209, y: 163, delay: 370 }, // Moscow
  { x: 1249, y: 230, delay: 510 }, // Tbilisi
  { x: 1247, y: 237, delay: 650 }, // Yerevan
  { x: 1397, y: 185, delay: 800 }, // Nur-Sultan
];

// Higher arc coefficient (0.42) for an elegant sweeping curve.
function arcD(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return `M${from.x},${from.y} Q${mx},${my - dist * 0.42} ${to.x},${to.y}`;
}

const DASH = 3000;

export function WorldMapArcs({ src = "/images/world.svg" }: { src?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) { setActive(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <img src={src} alt="" aria-hidden className="w-full block" />

      <svg
        viewBox="0 0 2000 857"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          {SOURCES.map((s, i) => (
            // Per-arc gradient: fades in from source, peaks near midpoint,
            // tapers off to near-transparent approaching Spain so arcs
            // don't create a harsh starburst at the destination.
            <linearGradient
              key={i}
              id={`ag${i}`}
              gradientUnits="userSpaceOnUse"
              x1={s.x} y1={s.y}
              x2={SPAIN.x} y2={SPAIN.y}
            >
              <stop offset="0%"   stopColor="#E8453C" stopOpacity={0} />
              <stop offset="20%"  stopColor="#E8453C" stopOpacity={0.45} />
              <stop offset="65%"  stopColor="#E8453C" stopOpacity={0.38} />
              <stop offset="100%" stopColor="#E8453C" stopOpacity={0.08} />
            </linearGradient>
          ))}
        </defs>

        {SOURCES.map((s, i) => {
          const d = arcD(s, SPAIN);
          const dashStyle: React.CSSProperties = reduced
            ? {}
            : {
                strokeDasharray: DASH,
                strokeDashoffset: active ? 0 : DASH,
                transition: active
                  ? `stroke-dashoffset 2s cubic-bezier(0.25,0.1,0.25,1) ${s.delay}ms`
                  : "none",
              };

          return (
            <g key={i}>
              {/* Arc — thin, gradient stroke, no glow */}
              <path
                d={d}
                fill="none"
                stroke={`url(#ag${i})`}
                strokeWidth={0.75}
                strokeLinecap="round"
                style={dashStyle}
              />

              {/* Traveling dot — small and subtle */}
              {active && !reduced && (
                <circle r={2} fill="#E8453C" opacity={0.7}>
                  <animateMotion
                    path={d}
                    dur="2s"
                    begin={`${s.delay / 1000}s`}
                    fill="freeze"
                  />
                </circle>
              )}

              {/* Source dot — tiny, accent blue */}
              <circle
                cx={s.x}
                cy={s.y}
                r={2.5}
                fill="#2D7FF9"
                style={{
                  opacity: active ? 0.65 : 0,
                  transition: `opacity 0.5s ease ${s.delay + (reduced ? 0 : 1800)}ms`,
                }}
              />
            </g>
          );
        })}

        {/* Spain — delicate pulsing rings */}
        {active && !reduced && [0, 900, 1800].map((offset) => (
          <circle
            key={offset}
            cx={SPAIN.x}
            cy={SPAIN.y}
            r={5}
            fill="none"
            stroke="#E8453C"
            strokeWidth={0.8}
            opacity={0}
          >
            <animate attributeName="r"       from={5} to={28}    dur="2.8s" begin={`${offset}ms`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0"      dur="2.8s" begin={`${offset}ms`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Spain — center dot */}
        <circle
          cx={SPAIN.x} cy={SPAIN.y} r={4.5}
          fill="#E8453C"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        <circle
          cx={SPAIN.x} cy={SPAIN.y} r={2}
          fill="white"
          style={{ opacity: active ? 0.85 : 0, transition: "opacity 0.4s ease" }}
        />
      </svg>
    </div>
  );
}
