import Link from "next/link";
import { ClinicLogo } from "@/components/clinic-logo";
import { CurrentYear } from "@/components/current-year";
import { clinic, dentists } from "@/lib/site-data";

export function LandingFooter() {
  return (
    <footer className="bg-petroleum text-white">
      <div className="site-container py-12 sm:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <ClinicLogo href="/" inverse />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
              Atendimento odontológico com avaliação individual, ética e cuidado
              no Recreio dos Bandeirantes.
            </p>
          </div>
          <div className="grid gap-7 text-sm sm:grid-cols-2">
            <div className="text-white/70">
              <h2 className="font-display font-semibold text-white">Clínica</h2>
              <p className="mt-4">{clinic.legalName}</p>
              <p>CNPJ: {clinic.cnpj}</p>
              <p className="mt-2 leading-6">
                {clinic.street}
                <br />
                {clinic.neighborhood}, {clinic.city} - {clinic.region}
              </p>
            </div>
            <div>
              <h2 className="font-display font-semibold text-white">Profissionais</h2>
              <ul className="mt-4 grid gap-2 text-white/70">
                {dentists.map((dentist) => (
                  <li key={dentist.id}>
                    {dentist.name} · {dentist.cro}
                  </li>
                ))}
              </ul>
              <Link
                href="/politica-de-privacidade/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-sm font-semibold text-turquoise-light underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
        <div className="grid gap-4 pt-7 text-xs leading-6 text-white/55 md:grid-cols-[1fr_auto] md:items-center">
          <p>
            As informações têm caráter informativo. Todo tratamento depende de
            avaliação individual por cirurgião-dentista.
          </p>
          <p>© <CurrentYear /> M2 Soluções com IA.</p>
        </div>
      </div>
    </footer>
  );
}

