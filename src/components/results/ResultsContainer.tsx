
import React, { useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResultsHeader from './ResultsHeader';
import ResultsFooter from './layout/ResultsFooter';
import OverviewTab from './tabs/OverviewTab';
import ArticlesTab from './tabs/articles/ArticlesTab';
import HighlightsTab from './tabs/HighlightsTab';
import ResultsLoading from './ResultsLoading';
import ResultsError from './ResultsError';
import { useResultsData } from '@/hooks/results';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({ segment, onBackToSegments }) => {
  const resultsData = useResultsData(segment);
  
  const { 
    activeTab, 
    setActiveTab,
    isLoading,
    error,
    expandedArticleId,
    formData,
    hasCompanyData,
    positiveCount,
    negativeCount
  } = resultsData;

  useEffect(() => {
    // Clear expanded article when changing tabs
    if (expandedArticleId) {
      resultsData.setExpandedArticleId(null);
    }
  }, [activeTab, expandedArticleId, resultsData.setExpandedArticleId]);

  // If loading, show loading indicator
  if (isLoading) {
    return <ResultsLoading />;
  }

  // If there's an error, show error message
  if (error) {
    return <ResultsError error={error} />;
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <ResultsHeader 
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        companyName={hasCompanyData ? formData?.nomeFantasia || '' : ''}
      />
      
      <main className="my-8">
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'overview' | 'articles' | 'highlights')}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="articles">Artigos</TabsTrigger>
            <TabsTrigger value="highlights">Destaques</TabsTrigger>
          </TabsList>
          
          <OverviewTab 
            segment={segment}
            companyData={formData}
            hasCompanyData={hasCompanyData}
            relevantArticles={resultsData.relevantArticles}
            setExpandedArticleId={resultsData.setExpandedArticleId}
          />
          
          <ArticlesTab 
            segment={segment}
            filteredArticles={resultsData.filteredArticles}
            relevantArticles={resultsData.relevantArticles}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            topics={resultsData.topics}
            viewMode={resultsData.viewMode}
            setViewMode={resultsData.setViewMode}
            searchTerm={resultsData.searchTerm}
            setSearchTerm={resultsData.setSearchTerm}
            filterType={resultsData.filterType}
            setFilterType={resultsData.setFilterType}
            expandedArticleId={resultsData.expandedArticleId}
            setExpandedArticleId={resultsData.setExpandedArticleId}
            articlesByTopic={resultsData.articlesByTopic}
            highlights={resultsData.highlights}
            handleAddHighlight={resultsData.handleAddHighlight}
            handleRemoveHighlight={resultsData.handleRemoveHighlight}
          />
          
          <HighlightsTab 
            highlights={resultsData.highlights}
            handleRemoveHighlight={resultsData.handleRemoveHighlight}
            articles={resultsData.relevantArticles}
          />
        </Tabs>
      </main>
      
      <ResultsFooter />
    </div>
  );
};

export default ResultsContainer;
