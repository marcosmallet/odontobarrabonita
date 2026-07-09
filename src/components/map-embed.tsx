import { mapsEmbedUrl } from "@/lib/site-data";

export function MapEmbed() {
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
