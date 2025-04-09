
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
  
  return (
    <div className="space-y-4">
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
        
        {/* Nome Fantasia (somente se for diferente da razão social) */}
        {(company.nomeFantasia || company.nome_fantasia) && 
         (company.nomeFantasia || company.nome_fantasia) !== (company.razaoSocial || company.razao_social) && (
          <div className="flex items-start mt-2 pt-2 border-t border-gray-100">
            <div className="flex-shrink-0 mt-1">
              <Store className="h-4 w-4 text-rose-400" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-400 font-medium text-left text-sm">Nome Fantasia</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-700 text-sm">{company.nomeFantasia || company.nome_fantasia}</p>
            </div>
          </div>
        )}
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
              <p className="text-gray-800 text-base font-medium">{formatCNPJ(companyData.cnpj || company.cnpj) || "Não informado"}</p>
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
              <p className="text-gray-800 text-base font-medium">{segment ? segment.name : "Não classificado"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Situação Cadastral & Data Situação */}
      {(company.situacaoCadastral || company.situacao_cadastral || 
        company.dataSituacaoCadastral || company.data_situacao_cadastral) && (
        <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Info className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium text-left">Situação Cadastral</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-800 text-base font-medium">{company.situacaoCadastral || company.situacao_cadastral || "Ativa"}</p>
            </div>
          </div>
          
          {(company.dataSituacaoCadastral || company.data_situacao_cadastral) && (
            <div className="flex items-start mt-2 pt-2 border-t border-gray-100">
              <div className="flex-shrink-0 mt-1">
                <Calendar className="h-4 w-4 text-rose-400" />
              </div>
              <div className="ml-2 flex-grow">
                <p className="text-rose-400 font-medium text-left text-sm">Desde</p>
              </div>
              <div className="flex-grow text-right">
                <p className="text-gray-700 text-sm">{company.dataSituacaoCadastral || company.data_situacao_cadastral}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Natureza Jurídica */}
      {(company.naturezaJuridica || company.natureza_juridica) && (
        <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FileText className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium text-left">Natureza Jurídica</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-800 text-base font-medium">{company.naturezaJuridica || company.natureza_juridica}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Telefone */}
      {(company.telefone || company.ddd_telefone_1) && 
       (company.telefone !== 'Telefone não disponível' && company.ddd_telefone_1 !== 'Telefone não disponível') && (
        <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Phone className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium">Telefone</p>
            </div>
            <div className="flex-grow text-right">
              <p className="text-gray-800 text-base font-medium">{company.telefone || company.ddd_telefone_1}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Endereço */}
      {(company.endereco || (company.logradouro && company.municipio)) && (
        <div className="border rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <MapPin className="h-5 w-5 text-rose-500" />
            </div>
            <div className="ml-2 flex-grow">
              <p className="text-rose-500 font-medium">Endereço</p>
            </div>
            <div className="w-full text-right mt-2">
              <p className="text-gray-800 leading-snug text-base font-medium">
                {company.endereco || 
                 `${company.logradouro || ''}, ${company.numero || ''}${company.complemento ? ', ' + company.complemento : ''}, ${company.bairro || ''}, ${company.municipio || ''} - ${company.uf || ''}, CEP: ${company.cep || ''}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfoSection;
