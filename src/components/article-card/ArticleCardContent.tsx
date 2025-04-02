
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { BookOpen, FileText, Tag } from 'lucide-react';
import HighlightedText from '@/components/results/HighlightedText';

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
  
  return (
    <div className="space-y-6 mt-4">
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
