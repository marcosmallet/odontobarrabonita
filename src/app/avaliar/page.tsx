import type { Metadata } from "next";
import { Star } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { GoogleReviewRedirect } from "@/components/google-review-redirect";
import { googleReviewUrl, SITE_URL } from "@/lib/site-data";

const reviewPageUrl = `${SITE_URL}/avaliar`;
const reviewImageUrl = `${SITE_URL}/og-avaliacao-google.png`;

export const metadata: Metadata = {
  title: "Avalie a Clínica Odontológica Barra Bonita",
  description: "Conte como foi sua experiência e deixe sua avaliação no Google.",
  alternates: {
    canonical: reviewPageUrl,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: reviewPageUrl,
    siteName: "Clínica Odontológica Barra Bonita",
    title: "Clínica Odontológica Barra Bonita agradece sua avaliação",
    description: "Conte como foi sua experiência e deixe sua avaliação no Google.",
    images: [
      {
        url: reviewImageUrl,
        width: 1200,
        height: 630,
        alt: "Avalie sua experiência na Clínica Odontológica Barra Bonita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Odontológica Barra Bonita agradece sua avaliação",
    description: "Conte como foi sua experiência e deixe sua avaliação no Google.",
    images: [reviewImageUrl],
  },
};

export default function GoogleReviewPage() {
  return (
    <main
      id="conteudo"
      className="flex min-h-svh items-center justify-center bg-hero px-4 py-8 sm:px-6"
    >
      <section
        className="w-full max-w-xl rounded-[2.5rem] border border-line bg-white/95 p-6 text-center shadow-[0_25px_70px_rgba(15,83,78,0.14)] sm:p-10"
        aria-labelledby="titulo-avaliacao"
      >
        <div className="flex justify-center">
          <ClinicLogo href="/" />
        </div>

        <div
          className="mx-auto mt-8 flex size-16 items-center justify-center rounded-2xl bg-mist text-turquoise-dark"
          aria-hidden="true"
        >
          <Star className="size-9 fill-current" strokeWidth={1.6} />
        </div>

        <div className="mt-6 flex justify-center gap-1 text-amber-400" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className="size-5 fill-current" strokeWidth={1.5} />
          ))}
        </div>

        <p className="eyebrow mt-6">Sua opinião importa</p>
        <h1
          id="titulo-avaliacao"
          className="mt-4 font-display text-4xl font-semibold tracking-tight text-petroleum sm:text-5xl"
        >
          Avalie sua experiência
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-graphite/75">
          Sua opinião é muito importante para a Clínica Odontológica Barra Bonita.
        </p>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-graphite/65">
          Você será redirecionado para deixar sua avaliação no Google.
        </p>

        <GoogleReviewRedirect destination={googleReviewUrl} />

        <a
          className="button-primary mt-7 w-full"
          href={googleReviewUrl}
        >
          <Star className="size-5 fill-current" aria-hidden="true" />
          Avaliar no Google
        </a>

        <p className="mt-7 text-sm font-medium text-turquoise-dark">
          Obrigado pela sua visita!
        </p>

        <noscript>
          <div className="mt-7 rounded-2xl border border-line bg-mist/70 p-4 text-left">
            <p className="text-sm leading-6 text-graphite/75">
              O redirecionamento automático precisa de JavaScript. Use o link abaixo
              para avaliar a clínica no Google.
            </p>
            <a
              className="mt-3 inline-flex rounded-lg font-semibold text-petroleum underline decoration-turquoise underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
              href={googleReviewUrl}
            >
              Abrir avaliação no Google
            </a>
          </div>
        </noscript>
      </section>
    </main>
  );
}
