import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import heroImage from "../../../public/images/harmonizacao/hero-harmonizacao-recreio.webp";
import evaluationImage from "../../../public/images/harmonizacao/avaliacao-facial-harmonizacao.webp";
import planningImage from "../../../public/images/harmonizacao/planejamento-harmonizacao.webp";
import ctaImage from "../../../public/images/harmonizacao/cta-harmonizacao-natural.webp";
import { ClinicGallery } from "@/components/clinic-gallery";
import { BlogRelatedService } from "@/components/blog/blog-related-service";
import { ConversionLink } from "@/components/conversion-link";
import { DentistCard } from "@/components/dentist-card";
import { FAQ, type FAQItem } from "@/components/faq";
import { Footer } from "@/components/footer";
import { LocationSection } from "@/components/location-section";
import type { ConversionEventParams } from "@/lib/analytics";
import {
  buildWhatsappUrl,
  clinic,
  dentists,
  harmonizationWhatsappMessage,
  SITE_URL,
} from "@/lib/site-data";
import { LandingHeader } from "../dentista-no-recreio/_components/landing-header";

const pagePath = "/harmonizacao-orofacial-no-recreio/";
const pageUrl = SITE_URL + pagePath;
const francisco = dentists.find((dentist) => dentist.id === "francisco")!;
const whatsappUrl = buildWhatsappUrl(
  francisco.phoneInternational,
  harmonizationWhatsappMessage,
);

export const metadata: Metadata = {
  title: "Harmonização Orofacial no Recreio | Clínica Barra Bonita",
  description:
    "Harmonização Orofacial no Recreio dos Bandeirantes com avaliação individual e acompanhamento profissional. Agende na Clínica Barra Bonita.",
  keywords: [
    "harmonização orofacial no Recreio",
    "harmonização facial no Recreio",
    "dentista para harmonização facial no Recreio",
    "especialista em harmonização orofacial",
    "harmonização facial perto de mim",
    "odontologia estética",
    "avaliação para harmonização",
    "estética facial no Recreio",
    "Clínica Barra Bonita",
    "Recreio dos Bandeirantes",
  ],
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: pageUrl,
    siteName: clinic.name,
    title: "Harmonização Orofacial no Recreio | Clínica Barra Bonita",
    description:
      "Harmonização Orofacial no Recreio dos Bandeirantes com avaliação individual e acompanhamento profissional.",
    images: [
      {
        url: "/images/harmonizacao/hero-harmonizacao-og.webp",
        width: 1200,
        height: 630,
        alt: "Avaliação para harmonização orofacial em consultório odontológico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonização Orofacial no Recreio | Clínica Barra Bonita",
    description:
      "Avaliação individual para harmonização orofacial no Recreio dos Bandeirantes.",
    images: ["/images/harmonizacao/hero-harmonizacao-og.webp"],
  },
};

const evaluationTopics = [
  {
    icon: Sparkles,
    title: "Proporções faciais",
    description:
      "Características e relações entre diferentes regiões da face podem ser observadas durante a avaliação.",
  },
  {
    icon: Sparkles,
    title: "Equilíbrio do sorriso",
    description:
      "O sorriso e sua relação com a face entram na conversa, sempre de acordo com as necessidades de cada pessoa.",
  },
  {
    icon: Activity,
    title: "Dinâmica facial",
    description:
      "Musculatura, movimentos e outros aspectos relevantes são considerados quando fizerem parte do planejamento.",
  },
  {
    icon: Stethoscope,
    title: "Saúde e histórico",
    description:
      "Condições de saúde, objetivos, contraindicações e informações importantes orientam a decisão profissional.",
  },
] as const;

const procedures = [
  {
    icon: Sparkles,
    title: "Harmonização Orofacial",
    description:
      "Área da Odontologia que pode envolver a avaliação e o planejamento de procedimentos na região orofacial.",
  },
  {
    icon: ShieldCheck,
    title: "Toxina botulínica",
    description:
      "Uso odontológico considerado de forma responsável, somente quando houver indicação após avaliação clínica.",
  },
] as const;

const carePillars = [
  {
    icon: ClipboardCheck,
    title: "Avaliação individual",
    description:
      "Cada pessoa possui características, necessidades e condições de saúde diferentes.",
  },
  {
    icon: ShieldCheck,
    title: "Orientação profissional",
    description:
      "Indicações e contraindicações devem ser avaliadas antes da realização de qualquer procedimento.",
  },
  {
    icon: HeartHandshake,
    title: "Planejamento responsável",
    description:
      "As decisões consideram saúde, equilíbrio facial e expectativas realistas.",
  },
  {
    icon: Stethoscope,
    title: "Acompanhamento",
    description:
      "O paciente recebe orientações compatíveis com o tratamento indicado.",
  },
] as const;

const processSteps = [
  {
    title: "Conversa inicial",
    description:
      "O profissional procura entender as necessidades, expectativas e histórico do paciente.",
  },
  {
    title: "Avaliação",
    description:
      "São analisadas características faciais e aspectos relevantes para verificar possibilidades e contraindicações.",
  },
  {
    title: "Planejamento",
    description:
      "Quando houver indicação, o profissional explica as opções disponíveis e define um planejamento individual.",
  },
  {
    title: "Acompanhamento",
    description:
      "Após o atendimento, são fornecidas as orientações e o acompanhamento adequado ao procedimento realizado.",
  },
] as const;

const harmonizationFaqs: readonly FAQItem[] = [
  {
    question: "O que é Harmonização Orofacial?",
    answer:
      "É uma área da Odontologia que pode envolver a avaliação e o planejamento de procedimentos na região orofacial. A indicação depende das características e das necessidades de cada paciente.",
  },
  {
    question: "Harmonização Orofacial é indicada para qualquer pessoa?",
    answer:
      "Não. Antes de qualquer indicação, o cirurgião-dentista deve avaliar condições de saúde, características individuais, objetivos, contraindicações e outros fatores relevantes.",
  },
  {
    question: "Como saber qual procedimento é indicado?",
    answer:
      "A definição depende de uma avaliação individual. O profissional analisa o caso e explica as possibilidades consideradas adequadas.",
  },
  {
    question: "É possível definir o resultado antes da avaliação?",
    answer:
      "Não. Cada pessoa possui características próprias e não é adequado garantir ou prever resultados individuais.",
  },
  {
    question: "Preciso agendar antes de ir à clínica?",
    answer:
      "Sim. O agendamento prévio ajuda a clínica a organizar o atendimento e permite direcionar o paciente ao profissional responsável.",
  },
  {
    question: "Onde fica a Clínica Barra Bonita?",
    answer:
      "No Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, Recreio dos Bandeirantes, Rio de Janeiro.",
  },
  {
    question: "Como agendar uma avaliação?",
    answer:
      "Use o botão de WhatsApp desta página para iniciar uma conversa diretamente com o profissional responsável.",
  },
];

function whatsappEventParams(ctaLocation: string): ConversionEventParams {
  return {
    cta_location: ctaLocation,
    dentist_id: francisco.id,
    page_path: pagePath,
    service_name: "harmonizacao_orofacial",
    contact_method: "whatsapp",
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": SITE_URL + "/#clinic",
      name: clinic.name,
      legalName: clinic.legalName,
      url: SITE_URL,
      image: SITE_URL + "/images/harmonizacao/hero-harmonizacao-og.webp",
      telephone: francisco.phoneInternational,
      medicalSpecialty: "https://schema.org/Dentistry",
      address: {
        "@type": "PostalAddress",
        streetAddress: clinic.street,
        addressLocality: clinic.city,
        addressRegion: clinic.region,
        postalCode: clinic.postalCode,
        addressCountry: clinic.country,
      },
      areaServed: { "@type": "Place", name: "Recreio dos Bandeirantes" },
      employee: {
        "@type": "Person",
        name: francisco.name,
        jobTitle: "Cirurgião-dentista",
        image: SITE_URL + "/images/profissionais/francisco-calheiros.webp",
        sameAs: francisco.sourceUrl,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "CRO/RJ",
          value: francisco.cro.replace("CRO/RJ ", ""),
        },
      },
    },
    {
      "@type": "MedicalWebPage",
      "@id": pageUrl + "#webpage",
      url: pageUrl,
      name: "Harmonização Orofacial no Recreio",
      description: metadata.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": SITE_URL + "/#clinic" },
      about: { "@id": SITE_URL + "/#clinic" },
      mainEntity: { "@id": pageUrl + "#faq" },
      breadcrumb: { "@id": pageUrl + "#breadcrumb" },
      image: SITE_URL + "/images/harmonizacao/hero-harmonizacao-og.webp",
    },
    {
      "@type": "FAQPage",
      "@id": pageUrl + "#faq",
      mainEntity: harmonizationFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": pageUrl + "#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: SITE_URL + "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Harmonização Orofacial no Recreio",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function HarmonizacaoOrofacialNoRecreioPage() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <LandingHeader
        whatsappHref={whatsappUrl}
        whatsappLabel="Agendar avaliação"
        whatsappEventParams={whatsappEventParams("header")}
        mapsEventParams={{
          page_path: pagePath,
          service_name: "harmonizacao_orofacial",
          contact_method: "maps",
        }}
      />
      <main id="conteudo">
        <section
          id="inicio"
          data-harmonization-section="hero"
          className="relative isolate overflow-hidden bg-hero pt-32 sm:pt-36 lg:pt-40"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-28 top-16 size-96 rounded-full bg-turquoise/12 blur-3xl" />
            <div className="absolute -left-44 bottom-0 size-[30rem] rounded-full bg-white/70 blur-3xl" />
          </div>
          <div className="site-container">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-graphite/65">
                <li>
                  <Link
                    href="/"
                    className="rounded-sm underline decoration-turquoise/35 underline-offset-4 transition-colors duration-200 hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
                  >
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-petroleum">
                  Harmonização Orofacial no Recreio
                </li>
              </ol>
            </nav>
            <div className="grid items-center gap-10 pb-20 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:pb-24">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-white/85 px-4 py-2 text-sm font-medium text-petroleum shadow-sm">
                  <MapPin className="size-4 text-turquoise-dark" aria-hidden="true" />
                  Harmonização Orofacial no Recreio
                </div>
                <h1 className="mt-7 max-w-2xl font-display text-[clamp(2.35rem,6.5vw,4.65rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-petroleum">
                  Harmonização Orofacial no{" "}
                  <span className="text-turquoise-dark">Recreio dos Bandeirantes</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-graphite/80 sm:text-xl">
                  Avaliação e planejamento individualizado para quem busca cuidar
                  da harmonia facial com acompanhamento de cirurgião-dentista no
                  Recreio dos Bandeirantes.
                </p>
                <p className="mt-5 max-w-xl leading-7 text-graphite/70">
                  Cada indicação depende da análise das características faciais, da
                  saúde, dos objetivos do paciente e das possibilidades adequadas
                  para cada caso.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ConversionLink
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="whatsapp_click"
                    eventParams={whatsappEventParams("hero")}
                    className="button-primary"
                  >
                    <MessageCircle className="size-5" aria-hidden="true" />
                    Agendar avaliação pelo WhatsApp
                  </ConversionLink>
                  <a href="#entenda" className="button-secondary">
                    <ArrowDown className="size-5" aria-hidden="true" />
                    Entender como funciona
                  </a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-2xl">
                <div className="absolute -inset-4 rounded-[3rem] border border-turquoise/15 sm:-inset-5" />
                <div className="relative aspect-[3/2] overflow-hidden rounded-[2.5rem] border border-white/90 bg-petroleum shadow-[0_30px_80px_rgba(15,83,78,0.2)]">
                  <Image
                    src={heroImage}
                    alt="Avaliação para harmonização orofacial em consultório odontológico"
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="entenda" data-harmonization-section="introduction" className="section-space bg-white">
          <div className="site-container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div data-introduction-copy className="order-1 lg:order-2">
              <p className="eyebrow">Planejamento individual</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                O que é Harmonização Orofacial?
              </h2>
              <div className="mt-6 grid gap-5 text-lg leading-8 text-graphite/75">
                <p>
                  Harmonização Orofacial reúne procedimentos que podem ser
                  considerados pelo cirurgião-dentista para trabalhar aspectos
                  funcionais e estéticos da região orofacial. A indicação é
                  individual e depende de avaliação clínica, planejamento e análise
                  das características de cada paciente.
                </p>
                <p>
                  O objetivo da consulta inicial é compreender as expectativas,
                  avaliar indicações e contraindicações e explicar as possibilidades
                  de forma clara, sem prometer resultados.
                </p>
              </div>
              <ConversionLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_click"
                eventParams={whatsappEventParams("introduction")}
                className="button-primary mt-8"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Conversar sobre uma avaliação
              </ConversionLink>
            </div>
            <div data-introduction-image className="order-2 relative mx-auto w-full max-w-xl overflow-hidden rounded-[2.25rem] bg-mist shadow-[0_22px_60px_rgba(15,83,78,0.1)] lg:order-1">
              <Image
                src={evaluationImage}
                alt="Pessoa em contexto institucional de avaliação facial para harmonização orofacial"
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section data-harmonization-section="evaluation-topics" className="section-space bg-mist/55">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">O olhar profissional</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                O que pode ser considerado durante a avaliação?
              </h2>
              <p className="mt-5 text-lg leading-8 text-graphite/75">
                A consulta reúne informações para entender possibilidades, limites
                e cuidados importantes para cada pessoa.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {evaluationTopics.map((topic) => (
                <article key={topic.title} className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_16px_45px_rgba(15,83,78,0.06)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-petroleum">
                    <topic.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-petroleum">{topic.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-graphite/72">{topic.description}</p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-graphite/70">
              A indicação de qualquer procedimento depende da avaliação realizada pelo cirurgião-dentista.
            </p>
          </div>
        </section>

        <section data-harmonization-section="procedures" className="section-space bg-white">
          <div className="site-container grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Possibilidades avaliadas</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Procedimentos avaliados de forma individual
              </h2>
              <p className="mt-6 leading-7 text-graphite/75">
                A clínica confirma a atuação em Harmonização Orofacial e Toxina
                botulínica em contexto odontológico. A indicação depende de
                avaliação, planejamento e condições de cada caso.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {procedures.map((procedure) => (
                <article key={procedure.title} className="rounded-[1.75rem] border border-line bg-mist/45 p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-petroleum shadow-sm">
                    <procedure.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-petroleum">{procedure.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-graphite/75">{procedure.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" data-harmonization-section="process" className="section-space bg-petroleum text-white">
          <div className="site-container">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">Etapas do cuidado</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Cada planejamento começa por uma avaliação
                </h2>
                <ol className="mt-10 grid gap-4 sm:grid-cols-2">
                  {processSteps.map((step, index) => (
                    <li key={step.title} className="rounded-[1.5rem] border border-white/12 bg-white/7 p-5 sm:p-6">
                      <span className="grid size-10 place-items-center rounded-full bg-turquoise font-display font-semibold text-petroleum">{index + 1}</span>
                      <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/72">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10">
                <Image
                  src={planningImage}
                  alt="Profissional e paciente em contexto institucional de planejamento para harmonização facial"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section data-harmonization-section="care-pillars" className="section-space bg-mist/55">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Cuidado responsável</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Informação e planejamento fazem parte do cuidado
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {carePillars.map((pillar) => (
                <article key={pillar.title} className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_16px_45px_rgba(15,83,78,0.06)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-petroleum">
                    <pillar.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-petroleum">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-graphite/72">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-harmonization-section="professional" className="section-space bg-white">
          <div className="site-container grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow">Profissional responsável</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Avaliação com Dr. Francisco Calheiros
              </h2>
              <p className="mt-6 leading-7 text-graphite/75">
                Converse sobre suas necessidades e entenda as possibilidades
                consideradas adequadas para o seu caso, sempre mediante avaliação individual.
              </p>
            </div>
            <div className="max-w-2xl">
              <DentistCard
                dentist={francisco}
                whatsappMessage={harmonizationWhatsappMessage}
                trackingLocation="professional"
                whatsappLabel="Falar com Dr. Francisco"
                sourceLabel="Conhecer o profissional"
                whatsappEventParams={{
                  page_path: pagePath,
                  service_name: "harmonizacao_orofacial",
                  contact_method: "whatsapp",
                }}
              />
            </div>
          </div>
        </section>

        <section data-harmonization-section="clinic" className="section-space overflow-hidden bg-mist/45">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Clínica Barra Bonita</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Atendimento no Recreio dos Bandeirantes
              </h2>
              <p className="mt-5 text-lg leading-8 text-graphite/75">
                A Clínica Odontológica Barra Bonita está localizada no Absolutto
                Business Towers e oferece atendimento com hora marcada em ambiente profissional e acolhedor.
              </p>
            </div>
            <ClinicGallery />
          </div>
        </section>

        <div data-harmonization-section="location">
          <LocationSection
            title="Harmonização Orofacial no Recreio"
            trackingLocation="location"
            trackingEventParams={{
              page_path: pagePath,
              service_name: "harmonizacao_orofacial",
              contact_method: "maps",
            }}
            whatsappAction={{
              href: whatsappUrl,
              label: "Agendar pelo WhatsApp",
              eventParams: whatsappEventParams("location"),
            }}
          />
        </div>

        <div data-harmonization-section="faq">
          <FAQ items={harmonizationFaqs} />
        </div>

        <section id="contato" data-harmonization-section="final-cta" className="section-space bg-white">
          <div className="site-container">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-petroleum text-white shadow-[0_24px_70px_rgba(15,83,78,0.16)]">
              <div className="grid items-stretch lg:grid-cols-[1fr_0.72fr]">
                <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">Próximo passo</p>
                  <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Quer conversar sobre Harmonização Orofacial?
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                    Agende uma avaliação no Recreio e converse com o profissional
                    sobre suas necessidades e as possibilidades adequadas para o seu caso.
                  </p>
                  <ConversionLink
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="whatsapp_click"
                    eventParams={whatsappEventParams("final_cta")}
                    className="mt-8 inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 font-semibold text-petroleum transition-colors duration-200 hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
                  >
                    <MessageCircle className="size-5" aria-hidden="true" />
                    Agendar pelo WhatsApp
                  </ConversionLink>
                </div>
                <div className="relative min-h-64 lg:min-h-0">
                  <Image
                    src={ctaImage}
                    alt="Pessoa sorrindo em contexto institucional de cuidado facial"
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-harmonization-section="legal" className="border-y border-line bg-mist/60 py-8">
          <div className="site-container flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <CheckCircle2 className="size-6 shrink-0 text-turquoise-dark" aria-hidden="true" />
            <p className="text-sm leading-6 text-graphite/75">
              Este conteúdo tem caráter informativo. A indicação de procedimentos depende de avaliação individual realizada por cirurgião-dentista.
            </p>
          </div>
        </section>
      </main>
      <BlogRelatedService service="harmonizacao" />
      <Footer />
      <ConversionLink
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        eventName="whatsapp_click"
        eventParams={whatsappEventParams("floating")}
        aria-label="Agendar avaliação para harmonização orofacial pelo WhatsApp"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_35px_rgba(15,83,78,0.3)] transition-colors duration-200 hover:bg-whatsapp-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-petroleum md:bottom-7 md:right-7 md:size-16"
      >
        <MessageCircle className="size-7" aria-hidden="true" />
      </ConversionLink>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
