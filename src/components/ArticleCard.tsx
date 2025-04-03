
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/data/articles';
import ArticleHeader from './article/ArticleHeader';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  onClick: () => void;
  isCompact?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  segmentId, 
  onClick,
  isCompact = false,
  isSaved = false,
  onToggleSave
}) => {
  // Identificar o tipo principal de impacto para o card
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  const primaryImpactType = hasNegativeImpact ? 'negative' : (hasPositiveImpact ? 'positive' : 'neutral');

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave?.();
  };

  return (
    <Card 
      className={cn(
        `mb-4 transition-all cursor-pointer hover:border-primary hover:shadow-md`,
        isCompact ? 'h-[180px] overflow-hidden' : '',
        primaryImpactType === 'positive' ? 'border-l-4 border-l-green-500' : 
          primaryImpactType === 'negative' ? 'border-l-4 border-l-red-500' : ''
      )}
      onClick={onClick}
    >
      <CardContent className={cn("p-4", isCompact ? "pb-0" : "p-6")}>
        {/* Article Header with Title and Relevance Indicator */}
        <div className="flex justify-between items-start">
          <ArticleHeader article={article} segmentId={segmentId} />
          {onToggleSave && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleSaveClick}
            >
              {isSaved ? (
                <BookmarkCheck size={18} className="text-primary" />
              ) : (
                <Bookmark size={18} />
              )}
            </Button>
          )}
        </div>
        
        {/* Article Summary */}
        <div className={cn("text-sm text-muted-foreground mt-3", 
          isCompact ? "line-clamp-3" : "line-clamp-2"
        )}>
          {article.simplifiedText.substring(0, isCompact ? 180 : 120)}
          {isCompact ? '...' : '...'}
        </div>
      </CardContent>
      
      {!isCompact && (
        <CardFooter className="pt-1 pb-3 px-6">
          <Button 
            variant="ghost" 
            className="text-primary hover:text-primary hover:bg-primary/10 text-sm h-8 px-3 py-1"
            onClick={onClick}
          >
            Ler artigo
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ArticleCard;
