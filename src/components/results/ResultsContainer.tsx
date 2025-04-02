
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { useResultsData } from '@/hooks/useResultsData';

import ReportActions from '../report/ReportActions';
import OverviewTabContent from './OverviewTabContent';
import CompanyLegislationRelation from '../report/CompanyLegislationRelation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, FileText, Highlighter } from 'lucide-react';
import ArticlesTab from './tabs/ArticlesTab';
import HighlightsTab from './tabs/HighlightsTab';
import ResultsFooter from './layout/ResultsFooter';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({ segment }) => {
  const {
    expandedArticleId,
    setExpandedArticleId,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
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
    handleRemoveHighlight
  } = useResultsData(segment);

  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      {hasCompanyData && (
        <ReportActions companyData={formData} segment={segment} />
      )}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Book className="h-4 w-4" /> Artigos e Impactos
          </TabsTrigger>
          <TabsTrigger value="highlights" className="flex items-center gap-2">
            <Highlighter className="h-4 w-4" /> Meus Destaques ({highlights.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Visão Geral Tab */}
        <TabsContent value="overview">
          <OverviewTabContent
            segment={segment}
            companyData={formData}
            hasCompanyData={hasCompanyData}
            relevantArticles={relevantArticles}
            onSelectArticle={(articleId) => {
              setExpandedArticleId(articleId);
              document.querySelector('[value="articles"]')?.dispatchEvent(new Event('click'));
            }}
          />
        </TabsContent>
        
        {/* Artigos e Impactos Tab */}
        <TabsContent value="articles">
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
            onAddHighlight={handleAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
          />
        </TabsContent>
        
        {/* Meus Destaques Tab */}
        <TabsContent value="highlights">
          <HighlightsTab
            highlights={highlights}
            relevantArticles={relevantArticles}
            setExpandedArticleId={setExpandedArticleId} 
            handleRemoveHighlight={handleRemoveHighlight}
          />
        </TabsContent>
      </Tabs>
      
      {/* Rodapé do relatório */}
      <ResultsFooter />
    </div>
  );
};

export default ResultsContainer;
