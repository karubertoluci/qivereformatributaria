
import React from 'react';
import { Article } from '@/data/articles';
import { ViewMode, HighlightType, Topic } from '@/components/results/types';
import ArticleTopicsView from '@/components/results/ArticleTopicsView';
import ArticleTableView from '@/components/results/ArticleTableView';
import ViewSwitcher from '@/components/results/ViewSwitcher';
import NoArticlesFound from '@/components/results/NoArticlesFound';
import ImpactsSection from '../components/ImpactsSection';

interface ArticlesContentProps {
  filteredArticles: Article[];
  displayedArticles: Article[];
  selectedBookFilter: string;
  selectedTitleFilter: string;
  setSelectedBookFilter: (value: string) => void;
  setSelectedTitleFilter: (value: string) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  highlights: HighlightType[];
  onAddHighlight: (articleId: string, text: string, color?: string) => void;
  onRemoveHighlight: (id: string) => void;
  articlesByTopic: Record<string, Article[]>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  topics: Topic[];
}

const ArticlesContent: React.FC<ArticlesContentProps> = ({
  filteredArticles,
  displayedArticles,
  selectedBookFilter,
  selectedTitleFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  expandedArticleId,
  setExpandedArticleId,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  articlesByTopic,
  viewMode,
  setViewMode,
  topics
}) => {
  const hasCriticalImpacts = filteredArticles.some(article => 
    article.impacts.some(impact => impact.severity >= 8)
  );

  // If no articles match the filters
  if (!filteredArticles.length) {
    return <NoArticlesFound />;
  }

  return (
    <div className="space-y-6">
      {/* Critical impacts warning if present */}
      <ImpactsSection 
        hasCriticalImpacts={hasCriticalImpacts}
        relevantArticles={filteredArticles}
        allArticles={filteredArticles}
        segmentId={selectedBookFilter}
        bookId={selectedBookFilter}
        relevanceFilter={null}
      />
      
      {/* View switcher (topics/table) */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {filteredArticles.length} artigo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
        </h3>
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      {/* Display articles in the selected view mode */}
      {viewMode === 'topics' ? (
        <ArticleTopicsView 
          articlesByTopic={articlesByTopic}
          expandedArticleId={expandedArticleId}
          setExpandedArticleId={setExpandedArticleId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
          topics={topics}
        />
      ) : (
        <ArticleTableView 
          articles={displayedArticles}
          expandedArticleId={expandedArticleId}
          setExpandedArticleId={setExpandedArticleId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      )}
    </div>
  );
};

export default ArticlesContent;
