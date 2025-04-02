
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

export const fetchCNPJData = async (cnpj: string): Promise<CNPJResponse> => {
  try {
    // Remove caracteres não numéricos do CNPJ
    const formattedCNPJ = cnpj.replace(/\D/g, '');
    
    if (formattedCNPJ.length !== 14) {
      throw new Error('CNPJ inválido: deve conter 14 dígitos');
    }

    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${formattedCNPJ}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erro ao consultar CNPJ: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do CNPJ:', error);
    throw error;
  }
};
