import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';
import { getArticlesByTopic } from '@/components/results/ArticlesByTopic';
import { topics } from '@/components/results/ArticlesByTopic';
import { HighlightType, FilterType, ViewMode } from '@/components/results/types';
import { useArticleData } from './article';
import { useArticleFiltering } from './article';
import { useTopics } from './article';

export const useResultsData = (segment: BusinessSegment) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'highlights'>('overview');
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CompanyData | null>(null);
  
  // Use the article data hook to fetch articles from Supabase
  const { segmentArticles, isLoading, error: fetchError } = useArticleData(segment);
  
  // Set error state from fetch error
  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchError]);
  
  // Carregar os dados da empresa do localStorage
  useEffect(() => {
    try {
      // First try to load from companyData (from API)
      const companyDataStr = localStorage.getItem('companyData');
      if (companyDataStr) {
        const companyData = JSON.parse(companyDataStr);
        console.log('Dados da empresa carregados:', companyData);
        
        // Format the data to ensure consistency
        const formattedData: CompanyData = {
          cnpj: companyData.cnpj,
          razaoSocial: companyData.razaoSocial || companyData.razao_social,
          nomeFantasia: companyData.nomeFantasia || companyData.nome_fantasia || companyData.razaoSocial || companyData.razao_social,
          endereco: companyData.endereco,
          cnaePrincipal: companyData.cnaePrincipal || {
            codigo: companyData.cnae_fiscal?.toString() || '',
            descricao: companyData.cnae_fiscal_descricao || ''
          },
          cnaeSecundarios: companyData.cnaeSecundarios || companyData.cnaes_secundarios || [],
          situacaoCadastral: companyData.situacaoCadastral || companyData.situacao_cadastral,
          dataSituacaoCadastral: companyData.dataSituacaoCadastral || companyData.data_situacao_cadastral,
          naturezaJuridica: companyData.naturezaJuridica || companyData.natureza_juridica,
          capitalSocial: companyData.capitalSocial || companyData.capital_social,
          porte: companyData.porte,
          telefone: companyData.telefone || companyData.ddd_telefone_1,
          original: companyData.original || companyData
        };
        
        setFormData(formattedData);
        
        // Set company name in localStorage for easy access by other components
        localStorage.setItem('companyName', formattedData.razaoSocial || '');
      } else {
        // Fallback to formData for backwards compatibility
        const formDataStr = localStorage.getItem('formData');
        if (formDataStr) {
          const formDataObj = JSON.parse(formDataStr);
          setFormData(formDataObj);
          console.log('Dados do formulário carregados:', formDataObj);
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados da empresa do localStorage:', e);
    }
  }, []);
  
  useEffect(() => {
    const savedHighlights = localStorage.getItem('highlights');
    if (savedHighlights) {
      try {
        setHighlights(JSON.parse(savedHighlights));
      } catch (e) {
        console.error('Failed to parse highlights from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('highlights', JSON.stringify(highlights));
  }, [highlights]);
  
  const hasCompanyData = formData !== null;
  
  const relevantArticles = segmentArticles.length > 0 
    ? segmentArticles 
    : articles.filter(article => 
        article.impacts.some(impact => impact.segments.includes(segment.id))
      );
  
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      return article.impacts.some(
        impact => impact.type === filterType && impact.segments.includes(segment.id)
      );
    });
  
  const articlesByTopic = getArticlesByTopic(filteredArticles);

  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    
    if (viewMode === 'chart') {
      // No need to change view mode since it's already 'chart'
      setTimeout(() => {
        const element = document.getElementById(`article-${articleId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleAddHighlight = (articleId: string, text: string, color: HighlightType['color'] = 'yellow') => {
    const newHighlight: HighlightType = {
      id: crypto.randomUUID(),
      text,
      color,
      articleId
    };
    setHighlights([...highlights, newHighlight]);
  };

  const handleRemoveHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };

  return {
    expandedArticleId,
    setExpandedArticleId,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    formData,
    hasCompanyData,
    relevantArticles,
    filteredArticles,
    articlesByTopic,
    positiveCount,
    negativeCount,
    handleArticleSelect,
    topics,
    isLoading,
    error,
    highlights,
    setHighlights,
    handleAddHighlight,
    handleRemoveHighlight
  };
};

export type CompanyData = {
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
};
