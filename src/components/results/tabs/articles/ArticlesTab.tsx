
import React, { useState } from 'react';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import { getArticlesByTopic } from '../../ArticlesByTopic';
import ArticlesFilters from './ArticlesFilters';
import ArticlesContent from './ArticlesContent';
import ChartSection from '../articles/ChartSection';
import { Topic, FilterType, ViewMode } from '../../types';

interface ArticlesTabProps {
  segment: BusinessSegment;
  filteredArticles: Article[];
  relevantArticles: Article[];
  positiveCount: number;
  negativeCount: number;
  topics: Topic[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  articlesByTopic: Record<string, Article[]>;
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
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string | null>(null);
  const allArticles = [...relevantArticles]; // Create allArticles for ChartSection
  
  // Define displayedArticles for the ArticlesContent component
  const displayedArticles = filteredArticles;

  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <ChartSection 
        filteredArticles={filteredArticles} 
        segmentId={segment.id}
        segment={segment}
        relevantArticles={relevantArticles}
        allArticles={allArticles}
        setExpandedArticleId={setExpandedArticleId}
        expanded={chartExpanded}
        toggleExpanded={() => setChartExpanded(!chartExpanded)}
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
        neutralCount={0} // Add required neutralCount
        total={relevantArticles.length}
      />
      
      {/* Article Content (List or Table) */}
      <ArticlesContent 
        filteredArticles={filteredArticles}
        displayedArticles={displayedArticles} // Add required displayedArticles prop
        selectedBookFilter={selectedBookFilter} // Add required selectedBookFilter prop
        selectedTitleFilter={selectedTitleFilter} // Add required selectedTitleFilter prop
        setSelectedBookFilter={setSelectedBookFilter} // Add required setSelectedBookFilter prop
        setSelectedTitleFilter={setSelectedTitleFilter} // Add required setSelectedTitleFilter prop
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
