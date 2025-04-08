
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2, Briefcase, MapPin, FileText, CalendarCheck, Phone, CreditCard, BadgePercent, Tag, Building } from 'lucide-react';
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
  capitalSocial?: number;
  porte?: string;
  telefone?: string;
  original?: any; // Dados originais da API
}

interface CompanyOverviewProps {
  companyData: CompanyData;
  segment: BusinessSegment;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ companyData, segment }) => {
  const formatCNPJ = (cnpj: string | undefined) => {
    if (!cnpj) return '';
    // If already formatted, return as is
    if (cnpj.includes('.')) return cnpj;
    
    // Format CNPJ: XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatCapitalSocial = (capital: number | undefined) => {
    if (capital === undefined) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(capital);
  };

  const formatTelefone = (dddTelefone: string | undefined) => {
    if (!dddTelefone) return 'Não informado';
    if (dddTelefone.length < 8) return dddTelefone;
    
    // Try to format as (XX) XXXX-XXXX or (XX) XXXXX-XXXX
    if (dddTelefone.length === 10) {
      return dddTelefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (dddTelefone.length === 11) {
      return dddTelefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    
    return dddTelefone;
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
      <CardHeader className="bg-rose-50 border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-rose-900">
          <Building2 className="h-5 w-5 text-rose-600" />
          Perfil da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Main company info section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Company details */}
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {companyData.razaoSocial || "Empresa Não Identificada"}
              </h3>
              {companyData.nomeFantasia && companyData.nomeFantasia !== companyData.razaoSocial && (
                <p className="text-sm text-muted-foreground mt-1">
                  Nome Fantasia: <span className="font-medium">{companyData.nomeFantasia}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-xs text-muted-foreground block">CNPJ</span>
                <span className="font-medium">{formatCNPJ(companyData.cnpj) || "Não informado"}</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-xs text-muted-foreground block">Situação Cadastral</span>
                <span className="font-medium">
                  {companyData.situacaoCadastral === "ATIVA" ? (
                    <span className="text-green-600">{companyData.situacaoCadastral}</span>
                  ) : (
                    companyData.situacaoCadastral || "Não informado"
                  )}
                </span>
              </div>
              
              {companyData.dataSituacaoCadastral && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground block">Data da Situação</span>
                  <span className="font-medium">{formatDate(companyData.dataSituacaoCadastral)}</span>
                </div>
              )}
              
              {companyData.porte && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground block">Porte da Empresa</span>
                  <span className="font-medium">{companyData.porte}</span>
                </div>
              )}
            </div>
            
            {companyData.naturezaJuridica && (
              <div className="flex flex-col border-t pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Natureza Jurídica</span>
                </div>
                <span className="font-medium">{companyData.naturezaJuridica}</span>
              </div>
            )}
            
            {companyData.capitalSocial !== undefined && (
              <div className="flex flex-col border-t pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Capital Social</span>
                </div>
                <span className="font-medium">{formatCapitalSocial(companyData.capitalSocial)}</span>
              </div>
            )}

            {companyData.endereco && (
              <div className="flex gap-2 border-t pt-4">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                <span className="text-gray-700">{companyData.endereco}</span>
              </div>
            )}
            
            {companyData.telefone && (
              <div className="flex gap-2 border-t pt-4">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{formatTelefone(companyData.telefone)}</span>
              </div>
            )}
          </div>

          {/* Right column - CNAE info */}
          <div className="space-y-6">
            {/* CNAE Principal */}
            <div className="bg-rose-50 rounded-lg p-5 border border-rose-100">
              <h4 className="text-sm font-medium flex items-center gap-1.5 text-rose-700 mb-3">
                <Briefcase className="h-4 w-4 text-rose-600" />
                CNAE Principal
              </h4>
              
              {companyData.cnaePrincipal?.codigo ? (
                <div>
                  <div className="bg-white rounded p-2 flex justify-between items-center mb-3 border border-rose-100">
                    <span className="font-bold text-gray-800">{companyData.cnaePrincipal.codigo}</span>
                  </div>
                  <p className="text-gray-700">{companyData.cnaePrincipal.descricao}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">CNAE não identificado</p>
              )}
              
              {segment && (
                <div className="mt-4 pt-4 border-t border-rose-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="h-4 w-4 text-rose-600" />
                    <p className="text-sm font-medium text-rose-700">Segmento: {segment.name}</p>
                  </div>
                  <p className="text-sm text-gray-600">{segment.description}</p>
                </div>
              )}
            </div>
            
            {/* CNAEs Secundários */}
            {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5 border">
                <h4 className="text-sm font-medium flex items-center gap-1.5 mb-3">
                  <FileText className="h-4 w-4 text-primary" />
                  CNAEs Secundários
                </h4>
                <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
                  {companyData.cnaeSecundarios.map((cnae, i) => (
                    <div key={i} className="bg-white p-3 rounded border">
                      <p className="font-semibold text-gray-800">{cnae.codigo}</p>
                      <p className="text-sm text-gray-600">{cnae.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer with report date */}
        <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between text-sm text-muted-foreground">
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
