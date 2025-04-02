
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Book } from 'lucide-react';
import { topics } from './ArticlesByTopic';
import { useResultsData } from '@/hooks/useResultsData';

import ResultsHeader from './ResultsHeader';
import ReportActions from '../report/ReportActions';
import OverviewTabContent from './OverviewTabContent';
import ArticlesTabContent from './ArticlesTabContent';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({ segment, onBackToSegments }) => {
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
    handleArticleSelect
  } = useResultsData(segment);

  return (
    <div className="container mx-auto px-4 py-8">
      <ResultsHeader 
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        onBackToSegments={onBackToSegments}
      />
      
      {hasCompanyData && (
        <ReportActions companyData={formData} segment={segment} />
      )}
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'overview' | 'articles')} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> 
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Book className="h-4 w-4" /> 
            Artigos e Impactos ({filteredArticles.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTabContent
            segment={segment}
            companyData={formData}
            hasCompanyData={hasCompanyData}
            relevantArticles={relevantArticles}
            onSelectArticle={handleArticleSelect}
          />
        </TabsContent>
        
        <TabsContent value="articles">
          <ArticlesTabContent
            segment={segment}
            filteredArticles={filteredArticles}
            relevantArticles={relevantArticles}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            articlesByTopic={articlesByTopic}
            topics={topics}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsContainer;
