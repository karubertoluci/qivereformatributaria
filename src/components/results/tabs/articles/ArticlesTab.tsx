
import React, { useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { FilterType, ViewMode, HighlightType, Topic } from '@/components/results/types';
import ChartSection from './charts/ChartSection';
import ArticlesFilters from './filters/ArticlesFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import ArticlesContent from './content/ArticlesContent';

interface ArticlesTabProps {
  segment: BusinessSegment;
  filteredArticles: Article[];
  relevantArticles: Article[];
  positiveCount: number;
  negativeCount: number;
  topics: Topic[];
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filterType: FilterType;
  setFilterType: (filterType: FilterType) => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  articlesByTopic: Record<string, Article[]>;
  highlights: HighlightType[];
  handleAddHighlight: (articleId: string, text: string, color?: string) => void;
  handleRemoveHighlight: (id: string) => void;
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
  handleAddHighlight,
  handleRemoveHighlight
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('');
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string>('');
  const isMobile = useIsMobile();
  
  const toggleExpanded = () => setExpanded(!expanded);
  
  // Filter articles based on selections
  const displayedArticles = filteredArticles;
  
  return (
    <TabsContent value="articles" className="space-y-6">
      <ChartSection 
        filteredArticles={filteredArticles} 
        segmentId={segment.id}
        setExpandedArticleId={setExpandedArticleId}
        expanded={expanded}
        toggleExpanded={toggleExpanded}
      />
      
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-[300px_1fr]'} gap-6`}>
        {/* Filters sidebar */}
        <ArticlesFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          positiveCount={positiveCount}
          negativeCount={negativeCount}
          selectedBookFilter={selectedBookFilter}
          setSelectedBookFilter={setSelectedBookFilter}
          selectedTitleFilter={selectedTitleFilter}
          setSelectedTitleFilter={setSelectedTitleFilter}
          relevantArticles={relevantArticles}
        />
        
        {/* Articles list */}
        <ArticlesContent 
          filteredArticles={filteredArticles}
          displayedArticles={displayedArticles}
          selectedBookFilter={selectedBookFilter}
          selectedTitleFilter={selectedTitleFilter}
          setSelectedBookFilter={setSelectedBookFilter}
          setSelectedTitleFilter={setSelectedTitleFilter}
          expandedArticleId={expandedArticleId}
          setExpandedArticleId={setExpandedArticleId}
          highlights={highlights}
          onAddHighlight={handleAddHighlight}
          onRemoveHighlight={handleRemoveHighlight}
          articlesByTopic={articlesByTopic}
          viewMode={viewMode}
          setViewMode={setViewMode}
          topics={topics}
        />
      </div>
    </TabsContent>
  );
};

export default ArticlesTab;
