
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BarChart, Share2, Download } from 'lucide-react';

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
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          className="hover:bg-secondary flex items-center gap-1"
          onClick={onBackToSegments}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="max-w-md sm:max-w-lg">
          <h2 className="text-xl font-bold flex items-center gap-2 truncate">
            <BarChart className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">Resultados para {segment.name}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Total: {positiveCount + negativeCount} artigos • 
            <span className="text-positive"> {positiveCount} positivos</span> • 
            <span className="text-negative"> {negativeCount} negativos</span>
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 h-8 px-2 sm:px-3"
        >
          <Share2 className="h-3 w-3" />
          <span className="hidden sm:inline text-xs">Compartilhar</span>
        </Button>
        
        <Button 
          size="sm"
          className="flex items-center gap-1 h-8 px-2 sm:px-3"
        >
          <Download className="h-3 w-3" />
          <span className="hidden sm:inline text-xs">Baixar PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default ResultsHeader;
