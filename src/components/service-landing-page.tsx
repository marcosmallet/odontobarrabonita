import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  CheckCircle2,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { ClinicGallery } from "@/components/clinic-gallery";
import { BlogRelatedService } from "@/components/blog/blog-related-service";
import { ConversionLink } from "@/components/conversion-link";
import { DentistCard } from "@/components/dentist-card";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { LocationSection } from "@/components/location-section";
import type { ConversionEventParams } from "@/lib/analytics";
import {
  buildWhatsappUrl,
  dentists,
} from "@/lib/site-data";
import {
  getServiceLandingJsonLd,
  type ServiceLandingCard,
  type ServiceLandingConfig,
} from "@/lib/service-landing-data";
import { LandingHeader } from "@/app/dentista-no-recreio/_components/landing-header";

function CardGrid({ cards, label }: { cards: readonly ServiceLandingCard[]; label: string }) {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label={label}>
      {cards.map((card) => (
        <article key={card.title} className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_16px_45px_rgba(15,83,78,0.06)]">
          <span className="grid size-12 place-items-center rounded-2xl bg-mist text-petroleum">
            <card.icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold text-petroleum">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-graphite/72">{card.description}</p>
        </article>
      ))}
    </div>
  );
}

export function ServiceLandingPage({ config }: { config: ServiceLandingConfig }) {
  const professional = dentists.find((dentist) => dentist.id === config.professionalId)!;
  const whatsappUrl = buildWhatsappUrl(professional.phoneInternational, config.whatsappMessage);
  const eventParams = (ctaLocation: string, contactMethod: "whatsapp" | "maps" = "whatsapp"): ConversionEventParams => ({
    cta_location: ctaLocation,
    dentist_id: professional.id,
    page_path: config.pagePath,
    service_name: config.serviceName,
    contact_method: contactMethod,
  });
  const jsonLd = getServiceLandingJsonLd(config);

  return (
    <>
      <a href="#conteudo" className="skip-link">Ir para o conteúdo principal</a>
      <LandingHeader
        whatsappHref={whatsappUrl}
        whatsappLabel="Agendar avaliação"
        whatsappEventParams={eventParams("header")}
        mapsEventParams={{ page_path: config.pagePath, service_name: config.serviceName, dentist_id: professional.id, contact_method: "maps" }}
      />
      <main id="conteudo">
        <section id="inicio" data-service-section="hero" className="relative isolate overflow-hidden bg-hero pt-32 sm:pt-36 lg:pt-40">
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true"><div className="absolute -right-28 top-16 size-96 rounded-full bg-turquoise/12 blur-3xl" /><div className="absolute -left-44 bottom-0 size-[30rem] rounded-full bg-white/70 blur-3xl" /></div>
          <div className="site-container">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-graphite/65">
                <li><Link href="/" className="rounded-sm underline decoration-turquoise/35 underline-offset-4 transition-colors hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-petroleum">{config.eyebrow}</li>
              </ol>
            </nav>
            <div className="grid items-center gap-10 pb-20 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:pb-24">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-white/85 px-4 py-2 text-sm font-medium text-petroleum shadow-sm"><MapPin className="size-4 text-turquoise-dark" aria-hidden="true" />{config.eyebrow}</div>
                <h1 className="mt-7 max-w-2xl font-display text-[clamp(2.35rem,6.5vw,4.65rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-petroleum">{config.h1.replace(" no Recreio dos Bandeirantes", " no ")}<span className="text-turquoise-dark">Recreio dos Bandeirantes</span></h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-graphite/80 sm:text-xl">{config.description}</p>
                <p className="mt-5 max-w-xl leading-7 text-graphite/70">A indicação depende de avaliação profissional individual, histórico e objetivos de cada pessoa.</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ConversionLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" eventName="whatsapp_click" eventParams={eventParams("hero")} className="button-primary"><MessageCircle className="size-5" aria-hidden="true" />Agendar avaliação pelo WhatsApp</ConversionLink>
                  <a href="#entenda" className="button-secondary"><ArrowDown className="size-5" aria-hidden="true" />Entender como funciona</a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-2xl"><div className="absolute -inset-4 rounded-[3rem] border border-turquoise/15 sm:-inset-5" /><div className="relative aspect-[3/2] overflow-hidden rounded-[2.5rem] border border-white/90 bg-petroleum shadow-[0_30px_80px_rgba(15,83,78,0.2)]"><Image data-service-image="hero" src={config.heroImage.src} alt={config.heroImage.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /></div></div>
            </div>
          </div>
        </section>

        <section id="entenda" data-service-section="introduction" className="section-space bg-white">
          <div className="site-container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div data-introduction-copy className="order-1 lg:order-2"><p className="eyebrow">{config.introduction.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">{config.introduction.title}</h2><div className="mt-6 grid gap-5 text-lg leading-8 text-graphite/75">{config.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><ConversionLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" eventName="whatsapp_click" eventParams={eventParams("introduction")} className="button-primary mt-8"><MessageCircle className="size-5" aria-hidden="true" />Conversar sobre uma avaliação</ConversionLink></div>
            <div data-introduction-image className="order-2 relative mx-auto w-full max-w-xl overflow-hidden rounded-[2.25rem] bg-mist shadow-[0_22px_60px_rgba(15,83,78,0.1)] lg:order-1"><Image data-service-image="evaluation" src={config.evaluationImage.src} alt={config.evaluationImage.alt} width={config.evaluationImage.src.width} height={config.evaluationImage.src.height} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full object-cover" /></div>
          </div>
        </section>

        <section data-service-section="evaluation" className="section-space bg-mist/55"><div className="site-container"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">{config.evaluation.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">{config.evaluation.title}</h2><p className="mt-5 text-lg leading-8 text-graphite/75">{config.evaluation.intro}</p></div><CardGrid cards={config.evaluation.cards} label="Pontos considerados na avaliação" /><p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-graphite/70">{config.evaluation.note}</p></div></section>

        <section data-service-section="details" className="section-space bg-white"><div className="site-container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><p className="eyebrow">{config.details.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">{config.details.title}</h2><div className="mt-6 grid gap-5 text-lg leading-8 text-graphite/75">{config.details.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-9 grid gap-4 sm:grid-cols-2">{config.details.cards.map((card) => <article key={card.title} className="rounded-2xl border border-line bg-mist/45 p-5"><card.icon className="size-6 text-turquoise-dark" aria-hidden="true" /><h3 className="mt-4 font-display text-lg font-semibold text-petroleum">{card.title}</h3><p className="mt-2 text-sm leading-6 text-graphite/75">{card.description}</p></article>)}</div></div><div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2.25rem] bg-mist shadow-[0_22px_60px_rgba(15,83,78,0.1)]"><Image data-service-image="planning" src={config.planningImage.src} alt={config.planningImage.alt} width={config.planningImage.src.width} height={config.planningImage.src.height} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full object-cover" /></div></div></section>

        <section data-service-section="process" className="section-space bg-petroleum text-white"><div className="site-container"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">{config.process.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{config.process.title}</h2><p className="mt-5 text-lg leading-8 text-white/75">{config.process.intro}</p></div><ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{config.process.steps.map((step, index) => <li key={step.title} className="rounded-[1.75rem] border border-white/15 bg-white/8 p-6"><span className="grid size-11 place-items-center rounded-full bg-turquoise text-sm font-bold text-petroleum">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-white/70">{step.description}</p></li>)}</ol></div></section>

        <section data-service-section="care" className="section-space bg-mist/55"><div className="site-container"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">{config.care.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">{config.care.title}</h2></div><CardGrid cards={config.care.cards} label="Princípios do cuidado responsável" /></div></section>

        <section data-service-section="professional" className="section-space bg-white"><div className="site-container"><div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><p className="eyebrow">{config.professional.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">{config.professional.title}</h2><p className="mt-6 leading-7 text-graphite/75">{config.professional.description}</p></div><div className="max-w-2xl"><DentistCard dentist={professional} whatsappMessage={config.whatsappMessage} trackingLocation="professional" whatsappLabel={`Falar com ${professional.shortName}`} sourceLabel="Conhecer o profissional" whatsappEventParams={{ page_path: config.pagePath, service_name: config.serviceName, contact_method: "whatsapp" }} /></div></div></div></section>

        <section data-service-section="clinic" className="section-space overflow-hidden bg-mist/45"><div className="site-container"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">{config.clinic.eyebrow}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl lg:text-5xl">{config.clinic.title}</h2><p className="mt-5 text-lg leading-8 text-graphite/75">{config.clinic.description}</p></div><ClinicGallery /></div></section>

        <div data-service-section="location"><LocationSection title={config.locationTitle} trackingLocation="location" trackingEventParams={{ page_path: config.pagePath, service_name: config.serviceName, dentist_id: professional.id, contact_method: "maps" }} whatsappAction={{ href: whatsappUrl, label: "Agendar pelo WhatsApp", eventParams: eventParams("location") }} /></div>
        <div data-service-section="faq"><FAQ items={config.faqs} /></div>

        <section id="contato" data-service-section="final-cta" className="section-space bg-white"><div className="site-container"><div className="relative overflow-hidden rounded-[2.5rem] bg-petroleum text-white shadow-[0_24px_70px_rgba(15,83,78,0.16)]"><div className="grid items-stretch lg:grid-cols-[1fr_0.72fr]"><div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16"><p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">{config.final.eyebrow}</p><h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{config.final.title}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{config.final.description}</p><ConversionLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" eventName="whatsapp_click" eventParams={eventParams("final_cta")} className="mt-8 inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 font-semibold text-petroleum transition-colors duration-200 hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-turquoise"><MessageCircle className="size-5" aria-hidden="true" />Agendar pelo WhatsApp</ConversionLink></div><div className="relative min-h-64 overflow-hidden lg:min-h-0"><Image data-service-image="cta" src={config.ctaImage.src} alt={config.ctaImage.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover object-center lg:object-[center_38%]" /></div></div></div></div></section>

        <section data-service-section="related" className="border-b border-line bg-mist/60 py-8"><div className="site-container text-center"><p className="text-sm leading-6 text-graphite/75">Conteúdos relacionados: {config.relatedLinks.map((link, index) => <span key={link.href}>{index > 0 ? " · " : ""}<Link href={link.href} className="font-semibold text-turquoise-dark underline decoration-turquoise/35 underline-offset-4 hover:text-petroleum">{link.label}</Link></span>)}</p></div></section>
        <BlogRelatedService service={config.id} />
        <section data-service-section="legal" className="border-b border-line bg-mist/60 py-7"><div className="site-container flex flex-col items-center justify-center gap-3 text-center sm:flex-row"><CheckCircle2 className="size-6 shrink-0 text-turquoise-dark" aria-hidden="true" /><p className="text-sm leading-6 text-graphite/75">Este conteúdo tem caráter informativo. A indicação de tratamento depende de avaliação individual realizada por cirurgião-dentista.</p></div></section>
      </main>
      <Footer />
      <ConversionLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" eventName="whatsapp_click" eventParams={eventParams("floating")} aria-label={`Agendar avaliação para ${config.serviceName} pelo WhatsApp`} className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_35px_rgba(15,83,78,0.3)] transition-colors duration-200 hover:bg-whatsapp-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-petroleum md:bottom-7 md:right-7 md:size-16"><MessageCircle className="size-7" aria-hidden="true" /></ConversionLink>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
