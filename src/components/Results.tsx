
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

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'table' | 'chart'>('chart');

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
