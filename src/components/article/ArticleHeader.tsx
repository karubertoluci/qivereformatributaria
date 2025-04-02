
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { Article } from '@/data/articles';
import { cn } from '@/lib/utils';

interface ArticleHeaderProps {
  article: Article;
  segmentId: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, segmentId }) => {
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  // Calculate importance score based on impact types and relevance
  const calculateImportanceScore = () => {
    let score = 0;
    
    // Base score from number of impacts
    score += segmentImpacts.length * 10;
    
    // Additional points based on impact type
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') score += 15;
      if (impact.type === 'negative') score += 20; // Negative impacts slightly more important
    });
    
    return Math.min(score, 100); // Cap at 100
  };
  
  const importanceScore = calculateImportanceScore();
  
  // Get importance level text and color
  const getImportanceLevel = () => {
    if (importanceScore >= 75) return { text: 'Crítico', colorClass: 'bg-red-100 text-red-700' };
    if (importanceScore >= 50) return { text: 'Muito Importante', colorClass: 'bg-orange-100 text-orange-700' };
    if (importanceScore >= 25) return { text: 'Importante', colorClass: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Informativo', colorClass: 'bg-green-100 text-green-700' };
  };
  
  const { text: importanceText, colorClass } = getImportanceLevel();
  
  return (
    <div className="flex flex-col mb-1">
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          <span className="bg-primary/10 px-2 py-0.5 rounded text-primary">{article.number}</span>
        </CardTitle>
        
        {/* Relevance Indicator - now smaller and next to title */}
        <Badge variant="outline" className={cn("text-xs py-0.5 px-2", colorClass)}>
          {importanceText}
        </Badge>
      </div>
      
      <CardDescription className="text-lg font-medium mt-1 text-foreground">
        {article.title}
      </CardDescription>
    </div>
  );
};

export default ArticleHeader;
