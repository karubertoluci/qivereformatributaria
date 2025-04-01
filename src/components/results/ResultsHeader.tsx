
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';

interface ResultsHeaderProps {
  segment: BusinessSegment;
  positiveCount: number;
  negativeCount: number;
  onBackToSegments: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  segment, 
  positiveCount, 
  negativeCount, 
  onBackToSegments 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <Button 
          variant="ghost" 
          className="mb-4 md:mb-0 hover:bg-secondary"
          onClick={onBackToSegments}
        >
          ← Voltar para segmentos
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold">
          Resultados para {segment.name}
        </h2>
      </div>
    </div>
  );
};

export default ResultsHeader;
