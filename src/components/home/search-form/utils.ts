
// Mapeamento mais detalhado para CNAEs comuns
export const cnaeToSegmentMap: Record<string, string> = {
  // Comércio e Varejo
  "45": "comercio_varejo",    // Comércio e reparação de veículos
  "46": "comercio_varejo",    // Comércio atacadista
  "47": "comercio_varejo",    // Comércio varejista
  
  // Indústria
  "10": "industria",          // Fabricação de produtos alimentícios
  "11": "industria",          // Fabricação de bebidas
  "12": "industria",          // Fabricação de produtos do fumo
  "13": "industria",          // Fabricação de produtos têxteis
  "14": "industria",          // Confecção de artigos do vestuário
  "15": "industria",          // Preparação de couros e fabricação de artefatos
  "16": "industria",          // Fabricação de produtos de madeira
  "17": "industria",          // Fabricação de celulose, papel
  "18": "industria",          // Impressão e reprodução de gravações
  "19": "industria",          // Fabricação de coque, produtos derivados do petróleo
  "20": "industria",          // Fabricação de produtos químicos
  "21": "industria",          // Fabricação de produtos farmoquímicos
  "22": "industria",          // Fabricação de produtos de borracha
  "23": "industria",          // Fabricação de produtos de minerais não-metálicos
  "24": "industria",          // Metalurgia
  "25": "industria",          // Fabricação de produtos de metal
  "26": "industria",          // Fabricação de equipamentos de informática
  "27": "industria",          // Fabricação de máquinas, aparelhos e materiais elétricos
  "28": "industria",          // Fabricação de máquinas e equipamentos
  "29": "industria",          // Fabricação de veículos automotores
  "30": "industria",          // Fabricação de outros equipamentos de transporte
  "31": "industria",          // Fabricação de móveis
  "32": "industria",          // Fabricação de produtos diversos
  "33": "industria",          // Manutenção, reparação e instalação
  
  // Tecnologia
  "58": "tecnologia",         // Edição e edição integrada à impressão
  "59": "tecnologia",         // Atividades cinematográficas
  "60": "tecnologia",         // Atividades de rádio e de televisão
  "61": "tecnologia",         // Telecomunicações
  "62": "tecnologia",         // Atividades dos serviços de tecnologia da informação
  "63": "tecnologia",         // Atividades de prestação de serviços de informação
  
  // Agronegócio
  "01": "agronegocio",        // Agricultura, pecuária e serviços relacionados
  "02": "agronegocio",        // Produção florestal
  "03": "agronegocio",        // Pesca e aquicultura
  
  // Construção
  "41": "construcao",         // Construção de edifícios
  "42": "construcao",         // Obras de infraestrutura
  "43": "construcao",         // Serviços especializados para construção
  
  // Transportes
  "49": "transporte",         // Transporte terrestre
  "50": "transporte",         // Transporte aquaviário
  "51": "transporte",         // Transporte aéreo
  "52": "transporte",         // Armazenamento e atividades auxiliares
  "53": "transporte",         // Correio e outras atividades de entrega
  
  // Financeiro
  "64": "financeiro",         // Atividades de serviços financeiros
  "65": "financeiro",         // Seguros, previdência, planos de saúde
  "66": "financeiro",         // Atividades auxiliares dos serviços financeiros
  
  // Educação
  "85": "educacao",           // Educação
  
  // Saúde
  "86": "saude",              // Atividades de atenção à saúde humana
  "87": "saude",              // Atividades de atenção à saúde integradas com assistência social
  "88": "saude",              // Serviços de assistência social sem alojamento
  
  // Serviços em geral (padrão)
  "55": "servicos",           // Alojamento
  "56": "servicos",           // Alimentação
  "68": "servicos",           // Atividades imobiliárias
  "69": "servicos",           // Atividades jurídicas, de contabilidade
  "70": "servicos",           // Atividades de sedes de empresas
  "71": "servicos",           // Serviços de arquitetura e engenharia
  "72": "servicos",           // Pesquisa e desenvolvimento científico
  "73": "servicos",           // Publicidade e pesquisa de mercado
  "74": "servicos",           // Outras atividades profissionais
  "75": "servicos",           // Atividades veterinárias
  "77": "servicos",           // Aluguéis não-imobiliários
  "78": "servicos",           // Seleção, agenciamento, locação de mão-de-obra
  "79": "servicos",           // Agências de viagens
  "80": "servicos",           // Atividades de vigilância, segurança
  "81": "servicos",           // Serviços para edifícios e atividades paisagísticas
  "82": "servicos",           // Serviços de escritório
  "90": "servicos",           // Atividades artísticas, criativas e espetáculos
  "91": "servicos",           // Atividades ligadas ao patrimônio cultural
  "92": "servicos",           // Atividades de exploração de jogos
  "93": "servicos",           // Atividades esportivas e de recreação
  "94": "servicos",           // Atividades de organizações associativas
  "95": "servicos",           // Reparação e manutenção
  "96": "servicos",           // Outras atividades de serviços pessoais
  "97": "servicos",           // Serviços domésticos
  "99": "servicos"            // Organismos internacionais
};

// Função para mapear um CNAE para um segmento de negócio
export const mapCnaeToSegment = (cnae: string): string => {
  // Pega apenas os primeiros dígitos do CNAE (excluindo pontos e traços)
  const sanitizedCnae = cnae.replace(/\D/g, '');
  const firstTwoDigits = sanitizedCnae.substring(0, 2);
  
  // Busca no mapeamento
  const segmentId = cnaeToSegmentMap[firstTwoDigits];
  
  // Retorna o segmento encontrado ou o padrão 'servicos'
  return segmentId || 'servicos';
};
