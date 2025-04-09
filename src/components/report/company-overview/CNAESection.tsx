
import React from 'react';
import { FileText, Briefcase } from 'lucide-react';
import { CompanyApiData } from '@/hooks/results/types';

interface CNAESectionProps {
  companyData: {
    companyData?: CompanyApiData;
  };
}

const CNAESection: React.FC<CNAESectionProps> = ({
  companyData
}) => {
  const company = companyData.companyData || {};
  const cnaePrincipal = company.cnaePrincipal || 
    (company.cnae_fiscal ? { 
      codigo: company.cnae_fiscal.toString(), 
      descricao: company.cnae_fiscal_descricao || '' 
    } : null);
    
  const cnaeSecundarios = company.cnaeSecundarios || company.cnaes_secundarios || [];
  
  return (
    <div className="space-y-4">
      {/* CNAE Principal */}
      <div className="border rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Briefcase className="h-5 w-5 text-rose-500" />
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAE Principal</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="px-3 py-1.5 bg-rose-50 rounded-md mr-2">
              <p className="text-gray-800 font-bold">
                {cnaePrincipal?.codigo || "Não disponível"}
              </p>
            </div>
            <div className="flex-grow">
              <p className="text-gray-800 text-sm">
                {cnaePrincipal?.descricao || "Descrição não disponível"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CNAEs Secundários */}
      <div className="border rounded-lg p-4 h-full min-h-[250px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-rose-500" />
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAEs Secundários</p>
            </div>
          </div>
          
          {cnaeSecundarios && cnaeSecundarios.length > 0 ? (
            <div className="space-y-3 overflow-auto max-h-[400px] pr-1">
              {cnaeSecundarios.map((cnae, i) => (
                <div key={i} className="flex items-center justify-between border border-gray-100 p-3 rounded-md">
                  <div className="px-2 py-1 bg-rose-50 rounded-md mr-2">
                    <p className="font-semibold text-gray-800 text-sm">{cnae.codigo}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-700 text-sm">{cnae.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center h-full border border-dashed rounded-lg border-gray-200 p-6">
              <p className="text-gray-500 text-center">Não há CNAEs secundários registrados para esta empresa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CNAESection;
