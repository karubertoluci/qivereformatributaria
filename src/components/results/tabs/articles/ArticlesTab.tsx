
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../../types';
import ActiveFilters from './ActiveFilters';
import ChartSection from './ChartSection';
import ArticlesFilters from './ArticlesFilters';
import ArticlesContent from './ArticlesContent';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ArticlesTabProps {
  segment: BusinessSegment;
  filteredArticles: Article[];
  relevantArticles: Article[];
  positiveCount: number;
  negativeCount: number;
  topics: Topic[];
  viewMode: 'list' | 'table' | 'chart';
  setViewMode: (mode: 'list' | 'table' | 'chart') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: 'all' | 'positive' | 'negative';
  setFilterType: (type: 'all' | 'positive' | 'negative') => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  articlesByTopic: Record<string, Article[]>;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticlesTab: React.FC<ArticlesTabProps> = ({
  segment,
  filteredArticles,
  relevantArticles,
  positiveCount,
  negativeCount,
  topics,
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  expandedArticleId,
  setExpandedArticleId,
  articlesByTopic,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string | null>(null);
  const [showAllArticles, setShowAllArticles] = useState<boolean>(false);
  const [chartsCollapsed, setChartsCollapsed] = useState<boolean>(false);
  const [selectedRelevanceFilter, setSelectedRelevanceFilter] = useState<string | null>(null);
  
  const allArticles = [...relevantArticles];

  const applyCustomFilters = (articlesToFilter: Article[]) => {
    let result = [...articlesToFilter];
    
    if (selectedBookFilter) {
      result = result.filter(article => {
        const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
        let bookId = 'I';
        if (id > 180 && id <= 300) bookId = 'II';
        else if (id > 300) bookId = 'III';
        return bookId === selectedBookFilter;
      });
    }
    
    if (selectedRelevanceFilter) {
      const relevanceLevels = {
        'Irrelevante': 0,
        'Pouco relevante': 1,
        'Moderadamente relevante': 2,
        'Muito relevante': 3
      };
      
      result = result.filter(article => {
        const articleImpact = article.impacts.find(impact => impact.segments.includes(segment.id));
        if (!articleImpact) return false;
        
        const relevanceValue = articleImpact.relevance || 0;
        let relevanceText = 'Irrelevante';
        
        if (relevanceValue === 1) relevanceText = 'Pouco relevante';
        else if (relevanceValue === 2) relevanceText = 'Moderadamente relevante';
        else if (relevanceValue === 3) relevanceText = 'Muito relevante';
        
        return relevanceText === selectedRelevanceFilter;
      });
    }
    
    return result;
  };

  const displayedArticles = applyCustomFilters(filteredArticles);

  const hasCriticalImpacts = relevantArticles.some(article => 
    article.impacts.some(impact => 
      impact.type === 'negative' && 
      impact.segments.includes(segment.id) &&
      impact.severity === 'high'
    )
  );

  useEffect(() => {
    if (searchTerm || filterType !== 'all') {
      // Resetar filtros de livro e título quando busca ou tipo de filtro mudam
      setSelectedBookFilter(null);
      setSelectedTitleFilter(null);
    }
  }, [searchTerm, filterType]);

  return (
    <div className="space-y-8">
      <Card className="border shadow-sm">
        <CardContent className="pt-6">
          <ArticlesFilters
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            totalCount={relevantArticles.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          <ActiveFilters
            selectedBookFilter={selectedBookFilter}
            setSelectedBookFilter={setSelectedBookFilter}
            showAllArticles={showAllArticles}
            setShowAllArticles={setShowAllArticles}
            selectedRelevanceFilter={selectedRelevanceFilter}
            setSelectedRelevanceFilter={setSelectedRelevanceFilter}
          />
          
          {/* Seção 1: Análise Visual */}
          <div className="mt-6">
            <ChartSection
              chartsCollapsed={chartsCollapsed}
              setChartsCollapsed={setChartsCollapsed}
              segment={segment}
              relevantArticles={relevantArticles}
              allArticles={allArticles}
              showAllArticles={showAllArticles}
              setShowAllArticles={setShowAllArticles}
              selectedBookFilter={selectedBookFilter}
              setSelectedBookFilter={setSelectedBookFilter}
              setSelectedTitleFilter={setSelectedTitleFilter}
              hasCriticalImpacts={hasCriticalImpacts}
              setExpandedArticleId={setExpandedArticleId}
              selectedRelevanceFilter={selectedRelevanceFilter}
              setSelectedRelevanceFilter={setSelectedRelevanceFilter}
            />
          </div>
          
          <Separator className="my-8" />
          
          {/* Seção 2: Lista de Artigos */}
          <ArticlesContent
            viewMode={viewMode}
            displayedArticles={displayedArticles}
            filteredArticles={filteredArticles}
            selectedBookFilter={selectedBookFilter}
            selectedTitleFilter={selectedTitleFilter}
            setSelectedBookFilter={setSelectedBookFilter}
            setSelectedTitleFilter={setSelectedTitleFilter}
            expandedArticleId={expandedArticleId}
            setExpandedArticleId={setExpandedArticleId}
            segment={segment}
            highlights={highlights}
            onAddHighlight={onAddHighlight}
            onRemoveHighlight={onRemoveHighlight}
            articlesByTopic={articlesByTopic}
            topics={topics}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesTab;
