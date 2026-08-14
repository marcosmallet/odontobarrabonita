import { expect, test } from "@playwright/test";

test.describe("blog", () => {
  test("índice é crawlable e não exibe datas nos cards", async ({ page }) => {
    test.skip(process.env.BLOG_INCLUDE_FIXTURES === "1", "O build de fixture contém um artigo de teste.");
    await page.goto("/blog/");
    await expect(page).toHaveTitle(/Conteúdos sobre saúde bucal/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Tratamento de canal dói\?/ })).toBeVisible();
    await expect(page.locator("article time")).toHaveCount(0);
    await expect(page.locator('a[href="/blog/fixture-blog/"]')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test("fixture aprovado renderiza artigo, FAQ, CTA e Analytics", async ({ page }) => {
    test.skip(process.env.BLOG_INCLUDE_FIXTURES !== "1", "O fixture só existe no build de teste.");
    await page.goto("/blog/fixture-blog/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Fixture de artigo");
    await expect(page.getByText(/Publicado em|Atualizado em/)).toHaveCount(0);
    await expect(page.getByText("Revisado por")).toHaveCount(0);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    await expect(page.locator('article img[alt="Imagem de teste da clínica odontológica"]')).toHaveCount(1);
    await expect(page.getByText("Este artigo é público?")).toBeVisible();
    const cta = page.getByRole("link", { name: /Agendar .*avaliação/ });
    await expect(cta).toHaveAttribute("href", /wa\.me/);
    await page.evaluate(() => { (window as unknown as { dataLayer: unknown[] }).dataLayer = []; });
    await cta.click({ noWaitAfter: true });
    const eventPayload = await page.evaluate(() => {
      const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
      const event = dataLayer.map((entry) => Array.from(entry as ArrayLike<unknown>)).find((entry) => entry[0] === "event" && entry[1] === "whatsapp_click");
      return event?.[2];
    });
    expect(eventPayload).toMatchObject({ cta_location: "blog_article", content_slug: "fixture-blog", service: "canal", service_name: "canal", dentist_id: "francisco" });
    const jsonLd = await page.locator('script[type="application/ld+json"]').evaluate((node) => node.textContent || node.innerHTML);
    expect(jsonLd).toContain("BlogPosting");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
