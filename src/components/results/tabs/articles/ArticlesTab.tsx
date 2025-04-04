
import React, { useState } from 'react';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import { ArticlesByTopic } from '../../ArticlesByTopic';
import ArticlesFilters from './ArticlesFilters';
import ArticlesContent from './ArticlesContent';
import ChartSection from '../articles/ChartSection';
import { ViewMode } from '../../types';

interface ArticlesTabProps {
  segment: BusinessSegment;
  filteredArticles: Article[];
  relevantArticles: Article[];
  positiveCount: number;
  negativeCount: number;
  topics: string[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  articlesByTopic: ArticlesByTopic;
  highlights: any[];
  onAddHighlight: (articleId: string, text: string) => void;
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
  const [chartExpanded, setChartExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <ChartSection 
        filteredArticles={filteredArticles} 
        segmentId={segment.id}
        setExpandedArticleId={setExpandedArticleId}
        chartExpanded={chartExpanded}
        toggleChartExpanded={() => setChartExpanded(!chartExpanded)}
      />
      
      {/* Search and Filters */}
      <ArticlesFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        viewMode={viewMode}
        setViewMode={setViewMode}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        total={relevantArticles.length}
      />
      
      {/* Article Content (List or Table) */}
      <ArticlesContent 
        filteredArticles={filteredArticles}
        segment={segment}
        topics={topics}
        viewMode={viewMode}
        expandedArticleId={expandedArticleId}
        setExpandedArticleId={setExpandedArticleId}
        articlesByTopic={articlesByTopic}
        highlights={highlights}
        onAddHighlight={onAddHighlight}
        onRemoveHighlight={onRemoveHighlight}
      />
    </div>
  );
};

export default ArticlesTab;
