
import React from 'react';
import { Article } from '@/data/articles';
import { FileText, BookOpen } from 'lucide-react';
import HighlightedText from '../results/HighlightedText';
import { HighlightType } from '../results/types';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

interface ArticleCardSummaryProps {
  article: Article;
  segmentId: string;
  expanded: boolean;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
  onToggleExpand: () => void;
}

const ArticleCardSummary: React.FC<ArticleCardSummaryProps> = ({ 
  article, 
  segmentId, 
  expanded,
  highlights,
  onAddHighlight,
  onToggleExpand 
}) => {
  return (
    <div className="space-y-4">
      {/* Texto Original - sempre visível quando não expandido */}
      {!expanded && (
        <div className="bg-muted/50 rounded-md border border-muted p-3 mt-2">
          <h4 className="text-sm font-bold flex items-center mb-2">
            <FileText className="h-4 w-4 mr-1 text-blue-500" />
            Texto Original da Lei
          </h4>
          <p className="text-xs text-muted-foreground">
            {article.originalText.substring(0, 150)}
            {article.originalText.length > 150 && "..."}
          </p>
        </div>
      )}
      
      {/* Texto Simplificado - visível apenas quando expandido */}
      {expanded && (
        <div className="mt-2">
          <h4 className="text-sm font-bold flex items-center mb-2">
            <BookOpen className="h-4 w-4 mr-1 text-amber-500" />
            Texto Simplificado
          </h4>
          <div className="text-sm p-3 bg-secondary/50 rounded-md border border-secondary/50">
            <HighlightedText 
              text={article.simplifiedText} 
              highlights={highlights}
              articleId={article.id}
              onAddHighlight={onAddHighlight}
            />
          </div>
        </div>
      )}
      
      {/* CTA Button - somente quando não expandido */}
      {!expanded && (
        <Button 
          onClick={onToggleExpand}
          variant="outline" 
          size="sm" 
          className="w-full mt-3 border-primary text-primary hover:bg-primary/10"
        >
          Ver detalhes
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
};

export default ArticleCardSummary;
