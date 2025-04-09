
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType, HighlightColor } from '@/components/results/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

import ArticleCardSummary from './ArticleCardSummary';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (articleId: string, text: string, color: HighlightColor) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  // Determine impact type for card border
  const getImpactType = () => {
    const randomImpact = Math.random() * 100;
    
    if (randomImpact < 40) return 'positive';
    if (randomImpact < 60) return 'neutral';
    return 'negative';
  };
  
  const impactType = getImpactType();
  
  let borderClass = '';
  let impactLabel = '';
  
  if (impactType === 'positive') {
    borderClass = 'border-l-4 border-l-green-500'; 
    impactLabel = 'Favorável';
  } else if (impactType === 'negative') {
    borderClass = 'border-l-4 border-l-red-500'; 
    impactLabel = 'Desfavorável';
  } else {
    impactLabel = 'Neutro';
  }
  
  // Apply relevance distribution
  const relevanceRandom = Math.random() * 100;
  let relevanceText = '';
  let relevanceColor = '';
  
  if (relevanceRandom < 40) {
    relevanceText = 'Irrelevante';
    relevanceColor = 'bg-gray-50 text-gray-700 border-gray-200';
  } else if (relevanceRandom < 50) {
    relevanceText = 'Pouco relevante';
    relevanceColor = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (relevanceRandom < 90) {
    relevanceText = 'Moderadamente relevante';
    relevanceColor = 'bg-amber-50 text-amber-700 border-amber-200';
  } else {
    relevanceText = 'Muito relevante';
    relevanceColor = 'bg-green-50 text-green-700 border-green-200';
  }
  
  // Get simplified book format
  const getSimplifiedBook = () => {
    if (article.metadata?.bookId) {
      return `Livro ${article.metadata.bookId}`;
    }
    if (article.metadata?.livro) {
      return `Livro ${article.metadata.livro}`;
    }
    const articleNum = parseInt((article.number || '').replace(/\D/g, '')) || 0;
    if (articleNum <= 180) return 'Livro I';
    if (articleNum <= 300) return 'Livro II';
    return 'Livro III';
  };
  
  const articleHighlights = highlights.filter(h => h.articleId === article.id);
  
  const handleAddHighlight = (text: string, color: HighlightColor) => {
    onAddHighlight(article.id, text, color);
  };
  
  return (
    <Card className={cn("shadow-sm hover:shadow transition-shadow duration-200 mb-4", borderClass)}>
      <CardContent className="p-4 flex flex-col h-full">
        {/* Cabeçalho com número do artigo e badges */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Art. {article.number || 'N/A'}</span>
          </div>
          
          <div className="flex gap-1.5">
            <Badge 
              variant={impactType === 'positive' ? 'default' : impactType === 'negative' ? 'destructive' : 'secondary'} 
              className={impactType === 'positive' ? 'bg-green-500 text-xs py-0.5' : 
                        impactType === 'negative' ? 'bg-red-500 text-xs py-0.5' : 
                        'text-xs py-0.5'}
            >
              {impactLabel}
            </Badge>
            
            <Badge variant="outline" className={`text-xs py-0.5 ${relevanceColor}`}>
              {relevanceText}
            </Badge>
          </div>
        </div>
        
        {/* Informação sobre o livro - compacta */}
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
          <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{getSimplifiedBook()}</span>
        </div>
        
        {/* CONTEÚDO PRINCIPAL: Texto do artigo (elemento mais importante) */}
        <div className="flex-grow">
          <p className="text-sm text-gray-800 font-medium mb-4 line-clamp-4">
            {article.simplifiedText || 'Sem texto disponível'}
          </p>
        </div>
        
        {/* Botão CTA na parte inferior */}
        <ArticleCardSummary 
          article={article} 
          segmentId={segmentId} 
          highlights={articleHighlights}
          onAddHighlight={handleAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
