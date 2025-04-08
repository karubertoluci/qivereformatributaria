
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
  
  // Apply the desired distribution: 40% positive, 20% neutral, 30% negative
  const totalCount = relevantArticles.length;
  const positiveCount = Math.round(totalCount * 0.4); // 40% favorable
  const neutralCount = Math.round(totalCount * 0.2);  // 20% neutral
  const negativeCount = Math.round(totalCount * 0.3); // 30% unfavorable
  
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
    negativeCount,
    neutralCount
  };
};
