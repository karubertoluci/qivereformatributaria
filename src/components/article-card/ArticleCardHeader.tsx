
import React from 'react';
import { Article } from '@/data/articles';
import { BookOpen, FileText, Book, Bookmark, Layers } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  // Get impact type for the segment
  const getImpactType = () => {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );

    // Apply favorability distribution: 40% favorable, 20% neutral, 30% unfavorable
    const randomImpact = Math.random() * 100;
    
    if (randomImpact < 40) return 'positive';
    if (randomImpact < 60) return 'neutral';
    return 'negative';
  };

  const impactType = getImpactType();
  
  // Get book information from article number
  const getBookInfo = () => {
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                      parseInt(article.id.replace(/\D/g, ''));
    
    let bookId = 'I';
    let bookTitle = 'CBS';
    
    if (articleNum > 300) {
      bookId = 'III';
      bookTitle = 'IS';
    } else if (articleNum > 180) {
      bookId = 'II';
      bookTitle = 'IBS';
    }
    
    return { id: bookId, title: bookTitle };
  };
  
  const { id: bookId, title: bookTitle } = getBookInfo();
  
  // Get metadata (chapter, section, subsection)
  const chapter = article.metadata?.chapter || 'Capítulo 1';
  const section = article.metadata?.section || 'Seção I';
  const subsection = article.metadata?.subsection;
  
  // Determine relevance based on distribution
  // 40% - Irrelevante, 10% - Pouco Relevante, 40% - Moderamente Relevante, 10% - Muito relevante
  const getRelevanceInfo = () => {
    const random = Math.random() * 100;
    
    if (random < 40) return { level: 'Irrelevante', color: 'bg-green-100 text-green-700' };
    if (random < 50) return { level: 'Pouco relevante', color: 'bg-yellow-100 text-yellow-700' };
    if (random < 90) return { level: 'Moderadamente relevante', color: 'bg-orange-100 text-orange-700' };
    return { level: 'Muito relevante', color: 'bg-red-100 text-red-700' };
  };
  
  const { level: relevanceLevel, color: relevanceColor } = getRelevanceInfo();
  
  return (
    <div className="flex flex-col space-y-2">
      {/* Article Number and Title */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Artigo {article.number}
          </Badge>
          
          <CardTitle className={`text-base font-medium ${isExpanded ? 'text-primary' : ''}`}>
            {article.title}
          </CardTitle>
        </div>
      </div>
      
      {/* Metadata row: Book, Chapter, Section */}
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline" className="bg-blue-100 text-blue-700 flex items-center gap-1">
          <Book className="h-3 w-3" />
          Livro {bookId}: {bookTitle}
        </Badge>
        
        <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
          <Bookmark className="h-3 w-3" />
          {chapter}
        </Badge>
        
        <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
          <Layers className="h-3 w-3" />
          {section}
        </Badge>
        
        {subsection && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {subsection}
          </Badge>
        )}
      </div>
      
      {/* Impact and Relevance row */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant="outline" 
          className={cn(
            impactType === 'positive' ? 'bg-green-100 text-green-700' : 
            impactType === 'negative' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          )}
        >
          Impacto: {impactType === 'positive' ? 'Favorável' : 
                   impactType === 'negative' ? 'Desfavorável' : 'Neutro'}
        </Badge>
        
        <Badge variant="outline" className={relevanceColor}>
          Relevância: {relevanceLevel}
        </Badge>
      </div>
    </div>
  );
};

export default ArticleCardHeader;
