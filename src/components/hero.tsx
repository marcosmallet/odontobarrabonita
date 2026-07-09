import {
  ArrowDown,
  Building2,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
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

        <div className="relative mx-auto w-full max-w-xl" aria-hidden="true">
          <div className="absolute -inset-5 rounded-[3rem] border border-turquoise/15" />
          <div className="relative min-h-[31rem] overflow-hidden rounded-[2.5rem] border border-white/90 bg-petroleum shadow-[0_30px_80px_rgba(15,83,78,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(76,194,183,0.28),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.09),transparent_40%)]" />
            <svg
              viewBox="0 0 540 520"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              <path
                d="M73 410c89-70 145-31 225-91 92-69 113-149 210-174"
                stroke="rgba(255,255,255,.13)"
                strokeWidth="2"
              />
              <path
                d="M-20 335c118-40 139 12 251-21 109-32 137-125 300-152"
                stroke="rgba(76,194,183,.38)"
                strokeWidth="2"
              />
              <circle cx="438" cy="118" r="80" stroke="rgba(255,255,255,.1)" />
              <circle cx="438" cy="118" r="52" stroke="rgba(76,194,183,.25)" />
            </svg>

            <div className="absolute left-7 top-7 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-turquoise-light backdrop-blur">
              Saúde · Cuidado · Bem-estar
            </div>

            <div className="absolute left-1/2 top-[46%] grid size-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.07] shadow-inner backdrop-blur-sm">
              <svg viewBox="0 0 180 180" className="size-32 text-white">
                <path
                  d="M54 35c14-7 24 3 36 3s22-10 36-3c24 12 15 44 7 65-10 27-16 41-27 41-10 0-6-30-16-30s-6 30-16 30c-11 0-17-14-27-41-8-21-17-53 7-65Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M52 72c17 7 36 3 48-10"
                  stroke="#6ed8cf"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="absolute inset-x-7 bottom-7 rounded-3xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
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
