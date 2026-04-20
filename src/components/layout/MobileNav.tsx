import { useState } from "react";
import {
  Rocket,
  Menu,
  X,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

const NAV_ICONS: Record<string, React.ElementType> = {
  homologacion: GraduationCap,
  universidad: Building2,
  espanol: BookOpen,
  precios: CreditCard,
};

export default function MobileNav({
  locale,
  currentPath,
  navLabels,
  navHrefs,
  menuLabel,
  closeLabel,
  ctaLabel,
  ctaAriaLabel,
  waHref,
  whatsappPhone,
  whatsappFormatted,
}: {
  locale: string;
  currentPath: string;
  navLabels: Record<"homologacion" | "universidad" | "espanol" | "precios", string>;
  navHrefs: Record<
    "homologacion" | "universidad" | "espanol" | "precios" | "home",
    string
  >;
  menuLabel: string;
  closeLabel: string;
  ctaLabel: string;
  ctaAriaLabel: string;
  waHref: string;
  whatsappPhone: string;
  whatsappFormatted: string;
}) {
  const [open, setOpen] = useState(false);
  const keys = ["homologacion", "universidad", "espanol", "precios"] as const;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10"
          aria-label={menuLabel}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 flex flex-col p-0"
        showCloseButton={false}
      >
        <SheetTitle className="sr-only">{menuLabel}</SheetTitle>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <a
            href={navHrefs.home}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Rocket className="h-6 w-6 text-brand-primary" />
            <span className="text-lg font-bold tracking-tight">
              Space for <span className="text-brand-secondary">Edu</span>
            </span>
          </a>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 shrink-0"
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 px-3 pt-3 overflow-y-auto">
          {keys.map((key) => {
            const href = navHrefs[key];
            const Icon = NAV_ICONS[key];
            const isActive = currentPath.startsWith(href);
            const className = [
              "flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-colors min-h-[44px]",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            ].join(" ");
            return (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className={className}
              >
                <Icon
                  className={[
                    "h-5 w-5 shrink-0",
                    isActive ? "text-brand-primary" : "",
                  ].join(" ")}
                />
                {navLabels[key]}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto px-4 pb-6 pt-4 border-t space-y-3">
          {whatsappPhone && (
            <a
              href={`tel:+${whatsappPhone}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 text-base font-medium text-foreground min-h-[44px] px-1"
            >
              <Phone className="h-5 w-5 text-brand-secondary shrink-0" />
              <span>{whatsappFormatted}</span>
            </a>
          )}
          <div className="flex justify-start">
            <LanguageSwitcher locale={locale} currentPath={currentPath} />
          </div>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              aria-label={ctaAriaLabel}
              className="block"
            >
              <Button className="w-full min-h-[44px] gap-2 bg-green-600 hover:bg-green-700 border-0 text-white">
                <MessageCircle className="h-4 w-4" />
                {ctaLabel}
              </Button>
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
