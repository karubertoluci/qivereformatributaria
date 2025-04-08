
import React from 'react';
import FilterBar from '../../../FilterBar';
import { FilterType } from '../../../types';
import { Article } from '@/data/articles';
import { URLSearchParams } from 'react-router-dom';

interface ArticlesFiltersProps {
  articles: Article[];
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  setSelectedTitleFilter: (titleId: string | null) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const ArticlesFilters: React.FC<ArticlesFiltersProps> = ({
  articles,
  selectedBookFilter,
  selectedTitleFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  searchParams,
  setSearchParams
}) => {
  // Calculate counts
  const positiveCount = articles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive')
  ).length;
  
  const negativeCount = articles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative')
  ).length;
  
  const neutralCount = articles.filter(article => 
    article.impacts.some(impact => impact.type === 'neutral')
  ).length;
  
  const totalCount = articles.length;

  // These props are currently not used in this component but would be needed
  // for a complete implementation
  const searchTerm = '';
  const setSearchTerm = () => {};
  const filterType = 'all' as FilterType;
  const setFilterType = () => {};

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <FilterBar 
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
        totalCount={totalCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </div>
  );
};

export default ArticlesFilters;
