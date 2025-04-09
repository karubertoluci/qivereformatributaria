
import { useState, useMemo } from 'react';
import { Article } from '@/data/articles';
import { FilterType, ViewMode } from './types';

export const useFilterManagement = (relevantArticles: Article[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');

  // Filter articles based only on search term, without segment filtering
  const filteredArticles = useMemo(() => {
    return relevantArticles
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(article => {
        if (filterType === 'all') return true;
        
        // Se não houver impactos, manter o artigo visível
        if (!article.impacts || article.impacts.length === 0) return true;
        
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
