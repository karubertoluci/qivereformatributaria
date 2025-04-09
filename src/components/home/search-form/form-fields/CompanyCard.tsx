
import React from 'react';
import { Briefcase, FileText, LoaderCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CompanyCardProps {
  companyName: string;
  segment?: string;
  cnpj?: string;
  isLoading?: boolean;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ 
  companyName, 
  segment, 
  cnpj,
  isLoading = false 
}) => {
  // Se não temos nome de empresa e não estamos carregando, não mostrar o card
  if (!companyName && !isLoading) return null;
  
  // Função para formatar o CNPJ corretamente
  const formatCNPJ = (value: string | undefined): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };
  
  // Função para obter as iniciais do nome da empresa (até 2 caracteres)
  const getInitials = (name: string): string => {
    if (!name) return '';
    
    // Remove espaços extras e divide por espaços
    const words = name.trim().split(/\s+/);
    
    // Se tivermos pelo menos duas palavras, pegamos a primeira letra de cada
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    
    // Se tivermos apenas uma palavra, pegamos até duas letras
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-2">
          <LoaderCircle className="h-5 w-5 text-orange-500 animate-spin mr-2" />
          <p className="text-gray-600">Carregando dados da empresa...</p>
        </div>
      ) : companyName ? (
        <>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 bg-orange-100 text-orange-500 mr-3">
              <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                {getInitials(companyName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{companyName}</h3>
              
              {cnpj && (
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FileText className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                  <span>CNPJ: {formatCNPJ(cnpj)}</span>
                </div>
              )}
              
              {segment && (
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Briefcase className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                  <span>{segment}</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center py-2 text-gray-500">
          <p>Nenhuma informação da empresa disponível.</p>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
