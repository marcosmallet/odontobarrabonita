# Roteamento de WhatsApp por serviço

## Entendimento

- O botão “Agendar avaliação” dos cards de serviço abre o seletor existente de WhatsApp.
- Ortodontia e Implantes exibem Carlos e Márcia.
- Endodontia, Toxina botulínica e Harmonização orofacial exibem Francisco.
- Prótese exibe Márcia.
- Restaurações, Clareamento e CTAs gerais continuam exibindo os três profissionais.

## Decisão

Os serviços declaram opcionalmente os IDs dos profissionais permitidos. O componente compartilhado recebe essa lista e filtra os contatos apenas quando o seletor é aberto por um card de serviço. Sem uma lista, o comportamento existente permanece.

## Decisões consideradas

- Regra baseada no título do serviço: rejeitada por depender de texto visível.
- Componentes separados por serviço: rejeitada por duplicar o modal e sua lógica de acessibilidade.
- Lista declarativa no dado do serviço: escolhida por ser explícita, extensível e compatível com o componente atual.

## Requisitos não funcionais

- Sem novas requisições, dependências ou dados externos.
- Os links e números de WhatsApp existentes são reutilizados.
- O modal, foco, Escape, navegação por teclado e abertura em nova aba permanecem inalterados.
