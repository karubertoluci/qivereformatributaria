
// If this file doesn't exist, we'll create it with proper type definitions
export interface CNAEData {
  codigo: string;
  descricao: string;
}

export interface CompanyApiData {
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  cnae_fiscal?: number;
  cnae_fiscal_descricao?: string;
  cnaes_secundarios?: Array<CNAEData>;
  situacao_cadastral?: string;
  data_situacao_cadastral?: string;
  natureza_juridica?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  uf?: string;
  municipio?: string;
  ddd_telefone_1?: string;
  capital_social?: number;
  porte?: string;
  // For alternate naming conventions
  razaoSocial?: string;
  nomeFantasia?: string;
  cnaePrincipal?: CNAEData;
  cnaeSecundarios?: Array<CNAEData>;
  situacaoCadastral?: string;
  dataSituacaoCadastral?: string;
  naturezaJuridica?: string;
  endereco?: string;
  capitalSocial?: number;
  telefone?: string;
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
  companyData?: CompanyApiData;
  // Including necessary properties that will be accessed directly
  nomeFantasia?: string;
  razaoSocial?: string;
  cnaeSecundarios?: Array<CNAEData>;
  cnpj?: string;
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
