
import { useState } from 'react';
import { Article } from '@/data/articles';
import { FilterType, ViewMode } from '@/components/results/types';
import { articles } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';

export const useArticleFiltering = (
  segmentArticles: Article[], 
  isLoading: boolean, 
  segment: BusinessSegment
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  
  // Use segmentArticles if available, otherwise fallback to static articles
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
  
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
    expandedArticleId,
    setExpandedArticleId,
    relevantArticles,
    filteredArticles,
    positiveCount,
    negativeCount
  };
};
