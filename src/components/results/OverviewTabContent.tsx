
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { CompanyData } from '@/hooks/results/types';
import CompanyOverview from '../report/company-overview';
import ReformOverview from '../report/ReformOverview';
import CompanyLegislationRelation from '../report/CompanyLegislationRelation';

interface OverviewTabContentProps {
  segment: BusinessSegment;
  companyData: CompanyData | null;
  hasCompanyData: boolean;
  relevantArticles: Article[];
  onSelectArticle: (articleId: string) => void;
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  segment,
  companyData,
  hasCompanyData,
  relevantArticles,
  onSelectArticle
}) => {
  return (
    <div className="space-y-6 mt-6">
      {hasCompanyData && (
        <CompanyOverview companyData={companyData} segment={segment} />
      )}
      
      <ReformOverview segment={segment} />
      
      <CompanyLegislationRelation segment={segment} companyData={companyData} />
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => document.querySelector('[value="articles"]')?.dispatchEvent(new Event('click'))}
          className="text-primary hover:text-primary-dark underline text-sm"
        >
          Ver detalhes dos artigos e impactos
        </button>
      </div>
    </div>
  );
};

export default OverviewTabContent;
