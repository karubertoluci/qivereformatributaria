
import React from 'react';
import { Article } from '@/data/articles';
import ArticleImportanceChart from '../ArticleImportanceChart';
import HighlightedText from '../results/HighlightedText';
import { HighlightType } from '../results/types';

interface ArticleCardSummaryProps {
  article: Article;
  segmentId: string;
  expanded: boolean;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
}

const ArticleCardSummary: React.FC<ArticleCardSummaryProps> = ({ 
  article, 
  segmentId, 
  expanded,
  highlights,
  onAddHighlight 
}) => {
  return (
    <div className="text-sm text-foreground mb-4">
      {expanded ? (
        <HighlightedText 
          text={article.simplifiedText} 
          highlights={highlights}
          articleId={article.id}
          onAddHighlight={onAddHighlight}
        />
      ) : (
        article.simplifiedText.substring(0, 120) + "..."
      )}
      
      {!expanded && (
        <ArticleImportanceChart article={article} segmentId={segmentId} className="mt-2" />
      )}
    </div>
  );
};

export default ArticleCardSummary;
