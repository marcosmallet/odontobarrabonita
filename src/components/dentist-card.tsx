import { ExternalLink, MessageCircle } from "lucide-react";
import type { Dentist } from "@/lib/site-data";

export function DentistCard({ dentist }: { dentist: Dentist }) {
  const initials = dentist.name
    .replace(/^(Dr\.|Dra\.)\s+/, "")
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white">
      <div className="relative grid h-52 place-items-center overflow-hidden bg-gradient-to-br from-petroleum to-petroleum-light">
        <div
          className="absolute inset-0 opacity-50"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(76,194,183,.35), transparent 28%), radial-gradient(circle at 10% 90%, rgba(255,255,255,.12), transparent 35%)",
          }}
        />
        <span className="relative grid size-24 place-items-center rounded-full border border-white/20 bg-white/10 font-display text-3xl font-semibold tracking-wide text-white backdrop-blur">
          {initials}
        </span>
        <p className="absolute bottom-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
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
          <a
            href={dentist.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary w-full text-sm"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Falar pelo WhatsApp
          </a>
          <a
            href={dentist.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-graphite/65 transition-colors hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
          >
            Ver referência profissional
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
