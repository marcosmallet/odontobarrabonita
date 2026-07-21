"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackConversion } from "@/lib/analytics";
import {
  buildWhatsappUrl,
  campaignWhatsappMessage,
  defaultWhatsappMessage,
  dentists,
  type Dentist,
} from "@/lib/site-data";

export type WhatsAppTrackingContext = {
  ctaLocation: string;
  serviceName?: string;
};

type WhatsAppChooserOptions = {
  dentistIds?: Dentist["id"][];
  message?: string;
  tracking?: WhatsAppTrackingContext;
  returnFocus?: HTMLElement;
};

type WhatsAppContextValue = {
  openChooser: (options?: WhatsAppChooserOptions) => void;
};

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDentistIds, setSelectedDentistIds] = useState<
    Dentist["id"][] | null
  >(null);
  const [selectedMessage, setSelectedMessage] = useState(defaultWhatsappMessage);
  const [trackingContext, setTrackingContext] =
    useState<WhatsAppTrackingContext | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function openChooser({
    dentistIds,
    message,
    tracking,
    returnFocus,
  }: WhatsAppChooserOptions = {}) {
    setSelectedDentistIds(dentistIds ?? null);
    setSelectedMessage(message ?? defaultWhatsappMessage);
    setTrackingContext(tracking ?? null);
    returnFocusRef.current = returnFocus ?? null;
    setIsOpen(true);
  }

  function closeChooser() {
    setIsOpen(false);
    setSelectedDentistIds(null);
    setSelectedMessage(defaultWhatsappMessage);
    setTrackingContext(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeChooser();

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const visibleDentists = selectedDentistIds
    ? dentists.filter((dentist) => selectedDentistIds.includes(dentist.id))
    : dentists;
  const isCampaignLanding =
    pathname === "/dentista-no-recreio" ||
    pathname === "/dentista-no-recreio/";

  return (
    <WhatsAppContext.Provider value={{ openChooser }}>
      {children}

      <button
        type="button"
        onClick={(event) =>
          openChooser({
            message: isCampaignLanding ? campaignWhatsappMessage : undefined,
            tracking: isCampaignLanding
              ? { ctaLocation: "floating_mobile" }
              : undefined,
            returnFocus: event.currentTarget,
          })
        }
        className={`fixed bottom-5 right-5 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_35px_rgba(15,83,78,0.3)] transition-colors duration-200 hover:bg-whatsapp-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-petroleum md:bottom-7 md:right-7 md:size-16 ${
          isCampaignLanding ? "md:hidden" : ""
        }`}
        aria-label="Escolher profissional para falar pelo WhatsApp"
      >
        <MessageCircle className="size-7" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-petroleum/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeChooser();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-dialog-title"
            tabIndex={-1}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl outline-none sm:rounded-[2rem] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Agendamento</p>
                <h2
                  id="whatsapp-dialog-title"
                  className="mt-2 font-display text-2xl font-semibold text-petroleum"
                >
                  Com quem você deseja falar?
                </h2>
                <p className="mt-2 text-sm leading-6 text-graphite/75">
                  Escolha um profissional para continuar a conversa no WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={closeChooser}
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-petroleum transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                aria-label="Fechar seleção de WhatsApp"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {visibleDentists.map((dentist) => (
                <a
                  key={dentist.id}
                  href={buildWhatsappUrl(
                    dentist.phoneInternational,
                    selectedMessage,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (!trackingContext) return;
                    trackConversion("whatsapp_click", {
                      cta_location: trackingContext.ctaLocation,
                      dentist_id: dentist.id,
                      service_name: trackingContext.serviceName,
                    });
                  }}
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-line p-4 transition-colors duration-200 hover:border-turquoise hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-petroleum text-white">
                    <MessageCircle className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-petroleum">
                      {dentist.shortName}
                    </span>
                    <span className="mt-1 block text-sm text-graphite/70">
                      {dentist.phone} · {dentist.cro}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </WhatsAppContext.Provider>
  );
}

type WhatsAppChooserTriggerProps = {
  children: React.ReactNode;
  className?: string;
  dentistIds?: Dentist["id"][];
  message?: string;
  tracking?: WhatsAppTrackingContext;
};

export function WhatsAppChooserTrigger({
  children,
  className = "",
  dentistIds,
  message,
  tracking,
}: WhatsAppChooserTriggerProps) {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("WhatsAppChooserTrigger must be used inside WhatsAppProvider");
  }

  return (
    <button
      type="button"
      onClick={(event) =>
        context.openChooser({
          dentistIds,
          message,
          tracking,
          returnFocus: event.currentTarget,
        })
      }
      className={className}
    >
      {children}
    </button>
  );
}
