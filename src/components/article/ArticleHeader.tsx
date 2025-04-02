
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowUp, ArrowDown, FileText } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          <span className="bg-primary/10 px-2 py-0.5 rounded text-primary">{article.number}</span>
        </CardTitle>
        <CardDescription className="text-lg font-medium mt-1 text-foreground">
          {article.title}
        </CardDescription>
      </div>
      <div className="flex gap-2">
        {hasPositiveImpact && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex gap-1">
            <ArrowUp className="h-4 w-4" /> Impacto Positivo
          </Badge>
        )}
        {hasNegativeImpact && (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex gap-1">
            <ArrowDown className="h-4 w-4" /> Impacto Negativo
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ArticleHeader;
