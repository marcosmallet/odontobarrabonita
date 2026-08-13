import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/dentista-no-recreio/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/alinhadores-no-recreio/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/harmonizacao-orofacial-no-recreio/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...[
      "implante-dentario-no-recreio",
      "tratamento-de-canal-no-recreio",
      "clareamento-dental-no-recreio",
      "ortodontista-no-recreio",
      "protese-dentaria-no-recreio",
      "restauracao-dentaria-no-recreio",
      "limpeza-dental-no-recreio",
      "toxina-botulinica-no-recreio",
    ].map((slug) => ({
      url: `${SITE_URL}/${slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/politica-de-privacidade/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
