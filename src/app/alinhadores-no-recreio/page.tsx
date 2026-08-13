import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HeartHandshake,
  MapPin,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import alignersHeroImage from "../../../public/images/alinhadores-hero.webp";
import { ClinicGallery } from "@/components/clinic-gallery";
import { ConversionLink } from "@/components/conversion-link";
import { DentistCard } from "@/components/dentist-card";
import { FAQ, type FAQItem } from "@/components/faq";
import { Footer } from "@/components/footer";
import { LocationSection } from "@/components/location-section";
import type { ConversionEventParams } from "@/lib/analytics";
import {
  alignersWhatsappMessage,
  buildWhatsappUrl,
  clinic,
  dentists,
  SITE_URL,
} from "@/lib/site-data";
import { LandingHeader } from "../dentista-no-recreio/_components/landing-header";

const pagePath = "/alinhadores-no-recreio/";
const pageUrl = `${SITE_URL}${pagePath}`;
const carlos = dentists.find((dentist) => dentist.id === "carlos")!;
const whatsappUrl = buildWhatsappUrl(
  carlos.phoneInternational,
  alignersWhatsappMessage,
);

export const metadata: Metadata = {
  title: "Alinhadores Transparentes no Recreio | Clínica Barra Bonita",
  description:
    "Conheça o tratamento com alinhadores transparentes no Recreio dos Bandeirantes. Agende uma avaliação na Clínica Odontológica Barra Bonita.",
  keywords: [
    "alinhadores transparentes no Recreio",
    "aparelho invisível no Recreio",
    "aparelho transparente no Recreio",
    "ortodontista no Recreio",
    "tratamento com alinhadores",
    "alinhadores dentais",
    "alinhadores perto de mim",
    "clínica odontológica no Recreio",
  ],
  alternates: { canonical: pageUrl },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: pageUrl,
    siteName: clinic.name,
    title: "Alinhadores Transparentes no Recreio | Clínica Barra Bonita",
    description:
      "Conheça o tratamento com alinhadores transparentes no Recreio dos Bandeirantes e agende uma avaliação.",
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
    title: "Alinhadores Transparentes no Recreio | Clínica Barra Bonita",
    description:
      "Tratamento com alinhadores transparentes e acompanhamento odontológico no Recreio.",
    images: ["/og-image.png"],
  },
};

const benefits = [
  {
    icon: Eye,
    title: "Discrição",
    description:
      "O material transparente torna o aparelho menos perceptível durante o uso.",
  },
  {
    icon: RefreshCw,
    title: "Removível",
    description:
      "O alinhador pode ser retirado para alimentação e higienização, conforme orientação profissional.",
  },
  {
    icon: ClipboardCheck,
    title: "Planejamento individual",
    description:
      "Cada caso deve ser avaliado e planejado de acordo com a condição odontológica do paciente.",
  },
  {
    icon: Stethoscope,
    title: "Acompanhamento profissional",
    description:
      "Consultas periódicas permitem acompanhar a evolução e realizar ajustes quando necessário.",
  },
  {
    icon: Sparkles,
    title: "Higienização",
    description:
      "A possibilidade de remover o alinhador pode facilitar a escovação e o uso do fio dental.",
  },
] as const;

const indications = [
  "Pequenos espaços entre os dentes",
  "Dentes desalinhados",
  "Apinhamento dentário",
  "Algumas alterações de mordida",
  "Recidivas após tratamentos ortodônticos anteriores",
  "Busca por uma alternativa mais discreta ao aparelho convencional",
] as const;

const treatmentSteps = [
  {
    title: "Avaliação inicial",
    description:
      "O profissional avalia os dentes, a mordida, a saúde bucal e os objetivos do paciente.",
  },
  {
    title: "Documentação",
    description:
      "Podem ser solicitados exames, fotografias, radiografias e escaneamento digital, de acordo com a necessidade do caso.",
  },
  {
    title: "Planejamento",
    description:
      "Com base nas informações coletadas, é elaborado um planejamento individualizado para a movimentação dos dentes.",
  },
  {
    title: "Uso dos alinhadores",
    description:
      "O paciente recebe orientações sobre o tempo diário de uso, troca das placas, higienização e conservação.",
  },
  {
    title: "Acompanhamento",
    description:
      "As consultas periódicas permitem avaliar a evolução e verificar a necessidade de ajustes.",
  },
  {
    title: "Contenção",
    description:
      "Após a fase ativa do tratamento, pode ser necessário utilizar contenções para ajudar a preservar o resultado obtido.",
  },
] as const;

const clinicReasons = [
  "Atendimento individualizado",
  "Equipe multidisciplinar",
  "Planejamento de acordo com cada caso",
  "Acompanhamento durante o tratamento",
  "Localização no Recreio dos Bandeirantes",
  "Ambiente profissional",
  "Facilidade de contato pelo WhatsApp",
] as const;

const alignersFaqs: readonly FAQItem[] = [
  {
    question: "Os alinhadores transparentes funcionam para todos os casos?",
    answer:
      "Não. A indicação depende do tipo e da complexidade da alteração ortodôntica. É necessário realizar uma avaliação para verificar se o tratamento é adequado.",
  },
  {
    question: "Quanto tempo dura o tratamento?",
    answer:
      "A duração varia conforme as necessidades de cada caso, o planejamento realizado e a colaboração do paciente com o tempo de uso recomendado.",
  },
  {
    question: "Quantas horas por dia é necessário usar os alinhadores?",
    answer:
      "O tempo de uso deve ser definido pelo profissional responsável. Em geral, os alinhadores precisam ser utilizados durante grande parte do dia, sendo retirados principalmente para alimentação e higienização.",
  },
  {
    question: "Posso comer usando os alinhadores?",
    answer:
      "Normalmente, eles são retirados para as refeições. O paciente recebe orientações específicas sobre alimentação, higiene e conservação durante a consulta.",
  },
  {
    question: "Os alinhadores interferem na fala?",
    answer:
      "Pode ocorrer uma adaptação temporária nos primeiros dias. Essa percepção tende a variar de pessoa para pessoa.",
  },
  {
    question: "Como saber se o tratamento é indicado para mim?",
    answer:
      "O primeiro passo é realizar uma avaliação odontológica e os exames considerados necessários pelo profissional.",
  },
  {
    question: "O tratamento precisa de acompanhamento?",
    answer:
      "Sim. As consultas de acompanhamento são importantes para avaliar a evolução e verificar se o tratamento está seguindo o planejamento.",
  },
  {
    question: "A clínica atende pacientes de outros bairros?",
    answer:
      "Sim. A clínica está localizada no Recreio dos Bandeirantes e pode atender pacientes de bairros próximos, mediante agendamento.",
  },
];

function whatsappEventParams(ctaLocation: string): ConversionEventParams {
  return {
    cta_location: ctaLocation,
    dentist_id: carlos.id,
    page_path: pagePath,
    service_name: "alinhadores",
    contact_method: "whatsapp",
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": `${SITE_URL}/#clinic`,
      name: clinic.name,
      legalName: clinic.legalName,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
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
      areaServed: {
        "@type": "Place",
        name: "Recreio dos Bandeirantes",
      },
      employee: {
        "@type": "Person",
        name: carlos.name,
        jobTitle: "Cirurgião-dentista",
        image: `${SITE_URL}/images/profissionais/carlos-rocha.webp`,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "CRO/RJ",
          value: carlos.cro.replace("CRO/RJ ", ""),
        },
      },
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Alinhadores transparentes no Recreio",
      description:
        "Informações sobre tratamento com alinhadores transparentes e avaliação odontológica no Recreio dos Bandeirantes.",
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#clinic` },
      about: { "@id": `${SITE_URL}/#clinic` },
      mainEntity: { "@id": `${pageUrl}#faq` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: alignersFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Alinhadores transparentes no Recreio",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function AlinhadoresNoRecreioPage() {
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
          service_name: "alinhadores",
          contact_method: "maps",
        }}
      />

      <main id="conteudo">
        <section
          id="inicio"
          data-aligners-section="hero"
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
                  Alinhadores transparentes no Recreio
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-12 pb-20 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-24">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-white/85 px-4 py-2 text-sm font-medium text-petroleum shadow-sm">
                  <MapPin className="size-4 text-turquoise-dark" aria-hidden="true" />
                  Avaliação odontológica no Recreio
                </div>
                <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-petroleum">
                  Alinhadores transparentes{" "}
                  <span className="text-turquoise-dark">no Recreio</span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite/80 sm:text-xl">
                  Uma opção discreta e planejada para cuidar do alinhamento do seu
                  sorriso, com acompanhamento odontológico no Recreio dos
                  Bandeirantes.
                </p>
                <p className="mt-5 max-w-2xl leading-7 text-graphite/70">
                  Cada tratamento começa com uma avaliação individual. O
                  profissional analisa a condição dos dentes, a mordida e os
                  objetivos do paciente para verificar se os alinhadores são
                  indicados para o caso.
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
                  <a href="#como-funciona" className="button-secondary">
                    <ArrowDown className="size-5" aria-hidden="true" />
                    Como funciona o tratamento
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-5 rounded-[3rem] border border-turquoise/15" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/90 bg-petroleum shadow-[0_30px_80px_rgba(15,83,78,0.2)]">
                  <Image
                    src={alignersHeroImage}
                    alt="Mulher adulta sorrindo em consultório odontológico enquanto segura um alinhador transparente"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/20 bg-petroleum/90 p-5 text-white shadow-xl backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                    <p className="font-display text-lg font-semibold">
                      Avaliação e planejamento individual
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/75">
                      Dr. Carlos Jesus da Rocha · {carlos.cro}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          data-aligners-section="introduction"
          className="section-space bg-white"
        >
          <div className="site-container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow">Entenda o tratamento</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                O que são alinhadores transparentes?
              </h2>
            </div>
            <div className="grid gap-5 text-lg leading-8 text-graphite/75">
              <p>
                Os alinhadores transparentes são placas removíveis produzidas para
                movimentar gradualmente os dentes de acordo com um planejamento
                individualizado. Durante o tratamento, o paciente utiliza uma
                sequência de alinhadores e realiza consultas periódicas para
                acompanhamento da evolução.
              </p>
              <p>
                Por serem removíveis, os alinhadores podem facilitar a alimentação
                e a higienização, mas o resultado depende do diagnóstico correto,
                do planejamento profissional e do uso conforme as orientações
                recebidas.
              </p>
              <p>
                Expressões como aparelho invisível ou aparelho transparente são
                usadas por quem procura uma alternativa mais discreta. O nome
                técnico e a indicação adequada são esclarecidos pelo
                cirurgião-dentista durante a avaliação.
              </p>
            </div>
          </div>
        </section>

        <section
          data-aligners-section="benefits"
          className="section-space bg-mist/55"
        >
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Características do tratamento</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Por que conhecer o tratamento com alinhadores?
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_16px_45px_rgba(15,83,78,0.06)]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-petroleum">
                    <benefit.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-petroleum">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-graphite/72">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          data-aligners-section="indications"
          className="section-space bg-white"
        >
          <div className="site-container grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Possíveis indicações</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Em quais casos os alinhadores podem ser utilizados?
              </h2>
              <p className="mt-6 leading-7 text-graphite/75">
                Os alinhadores podem ser considerados em diferentes situações
                ortodônticas. A indicação e o planejamento dependem das
                características de cada pessoa.
              </p>
            </div>
            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {indications.map((indication) => (
                  <li
                    key={indication}
                    className="flex min-h-20 items-start gap-3 rounded-2xl border border-line bg-mist/45 p-5 text-sm leading-6 text-graphite/78"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-turquoise-dark"
                      aria-hidden="true"
                    />
                    {indication}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3 rounded-2xl border border-turquoise/25 bg-mist p-5 text-sm leading-6 text-petroleum">
                <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p>
                  Somente uma avaliação odontológica pode confirmar se o tratamento
                  com alinhadores é indicado para cada caso.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          data-aligners-section="process"
          className="section-space bg-petroleum text-white"
        >
          <div className="site-container">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">
                Etapas do cuidado
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Como funciona o tratamento com alinhadores
              </h2>
            </div>
            <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {treatmentSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-[1.75rem] border border-white/12 bg-white/7 p-6 sm:p-7"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-turquoise font-display text-lg font-semibold text-petroleum">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.75rem] bg-white p-6 text-petroleum sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="font-display text-xl font-semibold">
                  Quer conversar sobre o seu caso?
                </p>
                <p className="mt-2 text-sm leading-6 text-graphite/70">
                  O primeiro passo é uma avaliação odontológica individual.
                </p>
              </div>
              <ConversionLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_click"
                eventParams={whatsappEventParams("after_treatment_explanation")}
                className="button-primary shrink-0"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Agendar avaliação
              </ConversionLink>
            </div>
          </div>
        </section>

        <section
          data-aligners-section="professional"
          className="section-space bg-mist/55"
        >
          <div className="site-container grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow">Profissional responsável</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                Avaliação e acompanhamento odontológico
              </h2>
              <p className="mt-6 leading-7 text-graphite/75">
                A avaliação considera saúde bucal, mordida, objetivos e exames
                necessários antes de qualquer indicação. O acompanhamento permite
                observar a evolução e ajustar o planejamento quando necessário.
              </p>
            </div>
            <div className="max-w-2xl">
              <DentistCard
                dentist={carlos}
                whatsappMessage={alignersWhatsappMessage}
                trackingLocation="professional"
                whatsappLabel="Conversar com a clínica"
                whatsappEventParams={{
                  page_path: pagePath,
                  service_name: "alinhadores",
                  contact_method: "whatsapp",
                }}
              />
            </div>
          </div>
        </section>

        <section
          data-aligners-section="clinic"
          className="section-space overflow-hidden bg-white"
        >
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
              <div>
                <p className="eyebrow">Clínica Barra Bonita</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">
                  Por que escolher a Clínica Odontológica Barra Bonita?
                </h2>
                <p className="mt-6 leading-7 text-graphite/75">
                  Atendimento no Recreio dos Bandeirantes, com orientação clara,
                  estrutura profissional e planejamento responsável para cada caso.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {clinicReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-3 rounded-2xl border border-line p-5 font-medium text-petroleum"
                  >
                    <Check
                      className="size-5 shrink-0 text-turquoise-dark"
                      aria-hidden="true"
                    />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            <ClinicGallery />
          </div>
        </section>

        <div data-aligners-section="location">
          <LocationSection
            title="Alinhadores transparentes no Recreio dos Bandeirantes"
            trackingLocation="location"
            trackingEventParams={{
              page_path: pagePath,
              service_name: "alinhadores",
              contact_method: "maps",
            }}
            whatsappAction={{
              href: whatsappUrl,
              label: "Falar pelo WhatsApp",
              eventParams: whatsappEventParams("location"),
            }}
          />
        </div>

        <div data-aligners-section="faq">
          <FAQ items={alignersFaqs} />
        </div>

        <section
          id="contato"
          data-aligners-section="final-cta"
          className="section-space bg-white"
        >
          <div className="site-container">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-petroleum px-6 py-12 text-center text-white sm:px-10 sm:py-16 lg:px-16">
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute -right-20 -top-32 size-96 rounded-full border border-white/10" />
                <div className="absolute -bottom-36 -left-16 size-80 rounded-full bg-turquoise/10 blur-2xl" />
              </div>
              <div className="relative mx-auto max-w-3xl">
                <CalendarCheck
                  className="mx-auto size-10 text-turquoise-light"
                  aria-hidden="true"
                />
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Quer saber se os alinhadores são indicados para o seu caso?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Agende uma avaliação na Clínica Odontológica Barra Bonita e
                  converse com um profissional sobre as possibilidades de
                  tratamento.
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
                  Solicitar avaliação pelo WhatsApp
                </ConversionLink>
              </div>
            </div>
          </div>
        </section>

        <section
          data-aligners-section="legal"
          className="border-y border-line bg-mist/60 py-8"
        >
          <div className="site-container flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <HeartHandshake
              className="size-6 shrink-0 text-turquoise-dark"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-graphite/75">
              Este conteúdo tem caráter informativo. A indicação, o planejamento e
              a evolução do tratamento dependem de avaliação e acompanhamento
              odontológico individual.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <ConversionLink
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        eventName="whatsapp_click"
        eventParams={whatsappEventParams("floating")}
        aria-label="Agendar avaliação para alinhadores pelo WhatsApp"
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
