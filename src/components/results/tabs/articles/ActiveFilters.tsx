
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Book, ListFilter, X } from 'lucide-react';
import { toast } from 'sonner';

interface ActiveFiltersProps {
  selectedBookFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  showAllArticles: boolean;
  setShowAllArticles: (show: boolean) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedBookFilter,
  setSelectedBookFilter,
  showAllArticles,
  setShowAllArticles
}) => {
  if (!selectedBookFilter && !showAllArticles) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedBookFilter && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 px-2 py-1"
        >
          <Book className="h-3.5 w-3.5 mr-1" />
          Filtrando por Livro: {selectedBookFilter}
          <X 
            className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
            onClick={() => {
              setSelectedBookFilter(null);
              toast.info("Filtro de livro removido");
            }}
          />
        </Badge>
      )}
      
      {showAllArticles && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 px-2 py-1"
        >
          <ListFilter className="h-3.5 w-3.5 mr-1" />
          Mostrando todos os 544 artigos
          <X 
            className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
            onClick={() => {
              setShowAllArticles(false);
              toast.info("Mostrando apenas artigos relevantes para seu segmento");
            }}
          />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
