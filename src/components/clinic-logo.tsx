import Link from "next/link";

type ClinicLogoProps = {
  href?: string;
  inverse?: boolean;
};

export function ClinicLogo({ href = "/#inicio", inverse = false }: ClinicLogoProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
      aria-label="Clínica Odontológica Barra Bonita — página inicial"
    >
      <span
        className={`grid size-11 place-items-center rounded-2xl border ${
          inverse
            ? "border-white/30 bg-white/10 text-white"
            : "border-turquoise/30 bg-mist text-petroleum"
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 42 42" className="size-8" fill="none">
          <path
            d="M13.2 8.8c3.3-1.7 5.6.7 7.8.7s4.5-2.4 7.8-.7c5.5 2.8 3.4 10.1 1.5 15.1-2.4 6.2-3.7 9.3-6.2 9.3-2.2 0-1.4-6.8-3.1-6.8s-.9 6.8-3.1 6.8c-2.5 0-3.8-3.1-6.2-9.3-1.9-5-4-12.3 1.5-15.1Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.6 17.2c3.8 1.4 7.9.4 10.4-2.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex max-w-48 flex-col leading-none">
        <span
          className={`font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${
            inverse ? "text-turquoise-light" : "text-turquoise-dark"
          }`}
        >
          Clínica Odontológica
        </span>
        <span
          className={`mt-1 font-display text-lg font-semibold tracking-tight ${
            inverse ? "text-white" : "text-petroleum"
          }`}
        >
          Barra Bonita
        </span>
      </span>
    </Link>
  );
}
