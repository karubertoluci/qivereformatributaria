
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType, Topic, ViewMode } from '@/components/results/types';
import ArticleTopicsView from '@/components/results/ArticleTopicsView';
import ArticleTableView from '@/components/results/ArticleTableView';
import ViewSwitcher from '@/components/results/ViewSwitcher';
import NoArticlesFound from '@/components/results/NoArticlesFound';
import ImpactsSection from '../components/ImpactsSection';
import { BusinessSegment } from '@/data/segments';
import ArticleCardList from '@/components/article/ArticleCardList';

interface ArticlesContentProps {
  filteredArticles: Article[];
  displayedArticles: Article[];
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  setSelectedBookFilter: (value: string | null) => void;
  setSelectedTitleFilter: (value: string | null) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  highlights: HighlightType[];
  onAddHighlight: (articleId: string, text: string, color?: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
  articlesByTopic: Record<string, Article[]>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  topics: Topic[];
  segment: BusinessSegment;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

const ArticlesContent: React.FC<ArticlesContentProps> = ({
  filteredArticles = [],
  displayedArticles = [],
  selectedBookFilter,
  selectedTitleFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  expandedArticleId,
  setExpandedArticleId,
  highlights = [],
  onAddHighlight,
  onRemoveHighlight,
  articlesByTopic = {},
  viewMode,
  setViewMode,
  topics = [],
  segment,
  positiveCount = 0,
  negativeCount = 0,
  neutralCount = 0
}) => {
  // Garantir arrays seguros
  const safeFilteredArticles = Array.isArray(filteredArticles) ? filteredArticles : [];
  const safeDisplayedArticles = Array.isArray(displayedArticles) ? displayedArticles : [];
  
  // Verificar se há artigos críticos
  const hasCriticalImpacts = safeFilteredArticles.some(article => 
    article.impacts && Array.isArray(article.impacts) && article.impacts.some(impact => {
      if (!impact) return false;
      if (typeof impact.severity === 'number') {
        return impact.severity >= 8;
      } else if (typeof impact.severity === 'string') {
        return impact.severity === 'high';
      }
      return false;
    })
  );

  // Se não há artigos com os filtros aplicados
  if (!safeFilteredArticles.length) {
    return <NoArticlesFound segment={segment} />;
  }

  // Mensagem sobre total de artigos encontrados
  const totalMessage = safeDisplayedArticles.length === 1 
    ? "1 artigo encontrado" 
    : `${safeDisplayedArticles.length} artigos encontrados`;

  return (
    <div className="space-y-6">
      {/* Alerta de impactos críticos se houver */}
      <ImpactsSection 
        hasCriticalImpacts={hasCriticalImpacts}
        relevantArticles={safeFilteredArticles}
        allArticles={safeFilteredArticles}
        segmentId={segment.id}
        bookId={selectedBookFilter}
        relevanceFilter={null}
      />
      
      {/* Alternador de visualização e contador de artigos */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {totalMessage}
        </h3>
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      {/* Exibir artigos no modo selecionado */}
      <div className="w-full">
        {viewMode === 'chart' ? (
          <ArticleCardList 
            articles={safeDisplayedArticles}
            segmentId={segment.id}
            highlights={highlights || []}
            onAddHighlight={(text, color) => {
              if (safeDisplayedArticles.length > 0 && safeDisplayedArticles[0] && safeDisplayedArticles[0].id) {
                onAddHighlight(safeDisplayedArticles[0].id, text, color);
              }
            }}
            onRemoveHighlight={onRemoveHighlight}
          />
        ) : viewMode === 'topic' ? (
          <ArticleTopicsView 
            topics={topics}
            articlesByTopic={articlesByTopic}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            highlights={highlights}
            onAddHighlight={onAddHighlight}
            onRemoveHighlight={onRemoveHighlight}
            segment={segment}
          />
        ) : (
          <ArticleTableView 
            articles={safeDisplayedArticles}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            highlights={highlights || []}
            onAddHighlight={onAddHighlight}
            onRemoveHighlight={onRemoveHighlight}
            segment={segment}
          />
        )}
      </div>
    </div>
  );
};

export default ArticlesContent;
