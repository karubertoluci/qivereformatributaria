
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../types';
import FilterBar from '../FilterBar';
import ViewSwitcher from '../ViewSwitcher';
import ArticleTableView from '../ArticleTableView';
import ArticleTopicsView from '../ArticleTopicsView';
import ArticlesPriorityChart from '../../ArticlesPriorityChart';
import LegislationBooks from '../../report/LegislationBooks';
import { Book } from 'lucide-react';

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
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <FilterBar 
          positiveCount={positiveCount}
          negativeCount={negativeCount}
          totalCount={relevantArticles.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        
        <ViewSwitcher 
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      {/* Charts Section - Added from Overview */}
      <div className="mb-8 grid md:grid-cols-2 gap-6">
        <LegislationBooks 
          articles={relevantArticles} 
          onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
        />
        
        <div className="p-4 bg-card rounded-lg border shadow-sm">
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Artigos Prioritários para seu Segmento
          </h3>
          
          <ArticlesPriorityChart 
            articles={relevantArticles}
            segmentId={segment.id}
            onSelectArticle={setExpandedArticleId}
          />
        </div>
      </div>
      
      {viewMode === 'chart' && (
        <ArticleTopicsView 
          articlesByTopic={articlesByTopic}
          topics={topics}
          onSelectArticle={setExpandedArticleId}
          expandedArticleId={expandedArticleId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
          filteredArticles={filteredArticles}
          segmentId={segment.id}
          setExpandedArticleId={setExpandedArticleId}
        />
      )}
      
      {viewMode !== 'chart' && (
        <ArticleTableView
          articles={filteredArticles}
          expandedArticleId={expandedArticleId}
          setExpandedArticleId={setExpandedArticleId}
          isTableView={viewMode === 'table'}
          segment={segment}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      )}
    </div>
  );
};

export default ArticlesTab;
