
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
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          className="hover:bg-secondary flex items-center gap-1"
          onClick={onBackToSegments}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart className="h-6 w-6 text-primary" />
            Resultados para {segment.name}
          </h2>
          <p className="text-muted-foreground">
            Total: {positiveCount + negativeCount} artigos • 
            <span className="text-positive"> {positiveCount} positivos</span> • 
            <span className="text-negative"> {negativeCount} negativos</span>
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-1" size="sm">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Compartilhar</span>
        </Button>
        
        <Button className="flex items-center gap-1" size="sm">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Baixar PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default ResultsHeader;
