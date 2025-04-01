
export interface BusinessSegment {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const businessSegments: BusinessSegment[] = [
  {
    id: "comercio_varejo",
    name: "Comércio e Varejo",
    description: "Empresas de comércio varejista de produtos diversos",
    emoji: "🛍️"
  },
  {
    id: "industria",
    name: "Indústria",
    description: "Empresas industriais e de manufatura",
    emoji: "🏭"
  },
  {
    id: "servicos",
    name: "Prestação de Serviços",
    description: "Empresas prestadoras de serviços diversos",
    emoji: "🛠️"
  },
  {
    id: "agronegocio",
    name: "Agronegócio",
    description: "Empresas do setor agrícola e agropecuário",
    emoji: "🌾"
  },
  {
    id: "construcao",
    name: "Construção Civil",
    description: "Empresas de construção e incorporação",
    emoji: "🏗️"
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    description: "Empresas de tecnologia e desenvolvimento de software",
    emoji: "💻"
  },
  {
    id: "saude",
    name: "Saúde",
    description: "Empresas do setor de saúde e bem-estar",
    emoji: "⚕️"
  },
  {
    id: "educacao",
    name: "Educação",
    description: "Instituições de ensino e treinamento",
    emoji: "🎓"
  },
  {
    id: "financeiro",
    name: "Serviços Financeiros",
    description: "Empresas do setor financeiro e bancário",
    emoji: "💰"
  },
  {
    id: "transporte",
    name: "Transporte e Logística",
    description: "Empresas de transporte e logística",
    emoji: "🚚"
  }
];
