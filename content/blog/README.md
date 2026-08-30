# Conteúdo do blog

Cada artigo é um arquivo `.mdx` com uma imagem WebP/AVIF em `public/images/blog/`. Não crie páginas React individuais.

1. Leia [`docs/blog/AI_BLOG_AUTHORING.md`](../../docs/blog/AI_BLOG_AUTHORING.md).
2. Use `_template.mdx` ou `npm run blog:new`.
3. Escolha um serviço do registry; categoria, profissional, landing e CTA são derivados dele.
4. Gere uma cena de atendimento com o profissional do serviço usando a foto oficial como referência: `npm run blog:image -- --slug={slug} --service={service} --input=<imagem-gerada> --reference=public<foto-oficial>`. Não use pessoa aleatória.
5. Execute `npm run blog:validate`.
6. Todo artigo válido é publicado automaticamente. `publishedAt` representa a publicação real e é usado para ordenar os artigos pelo horário, com o slug como desempate. `updatedAt` é opcional e só deve ser preenchido após uma alteração editorial relevante; não existem `status`, `review` ou modo rascunho.

O cabeçalho dos artigos e os cards do índice exibem apenas autoria e/ou tempo estimado de leitura; datas e revisão não são apresentados como blocos visuais.

Todos os artigos carregados entram no índice, sitemap, RSS, relacionados e produção; apenas `_template.mdx` e o fixture opcional ficam fora do catálogo padrão.

`publishedAt` exige um timestamp ISO-8601 completo com horário e fuso, pois representa o instante real de publicação. `updatedAt` aceita uma data `YYYY-MM-DD` ou um timestamp ISO-8601 com fuso, não pode ser anterior à publicação e não deve ser alterado por causa de um novo build ou deploy. No sitemap, artigos usam `updatedAt` quando informado e, caso contrário, `publishedAt`; páginas estáticas não recebem uma data artificial de build.

`fixture-blog.mdx` e sua imagem só são carregados em testes quando
`BLOG_INCLUDE_FIXTURES=1`; nunca use esse modo no deploy.
