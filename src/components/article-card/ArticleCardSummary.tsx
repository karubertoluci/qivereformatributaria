
import React from 'react';
import { Article } from '@/data/articles';
import { Button } from '../ui/button';
import { Badge } from '@/components/ui/badge';
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
  // Limit the original text to 100 characters
  const truncatedText = article.originalText.length > 100
    ? article.originalText.substring(0, 100) + "..."
    : article.originalText;

  // Get relevance level
  const getRelevanceInfo = () => {
    const randomRelevance = Math.random() * 100;
    
    if (randomRelevance < 40) {
      return { label: 'Irrelevante', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    } else if (randomRelevance < 50) {
      return { label: 'Pouco relevante', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    } else if (randomRelevance < 90) {
      return { label: 'Moderadamente relevante', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    } else {
      return { label: 'Muito relevante', color: 'bg-green-100 text-green-700 border-green-200' };
    }
  };
  
  const { label: relevanceLabel, color: relevanceColor } = getRelevanceInfo();

  return (
    <div className="space-y-4">
      {/* Original Text */}
      <div className="mt-3 space-y-3">
        <p className="text-sm text-gray-700">
          {truncatedText}
        </p>
        
        <Badge variant="outline" className={cn("text-xs py-1 px-3", relevanceColor)}>
          {relevanceLabel}
        </Badge>
        
        {/* CTA Button - Dialog trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-primary border-primary hover:bg-primary/10"
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
