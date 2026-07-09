# Clínica Odontológica Barra Bonita

Landing page institucional da Clínica Odontológica Barra Bonita, desenvolvida com Next.js, TypeScript e Tailwind CSS. O projeto gera arquivos totalmente estáticos para publicação gratuita no GitHub Pages.

## Requisitos

- Node.js 20.9 ou superior (recomendado: Node.js 22)
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validação

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

O build estático é gerado em `out/`. Para visualizá-lo:

```bash
npm run preview
```

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` valida e publica o site automaticamente quando há push para a branch `main`. Também pode ser executado manualmente na aba **Actions**.

1. Crie um repositório público no GitHub.
2. Envie o projeto para a branch `main`.
3. Abra **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **GitHub Actions**.
5. Aguarde o workflow **Deploy Next.js site to GitHub Pages**.

O workflow executa `npm ci`, lint, typecheck, build, envia a pasta `out` como artifact e publica no ambiente `github-pages`. A ação `configure-pages` ajusta automaticamente o caminho-base quando o site ainda está no endereço temporário `<usuario>.github.io/<repositorio>/`.

## Configurar odontobarrabonita.com.br

1. Em **Settings → Pages → Custom domain**, informe `odontobarrabonita.com.br`.
2. Configure os registros DNS indicados pela documentação atual do GitHub Pages no provedor do domínio.
3. Configure também `www` como CNAME para o endereço do GitHub Pages.
4. Depois da propagação, ative **Enforce HTTPS**.
5. Verifique as versões com e sem `www`.

Não fixe endereços IP antigos sem consultar a documentação do GitHub, pois a infraestrutura pode mudar.

## Alterar conteúdo e contatos

Os dados institucionais estão centralizados em `src/lib/site-data.ts`:

- Nome, CNPJ e endereço
- Profissionais, CROs e WhatsApps
- Serviços
- FAQ
- Links do Google Maps

Enquanto não houver um telefone principal, os CTAs gerais abrem um seletor neutro com os três profissionais. Para definir um contato principal futuramente, ajuste o comportamento do `WhatsAppChooserTrigger` em `src/components/whatsapp-chooser.tsx`.

## Imagens reais

A foto da recepção está em `public/images/`, otimizada em WebP. O hero e os cards profissionais continuam usando composições abstratas até existirem retratos autorizados.

Para adicionar novas fotos:

1. Salve versões WebP ou AVIF em `public/images/`.
2. Use dimensões adequadas ao maior tamanho de exibição.
3. Substitua as composições dos componentes `Hero` ou `DentistCard`.
4. Escreva textos alternativos objetivos, sem alegações promocionais.
5. Rode novamente o build, os testes e a auditoria Lighthouse.

Não publique imagens de procedimentos em andamento, antes/depois ou fotografias sem autorização.

## Formulário futuro

Esta versão não coleta dados. Uma integração futura pode usar Resend, Formspree, webhook ou Google Sheets, mas deve:

- Coletar somente nome, WhatsApp e mensagem opcional.
- Exigir consentimento explícito para retorno.
- Evitar CPF, dados clínicos e informações sensíveis.
- Definir retenção, exclusão, segurança e responsável pelo recebimento.
- Usar um serviço externo ou hospedagem com backend; GitHub Pages não executa APIs do Next.js.

## SEO após apontar o domínio

1. Confirme o canonical e o sitemap em `https://odontobarrabonita.com.br/sitemap.xml`.
2. Cadastre o domínio no Google Search Console.
3. Envie o sitemap.
4. Valide o JSON-LD no Rich Results Test ou Schema Markup Validator.
5. Confirme horário de funcionamento e telefone principal antes de adicioná-los ao site ou ao Perfil da Empresa no Google.

## Informações ainda pendentes

- Retratos autorizados dos profissionais e fotos adicionais das instalações
- Horário de funcionamento
- Telefone principal da clínica
- Informações confirmadas sobre estacionamento, convênios e pagamentos

Esses dados não são exibidos até validação institucional.
