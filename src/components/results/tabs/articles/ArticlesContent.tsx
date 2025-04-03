
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import ArticleTableView from '../../ArticleTableView';
import ArticleTopicsView from '../../ArticleTopicsView';
import { Button } from '@/components/ui/button';
import { Topic, HighlightType } from '../../types';
import { toast } from 'sonner';
import ArticleDialog from '../../../ArticleDialog';

interface ArticlesContentProps {
  viewMode: 'list' | 'table' | 'chart';
  displayedArticles: Article[];
  filteredArticles: Article[];
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  setSelectedTitleFilter: (titleId: string | null) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  segment: BusinessSegment;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
  articlesByTopic: Record<string, Article[]>;
  topics: Topic[];
  isCompactView: boolean;
  savedArticles: string[];
  onToggleSaveArticle: (articleId: string) => void;
}

const ArticlesContent: React.FC<ArticlesContentProps> = ({
  viewMode,
  displayedArticles,
  filteredArticles,
  selectedBookFilter,
  selectedTitleFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  expandedArticleId,
  setExpandedArticleId,
  segment,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  articlesByTopic,
  topics,
  isCompactView,
  savedArticles,
  onToggleSaveArticle
}) => {
  return (
    <div className="bg-muted/30 p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">
          {displayedArticles.length} {displayedArticles.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </h3>
        {displayedArticles.length !== filteredArticles.length && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSelectedBookFilter(null);
              setSelectedTitleFilter(null);
              toast.info("Todos os filtros adicionais foram removidos");
            }}
          >
            Limpar todos os filtros adicionais
          </Button>
        )}
      </div>
      
      {/* Dialog for displaying full article details */}
      <ArticleDialog 
        articleId={expandedArticleId}
        onClose={() => setExpandedArticleId(null)}
        segmentId={segment.id}
        highlights={highlights}
        onAddHighlight={onAddHighlight}
        onRemoveHighlight={onRemoveHighlight}
        isSaved={expandedArticleId ? savedArticles.includes(expandedArticleId) : false}
        onToggleSave={expandedArticleId ? () => onToggleSaveArticle(expandedArticleId) : undefined}
      />
      
      {viewMode === 'table' ? (
        <ArticleTableView 
          articles={displayedArticles}
          expandedArticleId={expandedArticleId}
          setExpandedArticleId={setExpandedArticleId}
          isTableView={true}
          segment={segment}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
          savedArticles={savedArticles}
          onToggleSaveArticle={onToggleSaveArticle}
        />
      ) : (
        <ArticleTopicsView 
          articlesByTopic={articlesByTopic}
          topics={topics}
          onSelectArticle={setExpandedArticleId}
          expandedArticleId={expandedArticleId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
          filteredArticles={displayedArticles}
          segmentId={segment.id}
          setExpandedArticleId={setExpandedArticleId}
          isCompactView={isCompactView}
          savedArticles={savedArticles}
          onToggleSaveArticle={onToggleSaveArticle}
        />
      )}
    </div>
  );
};

export default ArticlesContent;
