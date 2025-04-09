
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BusinessSegment } from '@/data/segments';
import { Button } from '@/components/ui/button';
import { Share2, Download, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ResultsHeaderProps {
  segment: BusinessSegment;
  positiveCount: number;
  negativeCount: number;
  companyName?: string;
  onCloseClick: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  segment,
  positiveCount,
  negativeCount,
  companyName: propCompanyName,
  onCloseClick
}) => {
  const [displayName, setDisplayName] = useState<string>(propCompanyName || "Empresa");
  
  useEffect(() => {
    // Try to get company name from different sources in order of priority
    const storedCompanyName = localStorage.getItem('companyName');
    const companyData = localStorage.getItem('companyData');
    const formData = localStorage.getItem('formData');
    
    if (propCompanyName) {
      setDisplayName(propCompanyName);
    }
    else if (storedCompanyName) {
      setDisplayName(storedCompanyName);
    } 
    else if (companyData) {
      try {
        const parsedData = JSON.parse(companyData);
        if (parsedData.razaoSocial || parsedData.razao_social || parsedData.nomeFantasia || parsedData.nome_fantasia) {
          // Consider both camelCase and snake_case keys
          const name = parsedData.razaoSocial || parsedData.razao_social || 
                       parsedData.nomeFantasia || parsedData.nome_fantasia;
          setDisplayName(name);
          
          // Store it in localStorage for future reference
          localStorage.setItem('companyName', name);
        }
      } catch (error) {
        console.error('Erro ao analisar os dados da empresa:', error);
      }
    }
    else if (formData) {
      try {
        const parsedFormData = JSON.parse(formData);
        if (parsedFormData.razaoSocial || parsedFormData.nome) {
          const name = parsedFormData.razaoSocial || parsedFormData.nome;
          setDisplayName(name);
        }
      } catch (error) {
        console.error('Erro ao analisar os dados do formulário:', error);
      }
    }
  }, [propCompanyName]);
  
  // Function to get initials for Avatar
  const getInitials = (name: string): string => {
    if (!name) return '';
    
    const words = name.trim().split(/\s+/);
    
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };
  
  // Truncate company name if longer than 20 characters
  const truncatedName = displayName.length > 20 
    ? `${displayName.substring(0, 20)}...` 
    : displayName;
  
  return (
    <div className="py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center font-lexend px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" alt="Qive Reforma Tributária" className="h-10" />
        </Link>
        
        {/* Center content with file icon, title and subtitle */}
        <div className="text-center mx-auto max-w-md sm:max-w-lg flex flex-col items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 justify-center">
            <Avatar className="h-8 w-8 bg-orange-100 text-orange-600">
              <AvatarFallback className="bg-orange-100 text-orange-600 font-medium text-sm">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate" title={displayName}>{truncatedName}</span>
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
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 h-8 px-2 sm:px-3" 
            onClick={onCloseClick}
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Fechar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
