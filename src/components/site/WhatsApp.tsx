import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink, waMessage, type Audience } from "@/lib/site";

export function WaButton({
  service, audience, extra, label = "Enquire on WhatsApp", className, variant = "solid",
}: { service?: string; audience?: Audience; extra?: string; label?: string; className?: string; variant?: "solid" | "outline" }) {
  return (
    <a
      href={waLink(waMessage({ service, audience, extra }))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}${service ? ` – ${service}` : ""}${audience ? (audience === "commercial" ? ", commercial enquiry" : ", home enquiry") : ""} (opens WhatsApp in a new tab)`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors",
        variant === "solid" ? "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90" : "border border-current hover:bg-foreground/5",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" /> {label}
    </a>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={waLink(waMessage({}))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Charos Services on WhatsApp (opens in a new tab)"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
