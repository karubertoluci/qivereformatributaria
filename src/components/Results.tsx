
import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';

import ArticlesPriorityChart from './ArticlesPriorityChart';
import { topics, getArticlesByTopic } from './results/ArticlesByTopic';
import ResultsHeader from './results/ResultsHeader';
import ResultsSummary from './results/ResultsSummary';
import FilterBar from './results/FilterBar';
import ViewSwitcher from './results/ViewSwitcher';
import ArticleTopicsView from './results/ArticleTopicsView';
import ArticleTableView from './results/ArticleTableView';

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
      {hasCompanyData && (
        <div className="bg-orange-50 p-4 rounded-lg mb-6 border border-orange-200">
          <h2 className="text-xl font-bold mb-2">
            Relatório Personalizado para {companyData.razaoSocial || companyData.nome}
          </h2>
          <div className="text-gray-700">
            <p>
              Olá {companyData.nome}, 
              {companyData.cargo && <span> {companyData.cargo} </span>}
              {companyData.razaoSocial && <span>da empresa {companyData.razaoSocial}.</span>}
            </p>
            <p className="mt-2">
              Seu relatório personalizado está pronto! Analisamos os impactos da reforma tributária para empresas 
              do segmento <strong>{segment.name}</strong> 
              {companyData.cnaePrincipal && (
                <span> com CNAE principal <strong>{companyData.cnaePrincipal.codigo}</strong> - {companyData.cnaePrincipal.descricao}.</span>
              )}
            </p>
            
            {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 && (
              <div className="mt-2">
                <details className="text-sm">
                  <summary className="cursor-pointer text-orange-600 hover:text-orange-700">
                    Ver CNAEs secundários ({companyData.cnaeSecundarios.length})
                  </summary>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    {companyData.cnaeSecundarios.slice(0, 5).map((cnae, i) => (
                      <li key={i}>{cnae.codigo} - {cnae.descricao}</li>
                    ))}
                    {companyData.cnaeSecundarios.length > 5 && (
                      <li>+ {companyData.cnaeSecundarios.length - 5} outros CNAEs</li>
                    )}
                  </ul>
                </details>
              </div>
            )}
          </div>
        </div>
      )}
      
      <ResultsHeader 
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        onBackToSegments={onBackToSegments}
      />
      
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
      />
      
      <ResultsSummary 
        totalArticles={relevantArticles.length}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        segmentName={segment.name}
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
    </div>
  );
};

export default Results;
