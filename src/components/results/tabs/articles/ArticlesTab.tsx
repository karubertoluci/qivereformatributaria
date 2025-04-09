
import React, { useState, useMemo } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import { HighlightType, ViewMode, FilterType, Topic, HighlightColor } from '@/components/results/types';
import { useSearchParams } from 'react-router-dom';
import ArticlesFilters from '@/components/results/tabs/articles/filters/ArticlesFilters';
import ArticlesContent from '@/components/results/tabs/articles/content/ArticlesContent';
import ChartSection from '@/components/results/tabs/articles/charts/ChartSection';
import ActiveFilters from '@/components/results/tabs/articles/ActiveFilters';

interface ArticlesTabProps {
  segment: BusinessSegment;
  relevantArticles: Article[];
  filteredArticles: Article[];
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  highlights: HighlightType[];
  handleAddHighlight: (articleId: string, text: string, color?: HighlightColor) => void;
  handleRemoveHighlight: (id: string) => void;
  topics: Topic[];
  articlesByTopic: Record<string, Article[]>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  positiveCount: number;
  negativeCount: number;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filterType?: FilterType;
  setFilterType?: (type: FilterType) => void;
}

const ArticlesTab: React.FC<ArticlesTabProps> = ({ 
  segment, 
  relevantArticles,
  filteredArticles,
  expandedArticleId,
  setExpandedArticleId,
  highlights,
  handleAddHighlight,
  handleRemoveHighlight,
  topics,
  articlesByTopic,
  viewMode,
  setViewMode,
  positiveCount,
  negativeCount,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(searchParams.get('book') || null);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string | null>(searchParams.get('title') || null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayedArticles = useMemo(() => {
    let result = filteredArticles;

    if (selectedBookFilter && selectedBookFilter !== 'all') {
      result = result.filter(article => {
        if (article.metadata?.bookId) {
          return article.metadata.bookId === selectedBookFilter;
        }
        return article.metadata?.livro === selectedBookFilter;
      });
    }

    if (selectedTitleFilter && selectedTitleFilter !== 'all') {
      result = result.filter(article => article.title === selectedTitleFilter);
    }

    return result;
  }, [filteredArticles, selectedBookFilter, selectedTitleFilter]);

  // Calculate neutral count
  const neutralCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'neutral' && impact.segments.includes(segment.id))
  ).length;

  // Extract book and title lists
  const books = useMemo(() => {
    const allBooks = relevantArticles.map(article => article.metadata?.bookId || article.metadata?.livro).filter(Boolean);
    return Array.from(new Set(allBooks));
  }, [relevantArticles]);
  
  const titles = useMemo(() => {
    const allTitles = relevantArticles.map(article => article.title).filter(Boolean);
    return Array.from(new Set(allTitles));
  }, [relevantArticles]);

  // Get the displayed book and title names for ActiveFilters
  const bookName = selectedBookFilter ? `Livro ${selectedBookFilter}` : '';
  const titleName = selectedTitleFilter && titles.find(t => t === selectedTitleFilter) || '';

  return (
    <TabsContent value="articles" className="pb-12">
      <ArticlesFilters 
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
        totalCount={relevantArticles.length}
        searchTerm={searchTerm || ''}
        setSearchTerm={setSearchTerm || (() => {})}
        filterType={filterType || 'all'}
        setFilterType={setFilterType || (() => {})}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        selectedTitleFilter={selectedTitleFilter}
        setSelectedTitleFilter={setSelectedTitleFilter}
        books={books}
        titles={titles}
      />
      
      <ActiveFilters 
        selectedBookFilter={selectedBookFilter}
        selectedTitleFilter={selectedTitleFilter}
        onClearBookFilter={() => setSelectedBookFilter(null)}
        onClearTitleFilter={() => setSelectedTitleFilter(null)}
        bookName={bookName}
        titleName={titleName}
      />

      <div className="space-y-6">
        <ChartSection 
          filteredArticles={filteredArticles}
          segmentId={segment.id}
          setExpandedArticleId={setExpandedArticleId}
          expanded={expanded}
          toggleExpanded={toggleExpanded}
        />
        
        <ArticlesContent 
          displayedArticles={displayedArticles}
          filteredArticles={filteredArticles}
          selectedBookFilter={selectedBookFilter}
          selectedTitleFilter={selectedTitleFilter}
          setSelectedBookFilter={setSelectedBookFilter}
          setSelectedTitleFilter={setSelectedTitleFilter}
          segment={segment}
          highlights={highlights}
          onAddHighlight={handleAddHighlight}
          onRemoveHighlight={handleRemoveHighlight}
          positiveCount={positiveCount}
          negativeCount={negativeCount}
          neutralCount={neutralCount}
        />
      </div>
    </TabsContent>
  );
};

export default ArticlesTab;
