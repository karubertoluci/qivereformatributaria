
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Book } from 'lucide-react';
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

  // Determine which book the article belongs to based on article ID
  const getArticleBook = () => {
    const articleId = article.id;
    // For demonstration purposes, assigning books based on article ID pattern
    if (articleId.includes('art1') || articleId.includes('art5') || articleId.includes('art9')) {
      return { name: 'CBS', color: 'bg-blue-100 text-blue-700' };
    } else if (articleId.includes('art2') || articleId.includes('art6')) {
      return { name: 'IBS', color: 'bg-amber-100 text-amber-700' };
    } else if (articleId.includes('art3') || articleId.includes('art7')) {
      return { name: 'IS', color: 'bg-purple-100 text-purple-700' };
    } else {
      return { name: 'IVA', color: 'bg-green-100 text-green-700' };
    }
  };
  
  const { text: importanceText, colorClass } = getImportanceLevel();
  const { name: bookName, color: bookColor } = getArticleBook();
  
  return (
    <div className="flex flex-col mb-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <span className="bg-primary/10 px-2 py-0.5 rounded text-primary">{article.number}</span>
          </CardTitle>
          
          {/* Book Badge */}
          <Badge variant="outline" className={cn("text-xs py-0.5 px-2 flex items-center gap-1", bookColor)}>
            <Book className="h-3 w-3" />
            {bookName}
          </Badge>
        </div>
        
        {/* Relevance Indicator */}
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
