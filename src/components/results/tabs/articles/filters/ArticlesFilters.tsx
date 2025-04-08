
import React from 'react';
import FilterBar from '../../../FilterBar';
import { FilterType } from '../../../types';
import { Article } from '@/data/articles';

interface ArticlesFiltersProps {
  positiveCount: number;
  negativeCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  selectedBookFilter: string;
  setSelectedBookFilter: (bookId: string) => void;
  selectedTitleFilter: string;
  setSelectedTitleFilter: (titleId: string) => void;
  relevantArticles: Article[];
}

const ArticlesFilters: React.FC<ArticlesFiltersProps> = ({
  positiveCount,
  negativeCount,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  selectedBookFilter,
  setSelectedBookFilter,
  selectedTitleFilter,
  setSelectedTitleFilter,
  relevantArticles
}) => {
  // Calculate neutral count
  const neutralCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'neutral')
  ).length;
  
  const totalCount = relevantArticles.length;

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
