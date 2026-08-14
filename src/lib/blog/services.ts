import type { Dentist } from "@/lib/site-data";
import { buildWhatsappUrl } from "@/lib/site-data";
import type { BlogCategoryId } from "./categories";

export const dentalServices = {
  implante: {
    id: "implante",
    label: "Implante dentário",
    category: "implantodontia",
    landingPage: "/implante-dentario-no-recreio/",
    professionalId: "carlos",
    ctaTitle: "Converse sobre implante dentário",
    ctaDescription: "Conheça o atendimento e o planejamento individual da Clínica Barra Bonita.",
    ctaLinkLabel: "Conhecer implante dentário",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para implante dentário.",
  },
  canal: {
    id: "canal",
    label: "Tratamento de canal",
    category: "endodontia",
    landingPage: "/tratamento-de-canal-no-recreio/",
    professionalId: "francisco",
    ctaTitle: "Precisa avaliar uma dor ou alteração em um dente?",
    ctaDescription: "Conheça o atendimento para tratamento de canal no Recreio.",
    ctaLinkLabel: "Conhecer tratamento de canal",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para tratamento de canal.",
  },
  clareamento: {
    id: "clareamento",
    label: "Clareamento dental",
    category: "estetica",
    landingPage: "/clareamento-dental-no-recreio/",
    professionalId: "francisco",
    ctaTitle: "Quer conversar sobre clareamento dental?",
    ctaDescription: "A indicação depende da avaliação da saúde bucal e dos objetivos de cada pessoa.",
    ctaLinkLabel: "Conhecer clareamento dental",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para clareamento dental.",
  },
  ortodontia: {
    id: "ortodontia",
    label: "Ortodontia",
    category: "ortodontia",
    landingPage: "/ortodontista-no-recreio/",
    professionalId: "carlos",
    ctaTitle: "Converse sobre ortodontia",
    ctaDescription: "Entenda as possibilidades após uma avaliação odontológica individual.",
    ctaLinkLabel: "Conhecer ortodontia",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação em ortodontia.",
  },
  protese: {
    id: "protese",
    label: "Prótese dentária",
    category: "protese",
    landingPage: "/protese-dentaria-no-recreio/",
    professionalId: "marcia",
    ctaTitle: "Converse sobre prótese dentária",
    ctaDescription: "Conheça as possibilidades de planejamento para seu caso.",
    ctaLinkLabel: "Conhecer prótese dentária",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para prótese dentária.",
  },
  restauracao: {
    id: "restauracao",
    label: "Restauração dentária",
    category: "saude-bucal",
    landingPage: "/restauracao-dentaria-no-recreio/",
    professionalId: "francisco",
    ctaTitle: "Precisa avaliar um dente desgastado ou fraturado?",
    ctaDescription: "A restauração adequada depende de exame e planejamento cuidadoso.",
    ctaLinkLabel: "Conhecer restauração dentária",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para restauração dentária.",
  },
  limpeza: {
    id: "limpeza",
    label: "Limpeza dental",
    category: "prevencao",
    landingPage: "/limpeza-dental-no-recreio/",
    professionalId: "francisco",
    ctaTitle: "Quer cuidar melhor da sua saúde bucal?",
    ctaDescription: "Converse com a clínica sobre prevenção, higiene e avaliação gengival.",
    ctaLinkLabel: "Conhecer limpeza dental",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para limpeza dental.",
  },
  alinhadores: {
    id: "alinhadores",
    label: "Alinhadores transparentes",
    category: "ortodontia",
    landingPage: "/alinhadores-no-recreio/",
    professionalId: "carlos",
    ctaTitle: "Quer conversar sobre alinhadores?",
    ctaDescription: "Somente a avaliação pode confirmar as possibilidades para cada caso.",
    ctaLinkLabel: "Conhecer alinhadores transparentes",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para alinhadores transparentes.",
  },
  harmonizacao: {
    id: "harmonizacao",
    label: "Harmonização orofacial",
    category: "harmonizacao",
    landingPage: "/harmonizacao-orofacial-no-recreio/",
    professionalId: "francisco",
    ctaTitle: "Converse sobre harmonização orofacial",
    ctaDescription: "A avaliação individual orienta possibilidades, limites e expectativas realistas.",
    ctaLinkLabel: "Conhecer harmonização orofacial",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para harmonização orofacial.",
  },
  toxina: {
    id: "toxina",
    label: "Toxina botulínica",
    category: "harmonizacao",
    landingPage: "/toxina-botulinica-no-recreio/",
    professionalId: "francisco",
    ctaTitle: "Quer entender se a toxina botulínica faz sentido para você?",
    ctaDescription: "A indicação depende de avaliação clínica, planejamento e expectativas realistas.",
    ctaLinkLabel: "Conhecer toxina botulínica",
    whatsappMessage: "Olá, encontrei a Clínica Odontológica Barra Bonita pelo blog e gostaria de agendar uma avaliação para toxina botulínica.",
  },
} as const satisfies Record<string, {
  id: string;
  label: string;
  category: BlogCategoryId;
  landingPage: string;
  professionalId: Dentist["id"];
  ctaTitle: string;
  ctaDescription: string;
  ctaLinkLabel: string;
  whatsappMessage: string;
}>;

export type DentalServiceId = keyof typeof dentalServices;

export function getDentalService(id: string) {
  return dentalServices[id as DentalServiceId];
}

export function getServiceWhatsappUrl(id: DentalServiceId, phoneInternational: string) {
  return buildWhatsappUrl(phoneInternational, dentalServices[id].whatsappMessage);
}
