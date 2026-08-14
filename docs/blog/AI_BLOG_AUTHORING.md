# AI Blog Authoring Standard

Este documento é a fonte de verdade para criação e edição de artigos do blog da Clínica Odontológica Barra Bonita. Qualquer agente de IA deve lê-lo antes de alterar `content/blog/`.

## Regras obrigatórias

- Nunca crie uma página React para um artigo; use apenas `content/blog/{slug}.mdx`.
- Nunca duplique dados de profissional, serviço, CTA, Analytics ou landing page.
- Nunca marque uma revisão como aprovada sem confirmação humana explícita de um cirurgião-dentista.
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
7. Gerar/verificar visualmente a imagem e salvar `public/images/blog/{slug}.webp` ou `.avif`; use `npm run blog:image` para otimizar.
8. Escrever para pessoas, responder cedo e usar H2/H3; não exigir contagem fixa de palavras.
9. Adicionar somente links contextuais reais.
10. Executar `npm run blog:validate`, lint, typecheck, testes e build.
11. Manter `status: review` ou `draft` e `review.status: pending` até aprovação humana.

## Frontmatter mínimo

Use os campos de `_template.mdx`. `canonical`, metadata, JSON-LD, CTA, profissional, relacionados, sitemap, RSS e Analytics são automáticos. `author: clinic` é o padrão; o dentista aparece como revisor quando aprovado.

## Imagem e conteúdo médico

Prefira fotografia institucional realista, sem texto, marca d'água, sangue, anatomia impossível, promessa visual ou antes/depois artificial. O alt deve descrever a cena, nunca repetir keywords. Sem acesso a fontes, escreva de forma conservadora e marque o artigo para revisão; nunca fabrique referências.

### Fallback sem geração de imagem

Se o agente não tiver uma ferramenta de geração/otimização de imagem, não invente um arquivo nem publique o artigo. Gere um prompt para produção posterior, por exemplo:

```text
Fotografia editorial realista, horizontal 16:9, 1600x900, consultório odontológico acolhedor no Recreio dos Bandeirantes, paciente adulto conversando com cirurgião-dentista, iluminação natural, sem texto, sem logotipos, sem sangue, sem antes/depois e sem características clínicas identificáveis.
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
