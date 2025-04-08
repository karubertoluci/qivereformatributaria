
import { useState } from 'react';
import { FilterType, ViewMode } from '@/components/results/types';
import { Article } from '@/data/articles';

export const useFilterManagement = (relevantArticles: Article[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');

  // Apply filters to articles
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      return article.impacts.some(
        impact => impact.type === filterType
      );
    });

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
