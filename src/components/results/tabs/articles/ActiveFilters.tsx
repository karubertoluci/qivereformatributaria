
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Book, ListFilter, X, Gauge } from 'lucide-react';
import { toast } from 'sonner';

interface ActiveFiltersProps {
  selectedBookFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  showAllArticles: boolean;
  setShowAllArticles: (show: boolean) => void;
  selectedRelevanceFilter?: string | null;
  setSelectedRelevanceFilter?: (relevance: string | null) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedBookFilter,
  setSelectedBookFilter,
  showAllArticles,
  setShowAllArticles,
  selectedRelevanceFilter,
  setSelectedRelevanceFilter
}) => {
  if (!selectedBookFilter && !showAllArticles && !selectedRelevanceFilter) {
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
      
      {selectedRelevanceFilter && setSelectedRelevanceFilter && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 px-2 py-1"
        >
          <Gauge className="h-3.5 w-3.5 mr-1" />
          Relevância: {selectedRelevanceFilter}
          <X 
            className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
            onClick={() => {
              setSelectedRelevanceFilter(null);
              toast.info("Filtro de relevância removido");
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
