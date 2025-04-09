
interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  cnaes_secundarios: {
    codigo: string;
    descricao: string;
  }[];
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  situacao_cadastral: string;
  data_situacao_cadastral: string;
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  municipio: string;
  ddd_telefone_1: string;
  capital_social: number;
  porte: string;
}

// Development mode - Force use of real API
const useMockData = false;
const mockCnpjData: Record<string, CNPJResponse> = {
  '42988955000149': {
    cnpj: '42.988.955/0001-49',
    razao_social: 'Karuan Tecnologia Ltda',
    nome_fantasia: 'Karuan',
    cnaes_secundarios: [
      { codigo: '62.02-3', descricao: 'Desenvolvimento e licenciamento de programas de computador customizáveis' },
      { codigo: '62.04-0', descricao: 'Consultoria em tecnologia da informação' }
    ],
    cnae_fiscal: 6201500,
    cnae_fiscal_descricao: 'Desenvolvimento de programas de computador sob encomenda',
    situacao_cadastral: 'ATIVA',
    data_situacao_cadastral: '13/08/2021',
    natureza_juridica: 'Sociedade Empresária Limitada',
    logradouro: 'Avenida Paulista',
    numero: '1000',
    complemento: 'Sala 401',
    bairro: 'Bela Vista',
    cep: '01310-100',
    uf: 'SP',
    municipio: 'São Paulo',
    ddd_telefone_1: '1140028922',
    capital_social: 100000,
    porte: 'DEMAIS'
  },
  '80848797000110': {
    cnpj: '80.848.797/0001-10',
    razao_social: 'Qive Comercial Ltda',
    nome_fantasia: 'Qive Varejo',
    cnaes_secundarios: [
      { codigo: '47.61-0', descricao: 'Comércio varejista de livros, jornais, revistas e papelaria' },
      { codigo: '47.63-6', descricao: 'Comércio varejista de artigos recreativos e esportivos' }
    ],
    cnae_fiscal: 4711302,
    cnae_fiscal_descricao: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados',
    situacao_cadastral: 'ATIVA',
    data_situacao_cadastral: '10/05/2010',
    natureza_juridica: 'Sociedade Empresária Limitada',
    logradouro: 'Rua do Comércio',
    numero: '123',
    complemento: '',
    bairro: 'Centro',
    cep: '88010-000',
    uf: 'SC',
    municipio: 'Florianópolis',
    ddd_telefone_1: '4833335555',
    capital_social: 500000,
    porte: 'DEMAIS'
  },
  '53821808000104': {
    cnpj: '53.821.808/0001-04',
    razao_social: 'TechBR Soluções em Tecnologia S.A.',
    nome_fantasia: 'TechBR',
    cnaes_secundarios: [
      { codigo: '62.03-1', descricao: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis' },
      { codigo: '62.09-1', descricao: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação' }
    ],
    cnae_fiscal: 6201500,
    cnae_fiscal_descricao: 'Desenvolvimento de programas de computador sob encomenda',
    situacao_cadastral: 'ATIVA',
    data_situacao_cadastral: '05/01/2015',
    natureza_juridica: 'Sociedade Anônima Fechada',
    logradouro: 'Rua da Tecnologia',
    numero: '500',
    complemento: 'Andar 15',
    bairro: 'Tecnópolis',
    cep: '04571-010',
    uf: 'SP',
    municipio: 'São Paulo',
    ddd_telefone_1: '1135557777',
    capital_social: 5000000,
    porte: 'DEMAIS'
  }
};

export const fetchCNPJData = async (cnpj: string): Promise<CNPJResponse> => {
  try {
    // Remove non-numeric characters from CNPJ
    const formattedCNPJ = cnpj.replace(/\D/g, '');
    
    if (formattedCNPJ.length !== 14) {
      throw new Error('CNPJ inválido: deve conter 14 dígitos');
    }

    console.log(`Buscando dados para o CNPJ: ${formattedCNPJ}`);

    // Call the real API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${formattedCNPJ}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`Erro na API: ${response.status}`);
        if (response.status === 429) {
          throw new Error('Limite de requisições atingido. Tente novamente mais tarde.');
        } else if (response.status === 404) {
          throw new Error('CNPJ não encontrado na base de dados.');
        } else if (response.status >= 500) {
          throw new Error('O serviço da Brasil API está instável no momento. Tente novamente mais tarde.');
        } else {
          throw new Error(`Erro na API: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('Resposta da API:', data);
      
      // Save to localStorage for later use
      localStorage.setItem('companyData', JSON.stringify(data));
      
      return data;
    } catch (apiError: any) {
      console.error('Requisição para API falhou:', apiError);
      
      // Handle specific error types
      if (apiError.name === 'AbortError') {
        throw new Error('A requisição demorou muito para responder. A Brasil API pode estar instável no momento.');
      }
      
      // If we're using mock data or if there's an error with the API
      if (useMockData) {
        // Try to find the CNPJ in our mock data
        const mockData = mockCnpjData[formattedCNPJ];
        if (mockData) {
          console.log('CNPJ encontrado nos dados simulados:', mockData);
          return mockData;
        }
        
        // If we don't find the specific CNPJ in our mocks, choose a random one
        const mockKeys = Object.keys(mockCnpjData);
        const randomMock = {...mockCnpjData[mockKeys[Math.floor(Math.random() * mockKeys.length)]]};
        
        // Customize the mock with the provided CNPJ
        randomMock.cnpj = formattedCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
        
        console.log('CNPJ não encontrado, usando dados simulados aleatórios:', randomMock);
        return randomMock;
      }
      
      // Format error message for user display
      const errorMessage = apiError.message || 'Erro ao buscar dados do CNPJ';
      if (errorMessage.includes('fetch') || errorMessage.includes('network') || 
          errorMessage.includes('Failed to fetch') || errorMessage.includes('ECONNREFUSED')) {
        throw new Error('Não foi possível conectar com a Brasil API. Verifique sua conexão ou tente novamente mais tarde.');
      }
      
      throw apiError;
    }
  } catch (error: any) {
    console.error('Erro ao buscar dados do CNPJ:', error);
    throw error; // Propagate the error to display in the component
  }
};
