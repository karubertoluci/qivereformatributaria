
import React from 'react';
import { Lightbulb } from 'lucide-react';
import HighlightedText from '@/components/results/HighlightedText';
import { HighlightType } from '@/components/results/types';

interface ArticleSimplifiedTextProps {
  articleId: string;
  text: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
}

const ArticleSimplifiedText: React.FC<ArticleSimplifiedTextProps> = ({
  articleId,
  text,
  highlights,
  onAddHighlight
}) => {
  return (
    <div>
      <h4 className="text-sm font-bold flex items-center mb-2">
        <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
        Tradução Simplificada
      </h4>
      <div className="text-sm p-3 bg-secondary rounded-md">
        <HighlightedText 
          text={text} 
          highlights={highlights}
          articleId={articleId}
          onAddHighlight={onAddHighlight}
        />
      </div>
    </div>
  );
};

export default ArticleSimplifiedText;
