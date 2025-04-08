
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';
import { getArticlesByTopic } from '@/components/results/ArticlesByTopic';
import { topics } from '@/components/results/ArticlesByTopic';
import { CommentType, HighlightType, FilterType, ViewMode } from '@/components/results/types';
import { supabase } from '@/integrations/supabase/client';

export const useResultsData = (segment: BusinessSegment) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles'>('overview');
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  const [segmentArticles, setSegmentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Função para buscar artigos do Supabase
  useEffect(() => {
    const fetchArticlesFromSupabase = async () => {
      setIsLoading(true);
      
      try {
        // Primeiro tentamos carregar dados do localStorage (previamente buscados)
        const cachedArticles = localStorage.getItem('segmentArticles');
        if (cachedArticles) {
          setSegmentArticles(JSON.parse(cachedArticles));
          setIsLoading(false);
          return;
        }
        
        // Se não houver cache, buscar do Supabase
        console.log('Buscando artigos do Supabase para o segmento:', segment.id);
        
        // Buscar impactos para o segmento
        const { data: impactos, error: impactosError } = await supabase
          .from('impactos')
          .select('artigo_id, tipo, descricao, relevancia')
          .eq('segmento_id', segment.id);
          
        if (impactosError) {
          console.error('Erro ao buscar impactos:', impactosError);
          setIsLoading(false);
          return;
        }
        
        if (!impactos || impactos.length === 0) {
          console.log('Nenhum impacto encontrado para o segmento:', segment.id);
          setIsLoading(false);
          return;
        }
        
        // Obter IDs dos artigos a partir dos impactos
        const artigoIds = impactos.map(impacto => impacto.artigo_id);
        
        // Buscar os artigos
        const { data: artigos, error: artigosError } = await supabase
          .from('artigos')
          .select('id, numero, texto, texto_simplificado, capitulo_id, secao_id, subsecao_id')
          .in('id', artigoIds);
          
        if (artigosError) {
          console.error('Erro ao buscar artigos:', artigosError);
          setIsLoading(false);
          return;
        }
        
        // Transformar os resultados do Supabase no formato esperado pelo aplicativo
        if (artigos) {
          const formattedArticles = artigos.map(artigo => {
            // Obter os impactos relacionados a este artigo
            const artigoImpactos = impactos
              .filter(impacto => impacto.artigo_id === artigo.id)
              .map(impacto => ({
                type: impacto.tipo,
                description: impacto.descricao,
                relevance: impacto.relevancia,
                segments: [segment.id]
              }));
            
            // Criar o objeto de artigo no formato esperado pelo app
            return {
              id: `art_${artigo.id}`,
              number: artigo.numero.toString(),
              title: `Artigo ${artigo.numero}`,
              originalText: artigo.texto,
              simplifiedText: artigo.texto_simplificado || artigo.texto,
              impacts: artigoImpactos,
              metadata: {
                capituloId: artigo.capitulo_id,
                secaoId: artigo.secao_id,
                subsecaoId: artigo.subsecao_id
              }
            };
          });
          
          setSegmentArticles(formattedArticles);
          
          // Salvar no localStorage para uso futuro
          localStorage.setItem('segmentArticles', JSON.stringify(formattedArticles));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Supabase:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticlesFromSupabase();
  }, [segment.id]);
  
  // Load highlights from localStorage on mount
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

  // Save highlights to localStorage on change
  useEffect(() => {
    localStorage.setItem('highlights', JSON.stringify(highlights));
  }, [highlights]);
  
  // Get form data from localStorage
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const hasCompanyData = Object.keys(formData).length > 0;
  
  // Use segmentArticles when available, otherwise use the mock articles from data/articles.ts
  const relevantArticles = segmentArticles.length > 0 
    ? segmentArticles 
    : articles.filter(article => 
        article.impacts.some(impact => impact.segments.includes(segment.id))
      );
  
  // Apply search and impact type filters
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
  
  // Organize articles by topic
  const articlesByTopic = getArticlesByTopic(filteredArticles);

  // Count positive and negative impacts
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    
    // Scroll to the article if in list view
    if (viewMode === 'chart') {
      setViewMode('list');
      // Give time for the view to switch before scrolling
      setTimeout(() => {
        const element = document.getElementById(`article-${articleId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Handle adding a highlight
  const handleAddHighlight = (articleId: string, text: string, color: HighlightType['color'] = 'yellow') => {
    const newHighlight: HighlightType = {
      id: crypto.randomUUID(),
      text,
      color,
      articleId
    };
    setHighlights([...highlights, newHighlight]);
  };

  // Handle removing a highlight
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
    // Highlight-related state and functions
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
  naturezaJuridica?: string;
};
