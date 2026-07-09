"use client";

import { useState } from "react";
import { Map, MapPin } from "lucide-react";
import { mapsEmbedUrl } from "@/lib/site-data";

export function MapEmbed() {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <iframe
        src={mapsEmbedUrl}
        title="Mapa da Clínica Odontológica Barra Bonita"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[27rem] w-full border-0"
      />
    );
  }

  return (
    <div className="relative grid min-h-[27rem] place-items-center overflow-hidden bg-petroleum p-8 text-center">
      <div className="absolute inset-0" aria-hidden="true">
        <svg viewBox="0 0 600 450" className="h-full w-full opacity-20">
          <path d="M-20 90 620 300M40-10l390 480M-10 350 550 80" stroke="white" />
          <path d="m120-20 80 500M410-30l-60 510" stroke="#6ed8cf" />
          <circle cx="360" cy="210" r="90" fill="none" stroke="white" />
          <circle cx="360" cy="210" r="160" fill="none" stroke="#6ed8cf" />
        </svg>
      </div>
      <div className="relative max-w-sm">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-turquoise text-petroleum">
          <MapPin className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">
          Veja a localização no mapa
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/70">
          O mapa do Google só será carregado depois da sua escolha.
        </p>
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-petroleum transition-colors hover:bg-turquoise-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Map className="size-5" aria-hidden="true" />
          Visualizar mapa
        </button>
      </div>
    </div>
  );
}
