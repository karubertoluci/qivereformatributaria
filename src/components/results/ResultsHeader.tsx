
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BarChart } from 'lucide-react';

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
          className="mb-4 md:mb-0 hover:bg-secondary flex items-center gap-1"
          onClick={onBackToSegments}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar para segmentos
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BarChart className="h-6 w-6 text-primary" />
          Resultados para {segment.name}
        </h2>
      </div>
    </div>
  );
};

export default ResultsHeader;
