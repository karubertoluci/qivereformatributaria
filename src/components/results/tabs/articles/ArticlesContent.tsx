
import React, { useState } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import ArticleTableView from '../../ArticleTableView';
import ArticleTopicsView from '../../ArticleTopicsView';
import { Button } from '@/components/ui/button';
import { Topic, HighlightType } from '../../types';
import { toast } from 'sonner';
import ArticleCard from '@/components/ArticleCard';
import ArticleModal from '@/components/article/ArticleModal';

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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenArticleModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleAddHighlightInModal = (text: string, color: HighlightType['color']) => {
    if (selectedArticle) {
      onAddHighlight(text, color, selectedArticle.id);
    }
  };

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
          onOpenArticleModal={handleOpenArticleModal}
        />
      ) : viewMode === 'list' ? (
        <div className={isCompactView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" : ""}>
          {displayedArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              segmentId={segment.id}
              expanded={article.id === expandedArticleId}
              onToggleExpand={() => setExpandedArticleId(article.id === expandedArticleId ? null : article.id)}
              highlights={highlights.filter(h => h.articleId === article.id)}
              onAddHighlight={(text, color) => onAddHighlight(text, color, article.id)}
              onRemoveHighlight={onRemoveHighlight}
              isCompactView={isCompactView}
              onOpenModal={() => handleOpenArticleModal(article)}
              savedArticles={savedArticles}
              onToggleSaveArticle={onToggleSaveArticle}
            />
          ))}
        </div>
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
          savedArticles={savedArticles}
          onToggleSaveArticle={onToggleSaveArticle}
          onOpenArticleModal={handleOpenArticleModal}
          isCompactView={isCompactView}
        />
      )}

      <ArticleModal
        article={selectedArticle}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        segmentId={segment.id}
        highlights={highlights.filter(h => selectedArticle && h.articleId === selectedArticle.id)}
        onAddHighlight={handleAddHighlightInModal}
        savedArticles={savedArticles}
        onToggleSaveArticle={onToggleSaveArticle}
      />
    </div>
  );
};

export default ArticlesContent;
