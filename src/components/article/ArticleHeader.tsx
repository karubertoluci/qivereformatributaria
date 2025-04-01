
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowUp, ArrowDown } from 'lucide-react';
import { Article } from '@/data/articles';

interface ArticleHeaderProps {
  article: Article;
  segmentId: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, segmentId }) => {
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          {article.number}
        </CardTitle>
        <CardDescription className="text-lg font-medium mt-1 text-foreground">
          {article.title}
        </CardDescription>
      </div>
      <div className="flex gap-2">
        {hasPositiveImpact && (
          <Badge variant="outline" className="bg-positive text-positive-foreground flex gap-1">
            <ArrowUp className="h-4 w-4" /> Impacto Positivo
          </Badge>
        )}
        {hasNegativeImpact && (
          <Badge variant="outline" className="bg-negative text-negative-foreground flex gap-1">
            <ArrowDown className="h-4 w-4" /> Impacto Negativo
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ArticleHeader;
