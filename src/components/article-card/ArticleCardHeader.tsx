
import React from 'react';
import { Article } from '@/data/articles';
import { FileText, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ArticleCardHeaderProps {
  article: Article;
  segmentId: string;
}

const ArticleCardHeader: React.FC<ArticleCardHeaderProps> = ({ 
  article, 
  segmentId 
}) => {
  // Determine impact type for the segment
  const getImpactType = () => {
    // Apply favorability distribution: 40% favorable, 20% neutral, 30% unfavorable
    const randomImpact = Math.random() * 100;
    
    if (randomImpact < 40) return { type: 'positive', label: 'Favorável', color: 'bg-green-100 text-green-700 border-green-200' };
    if (randomImpact < 60) return { type: 'neutral', label: 'Neutro', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    return { type: 'negative', label: 'Desfavorável', color: 'bg-red-100 text-red-700 border-red-200' };
  };

  const { type: impactType, label: impactLabel, color: impactColor } = getImpactType();
  
  // Get relevance level
  const getRelevanceInfo = () => {
    const randomRelevance = Math.random() * 100;
    
    if (randomRelevance < 40) {
      return { label: 'Irrelevante', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    } else if (randomRelevance < 50) {
      return { label: 'Pouco relevante', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    } else if (randomRelevance < 90) {
      return { label: 'Moderadamente relevante', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    } else {
      return { label: 'Muito relevante', color: 'bg-green-100 text-green-700 border-green-200' };
    }
  };
  
  const { label: relevanceLabel, color: relevanceColor } = getRelevanceInfo();
  
  // Simplify book display
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
  
  return (
    <div className="flex flex-col space-y-2">
      {/* Header with article number and impact badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-base font-medium">
            Art. {article.number}
          </span>
        </div>
        
        <div className="flex gap-1.5">
          <Badge variant="outline" className={cn("text-xs py-0.5 px-2", impactColor)}>
            {impactLabel}
          </Badge>
          
          <Badge variant="outline" className={cn("text-xs py-0.5 px-2", relevanceColor)}>
            {relevanceLabel}
          </Badge>
        </div>
      </div>
      
      {/* Book and title info */}
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
    </div>
  );
};

export default ArticleCardHeader;
