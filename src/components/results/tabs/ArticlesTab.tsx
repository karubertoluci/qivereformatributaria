
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../types';
import { ListFilter } from 'lucide-react';
import ActiveFilters from './articles/ActiveFilters';
import ChartSection from './articles/ChartSection';
import ArticlesFilters from './articles/ArticlesFilters';
import ArticlesContent from './articles/ArticlesContent';

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
  }, [searchTerm, filterType]);

  return (
    <div>
      <ActiveFilters
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        showAllArticles={showAllArticles}
        setShowAllArticles={setShowAllArticles}
      />
      
      <ChartSection
        chartsCollapsed={chartsCollapsed}
        setChartsCollapsed={setChartsCollapsed}
        segment={segment}
        segmentId={segment.id} // Add the missing segmentId prop
        relevantArticles={relevantArticles}
        allArticles={allArticles}
        showAllArticles={showAllArticles}
        setShowAllArticles={setShowAllArticles}
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        setSelectedTitleFilter={setSelectedTitleFilter}
        hasCriticalImpacts={hasCriticalImpacts}
        setExpandedArticleId={setExpandedArticleId}
      />
      
      <ArticlesFilters
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        neutralCount={0} // Add required neutralCount prop
        totalCount={relevantArticles.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <ArticlesContent
        viewMode={viewMode}
        displayedArticles={displayedArticles} // Add the required displayedArticles prop
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
    </div>
  );
};

export default ArticlesTab;
