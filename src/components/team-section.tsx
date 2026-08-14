import { MessageCircle } from "lucide-react";
import Image from "next/image";
import teamImage from "../../public/images/equipe-clinica-odontologica-barra-bonita-recreio.webp";
import { WhatsAppChooserTrigger } from "./whatsapp-chooser";
import { defaultWhatsappMessage } from "@/lib/site-data";

const teamImageAlt =
  "Equipe da Clínica Odontológica Barra Bonita no Recreio dos Bandeirantes";

export function TeamSection() {
  return (
    <section
      id="equipe"
      aria-labelledby="team-section-title"
      data-testid="team-section"
      className="section-space border-y border-line bg-white"
    >
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-16 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">Nossa equipe</p>
            <h2
              id="team-section-title"
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl"
            >
              Cuidado realizado por profissionais experientes
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-graphite/75">
              Na Clínica Odontológica Barra Bonita, cada atendimento começa com
              uma avaliação individual, orientação clara e planejamento
              responsável. Nossa equipe reúne profissionais preparados para
              oferecer diferentes tratamentos odontológicos no Recreio dos
              Bandeirantes, Rio de Janeiro, sempre priorizando conforto,
              segurança e um atendimento próximo.
            </p>
          </div>

          <figure className="overflow-hidden rounded-[2.5rem] bg-mist shadow-[0_25px_70px_rgba(15,83,78,0.17)] lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Image
              src={teamImage}
              alt={teamImageAlt}
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 55vw"
              className="h-auto w-full"
            />
          </figure>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <WhatsAppChooserTrigger
              message={defaultWhatsappMessage}
              tracking={{
                ctaLocation: "team_section",
                ctaType: "appointment",
                ctaText: "Agendar uma avaliação",
                service: "geral",
              }}
              className="button-primary w-full sm:w-auto"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Agendar uma avaliação
            </WhatsAppChooserTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
