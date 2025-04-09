
import React from 'react';
import { FileText } from 'lucide-react';
import { CompanyData } from '@/hooks/results/types';

interface CNAESectionProps {
  companyData: CompanyData;
}

const CNAESection: React.FC<CNAESectionProps> = ({
  companyData
}) => {
  return (
    <div className="space-y-4">
      {/* CNAE Principal */}
      <div className="border rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 text-rose-500" />
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAE Principal</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 font-bold">{companyData.cnaePrincipal?.codigo || "6203100"}</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm">
                {companyData.cnaePrincipal?.descricao || "Desenvolvimento e licenciamento de programa"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CNAEs Secundários */}
      <div className="border rounded-lg p-4 h-full min-h-[250px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 text-rose-500" />
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAEs Secundários</p>
            </div>
          </div>
          
          {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 ? (
            <div className="space-y-3">
              {companyData.cnaeSecundarios.slice(0, 5).map((cnae, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{cnae.codigo}</p>
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm">{cnae.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center h-full">
              <p className="text-gray-500">CNAEs secundários não localizados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CNAESection;
