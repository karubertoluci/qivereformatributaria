
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ArticleCardActionsProps {
  articleId: string;
  onShareArticle: () => void;
  onInviteToArticle: () => void;
}

const ArticleCardActions: React.FC<ArticleCardActionsProps> = ({
  articleId,
  onShareArticle,
  onInviteToArticle
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1.5"
        onClick={onShareArticle}
      >
        <Share2 className="h-3.5 w-3.5" />
        Compartilhar
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1.5"
        onClick={onInviteToArticle}
      >
        <UserPlus className="h-3.5 w-3.5" />
        Convidar para ler
      </Button>
    </div>
  );
};

export default ArticleCardActions;
