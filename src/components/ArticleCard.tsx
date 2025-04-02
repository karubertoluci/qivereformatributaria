
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/data/articles';
import { Lightbulb, MessageSquare, Highlighter, Share2, ThumbsUp, ThumbsDown, UserPlus } from 'lucide-react';
import ArticleImportanceChart from './ArticleImportanceChart';
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommentSection from './results/CommentSection';
import HighlightedText from './results/HighlightedText';
import { CommentType, HighlightType } from './results/types';
import ArticleContent from './article/ArticleContent';
import ArticleHighlights from './article/ArticleHighlights';
import ArticleHeader from './article/ArticleHeader';
import ArticleCitations from './article/ArticleCitations';
import ArticleUsefulness from './article/ArticleUsefulness';
import { useToast } from '@/components/ui/use-toast';

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

  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  // Identificar o tipo principal de impacto para o card
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  const primaryImpactType = hasNegativeImpact ? 'negative' : (hasPositiveImpact ? 'positive' : 'neutral');

  const handleAddComment = (text: string) => {
    const newComment: CommentType = {
      id: uuidv4(),
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
      id: uuidv4(),
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
        <div className="text-sm text-foreground mb-4">
          {expanded ? (
            <HighlightedText 
              text={article.simplifiedText} 
              highlights={highlights}
              articleId={article.id}
              onAddHighlight={handleAddHighlight}
            />
          ) : (
            article.simplifiedText.substring(0, 120) + "..."
          )}
        </div>

        {!expanded && (
          <ArticleImportanceChart article={article} segmentId={segmentId} className="mt-2" />
        )}
        
        {expanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleShareArticle}
              >
                <Share2 className="h-3.5 w-3.5" />
                Compartilhar
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleInviteToArticle}
              >
                <UserPlus className="h-3.5 w-3.5" />
                Convidar para ler
              </Button>
            </div>
            
            <ArticleCitations articleId={article.id} />
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  <Lightbulb className="h-4 w-4 mr-2" /> Conteúdo
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" /> 
                  Comentários {comments.length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center">{comments.length}</span>}
                </TabsTrigger>
                <TabsTrigger value="highlights" className="flex-1">
                  <Highlighter className="h-4 w-4 mr-2" /> 
                  Destaques {highlights.length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center">{highlights.length}</span>}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-4">
                <ArticleContent 
                  article={article}
                  segmentId={segmentId}
                  highlights={highlights}
                  onAddHighlight={handleAddHighlight}
                />
                <ArticleUsefulness articleId={article.id} />
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <CommentSection
                  articleId={article.id}
                  comments={comments}
                  onAddComment={handleAddComment}
                />
              </TabsContent>

              <TabsContent value="highlights" className="mt-4">
                <ArticleHighlights 
                  highlights={highlights}
                  onRemoveHighlight={handleRemoveHighlight}
                />
              </TabsContent>
            </Tabs>
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
