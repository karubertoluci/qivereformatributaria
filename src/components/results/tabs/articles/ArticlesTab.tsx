
import React, { useState, useMemo } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import ArticlesFilters from './filters/ArticlesFilters';
import ArticlesContent from './content/ArticlesContent';
import ChartSection from './charts/ChartSection';
import { HighlightType, ViewMode, FilterType, Topic } from '@/components/results/types';
import { useSearchParams } from 'react-router-dom';

interface ArticlesTabProps {
  segment: BusinessSegment;
  relevantArticles: Article[];
  filteredArticles: Article[];
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  highlights: HighlightType[];
  handleAddHighlight: (articleId: string, text: string, color?: HighlightType['color']) => void;
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
  relevantArticles = [],
  filteredArticles = [],
  expandedArticleId,
  setExpandedArticleId,
  highlights = [],
  handleAddHighlight,
  handleRemoveHighlight,
  topics = [],
  articlesByTopic = {},
  viewMode,
  setViewMode,
  positiveCount = 0,
  negativeCount = 0,
  searchTerm = '',
  setSearchTerm = () => {},
  filterType = 'all',
  setFilterType = () => {}
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

    if (selectedBookFilter) {
      result = result.filter(article => {
        if (article.metadata?.bookId) {
          return article.metadata.bookId === selectedBookFilter;
        }
        return article.metadata?.livro === selectedBookFilter;
      });
    }

    if (selectedTitleFilter) {
      result = result.filter(article => article.title === selectedTitleFilter);
    }

    return result;
  }, [filteredArticles, selectedBookFilter, selectedTitleFilter]);

  // Calculate neutral count safely
  const neutralCount = (relevantArticles || []).filter(article => 
    article.impacts && article.impacts.some(impact => 
      impact.type === 'neutral' && impact.segments && impact.segments.includes(segment.id)
    )
  ).length;

  // Extract book and title lists
  const books = useMemo(() => {
    const allBooks = (relevantArticles || []).map(article => 
      article.metadata?.bookId || article.metadata?.livro
    ).filter(Boolean);
    return Array.from(new Set(allBooks));
  }, [relevantArticles]);
  
  const titles = useMemo(() => {
    const allTitles = (relevantArticles || []).map(article => 
      article.title
    ).filter(Boolean);
    return Array.from(new Set(allTitles));
  }, [relevantArticles]);

  return (
    <TabsContent value="articles" className="pb-8 px-4">
      <div className="grid md:grid-cols-12 gap-4">
        <aside className="md:col-span-3 md:sticky md:top-[80px] h-fit">
          <ArticlesFilters 
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            neutralCount={neutralCount}
            totalCount={relevantArticles ? relevantArticles.length : 0}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedBookFilter={selectedBookFilter}
            setSelectedBookFilter={setSelectedBookFilter}
            selectedTitleFilter={selectedTitleFilter}
            setSelectedTitleFilter={setSelectedTitleFilter}
            books={books}
            titles={titles}
          />
        </aside>

        <main className="md:col-span-9">
          <div className="flex flex-col space-y-4">
            <ChartSection 
              filteredArticles={filteredArticles || []}
              segmentId={segment.id}
              setExpandedArticleId={setExpandedArticleId}
              expanded={expanded}
              toggleExpanded={toggleExpanded}
            />
            
            <ArticlesContent 
              filteredArticles={filteredArticles || []}
              displayedArticles={displayedArticles}
              selectedBookFilter={selectedBookFilter}
              selectedTitleFilter={selectedTitleFilter}
              setSelectedBookFilter={setSelectedBookFilter}
              setSelectedTitleFilter={setSelectedTitleFilter}
              expandedArticleId={expandedArticleId}
              setExpandedArticleId={setExpandedArticleId}
              highlights={highlights}
              onAddHighlight={handleAddHighlight}
              onRemoveHighlight={handleRemoveHighlight}
              articlesByTopic={articlesByTopic}
              viewMode={viewMode}
              setViewMode={setViewMode}
              topics={topics}
              segment={segment}
              positiveCount={positiveCount}
              negativeCount={negativeCount}
              neutralCount={neutralCount}
            />
          </div>
        </main>
      </div>
    </TabsContent>
  );
};

export default ArticlesTab;
