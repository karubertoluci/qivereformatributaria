
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
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, segmentId, expanded, onToggleExpand }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("content");
  const { toast } = useToast();

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

  const handleAddHighlight = (text: string, color: HighlightType['color']) => {
    const newHighlight: HighlightType = {
      id: crypto.randomUUID(),
      text,
      color,
      articleId: article.id
    };
    setHighlights([...highlights, newHighlight]);
    
    toast({
      title: "Texto destacado",
      description: "O texto selecionado foi destacado com sucesso."
    });
  };
  
  const handleRemoveHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };
  
  const handleShareArticle = () => {
    // This would integrate with the share API or a modal in a real app
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
          highlights={highlights}
          onAddHighlight={handleAddHighlight}
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
              highlights={highlights}
              onAddComment={handleAddComment}
              onAddHighlight={handleAddHighlight}
              onRemoveHighlight={handleRemoveHighlight}
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
