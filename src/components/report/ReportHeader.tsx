
import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';

interface ReportHeaderProps {
  segment: BusinessSegment;
  companyName?: string;
  onBackToSegments?: () => void;
  showBackButton?: boolean;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ 
  segment, 
  companyName,
  onBackToSegments,
  showBackButton = true
}) => {
  const displayName = companyName || "sua empresa";
  
  return (
    <div className="flex flex-col space-y-4 mb-8 print:mb-6 border-b pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="/lovable-uploads/3a0e3d3c-ea95-4482-8c76-047d5459213e.png" 
            alt="Qive Reforma Tributária" 
            className="h-10 mr-3"
          />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Relatório Personalizado</span>
            <h1 className="text-lg font-bold text-primary">Reforma Tributária 2025</h1>
          </div>
        </div>
        
        {showBackButton && onBackToSegments && (
          <Button 
            variant="outline" 
            className="hover:bg-secondary flex items-center gap-1"
            onClick={onBackToSegments}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para segmentos
          </Button>
        )}
      </div>
      
      <div>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">
            Relatório para {displayName}
          </h2>
        </div>
        <p className="text-muted-foreground mt-1">
          Análise de impactos da reforma tributária no segmento <span className="font-medium">{segment.name}</span>
        </p>
      </div>
    </div>
  );
};

export default ReportHeader;
