
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { useResultsData } from '@/hooks/useResultsData';
import ReportActions from '../report/ReportActions';
import OverviewTabContent from './OverviewTabContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, FileText, Highlighter } from 'lucide-react';
import ArticlesTab from './tabs/ArticlesTab';
import HighlightsTab from './tabs/HighlightsTab';
import ResultsFooter from './layout/ResultsFooter';
import { FilterType } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments?: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  segment,
  onBackToSegments
}) => {
  const isMobile = useIsMobile();
  
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
    handleRemoveHighlight,
    isLoading
  } = useResultsData(segment);

  // Wrapper function to adapt the signature
  const onAddHighlight = (articleId: string, text: string, color?: string) => {
    handleAddHighlight(articleId, text, color as any);
  };

  // Wrapper for setFilterType to ensure it works with FilterType
  const onSetFilterType = (type: FilterType) => {
    setFilterType(type);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <h2 className="text-xl font-medium">Carregando relatório personalizado...</h2>
          <p className="text-muted-foreground">
            Estamos analisando os dados da reforma tributária para o segmento: {segment.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto print:p-0 px-[10px] my-0 py-0">
      {hasCompanyData && <ReportActions companyData={formData} segment={segment} />}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 py-0 my-0 flex justify-center w-full overflow-x-auto">
          <TabsTrigger value="overview" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <FileText className="h-3 w-3 md:h-4 md:w-4" /> 
            {isMobile ? "Visão Geral" : "Visão Geral"}
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Book className="h-3 w-3 md:h-4 md:w-4" /> 
            {isMobile ? "Artigos" : "Artigos e Impactos"}
          </TabsTrigger>
          <TabsTrigger value="highlights" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Highlighter className="h-3 w-3 md:h-4 md:w-4" /> 
            {isMobile ? `Destaques (${highlights.length})` : `Meus Destaques (${highlights.length})`}
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
      <div className="border-t border-gray-600">
        <ResultsFooter />
      </div>
    </div>
  );
};

export default ResultsContainer;
