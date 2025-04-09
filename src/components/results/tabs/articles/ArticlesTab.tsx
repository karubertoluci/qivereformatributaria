
import React, { useState, useMemo } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article, ArticleMetadata } from '@/data/articles';
import ArticlesFilters from '../articles/filters/ArticlesFilters';
import ActiveFilters from './ActiveFilters';
import ArticlesContent from './content/ArticlesContent';
import { useResultsData } from '@/hooks/results/useResultsData';
import { ViewMode } from '@/components/results/types';
import ResultsSummary from '@/components/results/ResultsSummary';
import { toast } from 'sonner';

interface ArticlesTabProps {
  segment: BusinessSegment;
  results: ReturnType<typeof useResultsData>;
}

const ArticlesTab: React.FC<ArticlesTabProps> = ({ segment, results }) => {
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  
  const books = useMemo(() => {
    const allBooks = results.relevantArticles.map(article => article.metadata?.bookId).filter(Boolean);
    return Array.from(new Set(allBooks)) as string[];
  }, [results.relevantArticles]);
  
  const titles = useMemo(() => {
    const allTitles = results.relevantArticles.map(article => article.metadata?.titulo).filter(Boolean);
    return Array.from(new Set(allTitles)) as string[];
  }, [results.relevantArticles]);
  
  const getBookName = (bookId: string) => {
    const article = results.relevantArticles.find(article => article.metadata?.bookId === bookId);
    return article?.metadata?.bookId || '';
  };
  
  const getTitleName = (titleId: string) => {
    const article = results.relevantArticles.find(article => article.metadata?.titulo === titleId);
    return article?.metadata?.titulo || '';
  };
  
  const displayedArticles = useMemo(() => {
    let articles = [...results.filteredArticles];
    
    if (selectedBookFilter) {
      articles = articles.filter(article => article.metadata?.bookId === selectedBookFilter);
    }
    
    if (selectedTitleFilter) {
      articles = articles.filter(article => article.metadata?.titulo === selectedTitleFilter);
    }
    
    return articles;
  }, [results.filteredArticles, selectedBookFilter, selectedTitleFilter]);

  const positiveCount = displayedArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = displayedArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const neutralCount = displayedArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'neutral' && impact.segments.includes(segment.id))
  ).length;

  const searchTerm = results.searchTerm;
  const setSearchTerm = results.setSearchTerm;
  const filterType = results.filterType;
  const setFilterType = results.setFilterType;

  if (results.error) {
    return (
      <div className="text-red-500">
        Erro ao carregar os artigos: {results.error}
      </div>
    );
  }

  if (results.isLoading) {
    return <div>Carregando artigos...</div>;
  }

  return (
    <div className="space-y-6">
      <ResultsSummary 
        totalArticles={results.relevantArticles.length}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
        segmentName={segment.name}
      />
      
      <ArticlesFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
        totalCount={results.relevantArticles.length}
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        selectedTitleFilter={selectedTitleFilter}
        setSelectedTitleFilter={setSelectedTitleFilter}
        books={books}
        titles={titles}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {/* Book/Title filters */}
      <ActiveFilters 
        selectedBookFilter={selectedBookFilter}
        selectedTitleFilter={selectedTitleFilter}
        onClearBookFilter={() => setSelectedBookFilter(null)}
        onClearTitleFilter={() => setSelectedTitleFilter(null)}
        bookName={getBookName(selectedBookFilter || '')}
        titleName={getTitleName(selectedTitleFilter || '')}
      />
      
      {/* This is where our grid layout will be shown */}
      <ArticlesContent 
        filteredArticles={results.filteredArticles}
        displayedArticles={displayedArticles}
        selectedBookFilter={selectedBookFilter}
        selectedTitleFilter={selectedTitleFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        setSelectedTitleFilter={setSelectedTitleFilter}
        expandedArticleId={results.expandedArticleId}
        setExpandedArticleId={results.setExpandedArticleId}
        highlights={results.highlights}
        onAddHighlight={results.handleAddHighlight}
        onRemoveHighlight={results.handleRemoveHighlight}
        articlesByTopic={results.articlesByTopic}
        viewMode={viewMode}
        setViewMode={setViewMode}
        topics={results.topics}
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={neutralCount}
      />
    </div>
  );
};

export default ArticlesTab;
