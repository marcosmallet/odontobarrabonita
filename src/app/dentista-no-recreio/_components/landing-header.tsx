import { MapPin, MessageCircle } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { ConversionLink } from "@/components/conversion-link";
import { WhatsAppChooserTrigger } from "@/components/whatsapp-chooser";
import { campaignWhatsappMessage, mapsUrl } from "@/lib/site-data";

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 shadow-[0_10px_40px_rgba(15,83,78,0.1)] backdrop-blur-xl sm:px-6">
        <ClinicLogo href="/" />
        <div className="flex items-center gap-2">
          <ConversionLink
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName="directions_click"
            eventParams={{
              cta_location: "header",
              destination: "google_maps",
            }}
            className="hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-petroleum transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise sm:inline-flex"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Como chegar
          </ConversionLink>
          <WhatsAppChooserTrigger
            message={campaignWhatsappMessage}
            tracking={{ ctaLocation: "header" }}
            className="button-primary h-11 px-4 text-sm sm:px-5"
          >
            <MessageCircle className="hidden size-4 sm:block" aria-hidden="true" />
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar avaliação</span>
          </WhatsAppChooserTrigger>
        </div>
      </div>
    </header>
  );
}

