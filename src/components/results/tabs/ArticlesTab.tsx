
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../types';
import FilterBar from '../FilterBar';
import ViewSwitcher from '../ViewSwitcher';
import ArticleTableView from '../ArticleTableView';
import ArticleTopicsView from '../ArticleTopicsView';
import LegislationBooks from '../../report/LegislationBooks';
import { Book, Filter, ListFilter, X } from 'lucide-react';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import BookTitleRelevanceChart from '@/components/report/BookTitleRelevanceChart';
import { Button } from '@/components/ui/button';

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
  // State to track book filter
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);
  
  // State to track viewing mode (all articles vs. relevant articles)
  const [showAllArticles, setShowAllArticles] = useState<boolean>(false);
  
  // All articles in the system (simulated 544 articles)
  const allArticles = [...relevantArticles];
  
  // Custom filter for books
  const bookFilteredArticles = selectedBookFilter 
    ? filteredArticles.filter(article => {
        // Using the same book assignment logic as in LegislationBooks
        const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
        let bookId = 'I';
        if (id % 4 === 0) bookId = 'II';
        if (id % 4 === 1) bookId = 'I';
        if (id % 4 === 2) bookId = 'III';
        if (id % 4 === 3) bookId = 'IV';
        return bookId === selectedBookFilter;
      })
    : filteredArticles;
  
  // When filteredArticles changes (due to search or filter type), reset book filter
  useEffect(() => {
    setSelectedBookFilter(null);
  }, [searchTerm, filterType]);

  return (
    <div>
      {/* Charts Section */}
      <div className="mb-8 grid md:grid-cols-2 gap-6">
        <BookDistributionChart 
          articles={showAllArticles ? allArticles : relevantArticles} 
          onSelectBook={setSelectedBookFilter}
          selectedBook={selectedBookFilter}
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
      
      {/* Impact Distribution Chart */}
      <ImpactDistributionChart 
        articles={showAllArticles ? allArticles : relevantArticles} 
        segmentId={segment.id}
        bookId={selectedBookFilter}
      />
      
      {/* Book Title Relevance Chart - show only when a book is selected */}
      {selectedBookFilter && (
        <BookTitleRelevanceChart 
          articles={showAllArticles ? allArticles : relevantArticles}
          bookId={selectedBookFilter}
          segmentId={segment.id}
        />
      )}
      
      {/* Moved FilterBar and ViewSwitcher below the charts */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <FilterBar 
            positiveCount={positiveCount}
            negativeCount={negativeCount}
            totalCount={relevantArticles.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
          />
          
          {selectedBookFilter && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
              onClick={() => setSelectedBookFilter(null)}
            >
              <Filter className="h-3 w-3" />
              Filtrando por Livro: {selectedBookFilter}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          
          <Button 
            variant={showAllArticles ? "default" : "outline"} 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              setShowAllArticles(!showAllArticles);
              toast.info(showAllArticles 
                ? "Mostrando apenas artigos relevantes para seu segmento" 
                : "Mostrando todos os 544 artigos da reforma tributária");
            }}
          >
            <ListFilter className="h-4 w-4" />
            {showAllArticles ? "Mostrar Relevantes" : "Mostrar Todos"}
          </Button>
        </div>
        
        <ViewSwitcher 
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
      
      {/* Article Table or Topics View */}
      {viewMode === 'table' ? (
        <ArticleTableView 
          articles={bookFilteredArticles}
          expandedArticleId={expandedArticleId}
          setExpandedArticleId={setExpandedArticleId}
          isTableView={true}
          segment={segment}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
        />
      ) : (
        <ArticleTopicsView 
          articlesByTopic={articlesByTopic}
          topics={topics}
          onSelectArticle={setExpandedArticleId}
          expandedArticleId={expandedArticleId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
          onRemoveHighlight={onRemoveHighlight}
          filteredArticles={bookFilteredArticles}
          segmentId={segment.id}
          setExpandedArticleId={setExpandedArticleId}
        />
      )}
    </div>
  );
};

export default ArticlesTab;
