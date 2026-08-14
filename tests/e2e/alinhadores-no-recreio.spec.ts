import { expect, test } from "@playwright/test";
import {
  alignersWhatsappMessage,
  buildWhatsappUrl,
  dentists,
  mapsUrl,
} from "../../src/lib/site-data";

const pagePath = "/alinhadores-no-recreio/";
const pageUrl =
  "https://odontobarrabonita.com.br/alinhadores-no-recreio/";
const carlos = dentists.find((dentist) => dentist.id === "carlos")!;
const whatsappUrl = buildWhatsappUrl(
  carlos.phoneInternational,
  alignersWhatsappMessage,
);

test("publica conteúdo, metadados e schemas específicos", async ({
  page,
  request,
}) => {
  const response = await request.get(pagePath);
  expect(response.status()).toBe(200);

  await page.goto(pagePath);

  await expect(page).toHaveTitle(
    "Alinhadores Transparentes no Recreio | Clínica Barra Bonita",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Alinhadores transparentes no Recreio",
    }),
  ).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  const heroImage = page.locator('[data-aligners-section="hero"] img');
  await expect(heroImage).toHaveCount(1);
  await expect(heroImage).toHaveAttribute(
    "alt",
    "Mulher adulta sorrindo em consultório odontológico enquanto segura um alinhador transparente",
  );
  await expect
    .poll(() =>
      heroImage.evaluate((image) => ({
        width: (image as HTMLImageElement).naturalWidth,
        height: (image as HTMLImageElement).naturalHeight,
      })),
    )
    .toEqual({ width: 896, height: 1120 });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    pageUrl,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /alinhadores transparentes no Recreio dos Bandeirantes/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index/,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "pt_BR",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    pageUrl,
  );

  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: "Início" })).toHaveAttribute(
    "href",
    "/",
  );
  await expect(
    breadcrumb.getByText("Alinhadores transparentes no Recreio", {
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "page");

  const sectionOrder = await page
    .locator("[data-aligners-section]")
    .evaluateAll((sections) =>
      sections.map((section) => section.getAttribute("data-aligners-section")),
    );
  expect(sectionOrder).toEqual([
    "hero",
    "introduction",
    "benefits",
    "indications",
    "process",
    "professional",
    "clinic",
    "location",
    "faq",
    "final-cta",
    "legal",
  ]);

  await expect(page.locator("#como-funciona li")).toHaveCount(6);
  await expect(page.locator("#faq h3")).toHaveCount(8);
  await expect(
    page.getByRole("heading", {
      name: "Dr. Carlos Jesus da Rocha",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText("CRO/RJ 22487", { exact: true }).first()).toBeVisible();

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
  ).toHaveLength(8);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(await sitemapResponse.text()).toContain(pageUrl);
});

test("usa o WhatsApp direto, o mapa real e a integração contextual da home", async ({
  page,
}) => {
  await page.goto(pagePath);

  const whatsappLinks = page.locator(
    'a[href^="https://wa.me/5521998934620"]',
  );
  expect(await whatsappLinks.count()).toBeGreaterThanOrEqual(7);

  for (const link of await whatsappLinks.all()) {
    await expect(link).toHaveAttribute("href", whatsappUrl);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }

  await expect(
    page.getByRole("link", {
      name: "Agendar avaliação para alinhadores pelo WhatsApp",
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

  const treatmentAnchor = page.getByRole("link", {
    name: "Como funciona o tratamento",
  });
  await treatmentAnchor.click();
  await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(
    "#como-funciona",
  );

  await page.goto("/");
  const orthodonticsCard = page
    .getByRole("heading", { name: "Ortodontia", exact: true })
    .locator("..");
  await expect(
    orthodonticsCard.getByRole("link", {
      name: "Conhecer ortodontia",
    }),
  ).toHaveAttribute("href", "/ortodontista-no-recreio/");
  await expect(
    page.getByRole("link", { name: "Conhecer ortodontia" }),
  ).toHaveCount(1);
});

test("registra conversões no GA4 uma única vez e funciona sem analytics", async ({
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
        cta_type: "appointment",
        dentist: "carlos",
        dentist_id: "carlos",
        lead_source: "direct",
        page_path: pagePath,
        page_title: "Alinhadores Transparentes no Recreio | Clínica Barra Bonita",
        service: "alinhadores",
        service_name: "alinhadores",
        contact_method: "whatsapp",
      },
    ],
    [
      "event",
      "directions_click",
      {
        cta_location: "location",
        cta_text: "Como chegar",
        cta_type: "directions",
        dentist: "clinic",
        dentist_id: "clinic",
        destination: "google_maps",
        lead_source: "direct",
        page_path: pagePath,
        page_title: "Alinhadores Transparentes no Recreio | Clínica Barra Bonita",
        service: "alinhadores",
        service_name: "alinhadores",
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

test("mantém o FAQ acessível por teclado", async ({ page }) => {
  await page.goto(pagePath);

  const firstQuestion = page.getByRole("button", {
    name: "Os alinhadores transparentes funcionam para todos os casos?",
  });
  const secondQuestion = page.getByRole("button", {
    name: "Quanto tempo dura o tratamento?",
  });

  await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
  await secondQuestion.focus();
  await expect(secondQuestion).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByText(
      "A duração varia conforme as necessidades de cada caso, o planejamento realizado e a colaboração do paciente com o tempo de uso recomendado.",
    ),
  ).toBeVisible();
});

test("não cria overflow nem encobre o CTA nas larguras exigidas", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop"),
    "A matriz completa roda uma vez no Chromium desktop",
  );

  const widths = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(pagePath);

    const hasOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasOverflow, `overflow horizontal em ${width}px`).toBe(false);

    const floatingButton = page.getByRole("link", {
      name: "Agendar avaliação para alinhadores pelo WhatsApp",
    });
    await expect(floatingButton).toBeVisible();

    const primaryCta = page
      .locator("#inicio")
      .getByRole("link", { name: "Agendar avaliação pelo WhatsApp" });
    await expect(primaryCta).toBeVisible();
  }
});

test("não gera erros de aplicação ou links internos quebrados", async ({
  page,
}) => {
  const applicationErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => applicationErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(pagePath);
  await page.waitForLoadState("networkidle");

  expect(applicationErrors).toEqual([]);
  expect(
    consoleErrors.filter(
      (message) =>
        !message.includes("google-analytics.com") &&
        !message.includes("googletagmanager.com") &&
        !message.includes("fonts.googleapis.com") &&
        !message.includes("ERR_NETWORK_ACCESS_DENIED") &&
        !message.includes("ERR_NAME_NOT_RESOLVED"),
    ),
  ).toEqual([]);

  for (const href of ["/", "/politica-de-privacidade/"]) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }
});
