
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2, Briefcase, MapPin, FileText, CalendarCheck, Building, BadgeCheck, Clock, Store, TagIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Não informada';

    // Check if already in DD/MM/YYYY format
    if (dateString.includes('/')) return dateString;

    // Convert from YYYY-MM-DD to DD/MM/YYYY
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="bg-white border-b">
        <CardTitle className="flex items-center gap-2 text-xl font-medium text-gray-800">
          <Building2 className="h-5 w-5 text-primary" />
          Perfil da Empresa
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Company details */}
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-800 text-left">
                {companyData.razaoSocial || "Empresa Não Identificada"}
              </h3>
              {companyData.nomeFantasia && companyData.nomeFantasia !== companyData.razaoSocial && (
                <p className="text-sm text-gray-500 mt-1 text-left flex items-center gap-1.5">
                  <Store className="h-3.5 w-3.5" />
                  Nome Fantasia: <span className="font-medium">{companyData.nomeFantasia}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-gray-500">CNPJ</span>
                </div>
                <span className="font-semibold text-gray-800">{formatCNPJ(companyData.cnpj) || "Não informado"}</span>
              </div>

              <div className="bg-white border border-gray-100 p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-gray-500">Situação Cadastral</span>
                </div>
                <span className="font-semibold">
                  {companyData.situacaoCadastral === "ATIVA" ? (
                    <span className="text-green-600">{companyData.situacaoCadastral}</span>
                  ) : companyData.situacaoCadastral || "Não informado"}
                </span>
              </div>
              
              {companyData.dataSituacaoCadastral && (
                <div className="bg-white border border-gray-100 p-4 rounded-md shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-gray-500">Data da Situação</span>
                  </div>
                  <span className="font-semibold text-gray-800">{formatDate(companyData.dataSituacaoCadastral)}</span>
                </div>
              )}
              
              {companyData.porte && (
                <div className="bg-white border border-gray-100 p-4 rounded-md shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-gray-500">Porte da Empresa</span>
                  </div>
                  <span className="font-semibold text-gray-800">{companyData.porte}</span>
                </div>
              )}
            </div>
            
            {companyData.naturezaJuridica && (
              <div className="bg-white border border-gray-100 p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-gray-500">Natureza Jurídica</span>
                </div>
                <span className="font-semibold text-gray-800 text-left">{companyData.naturezaJuridica}</span>
              </div>
            )}

            {companyData.endereco && (
              <div className="bg-white border border-gray-100 p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-gray-500">Endereço</span>
                </div>
                <span className="font-medium text-gray-700 text-left">{companyData.endereco}</span>
              </div>
            )}
          </div>

          {/* Right column - CNAE info */}
          <div className="space-y-6">
            {/* CNAE Principal */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h4 className="text-sm font-medium flex items-center gap-1.5 text-primary mb-3">
                <Briefcase className="h-4 w-4 text-primary" />
                CNAE Principal
              </h4>
              
              {companyData.cnaePrincipal?.codigo ? (
                <div>
                  <div className="bg-white border border-gray-100 rounded p-3 flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-800">{companyData.cnaePrincipal.codigo}</span>
                  </div>
                  <p className="text-gray-700 text-left">{companyData.cnaePrincipal.descricao}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">CNAE não identificado</p>
              )}
              
              {segment && (
                <div className="mt-4 pt-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium text-primary">Segmento: {segment.name}</p>
                  </div>
                  <p className="text-sm text-gray-600 text-left">{segment.description}</p>
                </div>
              )}
            </div>
            
            {/* CNAEs Secundários */}
            {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h4 className="text-sm font-medium flex items-center gap-1.5 mb-3 text-primary">
                  <FileText className="h-4 w-4 text-primary" />
                  CNAEs Secundários
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {companyData.cnaeSecundarios.map((cnae, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-3 rounded">
                      <p className="font-semibold text-gray-800 text-left text-sm mb-1">{cnae.codigo}</p>
                      <p className="text-xs text-gray-600 text-left">{cnae.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h4 className="text-sm font-medium flex items-center gap-1.5 mb-3 text-primary">
                  <FileText className="h-4 w-4 text-primary" />
                  CNAEs Secundários
                </h4>
                <div className="bg-white border border-gray-100 p-3 rounded text-center">
                  <p className="text-gray-500">Não existem CNAEs secundários</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer com relatório */}
        <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            Relatório personalizado gerado em {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
