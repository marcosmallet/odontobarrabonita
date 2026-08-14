import { expect, test } from "@playwright/test";
import { dentists, navigation, services } from "../../src/lib/site-data";

test("oferece o link editorial de toxina botulínica no card da home", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("heading", { name: "Toxina botulínica", exact: true }).locator("..");
  await expect(card.getByRole("link", { name: "Conhecer toxina botulínica", exact: true })).toHaveAttribute("href", "/toxina-botulinica-no-recreio/");
});

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

test("apresenta a equipe entre a estrutura e os profissionais", async ({ page }) => {
  await page.goto("/");

  const team = page.locator("#equipe");
  const teamImage = team.getByRole("img", {
    name: "Equipe da Cl\u00ednica Odontol\u00f3gica Barra Bonita no Recreio dos Bandeirantes",
  });

  await expect(team).toBeVisible();
  await expect(
    team.getByRole("heading", {
      level: 2,
      name: "Cuidado realizado por profissionais experientes",
    }),
  ).toBeVisible();
  await expect(
    team.getByText(/tratamentos odontol.gicos no Recreio dos Bandeirantes/),
  ).toBeVisible();
  await expect(teamImage).toBeVisible();
  await expect(teamImage).toHaveAttribute(
    "src",
    /equipe-clinica-odontologica-barra-bonita-recreio.*\.webp$/,
  );
  await expect(teamImage).toHaveAttribute(
    "alt",
    "Equipe da Cl\u00ednica Odontol\u00f3gica Barra Bonita no Recreio dos Bandeirantes",
  );
  await expect(teamImage).toHaveAttribute("width", "1122");
  await expect(teamImage).toHaveAttribute("height", "1402");
  await expect(teamImage).toHaveAttribute("loading", "lazy");

  const sectionOrder = await page.evaluate(() => ({
    structureNext: document.querySelector("#estrutura")?.nextElementSibling?.id,
    teamNext: document.querySelector("#equipe")?.nextElementSibling?.id,
  }));
  expect(sectionOrder).toEqual({
    structureNext: "equipe",
    teamNext: "profissionais",
  });

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(await page.locator('script[type="application/ld+json"]').count()).toBe(1);
  expect(structuredData["@type"]).toBe("Dentist");
  expect(structuredData.image).toBe(
    "https://odontobarrabonita.com.br/images/equipe-clinica-odontologica-barra-bonita-recreio.webp",
  );
});

test("mantém a seção da equipe responsiva sem overflow nos breakpoints principais", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Cenário executado uma vez no Chromium desktop");

  for (const width of [360, 390, 430, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const metrics = await page.locator("#equipe img").evaluate((image) => {
      const rect = image.getBoundingClientRect();
      return {
        imageWidth: rect.width,
        imageHeight: rect.height,
        viewportWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    expect(metrics.imageWidth).toBeGreaterThan(0);
    expect(metrics.imageHeight).toBeGreaterThan(0);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);
  }
});

test("abre o WhatsApp da equipe com tracking contextual e devolve o foco", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    const target = window as unknown as { dataLayer: unknown[] };
    target.dataLayer = [];
  });

  const teamButton = page
    .locator("#equipe")
    .getByRole("button", { name: "Agendar uma avalia\u00e7\u00e3o", exact: true });
  await teamButton.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link")).toHaveCount(3);
  for (const dentist of dentists) {
    await expect(
      dialog.getByRole("link", { name: new RegExp(dentist.shortName) }),
    ).toHaveAttribute("href", dentist.whatsappUrl);
  }

  await dialog.getByRole("link").first().click({ noWaitAfter: true });
  const eventPayload = await page.evaluate(() => {
    const target = window as unknown as { dataLayer: ArrayLike<unknown>[] };
    const event = target.dataLayer
      .map((entry) => Array.from(entry))
      .find((entry) => entry[0] === "event" && entry[1] === "whatsapp_click");
    return event?.[2];
  });

  expect(eventPayload).toMatchObject({
    cta_location: "team_section",
    service: "geral",
    service_name: "geral",
    dentist_id: dentists[0].id,
  });

  await page.keyboard.press("Escape");
  await expect(teamButton).toBeFocused();
});

test("exibe somente as fotos selecionadas na galeria da clínica", async ({ page }) => {
  const applicationConsoleErrors: string[] = [];
  const externalConsoleErrors: { text: string; url: string }[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;

    const url = message.location().url;
    if (url.startsWith("http://127.0.0.1:4173")) {
      applicationConsoleErrors.push(message.text());
    } else {
      externalConsoleErrors.push({ text: message.text(), url });
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");

  const structure = page.locator("#estrutura");
  await expect(
    structure.getByRole("heading", { level: 3, name: "Conheça nosso espaço" }),
  ).toBeVisible();
  await expect(
    structure.getByText(
      "Instalações modernas, organizadas e preparadas para receber você com conforto no Absolutto Business Towers.",
      { exact: true },
    ),
  ).toBeVisible();

  const gallery = structure.getByTestId("clinic-gallery");
  await expect(gallery.locator("figure")).toHaveCount(3);
  await expect(gallery.locator("figcaption")).toHaveText([
    "Torre 2, sala 403",
    "Recepção confortável e acolhedora",
    "Ambientes organizados para o atendimento",
  ]);
  await expect(structure.getByRole("img")).toHaveCount(4);

  const expectedImages = [
    {
      alt: "Entrada da Clínica Odontológica Barra Bonita na sala 403",
      src: /clinica-entrada-sala-403.*\.webp$/,
    },
    {
      alt: "Recepção da Clínica Odontológica Barra Bonita no Recreio dos Bandeirantes",
      src: /clinica-recepcao-confortavel.*\.webp$/,
    },
    {
      alt: "Corredor interno e acesso aos consultórios da Clínica Odontológica Barra Bonita",
      src: /clinica-corredor-interno.*\.webp$/,
    },
  ];

  for (const image of expectedImages) {
    const locator = gallery.getByRole("img", { name: image.alt });
    await expect(locator).toBeVisible();
    await expect(locator).toHaveAttribute("src", image.src);
    await expect(locator).toHaveAttribute("loading", "lazy");
  }

  expect(applicationConsoleErrors).toEqual([]);
  expect(
    externalConsoleErrors.every(
      (error) =>
      (error.text === "Failed to load resource: net::ERR_NAME_NOT_RESOLVED" ||
        error.text === "Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED") &&
        (error.url.startsWith("https://www.google-analytics.com/") ||
          error.url.startsWith("https://www.googletagmanager.com/") ||
          error.url.startsWith("https://analytics.google.com/") ||
          error.url.startsWith("https://stats.g.doubleclick.net/") ||
          error.url.startsWith("https://fonts.googleapis.com/") ||
          error.url.startsWith("https://fonts.gstatic.com/")),
    ),
  ).toBe(true);
  expect(pageErrors).toEqual([]);
});

test("abre, navega e fecha o lightbox acessível", async ({ page }) => {
  await page.goto("/");

  const trigger = page.getByRole("button", {
    name: "Ampliar foto: Torre 2, sala 403",
  });
  await trigger.focus();
  await trigger.press("Enter");

  const dialog = page.getByRole("dialog");
  const closeButton = dialog.getByRole("button", {
    name: "Fechar foto ampliada",
  });
  const previousButton = dialog.getByRole("button", {
    name: "Mostrar foto anterior",
  });
  const nextButton = dialog.getByRole("button", {
    name: "Mostrar próxima foto",
  });

  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();
  await expect(dialog.getByText("Foto 1 de 3", { exact: true })).toBeVisible();

  await page.keyboard.press("Shift+Tab");
  await expect(nextButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(
    dialog.getByRole("heading", {
      level: 2,
      name: "Recepção confortável e acolhedora",
    }),
  ).toBeVisible();
  await expect(dialog.getByText("Foto 2 de 3", { exact: true })).toBeVisible();

  await nextButton.click();
  await expect(
    dialog.getByRole("heading", {
      level: 2,
      name: "Ambientes organizados para o atendimento",
    }),
  ).toBeVisible();

  await previousButton.click();
  await expect(dialog.getByText("Foto 2 de 3", { exact: true })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("usa scroll manual com snap e prévia do próximo card no celular", async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Cenário exclusivo para mobile");
  await page.goto("/");

  const gallery = page.getByTestId("clinic-gallery");
  const metrics = await gallery.evaluate((element) => {
    const items = element.querySelectorAll("li");
    const galleryRect = element.getBoundingClientRect();
    const galleryStyles = getComputedStyle(element);
    const firstRect = items[0]?.getBoundingClientRect();
    const secondRect = items[1]?.getBoundingClientRect();
    const contentWidth =
      element.clientWidth -
      Number.parseFloat(galleryStyles.paddingLeft) -
      Number.parseFloat(galleryStyles.paddingRight);

    return {
      clientWidth: element.clientWidth,
      contentWidth,
      scrollWidth: element.scrollWidth,
      snapType: getComputedStyle(element).scrollSnapType,
      firstWidth: firstRect?.width ?? 0,
      showsNextCard: secondRect
        ? secondRect.left < galleryRect.right && secondRect.right > galleryRect.right
        : false,
    };
  });

  expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  expect(metrics.snapType).toContain("x mandatory");
  expect(metrics.firstWidth / metrics.contentWidth).toBeGreaterThan(0.8);
  expect(metrics.firstWidth / metrics.contentWidth).toBeLessThan(0.84);
  expect(metrics.showsNextCard).toBe(true);
});

test("exibe os titulos nos botoes de WhatsApp do contato", async ({ page }) => {
  await page.goto("/");

  const contact = page.locator("#contato");
  for (const dentist of dentists) {
    const link = contact.getByRole("link", {
      name: `WhatsApp ${dentist.shortName}`,
      exact: true,
    });

    await expect(link).toHaveAttribute("href", dentist.whatsappUrl);
  }
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
      await expect(mobileNavigation.getByRole("link")).toHaveText([...expectedLabels, "Blog"]);
      await expect(mobileNavigation.getByRole("link", { name: "Blog", exact: true })).toHaveAttribute("href", "/blog/");
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
