import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/data/articles';
import { CommentType, HighlightType } from './results/types';
import ArticleHeader from './article/ArticleHeader';
import ArticleCitations from './article/ArticleCitations';
import { useToast } from '@/components/ui/use-toast';
import ArticleCardSummary from './article-card/ArticleCardSummary';
import ArticleCardActions from './article-card/ArticleCardActions';
import ArticleCardTabs from './article-card/ArticleCardTabs';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  expanded: boolean;
  onToggleExpand: () => void;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  segmentId, 
  expanded, 
  onToggleExpand,
  highlights = [], 
  onAddHighlight = () => {}, 
  onRemoveHighlight = () => {} 
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("content");
  const { toast } = useToast();
  
  // Filter highlights for this article
  const articleHighlights = highlights.filter(h => h.articleId === article.id);

  // Identificar o tipo principal de impacto para o card
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  const primaryImpactType = hasNegativeImpact ? 'negative' : (hasPositiveImpact ? 'positive' : 'neutral');

  const handleAddComment = (text: string) => {
    const newComment: CommentType = {
      id: crypto.randomUUID(),
      text,
      timestamp: new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      articleId: article.id
    };
    setComments([...comments, newComment]);
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi adicionado ao artigo."
    });
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href + '?article=' + article.id);
    
    toast({
      title: "Link copiado!",
      description: "O link para este artigo foi copiado para a área de transferência."
    });
  };
  
  const handleInviteToArticle = () => {
    toast({
      title: "Compartilhamento",
      description: "Funcionalidade de convite para artigo específico será implementada em breve."
    });
  };
  
  return (
    <Card className={`mb-4 transition-all ${expanded ? 'border-primary border-2' : ''} ${
      primaryImpactType === 'positive' ? 'border-l-4 border-l-green-500' : 
      primaryImpactType === 'negative' ? 'border-l-4 border-l-red-500' : ''
    }`}>
      <CardHeader className="pb-2">
        <ArticleHeader article={article} segmentId={segmentId} />
      </CardHeader>
      <CardContent>
        <ArticleCardSummary 
          article={article}
          segmentId={segmentId}
          expanded={expanded}
          highlights={articleHighlights}
          onAddHighlight={onAddHighlight}
        />

        {expanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-4">
            <ArticleCardActions 
              articleId={article.id}
              onShareArticle={handleShareArticle}
              onInviteToArticle={handleInviteToArticle}
            />
            
            <ArticleCitations articleId={article.id} />
            
            <ArticleCardTabs 
              article={article}
              segmentId={segmentId}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              comments={comments}
              highlights={articleHighlights}
              onAddComment={handleAddComment}
              onAddHighlight={onAddHighlight}
              onRemoveHighlight={onRemoveHighlight}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full text-primary hover:text-primary hover:bg-primary/10"
          onClick={onToggleExpand}
        >
          {expanded ? "Mostrar menos" : "Mostrar mais"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
