
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/data/articles';
import { CommentType, HighlightType } from './results/types';
import ArticleHeader from './article/ArticleHeader';
import { useToast } from '@/components/ui/use-toast';
import ArticleCardContent from './article-card/ArticleCardContent';
import ArticleCardActions from './article-card/ArticleCardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, MessageSquare } from 'lucide-react';
import CommentSection from './results/CommentSection';
import ArticleUsefulness from './article/ArticleUsefulness';

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
      <CardContent className="p-6">
        {/* Article Header with Title and Relevance Indicator */}
        <ArticleHeader article={article} segmentId={segmentId} />
        
        {/* Article Content (only full content when expanded) */}
        {!expanded ? (
          <div className="text-sm text-foreground my-4">
            {article.simplifiedText.substring(0, 120) + "..."}
          </div>
        ) : (
          <>
            <ArticleCardContent
              article={article}
              segmentId={segmentId}
              highlights={articleHighlights}
              onAddHighlight={onAddHighlight}
            />
            
            {/* Actions Section (Share and Invite) */}
            <div className="mt-6 border-t border-border pt-4">
              <ArticleCardActions 
                articleId={article.id}
                onShareArticle={handleShareArticle}
                onInviteToArticle={handleInviteToArticle}
              />
            </div>
            
            {/* Tab Navigation for Content and Comments */}
            <div className="mt-6 border-t border-border pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="content" className="flex-1">
                    <Lightbulb className="h-4 w-4 mr-2" /> Conteúdo
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" /> 
                    Comentários {comments.length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center">{comments.length}</span>}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <ArticleUsefulness articleId={article.id} />
                </TabsContent>
                
                <TabsContent value="comments">
                  <CommentSection
                    articleId={article.id}
                    comments={comments}
                    onAddComment={handleAddComment}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </>
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
