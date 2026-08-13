# Landing de Harmonização Orofacial no Recreio

## Decisões

- Criar uma rota estática específica em /harmonizacao-orofacial-no-recreio/, preservando a identidade visual e os componentes da landing de alinhadores.
- Direcionar os CTAs da página ao WhatsApp já cadastrado do Dr. Francisco, com mensagem contextual e evento whatsapp_click.
- Exibir somente Harmonização Orofacial e Toxina botulínica como possibilidades confirmadas; não inventar marcas, preços, resultados, credenciais ou procedimentos.
- Usar as quatro imagens fornecidas como contexto institucional, convertidas para WebP, sem tratá-las como casos clínicos reais ou antes/depois.
- Linkar o card de Harmonização da homepage à nova rota; manter o card de Toxina botulínica com seu CTA atual.
- Manter a página sem formulário, sem persistência própria de UTMs, sem menu novo e sem alteração de páginas existentes além dos links contextuais necessários.

## Validação

Lint, typecheck e build devem ser executados antes da entrega. A spec Playwright cobre metadata, JSON-LD, WhatsApp, mapa, FAQ, responsividade e integrações internas.
