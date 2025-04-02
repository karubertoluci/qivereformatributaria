
import React from 'react';
import { Tag, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { ArticleImpact } from '@/data/articles';

interface ArticleImpactListProps {
  impacts: ArticleImpact[];
  segmentId: string;
}

const ArticleImpactList: React.FC<ArticleImpactListProps> = ({ 
  impacts,
  segmentId 
}) => {
  const segmentImpacts = impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  return (
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
  );
};

export default ArticleImpactList;
