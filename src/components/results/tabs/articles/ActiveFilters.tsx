
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Book, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

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
      {selectedBookFilter && selectedBookFilter !== 'all' && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 px-2 py-1"
        >
          <Book className="h-3.5 w-3.5 mr-1" />
          Filtrando por Livro: {bookName}
          <X 
            className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
            onClick={() => {
              onClearBookFilter();
              toast.info("Filtro de livro removido");
            }}
          />
        </Badge>
      )}
      
      {selectedTitleFilter && selectedTitleFilter !== 'all' && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 px-2 py-1"
        >
          <FileText className="h-3.5 w-3.5 mr-1" />
          Filtrando por Título: {titleName}
          <X 
            className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
            onClick={() => {
              onClearTitleFilter();
              toast.info("Filtro de título removido");
            }}
          />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
