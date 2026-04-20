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

/**
 * Reads strings under `public.homologacion.consultation_dialog_*` regardless
 * of which page opens the dialog — the copy is service-agnostic.
 */
export function ConsultationDialog({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const prefix = "public.homologacion";
  const waText = t(`${prefix}.consultation_dialog_wa_message`);
  const href = CONTACT_WHATSAPP ? whatsappLink(CONTACT_WHATSAPP, waText) : "#";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
              <CheckCircle2 className="h-4 w-4 text-brand-secondary mt-0.5 shrink-0" />
              <span className="text-sm">{t(`${prefix}.${key}`)}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
          <Flame className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="text-sm font-medium text-amber-800">
            {t(`${prefix}.consultation_dialog_spots`, { count: SPOTS_THIS_WEEK })}
          </span>
        </div>

        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            size="lg"
            className="w-full min-h-[44px] text-base bg-green-600 hover:bg-green-700 border-0 shadow-lg shadow-green-600/20 transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t(`${prefix}.consultation_dialog_wa_button`)}
          </Button>
        </a>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          {t(`${prefix}.consultation_dialog_wa_hint`)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
