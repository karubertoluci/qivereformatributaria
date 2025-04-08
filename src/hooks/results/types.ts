
import { Article } from '@/data/articles';
import { Topic, HighlightType, FilterType, ViewMode } from '@/components/results/types';

export interface CompanyData {
  nome?: string;
  cargo?: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios?: {
    codigo: string;
    descricao: string;
  }[];
  situacaoCadastral?: string;
  dataSituacaoCadastral?: string;
  naturezaJuridica?: string;
  capitalSocial?: number;
  porte?: string;
  telefone?: string;
  original?: any; // Dados originais da API
}

export interface ResultsData {
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: 'overview' | 'articles' | 'highlights';
  setActiveTab: (tab: 'overview' | 'articles' | 'highlights') => void;
  formData: CompanyData | null;
  hasCompanyData: boolean;
  relevantArticles: Article[];
  filteredArticles: Article[];
  articlesByTopic: Record<string, Article[]>;
  positiveCount: number;
  negativeCount: number;
  handleArticleSelect: (articleId: string) => void;
  topics: Topic[];
  isLoading: boolean;
  error: string | null;
  highlights: HighlightType[];
  setHighlights: (highlights: HighlightType[]) => void;
  handleAddHighlight: (articleId: string, text: string, color?: HighlightType['color']) => void;
  handleRemoveHighlight: (id: string) => void;
}
