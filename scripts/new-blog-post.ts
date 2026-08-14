import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "@/lib/blog/posts";
import { getDentalService, dentalServices, type DentalServiceId } from "@/lib/blog/services";
import { blogCategories } from "@/lib/blog/categories";

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function args() {
  return Object.fromEntries(process.argv.slice(2).flatMap((arg) => {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    return match ? [[match[1], match[2]]] : [];
  }));
}

async function ask(label: string, fallback?: string) {
  const { createInterface } = await import("node:readline/promises");
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await readline.question(`${label}${fallback ? ` [${fallback}]` : ""}: `);
  readline.close();
  return answer.trim() || fallback || "";
}

async function main() {
const input = args();
const title = input.title || await ask("Título");
const slug = slugify(input.slug || await ask("Slug", slugify(title)));
const service = (input.service || await ask(`Service (${Object.keys(dentalServices).join(", ")})`)) as DentalServiceId;
const config = getDentalService(service);
if (!config) throw new Error(`Service inexistente: ${service}`);
const query = input.query || await ask("Primary query", title.toLocaleLowerCase("pt-BR"));
const intent = input.intent || await ask("Search intent", "informational");
if (!/^(informational|commercial|commercial-local)$/.test(intent)) throw new Error(`Search intent inválido: ${intent}`);
const outputPath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
if (fs.existsSync(outputPath)) throw new Error(`Já existe um artigo em ${outputPath}.`);
const existing = getAllPosts();
if (existing.some((post) => post.slug === slug)) throw new Error(`Slug duplicado: ${slug}.`);
if (existing.some((post) => post.primaryQuery.trim().toLocaleLowerCase("pt-BR") === query.trim().toLocaleLowerCase("pt-BR"))) throw new Error("primaryQuery já existe; avalie atualizar o artigo existente.");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const category = blogCategories[config.category];
const escapedTitle = title.replaceAll('"', '\\"');
const escapedQuery = query.replaceAll('"', '\\"');
const body = `---
title: "${escapedTitle}"
slug: "${slug}"
description: ""
status: draft
publishedAt: null
updatedAt: null
category: "${category.id}"
service: "${service}"
searchIntent: "${intent}"
primaryQuery: "${escapedQuery}"
secondaryQueries: []
author: clinic
review:
  status: pending
  reviewer: "${config.professionalId}"
  reviewedAt: null
featuredImage: "/images/blog/${slug}.webp"
featuredImageAlt: ""
relatedPosts: []
faq: []
references: []
---

## Resposta principal

Escreva aqui uma resposta clara e responsável à dúvida principal. Este scaffold não gera conteúdo clínico automaticamente.
`;
fs.writeFileSync(outputPath, body, "utf8");
console.log(`Draft criado: ${outputPath}`);
console.log(`Categoria: ${category.label}; revisor: ${config.professionalId}; imagem esperada: /public/images/blog/${slug}.webp`);
}

void main();
