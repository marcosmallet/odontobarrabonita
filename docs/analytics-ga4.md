# Rastreamento de conversões e leads no GA4

## Auditoria da instalação

O site usa uma única instalação direta do Google Analytics 4 via `next/script` no layout raiz:

- Measurement ID: `G-7BE21XPLT4`
- Script: `https://www.googletagmanager.com/gtag/js?id=G-7BE21XPLT4`
- Data layer: o `dataLayer` criado pelo snippet original do `gtag.js`
- Google Tag Manager: não instalado no projeto

Não adicionar outro `gtag.js`, outro `dataLayer`, outro Measurement ID ou um container GTM.

Os eventos atuais `whatsapp_click`, `phone_click` e `directions_click` foram preservados. A camada central agora também conhece `appointment_click`, mas esse evento só deve ser emitido quando existir um fluxo de agendamento independente do WhatsApp.

## Eventos e parâmetros

Os eventos são disparados somente por interação real:

| Evento | Uso | `cta_type` |
| --- | --- | --- |
| `whatsapp_click` | Abertura de conversa no WhatsApp, inclusive agendamento | `appointment` ou `contact` |
| `phone_click` | Clique em link `tel:` | `phone` |
| `directions_click` | Clique explícito em Google Maps/Como chegar | `directions` |
| `appointment_click` | Fluxo externo próprio de agendamento | `appointment` |

Parâmetros canônicos enviados quando aplicáveis:

- `lead_source`: origem classificada da primeira entrada da sessão
- `service`: `implante`, `canal`, `clareamento`, `ortodontia`, `protese`, `restauracao`, `limpeza`, `alinhadores`, `harmonizacao`, `toxina` ou `geral`
- `dentist`: `carlos`, `francisco`, `marcia` ou `clinic`
- `page_path`: caminho sem query string ou fragmento
- `page_title`: título da página
- `cta_location`: `header`, `hero`, `content`, `professional`, `services`, `floating`, `location`, `faq`, `footer` ou `final_cta`
- `cta_type`: `contact`, `appointment`, `directions`, `phone` ou `information`
- `cta_text`: texto estático do CTA, limitado e sanitizado

Para compatibilidade com relatórios já existentes, os eventos também enviam aliases `service_name`, `dentist_id`, `contact_method` e `destination` quando houver valor. Esses aliases não devem ser usados para novas dimensões.

Nenhum nome, telefone, e-mail, mensagem, CPF, informação clínica, diagnóstico ou conteúdo de conversa é enviado ao GA4.

## Origem (`lead_source`)

A origem é classificada por uma função pura e salva em `sessionStorage` somente como o primeiro valor da sessão. Não são criados cookies novos.

Prioridade:

1. `gclid`, `gbraid` ou `wbraid` → `google_ads`
2. `utm_source=google`/equivalente com mídia paga (`cpc`, `ppc`, `paid`, `ads`, etc.) → `google_ads`
3. Outras UTMs pagas → `paid`
4. Mídia `email`/`newsletter` → `email`
5. UTM ou referrer de rede social → `social`
6. Mídia `organic` ou referrer de mecanismo de busca reconhecido → `organic`
7. Referrer externo não classificado → `referral`
8. Sem referrer, UTM ou identificador de anúncio → `direct`
9. UTM não reconhecida → `other`

UTMs de entrada não são removidas da URL. A classificação complementar não substitui a atribuição nativa do GA4.

## Mapeamento de páginas

| Página | `service` | `dentist` |
| --- | --- | --- |
| `/` | `geral` | `clinic` |
| `/dentista-no-recreio/` | `geral` | `clinic` |
| `/implante-dentario-no-recreio/` | `implante` | `carlos` |
| `/tratamento-de-canal-no-recreio/` | `canal` | `francisco` |
| `/clareamento-dental-no-recreio/` | `clareamento` | `francisco` |
| `/ortodontista-no-recreio/` | `ortodontia` | `carlos` |
| `/protese-dentaria-no-recreio/` | `protese` | `marcia` |
| `/restauracao-dentaria-no-recreio/` | `restauracao` | `francisco` |
| `/limpeza-dental-no-recreio/` | `limpeza` | `francisco` |
| `/alinhadores-no-recreio/` | `alinhadores` | `carlos` |
| `/harmonizacao-orofacial-no-recreio/` | `harmonizacao` | `francisco` |
| `/toxina-botulinica-no-recreio/` | `toxina` | `francisco` |

Cards de serviço e profissionais sobrescrevem o contexto genérico da página. O seletor de WhatsApp envia o profissional escolhido pelo visitante.

## Configuração manual no GA4

No GA4: **Administrador → Exibição de dados → Dimensões personalizadas → Criar dimensão personalizada**.

Criar dimensões de escopo **Evento** para:

| Nome | Parâmetro do evento |
| --- | --- |
| Lead source | `lead_source` |
| Service | `service` |
| Dentist | `dentist` |
| CTA location | `cta_location` |
| CTA type | `cta_type` |

Não criar dimensão para `cta_text` inicialmente: o valor é útil para depuração e análise exploratória, mas pode gerar cardinalidade desnecessária.

Recomenda-se marcar `whatsapp_click`, `phone_click` e `directions_click` como **Key events** depois de confirmar os dados no DebugView. Marcar `appointment_click` somente quando houver um fluxo próprio real.

Essas configurações exigem acesso administrativo ao GA4 e não foram realizadas pelo código.

## Validação

### Local

Os testes automatizados observam o `dataLayer` e validam classificação, persistência, payload, ausência de PII, ausência de eventos no render, unicidade por clique e funcionamento quando `gtag` não existe.

Executar:

```text
npm run lint
npm run typecheck
npm run test:e2e
npm run build
```

### DebugView/Tag Assistant

1. Abrir o site em uma janela de desenvolvimento com Tag Assistant/DebugView habilitado.
2. Usar uma URL de teste com `?gclid=test`, `?utm_source=google&utm_medium=cpc`, `?utm_source=instagram&utm_medium=social` e uma entrada sem parâmetros.
3. Clicar em um CTA e confirmar o evento e os parâmetros no DebugView.
4. Navegar internamente e repetir o clique para confirmar que `lead_source` permanece igual.
5. Confirmar que `debug_mode` não está fixado em produção.

### Privacidade e consentimento

O rastreamento respeita a instalação e a estratégia de consentimento existentes. A camada não cria banner, não altera Consent Mode e não envia PII. A origem da sessão é armazenada apenas no `sessionStorage` do navegador para evitar que a navegação interna seja interpretada como acesso direto.
