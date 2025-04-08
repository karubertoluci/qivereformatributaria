
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ArticleUsefulness from '@/components/article/ArticleUsefulness';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full md:w-auto gap-4">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={onShareArticle}
        >
          <Share2 className="h-3.5 w-3.5" />
          {!isMobile && "Compartilhar"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={onInviteToArticle}
        >
          <UserPlus className="h-3.5 w-3.5" />
          {!isMobile && "Convidar para ler"}
        </Button>
      </div>
      
      {/* Article usefulness section */}
      <div className="mt-0 md:mt-0">
        <ArticleUsefulness articleId={articleId} />
      </div>
    </div>
  );
};

export default ArticleCardActions;
