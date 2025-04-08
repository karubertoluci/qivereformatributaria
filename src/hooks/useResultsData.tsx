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
  
  useEffect(() => {
    const fetchArticlesFromSupabase = async () => {
      setIsLoading(true);
      
      try {
        const cachedArticles = localStorage.getItem('segmentArticles');
        if (cachedArticles) {
          setSegmentArticles(JSON.parse(cachedArticles));
          setIsLoading(false);
          return;
        }
        
        console.log('Buscando artigos do Supabase para o segmento:', segment.id);
        
        const { data: impactos, error: impactosError } = await supabase
          .from('impactos')
          .select('*')
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
        
        const artigoIds = impactos.map(impacto => impacto.artigo_id);
        
        const { data: artigos, error: artigosError } = await supabase
          .from('artigos')
          .select('*')
          .in('id', artigoIds);
          
        if (artigosError) {
          console.error('Erro ao buscar artigos:', artigosError);
          setIsLoading(false);
          return;
        }
        
        if (artigos) {
          const formattedArticles = artigos.map(artigo => {
            const artigoImpactos = impactos
              .filter(impacto => impacto.artigo_id === artigo.id)
              .map(impacto => ({
                type: impacto.tipo,
                description: impacto.descricao,
                relevance: impacto.relevancia,
                segments: [segment.id]
              }));
            
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
  
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const hasCompanyData = Object.keys(formData).length > 0;
  
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
      setViewMode('list');
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
