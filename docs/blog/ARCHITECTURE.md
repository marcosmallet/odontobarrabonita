# Arquitetura do blog

```text
content/blog/*.mdx
        ↓ gray-matter + Zod + validação MDX
getAllPosts / getPublishedPosts
        ↓
Blog index ou /blog/[slug]
        ↓
template compartilhado
        ├── metadata/canonical/Open Graph/Twitter
        ├── BlogPosting + BreadcrumbList
        ├── CTA → serviço → profissional → landing
        ├── relacionados e FAQ visual
        ├── sitemap
        └── RSS
```

O conteúdo é compilado pelo `@next/mdx` no build. O App Router usa `generateStaticParams()` e static export. Em produção somente `published + review.approved + publishedAt + reviewedAt` gera rota. O desenvolvimento pode exibir drafts com `noindex`.

`src/lib/blog/services.ts` é o registry relacional do blog; `src/lib/site-data.ts` continua sendo a fonte institucional dos profissionais e contatos. A API central impede que sitemap, RSS, relacionados e componentes implementem filtros divergentes.

O MDX v1 é Markdown-only: imports, exports, expressões, HTML e JSX são rejeitados. Componentes estruturais vivem em `src/components/blog/`.

O Analytics reutiliza a única instalação GA4 e o helper existente. CTAs de artigo enviam `whatsapp_click`, `service`, `dentist`, `cta_location=blog_article`, `content_slug`, aliases legados e dados de origem, sem PII ou texto clínico.
