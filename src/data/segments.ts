
export interface BusinessSegment {
  id: string;
  name: string;
  description: string;
}

export const businessSegments: BusinessSegment[] = [
  {
    id: "comercio_varejo",
    name: "Comércio e Varejo",
    description: "Empresas de comércio varejista de produtos diversos"
  },
  {
    id: "industria",
    name: "Indústria",
    description: "Empresas industriais e de manufatura"
  },
  {
    id: "servicos",
    name: "Prestação de Serviços",
    description: "Empresas prestadoras de serviços diversos"
  },
  {
    id: "agronegocio",
    name: "Agronegócio",
    description: "Empresas do setor agrícola e agropecuário"
  },
  {
    id: "construcao",
    name: "Construção Civil",
    description: "Empresas de construção e incorporação"
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    description: "Empresas de tecnologia e desenvolvimento de software"
  },
  {
    id: "saude",
    name: "Saúde",
    description: "Empresas do setor de saúde e bem-estar"
  },
  {
    id: "educacao",
    name: "Educação",
    description: "Instituições de ensino e treinamento"
  },
  {
    id: "financeiro",
    name: "Serviços Financeiros",
    description: "Empresas do setor financeiro e bancário"
  },
  {
    id: "transporte",
    name: "Transporte e Logística",
    description: "Empresas de transporte e logística"
  }
];
