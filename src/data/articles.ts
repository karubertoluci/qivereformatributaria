
export interface ArticleImpact {
  type: 'positive' | 'negative' | 'neutral';
  description: string;
  segments: string[];
}

export interface Article {
  id: string;
  number: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  impacts: ArticleImpact[];
}

export const articles: Article[] = [
  {
    id: "art1",
    number: "Art. 1º",
    title: "Disposições Gerais da Contribuição sobre Bens e Serviços",
    originalText: "Fica instituída, nos termos do art. 153, VIII, da Constituição Federal, a Contribuição sobre Bens e Serviços (CBS), de competência da União.",
    simplifiedText: "Este artigo cria um novo imposto federal chamado Contribuição sobre Bens e Serviços (CBS), que será cobrado pelo governo federal.",
    impacts: [
      {
        type: 'neutral',
        description: "Substituição de tributos anteriores por um novo modelo unificado",
        segments: ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"]
      }
    ]
  },
  {
    id: "art2",
    number: "Art. 2º",
    title: "Fato Gerador da CBS",
    originalText: "Constitui fato gerador da CBS a realização de operações com bens e serviços em território nacional, ainda que sem caráter habitual, independentemente de sua denominação ou classificação contábil.",
    simplifiedText: "A CBS incidirá sobre qualquer operação com bens e serviços realizada no Brasil, não importando se é uma atividade frequente ou como ela é classificada na contabilidade.",
    impacts: [
      {
        type: 'negative',
        description: "Ampliação da base de incidência tributária para operações não habituais",
        segments: ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao"]
      },
      {
        type: 'positive',
        description: "Uniformização de critérios independente da classificação contábil",
        segments: ["tecnologia", "saude", "educacao", "financeiro", "transporte"]
      }
    ]
  },
  {
    id: "art3",
    number: "Art. 3º",
    title: "Não Incidência da CBS",
    originalText: "A CBS não incide sobre: I - operações de exportação, assegurado o direito a manutenção dos créditos; II - operações com ouro, quando definido em lei como ativo financeiro ou instrumento cambial...",
    simplifiedText: "A CBS não será cobrada em alguns casos, como exportações (mantendo-se os créditos) e operações com ouro quando usado como ativo financeiro.",
    impacts: [
      {
        type: 'positive',
        description: "Desoneração das exportações mantendo o direito a créditos",
        segments: ["industria", "agronegocio", "tecnologia"]
      },
      {
        type: 'positive',
        description: "Não incidência sobre operações com ouro como ativo financeiro",
        segments: ["financeiro"]
      }
    ]
  },
  {
    id: "art9",
    number: "Art. 9º",
    title: "Alíquotas da CBS",
    originalText: "A alíquota da CBS será de 26,5% (vinte e seis inteiros e cinco décimos por cento).",
    simplifiedText: "A alíquota padrão da CBS será de 26,5%.",
    impacts: [
      {
        type: 'negative',
        description: "Alíquota elevada em comparação com tributos anteriores",
        segments: ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"]
      }
    ]
  },
  {
    id: "art10",
    number: "Art. 10",
    title: "Alíquotas Reduzidas",
    originalText: "São reduzidas em 60% (sessenta por cento) as alíquotas da CBS incidentes sobre as operações com bens e serviços classificados nos seguintes códigos da Nomenclatura Comum do Mercosul...",
    simplifiedText: "Alguns produtos e serviços terão uma redução de 60% na alíquota da CBS, como alimentos essenciais, medicamentos, insumos agrícolas, entre outros.",
    impacts: [
      {
        type: 'positive',
        description: "Redução significativa da carga tributária para setores essenciais",
        segments: ["comercio_varejo", "agronegocio", "saude"]
      }
    ]
  },
  {
    id: "art22",
    number: "Art. 22",
    title: "Regime Específico para Micro e Pequenas Empresas",
    originalText: "As microempresas e empresas de pequeno porte optantes pelo Regime Especial Unificado de Arrecadação de Tributos e Contribuições (Simples Nacional) não estão sujeitas à CBS...",
    simplifiedText: "Micro e pequenas empresas que optam pelo Simples Nacional não precisarão pagar a CBS diretamente, pois continuarão no sistema simplificado.",
    impacts: [
      {
        type: 'positive',
        description: "Manutenção do regime simplificado para pequenas empresas",
        segments: ["comercio_varejo", "servicos", "tecnologia", "saude", "educacao"]
      }
    ]
  },
  {
    id: "art30",
    number: "Art. 30",
    title: "Direito ao Crédito",
    originalText: "O contribuinte tem direito a créditos idênticos ao valor da CBS incidente sobre bens e serviços adquiridos, inclusive os destinados a uso, consumo ou ativo imobilizado...",
    simplifiedText: "O contribuinte poderá usar como crédito o valor da CBS que foi pago nas suas compras, incluindo itens para uso, consumo ou bens duráveis (ativo imobilizado).",
    impacts: [
      {
        type: 'positive',
        description: "Ampliação do direito a crédito para todas as aquisições",
        segments: ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"]
      },
      {
        type: 'positive',
        description: "Inclusão de créditos sobre bens para uso e consumo e ativo imobilizado",
        segments: ["industria", "construcao"]
      }
    ]
  },
  {
    id: "art95",
    number: "Art. 95",
    title: "Transição e Vigência",
    originalText: "Esta Lei Complementar entra em vigor na data de sua publicação e produz efeitos a partir de 1º de janeiro de 2025.",
    simplifiedText: "A nova lei entra em vigor imediatamente após publicação, mas só começará a produzir efeitos práticos a partir de 1º de janeiro de 2025.",
    impacts: [
      {
        type: 'neutral',
        description: "Prazo razoável para adaptação das empresas ao novo sistema",
        segments: ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"]
      }
    ]
  }
];
