
import React from 'react';
import { Article } from '@/data/articles';
import { AlertTriangle } from 'lucide-react';

interface ImpactsSectionProps {
  hasCriticalImpacts: boolean;
  relevantArticles: Article[];
  allArticles: Article[];
  segmentId: string;
  bookId: string;
  relevanceFilter: string | null;
}

const ImpactsSection: React.FC<ImpactsSectionProps> = ({
  hasCriticalImpacts,
  relevantArticles,
  segmentId
}) => {
  // Count critical articles
  const criticalArticles = relevantArticles.filter(article => 
    article.impacts.some(impact => {
      // Handle both string and number severity types
      if (typeof impact.severity === 'number') {
        return impact.severity >= 8 && impact.segments.includes(segmentId);
      } else if (typeof impact.severity === 'string') {
        return impact.severity === 'high' && impact.segments.includes(segmentId);
      }
      return false;
    })
  );
  
  if (!hasCriticalImpacts) return null;
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-medium text-amber-800">Atenção aos impactos críticos</h3>
          <p className="text-amber-700 text-sm mt-1">
            {criticalArticles.length} artigo{criticalArticles.length !== 1 ? 's' : ''} com impacto crítico 
            para o seu negócio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactsSection;
