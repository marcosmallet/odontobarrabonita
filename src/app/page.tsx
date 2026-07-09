import {
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import receptionWebp from "../../public/images/recepcao-clinica.webp";
import { CTASection } from "@/components/cta-section";
import { DentistCard } from "@/components/dentist-card";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LocationSection } from "@/components/location-section";
import { ServiceCard } from "@/components/service-card";
import { TrustStrip } from "@/components/trust-strip";
import { clinic, dentists, services, SITE_URL } from "@/lib/site-data";

const clinicHighlights = [
  {
    icon: Building2,
    title: "Novas instalações",
    description:
      "Um espaço contemporâneo no Absolutto Business Towers, preparado para receber você.",
  },
  {
    icon: Sparkles,
    title: "Ambiente limpo e confortável",
    description:
      "Cuidado com a organização e o acolhimento em cada etapa da experiência.",
  },
  {
    icon: HeartHandshake,
    title: "Ética e respeito",
    description:
      "Orientações claras, escuta atenta e decisões compartilhadas com o paciente.",
  },
  {
    icon: MapPin,
    title: "Bem localizada",
    description:
      "Na Av. das Américas, em uma região de fácil referência no Recreio.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#clinic`,
  name: clinic.name,
  legalName: clinic.legalName,
  url: SITE_URL,
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
  areaServed: [
    {
      "@type": "Place",
      name: "Recreio dos Bandeirantes",
    },
    {
      "@type": "Place",
      name: "Barra Bonita, Rio de Janeiro",
    },
  ],
  contactPoint: dentists.map((dentist) => ({
    "@type": "ContactPoint",
    telephone: dentist.phoneInternational,
    contactType: "appointments",
    availableLanguage: "Portuguese",
  })),
  employee: dentists.map((dentist) => ({
    "@type": "Person",
    name: dentist.name,
    jobTitle: "Cirurgião-dentista",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CRO/RJ",
      value: dentist.cro.replace("CRO/RJ ", ""),
    },
    sameAs: dentist.sourceUrl,
  })),
};

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustStrip />

        <section id="servicos" className="section-space bg-mist/45">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Nossos serviços</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Cuidado completo para diferentes momentos da sua saúde bucal
              </h2>
              <p className="mt-5 text-lg leading-8 text-graphite/75">
                Da avaliação odontológica à reabilitação e à estética, cada
                indicação começa por uma análise profissional individual.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-graphite/65">
              Também realizamos avaliação odontológica e limpeza/profilaxia. A
              adequação de qualquer tratamento — incluindo ortodontia, implantes,
              clareamento, toxina botulínica e harmonização orofacial — depende de
              avaliação clínica.
            </p>
          </div>
        </section>

        <section id="estrutura" className="section-space overflow-hidden bg-white">
          <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-petroleum shadow-[0_25px_70px_rgba(15,83,78,0.17)]">
                <picture className="block h-full w-full">
                  <img
                    src={receptionWebp.src}
                    alt="Recepção da Clínica Odontológica Barra Bonita no Absolutto Business Towers"
                    width="1600"
                    height="1200"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
              <div className="absolute -bottom-6 -right-3 rounded-2xl border border-line bg-white p-4 shadow-xl sm:right-7">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-7 text-turquoise-dark" aria-hidden="true" />
                  <div>
                    <p className="font-display font-semibold text-petroleum">
                      Torre 2
                    </p>
                    <p className="text-sm text-graphite/65">Sala 403</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow">Conheça a clínica</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Saúde e bem-estar em um espaço acolhedor
              </h2>
              <p className="mt-6 text-lg leading-8 text-graphite/75">
                A Clínica Odontológica Barra Bonita nasceu para oferecer um
                atendimento odontológico completo em um ambiente acolhedor,
                moderno e bem localizado no Recreio dos Bandeirantes. Nossa
                proposta é unir experiência profissional, cuidado individualizado
                e estrutura confortável para pacientes que buscam saúde bucal,
                estética e bem-estar.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {clinicHighlights.map((highlight) => (
                  <div key={highlight.title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-turquoise-dark">
                      <highlight.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-petroleum">
                        {highlight.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-graphite/70">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="profissionais" className="section-space bg-mist/55">
          <div className="site-container">
            <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.75fr]">
              <div>
                <p className="eyebrow">Profissionais</p>
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                  Experiência profissional com atenção individual
                </h2>
              </div>
              <p className="leading-7 text-graphite/75 lg:pb-1">
                Conheça os cirurgiões-dentistas da clínica e escolha com quem
                deseja conversar para agendar uma avaliação.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {dentists.map((dentist) => (
                <DentistCard key={dentist.id} dentist={dentist} />
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <LocationSection />
        <FAQ />

        <section className="border-y border-line bg-mist/60 py-8">
          <div className="site-container flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <CheckCircle2 className="size-6 text-turquoise-dark" aria-hidden="true" />
            <p className="text-sm leading-6 text-graphite/75">
              Este site tem caráter institucional e educativo. Toda indicação de
              tratamento depende de avaliação individual.
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
