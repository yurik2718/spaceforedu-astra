import { useEffect, useState } from "react";
import { Clock, Flame, MessageCircle, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CONTACT_WHATSAPP } from "@/lib/constants";
import { whatsappLink } from "@/lib/routes";
import { useTranslation } from "@/lib/i18n/react";

const CONSULTATION_ITEMS = [
  "consultation_dialog_item_1",
  "consultation_dialog_item_2",
  "consultation_dialog_item_3",
  "consultation_dialog_item_4",
] as const;

const SPOTS_THIS_WEEK = 3;
const SUCCESS_AUTO_CLOSE_MS = 2500;

/**
 * Reads strings under `public.homologacion.consultation_dialog_*` regardless
 * of which page opens the dialog — the copy is service-agnostic.
 */
export function ConsultationDialog({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const prefix = "public.homologacion";
  const waText = t(`${prefix}.consultation_dialog_wa_message`);
  const href = CONTACT_WHATSAPP ? whatsappLink(CONTACT_WHATSAPP, waText) : "#";

  // Reset success state whenever the dialog fully closes.
  useEffect(() => {
    if (!open && success) {
      const id = window.setTimeout(() => setSuccess(false), 200);
      return () => window.clearTimeout(id);
    }
  }, [open, success]);

  function handleWhatsAppClick() {
    setSuccess(true);
    window.setTimeout(() => setOpen(false), SUCCESS_AUTO_CLOSE_MS);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto inline-flex rounded-full bg-[var(--success-pale)] p-4">
              <CheckCircle2 className="h-10 w-10 text-[var(--success-deep)]" />
            </div>
            <DialogTitle className="text-xl">
              {t("public.consultation_success.title")}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {t("public.consultation_success.desc")}
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">
                {t(`${prefix}.consultation_dialog_title`)}
              </DialogTitle>
              <DialogDescription>
                {t(`${prefix}.consultation_dialog_desc`)}
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {t(`${prefix}.consultation_dialog_duration`)}
              </Badge>
            </div>

            <div className="space-y-3">
              {CONSULTATION_ITEMS.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--success-deep)] mt-0.5 shrink-0" />
                  <span className="text-sm">{t(`${prefix}.${key}`)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[var(--warn-pale)] border border-[var(--warn-hairline)] px-3 py-2">
              <Flame className="h-4 w-4 text-[var(--warn-amber)] shrink-0" />
              <span className="text-sm font-medium text-[var(--warn-amber)]">
                {t(`${prefix}.consultation_dialog_spots`, { count: SPOTS_THIS_WEEK })}
              </span>
            </div>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="block"
            >
              <Button
                size="lg"
                className="w-full min-h-[44px] text-base bg-[#25D366] hover:bg-[#1ebe57] border-0 transition-colors duration-150"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t(`${prefix}.consultation_dialog_wa_button`)}
              </Button>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              {t(`${prefix}.consultation_dialog_wa_hint`)}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
