
import React from 'react';
import { Article } from '@/data/articles';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ArticleContent from '../article';
import { HighlightType } from '../results/types';

interface ArticleCardSummaryProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticleCardSummary: React.FC<ArticleCardSummaryProps> = ({ 
  article, 
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  return (
    <div className="space-y-3">
      {/* Main Article Text - Most important content */}
      <p className="line-clamp-3 text-sm text-gray-800 text-left mt-2">
        {article.simplifiedText || 'Sem texto disponível'}
      </p>
      
      {/* CTA Button - Dialog trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-1 text-primary border-primary hover:bg-primary/10"
          >
            Ver detalhes do artigo
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Art. {article.number || 'N/A'}</DialogTitle>
          </DialogHeader>
          <ArticleContent 
            article={article} 
            segmentId={segmentId} 
            highlights={highlights} 
            onAddHighlight={onAddHighlight} 
            onRemoveHighlight={onRemoveHighlight} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleCardSummary;
