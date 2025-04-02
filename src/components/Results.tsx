
import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArticlesPriorityChart from './ArticlesPriorityChart';
import { topics, getArticlesByTopic } from './results/ArticlesByTopic';
import ResultsHeader from './results/ResultsHeader';
import ResultsSummary from './results/ResultsSummary';
import FilterBar from './results/FilterBar';
import ViewSwitcher from './results/ViewSwitcher';
import ArticleTopicsView from './results/ArticleTopicsView';
import ArticleTableView from './results/ArticleTableView';
import CompanyOverview from './report/CompanyOverview';
import ReformOverview from './report/ReformOverview';
import LegislationBooks from './report/LegislationBooks';
import { Book, Share2, FileText } from 'lucide-react';
import CompanyLegislationRelation from './report/CompanyLegislationRelation';
import ReportActions from './report/ReportActions';

interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

interface CompanyData {
  nome?: string;
  cargo?: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios?: {
    codigo: string;
    descricao: string;
  }[];
  situacaoCadastral?: string;
  naturezaJuridica?: string;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'table' | 'chart'>('chart');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles'>('overview');

  // Obter informações da empresa do formulário (caso tenha sido preenchido)
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const companyData: CompanyData = formData;
  const hasCompanyData = Object.keys(companyData).length > 0;

  // Filtrar artigos que afetam o segmento selecionado
  const relevantArticles = articles.filter(article => 
    article.impacts.some(impact => impact.segments.includes(segment.id))
  );

  // Aplicar filtros de pesquisa e tipo de impacto
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      return article.impacts.some(
        impact => impact.type === filterType && impact.segments.includes(segment.id)
      );
    });

  // Organizar artigos por tópico
  const articlesByTopic = getArticlesByTopic(filteredArticles);

  // Contagem de impactos positivos e negativos
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    setActiveTab('articles');
    // Scroll to the article if in list view
    if (viewMode === 'chart') {
      setViewMode('list');
      // Give time for the view to switch before scrolling
      setTimeout(() => {
        const element = document.getElementById(`article-${articleId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ResultsHeader 
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        onBackToSegments={onBackToSegments}
      />
      
      {hasCompanyData && (
        <ReportActions companyData={companyData} segment={segment} />
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
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {hasCompanyData && (
            <CompanyOverview companyData={companyData} segment={segment} />
          )}
          
          <ReformOverview segment={segment} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <LegislationBooks articles={relevantArticles} onSelectArticle={handleArticleSelect} />
            <CompanyLegislationRelation segment={segment} companyData={companyData} />
          </div>
          
          <div className="p-4 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              Artigos Prioritários para seu Segmento
            </h3>
            
            <ArticlesPriorityChart 
              articles={relevantArticles}
              segmentId={segment.id}
              onSelectArticle={handleArticleSelect}
            />
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setActiveTab('articles')}
                className="text-primary hover:text-primary-dark underline text-sm"
              >
                Ver todos os {relevantArticles.length} artigos
              </button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-6 mt-6">
          <ResultsSummary 
            totalArticles={relevantArticles.length}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            segmentName={segment.name}
          />
          
          <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            positiveCount={positiveCount}
            negativeCount={negativeCount}
          />
          
          <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
          
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
                    onSelectArticle={handleArticleSelect}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
