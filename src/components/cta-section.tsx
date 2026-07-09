import { MessageCircle } from "lucide-react";
import { dentists } from "@/lib/site-data";

export function CTASection() {
  return (
    <section id="contato" className="section-space bg-white">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-petroleum px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute -right-20 -top-32 size-96 rounded-full border border-white/10" />
            <div className="absolute -right-4 -top-20 size-64 rounded-full border border-turquoise/30" />
            <div className="absolute -bottom-32 left-1/4 size-72 rounded-full bg-turquoise/10 blur-3xl" />
          </div>
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow text-turquoise-light">Próximo passo</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Agende sua avaliação odontológica
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                Conte com uma equipe preparada para orientar o melhor caminho para
                o seu caso.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {dentists.map((dentist) => (
                <a
                  key={dentist.id}
                  href={dentist.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise-light"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp {dentist.shortName.replace("Dr. ", "").replace("Dra. ", "")}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
