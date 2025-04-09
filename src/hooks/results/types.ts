// If this file doesn't exist, we'll create it with proper type definitions
export interface CNAEData {
  codigo: string;
  descricao: string;
}

export interface CompanyApiData {
  cnpj?: string;
  razaoSocial?: string;
  razao_social?: string;
  nomeFantasia?: string;
  nome_fantasia?: string;
  endereco?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  situacaoCadastral?: string;
  situacao_cadastral?: string;
  dataSituacaoCadastral?: string;
  data_situacao_cadastral?: string;
  naturezaJuridica?: string;
  natureza_juridica?: string;
  capitalSocial?: number;
  capital_social?: number;
  porte?: string;
  telefone?: string;
  ddd_telefone_1?: string;
  cnae_fiscal?: number;
  cnae_fiscal_descricao?: string;
  cnaePrincipal?: CNAEData;
  cnaeSecundarios?: CNAEData[];
  cnaes_secundarios?: CNAEData[];
}

export interface PersonalData {
  nome: string;
  cargo: string;
  email: string;
  telefone?: string;
  cnpj: string;
  possuiContaQive: boolean;
}

export interface CompanyData {
  nome?: string;
  cargo?: string;
  email?: string;
  telefone?: string;
  cnpj?: string;
  possuiContaQive?: boolean;
  companyData?: CompanyApiData;
}

// Adding these type definitions that were missing
export type FilterType = 'all' | 'positive' | 'negative' | 'neutral';
export type ViewMode = 'chart' | 'table';

// ResultsData interface used by components that display the report
export interface ResultsData {
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  formData: CompanyData | null;
  hasCompanyData: boolean;
  relevantArticles: any[];
  filteredArticles: any[];
  articlesByTopic: any;
  positiveCount: number;
  negativeCount: number;
  handleArticleSelect: (id: string) => void;
  topics: any[];
  isLoading: boolean;
  error: string | null;
  highlights: any[];
  setHighlights: (highlights: any[]) => void;
  handleAddHighlight: (articleId: string, text: string, color?: string) => void;
  handleRemoveHighlight: (id: string) => void;
}
