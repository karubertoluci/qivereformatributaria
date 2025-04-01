
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: 'all' | 'positive' | 'negative';
  setFilterType: (type: 'all' | 'positive' | 'negative') => void;
  positiveCount: number;
  negativeCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  positiveCount,
  negativeCount
}) => {
  return (
    <>
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          className="pl-10 pr-4"
          placeholder="Pesquisar artigos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Badge variant="outline" className={`${filterType === 'positive' ? 'bg-positive text-positive-foreground' : 'bg-secondary'} cursor-pointer px-3 py-1`} onClick={() => setFilterType(filterType === 'positive' ? 'all' : 'positive')}>
          <ArrowUp className="h-4 w-4 mr-1" /> Positivos ({positiveCount})
        </Badge>
        <Badge variant="outline" className={`${filterType === 'negative' ? 'bg-negative text-negative-foreground' : 'bg-secondary'} cursor-pointer px-3 py-1`} onClick={() => setFilterType(filterType === 'negative' ? 'all' : 'negative')}>
          <ArrowDown className="h-4 w-4 mr-1" /> Negativos ({negativeCount})
        </Badge>
      </div>
    </>
  );
};

export default FilterBar;
