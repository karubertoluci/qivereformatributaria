
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ImpactsSectionProps {
  hasCriticalImpacts: boolean;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

const ImpactsSection: React.FC<ImpactsSectionProps> = ({
  hasCriticalImpacts,
  positiveCount,
  negativeCount,
  neutralCount
}) => {
  if (!hasCriticalImpacts && positiveCount === 0 && negativeCount === 0 && neutralCount === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {hasCriticalImpacts && <AlertTriangle className="h-5 w-5 text-destructive" />}
          Impactos da Reforma Tributária
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="font-medium text-green-600 dark:text-green-400">Favoráveis</p>
            <p className="text-2xl font-bold">{positiveCount}</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <p className="font-medium text-amber-600 dark:text-amber-400">Neutros</p>
            <p className="text-2xl font-bold">{neutralCount}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="font-medium text-red-600 dark:text-red-400">Desfavoráveis</p>
            <p className="text-2xl font-bold">{negativeCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactsSection;
