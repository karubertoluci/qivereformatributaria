
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import ImpactAlert from '@/components/report/charts/ImpactAlert';

interface ImpactsSectionProps {
  hasCriticalImpacts: boolean;
  showAllArticles: boolean;
  allArticles: any[];
  relevantArticles: any[];
  segmentId: string;
  bookId: string | null;
}

const ImpactsSection: React.FC<ImpactsSectionProps> = ({
  hasCriticalImpacts,
  showAllArticles,
  allArticles,
  relevantArticles,
  segmentId,
  bookId
}) => {
  return (
    <div className="w-full">
      {hasCriticalImpacts && (
        <ImpactAlert
          message="Atenção: Identificamos impactos altamente desfavoráveis para seu segmento. Recomendamos analisar com cuidado os artigos marcados como 'Muito relevante' com impacto desfavorável."
        />
      )}
      
      <ImpactDistributionChart 
        articles={showAllArticles ? allArticles : relevantArticles} 
        segmentId={segmentId}
        bookId={bookId}
      />
    </div>
  );
};

export default ImpactsSection;
