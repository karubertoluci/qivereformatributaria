
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Building2 } from 'lucide-react';
import CompanyHeader from './CompanyHeader';
import CompanyDetails from './CompanyDetails';
import CNAESection from './CNAESection';

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
        <CompanyHeader 
          razaoSocial={companyData.razaoSocial} 
          nomeFantasia={companyData.nomeFantasia} 
        />

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Company Information */}
          <CompanyDetails 
            cnpj={companyData.cnpj}
            segment={segment}
            naturezaJuridica={companyData.naturezaJuridica}
            endereco={companyData.endereco}
            formatCNPJ={formatCNPJ}
          />

          {/* Right Column - CNAE Information */}
          <CNAESection 
            cnaePrincipal={companyData.cnaePrincipal}
            cnaeSecundarios={companyData.cnaeSecundarios}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
