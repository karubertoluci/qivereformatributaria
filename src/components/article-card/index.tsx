
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    borderClass = 'border-l-4 border-l-green-500'; // Favorável
    impactLabel = 'Favorável';
  } else if (impactType === 'negative') {
    borderClass = 'border-l-4 border-l-red-500'; // Desfavorável
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
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex justify-between items-start">
          {/* Simplified article number */}
          <div className="text-base font-medium flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Art. {article.number || 'N/A'}
          </div>
          
          {/* Badge group (favorability and relevance) */}
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
        
        {/* Book and Title (subtitle section) */}
        <div className="mt-1.5 flex flex-col text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{getSimplifiedBook()}</span>
          </div>
          
          {article.metadata?.titulo && (
            <p className="line-clamp-2 mt-0.5 text-left">
              {article.metadata.titulo}
            </p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-4 pb-4">
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
