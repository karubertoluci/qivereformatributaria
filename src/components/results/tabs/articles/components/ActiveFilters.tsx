
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface ActiveFiltersProps {
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  onClearBookFilter: () => void;
  onClearTitleFilter: () => void;
  bookName: string;
  titleName: string;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedBookFilter,
  selectedTitleFilter,
  onClearBookFilter,
  onClearTitleFilter,
  bookName,
  titleName
}) => {
  if (!selectedBookFilter && !selectedTitleFilter) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedBookFilter && (
        <Badge 
          variant="outline" 
          className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
          onClick={onClearBookFilter}
        >
          <Filter className="h-3 w-3" />
          Livro: {bookName}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
      
      {selectedTitleFilter && (
        <Badge 
          variant="outline" 
          className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
          onClick={onClearTitleFilter}
        >
          <Filter className="h-3 w-3" />
          Título: {titleName}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
