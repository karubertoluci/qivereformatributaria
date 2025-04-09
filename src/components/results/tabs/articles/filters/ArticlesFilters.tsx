import React from 'react';
import FilterBar from '@/components/results/FilterBar';
import ViewSwitcher from '@/components/results/ViewSwitcher';
import { FilterType, ViewMode } from '@/components/results/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Book, Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
  return <div className="bg-white p-4 rounded-lg border mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">Filtros</h3>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar artigos..." className="pl-8 w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          
          <div className="md:col-span-8">
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.length > 0 && <div>
              <Label className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                <Book className="h-4 w-4" />
                Filtrar por Livro
              </Label>
              <Select value={selectedBookFilter || "all"} onValueChange={value => setSelectedBookFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os livros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os livros</SelectItem>
                  {books.map(book => <SelectItem key={book} value={book}>
                      Livro {book}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>}

          {titles.length > 0 && <div>
              <Label className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                <Tag className="h-4 w-4" />
                Filtrar por Título
              </Label>
              <Select value={selectedTitleFilter || "all"} onValueChange={value => setSelectedTitleFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os títulos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os títulos</SelectItem>
                  {titles.map(title => <SelectItem key={title} value={title}>
                      {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>}
        </div>

        {(selectedBookFilter || selectedTitleFilter) && selectedBookFilter !== "all" || selectedTitleFilter !== "all" && <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => {
          setSelectedBookFilter(null);
          setSelectedTitleFilter(null);
        }} className="mt-2">
              Limpar filtros
            </Button>
          </div>}
      </div>
    </div>;
};
export default ArticlesFilters;