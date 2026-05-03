import { Container } from "@/components/public/shared";
import { useTranslation } from "@/lib/i18n/react";

const UNIVERSITY_LOGOS = [
  { key: "ucm",  src: "/images/universities/ucm.png",  name: "Universidad Complutense de Madrid",     maxW: 110, heightClass: "h-14 sm:h-16" },
  { key: "usal", src: "/images/universities/usal.png", name: "Universidad de Salamanca",              maxW: 110, heightClass: "h-14 sm:h-16" },
  { key: "uam",  src: "/images/universities/uam.svg",  name: "Universidad Autónoma de Madrid",        maxW: 160, heightClass: "h-7 sm:h-9"   },
  { key: "ugr",  src: "/images/universities/ugr.svg",  name: "Universidad de Granada",                maxW: 110, heightClass: "h-14 sm:h-16" },
  { key: "ub",   src: "/images/universities/ub.svg",   name: "Universitat de Barcelona",              maxW: 130, heightClass: "h-7 sm:h-9"   },
  { key: "upm",  src: "/images/universities/upm.svg",  name: "Universidad Politécnica de Madrid",     maxW: 150, heightClass: "h-10 sm:h-12" },
  { key: "uc3m", src: "/images/universities/uc3m.svg", name: "Universidad Carlos III de Madrid",      maxW: 130, heightClass: "h-8 sm:h-10"  },
  { key: "upv",  src: "/images/universities/upv.svg",  name: "Universitat Politècnica de València",   maxW: 130, heightClass: "h-8 sm:h-10"  },
];

export function UniversityLogoBar({
  titleKey,
  noBorderTop = false,
}: {
  titleKey?: string;
  noBorderTop?: boolean;
} = {}) {
  const { t } = useTranslation();

  return (
    <section
      className={`${noBorderTop ? "border-b" : "border-y"} border-slate-100 py-8 sm:py-10 bg-white/80 overflow-hidden`}
    >
      <Container>
        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground mb-8 py-1">
          {t(titleKey ?? "public.precios.trust_bar_title")}
        </p>
      </Container>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div
          className="flex w-max animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS].map(
            ({ key, src, name, maxW, heightClass }, i) => (
              <div
                key={`${key}-${i}`}
                className="flex items-center justify-center px-6 sm:px-10 shrink-0"
              >
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  className={`${heightClass} w-auto object-contain grayscale opacity-70 transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-110`}
                  style={{ maxWidth: maxW }}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
