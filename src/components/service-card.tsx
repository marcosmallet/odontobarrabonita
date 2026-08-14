import {
  Activity,
  CircleDot,
  BrushCleaning,
  ScanFace,
  ShieldPlus,
  Smile,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { Service, ServiceIcon } from "@/lib/site-data";
import { WhatsAppChooserTrigger } from "./whatsapp-chooser";

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  braces: Smile,
  implant: CircleDot,
  endodontics: Activity,
  restoration: ShieldPlus,
  prosthesis: ScanFace,
  whitening: Sparkles,
  cleaning: BrushCleaning,
  botox: WandSparkles,
  facial: ScanFace,
};

type ServiceCardProps = {
  service: Service;
  whatsappMessage?: string;
  trackingLocation?: string;
  showDetailsLink?: boolean;
};

export function ServiceCard({
  service,
  whatsappMessage,
  trackingLocation,
  showDetailsLink = false,
}: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-turquoise/60 hover:shadow-[0_20px_50px_rgba(15,83,78,0.09)] sm:p-7">
      <span className="grid size-12 place-items-center rounded-2xl bg-mist text-petroleum transition-colors duration-200 group-hover:bg-turquoise group-hover:text-petroleum">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-xl font-semibold text-petroleum">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-graphite/75">
        {service.description}
      </p>
      <WhatsAppChooserTrigger
        dentistIds={service.whatsappDentistIds}
        message={whatsappMessage}
        tracking={
          trackingLocation
            ? {
                ctaLocation: trackingLocation,
                ctaType: "appointment",
                ctaText: "Agendar avaliação",
                serviceName: service.title,
              }
            : undefined
        }
        className="mt-6 inline-flex cursor-pointer items-center self-start rounded-lg py-1 text-sm font-semibold text-turquoise-dark underline decoration-turquoise/35 underline-offset-4 transition-colors hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
      >
        Agendar avaliação
      </WhatsAppChooserTrigger>
      {showDetailsLink && service.detailsHref && service.detailsLabel ? (
        <Link
          href={service.detailsHref}
          className="mt-3 inline-flex min-h-11 cursor-pointer items-center self-start rounded-lg py-2 text-sm font-semibold text-petroleum underline decoration-turquoise/35 underline-offset-4 transition-colors duration-200 hover:text-turquoise-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
        >
          {service.detailsLabel}
        </Link>
      ) : null}
    </article>
  );
}
