
import React from 'react';
import FilterBar from '../../FilterBar';
import ViewSwitcher from '../../ViewSwitcher';

interface ArticlesFiltersProps {
  positiveCount: number;
  negativeCount: number;
  totalCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: 'all' | 'positive' | 'negative';
  setFilterType: (type: 'all' | 'positive' | 'negative') => void;
  viewMode: 'list' | 'table' | 'chart';
  setViewMode: (mode: 'list' | 'table' | 'chart') => void;
}

const ArticlesFilters: React.FC<ArticlesFiltersProps> = ({
  positiveCount,
  negativeCount,
  totalCount,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <FilterBar 
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        totalCount={totalCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      
      <ViewSwitcher 
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
};

export default ArticlesFilters;
