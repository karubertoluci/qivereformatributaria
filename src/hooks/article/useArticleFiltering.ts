
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
  // Não filtra por segmento para mostrar todos os artigos
  const relevantArticles = segmentArticles && segmentArticles.length > 0 
    ? segmentArticles 
    : articles;
  
  // Apply filtering based on search term and filter type
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      
      // Se não houver impactos, manter o artigo visível
      if (!article.impacts || article.impacts.length === 0) return true;
      
      return article.impacts.some(
        impact => impact.type === filterType
      );
    });
  
  // Calculate impact counts for the distribution charts
  const positiveCount = filteredArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive')
  ).length;
  
  const negativeCount = filteredArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative')
  ).length;
  
  const neutralCount = filteredArticles.length - positiveCount - negativeCount;
  
  // Apply the relevance distribution: 
  // 40% Irrelevante, 10% Pouco relevante, 40% Moderadamente relevante, 10% Muito relevante
  const totalCount = filteredArticles.length;
  const irrelevantCount = Math.round(totalCount * 0.4);       // 40% irrelevant
  const slightlyRelevantCount = Math.round(totalCount * 0.1); // 10% slightly relevant
  const moderatelyRelevantCount = Math.round(totalCount * 0.4); // 40% moderately relevant
  const highlyRelevantCount = Math.round(totalCount * 0.1);   // 10% highly relevant
  
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
    neutralCount,
    irrelevantCount,
    slightlyRelevantCount,
    moderatelyRelevantCount,
    highlyRelevantCount
  };
};
