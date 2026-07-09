import Link from "next/link";
import { ClinicLogo } from "./clinic-logo";
import { CurrentYear } from "./current-year";
import { clinic, dentists, navigation } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-petroleum text-white">
      <div className="site-container py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <ClinicLogo inverse />
            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              Atendimento odontológico completo, com cuidado individualizado,
              ética e orientação profissional no Recreio dos Bandeirantes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold">Links rápidos</h2>
            <ul className="mt-5 grid gap-3 text-sm text-white/65">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="rounded-sm transition-colors hover:text-turquoise-light focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-de-privacidade/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm transition-colors hover:text-turquoise-light focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold">Profissionais</h2>
            <ul className="mt-5 grid gap-4 text-sm text-white/65">
              {dentists.map((dentist) => (
                <li key={dentist.id}>
                  <span className="block text-white/90">{dentist.name}</span>
                  <span>{dentist.cro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 py-8 text-xs leading-6 text-white/55 md:grid-cols-2">
          <div>
            <p>{clinic.legalName}</p>
            <p>CNPJ: {clinic.cnpj}</p>
            <p>
              {clinic.street}, {clinic.neighborhood}, {clinic.city} - {clinic.region}
            </p>
          </div>
          <p className="md:text-right">
            As informações deste site têm caráter informativo. A indicação de
            tratamentos depende de avaliação individual realizada por
            cirurgião-dentista.
          </p>
        </div>

        <p className="border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © <CurrentYear /> M2 Soluções com IA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
