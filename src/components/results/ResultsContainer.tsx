
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { useResultsData } from '@/hooks/useResultsData';
import ReportActions from '../report/ReportActions';
import OverviewTabContent from './OverviewTabContent';
import CompanyLegislationRelation from '../report/CompanyLegislationRelation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, FileText, Highlighter, Bookmark } from 'lucide-react';
import ArticlesTab from './tabs/articles/ArticlesTab';
import HighlightsTab from './tabs/HighlightsTab';
import SavedArticlesTab from './tabs/SavedArticlesTab';
import ResultsFooter from './layout/ResultsFooter';

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

  // Add state for saved articles
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  // Load saved articles from localStorage
  useEffect(() => {
    const savedArticlesStr = localStorage.getItem('savedArticles');
    if (savedArticlesStr) {
      try {
        setSavedArticles(JSON.parse(savedArticlesStr));
      } catch (e) {
        console.error('Failed to parse saved articles from localStorage:', e);
      }
    }
  }, []);

  // Save articles to localStorage
  useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  // Toggle article save/unsave
  const handleToggleSaveArticle = (articleId: string) => {
    setSavedArticles(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
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
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" /> Artigos Salvos
            {savedArticles.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary rounded-full text-xs px-1.5">
                {savedArticles.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="highlights" className="flex items-center gap-2">
            <Highlighter className="h-4 w-4" /> Meus Destaques
            {highlights.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary rounded-full text-xs px-1.5">
                {highlights.length}
              </span>
            )}
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
            setFilterType={setFilterType}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            articlesByTopic={articlesByTopic}
            highlights={highlights}
            onAddHighlight={handleAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
            savedArticles={savedArticles}
            onToggleSaveArticle={handleToggleSaveArticle}
          />
        </TabsContent>

        {/* Artigos Salvos Tab */}
        <TabsContent value="saved">
          <SavedArticlesTab 
            savedArticles={savedArticles}
            onToggleSaveArticle={handleToggleSaveArticle}
            allArticles={relevantArticles}
            segmentId={segment.id}
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
