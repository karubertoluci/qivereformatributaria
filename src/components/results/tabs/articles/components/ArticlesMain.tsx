
import React from 'react';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import { HighlightType, ViewMode, Topic } from '@/components/results/types';
import ActiveFilters from '@/components/results/tabs/articles/ActiveFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChartSection from '@/components/results/tabs/articles/charts/ChartSection';
import ArticlesContent from '@/components/results/tabs/articles/content/ArticlesContent';

interface ArticlesMainProps {
  segment: BusinessSegment;
  filteredArticles: Article[];
  displayedArticles: Article[];
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  setSelectedTitleFilter: (titleId: string | null) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  highlights: HighlightType[];
  handleAddHighlight: (articleId: string, text: string, color?: HighlightType['color']) => void;
  handleRemoveHighlight: (id: string) => void;
  articlesByTopic: Record<string, Article[]>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  topics: Topic[];
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  bookName: string;
  titleName: string;
  expanded: boolean;
  toggleExpanded: () => void;
  chartBookFilter: string | null;
  setChartBookFilter: (bookId: string | null) => void;
  chartRelevanceFilter: string | null;
  setChartRelevanceFilter: (relevanceLevel: string | null) => void;
}

const ArticlesMain: React.FC<ArticlesMainProps> = ({
  segment,
  filteredArticles,
  displayedArticles,
  selectedBookFilter,
  selectedTitleFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  expandedArticleId,
  setExpandedArticleId,
  highlights,
  handleAddHighlight,
  handleRemoveHighlight,
  articlesByTopic,
  viewMode,
  setViewMode,
  topics,
  positiveCount,
  negativeCount,
  neutralCount,
  bookName,
  titleName,
  expanded,
  toggleExpanded,
  chartBookFilter,
  setChartBookFilter,
  chartRelevanceFilter,
  setChartRelevanceFilter
}) => {
  return (
    <main className="md:col-span-9">
      <div className="flex flex-col space-y-6">
        <ActiveFilters 
          selectedBookFilter={selectedBookFilter}
          selectedTitleFilter={selectedTitleFilter}
          onClearBookFilter={() => {
            setSelectedBookFilter(null);
            setChartBookFilter(null);
          }}
          onClearTitleFilter={() => setSelectedTitleFilter(null)}
          bookName={bookName}
          titleName={titleName}
          relevanceFilter={chartRelevanceFilter}
          onClearRelevanceFilter={() => setChartRelevanceFilter(null)}
        />
        
        {/* Box 1: Visualização dos artigos */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Visualização dos artigos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartSection 
              filteredArticles={filteredArticles}
              segmentId={segment.id}
              setExpandedArticleId={setExpandedArticleId}
              expanded={expanded}
              toggleExpanded={toggleExpanded}
            />
          </CardContent>
        </Card>
        
        {/* Box 2: Artigos */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Artigos</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ArticlesMain;
