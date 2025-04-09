
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
  companyData?: CompanyData | null;
  segment: BusinessSegment;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  companyData: propCompanyData,
  segment
}) => {
  // Access the company data hook directly to ensure we have the latest data
  const { formData, refreshCompanyData } = useCompanyData();
  
  // Use the latest company data from localStorage
  useEffect(() => {
    console.log('CompanyOverview mounted - updating company data');
    refreshCompanyData();
  }, [refreshCompanyData]);
  
  // Use the latest data from the hook or the prop data
  const finalCompanyData = formData || propCompanyData;
  
  // Get company name
  const companyName = finalCompanyData?.companyData ? 
    (finalCompanyData.companyData.nome_fantasia || 
     finalCompanyData.companyData.nomeFantasia || 
     finalCompanyData.companyData.razao_social || 
     finalCompanyData.companyData.razaoSocial || '') : '';
  
  // Add a check for null/undefined companyData
  if (!finalCompanyData || !finalCompanyData.companyData) {
    return (
      <Card className="bg-white shadow-sm">
        <CompanyHeader />
        <NoCompanyData />
      </Card>
    );
  }

  console.log('Rendering CompanyOverview with data:', finalCompanyData);
  
  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden border">
      <CompanyHeader companyName={companyName} />
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Company Information */}
          <CompanyInfoSection companyData={finalCompanyData} segment={segment} />

          {/* Right Column - CNAE Information */}
          <CNAESection companyData={finalCompanyData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
