
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { getArticlesByTopic, topics } from '@/components/results/ArticlesByTopic';
import { HighlightType, FilterType, ViewMode } from '@/components/results/types';
import { useArticleData } from './article';
import { useCompanyData } from './results/useCompanyData';

export const useResultsData = (segment: BusinessSegment) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'highlights'>('overview');
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Use the company data hook to access company information
  const { formData, hasCompanyData } = useCompanyData();
  
  // Use the article data hook to fetch articles from Supabase
  const { segmentArticles, isLoading, error: fetchError } = useArticleData(segment);
  
  // Set error state from fetch error
  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchError]);
  
  // Carregar destaques do localStorage
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

  // Salvar destaques no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('highlights', JSON.stringify(highlights));
  }, [highlights]);
  
  // Use all articles without filtering by segment
  const relevantArticles = segmentArticles.length > 0 
    ? segmentArticles 
    : [];
  
  // Filter by search term only, not by segment
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      return article.impacts.some(impact => impact.type === filterType);
    });
  
  const articlesByTopic = getArticlesByTopic(filteredArticles);

  // Count impacts without segment filtering
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive')
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative')
  ).length;
  
  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    
    if (viewMode === 'chart') {
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
