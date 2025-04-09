
import React from 'react';
import FilterBar from '@/components/results/FilterBar';
import ViewSwitcher from '@/components/results/ViewSwitcher';
import { FilterType, ViewMode } from '@/components/results/types';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Book, Tag } from 'lucide-react';

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
    <div className="space-y-6 bg-white p-4 rounded-lg border">
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Filtros</h3>
        
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

        {books.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Book className="h-4 w-4" />
              Filtrar por Livro
            </Label>
            <Select
              value={selectedBookFilter || ""}
              onValueChange={(value) => setSelectedBookFilter(value === "" ? null : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos os livros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os livros</SelectItem>
                {books.map((book) => (
                  <SelectItem key={book} value={book}>
                    Livro {book}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {titles.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              Filtrar por Título
            </Label>
            <Select
              value={selectedTitleFilter || ""}
              onValueChange={(value) => setSelectedTitleFilter(value === "" ? null : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos os títulos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os títulos</SelectItem>
                {titles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h3 className="font-medium text-sm mb-2">Visualização</h3>
        <ViewSwitcher 
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      {(selectedBookFilter || selectedTitleFilter) && (
        <div className="pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setSelectedBookFilter(null);
              setSelectedTitleFilter(null);
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesFilters;
