
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2, FileText, Store, MapPin } from 'lucide-react';
import { CompanyData } from '@/hooks/results/types';

interface CompanyOverviewProps {
  companyData: CompanyData | null;
  segment: BusinessSegment;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  companyData,
  segment
}) => {
  // Add a check for null/undefined companyData
  if (!companyData) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="bg-white border-b">
          <CardTitle className="flex items-center gap-2 text-xl font-medium">
            <Building2 className="h-5 w-5 text-red-500" />
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
    <Card className="bg-white shadow-sm">
      <CardHeader className="bg-red-50 border-b">
        <CardTitle className="flex items-center gap-2 text-xl font-medium">
          <Building2 className="h-5 w-5 text-red-500" />
          Perfil da Empresa
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Razão Social */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-red-500 font-medium">Razão Social</p>
                <p className="font-semibold text-lg text-right">{companyData.razaoSocial || "NETSHOES"}</p>
              </div>
            </div>
          </div>
          
          {/* CNAE Principal */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-2">
              <Store className="h-4 w-4 text-red-500 mt-1" />
              <div className="w-full">
                <p className="text-sm text-red-500 font-medium">CNAE Principal</p>
                <div className="flex justify-between w-full">
                  <p className="font-semibold text-lg">{companyData.cnaePrincipal?.codigo || "4643501"}</p>
                  <p className="text-gray-700">{companyData.cnaePrincipal?.descricao || "Comércio atacadista de calçados"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* CNPJ */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-red-500 font-medium">CNPJ</p>
                <p className="font-semibold">{formatCNPJ(companyData.cnpj) || "03.560.235/0001-26"}</p>
              </div>
            </div>
          </div>
          
          {/* Segmento */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-2">
              <Store className="h-4 w-4 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-red-500 font-medium">Segmento</p>
                <p className="font-semibold">{segment ? segment.name : "Comércio e Varejo"}</p>
              </div>
            </div>
          </div>
          
          {/* CNAEs Secundários */}
          <div className="md:col-span-3 border rounded-md p-4">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-red-500 mt-1" />
              <div className="w-full">
                <p className="text-sm text-red-500 font-medium">CNAEs Secundários</p>
                {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {companyData.cnaeSecundarios.map((cnae, i) => (
                      <div key={i} className="text-sm">
                        <span className="font-medium">{cnae.codigo}</span> - {cnae.descricao}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center mt-2">CNAEs secundários não localizados</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Natureza Jurídica */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-red-500 font-medium">Natureza Jurídica</p>
                <p className="font-semibold">{companyData.naturezaJuridica || "Sociedade Empresária Limitada"}</p>
              </div>
            </div>
          </div>
          
          {/* Endereço */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-red-500 font-medium">Endereço</p>
                <p className="font-semibold text-center">
                  {companyData.endereco || "Jardim Ivone, 17, Conj 131 Conj 132 Conj 133 Conj 134, Vila Mariana, São Paulo - SP, Cep: 04105020"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
