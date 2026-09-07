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
        ├── sitemap (páginas institucionais + serviços + artigos)
        └── RSS
```

O conteúdo é compilado pelo `@next/mdx` no build. O App Router usa `generateStaticParams()` e static export. Todo MDX válido gera rota e é indexável; não existem drafts, revisão ou filtro de publicação. `publishedAt` representa a publicação e ordena o catálogo; `updatedAt` opcional representa uma alteração editorial posterior.

`src/lib/seo-pages.ts` centraliza as páginas institucionais, deriva landings de `services[].detailsHref`, incorpora `getPublishedPosts()` e normaliza URLs. `/avaliar/` é explicitamente não indexável. O sitemap omite `lastmod` de páginas estáticas e usa `updatedAt ?? publishedAt` nos artigos.

Ao criar uma nova landing de serviço, basta manter o `detailsHref` no item correspondente de `src/lib/site-data.ts`. Uma nova página institucional que não seja serviço deve ser adicionada a `staticIndexablePages`; em ambos os casos, o build confirma que a rota exportada tem canonical indexável e aparece exatamente uma vez no sitemap.

Depois do build, `npm run seo:validate` inspeciona o XML, o HTML exportado, `robots.txt` e o feed RSS. A validação bloqueia URLs duplicadas ou malformadas, páginas indexáveis ausentes, canonical divergente, `noindex` no sitemap e datas editoriais incorretas. Um novo build não altera `lastmod` de páginas cujo conteúdo não mudou.

`src/lib/blog/services.ts` é o registry relacional do blog; `src/lib/site-data.ts` continua sendo a fonte institucional dos profissionais e contatos. A API central impede que sitemap, RSS, relacionados e componentes implementem filtros divergentes.

O vínculo `service → professionalId` define o profissional padrão e a foto oficial usada como referência de identidade na cena gerada da imagem destacada. Um artigo pode declarar `featuredProfessional` com outro ID já cadastrado quando a pauta editorial exigir um profissional específico; nesse caso, CTA, Analytics e imagem usam esse profissional apenas para o artigo. `scripts/prepare-blog-image.ts` exige essa referência e gera o arquivo final por slug em `public/images/blog/`.

O MDX v1 é Markdown-only: imports, exports, expressões, HTML e JSX são rejeitados. Componentes estruturais vivem em `src/components/blog/`.

O Analytics reutiliza a única instalação GA4 e o helper existente. CTAs de artigo enviam `whatsapp_click`, `service`, `dentist`, `cta_location=blog_article`, `content_slug`, aliases legados e dados de origem, sem PII ou texto clínico.
