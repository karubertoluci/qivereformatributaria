
import React from 'react';
import { Article } from '@/data/articles';
import { Lightbulb, Info, Tag, ArrowUp, ArrowDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import HighlightedText from '@/components/results/HighlightedText';
import ArticleImportanceChart from '@/components/ArticleImportanceChart';
import { HighlightType } from '@/components/results/types';

interface ArticleContentProps {
  article: Article;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ 
  article, 
  segmentId,
  highlights,
  onAddHighlight
}) => {
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-bold flex items-center mb-2">
          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
          Tradução Simplificada
        </h4>
        <div className="text-sm p-3 bg-secondary rounded-md">
          <HighlightedText 
            text={article.simplifiedText} 
            highlights={highlights}
            articleId={article.id}
            onAddHighlight={onAddHighlight}
          />
        </div>
      </div>
      
      <Separator />
      
      <ArticleImportanceChart article={article} segmentId={segmentId} className="my-4" />
      
      <Separator />
      
      <div>
        <h4 className="text-sm font-bold flex items-center mb-2">
          <Info className="h-4 w-4 mr-1 text-blue-500" />
          Texto Original
        </h4>
        <div className="text-xs p-3 bg-muted rounded-md">
          {article.originalText}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-sm font-bold flex items-center mb-3">
          <Tag className="h-4 w-4 mr-1 text-primary" />
          Impactos para seu Segmento
        </h4>
        <ul className="space-y-3">
          {segmentImpacts.map((impact, index) => (
            <li 
              key={index} 
              className={`text-sm p-3 rounded-md flex items-start ${
                impact.type === 'positive' ? 'bg-green-950 text-green-100 border-l-4 border-green-500' :
                impact.type === 'negative' ? 'bg-red-950 text-red-100 border-l-4 border-red-500' :
                'bg-gray-800 text-gray-100 border-l-4 border-gray-500'
              }`}
            >
              <div className="mt-0.5 mr-2">
                {impact.type === 'positive' && <ArrowUp className="h-4 w-4" />}
                {impact.type === 'negative' && <ArrowDown className="h-4 w-4" />}
                {impact.type === 'neutral' && <Info className="h-4 w-4" />}
              </div>
              <div>
                {impact.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleContent;
