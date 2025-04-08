
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
    handleArticleSelect,
    hasCompanyData
  } = resultsData;

  useEffect(() => {
    // Limpar o artigo expandido quando mudar de aba
    if (expandedArticleId) {
      resultsData.setExpandedArticleId(null);
    }
  }, [activeTab, expandedArticleId, resultsData.setExpandedArticleId]);

  // Se estiver carregando, mostrar indicador de loading
  if (isLoading) {
    return <ResultsLoading />;
  }

  // Se houver erro, mostrar mensagem de erro
  if (error) {
    return <ResultsError error={error} />;
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <ResultsHeader 
        segment={segment} 
        onBackToSegments={onBackToSegments}
        companyName={hasCompanyData ? resultsData.formData?.nomeFantasia || '' : ''}
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
          
          <TabsContent value="overview">
            <OverviewTab 
              segment={segment}
              formData={resultsData.formData}
              hasCompanyData={hasCompanyData}
              relevantArticles={resultsData.relevantArticles}
              positiveCount={resultsData.positiveCount}
              negativeCount={resultsData.negativeCount}
              articlesByTopic={resultsData.articlesByTopic}
              onSelectArticle={handleArticleSelect}
              topics={resultsData.topics}
            />
          </TabsContent>
          
          <TabsContent value="articles">
            <ArticlesTab 
              segment={segment}
              filteredArticles={resultsData.filteredArticles}
              relevantArticles={resultsData.relevantArticles}
              positiveCount={resultsData.positiveCount}
              negativeCount={resultsData.negativeCount}
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
              onAddHighlight={resultsData.handleAddHighlight}
              onRemoveHighlight={resultsData.handleRemoveHighlight}
            />
          </TabsContent>
          
          <TabsContent value="highlights">
            <HighlightsTab 
              highlights={resultsData.highlights}
              onRemoveHighlight={resultsData.handleRemoveHighlight}
              articles={resultsData.relevantArticles}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <ResultsFooter />
    </div>
  );
};

export default ResultsContainer;
