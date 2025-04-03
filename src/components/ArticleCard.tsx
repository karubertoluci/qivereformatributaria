
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/data/articles';
import { CommentType, HighlightType } from './results/types';
import ArticleHeader from './article/ArticleHeader';
import { useToast } from '@/components/ui/use-toast';
import ArticleCardContent from './article-card/ArticleCardContent';
import ArticleCardActions from './article-card/ArticleCardActions';
import { MessageSquare, ChevronDown, ChevronUp, Bookmark, BookmarkX } from 'lucide-react';
import CommentSection from './results/CommentSection';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import ArticleCardSummary from './article-card/ArticleCardSummary';
import { toast } from 'sonner';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  expanded: boolean;
  onToggleExpand: () => void;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
  isCompactView?: boolean;
  onOpenModal?: () => void;
  savedArticles?: string[];
  onToggleSaveArticle?: (articleId: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  segmentId, 
  expanded, 
  onToggleExpand,
  highlights = [], 
  onAddHighlight = () => {}, 
  onRemoveHighlight = () => {},
  isCompactView = false,
  onOpenModal = () => {},
  savedArticles = [],
  onToggleSaveArticle = () => {}
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const { toast: uiToast } = useToast();
  
  // Filter highlights for this article
  const articleHighlights = highlights.filter(h => h.articleId === article.id);

  // Identificar o tipo principal de impacto para o card
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  const primaryImpactType = hasNegativeImpact ? 'negative' : (hasPositiveImpact ? 'positive' : 'neutral');
  const isArticleSaved = savedArticles.includes(article.id);

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
    
    uiToast({
      title: "Comentário adicionado",
      description: "Seu comentário foi adicionado ao artigo."
    });
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href + '?article=' + article.id);
    
    uiToast({
      title: "Link copiado!",
      description: "O link para este artigo foi copiado para a área de transferência."
    });
  };
  
  const handleInviteToArticle = () => {
    uiToast({
      title: "Compartilhamento",
      description: "Funcionalidade de convite para artigo específico será implementada em breve."
    });
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSaveArticle(article.id);
    toast.success(isArticleSaved 
      ? "Artigo removido dos favoritos"
      : "Artigo salvo nos favoritos"
    );
  };
  
  // Compact view rendering
  if (isCompactView) {
    return (
      <Card 
        className={`mb-3 transition-all cursor-pointer hover:bg-muted/50 ${
          primaryImpactType === 'positive' ? 'border-l-4 border-l-green-500' : 
          primaryImpactType === 'negative' ? 'border-l-4 border-l-red-500' : ''
        } ${isArticleSaved ? 'border-r-4 border-r-primary' : ''}`}
        onClick={onOpenModal}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-semibold mb-1">{article.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {article.simplifiedText.substring(0, 120)}...
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={`ml-2 h-8 w-8 ${isArticleSaved ? 'text-primary' : ''}`}
              onClick={handleToggleSave}
              title={isArticleSaved ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              {isArticleSaved ? <BookmarkX className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Normal view rendering
  return (
    <Card 
      className={`mb-4 transition-all ${expanded ? 'border-primary border-2' : ''} ${
        primaryImpactType === 'positive' ? 'border-l-4 border-l-green-500' : 
        primaryImpactType === 'negative' ? 'border-l-4 border-l-red-500' : ''
      } ${isArticleSaved ? 'border-r-4 border-r-primary' : ''} hover:bg-muted/20 cursor-pointer`}
      onClick={onOpenModal}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <ArticleHeader article={article} segmentId={segmentId} />
          <Button
            size="icon"
            variant="ghost"
            className={`ml-2 ${isArticleSaved ? 'text-primary' : ''}`}
            onClick={handleToggleSave}
            title={isArticleSaved ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            {isArticleSaved ? <BookmarkX className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="text-sm text-foreground my-4">
          {article.simplifiedText.substring(0, 180) + "..."}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {segmentImpacts.slice(0, 2).map((impact, idx) => (
            <Badge 
              key={idx} 
              variant={impact.type === 'positive' ? "outline" : "secondary"}
              className={`text-xs ${impact.type === 'positive' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
            >
              {impact.description.substring(0, 60)}{impact.description.length > 60 ? '...' : ''}
            </Badge>
          ))}
          {segmentImpacts.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{segmentImpacts.length - 2} impactos
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 py-2 px-6">
        <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
          <div>
            Artigo {article.number} • Clique para ver detalhes
          </div>
          <div className="flex gap-2 items-center">
            {articleHighlights.length > 0 && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-highlighter text-amber-500">
                  <path d="m9 11-6 6v3h9l4-4"/>
                  <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
                </svg>
                {articleHighlights.length}
              </span>
            )}
            {comments.length > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {comments.length}
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
