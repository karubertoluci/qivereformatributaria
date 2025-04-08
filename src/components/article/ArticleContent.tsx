
import React from 'react';
import { Article } from '@/data/articles';
import { Separator } from '@/components/ui/separator';
import { HighlightType } from '@/components/results/types';
import ArticleImportanceChart from '@/components/ArticleImportanceChart';
import ArticleSimplifiedText from './ArticleSimplifiedText';
import ArticleOriginalText from './ArticleOriginalText';
import ArticleImpactList from './ArticleImpactList';
import ArticleMetadata from './ArticleMetadata';

interface ArticleContentProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ 
  article, 
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  return (
    <div className="space-y-4">
      {/* Display article metadata */}
      <ArticleMetadata article={article} />
      
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
