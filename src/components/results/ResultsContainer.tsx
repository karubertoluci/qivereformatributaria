
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
import { FilterType } from './types';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  segment
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

  // Wrapper function to adapt the signature
  const onAddHighlight = (articleId: string, text: string, color?: string) => {
    handleAddHighlight(articleId, text, color as any);
  };

  // Wrapper for setFilterType to ensure it works with FilterType
  const onSetFilterType = (type: FilterType) => {
    setFilterType(type);
  };

  return (
    <div className="container mx-auto print:p-0 px-[10px] my-0 py-0">
      {hasCompanyData && <ReportActions companyData={formData} segment={segment} />}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 py-0 my-0 flex justify-center w-full">
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
            onSelectArticle={articleId => {
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
            setFilterType={onSetFilterType}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            articlesByTopic={articlesByTopic}
            highlights={highlights}
            onAddHighlight={onAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
          />
        </TabsContent>
        
        {/* Meus Destaques Tab - Centralized at global level */}
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
