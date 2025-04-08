
import { BusinessSegment } from '@/data/segments';
import { useArticleData } from '@/hooks/article';
import { useCompanyData } from './useCompanyData';
import { useHighlightsManagement } from './useHighlightsManagement';
import { useTabManagement } from './useTabManagement';
import { useFilterManagement } from './useFilterManagement';
import { useArticleStatistics } from './useArticleStatistics';
import { useErrorHandling } from './useErrorHandling';
import { ResultsData } from './types';

export const useResultsData = (segment: BusinessSegment): ResultsData => {
  // Use the article data hook to fetch articles from Supabase
  const { segmentArticles, isLoading, error: fetchError } = useArticleData(segment);
  
  // Use error handling
  const { error, setError } = useErrorHandling(fetchError);
  
  // Use the company data hook
  const { formData, hasCompanyData } = useCompanyData();
  
  // Use the highlights management hook
  const { highlights, setHighlights, handleAddHighlight, handleRemoveHighlight } = useHighlightsManagement();
  
  // Use tab management
  const { activeTab, setActiveTab, expandedArticleId, setExpandedArticleId, handleArticleSelect } = useTabManagement();
  
  // Get relevant articles
  const relevantArticles = segmentArticles.length > 0 
    ? segmentArticles 
    : [];
  
  // Use filter management
  const { 
    searchTerm, setSearchTerm, 
    filterType, setFilterType, 
    viewMode, setViewMode,
    filteredArticles 
  } = useFilterManagement(relevantArticles);
  
  // Use article statistics
  const { 
    positiveCount, 
    negativeCount,
    articlesByTopic,
    topics
  } = useArticleStatistics(filteredArticles, segment.id);

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
