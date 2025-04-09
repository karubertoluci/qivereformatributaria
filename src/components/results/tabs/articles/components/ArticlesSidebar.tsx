
import React from 'react';
import ArticlesFilters from '@/components/results/tabs/articles/filters/ArticlesFilters';

interface ArticlesSidebarProps {
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  totalCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: any) => void;
  viewMode: string;
  setViewMode: (mode: any) => void;
  selectedBookFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  selectedTitleFilter: string | null;
  setSelectedTitleFilter: (titleId: string | null) => void;
  books: string[];
  titles: string[];
  syncChartBookFilter: (bookId: string | null) => void;
}

const ArticlesSidebar: React.FC<ArticlesSidebarProps> = ({
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
  titles,
  syncChartBookFilter
}) => {
  return (
    <aside className="md:col-span-3 md:sticky md:top-[80px] h-fit">
      <ArticlesFilters 
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
        totalCount={totalCount}
        searchTerm={searchTerm || ''}
        setSearchTerm={setSearchTerm || (() => {})}
        filterType={filterType || 'all'}
        setFilterType={setFilterType || (() => {})}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={(bookId) => {
          setSelectedBookFilter(bookId);
          syncChartBookFilter(bookId);
        }}
        selectedTitleFilter={selectedTitleFilter}
        setSelectedTitleFilter={setSelectedTitleFilter}
        books={books}
        titles={titles}
      />
    </aside>
  );
};

export default ArticlesSidebar;
