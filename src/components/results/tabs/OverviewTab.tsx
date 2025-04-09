
import React, { useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { CompanyData } from '@/hooks/results/types';
import OverviewTabContent from '../OverviewTabContent';
import { TabsContent } from '@/components/ui/tabs';
import { useCompanyData } from '@/hooks/results/useCompanyData';

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
  // Get the refreshCompanyData function
  const { refreshCompanyData } = useCompanyData();
  
  // Refresh company data when the tab is shown
  useEffect(() => {
    refreshCompanyData();
  }, [refreshCompanyData]);
  
  const handleSelectArticle = (articleId: string) => {
    setExpandedArticleId(articleId);
    document.querySelector('[value="articles"]')?.dispatchEvent(new Event('click'));
  };
  
  return (
    <TabsContent value="overview">
      <OverviewTabContent 
        segment={segment} 
        companyData={companyData} 
        hasCompanyData={hasCompanyData} 
        relevantArticles={relevantArticles} 
        onSelectArticle={handleSelectArticle} 
      />
    </TabsContent>
  );
};

export default OverviewTab;
