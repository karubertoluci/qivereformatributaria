
import React from 'react';
import { Article } from '@/data/articles';
import { FileText, Book, Bookmark, Layers } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
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
  
  // Get book information
  const getBookInfo = () => {
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                      parseInt(article.id.replace(/\D/g, ''));
    
    if (articleNum <= 180) {
      return { id: 'I', title: 'CBS', color: 'bg-blue-100 text-blue-700' };
    } else if (articleNum <= 300) {
      return { id: 'II', title: 'IBS', color: 'bg-amber-100 text-amber-700' };
    } else {
      return { id: 'III', title: 'IS', color: 'bg-purple-100 text-purple-700' };
    }
  };
  
  const { id: bookId, title: bookTitle, color: bookColor } = getBookInfo();
  
  // Get metadata (chapter, section, subsection)
  const chapter = article.metadata?.chapter || 'Capítulo 1';
  const section = article.metadata?.section || 'Seção I';
  const subsection = article.metadata?.subsection;
  
  return (
    <div className="flex flex-col space-y-2">
      {/* Header with title and impact badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">
            Artigo {article.number}
          </CardTitle>
        </div>
        
        <Badge variant="outline" className={cn("text-xs py-0.5 px-2", impactColor)}>
          {impactLabel}
        </Badge>
      </div>
      
      {/* Book info */}
      <div className="flex flex-wrap gap-2 mt-1">
        <Badge variant="outline" className={cn("text-xs py-0.5 px-2 flex items-center gap-1", bookColor)}>
          <Book className="h-3 w-3" />
          Livro {bookId}: {bookTitle}
        </Badge>
        
        <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2 flex items-center gap-1">
          <Bookmark className="h-3 w-3" />
          {chapter}
        </Badge>
        
        <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2 flex items-center gap-1">
          <Layers className="h-3 w-3" />
          {section}
        </Badge>
        
        {subsection && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {subsection}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ArticleCardHeader;
