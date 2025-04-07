
import React from 'react';
import { Article } from '@/data/articles';
import { BookOpen, FileText } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArticleCardHeaderProps {
  article: Article;
  segmentId: string;
  isExpanded: boolean;
}

const ArticleCardHeader: React.FC<ArticleCardHeaderProps> = ({ 
  article, 
  segmentId,
  isExpanded 
}) => {
  const getImpactType = () => {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );

    // Check if there are any positive impacts for this segment
    const hasPositive = segmentImpacts.some(impact => impact.type === 'positive');
    
    // Check if there are any negative impacts for this segment
    const hasNegative = segmentImpacts.some(impact => impact.type === 'negative');
    
    if (hasPositive && hasNegative) return 'mixed';
    if (hasPositive) return 'positive';
    if (hasNegative) return 'negative';
    return 'neutral';
  };

  const impactType = getImpactType();
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start mb-1">
        <CardTitle className={`text-base font-medium flex items-center gap-1.5 ${isExpanded ? 'text-primary' : ''}`}>
          <FileText className={`h-4 w-4 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
          {article.title}
        </CardTitle>
        
        <Badge 
          variant={
            impactType === 'positive' ? 'default' : 
            impactType === 'negative' ? 'destructive' : 
            impactType === 'mixed' ? 'outline' : 'secondary'
          }
          className={
            impactType === 'positive' ? 'bg-green-500' : 
            impactType === 'negative' ? 'bg-red-500' : 
            impactType === 'mixed' ? 'border-orange-500 text-orange-500' : ''
          }
        >
          {impactType === 'positive' ? 'Favorável' : 
           impactType === 'negative' ? 'Desfavorável' : 
           impactType === 'mixed' ? 'Misto' : 'Neutro'}
        </Badge>
      </div>
      
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        <BookOpen className="h-3.5 w-3.5 mr-1" />
        <span>Livro {article.book}, Título {article.title}, Artigo {article.number}</span>
      </div>
    </div>
  );
};

export default ArticleCardHeader;
