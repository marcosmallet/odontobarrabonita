export const SITE_URL = "https://odontobarrabonita.com.br";

export const clinic = {
  name: "Clínica Odontológica Barra Bonita",
  legalName: "Clinica Odontologica Barra Bonita S/S",
  cnpj: "59.452.570/0001-65",
  building: "Absolutto Business Towers",
  street: "Av. das Américas, 19005 - Torre 2 - Sala 403",
  neighborhood: "Recreio dos Bandeirantes",
  city: "Rio de Janeiro",
  region: "RJ",
  postalCode: "22790-703",
  country: "BR",
} as const;

export const mapsUrl =
  "https://maps.app.goo.gl/Zp8vduD67f1ABD6h6";

export const mapsEmbedUrl =
  "https://www.google.com/maps?cid=10296742771749999210&output=embed";

export const googleReviewUrl =
  "https://g.page/r/CWrSuhX_YOWOEBM/review";

export type Dentist = {
  id: "carlos" | "francisco" | "marcia";
  name: string;
  shortName: string;
  cro: string;
  role: string;
  description: string;
  phone: string;
  phoneInternational: string;
  whatsappUrl: string;
  sourceUrl: string;
};

const whatsappMessage =
  "Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Cl%C3%ADnica%20Odontol%C3%B3gica%20Barra%20Bonita.";

export const dentists: Dentist[] = [
  {
    id: "carlos",
    name: "Dr. Carlos Jesus da Rocha",
    shortName: "Dr. Carlos",
    cro: "CRO/RJ 22487",
    role: "Especialista em Ortodontia e Implantodontia",
    description:
      "Atua também em clínica geral, com prótese, endodontia, restaurações, limpeza e clareamento. Na ortodontia, possui mais de 500 casos tratados com aparelhos fixos, móveis e alinhadores.",
    phone: "(21) 99893-4620",
    phoneInternational: "+5521998934620",
    whatsappUrl: `https://wa.me/5521998934620?text=${whatsappMessage}`,
    sourceUrl:
      "https://maps.app.goo.gl/YLcDUy3MAc3wN16F9",
  },
  {
    id: "francisco",
    name: "Dr. Francisco Calheiros de Carvalho Mendes",
    shortName: "Dr. Francisco",
    cro: "CRO/RJ 55471",
    role: "Especialista em Endodontia e Harmonização Facial",
    description:
      "Cirurgião-dentista com atuação em odontologia estética e harmonização orofacial, sempre mediante avaliação individual.",
    phone: "(21) 97134-0807",
    phoneInternational: "+5521971340807",
    whatsappUrl: `https://wa.me/5521971340807?text=${whatsappMessage}`,
    sourceUrl: "https://www.instagram.com/dr.frankcalheiros/",
  },
  {
    id: "marcia",
    name: "Dra. Márcia Ribeiro da Rocha",
    shortName: "Dra. Márcia",
    cro: "CRO/RJ 20664",
    role: "Especialista em Ortodontia e Implantodontia",
    description:
      "Atua também em clínica geral, com atenção à saúde bucal, à prevenção, à funcionalidade e à estética. Seu atendimento humanizado considera as necessidades de cada paciente e busca promover conforto, bem-estar e cuidado integral.",
    phone: "(21) 99656-4620",
    phoneInternational: "+5521996564620",
    whatsappUrl: `https://wa.me/5521996564620?text=${whatsappMessage}`,
    sourceUrl:
      "https://maps.app.goo.gl/LJzUNNG4ZB5F6MLJ9",
  },
];

export type ServiceIcon =
  | "braces"
  | "implant"
  | "endodontics"
  | "restoration"
  | "prosthesis"
  | "whitening"
  | "botox"
  | "facial";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
  whatsappDentistIds?: Dentist["id"][];
};

export const services: Service[] = [
  {
    title: "Ortodontia",
    description:
      "Planejamento com aparelhos fixos, móveis ou alinhadores, conforme as necessidades de cada paciente.",
    icon: "braces",
    whatsappDentistIds: ["carlos", "marcia"],
  },
  {
    title: "Implantes dentários",
    description:
      "Alternativas para reabilitação oral estudadas a partir da saúde, estrutura óssea e objetivos individuais.",
    icon: "implant",
    whatsappDentistIds: ["carlos", "marcia"],
  },
  {
    title: "Endodontia",
    description:
      "Avaliação e tratamento de alterações na parte interna do dente, com atenção à preservação da estrutura dental.",
    icon: "endodontics",
    whatsappDentistIds: ["francisco"],
  },
  {
    title: "Restaurações",
    description:
      "Recuperação de dentes afetados por cáries ou desgastes, respeitando função, anatomia e saúde bucal.",
    icon: "restoration",
  },
  {
    title: "Prótese",
    description:
      "Soluções protéticas planejadas para recuperar função mastigatória, conforto e harmonia do sorriso.",
    icon: "prosthesis",
    whatsappDentistIds: ["marcia"],
  },
  {
    title: "Clareamento dental",
    description:
      "Clareamento conduzido com orientação profissional e indicação definida após avaliação da saúde bucal.",
    icon: "whitening",
  },
  {
    title: "Toxina botulínica",
    description:
      "Uso odontológico considerado de forma responsável, após avaliação clínica e indicação profissional.",
    icon: "botox",
    whatsappDentistIds: ["francisco"],
  },
  {
    title: "Harmonização orofacial",
    description:
      "Planejamento individualizado que considera equilíbrio facial, saúde e características de cada paciente.",
    icon: "facial",
    whatsappDentistIds: ["francisco"],
  },
];

export const trustItems = [
  {
    title: "Profissionais identificados",
    description: "Equipe apresentada com seus respectivos registros no CRO/RJ.",
  },
  {
    title: "Atendimento presencial",
    description: "Cuidado próximo, com escuta e avaliação individual.",
  },
  {
    title: "Estrutura confortável",
    description: "Um ambiente pensado para acolher com tranquilidade.",
  },
  {
    title: "Localização prática",
    description: "No Absolutto Business Towers, no Recreio.",
  },
  {
    title: "Cuidado integrado",
    description: "Tratamentos odontológicos e estéticos com indicação responsável.",
  },
] as const;

export const faqs = [
  {
    question: "Preciso agendar antes de ir?",
    answer:
      "Recomendamos o agendamento prévio pelo WhatsApp para que a equipe possa organizar o atendimento e orientar você sobre a avaliação.",
  },
  {
    question: "A clínica atende quais tratamentos?",
    answer:
      "A clínica oferece avaliação odontológica, ortodontia, implantes, endodontia, restaurações, prótese, limpeza, clareamento, odontologia estética, toxina botulínica e harmonização orofacial. A indicação depende de avaliação individual.",
  },
  {
    question: "Clareamento dental serve para todos os casos?",
    answer:
      "Não necessariamente. O cirurgião-dentista avalia a saúde bucal, o tipo de alteração de cor e possíveis contraindicações antes de indicar a abordagem adequada.",
  },
  {
    question: "Implante dentário é indicado para qualquer paciente?",
    answer:
      "A indicação considera condições de saúde, estrutura óssea, hábitos e necessidades individuais. Somente uma avaliação clínica pode determinar se o implante é uma alternativa adequada.",
  },
  {
    question: "Toxina botulínica e harmonização precisam de avaliação?",
    answer:
      "Sim. Esses procedimentos exigem avaliação profissional, planejamento individual e análise de indicações e contraindicações. Não é possível prever ou garantir resultados.",
  },
  {
    question: "Onde fica a clínica?",
    answer:
      "No Absolutto Business Towers, Av. das Américas, 19005, Torre 2, Sala 403, Recreio dos Bandeirantes, Rio de Janeiro - RJ, CEP 22790-703.",
  },
  {
    question: "Como falar com os profissionais?",
    answer:
      "Use os botões de WhatsApp do site e escolha Dr. Carlos, Dr. Francisco ou Dra. Márcia. A conversa será aberta diretamente no WhatsApp.",
  },
] as const;

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Profissionais", href: "#profissionais" },
  { label: "Contato", href: "#contato" },
  { label: "Localização", href: "#localizacao" },
] as const;
