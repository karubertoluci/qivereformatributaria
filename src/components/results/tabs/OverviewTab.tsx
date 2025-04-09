import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { CompanyData } from '@/hooks/results/types';
import CompanyOverview from '@/components/report/company-overview';
import ReformOverview from '@/components/report/ReformOverview';
interface OverviewTabProps {
  segment: BusinessSegment;
  companyData: CompanyData | null;
  hasCompanyData: boolean;
  relevantArticles: Article[];
  setExpandedArticleId: (id: string | null) => void;
}
const OverviewTab: React.FC<OverviewTabProps> = ({
  segment,
  companyData,
  hasCompanyData,
  relevantArticles,
  setExpandedArticleId
}) => {
  return <TabsContent value="overview" className="space-y-6">
      <CompanyOverview segment={segment} companyData={companyData} />
      
      <ReformOverview segment={segment} />
      
      {/* Link to redirect to articles tab */}
      
    </TabsContent>;
};
export default OverviewTab;