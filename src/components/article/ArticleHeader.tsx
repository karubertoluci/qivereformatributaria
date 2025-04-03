
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Book, Info, AlertTriangle, CheckCircle } from 'lucide-react';
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
    if (importanceScore >= 75) return { 
      text: 'Muito relevante', 
      colorClass: 'bg-red-100 text-red-700',
      icon: <AlertTriangle className="h-3 w-3" /> 
    };
    if (importanceScore >= 50) return { 
      text: 'Moderadamente relevante', 
      colorClass: 'bg-orange-100 text-orange-700',
      icon: <Info className="h-3 w-3" />
    };
    if (importanceScore >= 25) return { 
      text: 'Pouco relevante', 
      colorClass: 'bg-yellow-100 text-yellow-700',
      icon: <Info className="h-3 w-3" />
    };
    return { 
      text: 'Irrelevante', 
      colorClass: 'bg-green-100 text-green-700',
      icon: <CheckCircle className="h-3 w-3" />
    };
  };

  // Determine which book the article belongs to based on article ID or number
  const getArticleBook = () => {
    // For demonstration purposes, determining book based on article ID or number logic
    // In a real implementation, this would come from the article metadata
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                      parseInt(article.id.replace(/\D/g, ''));
    
    if (articleNum <= 180) {
      return { id: 'I', name: 'CBS', color: 'bg-blue-100 text-blue-700' };
    } else if (articleNum <= 300) {
      return { id: 'II', name: 'IBS', color: 'bg-amber-100 text-amber-700' };
    } else {
      return { id: 'III', name: 'IS', color: 'bg-purple-100 text-purple-700' };
    }
  };
  
  const { text: importanceText, colorClass, icon: importanceIcon } = getImportanceLevel();
  const { id: bookId, name: bookName, color: bookColor } = getArticleBook();
  
  // Overall impact type (positive, negative, neutral)
  const getOverallImpact = () => {
    const positiveCount = segmentImpacts.filter(impact => impact.type === 'positive').length;
    const negativeCount = segmentImpacts.filter(impact => impact.type === 'negative').length;
    
    if (positiveCount > negativeCount) {
      return { type: 'Favorável', color: 'bg-green-100 text-green-700' };
    } else if (negativeCount > positiveCount) {
      return { type: 'Desfavorável', color: 'bg-red-100 text-red-700' };
    } else {
      return { type: 'Neutro', color: 'bg-gray-100 text-gray-700' };
    }
  };
  
  const { type: impactType, color: impactColor } = getOverallImpact();
  
  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <span className="bg-primary/10 px-2 py-0.5 rounded text-primary">{article.number}</span>
          </CardTitle>
          
          {/* Book Badge */}
          <Badge variant="outline" className={cn("text-xs py-0.5 px-2 flex items-center gap-1", bookColor)}>
            <Book className="h-3 w-3" />
            Livro {bookId}: {bookName}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          {/* Impact Badge */}
          <Badge variant="outline" className={cn("text-xs py-0.5 px-2", impactColor)}>
            {impactType}
          </Badge>
          
          {/* Relevance Badge */}
          <Badge variant="outline" className={cn("text-xs py-0.5 px-2 flex items-center gap-1", colorClass)}>
            {importanceIcon}
            {importanceText}
          </Badge>
        </div>
      </div>
      
      <CardDescription className="text-lg font-medium mt-1 text-foreground">
        {article.title}
      </CardDescription>
    </div>
  );
};

export default ArticleHeader;
