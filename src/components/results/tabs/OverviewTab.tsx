
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { CompanyData } from '@/hooks/useResultsData';
import CompanyOverview from '@/components/report/CompanyOverview';
import ReformOverview from '@/components/report/ReformOverview';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import RelevanceDistributionChart from '@/components/report/RelevanceDistributionChart';

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
  return (
    <TabsContent value="overview" className="space-y-6">
      <CompanyOverview 
        segment={segment}
        companyData={companyData}
        hasCompanyData={hasCompanyData}
      />
      
      <ReformOverview segment={segment} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <ImpactDistributionChart 
          segment={segment}
          articles={relevantArticles}
        />
        
        <RelevanceDistributionChart 
          articles={relevantArticles}
          segmentId={segment.id}
          onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
        />
      </div>
    </TabsContent>
  );
};

export default OverviewTab;
