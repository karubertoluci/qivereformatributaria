
import React from 'react';
import { Article } from '@/data/articles';
import ArticleCard from './ArticleCard';
import { HighlightType } from '@/components/results/types';

interface ArticleCardListProps {
  articles: Article[];
  segmentId: string;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
}

const ArticleCardList: React.FC<ArticleCardListProps> = ({ 
  articles, 
  segmentId,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {}
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {articles.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
        </div>
      ) : (
        articles.map(article => (
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
  );
};

export default ArticleCardList;
