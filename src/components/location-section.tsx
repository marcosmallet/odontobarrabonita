import { Building2, ExternalLink, MapPin, MessageCircle } from "lucide-react";
import type { ConversionEventParams } from "@/lib/analytics";
import { clinic, mapsUrl } from "@/lib/site-data";
import { MapEmbed } from "./map-embed";
import { ConversionLink } from "./conversion-link";

export function LocationSection({
  trackingLocation,
  title = "Fácil de encontrar no Recreio",
  trackingEventParams,
  whatsappAction,
}: {
  trackingLocation?: string;
  title?: string;
  trackingEventParams?: Omit<ConversionEventParams, "cta_location">;
  whatsappAction?: {
    href: string;
    label: string;
    eventParams: ConversionEventParams;
  };
} = {}) {
  return (
    <section id="localizacao" className="section-space bg-mist/55">
      <div className="site-container">
        <div className="grid overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-[0_24px_70px_rgba(15,83,78,0.08)] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="eyebrow">Localização</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl">
              {title}
            </h2>
            <div className="mt-8 flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mist text-petroleum">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <address className="not-italic text-[0.95rem] leading-7 text-graphite/75">
                <strong className="block text-petroleum">{clinic.name}</strong>
                {clinic.building}
                <br />
                {clinic.street}
                <br />
                {clinic.neighborhood}, {clinic.city} - {clinic.region}
                <br />
                CEP: {clinic.postalCode}
              </address>
            </div>
            {!whatsappAction ? (
              <ConversionLink
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName={trackingLocation ? "directions_click" : undefined}
                eventParams={
                  trackingLocation
                    ? {
                        cta_location: trackingLocation,
                        cta_type: "directions",
                        cta_text: "Como chegar",
                        destination: "google_maps",
                        ...trackingEventParams,
                      }
                    : undefined
                }
                className="button-primary mt-8 self-start"
              >
                <MapPin className="size-5" aria-hidden="true" />
                Como chegar
                <ExternalLink className="size-4" aria-hidden="true" />
              </ConversionLink>
            ) : null}
            {whatsappAction ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ConversionLink
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName={trackingLocation ? "directions_click" : undefined}
                  eventParams={
                    trackingLocation
                      ? {
                          cta_location: trackingLocation,
                          cta_type: "directions",
                          cta_text: "Como chegar",
                          destination: "google_maps",
                          ...trackingEventParams,
                        }
                      : undefined
                  }
                  className="button-secondary"
                >
                  <MapPin className="size-5" aria-hidden="true" />
                  Como chegar
                  <ExternalLink className="size-4" aria-hidden="true" />
                </ConversionLink>
                <ConversionLink
                  href={whatsappAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventParams={{ cta_text: whatsappAction.label, cta_type: "appointment", ...whatsappAction.eventParams }}
                  className="button-primary"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  {whatsappAction.label}
                </ConversionLink>
              </div>
            ) : null}
            {whatsappAction ? (
              <p className="mt-4 text-sm leading-6 text-graphite/65">
                Atendimento mediante agendamento.
              </p>
            ) : null}
          </div>
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
