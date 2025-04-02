
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ArticleUsefulness from '@/components/article/ArticleUsefulness';

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
    <div className="flex flex-wrap justify-between items-center">
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
      
      {/* Article usefulness section - now on the right side */}
      <div className="mt-0 md:mt-0">
        <ArticleUsefulness articleId={articleId} />
      </div>
    </div>
  );
};

export default ArticleCardActions;
