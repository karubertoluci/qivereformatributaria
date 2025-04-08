
import React from 'react';
import FilterBar from '../../FilterBar';
import ViewSwitcher from '../../ViewSwitcher';
import { FilterType, ViewMode } from '../../types';

interface ArticlesFiltersProps {
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  totalCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ArticlesFilters: React.FC<ArticlesFiltersProps> = ({
  positiveCount,
  negativeCount,
  neutralCount,
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
        neutralCount={neutralCount}
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
