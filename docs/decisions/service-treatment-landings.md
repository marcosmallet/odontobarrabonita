# Landing pages de tratamentos locais

## Oitava rota: toxina botulínica

A rota `/toxina-botulinica-no-recreio/` usa o catálogo tipado e o mesmo `ServiceLandingPage`, com Dr. Francisco como profissional responsável. O foco editorial é estética responsável, avaliação individual, expectativas realistas e segurança integrada aos cards e FAQs, sem preços, doses, técnicas, promessas ou indicações presumidas.

Foram adicionados quatro WebPs exclusivos da rota (hero, avaliação, planejamento e CTA), a URL no sitemap e links contextuais na home e em `/dentista-no-recreio/`. A página de harmonização permanece isolada, visual e semanticamente inalterada.

## Entendimento

O site continua sendo uma exportação estática do Next.js, com páginas institucionais para sete intenções de busca no Recreio dos Bandeirantes: implante, tratamento de canal, clareamento, ortodontia, prótese, restauração e limpeza dental. O benchmark visual e semântico de harmonização permanece isolado e intacto.

## Premissas

- Cada rota tem conteúdo editorial próprio, sem formulário, preço, avaliação, urgência comercial ou promessa de resultado.
- A conversa de WhatsApp é direcionada ao profissional definido no briefing e usa `buildWhatsappUrl`.
- O conteúdo é informativo: diagnóstico, indicação, técnica, prazo e resultado dependem de consulta profissional.
- As imagens conceituais são locais, estáticas e não representam retratos de profissionais ou fotografias da clínica.
- O sitemap inclui as sete URLs; o robots existente não precisa de alteração.

## Decisões

1. Usar `ServiceLandingConfig` tipado em `src/lib/service-landing-data.ts` e sete `page.tsx` explícitos. Uma rota dinâmica foi descartada para manter cada intenção indexável e revisável de forma independente.
2. Renderizar todas as rotas com `ServiceLandingPage`, reaproveitando o header, cards de profissional, galeria, localização, FAQ, rodapé e analytics já existentes.
3. Manter quatro imagens por serviço (hero, avaliação, planejamento e CTA), com o hero como imagem Open Graph. Todas são WebP locais; somente o hero recebe `priority`.
4. Publicar um único JSON-LD `@graph` por rota, ligando clínica, profissional, serviço, página médica, FAQ e breadcrumb por `@id`. Não são publicados preço, rating, duração ou especialização não confirmada.
5. Os links de tratamento da home ficam em uma grade de três colunas no desktop. A landing de dentista mostra os seis cards odontológicos já existentes e oferece limpeza por link contextual, sem ampliar o menu principal.
6. Os eventos continuam opcionais: a ausência de `gtag` nunca impede navegação, mapa ou WhatsApp; `phone_click` permanece disponível apenas onde já existe botão de telefone.

## Escopo fora desta decisão

Não há API, banco, CMS, estado cliente novo, alteração de campanha, alteração de retratos profissionais ou alteração de fotografias reais da clínica.
