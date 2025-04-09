
import React from 'react';
import { Article } from '@/data/articles';
import ArticleCard from './ArticleCard';
import { HighlightType } from '@/components/results/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ArticleCardListProps {
  articles: Article[];
  segmentId: string;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
  isLoading?: boolean;
}

const ArticleCardList: React.FC<ArticleCardListProps> = ({ 
  articles = [], 
  segmentId,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {},
  isLoading = false
}) => {
  // Safety check
  if (!Array.isArray(articles)) {
    console.warn('ArticleCardList received non-array articles:', articles);
    articles = [];
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
          </div>
        ) : (
          articles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              segmentId={segmentId}
              highlights={highlights}
              onAddHighlight={onAddHighlight}
              onRemoveHighlight={onRemoveHighlight}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleCardList;
