
export interface ArticleImpact {
  type: 'positive' | 'negative' | 'neutral';
  description: string;
  segments: string[];
  severity?: 'low' | 'medium' | 'high' | 'critical' | number;
}

export interface ArticleMetadata {
  bookId?: 'I' | 'II' | 'III' | 'IV';
  bookTitle?: string;
  title?: string;
  chapter?: string;
  section?: string;
  subsection?: string;
  relevanceScore?: number;
  impactType?: 'positive' | 'negative' | 'neutral';
  livro?: string;
  titulo?: string;
  // Add the missing properties
  relevancia?: string;
  impacto?: string;
}

export interface Article {
  id: string;
  number: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  impacts: ArticleImpact[];
  metadata?: ArticleMetadata;
}

const createImpact = (type: 'positive' | 'negative' | 'neutral', description: string, segments: string[], severity: 'low' | 'medium' | 'high' | 'critical'): ArticleImpact => {
  return {
    type,
    description,
    segments,
    severity
  };
};

export const articles: Article[] = [
  {
    id: "art1",
    number: "Art. 1º",
    title: "Disposições Gerais da Contribuição sobre Bens e Serviços",
    originalText: "Fica instituída, nos termos do art. 153, VIII, da Constituição Federal, a Contribuição sobre Bens e Serviços (CBS), de competência da União.",
    simplifiedText: "Este artigo cria um novo imposto federal chamado Contribuição sobre Bens e Serviços (CBS), que será cobrado pelo governo federal.",
    impacts: [
      createImpact('neutral', "Substituição de tributos anteriores por um novo modelo unificado", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'medium')
    ],
    metadata: {
      bookId: 'I',
      bookTitle: 'CBS',
      title: 'NORMAS GERAIS',
      chapter: 'Disposições Preliminares',
      relevanceScore: 25,
      impactType: 'neutral',
      livro: 'CBS',
      titulo: 'NORMAS GERAIS'
    }
  },
  {
    id: "art2",
    number: "Art. 2º",
    title: "Fato Gerador da CBS",
    originalText: "Constitui fato gerador da CBS a realização de operações com bens e serviços em território nacional, ainda que sem caráter habitual, independentemente de sua denominação ou classificação contábil.",
    simplifiedText: "A CBS incidirá sobre qualquer operação com bens e serviços realizada no Brasil, não importando se é uma atividade frequente ou como ela é classificada na contabilidade.",
    impacts: [
      createImpact('negative', "Ampliação da base de incidência tributária para operações não habituais", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao"], 'high'),
      createImpact('positive', "Uniformização de critérios independente da classificação contábil", ["tecnologia", "saude", "educacao", "financeiro", "transporte"], 'medium')
    ],
    metadata: {
      bookId: 'I',
      relevanceScore: 85,
      impactType: 'negative',
      livro: 'CBS',
      titulo: 'FATO GERADOR DA CBS'
    }
  },
  {
    id: "art3",
    number: "Art. 3º",
    title: "Não Incidência da CBS",
    originalText: "A CBS não incide sobre: I - operações de exportação, assegurado o direito a manutenção dos créditos; II - operações com ouro, quando definido em lei como ativo financeiro ou instrumento cambial...",
    simplifiedText: "A CBS não será cobrada em alguns casos, como exportações (mantendo-se os créditos) e operações com ouro quando usado como ativo financeiro.",
    impacts: [
      createImpact('positive', "Desoneração das exportações mantendo o direito a créditos", ["industria", "agronegocio", "tecnologia"], 'high'),
      createImpact('positive', "Não incidência sobre operações com ouro como ativo financeiro", ["financeiro"], 'medium')
    ],
    metadata: {
      bookId: 'I',
      relevanceScore: 75,
      impactType: 'positive',
      livro: 'CBS',
      titulo: 'NÃO INCIDÊNCIA DA CBS'
    }
  },
  {
    id: "art4",
    number: "Art. 4º",
    title: "Base de Cálculo da CBS",
    originalText: "A base de cálculo da CBS é o preço do bem ou serviço, incluídos os impostos, taxas e demais contribuições incidentes sobre a operação.",
    simplifiedText: "Para calcular a CBS, será considerado o preço total do produto ou serviço, incluindo outros impostos e taxas.",
    impacts: [
      createImpact('neutral', "Manutenção da sistemática atual de cálculo 'por dentro'", ["comercio_varejo", "industria", "servicos"], 'low'),
      createImpact('negative', "Possibilidade de efeito cascata em algumas operações", ["industria", "tecnologia"], 'medium')
    ],
    metadata: {
      bookId: 'I',
      relevanceScore: 40,
      impactType: 'neutral',
      livro: 'CBS',
      titulo: 'BASE DE CÁLCULO DA CBS'
    }
  },
  {
    id: "art5",
    number: "Art. 5º",
    title: "Contribuintes da CBS",
    originalText: "São contribuintes da CBS as pessoas jurídicas de direito privado e as que lhes são equiparadas pela legislação do Imposto sobre a Renda.",
    simplifiedText: "Empresas e entidades equiparadas a empresas pelo IR serão os contribuintes da CBS.",
    impacts: [
      createImpact('neutral', "Manutenção do mesmo universo de contribuintes já existente", ["comercio_varejo", "industria", "servicos", "tecnologia"], 'low')
    ],
    metadata: {
      bookId: 'I',
      relevanceScore: 15,
      impactType: 'neutral',
      livro: 'CBS',
      titulo: 'CONTRIBUINTES DA CBS'
    }
  },
  {
    id: "art9",
    number: "Art. 9º",
    title: "Alíquotas da CBS",
    originalText: "A alíquota da CBS será de 26,5% (vinte e seis inteiros e cinco décimos por cento).",
    simplifiedText: "A alíquota padrão da CBS será de 26,5%.",
    impacts: [
      createImpact('negative', "Alíquota elevada em comparação com tributos anteriores", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'high')
    ]
  },
  {
    id: "art10",
    number: "Art. 10",
    title: "Alíquotas Reduzidas",
    originalText: "São reduzidas em 60% (sessenta por cento) as alíquotas da CBS incidentes sobre as operações com bens e serviços classificados nos seguintes códigos da Nomenclatura Comum do Mercosul...",
    simplifiedText: "Alguns produtos e serviços terão uma redução de 60% na alíquota da CBS, como alimentos essenciais, medicamentos, insumos agrícolas, entre outros.",
    impacts: [
      createImpact('positive', "Redução significativa da carga tributária para setores essenciais", ["comercio_varejo", "agronegocio", "saude"], 'high')
    ]
  },
  {
    id: "art22",
    number: "Art. 22",
    title: "Regime Específico para Micro e Pequenas Empresas",
    originalText: "As microempresas e empresas de pequeno porte optantes pelo Regime Especial Unificado de Arrecadação de Tributos e Contribuições (Simples Nacional) não estão sujeitas à CBS...",
    simplifiedText: "Micro e pequenas empresas que optam pelo Simples Nacional não precisarão pagar a CBS diretamente, pois continuarão no sistema simplificado.",
    impacts: [
      createImpact('positive', "Manutenção do regime simplificado para pequenas empresas", ["comercio_varejo", "servicos", "tecnologia", "saude", "educacao"], 'high')
    ]
  },
  {
    id: "art30",
    number: "Art. 30",
    title: "Direito ao Crédito",
    originalText: "O contribuinte tem direito a créditos idênticos ao valor da CBS incidente sobre bens e serviços adquiridos, inclusive os destinados a uso, consumo ou ativo imobilizado...",
    simplifiedText: "O contribuinte poderá usar como crédito o valor da CBS que foi pago nas suas compras, incluindo itens para uso, consumo ou bens duráveis (ativo imobilizado).",
    impacts: [
      createImpact('positive', "Ampliação do direito a crédito para todas as aquisições", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'high'),
      createImpact('positive', "Inclusão de créditos sobre bens para uso e consumo e ativo imobilizado", ["industria", "construcao"], 'high')
    ]
  },
  {
    id: "art95",
    number: "Art. 95",
    title: "Transição e Vigência",
    originalText: "Esta Lei Complementar entra em vigor na data de sua publicação e produz efeitos a partir de 1º de janeiro de 2025.",
    simplifiedText: "A nova lei entra em vigor imediatamente após publicação, mas só começará a produzir efeitos práticos a partir de 1º de janeiro de 2025.",
    impacts: [
      createImpact('neutral', "Prazo razoável para adaptação das empresas ao novo sistema", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'medium')
    ]
  },
  {
    id: "art5",
    number: "Art. 5º",
    title: "Contribuinte da CBS",
    originalText: "É contribuinte da CBS a pessoa física ou jurídica que realize operações com bens e serviços, ainda que essas operações se destinem a fins alheios à atividade empresarial.",
    simplifiedText: "Qualquer pessoa ou empresa que realize operações com bens e serviços será contribuinte da CBS, mesmo que essas operações não façam parte da sua atividade principal.",
    impacts: [
      createImpact('negative', "Ampliação do conceito de contribuinte, incluindo operações não empresariais", ["comercio_varejo", "servicos", "educacao", "financeiro"], 'high')
    ]
  },
  {
    id: "art12",
    number: "Art. 12",
    title: "Isenção para Medicamentos",
    originalText: "São isentas da CBS as operações com medicamentos destinados ao tratamento de doenças graves, conforme relação definida em ato do Poder Executivo.",
    simplifiedText: "Medicamentos para tratamento de doenças graves serão isentos da CBS, de acordo com lista a ser definida pelo governo.",
    impacts: [
      createImpact('positive', "Redução de custos para o setor de saúde em medicamentos essenciais", ["saude", "comercio_varejo"], 'high')
    ]
  },
  {
    id: "art15",
    number: "Art. 15",
    title: "Base de Cálculo da CBS",
    originalText: "A base de cálculo da CBS é o valor da operação com bens e serviços, assim entendido o preço do bem ou serviço, incluídos os valores de seguros, de frete e outros encargos cobrados do adquirente.",
    simplifiedText: "A base para calcular a CBS será o valor total da operação, incluindo o preço do produto ou serviço, seguros, fretes e outros encargos cobrados do cliente.",
    impacts: [
      createImpact('negative', "Inclusão de todos os encargos na base de cálculo pode aumentar o valor tributado", ["comercio_varejo", "transporte", "industria"], 'high')
    ]
  },
  {
    id: "art25",
    number: "Art. 25",
    title: "Regimes Especiais de Apuração",
    originalText: "Para efeitos de apuração da CBS, aplicam-se regimes especiais aos seguintes setores: I - serviços financeiros; II - seguros; III - operações com bens imóveis; IV - cooperativas; V - serviços de hotelaria, restaurantes e similares.",
    simplifiedText: "Alguns setores terão regras especiais para calcular a CBS, como serviços financeiros, seguros, imóveis, cooperativas e serviços de alimentação e hotelaria.",
    impacts: [
      createImpact('positive', "Reconhecimento das particularidades operacionais de cada setor", ["financeiro", "servicos", "construcao"], 'high')
    ]
  },
  {
    id: "art40",
    number: "Art. 40",
    title: "Recolhimento do IBS",
    originalText: "O Imposto sobre Bens e Serviços (IBS), de competência de Estados, Distrito Federal e Municípios, será recolhido de forma unificada por meio de sistema nacional integrado, assegurada a distribuição da receita aos entes federados.",
    simplifiedText: "O IBS (imposto estadual e municipal) será pago em um sistema unificado nacional, e depois a receita será distribuída para estados e municípios.",
    impacts: [
      createImpact('positive', "Simplificação do recolhimento com sistema único em vez de múltiplos sistemas estaduais e municipais", ["comercio_varejo", "industria", "servicos", "tecnologia"], 'high')
    ]
  },
  {
    id: "art45",
    number: "Art. 45",
    title: "Período de Apuração Mensal",
    originalText: "O período de apuração da CBS e do IBS será mensal, com recolhimento até o vigésimo dia do mês subsequente ao de ocorrência do fato gerador.",
    simplifiedText: "A CBS e o IBS serão apurados mensalmente e o pagamento deve ser feito até o dia 20 do mês seguinte.",
    impacts: [
      createImpact('neutral', "Manutenção do período mensal já utilizado em outros tributos", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'medium')
    ]
  },
  {
    id: "art50",
    number: "Art. 50",
    title: "Substituição Tributária",
    originalText: "A lei complementar poderá estabelecer casos de substituição tributária, em que o recolhimento da CBS e do IBS será feito por contribuinte distinto daquele que realizou a operação tributada.",
    simplifiedText: "Em alguns casos, uma empresa pode ser responsável por pagar os impostos no lugar de outra (substituição tributária), conforme regras a serem definidas.",
    impacts: [
      createImpact('negative', "Potencial aumento de complexidade e fluxo de caixa para empresas substitutos tributários", ["industria", "comercio_varejo"], 'high')
    ]
  },
  {
    id: "art60",
    number: "Art. 60",
    title: "Escrituração Digital Centralizada",
    originalText: "A escrituração fiscal e contábil dos contribuintes será realizada de forma digital e centralizada, através do Sistema Público de Escrituração Digital (SPED).",
    simplifiedText: "As empresas deverão manter seus registros fiscais e contábeis de forma digital no sistema SPED do governo.",
    impacts: [
      createImpact('positive', "Unificação dos sistemas de escrituração reduz custos operacionais", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'high'),
      createImpact('negative', "Necessidade de adaptação e investimento em sistemas compatíveis", ["comercio_varejo", "servicos", "educacao"], 'medium')
    ]
  },
  {
    id: "art70",
    number: "Art. 70",
    title: "Comitê Gestor da Administração Tributária",
    originalText: "Fica instituído o Comitê Gestor da Administração Tributária Nacional, composto por representantes da União, dos Estados, do Distrito Federal e dos Municípios, com atribuição de regulamentar e gerir a arrecadação centralizada do IBS.",
    simplifiedText: "Será criado um comitê gestor com representantes de todos os níveis de governo para administrar o sistema de arrecadação do novo IBS.",
    impacts: [
      createImpact('neutral', "Criação de órgão de governança compartilhada entre os entes federativos", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'medium')
    ]
  },
  {
    id: "art85",
    number: "Art. 85",
    title: "Cashback para População de Baixa Renda",
    originalText: "A lei poderá estabelecer mecanismo de devolução de tributos a pessoas físicas, com o objetivo de reduzir as desigualdades de carga tributária entre contribuintes em diferentes faixas de renda.",
    simplifiedText: "O governo poderá devolver parte dos impostos para pessoas de baixa renda, para reduzir a desigualdade tributária.",
    impacts: [
      createImpact('positive', "Potencial aumento do consumo entre famílias de baixa renda beneficiadas pelo cashback", ["comercio_varejo", "servicos"], 'high')
    ]
  },
  {
    id: "art90",
    number: "Art. 90",
    title: "Regras de Transição",
    originalText: "Fica estabelecido o período de transição de 8 (oito) anos para a completa substituição dos tributos atuais pela CBS e pelo IBS, com percentuais progressivos de implementação conforme cronograma anexo.",
    simplifiedText: "A substituição dos impostos atuais pelos novos (CBS e IBS) será gradual, ao longo de 8 anos, seguindo um cronograma definido.",
    impacts: [
      createImpact('positive', "Período longo para adaptação reduz impactos imediatos nas empresas", ["comercio_varejo", "industria", "servicos", "agronegocio", "construcao", "tecnologia", "saude", "educacao", "financeiro", "transporte"], 'high')
    ]
  },
  {
    id: "art35",
    number: "Art. 35",
    title: "Imposto Seletivo",
    originalText: "Fica instituído o Imposto Seletivo, que incidirá sobre operações com bens e serviços prejudiciais à saúde ou ao meio ambiente, nos termos de lei complementar.",
    simplifiedText: "Será criado um imposto adicional (Imposto Seletivo) que irá incidir sobre produtos prejudiciais à saúde ou ao meio ambiente, como cigarros, bebidas alcoólicas e combustíveis fósseis.",
    impacts: [
      createImpact('negative', "Aumento da carga tributária para produtos considerados prejudiciais", ["industria", "agronegocio"], 'high')
    ]
  }
];
