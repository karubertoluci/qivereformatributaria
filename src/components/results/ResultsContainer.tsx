import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { useResultsData } from '@/hooks/useResultsData';

import ReportHeader from '../report/ReportHeader';
import ReportActions from '../report/ReportActions';
import OverviewTabContent from './OverviewTabContent';
import FilterBar from './FilterBar';
import ViewSwitcher from './ViewSwitcher';
import ArticleTopicsView from './ArticleTopicsView';
import ArticleTableView from './ArticleTableView';
import ArticlesPriorityChart from '../ArticlesPriorityChart';
import ResultsSummary from './ResultsSummary';

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
    topics
  } = useResultsData(segment);

  const companyName = formData?.razaoSocial || formData?.nomeFantasia || formData?.nome;

  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      <ReportHeader 
        segment={segment}
        companyName={companyName}
      />
      
      {hasCompanyData && (
        <ReportActions companyData={formData} segment={segment} />
      )}
      
      {/* Visão Geral */}
      <div className="mt-8 mb-10 print:mb-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-primary text-primary-foreground w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-sm">1</span>
          Visão Geral
        </h2>
        <div className="pl-10">
          <OverviewTabContent
            segment={segment}
            companyData={formData}
            hasCompanyData={hasCompanyData}
            relevantArticles={relevantArticles}
            onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
          />
        </div>
      </div>
      
      {/* Artigos e Impactos */}
      <div className="mt-12 print:mt-8 page-break-before">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-primary text-primary-foreground w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-sm">2</span>
          Artigos e Impactos
        </h2>
        <div className="pl-10">
          <ResultsSummary 
            totalArticles={relevantArticles.length}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            segmentName={segment.name}
          />
          
          <div className="my-6">
            <FilterBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              positiveCount={positiveCount}
              negativeCount={negativeCount}
            />
            
            <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <>
              {viewMode === 'chart' && (
                <div className="mb-8">
                  <ArticlesPriorityChart 
                    articles={filteredArticles}
                    segmentId={segment.id}
                    onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
                  />
                </div>
              )}
              
              {viewMode === 'list' && (
                <ArticleTopicsView 
                  filteredArticles={filteredArticles}
                  articlesByTopic={articlesByTopic}
                  topics={topics}
                  segmentId={segment.id}
                  expandedArticleId={expandedArticleId}
                  setExpandedArticleId={setExpandedArticleId}
                />
              )}
              
              {viewMode === 'table' && (
                <ArticleTableView 
                  filteredArticles={filteredArticles}
                  segmentId={segment.id}
                  expandedArticleId={expandedArticleId}
                  setExpandedArticleId={setExpandedArticleId}
                />
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Rodapé do relatório */}
      <div className="mt-16 pt-6 border-t text-center text-sm text-muted-foreground print:mt-8">
        <p>Relatório gerado pela Qive Reforma Tributária 2025</p>
        <p className="mt-1">© {new Date().getFullYear()} Qive. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default ResultsContainer;
