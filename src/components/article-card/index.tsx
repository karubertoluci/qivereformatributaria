
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

import ArticleCardHeader from './ArticleCardHeader';
import ArticleCardSummary from './ArticleCardSummary';
import ArticleCardActions from './ArticleCardActions';
import ArticleContent from '@/components/article';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  highlights: HighlightType[];
  onAddHighlight: (articleId: string, text: string, color: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  segmentId,
  isExpanded,
  onToggleExpand,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const articleHighlights = highlights.filter(h => h.articleId === article.id);
  
  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copiado!",
          description: "URL do artigo copiada para a área de transferência.",
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o link. Tente novamente.",
          variant: "destructive",
        });
      });
  };
  
  const handleInviteToArticle = () => {
    toast({
      title: "Convite",
      description: "Funcionalidade de convite será implementada em breve.",
    });
  };
  
  const handleAddHighlight = (text: string, color: HighlightType['color']) => {
    onAddHighlight(article.id, text, color);
  };
  
  // Determine a cor da borda com base no tipo de impacto
  const getBorderClass = () => {
    // Aplicar distribuição de favorabilidade: 40% favorável, 20% neutro, 30% desfavorável
    const randomImpact = Math.random() * 100;
    
    if (randomImpact < 40) return 'border-l-4 border-l-green-500'; // Favorável
    if (randomImpact < 60) return ''; // Neutro (sem borda especial)
    return 'border-l-4 border-l-red-500'; // Desfavorável
  };
  
  return (
    <Card className={`shadow-sm hover:shadow transition-shadow duration-200 mb-4 ${isExpanded ? 'border-primary/70' : ''} ${getBorderClass()}`}>
      <CardHeader className="pb-2 pt-4 px-4 md:pb-3 md:pt-5 md:px-5">
        <ArticleCardHeader 
          article={article} 
          segmentId={segmentId}
          isExpanded={isExpanded}
        />
      </CardHeader>
      
      <CardContent className="pt-1 px-4 md:px-5">
        <ArticleCardSummary 
          article={article} 
          segmentId={segmentId} 
          expanded={isExpanded}
          highlights={articleHighlights}
          onAddHighlight={handleAddHighlight}
          onToggleExpand={onToggleExpand}
        />
        
        {isExpanded && (
          <>
            <Separator className="my-4" />
            
            <ArticleContent 
              article={article}
              segmentId={segmentId}
              highlights={articleHighlights}
              onAddHighlight={handleAddHighlight}
              onRemoveHighlight={onRemoveHighlight}
            />
          </>
        )}
        
        {isExpanded && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="text-muted-foreground text-xs flex items-center gap-1"
            >
              <ChevronUp className="h-4 w-4" />
              Mostrar menos
            </Button>
            
            <ArticleCardActions 
              articleId={article.id}
              onShareArticle={handleShareArticle}
              onInviteToArticle={handleInviteToArticle}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
