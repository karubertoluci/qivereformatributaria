
import React from 'react';
import { Article } from '@/data/articles';
import { Separator } from '@/components/ui/separator';
import { HighlightType } from '@/components/results/types';
import ArticleImportanceChart from '@/components/ArticleImportanceChart';
import ArticleSimplifiedText from './ArticleSimplifiedText';
import ArticleOriginalText from './ArticleOriginalText';
import ArticleImpactList from './ArticleImpactList';

interface ArticleContentProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ 
  article, 
  segmentId,
  highlights,
  onAddHighlight
}) => {
  return (
    <div className="space-y-4">
      <ArticleSimplifiedText 
        articleId={article.id}
        text={article.simplifiedText}
        highlights={highlights}
        onAddHighlight={onAddHighlight}
      />
      
      <Separator />
      
      <ArticleImportanceChart article={article} segmentId={segmentId} className="my-4" />
      
      <Separator />
      
      <ArticleOriginalText text={article.originalText} />
      
      <Separator />
      
      <ArticleImpactList impacts={article.impacts} segmentId={segmentId} />
    </div>
  );
};

export default ArticleContent;
