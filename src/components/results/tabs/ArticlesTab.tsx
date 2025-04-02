
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../types';
import ResultsSummary from '../ResultsSummary';
import ArticlesPriorityChart from '../../ArticlesPriorityChart';
import ArticleTopicsView from '../ArticleTopicsView';
import ArticleTableView from '../ArticleTableView';
import FilterBar from '../FilterBar';
import ViewSwitcher from '../ViewSwitcher';

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
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
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
    <div className="space-y-6">
      <ResultsSummary 
        totalArticles={relevantArticles.length}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        segmentName={segment.name}
        topics={topics}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart as filter panel - 1/3 width */}
        <div>
          <div className="border rounded-lg p-4 sticky top-4">
            <h3 className="text-lg font-medium mb-4">Filtro por Prioridade</h3>
            <ArticlesPriorityChart 
              articles={relevantArticles}
              segmentId={segment.id}
              onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
            />
            
            <div className="my-4 h-px bg-border" />
            
            <div>
              <FilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
                positiveCount={positiveCount}
                negativeCount={negativeCount}
              />
              
              <div className="mt-4">
                <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Articles list - 2/3 width */}
        <div className="md:col-span-2">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <>
              {viewMode === 'list' && (
                <ArticleTopicsView 
                  filteredArticles={filteredArticles}
                  articlesByTopic={articlesByTopic}
                  topics={topics}
                  segmentId={segment.id}
                  expandedArticleId={expandedArticleId}
                  setExpandedArticleId={setExpandedArticleId}
                  highlights={highlights}
                  onAddHighlight={onAddHighlight}
                  onRemoveHighlight={onRemoveHighlight}
                />
              )}
              
              {viewMode === 'table' && (
                <ArticleTableView 
                  filteredArticles={filteredArticles}
                  segmentId={segment.id}
                  expandedArticleId={expandedArticleId}
                  setExpandedArticleId={setExpandedArticleId}
                  highlights={highlights}
                  onAddHighlight={onAddHighlight}
                  onRemoveHighlight={onRemoveHighlight}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesTab;
