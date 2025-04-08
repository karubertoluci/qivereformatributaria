
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { useResultsData } from '@/hooks/useResultsData';
import ReportActions from '../report/ReportActions';
import { TabsContent } from '@/components/ui/tabs';
import ResultsHeader from './ResultsHeader';
import ResultsFooter from './layout/ResultsFooter';
import ResultsTabLayout from './layout/ResultsTabLayout';
import ResultsLoading from './ResultsLoading';
import ResultsError from './ResultsError';
import NoArticlesFound from './NoArticlesFound';
import OverviewTab from './tabs/OverviewTab';
import ArticlesTab from './tabs/articles/ArticlesTab';
import HighlightsTab from './tabs/HighlightsTab';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments?: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  segment,
  onBackToSegments
}) => {
  const {
    expandedArticleId,
    setExpandedArticleId,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    formData,
    hasCompanyData,
    relevantArticles,
    filteredArticles,
    articlesByTopic,
    positiveCount,
    negativeCount,
    topics,
    highlights,
    handleAddHighlight,
    handleRemoveHighlight,
    isLoading,
    error
  } = useResultsData(segment);

  // Wrapper for addHighlight to adapt the signature
  const onAddHighlight = (articleId: string, text: string, color?: string) => {
    handleAddHighlight(articleId, text, color as any);
  };

  if (isLoading) {
    return <ResultsLoading />;
  }
  
  if (error) {
    return <ResultsError error={error} />;
  }

  if (relevantArticles.length === 0) {
    return <NoArticlesFound segment={segment} onBackToSegments={onBackToSegments} />;
  }

  return (
    <div className="container mx-auto print:p-0 px-[10px] my-0 py-0">
      {/* Header for results */}
      <ResultsHeader 
        segment={segment} 
        positiveCount={positiveCount} 
        negativeCount={negativeCount}
        companyName={formData?.razaoSocial || formData?.nomeFantasia}
      />
      
      {hasCompanyData && <ReportActions companyData={formData} segment={segment} />}
      
      <ResultsTabLayout 
        highlights={highlights}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as any)}
      >
        {/* Overview Tab */}
        <OverviewTab 
          segment={segment}
          companyData={formData}
          hasCompanyData={hasCompanyData}
          relevantArticles={relevantArticles}
          setExpandedArticleId={setExpandedArticleId}
        />
        
        {/* Articles Tab */}
        <TabsContent value="articles" className="bg-white">
          <ArticlesTab 
            segment={segment}
            filteredArticles={filteredArticles}
            relevantArticles={relevantArticles}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            topics={topics}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            articlesByTopic={articlesByTopic}
            highlights={highlights}
            onAddHighlight={onAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
          />
        </TabsContent>
        
        {/* Highlights Tab */}
        <TabsContent value="highlights" className="bg-white">
          <HighlightsTab 
            highlights={highlights}
            relevantArticles={relevantArticles}
            setExpandedArticleId={setExpandedArticleId}
            handleRemoveHighlight={handleRemoveHighlight}
          />
        </TabsContent>
      </ResultsTabLayout>
      
      {/* Footer */}
      <div className="border-t border-gray-600 bg-white">
        <ResultsFooter />
      </div>
    </div>
  );
};

export default ResultsContainer;
