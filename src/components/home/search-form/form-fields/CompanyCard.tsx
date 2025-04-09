
import React from 'react';
import { Building2, Briefcase, FileText, LoaderCircle } from 'lucide-react';

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
  if (!companyName && !isLoading) return null;
  
  const formatCNPJ = (value: string | undefined): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };
  
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-2">
          <LoaderCircle className="h-5 w-5 text-orange-500 animate-spin mr-2" />
          <p className="text-gray-600">Carregando dados da empresa...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <Building2 className="h-5 w-5 text-orange-500" />
            </div>
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
      )}
    </div>
  );
};

export default CompanyCard;
