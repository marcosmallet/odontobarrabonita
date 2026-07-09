import {
  ArrowDown,
  Building2,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import consultationImage from "../../public/images/consulta-odontologica-escuta.png";
import { WhatsAppChooserTrigger } from "./whatsapp-chooser";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-hero pt-32 sm:pt-36 lg:pt-40"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-28 top-16 size-96 rounded-full bg-turquoise/12 blur-3xl" />
        <div className="absolute -left-44 bottom-0 size-[30rem] rounded-full bg-white/70 blur-3xl" />
        <svg
          className="absolute inset-x-0 bottom-0 h-32 w-full text-white/75"
          viewBox="0 0 1440 128"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 61C197 113 350 16 571 57c197 37 319 88 524 37 146-36 238-40 345-8v42H0V61Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="site-container grid items-center gap-12 pb-30 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-36">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-white/75 px-4 py-2 text-sm font-medium text-petroleum shadow-sm backdrop-blur">
            <MapPin className="size-4 text-turquoise-dark" aria-hidden="true" />
            Dentista no Recreio dos Bandeirantes
          </div>

          <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.55rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-petroleum">
            Cuidado odontológico completo no{" "}
            <span className="text-turquoise-dark">Recreio dos Bandeirantes</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite/80 sm:text-xl">
            Atendimento humanizado, profissionais experientes e novas
            instalações no Absolutto Business Towers.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppChooserTrigger className="button-primary">
              <MessageCircle className="size-5" aria-hidden="true" />
              Agendar pelo WhatsApp
            </WhatsAppChooserTrigger>
            <a href="#servicos" className="button-secondary">
              Conhecer serviços
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-9 flex flex-col gap-3 text-sm text-graphite/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <span className="inline-flex items-center gap-2">
              <Building2 className="size-4 text-turquoise-dark" aria-hidden="true" />
              Absolutto Business Towers
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2
                className="size-4 text-turquoise-dark"
                aria-hidden="true"
              />
              Torre 2 — Sala 403
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-turquoise-dark" aria-hidden="true" />
              Recreio / Barra Bonita
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[3rem] border border-turquoise/15" />
          <div className="relative min-h-[31rem] overflow-hidden rounded-[2.5rem] border border-white/90 bg-petroleum shadow-[0_30px_80px_rgba(15,83,78,0.2)]">
            <Image
              src={consultationImage}
              alt="Dentista conversando com paciente em consultório odontológico claro e acolhedor"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-petroleum/15 via-transparent to-petroleum/70" />
            <div className="absolute left-7 top-7 rounded-full border border-white/35 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-petroleum shadow-sm backdrop-blur">
              Saúde · Cuidado · Bem-estar
            </div>

            <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/30 bg-petroleum/82 p-5 text-white shadow-2xl backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-turquoise text-petroleum">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">
                    Cuidado que começa pela escuta
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Avaliação individual, orientação clara e planejamento responsável.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
