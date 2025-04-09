
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2 } from 'lucide-react';
import { CompanyData } from '@/hooks/results/types';

interface CompanyOverviewProps {
  companyData: CompanyData | null;
  segment: BusinessSegment;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  companyData,
  segment
}) => {
  if (!companyData || !companyData.companyData) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="bg-white border-b">
          <CardTitle className="flex items-center gap-2 text-xl font-medium text-gray-800">
            <Building2 className="h-5 w-5 text-rose-500" />
            Perfil da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma informação da empresa disponível.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const company = companyData.companyData;
  
  // Get CNAEs secundários
  const cnaeSecundarios = company.cnaeSecundarios || company.cnaes_secundarios || [];
  
  // Get principal CNAE
  const cnaePrincipal = company.cnaePrincipal || 
    (company.cnae_fiscal ? { 
      codigo: company.cnae_fiscal.toString(), 
      descricao: company.cnae_fiscal_descricao || '' 
    } : null);

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="bg-rose-50 border-b">
        <CardTitle className="flex items-center gap-2 text-xl font-medium text-gray-800">
          <Building2 className="h-5 w-5 text-rose-500" />
          Perfil da Empresa
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Razão Social */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-rose-500 font-medium">Razão Social</p>
                </div>
              </div>
              <p className="text-right text-gray-800 font-medium">
                {company.razaoSocial || company.razao_social || "Não informada"}
              </p>
            </div>
            
            {/* CNPJ and Segmento in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CNPJ */}
              <div className="border rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-rose-500 font-medium">CNPJ</p>
                  </div>
                </div>
                <p className="text-right text-gray-800 font-medium">
                  {company.cnpj || "Não informado"}
                </p>
              </div>
              
              {/* Segmento */}
              <div className="border rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21L8 19L12 21L16 19L19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-rose-500 font-medium">Segmento</p>
                  </div>
                </div>
                <p className="text-right text-gray-800 font-medium">
                  {segment ? segment.name : "Não classificado"}
                </p>
              </div>
            </div>
            
            {/* Natureza Jurídica */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-rose-500 font-medium">Natureza Jurídica</p>
                </div>
              </div>
              <p className="text-right text-gray-800 font-medium">
                {company.naturezaJuridica || company.natureza_juridica || "Não informada"}
              </p>
            </div>
            
            {/* Endereço */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 13V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 13L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-rose-500 font-medium">Endereço</p>
                </div>
              </div>
              <p className="text-right text-gray-800 font-medium">
                {company.endereco || 
                 `${company.logradouro || ''}, ${company.numero || ''}${company.complemento ? ', ' + company.complemento : ''}, ${company.bairro || ''}, 
                 ${company.municipio || ''} - ${company.uf || ''}, Cep: ${company.cep || ''}`}
              </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            {/* CNAE Principal */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-rose-500 font-medium">CNAE Principal</p>
                </div>
              </div>
              
              {cnaePrincipal ? (
                <div className="flex items-start">
                  <div className="bg-gray-100 py-1 px-2 rounded mr-3">
                    <p className="text-gray-800 font-bold">{cnaePrincipal.codigo}</p>
                  </div>
                  <p className="text-gray-800 flex-1">
                    {cnaePrincipal.descricao}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">CNAE Principal não disponível</p>
              )}
            </div>
            
            {/* CNAEs Secundários */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-rose-500 font-medium">CNAEs Secundários</p>
                </div>
              </div>
              
              {cnaeSecundarios && cnaeSecundarios.length > 0 ? (
                <div className="space-y-2 overflow-y-auto max-h-[250px]">
                  {cnaeSecundarios.map((cnae: any, index: number) => (
                    <div key={index} className="flex items-start border-t pt-2 first:border-t-0 first:pt-0">
                      <div className="bg-gray-100 py-1 px-2 rounded mr-3">
                        <p className="text-gray-800 font-bold">{cnae.codigo}</p>
                      </div>
                      <p className="text-gray-800 flex-1">
                        {cnae.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Não existem CNAEs secundários para esta empresa
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
