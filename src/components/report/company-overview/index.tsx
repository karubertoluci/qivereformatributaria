
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { CompanyData } from '@/hooks/results/types';
import { useCompanyData } from '@/hooks/results/useCompanyData';
import CompanyHeader from './CompanyHeader';
import CompanyInfoSection from './CompanyInfoSection';
import CNAESection from './CNAESection';
import NoCompanyData from './NoCompanyData';

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
    console.log('CompanyOverview montado - atualizando dados da empresa');
    refreshCompanyData();
  }, [refreshCompanyData]);
  
  // Add a check for null/undefined companyData
  if (!propCompanyData) {
    return (
      <Card className="bg-white shadow-sm">
        <CompanyHeader />
        <NoCompanyData />
      </Card>
    );
  }

  console.log('Renderizando CompanyOverview com dados:', propCompanyData);
  console.log('CNAEs Secundários:', propCompanyData.cnaeSecundarios);

  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden border">
      <CompanyHeader />
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Company Information */}
          <CompanyInfoSection companyData={propCompanyData} segment={segment} />

          {/* Right Column - CNAE Information */}
          <CNAESection companyData={propCompanyData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
