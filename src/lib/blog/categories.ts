export const blogCategories = {
  endodontia: {
    id: "endodontia",
    label: "Endodontia",
    description: "Conteúdos sobre a parte interna do dente e o tratamento de canal.",
  },
  implantodontia: {
    id: "implantodontia",
    label: "Implantodontia",
    description: "Conteúdos sobre reabilitação oral e implantes dentários.",
  },
  ortodontia: {
    id: "ortodontia",
    label: "Ortodontia",
    description: "Conteúdos sobre mordida, aparelhos e alinhadores.",
  },
  estetica: {
    id: "estetica",
    label: "Estética",
    description: "Conteúdos sobre estética odontológica e clareamento.",
  },
  protese: {
    id: "protese",
    label: "Prótese",
    description: "Conteúdos sobre próteses, função e conforto mastigatório.",
  },
  prevencao: {
    id: "prevencao",
    label: "Prevenção",
    description: "Conteúdos sobre higiene, prevenção e saúde gengival.",
  },
  harmonizacao: {
    id: "harmonizacao",
    label: "Harmonização",
    description: "Conteúdos sobre avaliação e planejamento orofacial responsável.",
  },
  "saude-bucal": {
    id: "saude-bucal",
    label: "Saúde bucal",
    description: "Conteúdos gerais para cuidar da saúde bucal.",
  },
} as const;

export type BlogCategoryId = keyof typeof blogCategories;

export function getBlogCategory(id: string) {
  return blogCategories[id as BlogCategoryId];
}
