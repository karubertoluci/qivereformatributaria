
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import { Button } from '@/components/ui/button';
import { X, Save, Bookmark, BookmarkX } from 'lucide-react';
import { toast } from 'sonner';

interface ArticleModalProps {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
  savedArticles: string[];
  onToggleSaveArticle: (articleId: string) => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  open,
  onOpenChange,
  segmentId,
  highlights,
  onAddHighlight,
  savedArticles,
  onToggleSaveArticle
}) => {
  if (!article) return null;
  
  const isArticleSaved = savedArticles.includes(article.id);

  const handleToggleSave = () => {
    onToggleSaveArticle(article.id);
    toast.success(isArticleSaved 
      ? "Artigo removido dos favoritos"
      : "Artigo salvo nos favoritos"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-start justify-between gap-2">
            <div className="flex-1">
              <ArticleHeader article={article} segmentId={segmentId} />
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`ml-auto flex items-center gap-1 ${isArticleSaved ? 'bg-primary/10' : ''}`}
              onClick={handleToggleSave}
            >
              {isArticleSaved ? (
                <>
                  <BookmarkX className="h-4 w-4" />
                  <span>Remover</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span>Salvar</span>
                </>
              )}
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <ArticleContent 
          article={article}
          segmentId={segmentId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
        />
        
        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
