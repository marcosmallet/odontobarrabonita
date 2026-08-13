# Relatório — landing pages SEO de tratamentos

## Rotas e atendimento

| Rota | Profissional | `service_name` |
| --- | --- | --- |
| `/implante-dentario-no-recreio/` | Dr. Carlos · CRO/RJ 22487 | `implante` |
| `/tratamento-de-canal-no-recreio/` | Dr. Francisco · CRO/RJ 55471 | `canal` |
| `/clareamento-dental-no-recreio/` | Dr. Francisco · CRO/RJ 55471 | `clareamento` |
| `/ortodontista-no-recreio/` | Dr. Carlos · CRO/RJ 22487 | `ortodontia` |
| `/protese-dentaria-no-recreio/` | Dra. Márcia · CRO/RJ 20664 | `protese` |
| `/restauracao-dentaria-no-recreio/` | Dr. Francisco · CRO/RJ 55471 | `restauracao` |
| `/limpeza-dental-no-recreio/` | Dr. Francisco · CRO/RJ 55471 | `limpeza` |

Cada página usa o template compartilhado, quatro imagens próprias, conteúdo editorial específico, breadcrumb, introdução, avaliação com quatro cards, bloco de indicação, planejamento, quatro etapas, quatro princípios de cuidado, profissional, clínica, mapa, FAQ com seis perguntas, CTA e aviso informativo.

## Assets

Os 28 WebPs foram inspecionados individualmente e comprimidos com qualidade 82. O hero é 1536×1024 e recebe `priority`; avaliação é 1448×1086; planejamento é 1536×1024; CTA é 1254×1254. Todos têm menos de 150 KB. Hashes são SHA-256 truncados para 16 caracteres.

| Arquivo | Uso | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `implante/implante-dentario-recreio-hero.webp` | hero/OG | 74938 | `0ad8af8ea289cece` |
| `implante/implante-dentario-avaliacao.webp` | avaliação | 74422 | `29e4e234982e1713` |
| `implante/implante-dentario-planejamento.webp` | planejamento | 77168 | `44e70e97c6e1f753` |
| `implante/implante-dentario-recreio-cta.webp` | CTA | 69154 | `600093c4d32a03fe` |
| `canal/tratamento-canal-recreio-hero.webp` | hero/OG | 59844 | `0b1715e339e4a116` |
| `canal/tratamento-canal-avaliacao.webp` | avaliação | 86192 | `71cc4b31d26a7639` |
| `canal/tratamento-canal-planejamento.webp` | planejamento | 75404 | `30987045405fb746` |
| `canal/tratamento-canal-recreio-cta.webp` | CTA | 61558 | `e692525914a20af0` |
| `clareamento/clareamento-dental-recreio-hero.webp` | hero/OG | 65324 | `1da092a11677e8ca` |
| `clareamento/clareamento-dental-avaliacao.webp` | avaliação | 57524 | `19ea5db36bf48022` |
| `clareamento/clareamento-dental-planejamento.webp` | planejamento | 75378 | `471a4da6adaf70d8` |
| `clareamento/clareamento-dental-recreio-cta.webp` | CTA | 61134 | `c52777a08e342019` |
| `ortodontia/ortodontista-recreio-hero.webp` | hero/OG | 60062 | `0d68b3002d25d438` |
| `ortodontia/ortodontia-avaliacao.webp` | avaliação | 57388 | `54c0b930b2f7a3dd` |
| `ortodontia/ortodontia-planejamento.webp` | planejamento | 83026 | `e06b078b041f2319` |
| `ortodontia/ortodontista-recreio-cta.webp` | CTA | 56006 | `5e98dceb2b5f4df0` |
| `protese/protese-dentaria-recreio-hero.webp` | hero/OG | 56982 | `dd729f476ab06ffe` |
| `protese/protese-dentaria-avaliacao.webp` | avaliação | 70088 | `dd35b0784f45ec45` |
| `protese/protese-dentaria-planejamento.webp` | planejamento | 74770 | `b5e1750c1a996f6e` |
| `protese/protese-dentaria-recreio-cta.webp` | CTA | 64266 | `a88d4496adf56730` |
| `restauracao/restauracao-dentaria-recreio-hero.webp` | hero/OG | 55686 | `f0329ddef42e91ca` |
| `restauracao/restauracao-dentaria-avaliacao.webp` | avaliação | 69764 | `75016961bc350739` |
| `restauracao/restauracao-dentaria-planejamento.webp` | planejamento | 79806 | `93e729375af537ba` |
| `restauracao/restauracao-dentaria-recreio-cta.webp` | CTA | 81850 | `aa793e943ada9924` |
| `limpeza/limpeza-dental-recreio-hero.webp` | hero/OG | 50044 | `001a7d8153d78040` |
| `limpeza/limpeza-dental-avaliacao.webp` | avaliação | 62970 | `a83227d7087a52f2` |
| `limpeza/limpeza-dental-planejamento.webp` | planejamento | 69402 | `0f789ccb7ed6c4aa` |
| `limpeza/limpeza-dental-recreio-cta.webp` | CTA | 67274 | `958fffe968229b45` |

Total dos assets: 1,897,424 bytes (média de 67,765 bytes por imagem).

## SEO, schemas e analytics

- Cada rota exporta title, H1, description exclusiva de 140–160 caracteres, keywords, canonical com barra final, `index/follow`, Open Graph e Twitter Card.
- O JSON-LD é um único `@graph` com `Dentist`, `Person`, `Service`, `MedicalWebPage`, `FAQPage` e `BreadcrumbList`, ligados por `@id` à clínica, ao profissional e ao serviço.
- WhatsApp e mapa usam `whatsapp_click`/`directions_click` com `cta_location`, `page_path`, `service_name`, `dentist_id` e `contact_method`. Não foi criado botão de telefone novo.
- Home: nove cards em três colunas no desktop, sete links de tratamento. A landing de dentista mantém seis cards e adiciona limpeza como link contextual; o menu não foi ampliado.

## Validação

- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado.
- `npm run build`: aprovado; as sete pastas foram prerenderizadas em `out/`.
- `npx playwright test`: 99 aprovados, 3 skips condicionais já existentes (matriz mobile/desktop de testes antigos).
- Suíte nova: 14/14 testes desktop e 14/14 incluídos na matriz completa.
- Smoke visual 1440×900, 768×1024 e 390×844 nas sete rotas: sem overflow, um H1 e quatro imagens por página. O console apresentou apenas bloqueio de rede do Google Tag Manager no ambiente de teste.
