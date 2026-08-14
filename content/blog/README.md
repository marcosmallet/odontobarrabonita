# Conteúdo do blog

Cada artigo é um arquivo `.mdx` com uma imagem WebP/AVIF em `public/images/blog/`. Não crie páginas React individuais.

1. Leia [`docs/blog/AI_BLOG_AUTHORING.md`](../../docs/blog/AI_BLOG_AUTHORING.md).
2. Use `_template.mdx` ou `npm run blog:new`.
3. Escolha um serviço do registry; categoria, profissional, landing e CTA são derivados dele.
4. Adicione a imagem com o mesmo slug e preencha o alt text.
5. Execute `npm run blog:validate`.
6. Mantenha `review.status: pending` até uma aprovação odontológica humana real.

Drafts e artigos em revisão não entram no índice, sitemap, RSS, relacionados ou produção.

`fixture-blog.mdx` e sua imagem só são carregados em testes quando
`BLOG_INCLUDE_FIXTURES=1`; nunca use esse modo no deploy.
