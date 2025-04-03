
import React from 'react';
import FilterBar from '../../FilterBar';
import ViewSwitcher from '../../ViewSwitcher';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
  isCompactView: boolean;
  setIsCompactView: (isCompact: boolean) => void;
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
  setViewMode,
  isCompactView,
  setIsCompactView
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap justify-between items-center">
        <h3 className="text-xl font-semibold text-[#F97316] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-[#F97316]">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
            <line x1="10" x2="8" y1="9" y2="9"/>
          </svg>
          Artigos da Reforma
        
          <div className="relative ml-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar artigos..."
              className="pl-8 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <FilterBar 
          positiveCount={positiveCount}
          negativeCount={negativeCount}
          totalCount={totalCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          hideSearch={true}
        />
        
        <ViewSwitcher 
          viewMode={viewMode}
          setViewMode={setViewMode}
          isCompactView={isCompactView}
          setIsCompactView={setIsCompactView}
        />
      </div>
    </div>
  );
};

export default ArticlesFilters;
