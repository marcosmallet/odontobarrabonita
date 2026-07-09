"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ClinicLogo } from "./clinic-logo";
import { WhatsAppChooserTrigger } from "./whatsapp-chooser";
import { navigation } from "@/lib/site-data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/95 px-4 shadow-[0_10px_40px_rgba(15,83,78,0.1)] backdrop-blur-xl sm:px-6">
        <div className="flex h-18 items-center justify-between gap-4">
          <ClinicLogo />

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-full px-3 py-2 text-sm font-medium text-graphite/80 transition-colors duration-200 hover:bg-mist hover:text-petroleum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden sm:block">
            <WhatsAppChooserTrigger className="button-primary h-11 px-5 text-sm">
              Agendar avaliação
            </WhatsAppChooserTrigger>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-petroleum transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {isOpen ? (
          <nav
            id="mobile-navigation"
            aria-label="Navegação para dispositivos móveis"
            className="border-t border-line py-4 lg:hidden"
          >
            <ul className="grid gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-3 font-medium text-graphite transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-turquoise"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <WhatsAppChooserTrigger className="button-primary mt-4 w-full sm:hidden">
              Agendar avaliação
            </WhatsAppChooserTrigger>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
