# AI Blog Authoring Standard

Este documento é a fonte de verdade para criação e edição de artigos do blog da Clínica Odontológica Barra Bonita. Qualquer agente de IA deve lê-lo antes de alterar `content/blog/`.

## Regras obrigatórias

- Nunca crie uma página React para um artigo; use apenas `content/blog/{slug}.mdx`.
- Nunca duplique dados de profissional, serviço, CTA, Analytics ou landing page.
- O comando explícito de aprovação recebido no fluxo (por exemplo, `aprovado`) é suficiente para liberar a publicação; nunca invente ou antecipe esse comando.
- Não exiba no cabeçalho dos artigos nem nos cards do índice as datas de publicação/atualização ou a linha de revisor; essas informações permanecem apenas nos metadados estruturados e nos artefatos técnicos.
- A imagem destacada deve ser uma cena gerada de atendimento em que aparece o profissional relacionado ao `service` no registry. Use a foto oficial de `src/lib/site-data.ts` como referência de identidade; nunca use pessoa aleatória, banco de imagem ou profissional diferente.
- Nunca invente diagnóstico, eficácia, porcentagem, prognóstico, contraindicação, referência, DOI, CRO, telefone, preço ou resultado.
- Não crie tags ou páginas para cada variação de keyword. Verifique intenção e canibalização antes de criar.
- Slugs publicados são imutáveis no GitHub Pages; uma mudança futura exige solução de redirect HTTP real antes de remover a URL antiga.

## Fluxo obrigatório

1. Ler este documento e `src/lib/blog/services.ts`.
2. Ler `src/lib/blog/categories.ts` e os dados dos profissionais em `src/lib/site-data.ts`.
3. Pesquisar artigos, slugs, `primaryQuery`, serviços e landing pages existentes.
4. Verificar se a intenção já é atendida; prefira atualizar artigo existente quando houver canibalização.
5. Definir intenção, query principal, serviço e fontes confiáveis quando houver afirmações clínicas.
6. Criar o MDX com `npm run blog:new` ou `_template.mdx`.
7. Gerar/verificar visualmente uma cena de atendimento com o profissional relacionado ao serviço e salvar `public/images/blog/{slug}.webp` ou `.avif`; use `npm run blog:image -- --slug={slug} --service={service} --input=<imagem-gerada> --reference=public<foto-oficial>`. O script exige a referência oficial correspondente.
8. Escrever para pessoas, responder cedo e usar H2/H3; não exigir contagem fixa de palavras.
9. Adicionar somente links contextuais reais.
10. Executar `npm run blog:validate`, lint, typecheck, testes e build.
11. Manter `status: review` ou `draft` e `review.status: pending` até receber o comando explícito de aprovação. Ao recebê-lo, registrar `status: published`, `review.status: approved`, `publishedAt` e `reviewedAt` com as datas da operação; o revisor continua sendo o profissional derivado do serviço.

## Frontmatter mínimo

Use os campos de `_template.mdx`. `canonical`, metadata, JSON-LD, CTA, profissional, relacionados, sitemap, RSS e Analytics são automáticos. `author: clinic` é o padrão; o dentista aparece como revisor quando aprovado.

## Imagem e conteúdo médico

Gere uma fotografia institucional realista de atendimento, com o profissional oficial relacionado ao serviço conversando ou orientando um paciente. Use a foto oficial apenas como referência de identidade; o arquivo final deve mostrar uma situação de atendimento, ser WebP/AVIF otimizado e não conter texto ou marca d'água. O alt deve descrever a cena, nunca repetir keywords. Sem acesso a fontes, escreva de forma conservadora e marque o artigo para revisão; nunca fabrique referências.

### Fallback sem geração de imagem

Se o agente não tiver uma ferramenta de geração/otimização de imagem, não invente um arquivo nem publique o artigo. Gere um prompt para produção posterior, por exemplo:

```text
Fotografia editorial realista, horizontal 16:9, 1600x900, do profissional oficial relacionado ao serviço conversando e orientando um paciente em consultório odontológico, usando a foto oficial como referência de identidade, iluminação natural, sem texto, sem logotipos, sem sangue, sem antes/depois e sem substituir o rosto por uma pessoa aleatória.
```

Mantenha `status: draft`, `review.status: pending` e a imagem pendente até o arquivo WebP/AVIF otimizado existir e passar por `npm run blog:validate`.

## Como solicitar um novo artigo

Prompt mínimo:

```text
Crie um novo artigo para o blog sobre: "Tratamento de canal dói?"
Siga obrigatoriamente docs/blog/AI_BLOG_AUTHORING.md.
```

Prompt com serviço:

```text
Crie um artigo sobre: "Quem perdeu um dente há muitos anos ainda pode fazer implante?"
service: implante
Siga docs/blog/AI_BLOG_AUTHORING.md.
```

Prompt avançado:

```text
Tema: Clareamento dental causa sensibilidade?
Primary query: clareamento dental causa sensibilidade
Service: clareamento
Search intent: informational
Siga docs/blog/AI_BLOG_AUTHORING.md.
```

Mesmo com prompt curto, a IA deve descobrir registries, imagem, links, schema, CTA, Analytics, validação e revisão pelo repositório. Não deve perguntar novamente dados já cadastrados.

## Exemplo não publicado

O `_template.mdx` é um exemplo estrutural e nunca pode ser publicado. Não use aprovação fictícia para transformar exemplo em artigo público.
