
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';
import { FileText, Share2, Download, RefreshCw } from 'lucide-react';

interface ResultsHeaderProps {
  segment: BusinessSegment;
  positiveCount: number;
  negativeCount: number;
  companyName?: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  segment,
  positiveCount,
  negativeCount,
  companyName: propCompanyName
}) => {
  const [displayName, setDisplayName] = useState<string>(propCompanyName || "Empresa");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Try to get company name from localStorage
    const storedCompanyName = localStorage.getItem('companyName');
    const companyData = localStorage.getItem('companyData');
    
    if (storedCompanyName) {
      setDisplayName(storedCompanyName);
      console.log('Nome da empresa encontrado no localStorage:', storedCompanyName);
    } else if (companyData) {
      try {
        const parsedData = JSON.parse(companyData);
        if (parsedData.razaoSocial || parsedData.razao_social || parsedData.nomeFantasia || parsedData.nome_fantasia) {
          // Consider both camelCase and snake_case keys
          const name = parsedData.razaoSocial || parsedData.razao_social || 
                       parsedData.nomeFantasia || parsedData.nome_fantasia;
          setDisplayName(name);
          console.log('Nome da empresa extraído dos dados da empresa:', name);
          
          // Store it in localStorage for future reference
          localStorage.setItem('companyName', name);
        }
      } catch (error) {
        console.error('Erro ao analisar os dados da empresa:', error);
      }
    }
  }, [propCompanyName]);
  
  const handleBackToHome = () => {
    // Clear localStorage when returning to home
    localStorage.removeItem('selectedSegment');
    localStorage.removeItem('cnae');
    // Navigate to the home page
    navigate('/');
  };
  
  return <div className="py-4 border-b border-gray-200 bg-zinc-50">
      <div className="container mx-auto flex justify-between items-center mb-0 font-lexend px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" alt="Qive Reforma Tributária" className="h-10" />
        </Link>
        
        {/* Center content with file icon, title and subtitle */}
        <div className="text-center mx-auto max-w-md sm:max-w-lg flex flex-col items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 justify-center">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <span className="truncate">Relatório para {displayName}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Análise de impactos da reforma tributária no segmento {segment.name}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1 h-8 px-2 sm:px-3">
            <Share2 className="h-3 w-3" />
            <span className="hidden sm:inline text-xs">Compartilhar</span>
          </Button>
          
          <Button size="sm" className="flex items-center gap-1 h-8 px-2 sm:px-3 bg-orange-500 hover:bg-orange-600">
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline text-xs">Baixar PDF</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1 h-8 px-2 sm:px-3" onClick={handleBackToHome}>
            <RefreshCw className="h-3 w-3" />
            <span className="hidden sm:inline text-xs">Novo relatório</span>
          </Button>
        </div>
      </div>
    </div>;
};

export default ResultsHeader;
