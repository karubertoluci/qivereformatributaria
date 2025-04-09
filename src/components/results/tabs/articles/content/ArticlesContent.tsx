
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
  filteredBookId?: string | null;
  filteredRelevance?: string | null;
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
  neutralCount = 0,
  filteredBookId,
  filteredRelevance
}) => {
  // Garantir arrays seguros
  const safeFilteredArticles = Array.isArray(filteredArticles) ? filteredArticles : [];
  const safeDisplayedArticles = Array.isArray(displayedArticles) ? displayedArticles : [];
  
  // Apply additional filters from charts if they exist
  let finalDisplayedArticles = safeDisplayedArticles;
  
  // Filter by book from chart selection if different than sidebar filter
  if (filteredBookId && (!selectedBookFilter || filteredBookId !== selectedBookFilter)) {
    finalDisplayedArticles = finalDisplayedArticles.filter(article => {
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      
      if (filteredBookId === 'I') return articleNum <= 180;
      if (filteredBookId === 'II') return articleNum > 180 && articleNum <= 300;
      return articleNum > 300;
    });
  }
  
  // Filter by relevance from chart selection
  if (filteredRelevance) {
    // Implement relevance filtering logic similar to chart section
    const total = finalDisplayedArticles.length;
    const sortedArticles = [...finalDisplayedArticles].sort((a, b) => a.id.localeCompare(b.id));
    
    if (filteredRelevance === 'Irrelevante') {
      finalDisplayedArticles = sortedArticles.slice(0, Math.ceil(total * 0.25));
    } else if (filteredRelevance === 'Pouco relevante') {
      finalDisplayedArticles = sortedArticles.slice(Math.ceil(total * 0.25), Math.ceil(total * 0.5));
    } else if (filteredRelevance === 'Moderadamente relevante') {
      finalDisplayedArticles = sortedArticles.slice(Math.ceil(total * 0.5), Math.ceil(total * 0.75));
    } else if (filteredRelevance === 'Muito relevante') {
      finalDisplayedArticles = sortedArticles.slice(Math.ceil(total * 0.75));
    }
  }
  
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
  if (!finalDisplayedArticles.length) {
    return <NoArticlesFound segment={segment} />;
  }

  // Mensagem sobre total de artigos encontrados
  const totalMessage = finalDisplayedArticles.length === 1 
    ? "1 artigo encontrado" 
    : `${finalDisplayedArticles.length} artigos encontrados`;

  return (
    <div className="space-y-6 w-full">
      {/* Alerta de impactos críticos se houver */}
      <ImpactsSection 
        hasCriticalImpacts={hasCriticalImpacts}
        relevantArticles={safeFilteredArticles}
        allArticles={safeFilteredArticles}
        segmentId={segment.id}
        bookId={selectedBookFilter || filteredBookId}
        relevanceFilter={filteredRelevance}
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
            articles={finalDisplayedArticles}
            segmentId={segment.id}
            highlights={highlights || []}
            onAddHighlight={(text, color) => {
              if (finalDisplayedArticles.length > 0 && finalDisplayedArticles[0] && finalDisplayedArticles[0].id) {
                onAddHighlight(finalDisplayedArticles[0].id, text, color);
              }
            }}
            onRemoveHighlight={onRemoveHighlight}
          />
        ) : viewMode === 'table' ? (
          <ArticleTableView 
            articles={finalDisplayedArticles}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            segment={segment}
            highlights={highlights}
            onAddHighlight={(text, color, articleId) => onAddHighlight(articleId, text, color)}
            onRemoveHighlight={onRemoveHighlight}
          />
        ) : (
          <ArticleTopicsView 
            topics={topics}
            articlesByTopic={articlesByTopic}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            highlights={highlights}
            onAddHighlight={(text, color, articleId) => onAddHighlight(articleId, text, color)}
            onRemoveHighlight={onRemoveHighlight}
            segmentId={segment.id}
            filteredArticles={finalDisplayedArticles}
            onSelectArticle={(id) => setExpandedArticleId(id)}
          />
        )}
      </div>
    </div>
  );
};

export default ArticlesContent;
