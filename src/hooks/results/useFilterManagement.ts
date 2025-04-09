
import { useState, useMemo } from 'react';
import { Article } from '@/data/articles';

export type FilterType = 'all' | 'positive' | 'negative' | 'neutral';
export type ViewMode = 'chart' | 'table';

export const useFilterManagement = (relevantArticles: Article[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');

  // Filter articles based on search term and filter type
  const filteredArticles = useMemo(() => {
    return relevantArticles
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(article => {
        if (filterType === 'all') return true;
        
        return article.impacts.some(impact => {
          // Map the filter type to the impact type in the article
          if (filterType === 'positive') return impact.type === 'positive';
          if (filterType === 'negative') return impact.type === 'negative';
          if (filterType === 'neutral') return impact.type === 'neutral';
          return true;
        });
      });
  }, [relevantArticles, searchTerm, filterType]);

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
    filteredArticles
  };
};
