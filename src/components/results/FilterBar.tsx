
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterBarProps {
  positiveCount: number;
  negativeCount: number;
  totalCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: 'all' | 'positive' | 'negative';
  setFilterType: (type: 'all' | 'positive' | 'negative') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  positiveCount,
  negativeCount,
  totalCount,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="flex gap-1.5">
        <Button
          size="sm"
          variant={filterType === 'all' ? "default" : "outline"}
          onClick={() => setFilterType('all')}
          className="text-xs whitespace-nowrap"
        >
          Todos ({totalCount})
        </Button>
        <Button
          size="sm"
          variant={filterType === 'positive' ? "default" : "outline"}
          onClick={() => setFilterType('positive')}
          className="text-xs whitespace-nowrap"
        >
          Positivos ({positiveCount})
        </Button>
        <Button
          size="sm"
          variant={filterType === 'negative' ? "default" : "outline"}
          onClick={() => setFilterType('negative')}
          className="text-xs whitespace-nowrap"
        >
          Negativos ({negativeCount})
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
