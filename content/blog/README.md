# Conteúdo do blog

Cada artigo é um arquivo `.mdx` com uma imagem WebP/AVIF em `public/images/blog/`. Não crie páginas React individuais.

1. Leia [`docs/blog/AI_BLOG_AUTHORING.md`](../../docs/blog/AI_BLOG_AUTHORING.md).
2. Use `_template.mdx` ou `npm run blog:new`.
3. Escolha um serviço do registry; categoria, profissional, landing e CTA são derivados dele.
4. Gere uma cena de atendimento com o profissional do serviço usando a foto oficial como referência: `npm run blog:image -- --slug={slug} --service={service} --input=<imagem-gerada> --reference=public<foto-oficial>`. Não use pessoa aleatória.
5. Execute `npm run blog:validate`.
6. Mantenha `review.status: pending` até receber o comando explícito `aprovado`; nesse momento, registre a aprovação e as datas no frontmatter.

O cabeçalho dos artigos e os cards do índice exibem apenas autoria e/ou tempo estimado de leitura; datas e revisão não são apresentados como blocos visuais.

Drafts e artigos em revisão não entram no índice, sitemap, RSS, relacionados ou produção.

`fixture-blog.mdx` e sua imagem só são carregados em testes quando
`BLOG_INCLUDE_FIXTURES=1`; nunca use esse modo no deploy.
