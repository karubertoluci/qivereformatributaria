
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { HighlightType } from '@/components/results/types';
import { toast } from 'sonner';
import ArticleCardList from '@/components/article/ArticleCardList';
import ImpactsSection from '@/components/results/tabs/articles/components/ImpactsSection';

interface ArticlesContentProps {
  displayedArticles: Article[];
  filteredArticles: Article[];
  selectedBookFilter: string | null;
  selectedTitleFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  setSelectedTitleFilter: (titleId: string | null) => void;
  segment: BusinessSegment;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

const ArticlesContent: React.FC<ArticlesContentProps> = ({
  displayedArticles,
  filteredArticles,
  selectedBookFilter,
  selectedTitleFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  segment,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  positiveCount,
  negativeCount,
  neutralCount
}) => {
  // Verificar se há impactos críticos
  const hasCriticalImpacts = displayedArticles.some(article => 
    article.impacts.some(impact => 
      impact.segments.includes(segment.id) && 
      impact.type === 'negative' && 
      (typeof impact.severity === 'string' ? 
        impact.severity === 'high' : 
        impact.severity >= 8)
    )
  );

  return (
    <div className="container mx-auto bg-muted/30 p-4 rounded-lg border">
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
      
      {/* Seção de impactos no topo */}
      <ImpactsSection 
        hasCriticalImpacts={hasCriticalImpacts}
        relevantArticles={displayedArticles}
        allArticles={filteredArticles}
        segmentId={segment.id}
        bookId={selectedBookFilter}
        relevanceFilter={null}
      />
      
      {/* Sempre renderiza a visualização de cards */}
      <ArticleCardList 
        articles={displayedArticles}
        segmentId={segment.id}
        highlights={highlights}
        onAddHighlight={(text, color) => {
          // We need the articleId, which should be passed from the selected article
          if (displayedArticles.length > 0) {
            onAddHighlight(text, color, displayedArticles[0].id);
          }
        }}
        onRemoveHighlight={onRemoveHighlight}
      />
    </div>
  );
};

export default ArticlesContent;
