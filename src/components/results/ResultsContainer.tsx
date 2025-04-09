
import React, { useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsHeader from './ResultsHeader';
import ResultsFooter from './layout/ResultsFooter';
import OverviewTab from './tabs/OverviewTab';
import ArticlesTab from './tabs/articles/ArticlesTab';
import HighlightsTab from './tabs/HighlightsTab';
import ResultsLoading from './ResultsLoading';
import ResultsError from './ResultsError';
import { useResultsData } from '@/hooks/results';
import { FilterType, ViewMode } from '@/hooks/results/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ResultsTabLayout from './layout/ResultsTabLayout';

interface ResultsContainerProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({ segment, onBackToSegments }) => {
  const resultsData = useResultsData(segment);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const { 
    activeTab, 
    setActiveTab,
    isLoading,
    error,
    expandedArticleId,
    formData,
    hasCompanyData,
    positiveCount,
    negativeCount,
    highlights
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

  // Get company name from formData if available
  const companyName = hasCompanyData && formData?.companyData 
    ? (formData.companyData.nome_fantasia || formData.companyData.nomeFantasia || formData.companyData.razao_social || formData.companyData.razaoSocial || '') 
    : '';

  const handleCloseClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    onBackToSegments();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-white overflow-auto"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <ResultsHeader 
          segment={segment}
          positiveCount={positiveCount}
          negativeCount={negativeCount}
          companyName={companyName}
          onCloseClick={handleCloseClick}
        />
        
        <main className="my-8">
          <ResultsTabLayout
            activeTab={activeTab}
            onTabChange={(value) => setActiveTab(value as 'overview' | 'articles' | 'highlights')}
            highlights={highlights}
          >
            {activeTab === 'overview' && (
              <OverviewTab 
                segment={segment}
                companyData={formData}
                hasCompanyData={hasCompanyData}
                relevantArticles={resultsData.relevantArticles}
                setExpandedArticleId={resultsData.setExpandedArticleId}
              />
            )}
            
            {activeTab === 'articles' && (
              <ArticlesTab 
                segment={segment}
                filteredArticles={resultsData.filteredArticles}
                relevantArticles={resultsData.relevantArticles}
                expandedArticleId={resultsData.expandedArticleId}
                setExpandedArticleId={resultsData.setExpandedArticleId}
                highlights={resultsData.highlights}
                handleAddHighlight={resultsData.handleAddHighlight}
                handleRemoveHighlight={resultsData.handleRemoveHighlight}
                topics={resultsData.topics}
                articlesByTopic={resultsData.articlesByTopic}
                viewMode={resultsData.viewMode as ViewMode}
                setViewMode={resultsData.setViewMode as (mode: ViewMode) => void}
                positiveCount={positiveCount}
                negativeCount={negativeCount}
                searchTerm={resultsData.searchTerm}
                setSearchTerm={resultsData.setSearchTerm}
                filterType={resultsData.filterType as FilterType}
                setFilterType={resultsData.setFilterType as (type: FilterType) => void}
              />
            )}
            
            {activeTab === 'highlights' && (
              <HighlightsTab 
                highlights={resultsData.highlights}
                handleRemoveHighlight={resultsData.handleRemoveHighlight}
                articles={resultsData.relevantArticles}
              />
            )}
          </ResultsTabLayout>
        </main>
        
        <ResultsFooter />
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Fechar relatório</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja realmente fechar seu relatório?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClose}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>Sim, fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default ResultsContainer;
