
import React from 'react';
import { Article } from '@/data/articles';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ArticleContent from '../article';
import { HighlightType } from '../results/types';
import { ArrowRight } from 'lucide-react';

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
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-sm text-red-500 hover:text-red-600 hover:underline transition-colors flex items-center justify-center gap-1 mt-2">
          Ver detalhes do artigo
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
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
  );
};

export default ArticleCardSummary;
