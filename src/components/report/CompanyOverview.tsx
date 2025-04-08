
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2, Briefcase, Map, FileText, CalendarCheck, Phone, CreditCard, BadgePercent } from 'lucide-react';

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

  console.log('CompanyOverview rendering with data:', companyData);

  return (
    <Card className="bg-white">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Perfil da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">
                {companyData.razaoSocial || "Empresa Não Identificada"}
              </h3>
              {companyData.nomeFantasia && companyData.nomeFantasia !== companyData.razaoSocial && (
                <p className="text-sm text-muted-foreground">
                  Nome Fantasia: {companyData.nomeFantasia}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">CNPJ</span>
                <span>{formatCNPJ(companyData.cnpj) || "Não informado"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Situação Cadastral</span>
                <span>{companyData.situacaoCadastral || "Não informado"}</span>
              </div>
              
              {companyData.dataSituacaoCadastral && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Data da Situação</span>
                  <span>{formatDate(companyData.dataSituacaoCadastral)}</span>
                </div>
              )}
              
              {companyData.porte && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Porte da Empresa</span>
                  <span>{companyData.porte}</span>
                </div>
              )}
              
              {companyData.naturezaJuridica && (
                <div className="flex flex-col col-span-2">
                  <span className="text-xs text-muted-foreground">Natureza Jurídica</span>
                  <span>{companyData.naturezaJuridica}</span>
                </div>
              )}
              
              {companyData.capitalSocial !== undefined && (
                <div className="flex flex-col items-start gap-1 col-span-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <CreditCard className="h-3.5 w-3.5" />
                    Capital Social
                  </span>
                  <span className="font-medium">{formatCapitalSocial(companyData.capitalSocial)}</span>
                </div>
              )}
            </div>

            {companyData.endereco && (
              <div className="flex gap-2">
                <Map className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                <span>{companyData.endereco}</span>
              </div>
            )}
            
            {companyData.telefone && (
              <div className="flex gap-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span>{formatTelefone(companyData.telefone)}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h4 className="text-sm font-medium flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-primary" />
                CNAE Principal
              </h4>
              
              {companyData.cnaePrincipal?.codigo ? (
                <div className="mt-2">
                  <p className="font-semibold">{companyData.cnaePrincipal.codigo}</p>
                  <p>{companyData.cnaePrincipal.descricao}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">CNAE não identificado</p>
              )}
              
              {segment && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm"><span className="font-medium">Segmento:</span> {segment.name}</p>
                  <p className="text-sm text-muted-foreground">{segment.description}</p>
                </div>
              )}
            </div>
            
            {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  CNAEs Secundários
                </h4>
                <div className="max-h-32 overflow-y-auto pr-2 text-sm">
                  {companyData.cnaeSecundarios.map((cnae, i) => (
                    <div key={i} className="py-1 border-b border-border last:border-0">
                      <p className="font-medium">{cnae.codigo}</p>
                      <p className="text-sm text-muted-foreground">{cnae.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border text-sm">
          <p className="flex items-center gap-2 text-muted-foreground">
            <CalendarCheck className="h-4 w-4" />
            Relatório personalizado gerado em {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
