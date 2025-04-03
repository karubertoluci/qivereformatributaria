import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { BookOpen, FileText, Tag, Book, Bookmark, Layers } from 'lucide-react';
import HighlightedText from '@/components/results/HighlightedText';
import { Badge } from '@/components/ui/badge';

interface ArticleCardContentProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
}

const ArticleCardContent: React.FC<ArticleCardContentProps> = ({
  article,
  segmentId,
  highlights,
  onAddHighlight
}) => {
  // Filter impacts for this segment
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  // Get book and metadata information
  const getBookInfo = () => {
    // Determine book from article ID or metadata
    const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
    let bookId = 'I';
    if (id % 4 === 0) bookId = 'II';
    if (id % 4 === 1) bookId = 'I';
    if (id % 4 === 2) bookId = 'III';
    if (id % 4 === 3) bookId = 'IV';
    
    let bookTitle = '';
    switch(bookId) {
      case 'I': bookTitle = 'CBS'; break;
      case 'II': bookTitle = 'IBS'; break;
      case 'III': bookTitle = 'IS'; break;
      case 'IV': bookTitle = 'Disposições Finais'; break;
    }
    
    // Use metadata if available, otherwise use computed values
    return {
      id: article.metadata?.bookId || bookId,
      title: article.metadata?.bookTitle || bookTitle,
    };
  };
  
  const { id: bookId, title: bookTitle } = getBookInfo();
  
  return (
    <div className="space-y-6 mt-4">
      {/* Article Metadata */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Book Badge */}
        <Badge variant="outline" className="bg-blue-100 text-blue-700 flex items-center gap-1">
          <Book className="h-3 w-3" />
          Livro {bookId}: {bookTitle}
        </Badge>
        
        {/* Other metadata badges if available */}
        {article.metadata?.title && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            Título: {article.metadata.title}
          </Badge>
        )}
        
        {article.metadata?.chapter && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <Bookmark className="h-3 w-3" />
            Capítulo: {article.metadata.chapter}
          </Badge>
        )}
        
        {article.metadata?.section && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <Layers className="h-3 w-3" />
            Seção: {article.metadata.section}
          </Badge>
        )}
      </div>
      
      {/* Original Text */}
      <div>
        <h4 className="text-sm font-bold flex items-center mb-2">
          <FileText className="h-4 w-4 mr-1 text-blue-500" />
          Texto Original da Lei
        </h4>
        <div className="text-xs p-3 bg-muted rounded-md border border-muted">
          {article.originalText}
        </div>
      </div>
      
      {/* Simplified Translation */}
      <div>
        <h4 className="text-sm font-bold flex items-center mb-2">
          <BookOpen className="h-4 w-4 mr-1 text-amber-500" />
          Tradução Simplificada
        </h4>
        <div className="text-sm p-3 bg-secondary rounded-md border border-secondary">
          <HighlightedText 
            text={article.simplifiedText} 
            highlights={highlights}
            articleId={article.id}
            onAddHighlight={onAddHighlight}
          />
        </div>
      </div>
      
      {/* Impacts for Segment */}
      <div>
        <h4 className="text-sm font-bold flex items-center mb-3">
          <Tag className="h-4 w-4 mr-1 text-primary" />
          Impactos para seu Segmento
        </h4>
        
        <ul className="space-y-3">
          {segmentImpacts.map((impact, index) => {
            const typeClass = impact.type === 'positive' 
              ? 'bg-green-950 text-green-100 border-l-4 border-green-500' 
              : impact.type === 'negative'
                ? 'bg-red-950 text-red-100 border-l-4 border-red-500'
                : 'bg-gray-800 text-gray-100 border-l-4 border-gray-500';
              
            return (
              <li 
                key={index} 
                className={`text-sm p-3 rounded-md flex items-start ${typeClass}`}
              >
                <div>{impact.description}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ArticleCardContent;
