
import React from 'react';
import { Article } from '@/data/articles';
import { Button } from '../ui/button';
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
  // Limit the original text to 150 characters
  const truncatedText = article.originalText.length > 150
    ? article.originalText.substring(0, 150) + "..."
    : article.originalText;

  return (
    <div className="space-y-4">
      {/* Texto Original - sempre visível */}
      <div className="bg-white rounded-md p-3 mt-2 space-y-3 border border-border/30">
        <p className="text-sm font-medium">
          {truncatedText}
        </p>
        
        {/* CTA Button - Dialog trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 text-primary border-primary hover:bg-primary/10"
            >
              Ver detalhes do artigo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{article.title}</DialogTitle>
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
    </div>
  );
};

export default ArticleCardSummary;
