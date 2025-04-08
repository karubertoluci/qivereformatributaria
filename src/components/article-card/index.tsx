
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import ArticleCardHeader from './ArticleCardHeader';
import ArticleCardSummary from './ArticleCardSummary';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (articleId: string, text: string, color: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  // Aplicar a distribuição de favorabilidade: 40% favorável, 20% neutro, 30% desfavorável
  const randomImpact = Math.random() * 100;
  
  let borderClass = '';
  if (randomImpact < 40) {
    borderClass = 'border-l-4 border-l-green-500'; // Favorável
  } else if (randomImpact >= 60) {
    borderClass = 'border-l-4 border-l-red-500'; // Desfavorável
  }
  
  const articleHighlights = highlights.filter(h => h.articleId === article.id);
  
  const handleAddHighlight = (text: string, color: HighlightType['color']) => {
    onAddHighlight(article.id, text, color);
  };
  
  return (
    <Card className={cn("shadow-sm hover:shadow transition-shadow duration-200 mb-4", borderClass)}>
      <CardHeader className="pb-2 pt-4 px-4">
        <ArticleCardHeader 
          article={article} 
          segmentId={segmentId}
        />
      </CardHeader>
      
      <CardContent className="pt-0 px-4">
        <ArticleCardSummary 
          article={article} 
          segmentId={segmentId}
          highlights={articleHighlights}
          onAddHighlight={handleAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
