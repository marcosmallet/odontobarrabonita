import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import receptionImage from "../../../public/images/recepcao-clinica.webp";
import { ClinicGallery } from "@/components/clinic-gallery";
import { ConversionLink } from "@/components/conversion-link";
import { DentistCard } from "@/components/dentist-card";
import { FAQ } from "@/components/faq";
import { LocationSection } from "@/components/location-section";
import { ServiceCard } from "@/components/service-card";
import { WhatsAppChooserTrigger } from "@/components/whatsapp-chooser";
import {
  campaignWhatsappMessage,
  clinic,
  dentists,
  faqs,
  services,
  SITE_URL,
} from "@/lib/site-data";
import { LandingFooter } from "./_components/landing-footer";
import { LandingHeader } from "./_components/landing-header";

const pageUrl = `${SITE_URL}/dentista-no-recreio/`;

export const metadata: Metadata = {
  title: "Dentista no Recreio dos Bandeirantes | Clínica Barra Bonita",
  description:
    "Atendimento odontológico humanizado no Absolutto Business Towers, na Av. das Américas. Agende sua avaliação pelo WhatsApp.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: pageUrl,
    siteName: clinic.name,
    title: "Dentista no Recreio dos Bandeirantes",
    description:
      "Atendimento odontológico humanizado no Absolutto Business Towers. Agende sua avaliação pelo WhatsApp.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: clinic.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentista no Recreio dos Bandeirantes",
    description: "Atendimento odontológico no Recreio. Agende pelo WhatsApp.",
    images: ["/og-image.png"],
  },
};

const landingServices = services.slice(0, 6);
const landingFaqs = [faqs[0], faqs[1], faqs[5], faqs[6]];

const trustItems = [
  { icon: HeartHandshake, label: "Atendimento humanizado" },
  { icon: ShieldCheck, label: "Profissionais com CRO/RJ" },
  { icon: MapPin, label: "No Recreio" },
  { icon: CheckCircle2, label: "Avaliação individual" },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#clinic`,
  name: clinic.name,
  legalName: clinic.legalName,
  url: pageUrl,
  telephone: dentists.map((dentist) => dentist.phoneInternational),
  medicalSpecialty: "https://schema.org/Dentistry",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.street,
    addressLocality: clinic.city,
    addressRegion: clinic.region,
    postalCode: clinic.postalCode,
    addressCountry: clinic.country,
  },
  areaServed: "Recreio dos Bandeirantes",
  employee: dentists.map((dentist) => ({
    "@type": "Person",
    name: dentist.name,
    jobTitle: "Cirurgião-dentista",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CRO/RJ",
      value: dentist.cro.replace("CRO/RJ ", ""),
    },
  })),
};

export default function DentistaNoRecreioPage() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <LandingHeader />
      <main id="conteudo">
        <section
          id="inicio"
          data-landing-section="hero"
          className="relative isolate overflow-hidden bg-hero pt-32 sm:pt-36 lg:pt-40"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-28 top-16 size-96 rounded-full bg-turquoise/12 blur-3xl" />
            <div className="absolute -left-44 bottom-0 size-[30rem] rounded-full bg-white/70 blur-3xl" />
          </div>
          <div className="site-container grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-white/85 px-4 py-2 text-sm font-medium text-petroleum shadow-sm">
                <MapPin className="size-4 text-turquoise-dark" aria-hidden="true" />
                Clínica odontológica no Recreio
              </div>
              <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.55rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-petroleum">
                Dentista no <span className="text-turquoise-dark">Recreio dos Bandeirantes</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite/80 sm:text-xl">
                Atendimento odontológico humanizado no Absolutto Business Towers,
                na Av. das Américas. Agende sua avaliação pelo WhatsApp.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <WhatsAppChooserTrigger
                  message={campaignWhatsappMessage}
                  tracking={{ ctaLocation: "hero" }}
                  className="button-primary"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Agendar avaliação pelo WhatsApp
                </WhatsAppChooserTrigger>
                <ConversionLink
                  href="#profissionais"
                  className="button-secondary"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  Ver telefones
                </ConversionLink>
              </div>
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-white/75 p-4 text-sm leading-6 text-graphite/75 sm:max-w-xl">
                <Building2 className="mt-0.5 size-5 shrink-0 text-turquoise-dark" aria-hidden="true" />
                <p>
                  <strong className="block text-petroleum">Av. das Américas, 19005</strong>
                  Absolutto Business Towers · Torre 2 · Sala 403
                  <br />Recreio dos Bandeirantes
                </p>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[3rem] border border-turquoise/15" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-white/90 bg-petroleum shadow-[0_30px_80px_rgba(15,83,78,0.2)] lg:aspect-[4/5]">
                <Image
                  src={receptionImage}
                  alt="Recepção da Clínica Odontológica Barra Bonita no Recreio dos Bandeirantes"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/25 bg-petroleum/88 p-5 text-white shadow-xl backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                  <p className="font-display text-lg font-semibold">Estrutura acolhedora e bem localizada</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Atendimento com hora marcada no Absolutto Business Towers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-landing-section="trust" aria-label="Diferenciais da clínica" className="border-y border-line bg-white py-7">
          <ul className="site-container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm font-semibold text-petroleum">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-turquoise-dark">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </section>

        <section id="servicos" data-landing-section="services" className="section-space bg-mist/45">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Cuidados odontológicos</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Tratamentos planejados para cada necessidade
              </h2>
              <p className="mt-5 text-lg leading-8 text-graphite/75">
                Toda indicação começa por uma avaliação profissional individual.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {landingServices.map((service) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  whatsappMessage={campaignWhatsappMessage}
                  trackingLocation="service_card"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="estrutura" data-landing-section="structure" className="section-space overflow-hidden bg-white">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Estrutura real</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Um espaço preparado para receber você
              </h2>
              <p className="mt-5 text-lg leading-8 text-graphite/75">
                Conheça a entrada, a recepção e os ambientes da clínica na Torre 2, sala 403.
              </p>
            </div>
            <ClinicGallery />
          </div>
        </section>

        <section id="profissionais" data-landing-section="professionals" className="section-space bg-mist/55">
          <div className="site-container">
            <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.75fr]">
              <div>
                <p className="eyebrow">Profissionais</p>
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                  Converse diretamente com nossa equipe
                </h2>
              </div>
              <p className="leading-7 text-graphite/75 lg:pb-1">
                Escolha o profissional para falar pelo WhatsApp ou telefone. Todos estão identificados com seus registros no CRO/RJ.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {dentists.map((dentist) => (
                <DentistCard
                  key={dentist.id}
                  dentist={dentist}
                  whatsappMessage={campaignWhatsappMessage}
                  trackingLocation="professional_card"
                  showPhoneLink
                />
              ))}
            </div>
          </div>
        </section>

        <div data-landing-section="location">
          <LocationSection trackingLocation="location_section" />
        </div>

        <div data-landing-section="faq">
          <FAQ items={landingFaqs} />
        </div>

        <section id="contato" data-landing-section="final-cta" className="section-space bg-petroleum text-white">
          <div className="site-container text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">Agendamento</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Dê o próximo passo para cuidar da sua saúde bucal
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
              Fale com nossa equipe, escolha um profissional e agende sua avaliação no Recreio.
            </p>
            <WhatsAppChooserTrigger
              message={campaignWhatsappMessage}
              tracking={{ ctaLocation: "final_cta" }}
              className="mt-8 inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 font-semibold text-petroleum transition-colors duration-200 hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Agendar avaliação pelo WhatsApp
            </WhatsAppChooserTrigger>
          </div>
        </section>

        <section data-landing-section="legal" className="border-b border-line bg-mist/60 py-7">
          <div className="site-container flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <CheckCircle2 className="size-6 shrink-0 text-turquoise-dark" aria-hidden="true" />
            <p className="text-sm leading-6 text-graphite/75">
              Este site tem caráter institucional e educativo. Toda indicação de tratamento depende de avaliação individual.
            </p>
          </div>
        </section>
      </main>
      <LandingFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

