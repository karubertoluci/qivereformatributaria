
import React, { useState, useMemo } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import ArticlesFilters from './filters/ArticlesFilters';
import ArticlesContent from './content/ArticlesContent';
import ChartSection from './charts/ChartSection';
import { HighlightType } from '@/components/results/types';
import { useSearchParams } from 'react-router-dom';
import { Topic } from '@/components/results/types';

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
  viewMode: 'chart' | 'table'; // Fixed type to match what's used
  setViewMode: (mode: 'chart' | 'table') => void; // Fixed type to match what's used
  positiveCount: number;
  negativeCount: number;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filterType?: string;
  setFilterType?: (type: any) => void;
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

    if (selectedBookFilter) {
      result = result.filter(article => {
        // Use metadata.bookId if available
        if (article.metadata?.bookId) {
          return article.metadata.bookId === selectedBookFilter;
        }
        // Fallback to livro property in metadata
        return article.metadata?.livro === selectedBookFilter;
      });
    }

    if (selectedTitleFilter) {
      result = result.filter(article => article.title === selectedTitleFilter);
    }

    return result;
  }, [filteredArticles, selectedBookFilter, selectedTitleFilter]);

  return (
    <TabsContent value="articles" className="pb-12">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Sidebar filters - 3 cols on desktop */}
        <aside className="md:col-span-3 md:sticky md:top-[80px] h-fit">
          <ArticlesFilters 
            articles={relevantArticles}
            selectedBookFilter={selectedBookFilter}
            selectedTitleFilter={selectedTitleFilter}
            setSelectedBookFilter={setSelectedBookFilter}
            setSelectedTitleFilter={setSelectedTitleFilter}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
          />
        </aside>

        {/* Main content - 9 cols on desktop */}
        <main className="md:col-span-9">
          <div className="flex flex-col space-y-6">
            {/* Chart section */}
            <ChartSection 
              filteredArticles={filteredArticles}
              segmentId={segment.id}
              setExpandedArticleId={setExpandedArticleId}
              expanded={expanded}
              toggleExpanded={toggleExpanded}
            />
            
            {/* Articles content */}
            <ArticlesContent 
              filteredArticles={filteredArticles}
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
              topics={topics}
              articlesByTopic={articlesByTopic}
              viewMode={viewMode}
              setViewMode={setViewMode}
              segment={segment}
            />
          </div>
        </main>
      </div>
    </TabsContent>
  );
};

export default ArticlesTab;
