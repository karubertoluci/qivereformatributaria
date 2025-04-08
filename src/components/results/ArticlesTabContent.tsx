
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { Topic } from './types';
import ResultsSummary from './ResultsSummary';
import FilterBar from './FilterBar';
import ViewSwitcher from './ViewSwitcher';
import ArticlesPriorityChart from '../ArticlesPriorityChart';
import ArticleTopicsView from './ArticleTopicsView';
import ArticleTableView from './ArticleTableView';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArticlesTabContentProps {
  segment: BusinessSegment;
  filteredArticles: Article[];
  relevantArticles: Article[];
  positiveCount: number;
  negativeCount: number;
  viewMode: 'list' | 'table' | 'chart';
  setViewMode: (mode: 'list' | 'table' | 'chart') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: 'all' | 'positive' | 'negative';
  setFilterType: (type: 'all' | 'positive' | 'negative') => void;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  articlesByTopic: Record<string, Article[]>;
  topics: Topic[];
  neutralCount?: number;
}

const ArticlesTabContent: React.FC<ArticlesTabContentProps> = ({
  segment,
  filteredArticles,
  relevantArticles,
  positiveCount,
  negativeCount,
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  expandedArticleId,
  setExpandedArticleId,
  articlesByTopic,
  topics,
  neutralCount = 0
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
      <ResultsSummary 
        totalArticles={relevantArticles.length}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        segmentName={segment.name}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <FilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          positiveCount={positiveCount}
          negativeCount={negativeCount}
          neutralCount={neutralCount}
          totalCount={relevantArticles.length}
        />
        
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
        </div>
      ) : (
        <>
          {viewMode === 'chart' && (
            <div className="mb-6 md:mb-8 overflow-x-auto">
              <div className={isMobile ? "min-w-[500px]" : ""}>
                <ArticlesPriorityChart 
                  articles={filteredArticles}
                  segmentId={segment.id}
                  onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
                />
              </div>
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
              onSelectArticle={(id) => setExpandedArticleId(id)}
            />
          )}
          
          {viewMode === 'table' && (
            <div className="overflow-x-auto">
              <div className={isMobile ? "min-w-[500px]" : ""}>
                <ArticleTableView 
                  articles={filteredArticles}
                  segment={segment}
                  expandedArticleId={expandedArticleId}
                  setExpandedArticleId={setExpandedArticleId}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlesTabContent;
