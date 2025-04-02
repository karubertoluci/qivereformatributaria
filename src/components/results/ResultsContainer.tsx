
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { useResultsData } from '@/hooks/useResultsData';

import ReportActions from '../report/ReportActions';
import OverviewTabContent from './OverviewTabContent';
import FilterBar from './FilterBar';
import ViewSwitcher from './ViewSwitcher';
import ArticleTopicsView from './ArticleTopicsView';
import ArticleTableView from './ArticleTableView';
import ArticlesPriorityChart from '../ArticlesPriorityChart';
import ResultsSummary from './ResultsSummary';
import CompanyLegislationRelation from '../report/CompanyLegislationRelation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, List, FileText, Highlighter, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
    setHighlights,
    handleAddHighlight,
    handleRemoveHighlight
  } = useResultsData(segment);

  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      {hasCompanyData && (
        <ReportActions companyData={formData} segment={segment} />
      )}
      
      {/* Relação com seu segmento - full width */}
      <div className="my-8">
        <CompanyLegislationRelation segment={segment} companyData={formData} />
      </div>
      
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
          <div className="space-y-6">
            <ResultsSummary 
              totalArticles={relevantArticles.length}
              positiveCount={positiveCount}
              negativeCount={negativeCount}
              segmentName={segment.name}
              topics={topics}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Chart as filter panel - 1/3 width */}
              <div>
                <div className="border rounded-lg p-4 sticky top-4">
                  <h3 className="text-lg font-medium mb-4">Filtro por Prioridade</h3>
                  <ArticlesPriorityChart 
                    articles={relevantArticles}
                    segmentId={segment.id}
                    onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
                  />
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <FilterBar 
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      filterType={filterType}
                      setFilterType={setFilterType}
                      positiveCount={positiveCount}
                      negativeCount={negativeCount}
                    />
                    
                    <div className="mt-4">
                      <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Articles list - 2/3 width */}
              <div className="md:col-span-2">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
                  </div>
                ) : (
                  <>
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
          </div>
        </TabsContent>
        
        {/* Meus Destaques Tab */}
        <TabsContent value="highlights">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Meus Destaques</h2>
            
            {highlights.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <Highlighter className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Você ainda não possui destaques. Selecione um texto em qualquer parte do relatório 
                  e use a ferramenta de destaque para organizar suas anotações.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {highlights.map((highlight) => (
                  <div 
                    key={highlight.id} 
                    className={`p-4 rounded-lg border flex justify-between items-start ${
                      highlight.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                      highlight.color === 'green' ? 'bg-green-50 border-green-200' :
                      highlight.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                      'bg-pink-50 border-pink-200'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium mb-1">
                        Artigo {relevantArticles.find(a => a.id === highlight.articleId)?.number || 'Não especificado'}
                      </div>
                      <p className="text-sm">"{highlight.text}"</p>
                      <button 
                        className="text-xs text-primary mt-2 underline"
                        onClick={() => {
                          setExpandedArticleId(highlight.articleId);
                          document.querySelector('[value="articles"]')?.dispatchEvent(new Event('click'));
                        }}
                      >
                        Ir para o artigo
                      </button>
                    </div>
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveHighlight(highlight.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Rodapé do relatório */}
      <div className="mt-16 pt-6 border-t text-center text-sm text-muted-foreground print:mt-8">
        <p>Relatório gerado pela Qive Reforma Tributária 2025</p>
        <p className="mt-1">© {new Date().getFullYear()} Qive. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default ResultsContainer;
