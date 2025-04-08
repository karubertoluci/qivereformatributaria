
import React from 'react';
import { Article } from '@/data/articles';
import { FileText, ChevronDown } from 'lucide-react';
import HighlightedText from '../results/HighlightedText';
import { HighlightType } from '../results/types';
import { Button } from '../ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ArticleContent from '../article';

interface ArticleCardSummaryProps {
  article: Article;
  segmentId: string;
  expanded: boolean;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
  onToggleExpand: () => void;
}

const ArticleCardSummary: React.FC<ArticleCardSummaryProps> = ({ 
  article, 
  segmentId, 
  expanded,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  onToggleExpand 
}) => {
  return (
    <div className="space-y-4">
      {/* Texto Original - sempre visível */}
      <div className="bg-white rounded-md p-3 mt-2 space-y-3 border border-border/30">
        <p className="text-sm font-medium">
          {article.originalText.substring(0, 150)}
          {article.originalText.length > 150 && "..."}
        </p>
        
        {/* Tag de relevância */}
        <div className="flex items-center">
          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            Muito relevante
          </span>
        </div>
        
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
