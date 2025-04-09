
import React from 'react';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import { HighlightType, ViewMode, FilterType, Topic } from '@/components/results/types';
import ArticlesLayout from './articles/components/ArticlesLayout';
import ArticlesSidebar from './articles/components/ArticlesSidebar';
import ArticlesMain from './articles/components/ArticlesMain';
import { useArticlesTab } from './articles/hooks/useArticlesTab';

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
  // Use our custom hook for the articles tab state
  const {
    selectedBookFilter,
    setSelectedBookFilter,
    selectedTitleFilter,
    setSelectedTitleFilter,
    expanded,
    toggleExpanded,
    chartBookFilter,
    setChartBookFilter,
    chartRelevanceFilter,
    setChartRelevanceFilter,
    displayedArticles,
    books,
    titles,
    bookName,
    titleName,
    neutralCount
  } = useArticlesTab(filteredArticles, relevantArticles, segment);

  return (
    <ArticlesLayout segment={segment}>
      <ArticlesSidebar
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
        syncChartBookFilter={setChartBookFilter}
      />
      
      <ArticlesMain
        segment={segment}
        filteredArticles={filteredArticles}
        displayedArticles={displayedArticles}
        selectedBookFilter={selectedBookFilter}
        selectedTitleFilter={selectedTitleFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        setSelectedTitleFilter={setSelectedTitleFilter}
        expandedArticleId={expandedArticleId}
        setExpandedArticleId={setExpandedArticleId}
        highlights={highlights}
        handleAddHighlight={handleAddHighlight}
        handleRemoveHighlight={handleRemoveHighlight}
        articlesByTopic={articlesByTopic}
        viewMode={viewMode}
        setViewMode={setViewMode}
        topics={topics}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
        bookName={bookName}
        titleName={titleName}
        expanded={expanded}
        toggleExpanded={toggleExpanded}
        chartBookFilter={chartBookFilter}
        setChartBookFilter={setChartBookFilter}
        chartRelevanceFilter={chartRelevanceFilter}
        setChartRelevanceFilter={setChartRelevanceFilter}
      />
    </ArticlesLayout>
  );
};

export default ArticlesTab;
