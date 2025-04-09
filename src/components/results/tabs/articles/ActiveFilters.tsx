
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface ActiveFiltersProps {
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  relevanceFilter?: string | null;
  bookName: string;
  titleName: string;
  onClearBookFilter: () => void;
  onClearTitleFilter: () => void;
  onClearRelevanceFilter?: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedBookFilter,
  selectedTitleFilter,
  relevanceFilter,
  bookName,
  titleName,
  onClearBookFilter,
  onClearTitleFilter,
  onClearRelevanceFilter
}) => {
  // If there are no active filters, return null
  if (!selectedBookFilter && !selectedTitleFilter && !relevanceFilter) {
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
          <Filter className="h-3 w-3 mr-1" />
          {bookName}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
      
      {selectedTitleFilter && (
        <Badge 
          variant="outline" 
          className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
          onClick={onClearTitleFilter}
        >
          <Filter className="h-3 w-3 mr-1" />
          Título: {titleName.length > 30 ? titleName.substring(0, 30) + '...' : titleName}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
      
      {relevanceFilter && onClearRelevanceFilter && (
        <Badge 
          variant="outline" 
          className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
          onClick={onClearRelevanceFilter}
        >
          <Filter className="h-3 w-3 mr-1" />
          Relevância: {relevanceFilter}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
