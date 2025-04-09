
import React from 'react';
import { Store, FileText } from 'lucide-react';
import { CompanyData } from '@/hooks/results/types';
interface CNAESectionProps {
  companyData: CompanyData;
}
const CNAESection: React.FC<CNAESectionProps> = ({
  companyData
}) => {
  return <div className="space-y-4">
      {/* CNAE Principal */}
      <div className="border rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Store className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAE Principal</p>
            </div>
          </div>
          <div className="flex w-full mt-2">
            <div className="w-1/3">
              <p className="text-gray-800 text-left font-bold">{companyData.cnaePrincipal?.codigo || "6203100"}</p>
            </div>
            <div className="w-2/3">
              <p className="text-gray-800 text-right font-normal text-sm">{companyData.cnaePrincipal?.descricao || "Desenvolvimento e licenciamento de programa"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CNAEs Secundários */}
      <div className="border rounded-lg p-4 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAEs Secundários</p>
            </div>
          </div>
          
          {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 ? <div className="space-y-3 mt-2">
              {companyData.cnaeSecundarios.slice(0, 5).map((cnae, i) => <div key={i} className="flex w-full">
                  <div className="w-1/3">
                    <p className="font-semibold text-gray-800">{cnae.codigo}</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-800 text-sm">{cnae.descricao}</p>
                  </div>
                </div>)}
            </div> : <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-500 text-center">CNAEs secundários não localizados</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default CNAESection;
