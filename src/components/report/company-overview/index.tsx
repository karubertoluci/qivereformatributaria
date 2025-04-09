
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2, Store, FileText, MapPin } from 'lucide-react';
import { CompanyData } from '@/hooks/results/types';
import { useCompanyData } from '@/hooks/results/useCompanyData';

interface CompanyOverviewProps {
  companyData: CompanyData | null;
  segment: BusinessSegment;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  companyData: propCompanyData,
  segment
}) => {
  // Access the refreshCompanyData function
  const { refreshCompanyData } = useCompanyData();
  
  // Use the latest company data from localStorage
  useEffect(() => {
    refreshCompanyData();
  }, []);
  
  // Add a check for null/undefined companyData
  if (!propCompanyData) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="bg-rose-50 border-b py-4">
          <CardTitle className="flex items-center gap-2 text-xl font-medium">
            <Building2 className="h-5 w-5 text-rose-500" />
            Perfil da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhuma informação da empresa disponível</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCNPJ = (cnpj: string | undefined) => {
    if (!cnpj) return '';
    // If already formatted, return as is
    if (cnpj.includes('.')) return cnpj;

    // Format CNPJ: XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden border">
      {/* Card Header with red background */}
      <CardHeader className="bg-rose-50 border-b py-4 px-6">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Building2 className="h-5 w-5 text-rose-500" />
          <span className="text-black">Perfil da Empresa</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Company Information */}
          <div className="space-y-4">
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
                  <p className="font-semibold text-gray-800 text-lg">{propCompanyData.razaoSocial || "NETSHOES"}</p>
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
                    <p className="font-semibold text-gray-800">{formatCNPJ(propCompanyData.cnpj) || "03.560.235/0001-26"}</p>
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
                    <p className="font-semibold text-gray-800">{segment ? segment.name : "Comércio e Varejo"}</p>
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
                  <p className="text-rose-500 font-medium">Natureza Jurídica</p>
                </div>
                <div className="flex-grow text-right">
                  <p className="font-semibold text-gray-800">{propCompanyData.naturezaJuridica || "Sociedade Empresária Limitada"}</p>
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
                  <p className="font-medium text-gray-800 text-sm leading-snug">
                    {propCompanyData.endereco || "Jardim Ivone, 17, Conj 131 Conj 132 Conj 133 Conj 134, Vila Mariana, São Paulo - SP, Cep: 04105020"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CNAE Information */}
          <div className="space-y-4">
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
                    <p className="font-semibold text-gray-800">{propCompanyData.cnaePrincipal?.codigo || "6203100"}</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-800">{propCompanyData.cnaePrincipal?.descricao || "Desenvolvimento e licenciamento de programa"}</p>
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
                
                {propCompanyData.cnaeSecundarios && propCompanyData.cnaeSecundarios.length > 0 ? (
                  <div className="space-y-3 mt-2">
                    {propCompanyData.cnaeSecundarios.slice(0, 5).map((cnae, i) => (
                      <div key={i} className="flex w-full">
                        <div className="w-1/3">
                          <p className="font-semibold text-gray-800">{cnae.codigo}</p>
                        </div>
                        <div className="w-2/3">
                          <p className="text-gray-800 text-sm">{cnae.descricao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 text-center">CNAEs secundários não localizados</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
