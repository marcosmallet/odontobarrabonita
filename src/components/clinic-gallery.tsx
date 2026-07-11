"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import corridorImage from "../../public/images/clinica-corredor-interno.webp";
import entranceImage from "../../public/images/clinica-entrada-sala-403.webp";
import receptionImage from "../../public/images/clinica-recepcao-confortavel.webp";

type ClinicImage = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

const clinicImages: ClinicImage[] = [
  {
    src: entranceImage,
    alt: "Entrada da Clínica Odontológica Barra Bonita na sala 403",
    caption: "Torre 2, sala 403",
  },
  {
    src: receptionImage,
    alt: "Recepção da Clínica Odontológica Barra Bonita no Recreio dos Bandeirantes",
    caption: "Recepção confortável e acolhedora",
  },
  {
    src: corridorImage,
    alt: "Corredor interno e acesso aos consultórios da Clínica Odontológica Barra Bonita",
    caption: "Ambientes organizados para o atendimento",
  },
];

export function ClinicGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = activeIndex !== null;

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? null
        : (currentIndex - 1 + clinicImages.length) % clinicImages.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === null ? null : (currentIndex + 1) % clinicImages.length,
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, isOpen, showNext, showPrevious]);

  const activeImage = activeIndex === null ? null : clinicImages[activeIndex];

  return (
    <div className="mt-20 border-t border-line pt-16 sm:mt-24 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h3
          id="clinic-gallery-title"
          className="font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl"
        >
          Conheça nosso espaço
        </h3>
        <p className="mt-4 text-base leading-7 text-graphite/75 sm:text-lg sm:leading-8">
          Instalações modernas, organizadas e preparadas para receber você com
          conforto no Absolutto Business Towers.
        </p>
      </div>

      <ul
        aria-labelledby="clinic-gallery-title"
        data-testid="clinic-gallery"
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 pr-8 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pr-0 lg:grid-cols-3"
      >
        {clinicImages.map((image, index) => (
          <li
            key={image.caption}
            className={`w-[82%] shrink-0 snap-start ${
              index === clinicImages.length - 1
                ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%_-_0.625rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                : "sm:w-auto"
            }`}
          >
            <figure className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_16px_40px_rgba(15,83,78,0.08)] transition-[border-color,box-shadow] duration-200 hover:border-turquoise/60 hover:shadow-[0_22px_55px_rgba(15,83,78,0.13)]">
              <button
                type="button"
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
                className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-mist focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-turquoise"
                aria-label={`Ampliar foto: ${image.caption}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 639px) 82vw, (max-width: 1023px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                />
                <span
                  className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-white/30 bg-petroleum/85 text-white shadow-lg backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <Expand className="size-5" />
                </span>
              </button>
              <figcaption className="flex flex-1 items-center p-5 font-display text-base font-semibold leading-6 text-petroleum sm:min-h-24 sm:p-6 lg:min-h-0">
                {image.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-petroleum/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="clinic-lightbox-title"
            aria-describedby="clinic-lightbox-counter"
            tabIndex={-1}
            className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl outline-none sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <h2
                  id="clinic-lightbox-title"
                  className="font-display text-lg font-semibold leading-6 text-petroleum sm:text-xl"
                >
                  {activeImage.caption}
                </h2>
                <p
                  id="clinic-lightbox-counter"
                  aria-live="polite"
                  className="mt-1 text-sm text-graphite/70"
                >
                  Foto {activeIndex + 1} de {clinicImages.length}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-petroleum transition-colors duration-200 hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                aria-label="Fechar foto ampliada"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-graphite p-2 sm:p-4">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                sizes="100vw"
                className="h-auto max-h-[calc(100dvh-11rem)] w-auto max-w-full rounded-xl object-contain sm:max-h-[calc(100dvh-13rem)]"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-6 sm:py-4">
              <button
                type="button"
                onClick={showPrevious}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-petroleum transition-colors duration-200 hover:border-turquoise hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                aria-label="Mostrar foto anterior"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
                Anterior
              </button>
              <button
                type="button"
                onClick={showNext}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-petroleum transition-colors duration-200 hover:border-turquoise hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                aria-label="Mostrar próxima foto"
              >
                Próxima
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
