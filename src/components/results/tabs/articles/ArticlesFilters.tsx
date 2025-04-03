
import React from 'react';
import FilterBar from '../../FilterBar';
import ViewSwitcher from '../../ViewSwitcher';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Rows } from 'lucide-react';

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
      
      <div className="flex items-center gap-2">
        {viewMode === 'list' && (
          <div className="border rounded-md flex overflow-hidden mr-2">
            <Button 
              variant={isCompactView ? "ghost" : "secondary"}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setIsCompactView(false)}
            >
              <Rows size={16} />
            </Button>
            <Button 
              variant={isCompactView ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setIsCompactView(true)}
            >
              <LayoutGrid size={16} />
            </Button>
          </div>
        )}
        
        <ViewSwitcher 
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
};

export default ArticlesFilters;
