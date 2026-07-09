import { expect, test } from "@playwright/test";
import { dentists, navigation } from "../../src/lib/site-data";

test("exibe o conteúdo institucional essencial sem overflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /cuidado odontológico completo no recreio dos bandeirantes/i,
    }),
  ).toBeVisible();
  await expect(page.getByText("Torre 2 — Sala 403").first()).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: "Recepção da Clínica Odontológica Barra Bonita no Absolutto Business Towers",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: "Recepção da Clínica Odontológica Barra Bonita no Absolutto Business Towers",
    }),
  ).toHaveAttribute(
    "src",
    /recepcao-clinica.*\.webp$/,
  );

  for (const dentist of dentists) {
    await expect(page.getByText(dentist.name, { exact: true }).first()).toBeVisible();
    await expect(page.getByText(dentist.cro, { exact: true }).first()).toBeVisible();
    await expect(
      page.getByRole("img", {
        name: `Retrato profissional de ${dentist.name}`,
      }),
    ).toBeVisible();
  }

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});

test("abre e fecha o seletor acessível de WhatsApp", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Agendar pelo WhatsApp" }).click();

  const dialog = page.getByRole("dialog", {
    name: "Com quem você deseja falar?",
  });
  await expect(dialog).toBeVisible();

  const links = dialog.getByRole("link");
  await expect(links).toHaveCount(3);
  for (const dentist of dentists) {
    await expect(
      dialog.getByRole("link", { name: new RegExp(dentist.shortName) }),
    ).toHaveAttribute("href", dentist.whatsappUrl);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("carrega o mapa somente depois da escolha do visitante", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('iframe[title="Mapa da Clínica Odontológica Barra Bonita"]')).toHaveCount(0);

  await page.getByRole("button", { name: "Visualizar mapa" }).click();
  await expect(
    page.locator('iframe[title="Mapa da Clínica Odontológica Barra Bonita"]'),
  ).toBeVisible();
});

test("abre a navegação móvel quando aplicável", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Cenário exclusivo para mobile");
  await page.goto("/");

  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  await expect(menuButton).toHaveAccessibleName("Abrir menu");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(menuButton).toHaveAccessibleName("Fechar menu");
  await expect(
    page.getByRole("navigation", { name: "Navegação para dispositivos móveis" }),
  ).toBeVisible();
});

test("mantém os links na mesma ordem das seções", async ({ page }, testInfo) => {
  await page.goto("/");
  const expectedLabels = navigation.map((item) => item.label);

  await expect(
    page.locator('nav[aria-label="Navegação principal"] a'),
  ).toHaveText(expectedLabels);
  await expect(page.locator('footer a[href^="#"]')).toHaveText(expectedLabels);

  for (const item of navigation) {
    await expect(page.locator(item.href)).toHaveCount(1);
  }

  if (testInfo.project.name.startsWith("mobile")) {
    for (const item of navigation) {
      await page.locator('button[aria-controls="mobile-navigation"]').click();
      const mobileNavigation = page.getByRole("navigation", {
        name: "Navegação para dispositivos móveis",
      });
      await expect(mobileNavigation.getByRole("link")).toHaveText(expectedLabels);
      await mobileNavigation.getByRole("link", { name: item.label, exact: true }).click();
      await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(item.href);
    }
  } else {
    const desktopNavigation = page.getByRole("navigation", {
      name: "Navegação principal",
    });
    for (const item of navigation) {
      await desktopNavigation
        .getByRole("link", { name: item.label, exact: true })
        .click();
      await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(item.href);
    }
  }
});

test("publica a política de privacidade", async ({ page }) => {
  await page.goto("/politica-de-privacidade/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Política de Privacidade" }),
  ).toBeVisible();
  await expect(page.getByText(/não possui formulário, cadastro/i)).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
});
