
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Download, Share2, RefreshCw } from 'lucide-react';
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
}) => {
  const navigate = useNavigate();
  const displayName = companyName || "sua empresa";
  
  const handleBackToHome = () => {
    // Limpar localStorage quando voltar para home
    localStorage.removeItem('selectedSegment');
    localStorage.removeItem('cnae');
    // Navegar para a página inicial
    navigate('/');
  };
  
  return (
    <div className="flex flex-col space-y-4 mb-8 print:mb-6 pb-6 bg-gradient-to-r from-rose-50 to-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img 
            alt="Qive Reforma Tributária" 
            className="h-10" 
            src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
          />
        </Link>
        
        {/* Centered text with truncation */}
        <div className="flex flex-col text-center mx-auto max-w-md sm:max-w-lg">
          <h2 className="text-xl font-bold flex items-center gap-2 justify-center">
            <FileText className="h-4 w-4 shrink-0 text-rose-500" />
            <span className="truncate">Relatório para {displayName}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Análise de impactos da reforma tributária no segmento <span className="font-medium">{segment.name}</span>
          </p>
        </div>
        
        {/* Action buttons */}
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
            className="flex items-center gap-1 h-8 px-2 sm:px-3 bg-rose-500 hover:bg-rose-600"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline text-xs">Baixar PDF</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 h-8 px-2 sm:px-3"
            onClick={handleBackToHome}
          >
            <RefreshCw className="h-3 w-3" />
            <span className="hidden sm:inline text-xs">Novo relatório</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
