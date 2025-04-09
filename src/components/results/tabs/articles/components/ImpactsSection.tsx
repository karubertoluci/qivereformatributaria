
import React from 'react';
import { Article } from '@/data/articles';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ImpactsSectionProps {
  hasCriticalImpacts: boolean;
  relevantArticles: Article[];
  allArticles: Article[];
  segmentId: string;
  bookId: string | null;
  relevanceFilter: string | null;
}

const ImpactsSection: React.FC<ImpactsSectionProps> = ({
  hasCriticalImpacts,
  relevantArticles,
  allArticles,
  segmentId,
  bookId,
  relevanceFilter
}) => {
  if (!hasCriticalImpacts) {
    return null;
  }

  // Count critical articles
  const criticalCount = relevantArticles.filter(article => 
    article.impacts.some(impact => 
      impact.segments.includes(segmentId) && 
      impact.type === 'negative' && 
      (typeof impact.severity === 'string' ? 
        impact.severity === 'high' : 
        impact.severity >= 8)
    )
  ).length;

  const totalCritical = allArticles.filter(article => 
    article.impacts.some(impact => 
      impact.segments.includes(segmentId) && 
      impact.type === 'negative' && 
      (typeof impact.severity === 'string' ? 
        impact.severity === 'high' : 
        impact.severity >= 8)
    )
  ).length;

  return (
    <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Atenção aos impactos críticos</AlertTitle>
      <AlertDescription>
        {criticalCount === 1 ? (
          "Há 1 artigo com impacto crítico para o seu segmento nesta seleção."
        ) : (
          `Há ${criticalCount} artigos com impactos críticos para o seu segmento nesta seleção.`
        )}
        {criticalCount < totalCritical && (
          <span className="block mt-1 text-sm">
            {totalCritical - criticalCount} {totalCritical - criticalCount === 1 ? 'outro artigo crítico está' : 'outros artigos críticos estão'} fora dos filtros atuais.
          </span>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ImpactsSection;
