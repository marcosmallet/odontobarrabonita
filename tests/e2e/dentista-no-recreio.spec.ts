import { expect, test } from "@playwright/test";
import {
  campaignWhatsappMessage,
  dentists,
  mapsUrl,
} from "../../src/lib/site-data";

test("publica o funil enxuto com metadados e seções na ordem correta", async ({
  page,
}) => {
  await page.goto("/dentista-no-recreio/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Dentista no Recreio dos Bandeirantes",
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle(
    "Dentista no Recreio dos Bandeirantes | Clínica Barra Bonita",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://odontobarrabonita.com.br/dentista-no-recreio/",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Atendimento odontológico humanizado/,
  );

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("Atendimento humanizado", { exact: true })).toBeVisible();
  await expect(page.locator("#servicos article")).toHaveCount(6);
  await expect(page.locator("#profissionais article")).toHaveCount(3);
  await expect(page.locator("#faq h3")).toHaveCount(4);

  const sectionOrder = await page
    .locator("[data-landing-section]")
    .evaluateAll((sections) =>
      sections.map((section) => section.getAttribute("data-landing-section")),
    );
  expect(sectionOrder).toEqual([
    "hero",
    "trust",
    "services",
    "structure",
    "professionals",
    "location",
    "faq",
    "final-cta",
    "legal",
  ]);

  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(structuredData ?? "{}")).toMatchObject({
    "@type": "Dentist",
    url: "https://odontobarrabonita.com.br/dentista-no-recreio/",
  });
});

test("é responsiva e mostra o CTA flutuante somente no celular", async ({
  page,
}, testInfo) => {
  await page.goto("/dentista-no-recreio/");

  const floatingButton = page.getByRole("button", {
    name: "Escolher profissional para falar pelo WhatsApp",
  });

  if (testInfo.project.name.startsWith("mobile")) {
    await expect(floatingButton).toBeVisible();
  } else {
    await expect(floatingButton).toBeHidden();
  }

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});

test("usa a mensagem da campanha e preserva o roteamento por serviço", async ({
  page,
}) => {
  await page.goto("/dentista-no-recreio/");

  const serviceCard = page
    .getByRole("heading", { name: "Endodontia", exact: true })
    .locator("..");
  await serviceCard.getByRole("button", { name: "Agendar avaliação" }).click();

  const dialog = page.getByRole("dialog", {
    name: "Com quem você deseja falar?",
  });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link")).toHaveCount(1);

  const professionalLink = dialog.getByRole("link", { name: /Dr. Francisco/ });
  const href = await professionalLink.getAttribute("href");
  expect(href).toBeTruthy();
  expect(new URL(href!).searchParams.get("text")).toBe(campaignWhatsappMessage);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(
    serviceCard.getByRole("button", { name: "Agendar avaliação" }),
  ).toBeFocused();
});

test("mantém telefone, mapa e privacidade como links funcionais", async ({
  page,
}) => {
  await page.goto("/dentista-no-recreio/");

  for (const dentist of dentists) {
    const card = page
      .getByRole("heading", { name: dentist.name, exact: true })
      .locator("../..");
    await expect(
      card.getByRole("link", { name: `Ligar para ${dentist.shortName}` }),
    ).toHaveAttribute("href", `tel:${dentist.phoneInternational}`);
  }

  await expect(
    page.locator("#localizacao").getByRole("link", { name: "Como chegar" }),
  ).toHaveAttribute("href", mapsUrl);
  await expect(
    page.locator("footer").getByRole("link", { name: "Política de Privacidade" }),
  ).toHaveAttribute("href", "/politica-de-privacidade/");

  await page.evaluate(() => {
    window.gtag = undefined;
  });
  await expect(
    page.getByRole("link", { name: "Ligar para Dr. Carlos" }),
  ).toHaveAttribute("href", "tel:+5521998934620");
});

test("registra cada conversão no GA4 uma única vez", async ({ page }) => {
  await page.goto("/dentista-no-recreio/");

  await page.evaluate(() => {
    const target = window as unknown as { dataLayer: unknown[] };
    target.dataLayer = [];
  });

  await page
    .locator("#inicio")
    .getByRole("button", { name: "Agendar avaliação pelo WhatsApp" })
    .click();
  const whatsappLink = page.getByRole("dialog").getByRole("link").first();
  await whatsappLink.evaluate((link) =>
    link.addEventListener("click", (event) => event.preventDefault(), { once: true }),
  );
  await whatsappLink.click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();

  const phoneLink = page.getByRole("link", { name: "Ligar para Dr. Carlos" });
  await phoneLink.evaluate((link) =>
    link.addEventListener("click", (event) => event.preventDefault(), { once: true }),
  );
  await phoneLink.click();

  const directionsLink = page
    .locator("#localizacao")
    .getByRole("link", { name: "Como chegar" });
  await directionsLink.evaluate((link) =>
    link.addEventListener("click", (event) => event.preventDefault(), { once: true }),
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
        dentist_id: "carlos",
        service_name: undefined,
      },
    ],
    [
      "event",
      "phone_click",
      {
        cta_location: "professional_card",
        dentist_id: "carlos",
      },
    ],
    [
      "event",
      "directions_click",
      {
        cta_location: "location_section",
        destination: "google_maps",
      },
    ],
  ]);
});
