import { expect, test } from "@playwright/test";
import { googleReviewUrl } from "../../src/lib/site-data";

const reviewPageUrl = "https://odontobarrabonita.com.br/avaliar";
const reviewImageUrl = "https://odontobarrabonita.com.br/og-avaliacao-google.jpg";

test("entrega HTML 200 com metadata de avaliação sem redirect HTTP", async ({
  request,
}) => {
  const paths = ["/avaliar", "/avaliar/", "/avaliar?v=1"];

  for (const path of paths) {
    const response = await request.get(path, { maxRedirects: 0 });
    const html = await response.text();

    expect(response.status(), path).toBe(200);
    expect(response.headers().location, path).toBeUndefined();
    expect(html).toContain("Avalie a Clínica Odontológica Barra Bonita");
    expect(html).toContain("Conte como foi sua experiência e deixe sua avaliação no Google.");
    expect(html).toContain('name="robots" content="noindex, follow"');
    expect(html).toContain(`rel="canonical" href="${reviewPageUrl}"`);
    expect(html).toContain('property="og:title" content="Clínica Odontológica Barra Bonita agradece sua avaliação"');
    expect(html).toContain('property="og:description" content="Conte como foi sua experiência e deixe sua avaliação no Google."');
    expect(html).toContain(`property="og:image" content="${reviewImageUrl}"`);
    expect(html).toContain(`property="og:image:secure_url" content="${reviewImageUrl}"`);
    expect(html).toContain('property="og:image:type" content="image/jpeg"');
    expect(html).toContain(`property="og:url" content="${reviewPageUrl}"`);
    expect(html).toContain('property="og:locale" content="pt_BR"');
    expect(html).toContain(`href="${googleReviewUrl}"`);
  }
});

test("publica a imagem Open Graph e mantém o sitemap sem a rota funcional", async ({
  request,
}) => {
  const imageResponse = await request.get("/og-avaliacao-google.jpg");
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toMatch(/^image\/jpeg/);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(await sitemapResponse.text()).not.toContain("/avaliar");
});

test("renderiza o fluxo acessível e sem overflow", async ({ page }) => {
  const applicationErrors: string[] = [];
  page.on("pageerror", (error) => applicationErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (message.location().url.startsWith("http://127.0.0.1:4173")) {
      applicationErrors.push(message.text());
    }
  });

  await page.route(googleReviewUrl, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "ok" }),
  );
  await page.goto("/avaliar");

  await expect(
    page.getByRole("heading", { level: 1, name: "Avalie sua experiência" }),
  ).toBeVisible();
  await expect(
    page.getByText("Sua opinião é muito importante para a Clínica Odontológica Barra Bonita."),
  ).toBeVisible();
  await expect(page.getByTestId("review-redirect-status")).toBeVisible();
  await expect(page.getByRole("link", { name: "Avaliar no Google", exact: true })).toHaveAttribute(
    "href",
    googleReviewUrl,
  );

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
  expect(applicationErrors).toEqual([]);
});

test("redireciona automaticamente para o Google após o carregamento", async ({ page }) => {
  await page.route(googleReviewUrl, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "ok" }),
  );
  await page.goto("/avaliar");

  const startedAt = Date.now();
  await page.waitForURL(googleReviewUrl, { timeout: 5000 });
  const elapsed = Date.now() - startedAt;

  expect(elapsed).toBeGreaterThanOrEqual(900);
  expect(page.url()).toBe(googleReviewUrl);
});

test("botão manual navega para o Google na mesma aba", async ({ page }) => {
  await page.route(googleReviewUrl, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "ok" }),
  );
  await page.goto("/avaliar");
  await page.getByRole("link", { name: "Avaliar no Google", exact: true }).click();

  await expect.poll(() => page.url()).toBe(googleReviewUrl);
});

test("oferece fallback quando JavaScript está desativado", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  try {
    const response = await page.goto("/avaliar");
    expect(response?.status()).toBe(200);
    const html = await page.content();
    expect(html).toContain("<noscript>");
    expect(html).toContain("O redirecionamento automático precisa de JavaScript");
    expect(html).toContain(`href="${googleReviewUrl}"`);
    await expect(
      page.getByRole("link", { name: "Avaliar no Google", exact: true }),
    ).toHaveAttribute("href", googleReviewUrl);
  } finally {
    await context.close();
  }
});

test("mantém as páginas públicas existentes acessíveis", async ({ request }) => {
  for (const path of ["/", "/politica-de-privacidade"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
  }
});
