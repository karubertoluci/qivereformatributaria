
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Article, articles } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import ArticleContent from './article/ArticleContent';
import { Bookmark, BookmarkCheck, Share, Users } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ArticleDialogProps {
  articleId: string | null;
  onClose: () => void;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
  isSaved: boolean;
  onToggleSave?: () => void;
}

const ArticleDialog: React.FC<ArticleDialogProps> = ({
  articleId,
  onClose,
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  isSaved,
  onToggleSave
}) => {
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    return null;
  }

  const articleHighlights = highlights.filter(h => h.articleId === articleId);

  const handleAddHighlight = (text: string, color: HighlightType['color']) => {
    onAddHighlight(text, color, article.id);
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href + '?article=' + article.id);
    toast.info("Link copiado para a área de transferência");
  };
  
  const handleInviteToArticle = () => {
    toast.info("Funcionalidade de convite será implementada em breve");
  };

  return (
    <Dialog open={!!articleId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between gap-2">
            <span className="text-primary">
              {article.title} - {article.number}
            </span>
          </DialogTitle>
          <DialogDescription>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={onToggleSave}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck size={16} className="text-primary" />
                    Salvo
                  </>
                ) : (
                  <>
                    <Bookmark size={16} />
                    Salvar
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleShareArticle}
              >
                <Share size={16} />
                Compartilhar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleInviteToArticle}
              >
                <Users size={16} />
                Convidar
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <ArticleContent
            article={article}
            segmentId={segmentId}
            highlights={articleHighlights}
            onAddHighlight={handleAddHighlight}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
