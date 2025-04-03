
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../../types';
import ActiveFilters from './ActiveFilters';
import ChartSection from './ChartSection';
import ArticlesFilters from './ArticlesFilters';
import ArticlesContent from './ArticlesContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  savedArticles: string[];
  onToggleSaveArticle: (articleId: string) => void;
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
  onRemoveHighlight,
  savedArticles,
  onToggleSaveArticle
}) => {
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string | null>(null);
  const [selectedRelevanceFilter, setSelectedRelevanceFilter] = useState<string | null>(null);
  const [showAllArticles, setShowAllArticles] = useState<boolean>(false);
  const [chartsCollapsed, setChartsCollapsed] = useState<boolean>(false);
  const [isCompactView, setIsCompactView] = useState<boolean>(false);
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
    setSelectedBookFilter(null);
    setSelectedTitleFilter(null);
    setSelectedRelevanceFilter(null);
  }, [searchTerm, filterType]);

  return (
    <div className="space-y-8">
      <ActiveFilters
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        showAllArticles={showAllArticles}
        setShowAllArticles={setShowAllArticles}
        selectedRelevanceFilter={selectedRelevanceFilter}
        setSelectedRelevanceFilter={setSelectedRelevanceFilter}
      />
      
      {/* Seção 1: Análise Visual */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-[#F97316]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart text-[#F97316]"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
            Análise Visual
          </CardTitle>
          <CardDescription>
            Visualize os impactos da reforma tributária no seu segmento através de gráficos interativos
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      
      <Separator className="my-8" />
      
      {/* Seção 2: Artigos da Reforma */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-0">
          <CardDescription>
            Explore os artigos relevantes para seu segmento, filtre por impacto e analise detalhadamente seus efeitos
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            isCompactView={isCompactView}
            setIsCompactView={setIsCompactView}
          />
          
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
            isCompactView={isCompactView}
            savedArticles={savedArticles}
            onToggleSaveArticle={onToggleSaveArticle}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesTab;
