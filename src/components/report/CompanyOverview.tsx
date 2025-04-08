
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2, Briefcase, MapPin, FileText, Store, User } from 'lucide-react';

interface CompanyData {
  nome?: string;
  cargo?: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios?: {
    codigo: string;
    descricao: string;
  }[];
  situacaoCadastral?: string;
  dataSituacaoCadastral?: string;
  naturezaJuridica?: string;
  porte?: string;
  original?: any; // Dados originais da API
}

interface CompanyOverviewProps {
  companyData: CompanyData;
  segment: BusinessSegment;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  companyData,
  segment
}) => {
  const formatCNPJ = (cnpj: string | undefined) => {
    if (!cnpj) return '';
    // If already formatted, return as is
    if (cnpj.includes('.')) return cnpj;

    // Format CNPJ: XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="bg-white border-b">
        <CardTitle className="flex items-center gap-2 text-xl font-medium text-gray-800">
          <Building2 className="h-5 w-5 text-primary" />
          Perfil da Empresa
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Company header with name and trading name */}
        <div className="mb-6 bg-white p-4 rounded-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">
            {companyData.razaoSocial || "Empresa Não Identificada"}
          </h3>
          {companyData.nomeFantasia && companyData.nomeFantasia !== companyData.razaoSocial && (
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
              <Store className="h-3.5 w-3.5" />
              Nome Fantasia: <span className="font-medium">{companyData.nomeFantasia}</span>
            </p>
          )}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Company Information */}
          <div className="space-y-4">
            {/* CNPJ & Segmento in the same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CNPJ */}
              <div className="border border-gray-100 p-4 rounded-md shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-gray-500">CNPJ</span>
                </div>
                <span className="font-semibold text-gray-800">{formatCNPJ(companyData.cnpj) || "Não informado"}</span>
              </div>
              
              {/* Segmento */}
              {segment && (
                <div className="border border-gray-100 p-4 rounded-md shadow-sm bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-gray-500">Segmento</span>
                  </div>
                  <span className="font-semibold text-gray-800">{segment.name}</span>
                </div>
              )}
            </div>
            
            {/* Natureza Jurídica */}
            {companyData.naturezaJuridica && (
              <div className="border border-gray-100 p-4 rounded-md shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-gray-500">Natureza Jurídica</span>
                </div>
                <span className="font-semibold text-gray-800">{companyData.naturezaJuridica}</span>
              </div>
            )}

            {/* Endereço */}
            {companyData.endereco && (
              <div className="border border-gray-100 p-4 rounded-md shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-gray-500">Endereço</span>
                </div>
                <span className="font-medium text-gray-700">{companyData.endereco}</span>
              </div>
            )}
          </div>

          {/* Right Column - CNAE Information */}
          <div className="space-y-4">
            {/* CNAE Principal */}
            <div className="border border-gray-200 rounded-md p-4 shadow-sm bg-white">
              <h4 className="text-sm font-medium flex items-center gap-1.5 text-primary mb-3">
                <Briefcase className="h-4 w-4 text-primary" />
                CNAE Principal
              </h4>
              
              {companyData.cnaePrincipal?.codigo ? (
                <div>
                  <div className="bg-white border border-gray-100 rounded p-3 mb-2">
                    <span className="font-bold text-gray-800">{companyData.cnaePrincipal.codigo}</span>
                  </div>
                  <p className="text-gray-700">{companyData.cnaePrincipal.descricao}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">CNAE não identificado</p>
              )}
            </div>
            
            {/* CNAEs Secundários */}
            <div className="border border-gray-200 rounded-md p-4 shadow-sm bg-white">
              <h4 className="text-sm font-medium flex items-center gap-1.5 mb-3 text-primary">
                <FileText className="h-4 w-4 text-primary" />
                CNAEs Secundários
              </h4>
              
              {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {companyData.cnaeSecundarios.map((cnae, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-3 rounded">
                      <p className="font-semibold text-gray-800 text-sm mb-1">{cnae.codigo}</p>
                      <p className="text-xs text-gray-600">{cnae.descricao}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 p-3 rounded text-center">
                  <p className="text-gray-500">Não existem CNAEs secundários</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
