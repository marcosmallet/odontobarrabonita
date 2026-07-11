import { expect, test } from "@playwright/test";
import { dentists, navigation, services } from "../../src/lib/site-data";

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

test("exibe as especialidades e a descrição atualizadas", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("Especialista em Ortodontia e Implantodontia", { exact: true }),
  ).toHaveCount(2);
  await expect(
    page.getByText("Especialista em Endodontia e Harmonização Facial", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Atua também em clínica geral, com prótese, endodontia, restaurações, limpeza e clareamento. Na ortodontia, possui mais de 500 casos tratados com aparelhos fixos, móveis e alinhadores.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Atua também em clínica geral, com atenção à saúde bucal, à prevenção, à funcionalidade e à estética. Seu atendimento humanizado considera as necessidades de cada paciente e busca promover conforto, bem-estar e cuidado integral.",
      { exact: true },
    ),
  ).toBeVisible();
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

test("exibe o mapa incorporado sem clique intermediário", async ({ page }) => {
  await page.goto("/");
  const mapFrame = page.locator(
    'iframe[title="Mapa da Clínica Odontológica Barra Bonita"]',
  );
  await expect(mapFrame).toBeVisible();
  await expect(mapFrame).toHaveAttribute(
    "src",
    "https://www.google.com/maps?cid=10296742771749999210&output=embed",
  );
  await expect(page.getByRole("button", { name: "Visualizar mapa" })).toHaveCount(0);
});

test("abre rota e política de privacidade em novas abas", async ({ page }) => {
  await page.goto("/");

  const directionsLink = page.getByRole("link", { name: "Como chegar" });
  await expect(directionsLink).toHaveAttribute(
    "href",
    "https://maps.app.goo.gl/Zp8vduD67f1ABD6h6",
  );
  await expect(directionsLink).toHaveAttribute("target", "_blank");
  await expect(directionsLink).toHaveAttribute("rel", "noopener noreferrer");

  const privacyLink = page
    .locator("footer")
    .getByRole("link", { name: "Política de Privacidade" });
  await expect(privacyLink).toHaveAttribute("target", "_blank");
  await expect(privacyLink).toHaveAttribute("rel", "noopener noreferrer");
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
  await expect(page.locator('footer ul a[href*="#"]')).toHaveText(expectedLabels);

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

test("usa as referências profissionais atualizadas", async ({ page }) => {
  await page.goto("/");

  const expectedReferences = [
    {
      name: "Dr. Carlos Jesus da Rocha",
      href: "https://maps.app.goo.gl/YLcDUy3MAc3wN16F9",
    },
    {
      name: "Dr. Francisco Calheiros de Carvalho Mendes",
      href: "https://www.instagram.com/dr.frankcalheiros/",
    },
    {
      name: "Dra. Márcia Ribeiro da Rocha",
      href: "https://maps.app.goo.gl/LJzUNNG4ZB5F6MLJ9",
    },
  ];

  for (const reference of expectedReferences) {
    const card = page
      .getByRole("heading", { name: reference.name, exact: true })
      .locator("..");
    const link = card.getByRole("link", { name: /Ver mais informa/ });

    await expect(link).toHaveAttribute("href", reference.href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("publica a política de privacidade", async ({ page }) => {
  await page.goto("/politica-de-privacidade/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Política de Privacidade" }),
  ).toBeVisible();
  await expect(page.getByText(/não possui formulário, cadastro/i)).toBeVisible();
  await expect(page.getByText(/Google Analytics para medir/i)).toBeVisible();
  await expect(
    page.locator(
      'script[src="https://www.googletagmanager.com/gtag/js?id=G-7BE21XPLT4"]',
    ),
  ).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("links rápidos da política retornam às seções da página inicial", async ({
  page,
}) => {
  for (const item of navigation) {
    await page.goto("/politica-de-privacidade/");
    await page
      .locator("footer")
      .getByRole("link", { name: item.label, exact: true })
      .click();

    await expect.poll(() => page.evaluate(() => window.location.pathname)).toBe("/");
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(item.href);
  }
});

test("filtra o WhatsApp conforme o servico selecionado", async ({ page }) => {
  await page.goto("/");

  const dialog = page.getByRole("dialog");

  for (const service of services) {
    const card = page
      .getByRole("heading", { name: service.title, exact: true })
      .locator("..");
    const allowedIds = service.whatsappDentistIds ?? dentists.map(({ id }) => id);
    const expectedDentists = dentists.filter(({ id }) => allowedIds.includes(id));

    await card.getByRole("button", { name: /Agendar/ }).click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link")).toHaveCount(expectedDentists.length);

    for (const dentist of expectedDentists) {
      await expect(
        dialog.getByRole("link", { name: new RegExp(dentist.shortName) }),
      ).toHaveAttribute("href", dentist.whatsappUrl);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  }
});
