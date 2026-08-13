import { expect, test } from "@playwright/test";
import {
  buildWhatsappUrl,
  dentists,
  harmonizationWhatsappMessage,
  mapsUrl,
} from "../../src/lib/site-data";

const pagePath = "/harmonizacao-orofacial-no-recreio/";
const pageUrl =
  "https://odontobarrabonita.com.br/harmonizacao-orofacial-no-recreio/";
const francisco = dentists.find((dentist) => dentist.id === "francisco")!;
const whatsappUrl = buildWhatsappUrl(
  francisco.phoneInternational,
  harmonizationWhatsappMessage,
);

test("publica conteúdo, metadados, imagens e schemas específicos", async ({
  page,
  request,
}) => {
  expect((await request.get(pagePath)).status()).toBe(200);
  await page.goto(pagePath);

  await expect(page).toHaveTitle(
    "Harmonização Orofacial no Recreio | Clínica Barra Bonita",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Harmonização Orofacial no Recreio dos Bandeirantes",
    }),
  ).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    pageUrl,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Harmonização Orofacial no Recreio dos Bandeirantes com avaliação individual/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    pageUrl,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "pt_BR",
  );
  await expect(
    page.locator('meta[property="og:image"]').first(),
  ).toHaveAttribute("content", /hero-harmonizacao-og\.webp/);

  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: "Início" })).toHaveAttribute(
    "href",
    "/",
  );
  await expect(
    breadcrumb.getByText("Harmonização Orofacial no Recreio", { exact: true }),
  ).toHaveAttribute("aria-current", "page");

  const sectionOrder = await page
    .locator("[data-harmonization-section]")
    .evaluateAll((sections) =>
      sections.map((section) =>
        section.getAttribute("data-harmonization-section"),
      ),
    );
  expect(sectionOrder).toEqual([
    "hero",
    "introduction",
    "evaluation-topics",
    "procedures",
    "process",
    "care-pillars",
    "professional",
    "clinic",
    "location",
    "faq",
    "final-cta",
    "legal",
  ]);

  await expect(page.locator("#como-funciona li")).toHaveCount(4);
  await expect(page.locator("#faq h3")).toHaveCount(7);
  await expect(
    page.getByRole("heading", {
      name: "Dr. Francisco Calheiros de Carvalho Mendes",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText("CRO/RJ 55471", { exact: true }).first()).toBeVisible();
  await expect(page.getByAltText(/Avaliação para harmonização orofacial/)).toBeVisible();
  await expect(page.getByAltText(/avaliação facial para harmonização/)).toBeVisible();
  await expect(page.getByAltText(/planejamento para harmonização facial/)).toBeVisible();
  await expect(page.getByAltText(/contexto institucional de cuidado facial/)).toBeVisible();

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(structuredData["@context"]).toBe("https://schema.org");
  expect(structuredData["@graph"].map((node: { "@type": string }) => node["@type"]))
    .toEqual(["Dentist", "MedicalWebPage", "FAQPage", "BreadcrumbList"]);
  expect(
    structuredData["@graph"].find(
      (node: { "@type": string }) => node["@type"] === "FAQPage",
    ).mainEntity,
  ).toHaveLength(7);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(await sitemapResponse.text()).toContain(pageUrl);
});

test("usa o WhatsApp do Dr. Francisco e o mapa real", async ({ page }) => {
  await page.goto(pagePath);

  const whatsappLinks = page.locator('a[href^="https://wa.me/5521971340807"]');
  expect(await whatsappLinks.count()).toBeGreaterThanOrEqual(7);
  for (const link of await whatsappLinks.all()) {
    await expect(link).toHaveAttribute("href", whatsappUrl);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }

  await expect(
    page.getByRole("link", {
      name: "Agendar avaliação para harmonização orofacial pelo WhatsApp",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Escolher profissional para falar pelo WhatsApp",
    }),
  ).toHaveCount(0);

  const directionsLink = page
    .locator("#localizacao")
    .getByRole("link", { name: "Como chegar" });
  await expect(directionsLink).toHaveAttribute("href", mapsUrl);
  await expect(directionsLink).toHaveAttribute("target", "_blank");
  await expect(directionsLink).toHaveAttribute("rel", "noopener noreferrer");

  await page.goto("/");
  const harmonizationCard = page
    .getByRole("heading", { name: "Harmonização orofacial", exact: true })
    .locator("..");
  await expect(
    harmonizationCard.getByRole("link", {
      name: "Conhecer Harmonização Orofacial",
    }),
  ).toHaveAttribute("href", pagePath);
  const toxinCard = page
    .getByRole("heading", { name: "Toxina botulínica", exact: true })
    .locator("..");
  await expect(
    toxinCard.getByRole("link", { name: "Conhecer toxina botulínica", exact: true }),
  ).toHaveAttribute("href", "/toxina-botulinica-no-recreio/");
});

test("registra conversões sem duplicar e funciona sem analytics", async ({
  page,
}) => {
  await page.goto(pagePath);
  await page.evaluate(() => {
    const target = window as unknown as { dataLayer: unknown[] };
    target.dataLayer = [];
  });

  const heroWhatsapp = page
    .locator("#inicio")
    .getByRole("link", { name: "Agendar avaliação pelo WhatsApp" });
  await heroWhatsapp.evaluate((link) =>
    link.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    }),
  );
  await heroWhatsapp.click();

  const directionsLink = page
    .locator("#localizacao")
    .getByRole("link", { name: "Como chegar" });
  await directionsLink.evaluate((link) =>
    link.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    }),
  );
  await directionsLink.click();

  const capturedEvents = await page.evaluate(() => {
    const target = window as unknown as { dataLayer: ArrayLike<unknown>[] };
    return target.dataLayer
      .map((entry) => Array.from(entry))
      .filter((entry) => entry[0] === "event");
  });

  expect(capturedEvents).toEqual([
    [
      "event",
      "whatsapp_click",
      {
        cta_location: "hero",
        dentist_id: "francisco",
        page_path: pagePath,
        service_name: "harmonizacao_orofacial",
        contact_method: "whatsapp",
      },
    ],
    [
      "event",
      "directions_click",
      {
        cta_location: "location",
        destination: "google_maps",
        page_path: pagePath,
        service_name: "harmonizacao_orofacial",
        contact_method: "maps",
      },
    ],
  ]);

  await page.evaluate(() => {
    window.gtag = undefined;
  });
  await expect(heroWhatsapp).toHaveAttribute("href", whatsappUrl);
  await expect(directionsLink).toHaveAttribute("href", mapsUrl);
});

test("mantém o FAQ acessível e não cria overflow", async ({ page }) => {
  await page.goto(pagePath);

  const firstQuestion = page.getByRole("button", {
    name: "O que é Harmonização Orofacial?",
  });
  const secondQuestion = page.getByRole("button", {
    name: "Harmonização Orofacial é indicada para qualquer pessoa?",
  });
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
  await secondQuestion.focus();
  await page.keyboard.press("Enter");
  await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");

  for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(pagePath);
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow, "overflow horizontal em " + width + "px").toBe(false);
    if (width === 390) {
      const copyTop = await page
        .locator("#entenda [data-introduction-copy]")
        .evaluate((element) => element.getBoundingClientRect().top);
      const imageTop = await page
        .locator("#entenda [data-introduction-image]")
        .evaluate((element) => element.getBoundingClientRect().top);
      expect(copyTop, "o texto deve aparecer antes da segunda foto no mobile").toBeLessThan(
        imageTop,
      );
    }
    await expect(
      page.getByRole("link", {
        name: "Agendar avaliação para harmonização orofacial pelo WhatsApp",
      }),
    ).toBeVisible();
    await expect(
      page.locator("#inicio").getByRole("link", {
        name: "Agendar avaliação pelo WhatsApp",
      }),
    ).toBeVisible();
  }
});
