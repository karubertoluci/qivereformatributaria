
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
      {articles.map(article => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          segmentId={segmentId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      ))}
    </div>
  );
};

export default ArticleCardList;
