
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

import ArticleCardSummary from './ArticleCardSummary';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (articleId: string, text: string, color: HighlightType['color']) => void;
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
  
  const handleAddHighlight = (text: string, color: HighlightType['color']) => {
    onAddHighlight(article.id, text, color);
  };
  
  return (
    <Card className={cn("shadow-sm hover:shadow transition-shadow duration-200 mb-4", borderClass)}>
      <CardContent className="p-4 flex flex-col gap-2">
        {/* 1. Topo do card: Article number + Book */}
        <div className="flex justify-between items-center text-xs text-gray-600 font-medium">
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Art. {article.number || 'N/A'}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {getSimplifiedBook()}
          </span>
        </div>
        
        {/* 2. Bloco principal: Article text */}
        <p className="line-clamp-3 text-sm text-gray-800">
          {article.simplifiedText || 'Sem texto disponível'}
        </p>
        
        {/* 3. Badges: Impact and relevance */}
        <div className="flex gap-2 text-xs">
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
        
        {/* 4. Título: Article title */}
        {article.metadata?.titulo && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {article.metadata.titulo}
          </p>
        )}
        
        {/* 5. CTA: View article details */}
        <ArticleCardSummary 
          article={article} 
          segmentId={segmentId} 
          highlights={highlights}
          onAddHighlight={handleAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
