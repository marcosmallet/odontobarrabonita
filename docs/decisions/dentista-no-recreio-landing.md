# Landing page "Dentista no Recreio"

## Entendimento

- A rota `/dentista-no-recreio/` atende tráfego local de Google Ads.
- O objetivo principal é iniciar um agendamento pelo WhatsApp.
- Telefone e rota são alternativas secundárias.
- A página reutiliza a identidade, os dados e as imagens reais do site.
- Não há formulário, depoimentos, preços ou promessas de resultado.

## Decisões

- Foi escolhido um funil enxuto em vez de duplicar a home ou publicar uma página ultracurta.
- A mensagem do WhatsApp identifica a origem no Google sem coletar dados do visitante.
- Os eventos `whatsapp_click`, `phone_click` e `directions_click` usam o GA4 existente.
- Avaliações do Google ficam omitidas até existirem dados verificáveis.
- CRO da pessoa jurídica e responsável técnico só serão exibidos após confirmação.

## Requisitos não funcionais

- Exportação estática compatível com o deploy atual no GitHub Pages.
- Links externos continuam utilizáveis quando o analytics estiver indisponível.
- Interface responsiva, acessível por teclado e sem rolagem horizontal.
- Componentes compartilhados preservam o comportamento atual quando as novas opções não são fornecidas.

