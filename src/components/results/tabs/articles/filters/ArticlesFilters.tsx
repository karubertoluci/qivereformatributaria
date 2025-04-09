
import React from 'react';
import FilterBar from '@/components/results/FilterBar';
import ViewSwitcher from '@/components/results/ViewSwitcher';
import { FilterType, ViewMode } from '@/components/results/types';

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
  selectedBookFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  selectedTitleFilter: string | null;
  setSelectedTitleFilter: (titleId: string | null) => void;
  books: string[];
  titles: string[];
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
  setViewMode,
  selectedBookFilter,
  setSelectedBookFilter,
  selectedTitleFilter,
  setSelectedTitleFilter,
  books,
  titles
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
