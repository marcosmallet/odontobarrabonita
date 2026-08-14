import { expect, test } from "@playwright/test";
import { classifyLeadSource } from "../../src/lib/analytics";

test.describe("classificação de origem do lead", () => {
  test("prioriza identificadores e mídia paga do Google", () => {
    expect(
      classifyLeadSource({
        href: "https://odontobarrabonita.com.br/?gclid=test&utm_source=google&utm_medium=organic",
        referrer: "https://www.google.com/",
      }),
    ).toBe("google_ads");
    expect(
      classifyLeadSource({
        search: "?utm_source=google&utm_medium=cpc&utm_campaign=teste",
      }),
    ).toBe("google_ads");
  });

  test("classifica paid, social, email, organic, referral e direct", () => {
    expect(classifyLeadSource({ search: "?utm_source=bing&utm_medium=paid" })).toBe("paid");
    expect(classifyLeadSource({ search: "?utm_source=instagram&utm_medium=social" })).toBe("social");
    expect(classifyLeadSource({ search: "?utm_source=newsletter&utm_medium=email" })).toBe("email");
    expect(classifyLeadSource({ referrer: "https://www.google.com/search?q=dentista" })).toBe("organic");
    expect(classifyLeadSource({ referrer: "https://example.com/recommendation" })).toBe("referral");
    expect(classifyLeadSource({ href: "https://odontobarrabonita.com.br/" })).toBe("direct");
  });

  test("não confunde UTM desconhecida com direct", () => {
    expect(
      classifyLeadSource({ search: "?utm_source=partner&utm_campaign=spring" }),
    ).toBe("other");
  });
});

test("preserva a primeira origem durante a navegação interna", async ({ page }) => {
  await page.goto("/?gclid=debug-test");
  await expect(page.locator("h1")).toBeVisible();

  await page.evaluate(() => {
    const target = window as unknown as { dataLayer: unknown[] };
    target.dataLayer = [];
  });

  await page.getByRole("button", { name: "Agendar pelo WhatsApp" }).first().click();
  await page.getByRole("dialog").getByRole("link").first().click({ noWaitAfter: true });

  const leadSource = await page.evaluate(() => {
    const target = window as unknown as { dataLayer: ArrayLike<unknown>[] };
    const event = target.dataLayer
      .map((entry) => Array.from(entry))
      .find((entry) => entry[0] === "event" && entry[1] === "whatsapp_click");
    return (event?.[2] as { lead_source?: string } | undefined)?.lead_source;
  });
  expect(leadSource).toBe("google_ads");
});
