import type { StaticImageData } from "next/image";
import {
  Activity,
  BrushCleaning,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  HeartHandshake,
  ScanFace,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FAQItem } from "@/components/faq";
import type { Dentist } from "@/lib/site-data";
import { buildWhatsappUrl, clinic, dentists, SITE_URL } from "@/lib/site-data";

import implanteHero from "../../public/images/implante/implante-dentario-recreio-hero.webp";
import implanteAvaliacao from "../../public/images/implante/implante-dentario-avaliacao.webp";
import implantePlanejamento from "../../public/images/implante/implante-dentario-planejamento.webp";
import implanteCta from "../../public/images/implante/implante-dentario-recreio-cta.webp";
import canalHero from "../../public/images/canal/tratamento-canal-recreio-hero.webp";
import canalAvaliacao from "../../public/images/canal/tratamento-canal-avaliacao.webp";
import canalPlanejamento from "../../public/images/canal/tratamento-canal-planejamento.webp";
import canalCta from "../../public/images/canal/tratamento-canal-recreio-cta.webp";
import clareamentoHero from "../../public/images/clareamento/clareamento-dental-recreio-hero.webp";
import clareamentoAvaliacao from "../../public/images/clareamento/clareamento-dental-avaliacao.webp";
import clareamentoPlanejamento from "../../public/images/clareamento/clareamento-dental-planejamento.webp";
import clareamentoCta from "../../public/images/clareamento/clareamento-dental-recreio-cta.webp";
import ortodontiaHero from "../../public/images/ortodontia/ortodontista-recreio-hero.webp";
import ortodontiaAvaliacao from "../../public/images/ortodontia/ortodontia-avaliacao.webp";
import ortodontiaPlanejamento from "../../public/images/ortodontia/ortodontia-planejamento.webp";
import ortodontiaCta from "../../public/images/ortodontia/ortodontista-recreio-cta.webp";
import proteseHero from "../../public/images/protese/protese-dentaria-recreio-hero.webp";
import proteseAvaliacao from "../../public/images/protese/protese-dentaria-avaliacao.webp";
import protesePlanejamento from "../../public/images/protese/protese-dentaria-planejamento.webp";
import proteseCta from "../../public/images/protese/protese-dentaria-recreio-cta.webp";
import restauracaoHero from "../../public/images/restauracao/restauracao-dentaria-recreio-hero.webp";
import restauracaoAvaliacao from "../../public/images/restauracao/restauracao-dentaria-avaliacao.webp";
import restauracaoPlanejamento from "../../public/images/restauracao/restauracao-dentaria-planejamento.webp";
import restauracaoCta from "../../public/images/restauracao/restauracao-dentaria-recreio-cta.webp";
import limpezaHero from "../../public/images/limpeza/limpeza-dental-recreio-hero.webp";
import limpezaAvaliacao from "../../public/images/limpeza/limpeza-dental-avaliacao.webp";
import limpezaPlanejamento from "../../public/images/limpeza/limpeza-dental-planejamento.webp";
import limpezaCta from "../../public/images/limpeza/limpeza-dental-recreio-cta.webp";

export type ServiceLandingId =
  | "implante"
  | "canal"
  | "clareamento"
  | "ortodontia"
  | "protese"
  | "restauracao"
  | "limpeza";

export type ServiceLandingImage = {
  src: StaticImageData;
  path: string;
  alt: string;
};

export type ServiceLandingCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceLandingConfig = {
  id: ServiceLandingId;
  slug: string;
  pagePath: string;
  serviceName: string;
  title: string;
  h1: string;
  eyebrow: string;
  description: string;
  keywords: readonly string[];
  professionalId: Dentist["id"];
  whatsappMessage: string;
  heroImage: ServiceLandingImage;
  evaluationImage: ServiceLandingImage;
  planningImage: ServiceLandingImage;
  ctaImage: ServiceLandingImage;
  introduction: {
    eyebrow: string;
    title: string;
    paragraphs: readonly [string, string];
  };
  evaluation: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: readonly ServiceLandingCard[];
    note: string;
  };
  details: {
    eyebrow: string;
    title: string;
    paragraphs: readonly [string, string];
    cards: readonly ServiceLandingCard[];
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly { title: string; description: string }[];
  };
  care: {
    eyebrow: string;
    title: string;
    cards: readonly ServiceLandingCard[];
  };
  professional: {
    eyebrow: string;
    title: string;
    description: string;
  };
  clinic: {
    eyebrow: string;
    title: string;
    description: string;
  };
  locationTitle: string;
  faqs: readonly FAQItem[];
  final: {
    eyebrow: string;
    title: string;
    description: string;
  };
  relatedLinks: readonly { href: string; label: string }[];
};

const image = (src: StaticImageData, path: string, alt: string): ServiceLandingImage => ({
  src,
  path,
  alt,
});

const commonCare = (service: string): ServiceLandingConfig["care"] => ({
  eyebrow: "Cuidado responsável",
  title: `Decisões cuidadosas para ${service}`,
  cards: [
    { icon: ClipboardCheck, title: "Avaliação individual", description: "A indicação depende de exame, histórico e objetivos de cada pessoa." },
    { icon: ShieldCheck, title: "Orientação clara", description: "O profissional explica possibilidades, limites, cuidados e alternativas." },
    { icon: HeartHandshake, title: "Expectativas realistas", description: "O planejamento respeita a saúde bucal e não promete resultados." },
    { icon: CheckCircle2, title: "Acompanhamento", description: "As orientações posteriores acompanham o cuidado indicado para o caso." },
  ],
});

const commonClinic = (service: string): ServiceLandingConfig["clinic"] => ({
  eyebrow: "Clínica Barra Bonita",
  title: `${service} no Recreio dos Bandeirantes`,
  description: "A Clínica Odontológica Barra Bonita atende com hora marcada no Absolutto Business Towers, em ambiente acolhedor e com profissionais identificados pelo CRO/RJ.",
});

const messages = {
  implante: "Olá, Dr. Carlos. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação para implante dentário.",
  canal: "Olá, Dr. Francisco. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação para tratamento de canal.",
  clareamento: "Olá, Dr. Francisco. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação para clareamento dental.",
  ortodontia: "Olá, Dr. Carlos. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação em ortodontia.",
  protese: "Olá, Dra. Márcia. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação para prótese dentária.",
  restauracao: "Olá, Dr. Francisco. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação para restauração dentária.",
  limpeza: "Olá, Dr. Francisco. Encontrei a Clínica Barra Bonita pelo site e gostaria de agendar uma avaliação para limpeza dental.",
} as const;

const page = (config: ServiceLandingConfig) => config;

export const serviceLandingPages = {
  implante: page({
    id: "implante", slug: "implante-dentario-no-recreio", pagePath: "/implante-dentario-no-recreio/", serviceName: "implante", professionalId: "carlos", whatsappMessage: messages.implante,
    title: "Implante Dentário no Recreio | Clínica Barra Bonita", h1: "Implante Dentário no Recreio dos Bandeirantes", eyebrow: "Implante dentário no Recreio",
    description: "Implante dentário no Recreio dos Bandeirantes com avaliação individual, planejamento responsável e atendimento na Clínica Barra Bonita no Rio.",
    keywords: ["implante dentário no Recreio", "implantodontia no Recreio", "dentista para implante dentário", "reabilitação oral", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(implanteHero, "/images/implante/implante-dentario-recreio-hero.webp", "Dr. Carlos em consulta de avaliação para implante dentário no Recreio"),
    evaluationImage: image(implanteAvaliacao, "/images/implante/implante-dentario-avaliacao.webp", "Dr. Carlos conduz conversa clínica sobre implante dentário"),
    planningImage: image(implantePlanejamento, "/images/implante/implante-dentario-planejamento.webp", "Dr. Carlos apresenta planejamento odontológico para reabilitação com implante"),
    ctaImage: image(implanteCta, "/images/implante/implante-dentario-recreio-cta.webp", "Paciente sorrindo em contexto de cuidado odontológico"),
    introduction: { eyebrow: "Reabilitação planejada", title: "O que é implante dentário?", paragraphs: ["Implante dentário é uma alternativa de reabilitação oral que pode substituir a raiz de um dente ausente e receber uma prótese. A indicação depende da avaliação clínica e das condições de cada pessoa.", "Na consulta, o cirurgião-dentista conversa sobre saúde, histórico, estrutura óssea, hábitos e objetivos. Exames complementares podem ser considerados quando forem necessários ao planejamento."] },
    evaluation: { eyebrow: "O olhar profissional", title: "O que pode ser avaliado antes do implante?", intro: "A primeira consulta organiza as informações necessárias para entender se essa alternativa faz sentido para o caso.", cards: [
      { icon: ScanFace, title: "Condição da região", description: "O espaço, os dentes próximos e os tecidos são observados durante o exame." },
      { icon: Activity, title: "Saúde e histórico", description: "Condições de saúde, medicamentos e hábitos entram na conversa clínica." },
      { icon: CircleDot, title: "Estrutura óssea", description: "A disponibilidade de suporte é analisada e exames podem complementar a avaliação." },
      { icon: Stethoscope, title: "Objetivos funcionais", description: "Mastigação, conforto e expectativas ajudam a orientar as possibilidades." },
    ], note: "Nem todo caso precisa do mesmo caminho. Somente a avaliação profissional pode indicar alternativas e etapas." },
    details: { eyebrow: "Entenda o tratamento", title: "Implante dentário exige planejamento", paragraphs: ["O implante não é uma solução definida apenas pela ausência de um dente. A saúde bucal, o suporte disponível e a necessidade de reabilitação orientam a decisão.", "O plano pode envolver etapas diferentes e uma prótese compatível com a situação clínica. Não é possível informar indicação, tempo ou resultado sem examinar o paciente."], cards: [
      { icon: ShieldCheck, title: "Preservar o que está saudável", description: "O planejamento considera dentes, gengiva e estruturas próximas para evitar decisões isoladas." },
      { icon: HeartHandshake, title: "Recuperar função com cuidado", description: "A conversa busca alinhar conforto, mastigação, estética e possibilidades reais." },
    ] },
    process: { eyebrow: "Como funciona", title: "Quatro etapas para uma decisão bem orientada", intro: "O fluxo é organizado de forma individual, com espaço para dúvidas em cada momento.", steps: [
      { title: "Conversa inicial", description: "Você conta o que motivou a busca, seu histórico e suas expectativas." }, { title: "Avaliação clínica", description: "O profissional examina a boca e identifica informações relevantes para o caso." }, { title: "Planejamento", description: "Quando indicado, são explicadas opções, exames e etapas possíveis." }, { title: "Acompanhamento", description: "As orientações e retornos são definidos de acordo com o cuidado realizado." },
    ] },
    care: commonCare("um implante dentário"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dr. Carlos", description: "Converse com Dr. Carlos sobre a sua necessidade e entenda quais possibilidades podem ser consideradas após a avaliação." }, clinic: commonClinic("Implante dentário"), locationTitle: "Implante dentário no Recreio",
    faqs: [
      { question: "O que é um implante dentário?", answer: "É uma alternativa de reabilitação que pode substituir a raiz de um dente ausente e receber uma prótese. A indicação depende de avaliação." },
      { question: "Implante dentário é indicado para qualquer pessoa?", answer: "Não. Saúde geral, condição da boca, suporte ósseo, hábitos e outros fatores precisam ser avaliados pelo cirurgião-dentista." },
      { question: "Preciso fazer exames antes?", answer: "O profissional decide quais informações e exames são necessários para o planejamento de cada caso." },
      { question: "O tratamento acontece em uma única consulta?", answer: "As etapas variam conforme a situação clínica e não podem ser definidas sem exame individual." },
      { question: "Como agendar uma avaliação com Dr. Carlos?", answer: "Use o botão de WhatsApp desta página para iniciar uma conversa diretamente com Dr. Carlos." },
      { question: "Onde fica a clínica?", answer: "A Clínica Odontológica Barra Bonita fica no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, no Recreio dos Bandeirantes." },
    ],
    final: { eyebrow: "Próximo passo", title: "Quer conversar sobre implante dentário?", description: "Agende uma avaliação no Recreio e conheça as possibilidades para o seu caso, sem compromisso com uma indicação antes do exame." }, relatedLinks: [{ href: "/protese-dentaria-no-recreio/", label: "Entender a relação entre implante e prótese" }, { href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }],
  }),
  canal: page({
    id: "canal", slug: "tratamento-de-canal-no-recreio", pagePath: "/tratamento-de-canal-no-recreio/", serviceName: "canal", professionalId: "francisco", whatsappMessage: messages.canal,
    title: "Tratamento de Canal no Recreio | Clínica Barra Bonita", h1: "Tratamento de Canal no Recreio dos Bandeirantes", eyebrow: "Tratamento de canal no Recreio",
    description: "Tratamento de canal no Recreio dos Bandeirantes com avaliação da parte interna do dente e planejamento cuidadoso na Clínica Barra Bonita no Rio.",
    keywords: ["tratamento de canal no Recreio", "endodontia no Recreio", "dentista para canal", "dor de dente", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(canalHero, "/images/canal/tratamento-canal-recreio-hero.webp", "Paciente em conversa clínica sobre tratamento de canal"), evaluationImage: image(canalAvaliacao, "/images/canal/tratamento-canal-avaliacao.webp", "Avaliação odontológica para tratamento de canal"), planningImage: image(canalPlanejamento, "/images/canal/tratamento-canal-planejamento.webp", "Planejamento para preservar a estrutura dental"), ctaImage: image(canalCta, "/images/canal/tratamento-canal-recreio-cta.webp", "Paciente em consulta odontológica cuidadosa"),
    introduction: { eyebrow: "Preservação dental", title: "O que é tratamento de canal?", paragraphs: ["O tratamento de canal cuida da parte interna do dente quando a polpa está comprometida por cárie profunda, trauma ou outras alterações. A avaliação identifica o que está acontecendo antes de definir a conduta.", "Nem toda dor ou sensibilidade significa necessidade de canal. O exame clínico e, quando indicado, exames complementares ajudam o profissional a entender a origem do sintoma e preservar o dente sempre que possível."] },
    evaluation: { eyebrow: "Avaliação endodôntica", title: "O que o dentista observa?", intro: "A consulta procura diferenciar sintomas e sinais para que a orientação seja proporcional ao quadro encontrado.", cards: [
      { icon: Activity, title: "Sintomas relatados", description: "Dor, sensibilidade, duração e situações que desencadeiam o incômodo são investigadas." }, { icon: Stethoscope, title: "Exame do dente", description: "O profissional observa o dente, a gengiva e a relação com as estruturas próximas." }, { icon: CircleDot, title: "Imagem complementar", description: "Radiografias ou outros exames podem ser solicitados quando contribuírem para a decisão." }, { icon: ShieldCheck, title: "Preservação possível", description: "A conduta busca proteger a estrutura dental e tratar a causa identificada." },
    ], note: "Dor de dente não deve ser diagnosticada por conteúdo online. Procure avaliação profissional para uma orientação segura." },
    details: { eyebrow: "Quando procurar", title: "Sinais que merecem avaliação", paragraphs: ["Sensibilidade prolongada ao frio ou calor, dor espontânea, desconforto ao mastigar ou alteração após trauma são motivos para marcar uma consulta.", "A presença de sintomas não define sozinha o tratamento. O profissional explica o diagnóstico e as alternativas após examinar o dente."], cards: [
      { icon: CheckCircle2, title: "Não adiar sintomas persistentes", description: "Uma avaliação ajuda a entender a origem do desconforto e a organizar o cuidado." }, { icon: HeartHandshake, title: "Informar o histórico", description: "Relatar medicamentos, traumas e tratamentos anteriores contribui para a decisão clínica." },
    ] },
    process: { eyebrow: "Como funciona", title: "Da conversa ao cuidado indicado", intro: "Cada etapa tem um objetivo claro para reduzir dúvidas e orientar o próximo passo.", steps: [
      { title: "Relato dos sintomas", description: "Você descreve quando começou, o que piora e o que já foi feito." }, { title: "Exame clínico", description: "O profissional observa a região e realiza testes compatíveis com a avaliação." }, { title: "Explicação do plano", description: "Se houver indicação, são apresentadas as opções e os cuidados necessários." }, { title: "Retorno e orientação", description: "O acompanhamento é combinado conforme a conduta definida para o caso." },
    ] },
    care: commonCare("o tratamento de canal"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dr. Francisco", description: "Converse com Dr. Francisco sobre sintomas ou dúvidas e receba orientação após uma avaliação individual." }, clinic: commonClinic("Tratamento de canal"), locationTitle: "Tratamento de canal no Recreio",
    faqs: [
      { question: "Toda dor de dente precisa de canal?", answer: "Não. A dor pode ter causas diferentes, por isso o diagnóstico depende de exame clínico e, quando indicado, exames complementares." }, { question: "Quando devo procurar um dentista?", answer: "Procure avaliação para dor persistente, sensibilidade prolongada, desconforto ao mastigar, trauma ou qualquer alteração que preocupe você." }, { question: "O tratamento de canal preserva o dente?", answer: "O objetivo é tratar a parte interna comprometida e preservar a estrutura dental quando isso for possível para o caso." }, { question: "É preciso fazer radiografia?", answer: "O profissional avalia se uma radiografia ou outro exame é útil para compreender a situação e planejar o cuidado." }, { question: "Como falar com Dr. Francisco?", answer: "Use o botão de WhatsApp para iniciar uma conversa diretamente com Dr. Francisco e organizar sua avaliação." }, { question: "Onde fica a clínica?", answer: "Estamos no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, Recreio dos Bandeirantes." },
    ],
    final: { eyebrow: "Próximo passo", title: "Está com desconforto ou dúvida sobre canal?", description: "Converse com Dr. Francisco e agende uma avaliação para entender o que está acontecendo com segurança." }, relatedLinks: [{ href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }, { href: "/limpeza-dental-no-recreio/", label: "Conhecer limpeza dental" }],
  }),
  clareamento: page({
    id: "clareamento", slug: "clareamento-dental-no-recreio", pagePath: "/clareamento-dental-no-recreio/", serviceName: "clareamento", professionalId: "francisco", whatsappMessage: messages.clareamento,
    title: "Clareamento Dental no Recreio | Clínica Barra Bonita", h1: "Clareamento Dental no Recreio dos Bandeirantes", eyebrow: "Clareamento dental no Recreio",
    description: "Clareamento dental no Recreio dos Bandeirantes com avaliação da saúde bucal, indicação profissional e orientação na Clínica Barra Bonita no Rio.",
    keywords: ["clareamento dental no Recreio", "clarear os dentes", "dentista para clareamento", "odontologia estética", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(clareamentoHero, "/images/clareamento/clareamento-dental-recreio-hero.webp", "Pessoa em avaliação para clareamento dental no Recreio"), evaluationImage: image(clareamentoAvaliacao, "/images/clareamento/clareamento-dental-avaliacao.webp", "Conversa sobre cor e saúde bucal antes do clareamento"), planningImage: image(clareamentoPlanejamento, "/images/clareamento/clareamento-dental-planejamento.webp", "Planejamento individual de clareamento dental"), ctaImage: image(clareamentoCta, "/images/clareamento/clareamento-dental-recreio-cta.webp", "Sorriso natural em contexto de cuidado odontológico"),
    introduction: { eyebrow: "Estética com saúde", title: "O que é clareamento dental?", paragraphs: ["Clareamento dental é um procedimento que pode reduzir determinadas alterações de cor dos dentes com orientação profissional. A abordagem adequada depende da causa da alteração e da saúde bucal.", "A consulta serve para avaliar dentes e gengivas, conversar sobre expectativas e identificar situações que precisam ser cuidadas antes. O resultado não pode ser garantido ou previsto sem exame individual."] },
    evaluation: { eyebrow: "Antes de clarear", title: "O que entra na avaliação?", intro: "O profissional considera saúde, histórico e o tipo de alteração de cor para explicar possibilidades com responsabilidade.", cards: [
      { icon: Sparkles, title: "Origem da alteração", description: "Hábitos, envelhecimento, medicamentos e características do dente podem influenciar a cor." }, { icon: ShieldCheck, title: "Saúde de dentes e gengivas", description: "Cáries, inflamações e sensibilidade precisam ser observadas antes da indicação." }, { icon: Smile, title: "Expectativa realista", description: "A conversa alinha o que o clareamento pode ou não modificar no sorriso." }, { icon: Stethoscope, title: "Plano individual", description: "A técnica e as orientações são definidas pelo profissional para o seu contexto." },
    ], note: "Clareamento não substitui tratamento de cáries, restaurações ou doenças gengivais e não altera a cor de todos os materiais." },
    details: { eyebrow: "Indicação cuidadosa", title: "Clareamento não é igual para todos", paragraphs: ["A cor dos dentes pode ter diferentes causas, e restaurações, próteses e facetas podem responder de maneira distinta. Por isso, a avaliação vem antes de qualquer decisão.", "O acompanhamento ajuda a reduzir riscos de sensibilidade e a manter a saúde bucal durante o cuidado, sempre respeitando a orientação recebida."], cards: [
      { icon: CheckCircle2, title: "Saúde primeiro", description: "O procedimento só deve ser considerado quando as condições da boca forem compatíveis com a indicação." }, { icon: HeartHandshake, title: "Orientação durante o cuidado", description: "Dúvidas sobre sensibilidade, hábitos e manutenção são discutidas na consulta." },
    ] },
    process: { eyebrow: "Como funciona", title: "Um caminho guiado por avaliação", intro: "A decisão é construída com informação para que o cuidado seja adequado ao seu sorriso.", steps: [
      { title: "Conversa sobre objetivos", description: "Você explica o que gostaria de melhorar e conta seu histórico de saúde bucal." }, { title: "Exame", description: "O profissional avalia dentes, gengivas, restaurações e possíveis causas de alteração de cor." }, { title: "Orientação", description: "São explicadas as possibilidades, cuidados e limitações aplicáveis ao caso." }, { title: "Acompanhamento", description: "O retorno permite acompanhar a resposta e ajustar as orientações quando necessário." },
    ] },
    care: commonCare("o clareamento dental"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dr. Francisco", description: "Fale com Dr. Francisco para entender se o clareamento é uma possibilidade para o seu sorriso após a avaliação." }, clinic: commonClinic("Clareamento dental"), locationTitle: "Clareamento dental no Recreio",
    faqs: [
      { question: "Clareamento dental é indicado para todos?", answer: "Não. A indicação depende da saúde bucal, da causa da alteração de cor, de restaurações e de outros fatores individuais." }, { question: "O clareamento deixa todos os dentes da mesma cor?", answer: "Não necessariamente. Restaurações, próteses e outras estruturas podem responder de forma diferente e precisam ser consideradas." }, { question: "Clareamento causa sensibilidade?", answer: "Sensibilidade pode ocorrer em algumas pessoas. O profissional orienta como reduzir riscos e quando interromper o cuidado." }, { question: "Posso fazer clareamento se tenho cárie?", answer: "É necessário avaliar e tratar condições de saúde bucal antes de considerar o clareamento." }, { question: "Como agendar com Dr. Francisco?", answer: "Use o WhatsApp desta página para conversar diretamente com Dr. Francisco e marcar uma avaliação." }, { question: "Onde fica a clínica?", answer: "A clínica fica no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, no Recreio dos Bandeirantes." },
    ],
    final: { eyebrow: "Próximo passo", title: "Quer avaliar o clareamento dental?", description: "Agende uma conversa no Recreio para entender as possibilidades e os cuidados indicados para o seu sorriso." }, relatedLinks: [{ href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }, { href: "/limpeza-dental-no-recreio/", label: "Conhecer limpeza dental" }],
  }),
  ortodontia: page({
    id: "ortodontia", slug: "ortodontista-no-recreio", pagePath: "/ortodontista-no-recreio/", serviceName: "ortodontia", professionalId: "carlos", whatsappMessage: messages.ortodontia,
    title: "Ortodontista no Recreio | Clínica Barra Bonita", h1: "Ortodontista no Recreio dos Bandeirantes", eyebrow: "Ortodontista no Recreio",
    description: "Ortodontista no Recreio dos Bandeirantes para avaliar aparelhos fixos, móveis ou alinhadores conforme o planejamento individual no Rio de Janeiro.",
    keywords: ["ortodontista no Recreio", "ortodontia no Recreio", "aparelho dentário", "alinhadores no Recreio", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(ortodontiaHero, "/images/ortodontia/ortodontista-recreio-hero.webp", "Dr. Carlos em consulta com paciente de ortodontia no Recreio"), evaluationImage: image(ortodontiaAvaliacao, "/images/ortodontia/ortodontia-avaliacao.webp", "Dr. Carlos conduz avaliação ortodôntica com paciente"), planningImage: image(ortodontiaPlanejamento, "/images/ortodontia/ortodontia-planejamento.webp", "Dr. Carlos apresenta planejamento de tratamento ortodôntico"), ctaImage: image(ortodontiaCta, "/images/ortodontia/ortodontista-recreio-cta.webp", "Paciente sorrindo em contexto de acompanhamento ortodôntico"),
    introduction: { eyebrow: "Alinhamento e função", title: "O que faz um ortodontista?", paragraphs: ["A ortodontia acompanha o desenvolvimento e o posicionamento dos dentes e da mordida. O tratamento pode envolver aparelhos fixos, móveis ou alinhadores, conforme a avaliação e o planejamento.", "A consulta não serve apenas para escolher um aparelho. O profissional observa dentes, gengivas, mordida, hábitos e objetivos para explicar possibilidades, limites e cuidados do caso."] },
    evaluation: { eyebrow: "Avaliação ortodôntica", title: "O que pode ser analisado?", intro: "O planejamento começa com uma visão ampla da boca e da relação entre dentes, arcadas e função.", cards: [
      { icon: Smile, title: "Posição dos dentes", description: "Apinhamentos, espaços e inclinações são observados durante o exame." }, { icon: Activity, title: "Mordida e função", description: "A relação entre as arcadas e os movimentos da mandíbula orienta a conversa." }, { icon: Stethoscope, title: "Saúde bucal", description: "Gengivas, higiene e outras condições precisam estar acompanhadas no planejamento." }, { icon: ClipboardCheck, title: "Objetivos individuais", description: "Idade, rotina, expectativas e necessidades ajudam a definir a estratégia." },
    ], note: "Aparelho e duração não devem ser escolhidos por comparação. O profissional precisa examinar cada caso." },
    details: { eyebrow: "Possibilidades", title: "Aparelho fixo, móvel ou alinhadores", paragraphs: ["Existem diferentes recursos ortodônticos. A indicação depende do movimento necessário, da fase de desenvolvimento, da colaboração e das condições de saúde bucal.", "Na página de alinhadores transparentes você encontra informações complementares sobre essa possibilidade. A escolha final ocorre somente após avaliação."], cards: [
      { icon: Sparkles, title: "Alinhadores transparentes", description: "Podem ser considerados em situações específicas, com planejamento e acompanhamento profissional." }, { icon: ShieldCheck, title: "Aparelhos convencionais", description: "Recursos fixos ou móveis podem fazer parte do plano conforme a necessidade ortodôntica." },
    ] },
    process: { eyebrow: "Como funciona", title: "Planejamento ortodôntico em etapas", intro: "O acompanhamento é construído para que você entenda o objetivo de cada fase.", steps: [
      { title: "Conversa inicial", description: "O profissional entende a queixa, a rotina, o histórico e o que você espera melhorar." }, { title: "Exame e registros", description: "Dentes, mordida e saúde bucal são avaliados; registros podem ser indicados." }, { title: "Plano individual", description: "São discutidos recursos, cuidados e possibilidades compatíveis com o caso." }, { title: "Acompanhamento", description: "Retornos regulares permitem acompanhar o tratamento e orientar a higiene." },
    ] },
    care: commonCare("o tratamento ortodôntico"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dr. Carlos", description: "Converse com Dr. Carlos sobre seus objetivos e entenda quais caminhos ortodônticos podem ser avaliados." }, clinic: commonClinic("Ortodontia"), locationTitle: "Ortodontista no Recreio",
    faqs: [
      { question: "Qual aparelho é melhor para mim?", answer: "A escolha depende do exame, do movimento necessário, da rotina e de outros fatores. Não existe um aparelho universalmente melhor." }, { question: "Alinhadores transparentes servem para todos os casos?", answer: "Não. Eles podem ser considerados em situações específicas após avaliação e planejamento ortodôntico." }, { question: "Quanto tempo dura o tratamento?", answer: "A duração varia conforme o caso e não pode ser estimada com segurança sem exame e planejamento." }, { question: "Preciso tratar cáries antes do aparelho?", answer: "A saúde dos dentes e das gengivas deve ser acompanhada; o profissional orienta a ordem dos cuidados." }, { question: "Como agendar com Dr. Carlos?", answer: "Inicie uma conversa pelo WhatsApp desta página para organizar sua avaliação com Dr. Carlos." }, { question: "Onde fica a clínica?", answer: "Estamos no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, Recreio dos Bandeirantes." },
    ],
    final: { eyebrow: "Próximo passo", title: "Quer conversar sobre ortodontia?", description: "Agende uma avaliação no Recreio para entender qual planejamento pode ser adequado à sua necessidade." }, relatedLinks: [{ href: "/alinhadores-no-recreio/", label: "Conhecer alinhadores transparentes" }, { href: "/implante-dentario-no-recreio/", label: "Conhecer implante dentário" }],
  }),
  protese: page({
    id: "protese", slug: "protese-dentaria-no-recreio", pagePath: "/protese-dentaria-no-recreio/", serviceName: "protese", professionalId: "marcia", whatsappMessage: messages.protese,
    title: "Prótese Dentária no Recreio | Clínica Barra Bonita", h1: "Prótese Dentária no Recreio dos Bandeirantes", eyebrow: "Prótese dentária no Recreio",
    description: "Prótese dentária no Recreio dos Bandeirantes com avaliação individual para recuperar função, conforto e harmonia do sorriso com cuidado profissional.",
    keywords: ["prótese dentária no Recreio", "dentista para prótese", "reabilitação oral", "prótese sobre implante", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(proteseHero, "/images/protese/protese-dentaria-recreio-hero.webp", "Paciente em consulta sobre prótese dentária no Recreio"), evaluationImage: image(proteseAvaliacao, "/images/protese/protese-dentaria-avaliacao.webp", "Avaliação para reabilitação com prótese dentária"), planningImage: image(protesePlanejamento, "/images/protese/protese-dentaria-planejamento.webp", "Planejamento de prótese dentária"), ctaImage: image(proteseCta, "/images/protese/protese-dentaria-recreio-cta.webp", "Paciente sorrindo em contexto de reabilitação oral"),
    introduction: { eyebrow: "Reabilitação oral", title: "O que é prótese dentária?", paragraphs: ["Prótese dentária é um recurso para substituir ou reconstruir dentes e contribuir para função, conforto e aparência do sorriso. Existem diferentes possibilidades, e a indicação depende da avaliação.", "A consulta considera dentes remanescentes, gengiva, mordida, hábitos, histórico e objetivos. O profissional explica o que pode ser planejado sem presumir um diagnóstico ou resultado."] },
    evaluation: { eyebrow: "O olhar profissional", title: "O que é importante avaliar?", intro: "A reabilitação precisa se encaixar na saúde da boca e na rotina da pessoa, não apenas no espaço sem dente.", cards: [
      { icon: Smile, title: "Função mastigatória", description: "A forma como você mastiga e fala ajuda a orientar a reabilitação." }, { icon: ShieldCheck, title: "Dentes e gengivas", description: "Estruturas remanescentes e tecidos de suporte são observados no exame." }, { icon: ScanFace, title: "Estética do sorriso", description: "Cor, formato e proporções entram na conversa sobre possibilidades." }, { icon: ClipboardCheck, title: "Rotina e adaptação", description: "Higiene, conforto e expectativas ajudam a definir um plano viável." },
    ], note: "Prótese, implante e restauração são alternativas diferentes. A relação entre elas só pode ser definida após avaliação." },
    details: { eyebrow: "Possibilidades", title: "Uma prótese precisa ser planejada para você", paragraphs: ["O tipo de prótese depende da quantidade de dentes ausentes, das condições de suporte e da necessidade funcional. A indicação pode ser associada a outros cuidados odontológicos.", "O planejamento responsável explica etapas, adaptações e manutenção. Não há preço ou prazo padrão sem conhecer o caso clínico."], cards: [
      { icon: CircleDot, title: "Prótese e implante", description: "Em algumas reabilitações, a prótese pode ser apoiada por implantes; essa possibilidade exige avaliação própria." }, { icon: HeartHandshake, title: "Conforto no dia a dia", description: "O acompanhamento orienta adaptação, higiene e cuidados para manter a saúde bucal." },
    ] },
    process: { eyebrow: "Como funciona", title: "Da avaliação à adaptação", intro: "Cada fase é explicada para que a decisão seja consciente e compatível com suas necessidades.", steps: [
      { title: "Conversa e histórico", description: "Você conta o que mudou, suas dificuldades e o que gostaria de recuperar." }, { title: "Exame da boca", description: "Dentes, tecidos, mordida e espaços são avaliados pelo profissional." }, { title: "Planejamento", description: "São apresentadas as alternativas consideradas adequadas e seus cuidados." }, { title: "Acompanhamento", description: "A adaptação e a manutenção são acompanhadas conforme a prótese indicada." },
    ] },
    care: commonCare("a prótese dentária"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dra. Márcia", description: "Converse com Dra. Márcia sobre reabilitação oral e entenda quais possibilidades podem ser consideradas após o exame." }, clinic: commonClinic("Prótese dentária"), locationTitle: "Prótese dentária no Recreio",
    faqs: [
      { question: "Qual tipo de prótese é indicado?", answer: "Depende dos dentes ausentes, do suporte disponível, da saúde bucal, da mordida e de outros fatores individuais." }, { question: "Prótese dentária e implante são a mesma coisa?", answer: "Não. O implante pode funcionar como suporte para uma prótese em algumas reabilitações, mas são recursos diferentes." }, { question: "A prótese fica confortável desde o primeiro dia?", answer: "A adaptação varia e pode exigir orientações e retornos. O profissional acompanha o processo conforme o caso." }, { question: "Preciso tratar outros dentes antes?", answer: "O exame mostra se há cuidados prévios ou associados para preparar a boca para a reabilitação." }, { question: "Como agendar com Dra. Márcia?", answer: "Use o botão de WhatsApp para falar diretamente com Dra. Márcia e organizar sua avaliação." }, { question: "Onde fica a clínica?", answer: "A Clínica Barra Bonita fica no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, no Recreio." },
    ],
    final: { eyebrow: "Próximo passo", title: "Quer avaliar uma prótese dentária?", description: "Converse com Dra. Márcia e agende uma avaliação para entender as opções de reabilitação para o seu caso." }, relatedLinks: [{ href: "/implante-dentario-no-recreio/", label: "Conhecer implante dentário" }, { href: "/restauracao-dentaria-no-recreio/", label: "Conhecer restauração dentária" }],
  }),
  restauracao: page({
    id: "restauracao", slug: "restauracao-dentaria-no-recreio", pagePath: "/restauracao-dentaria-no-recreio/", serviceName: "restauracao", professionalId: "francisco", whatsappMessage: messages.restauracao,
    title: "Restauração Dentária no Recreio | Clínica Barra Bonita", h1: "Restauração Dentária no Recreio dos Bandeirantes", eyebrow: "Restauração dentária no Recreio",
    description: "Restauração dentária no Recreio dos Bandeirantes para avaliar cáries, desgastes e fraturas com planejamento cuidadoso na Clínica Barra Bonita.",
    keywords: ["restauração dentária no Recreio", "restaurar dente", "dentista para cárie", "dente quebrado", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(restauracaoHero, "/images/restauracao/restauracao-dentaria-recreio-hero.webp", "Paciente em avaliação para restauração dentária no Recreio"), evaluationImage: image(restauracaoAvaliacao, "/images/restauracao/restauracao-dentaria-avaliacao.webp", "Conversa sobre a necessidade de restaurar um dente"), planningImage: image(restauracaoPlanejamento, "/images/restauracao/restauracao-dentaria-planejamento.webp", "Planejamento para recuperar a estrutura dental"), ctaImage: image(restauracaoCta, "/images/restauracao/restauracao-dentaria-recreio-cta.webp", "Paciente sorrindo após conversa de cuidado odontológico"),
    introduction: { eyebrow: "Preservação do dente", title: "O que é restauração dentária?", paragraphs: ["Restauração dentária é o cuidado usado para reconstruir parte de um dente afetado por cárie, desgaste ou fratura, quando essa é uma alternativa adequada. O objetivo é recuperar forma e função preservando o que está saudável.", "A avaliação identifica a extensão da alteração e considera a mordida, a higiene e a saúde ao redor. Nem todo dente com alteração precisa da mesma técnica ou do mesmo material."] },
    evaluation: { eyebrow: "Avaliação restauradora", title: "O que o profissional procura entender?", intro: "A consulta diferencia uma alteração superficial de situações que exigem outro tipo de cuidado.", cards: [
      { icon: ShieldCheck, title: "Extensão do dano", description: "Cárie, desgaste ou fratura são observados para entender quanto da estrutura foi afetado." }, { icon: Activity, title: "Sintomas e função", description: "Dor, sensibilidade e desconforto ao mastigar ajudam a orientar a avaliação." }, { icon: Smile, title: "Anatomia e mordida", description: "O formato do dente e os contatos da mordida influenciam o planejamento." }, { icon: Stethoscope, title: "Saúde ao redor", description: "Gengiva e dentes próximos também entram na análise do cuidado." },
    ], note: "Uma restauração não substitui a avaliação da causa. O profissional orienta a prevenção de novas alterações." },
    details: { eyebrow: "Cuidado individual", title: "Restaurar é preservar quando possível", paragraphs: ["O planejamento busca remover o tecido comprometido e reconstruir o dente de maneira compatível com sua função. A conduta depende da profundidade e das condições encontradas.", "Quando a alteração é mais extensa, outras alternativas podem ser discutidas. Por isso, não é possível definir material ou técnica por mensagem antes do exame."], cards: [
      { icon: CheckCircle2, title: "Tratar a causa", description: "Higiene, alimentação, hábitos e outras condições podem ser abordados para proteger o resultado." }, { icon: HeartHandshake, title: "Manter o acompanhamento", description: "Revisões ajudam a observar a restauração e a saúde do dente ao longo do tempo." },
    ] },
    process: { eyebrow: "Como funciona", title: "Um cuidado em quatro momentos", intro: "A consulta organiza diagnóstico, orientação e acompanhamento sem antecipar uma conduta.", steps: [
      { title: "Queixa e histórico", description: "Você descreve a alteração, sintomas e tratamentos prévios." }, { title: "Exame clínico", description: "O profissional avalia dente, gengiva, mordida e extensão da alteração." }, { title: "Explicação das opções", description: "São discutidos o cuidado indicado e as alternativas quando existirem." }, { title: "Revisão e prevenção", description: "O acompanhamento verifica a adaptação e orienta a manutenção da saúde bucal." },
    ] },
    care: commonCare("a restauração dentária"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dr. Francisco", description: "Fale com Dr. Francisco sobre uma alteração no dente e organize uma avaliação para entender o cuidado indicado." }, clinic: commonClinic("Restauração dentária"), locationTitle: "Restauração dentária no Recreio",
    faqs: [
      { question: "Quando um dente precisa de restauração?", answer: "Cáries, desgastes e fraturas podem exigir restauração, mas a necessidade só é confirmada pelo exame profissional." }, { question: "Restauração dói?", answer: "A experiência depende da extensão e da sensibilidade do caso. O profissional explica os cuidados antes do procedimento indicado." }, { question: "A restauração dura para sempre?", answer: "A durabilidade varia com material, extensão, mordida, hábitos e higiene. Acompanhamento e manutenção são importantes." }, { question: "Uma restauração pode substituir um tratamento de canal?", answer: "Não necessariamente. Quando a parte interna do dente está comprometida, outra conduta pode ser indicada após avaliação." }, { question: "Como agendar com Dr. Francisco?", answer: "Inicie uma conversa pelo WhatsApp desta página para falar com Dr. Francisco." }, { question: "Onde fica a clínica?", answer: "Estamos no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, no Recreio dos Bandeirantes." },
    ],
    final: { eyebrow: "Próximo passo", title: "Notou uma alteração em um dente?", description: "Agende uma avaliação no Recreio para entender a causa e as possibilidades de preservação da estrutura dental." }, relatedLinks: [{ href: "/tratamento-de-canal-no-recreio/", label: "Conhecer tratamento de canal" }, { href: "/limpeza-dental-no-recreio/", label: "Conhecer limpeza dental" }],
  }),
  limpeza: page({
    id: "limpeza", slug: "limpeza-dental-no-recreio", pagePath: "/limpeza-dental-no-recreio/", serviceName: "limpeza", professionalId: "francisco", whatsappMessage: messages.limpeza,
    title: "Limpeza Dental no Recreio | Clínica Barra Bonita", h1: "Limpeza Dental no Recreio dos Bandeirantes", eyebrow: "Limpeza dental no Recreio",
    description: "Limpeza dental no Recreio dos Bandeirantes com avaliação da higiene, biofilme e saúde gengival na Clínica Odontológica Barra Bonita no Rio de Janeiro.",
    keywords: ["limpeza dental no Recreio", "limpeza dos dentes", "profilaxia dental", "dentista no Recreio", "Clínica Barra Bonita", "Recreio dos Bandeirantes"],
    heroImage: image(limpezaHero, "/images/limpeza/limpeza-dental-recreio-hero.webp", "Avaliação para limpeza dental no Recreio"), evaluationImage: image(limpezaAvaliacao, "/images/limpeza/limpeza-dental-avaliacao.webp", "Orientação sobre higiene e saúde gengival"), planningImage: image(limpezaPlanejamento, "/images/limpeza/limpeza-dental-planejamento.webp", "Planejamento individual de cuidado preventivo"), ctaImage: image(limpezaCta, "/images/limpeza/limpeza-dental-recreio-cta.webp", "Paciente sorrindo após cuidado preventivo"),
    introduction: { eyebrow: "Prevenção", title: "O que acontece em uma limpeza dental?", paragraphs: ["A limpeza dental é um cuidado preventivo que pode remover biofilme e depósitos que a escovação diária não alcança. O atendimento deve ser adaptado à condição dos dentes e das gengivas.", "Mais do que uma rotina estética, a consulta permite observar sinais de inflamação, sangramento, sensibilidade e dificuldade de higiene. A periodicidade é definida individualmente após avaliação."] },
    evaluation: { eyebrow: "Saúde gengival", title: "O que pode ser observado?", intro: "A prevenção funciona melhor quando a orientação considera a boca e os hábitos de cada pessoa.", cards: [
      { icon: BrushCleaning, title: "Biofilme e depósitos", description: "O profissional identifica áreas que acumulam placa e precisam de atenção na higiene." }, { icon: ShieldCheck, title: "Gengivas", description: "Sangramento, vermelhidão e sensibilidade podem indicar que uma avaliação é necessária." }, { icon: Smile, title: "Técnica de higiene", description: "Escova, fio dental e outros recursos são orientados conforme a rotina do paciente." }, { icon: Stethoscope, title: "Periodicidade", description: "O intervalo entre consultas depende do risco, do histórico e das condições encontradas." },
    ], note: "Limpeza não substitui tratamento de cáries ou doenças gengivais. Sinais persistentes devem ser avaliados pelo dentista." },
    details: { eyebrow: "Cuidado contínuo", title: "Prevenção começa na rotina", paragraphs: ["A limpeza profissional complementa a higiene feita em casa. Ela não define sozinha a saúde bucal, mas pode ajudar a remover depósitos e a melhorar a orientação.", "A consulta também é uma oportunidade para revisar hábitos, esclarecer dúvidas e identificar quando outro cuidado odontológico precisa ser considerado."], cards: [
      { icon: CheckCircle2, title: "Orientação prática", description: "Pequenos ajustes na rotina podem facilitar a limpeza diária e a proteção das gengivas." }, { icon: HeartHandshake, title: "Acompanhar mudanças", description: "Retornos ajudam a perceber evolução, desconfortos e necessidades de prevenção." },
    ] },
    process: { eyebrow: "Como funciona", title: "Uma consulta voltada à prevenção", intro: "O atendimento combina avaliação, limpeza compatível com a condição encontrada e orientação para a rotina.", steps: [
      { title: "Conversa inicial", description: "Você conta seus hábitos, histórico, sensibilidades e dúvidas sobre higiene." }, { title: "Avaliação", description: "O profissional observa dentes, gengivas e pontos de acúmulo de biofilme." }, { title: "Limpeza e orientação", description: "O cuidado indicado é realizado e as técnicas de higiene são explicadas." }, { title: "Plano de manutenção", description: "A periodicidade e os próximos cuidados são definidos conforme a necessidade." },
    ] },
    care: commonCare("a limpeza dental"), professional: { eyebrow: "Profissional responsável", title: "Avaliação com Dr. Francisco", description: "Converse com Dr. Francisco para organizar uma avaliação de prevenção, higiene e saúde gengival." }, clinic: commonClinic("Limpeza dental"), locationTitle: "Limpeza dental no Recreio",
    faqs: [
      { question: "Com que frequência devo fazer limpeza dental?", answer: "O intervalo varia conforme higiene, histórico, risco e saúde gengival. O dentista define uma periodicidade individual." }, { question: "Limpeza dental clareia os dentes?", answer: "Ela pode remover depósitos e manchas externas, mas não é o mesmo que um clareamento dental." }, { question: "Limpeza dental dói?", answer: "A sensibilidade varia conforme a condição da gengiva e os depósitos. Avise o profissional sobre qualquer desconforto." }, { question: "Sangramento na escovação é normal?", answer: "Sangramento persistente merece avaliação, pois pode estar relacionado à inflamação gengival ou a outras condições." }, { question: "Como agendar com Dr. Francisco?", answer: "Use o WhatsApp desta página para falar diretamente com Dr. Francisco e marcar sua avaliação." }, { question: "Onde fica a clínica?", answer: "A Clínica Odontológica Barra Bonita fica no Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, no Recreio." },
    ],
    final: { eyebrow: "Próximo passo", title: "Quer colocar a prevenção em dia?", description: "Agende uma avaliação de limpeza dental no Recreio e receba orientação compatível com a sua saúde bucal." }, relatedLinks: [{ href: "/clareamento-dental-no-recreio/", label: "Conhecer clareamento dental" }, { href: "/tratamento-de-canal-no-recreio/", label: "Conhecer tratamento de canal" }],
  }),
} satisfies Record<ServiceLandingId, ServiceLandingConfig>;

export function getServiceLandingMetadata(config: ServiceLandingConfig) {
  const url = SITE_URL + config.pagePath;
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website" as const,
      locale: "pt_BR",
      url,
      siteName: clinic.name,
      title: config.title,
      description: config.description,
      images: [{ url: config.heroImage.path, width: 1200, height: 800, alt: config.heroImage.alt }],
    },
    twitter: { card: "summary_large_image" as const, title: config.title, description: config.description, images: [config.heroImage.path] },
  };
}

export function getServiceLandingJsonLd(config: ServiceLandingConfig) {
  const professional = dentists.find((dentist) => dentist.id === config.professionalId)!;
  const pageUrl = SITE_URL + config.pagePath;
  const clinicId = SITE_URL + "/#clinic";
  const professionalId = pageUrl + "#professional";
  const serviceId = pageUrl + "#service";
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Dentist", "@id": clinicId, name: clinic.name, legalName: clinic.legalName, url: SITE_URL, image: SITE_URL + config.heroImage.path, telephone: professional.phoneInternational, medicalSpecialty: "https://schema.org/Dentistry", address: { "@type": "PostalAddress", streetAddress: clinic.street, addressLocality: clinic.city, addressRegion: clinic.region, postalCode: clinic.postalCode, addressCountry: clinic.country }, areaServed: { "@type": "Place", name: clinic.neighborhood }, employee: { "@id": professionalId } },
      { "@type": "Person", "@id": professionalId, name: professional.name, jobTitle: "Cirurgião-dentista", url: professional.sourceUrl, identifier: { "@type": "PropertyValue", propertyID: "CRO/RJ", value: professional.cro.replace("CRO/RJ ", "") }, worksFor: { "@id": clinicId } },
      { "@type": "Service", "@id": serviceId, name: config.serviceName, serviceType: config.h1, provider: { "@id": clinicId }, employee: { "@id": professionalId }, areaServed: { "@type": "Place", name: clinic.neighborhood }, url: pageUrl, image: SITE_URL + config.heroImage.path, description: config.description },
      { "@type": "MedicalWebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: config.h1, description: config.description, inLanguage: "pt-BR", isPartOf: { "@id": clinicId }, about: { "@id": serviceId }, mainEntity: { "@id": serviceId }, breadcrumb: { "@id": pageUrl + "#breadcrumb" }, primaryImageOfPage: { "@id": serviceId } },
      { "@type": "FAQPage", "@id": pageUrl + "#faq", mainEntity: config.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "BreadcrumbList", "@id": pageUrl + "#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: SITE_URL + "/" }, { "@type": "ListItem", position: 2, name: config.h1, item: pageUrl }] },
    ],
  };
}

export const serviceLandingWhatsappUrls = Object.fromEntries(
  Object.values(serviceLandingPages).map((config) => [config.id, buildWhatsappUrl(dentists.find((dentist) => dentist.id === config.professionalId)!.phoneInternational, config.whatsappMessage)]),
) as Record<ServiceLandingId, string>;
