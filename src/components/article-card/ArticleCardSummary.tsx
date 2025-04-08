
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
      {/* Original Text (when not expanded) */}
      {!expanded && (
        <div>
          <h4 className="text-sm font-bold flex items-center mb-2">
            <FileText className="h-4 w-4 mr-1 text-blue-500" />
            Texto Original da Lei
          </h4>
          <div className="text-xs p-3 bg-muted rounded-md border border-muted">
            {article.originalText.substring(0, 100)}
            {article.originalText.length > 100 && "..."}
          </div>
        </div>
      )}
      
      {/* Simplified Text Summary */}
      <div>
        <h4 className="text-sm font-bold flex items-center mb-2">
          <BookOpen className="h-4 w-4 mr-1 text-amber-500" />
          {expanded ? "Texto Simplificado" : "Resumo"}
        </h4>
        <div className="text-sm p-3 bg-secondary/50 rounded-md border border-secondary/50">
          {expanded ? (
            <HighlightedText 
              text={article.simplifiedText} 
              highlights={highlights}
              articleId={article.id}
              onAddHighlight={onAddHighlight}
            />
          ) : (
            <>
              {article.simplifiedText.substring(0, 150)}
              {article.simplifiedText.length > 150 && "..."}
            </>
          )}
        </div>
      </div>
      
      {/* CTA Button for "Ver detalhes" when not expanded */}
      {!expanded && (
        <Button 
          onClick={onToggleExpand}
          variant="outline" 
          size="sm" 
          className="w-full mt-2 border-primary text-primary hover:bg-primary/10"
        >
          Ver detalhes
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
};

export default ArticleCardSummary;
