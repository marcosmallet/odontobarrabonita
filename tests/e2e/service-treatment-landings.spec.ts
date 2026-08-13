import { expect, test } from "@playwright/test";
import { dentists } from "../../src/lib/site-data";

const pages = [
  { id: "implante", serviceName: "implante", pagePath: "/implante-dentario-no-recreio/", title: "Implante Dentário no Recreio | Clínica Barra Bonita", h1: "Implante Dentário no Recreio dos Bandeirantes", description: "Implante dentário no Recreio dos Bandeirantes com avaliação individual, planejamento responsável e atendimento na Clínica Barra Bonita no Rio.", professionalId: "carlos", related: [{ href: "/protese-dentaria-no-recreio/", label: "Entender a relação entre implante e prótese" }, { href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }] },
  { id: "canal", serviceName: "canal", pagePath: "/tratamento-de-canal-no-recreio/", title: "Tratamento de Canal no Recreio | Clínica Barra Bonita", h1: "Tratamento de Canal no Recreio dos Bandeirantes", description: "Tratamento de canal no Recreio dos Bandeirantes com avaliação da parte interna do dente e planejamento cuidadoso na Clínica Barra Bonita no Rio.", professionalId: "francisco", related: [{ href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }, { href: "/limpeza-dental-no-recreio/", label: "Conhecer limpeza dental" }] },
  { id: "clareamento", serviceName: "clareamento", pagePath: "/clareamento-dental-no-recreio/", title: "Clareamento Dental no Recreio | Clínica Barra Bonita", h1: "Clareamento Dental no Recreio dos Bandeirantes", description: "Clareamento dental no Recreio dos Bandeirantes com avaliação da saúde bucal, indicação profissional e orientação na Clínica Barra Bonita no Rio.", professionalId: "francisco", related: [{ href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }, { href: "/limpeza-dental-no-recreio/", label: "Conhecer limpeza dental" }] },
  { id: "ortodontia", serviceName: "ortodontia", pagePath: "/ortodontista-no-recreio/", title: "Ortodontista no Recreio | Clínica Barra Bonita", h1: "Ortodontista no Recreio dos Bandeirantes", description: "Ortodontista no Recreio dos Bandeirantes para avaliar aparelhos fixos, móveis ou alinhadores conforme o planejamento individual no Rio de Janeiro.", professionalId: "carlos", related: [{ href: "/alinhadores-no-recreio/", label: "Conhecer alinhadores transparentes" }, { href: "/implante-dentario-no-recreio/", label: "Conhecer implante dentário" }] },
  { id: "protese", serviceName: "protese", pagePath: "/protese-dentaria-no-recreio/", title: "Prótese Dentária no Recreio | Clínica Barra Bonita", h1: "Prótese Dentária no Recreio dos Bandeirantes", description: "Prótese dentária no Recreio dos Bandeirantes com avaliação individual para recuperar função, conforto e harmonia do sorriso com cuidado profissional.", professionalId: "marcia", related: [{ href: "/implante-dentario-no-recreio/", label: "Conhecer implante dentário" }, { href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }] },
  { id: "restauracao", serviceName: "restauracao", pagePath: "/restauracao-dentaria-no-recreio/", title: "Restauração Dentária no Recreio | Clínica Barra Bonita", h1: "Restauração Dentária no Recreio dos Bandeirantes", description: "Restauração dentária no Recreio dos Bandeirantes para avaliar cáries, desgastes e fraturas com planejamento cuidadoso na Clínica Barra Bonita.", professionalId: "francisco", related: [{ href: "/tratamento-de-canal-no-recreio/", label: "Conhecer tratamento de canal" }, { href: "/limpeza-dental-no-recreio/", label: "Conhecer limpeza dental" }] },
  { id: "limpeza", serviceName: "limpeza", pagePath: "/limpeza-dental-no-recreio/", title: "Limpeza Dental no Recreio | Clínica Barra Bonita", h1: "Limpeza Dental no Recreio dos Bandeirantes", description: "Limpeza dental no Recreio dos Bandeirantes com avaliação da higiene, biofilme e saúde gengival na Clínica Odontológica Barra Bonita no Rio de Janeiro.", professionalId: "francisco", related: [{ href: "/clareamento-dental-no-recreio/", label: "Conhecer clareamento dental" }, { href: "/tratamento-de-canal-no-recreio/", label: "Conhecer tratamento de canal" }] },
] as const;

for (const config of pages) {
  test.describe(config.title, () => {
    const professional = dentists.find((dentist) => dentist.id === config.professionalId)!;

    test("publica conteúdo, metadados, imagens e schema próprios", async ({ page, request }) => {
      expect((await request.get(config.pagePath)).status()).toBe(200);
      await page.goto(config.pagePath);
      await expect(page).toHaveTitle(config.title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1, name: config.h1 })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://odontobarrabonita.com.br${config.pagePath}`);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBe(config.description);
      expect(description?.length).toBeGreaterThanOrEqual(140);
      expect(description?.length).toBeLessThanOrEqual(160);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/images/${config.id}/`));

      await expect(page.locator("[data-service-image]")).toHaveCount(4);
      const imageData = await page.locator("[data-service-image]").evaluateAll((images) => images.map((image) => ({ src: image.getAttribute("src"), alt: image.getAttribute("alt") })));
      expect(imageData).toHaveLength(4);
      for (const image of imageData) {
        expect(image.alt).toBeTruthy();
        expect(image.src).toMatch(/_next\/static\/media\//);
      }

      const sectionOrder = await page.locator("[data-service-section]").evaluateAll((sections) => sections.map((section) => section.getAttribute("data-service-section")));
      expect(sectionOrder).toEqual(["hero", "introduction", "evaluation", "details", "process", "care", "professional", "clinic", "location", "faq", "final-cta", "related", "legal"]);
      await expect(page.locator('[data-service-section="evaluation"] article')).toHaveCount(4);
      await expect(page.locator('[data-service-section="care"] article')).toHaveCount(4);
      await expect(page.locator('[data-service-section="process"] li')).toHaveCount(4);
      await expect(page.locator("#faq h3")).toHaveCount(6);
      await expect(page.getByRole("heading", { name: professional.name, exact: true })).toBeVisible();
      await expect(page.getByText(professional.cro, { exact: true }).first()).toBeVisible();

      const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@graph"].map((node: { "@type": string }) => node["@type"])).toEqual(["Dentist", "Person", "Service", "MedicalWebPage", "FAQPage", "BreadcrumbList"]);
      expect(jsonLd["@graph"].find((node: { "@type": string }) => node["@type"] === "FAQPage").mainEntity).toHaveLength(6);

      const sitemap = await request.get("/sitemap.xml");
      expect(sitemap.status()).toBe(200);
      expect(await sitemap.text()).toContain(`https://odontobarrabonita.com.br${config.pagePath}`);
    });

    test("direciona WhatsApp, mapa e links editoriais", async ({ page }) => {
      await page.goto(config.pagePath);
      const whatsappLinks = page.locator(`a[href^="https://wa.me/${professional.phoneInternational.replace(/\D/g, "")}"]`);
      expect(await whatsappLinks.count()).toBeGreaterThanOrEqual(7);
      for (const link of await whatsappLinks.all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
      await expect(page.locator("#localizacao").getByRole("link", { name: "Como chegar" })).toHaveAttribute("href", /maps\.app\.goo\.gl/);
      for (const relatedLink of config.related) {
        await expect(page.getByRole("link", { name: relatedLink.label, exact: true })).toHaveAttribute("href", relatedLink.href);
      }
      await expect(page.getByRole("link", { name: new RegExp(`Agendar avaliação para ${config.serviceName}`) })).toBeVisible();
    });
  });
}
