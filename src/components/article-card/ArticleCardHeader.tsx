
import React from 'react';
import { Article } from '@/data/articles';
import { FileText, Book } from 'lucide-react';
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
    // Apply favorability distribution: 40% favorable, 20% neutral, 30% unfavorable
    const randomImpact = Math.random() * 100;
    
    if (randomImpact < 40) return 'positive';
    if (randomImpact < 60) return 'neutral';
    return 'negative';
  };

  const impactType = getImpactType();
  
  // Get book information
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
  
  return (
    <div className="flex flex-col space-y-2">
      {/* Título do Artigo */}
      <div className="flex items-center space-x-2">
        <FileText className="h-5 w-5 text-gray-700" />
        <CardTitle className="text-base font-medium">
          Artigo {article.number}
        </CardTitle>
        
        {/* Impacto badge */}
        <Badge 
          className={cn(
            "ml-auto",
            impactType === 'positive' ? 'bg-green-500 hover:bg-green-600' : 
            impactType === 'negative' ? 'bg-red-500 hover:bg-red-600' : 
            'bg-gray-500 hover:bg-gray-600'
          )}
        >
          {impactType === 'positive' ? 'Favorável' : 
           impactType === 'negative' ? 'Desfavorável' : 
           'Neutro'}
        </Badge>
      </div>
      
      {/* Metadados: Livro e número do artigo */}
      <div className="flex items-center text-gray-600 text-sm">
        <Book className="h-4 w-4 mr-1" />
        <span>Livro {bookId}, Artigo {article.number}</span>
      </div>
    </div>
  );
};

export default ArticleCardHeader;
