
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';
import { BarChart, Share2, Download } from 'lucide-react';

interface ResultsHeaderProps {
  segment: BusinessSegment;
  positiveCount: number;
  negativeCount: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  segment, 
  positiveCount, 
  negativeCount
}) => {
  return (
    <div className="flex justify-between items-center mb-8 font-lexend">
      <div className="flex-1"></div>
      
      <div className="text-center mx-auto max-w-md sm:max-w-lg flex-1">
        <h2 className="text-xl font-bold flex items-center gap-2 justify-center">
          <BarChart className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">Resultados para {segment.name}</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Total: {positiveCount + negativeCount} artigos • 
          <span className="text-positive"> {positiveCount} positivos</span> • 
          <span className="text-negative"> {negativeCount} negativos</span>
        </p>
      </div>
      
      <div className="flex items-center gap-2 flex-1 justify-end">
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
