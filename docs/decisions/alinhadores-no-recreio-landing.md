# Landing page "Alinhadores transparentes no Recreio"

## Entendimento

- A rota `/alinhadores-no-recreio/` recebe tráfego local de Google Ads.
- O objetivo principal é iniciar uma avaliação pelo WhatsApp do Dr. Carlos.
- O conteúdo é educativo e não substitui avaliação odontológica.
- A página reutiliza a identidade, os dados e as imagens reais do site.
- Não há formulário, preços, marcas de alinhadores, depoimentos, antes e depois ou promessas de resultado.

## Decisões

- Foi escolhida uma composição específica que reutiliza componentes existentes, em vez de clonar outra landing ou criar um framework genérico.
- Os CTAs abrem diretamente o WhatsApp do Dr. Carlos com a mensagem da campanha de alinhadores.
- A home recebe apenas um link contextual no card de Ortodontia; menu e rodapé permanecem inalterados.
- O GA4 existente registra `whatsapp_click` e `directions_click` com contexto operacional, sem texto clínico, UTM ou dados de saúde.
- O JSON-LD usa um único `@graph` com `MedicalWebPage`, `FAQPage`, `BreadcrumbList` e `Dentist`, sem entidades ou qualificações redundantes.

## Requisitos não funcionais

- Exportação estática compatível com o deploy atual no GitHub Pages.
- Links externos continuam funcionais quando o analytics está indisponível.
- Interface responsiva, acessível por teclado e sem rolagem horizontal.
- Componentes compartilhados preservam o comportamento anterior quando as novas opções não são fornecidas.
- Atribuição de campanha permanece sob responsabilidade do GA4; parâmetros UTM não são copiados para o WhatsApp.
