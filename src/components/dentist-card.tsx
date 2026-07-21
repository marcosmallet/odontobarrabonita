import { ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import { ConversionLink } from "./conversion-link";
import { buildWhatsappUrl, type Dentist } from "@/lib/site-data";
import carlosPortrait from "../../public/images/profissionais/carlos-rocha.webp";
import franciscoPortrait from "../../public/images/profissionais/francisco-calheiros.webp";
import marciaPortrait from "../../public/images/profissionais/marcia-rocha.webp";

const portraits = {
  carlos: carlosPortrait,
  francisco: franciscoPortrait,
  marcia: marciaPortrait,
} satisfies Record<Dentist["id"], typeof carlosPortrait>;

type DentistCardProps = {
  dentist: Dentist;
  whatsappMessage?: string;
  trackingLocation?: string;
  showPhoneLink?: boolean;
};

export function DentistCard({
  dentist,
  whatsappMessage,
  trackingLocation,
  showPhoneLink = false,
}: DentistCardProps) {
  const portrait = portraits[dentist.id];
  const whatsappUrl = whatsappMessage
    ? buildWhatsappUrl(dentist.phoneInternational, whatsappMessage)
    : dentist.whatsappUrl;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-petroleum">
        <Image
          src={portrait}
          alt={`Retrato profissional de ${dentist.name}`}
          className="h-full w-full object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-petroleum/70 to-transparent"
          aria-hidden="true"
        />
        <p className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-petroleum/80 px-4 py-2 text-xs font-medium text-white backdrop-blur">
          {dentist.cro}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow">{dentist.cro}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-petroleum">
          {dentist.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-turquoise-dark">
          {dentist.role}
        </p>
        <p className="mt-4 flex-1 text-[0.95rem] leading-7 text-graphite/75">
          {dentist.description}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <ConversionLink
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName={trackingLocation ? "whatsapp_click" : undefined}
            eventParams={
              trackingLocation
                ? {
                    cta_location: trackingLocation,
                    dentist_id: dentist.id,
                  }
                : undefined
            }
            className="button-primary w-full text-sm"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Falar pelo WhatsApp
          </ConversionLink>
          {showPhoneLink ? (
            <ConversionLink
              href={`tel:${dentist.phoneInternational}`}
              eventName="phone_click"
              eventParams={{
                cta_location: trackingLocation ?? "professional_card",
                dentist_id: dentist.id,
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-petroleum transition-colors hover:border-turquoise hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
            >
              Ligar para {dentist.shortName}
            </ConversionLink>
          ) : null}
          <a
            href={dentist.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-graphite/65 transition-colors hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
          >
            Ver mais informações
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
