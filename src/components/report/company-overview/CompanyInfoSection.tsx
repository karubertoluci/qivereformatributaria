import React from 'react';
import { FileText, Store, MapPin, Phone, Calendar, Info } from 'lucide-react';
import { CompanyApiData } from '@/hooks/results/types';
import { BusinessSegment } from '@/data/segments';
import { formatCNPJ } from './utils';
interface CompanyInfoSectionProps {
  companyData: {
    companyData?: CompanyApiData;
    nome?: string;
    cargo?: string;
    cnpj?: string;
  };
  segment: BusinessSegment;
}
const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  companyData,
  segment
}) => {
  const company = companyData.companyData || {};
  return <div className="space-y-4">
      {/* Razão Social */}
      <div className="border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Store className="h-5 w-5 text-rose-500" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-rose-500 font-medium text-left">Razão Social</p>
          </div>
          <div className="flex-grow text-right">
            <p className="text-gray-800 text-base font-medium">{company.razaoSocial || company.razao_social || "Não informada"}</p>
          </div>
        </div>
      </div>
      
      {/* Nome Fantasia - Agora em um box separado */}
      {(company.nomeFantasia || company.nome_fantasia) && <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Store className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium text-left">Nome Fantasia</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-800 text-base font-medium">{company.nomeFantasia || company.nome_fantasia}</p>
            </div>
          </div>
        </div>}

      {/* CNPJ */}
      <div className="border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FileText className="h-5 w-5 text-rose-500" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-rose-500 font-medium text-left">CNPJ</p>
          </div>
          <div className="flex-grow text-right">
            <p className="text-gray-800 text-base font-medium">{formatCNPJ(companyData.cnpj || company.cnpj) || "Não informado"}</p>
          </div>
        </div>
      </div>
      
      {/* Segmento - Agora abaixo do CNPJ */}
      <div className="border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Store className="h-5 w-5 text-rose-500" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-rose-500 font-medium text-left">Segmento</p>
          </div>
          <div className="flex-grow text-right">
            <p className="text-gray-800 text-base font-medium">{segment ? segment.name : "Não classificado"}</p>
          </div>
        </div>
      </div>
      
      {/* Endereço */}
      {(company.endereco || company.logradouro && company.municipio) && <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <MapPin className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium">Endereço</p>
            </div>
            <div className="w-full text-right mt-2">
              <p className="text-gray-800 leading-snug text-base font-medium">
                {company.endereco || `${company.logradouro || ''}, ${company.numero || ''}${company.complemento ? ', ' + company.complemento : ''}, ${company.bairro || ''}, ${company.municipio || ''} - ${company.uf || ''}, CEP: ${company.cep || ''}`}
              </p>
            </div>
          </div>
        </div>}
    </div>;
};
export default CompanyInfoSection;