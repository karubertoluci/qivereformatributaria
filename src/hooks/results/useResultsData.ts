
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { getArticlesByTopic } from '@/components/results/ArticlesByTopic';
import { topics } from '@/components/results/ArticlesByTopic';
import { FilterType, ViewMode } from '@/components/results/types';
import { useArticleData } from '@/hooks/article';
import { useCompanyData } from './useCompanyData';
import { useHighlightsManagement } from './useHighlightsManagement';
import { ResultsData } from './types';

export const useResultsData = (segment: BusinessSegment): ResultsData => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'highlights'>('overview');
  const [error, setError] = useState<string | null>(null);
  
  // Use the company data hook
  const { formData, hasCompanyData } = useCompanyData();
  
  // Use the highlights management hook
  const { highlights, setHighlights, handleAddHighlight, handleRemoveHighlight } = useHighlightsManagement();
  
  // Use the article data hook to fetch articles from Supabase
  const { segmentArticles, isLoading, error: fetchError } = useArticleData(segment);
  
  // Set error state from fetch error
  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchError]);
  
  const relevantArticles = segmentArticles.length > 0 
    ? segmentArticles 
    : [];
  
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
