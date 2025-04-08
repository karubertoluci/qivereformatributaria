
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

import ArticleCardHeader from './ArticleCardHeader';
import ArticleCardSummary from './ArticleCardSummary';

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
  
  // Impacto como borda esquerda colorida
  const getBorderClass = () => {
    // Aplicar distribuição de favorabilidade: 40% favorável, 20% neutro, 30% desfavorável
    const randomImpact = Math.random() * 100;
    
    if (randomImpact < 40) return 'border-l-4 border-l-green-500'; // Favorável
    if (randomImpact < 60) return ''; // Neutro (sem borda especial)
    return 'border-l-4 border-l-red-500'; // Desfavorável
  };
  
  return (
    <Card className={`shadow-sm hover:shadow transition-shadow duration-200 mb-4 ${getBorderClass()}`}>
      <CardHeader className="pb-2 pt-4 px-4">
        <ArticleCardHeader 
          article={article} 
          segmentId={segmentId}
          isExpanded={isExpanded}
        />
      </CardHeader>
      
      <CardContent className="pt-0 px-4">
        <ArticleCardSummary 
          article={article} 
          segmentId={segmentId} 
          expanded={isExpanded}
          highlights={articleHighlights}
          onAddHighlight={handleAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
          onToggleExpand={onToggleExpand}
        />
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
