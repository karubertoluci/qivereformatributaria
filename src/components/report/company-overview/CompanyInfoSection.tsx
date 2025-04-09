import React from 'react';
import { FileText, Store, MapPin } from 'lucide-react';
import { CompanyData } from '@/hooks/results/types';
import { BusinessSegment } from '@/data/segments';
import { formatCNPJ } from './utils';
interface CompanyInfoSectionProps {
  companyData: CompanyData;
  segment: BusinessSegment;
}
const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  companyData,
  segment
}) => {
  return <div className="space-y-4">
      {/* Razão Social */}
      <div className="border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FileText className="h-5 w-5 text-rose-500" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-rose-500 font-medium">Razão Social</p>
          </div>
          <div className="flex-grow text-right">
            <p className="font-semibold text-gray-800 text-lg">{companyData.razaoSocial || "NETSHOES"}</p>
          </div>
        </div>
      </div>

      {/* CNPJ & Segmento in the same row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CNPJ */}
        <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FileText className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium">CNPJ</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-800 font-bold text-base">{formatCNPJ(companyData.cnpj) || "03.560.235/0001-26"}</p>
            </div>
          </div>
        </div>
        
        {/* Segmento */}
        <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Store className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium">Segmento</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-800 font-bold text-base">{segment ? segment.name : "Comércio e Varejo"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Natureza Jurídica */}
      <div className="border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FileText className="h-5 w-5 text-rose-500" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-rose-500 font-medium text-left">Natureza Jurídica</p>
          </div>
          <div className="flex-grow text-right">
            <p className="text-gray-800 font-bold text-base">{companyData.naturezaJuridica || "Sociedade Empresária Limitada"}</p>
          </div>
        </div>
      </div>
      
      {/* Endereço */}
      <div className="border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="h-5 w-5 text-rose-500" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-rose-500 font-medium">Endereço</p>
          </div>
          <div className="w-full text-right mt-2">
            <p className="text-gray-800 leading-snug text-base font-bold">
              {companyData.endereco || "Jardim Ivone, 17, Conj 131 Conj 132 Conj 133 Conj 134, Vila Mariana, São Paulo - SP, Cep: 04105020"}
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default CompanyInfoSection;