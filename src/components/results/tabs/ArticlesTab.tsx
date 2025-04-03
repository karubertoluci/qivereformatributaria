import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../types';
import FilterBar from '../FilterBar';
import ViewSwitcher from '../ViewSwitcher';
import ArticleTableView from '../ArticleTableView';
import ArticleTopicsView from '../ArticleTopicsView';
import { Book, Filter, ListFilter, X, ArrowUp, ArrowDown, Info } from 'lucide-react';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import BookTitleRelevanceChart from '@/components/report/BookTitleRelevanceChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      {(selectedBookFilter || showAllArticles) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedBookFilter && (
            <Badge 
              variant="secondary" 
              className="flex items-center gap-1 px-2 py-1"
            >
              <Book className="h-3.5 w-3.5 mr-1" />
              Filtrando por Livro: {selectedBookFilter}
              <X 
                className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
                onClick={() => {
                  setSelectedBookFilter(null);
                  toast.info("Filtro de livro removido");
                }}
              />
            </Badge>
          )}
          
          {showAllArticles && (
            <Badge 
              variant="secondary" 
              className="flex items-center gap-1 px-2 py-1"
            >
              <ListFilter className="h-3.5 w-3.5 mr-1" />
              Mostrando todos os 544 artigos
              <X 
                className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
                onClick={() => {
                  setShowAllArticles(false);
                  toast.info("Mostrando apenas artigos relevantes para seu segmento");
                }}
              />
            </Badge>
          )}
        </div>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-4" 
        onClick={() => setChartsCollapsed(!chartsCollapsed)}
      >
        {chartsCollapsed ? (
          <>
            <ArrowDown className="h-4 w-4 mr-1" /> 
            Expandir Gráficos e Filtros
          </>
        ) : (
          <>
            <ArrowUp className="h-4 w-4 mr-1" />
            Recolher Gráficos e Filtros
          </>
        )}
      </Button>
      
      {!chartsCollapsed && (
        <div className="space-y-6 mb-8">
          <div className="w-full">
            <BookDistributionChart 
              articles={showAllArticles ? allArticles : relevantArticles} 
              onSelectBook={setSelectedBookFilter}
              selectedBook={selectedBookFilter}
            />
          </div>
          
          <div className="w-full">
            <ArticlesPriorityChart 
              articles={relevantArticles}
              segmentId={segment.id}
              onSelectArticle={setExpandedArticleId}
            />
          </div>
          
          <div className="w-full">
            {hasCriticalImpacts && (
              <Alert variant="destructive" className="mb-4">
                <Info className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Atenção: Identificamos impactos altamente desfavoráveis para seu segmento. Recomendamos analisar com cuidado os artigos marcados como "Muito relevante" com impacto desfavorável.
                </AlertDescription>
              </Alert>
            )}
            
            <ImpactDistributionChart 
              articles={showAllArticles ? allArticles : relevantArticles} 
              segmentId={segment.id}
              bookId={selectedBookFilter}
            />
          </div>
          
          {selectedBookFilter && (
            <BookTitleRelevanceChart 
              articles={showAllArticles ? allArticles : relevantArticles}
              bookId={selectedBookFilter}
              segmentId={segment.id}
              onSelectTitle={(titleId) => {
                setSelectedTitleFilter(titleId);
                toast.info(`Filtrando por título ${titleId}`);
              }}
            />
          )}
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md">Modo de Visualização</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground max-w-md">
                <p>Você pode visualizar apenas artigos relevantes para seu segmento, ou todos os 544 artigos da reforma tributária.</p>
              </div>
              
              <Button 
                variant={showAllArticles ? "default" : "outline"} 
                className="flex items-center gap-2 ml-auto"
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
            </CardContent>
          </Card>
        </div>
      )}
      
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
      
      <div className="bg-muted/30 p-4 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">
            {displayedArticles.length} {displayedArticles.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
          </h3>
          {displayedArticles.length !== filteredArticles.length && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedBookFilter(null);
                setSelectedTitleFilter(null);
                toast.info("Todos os filtros adicionais foram removidos");
              }}
            >
              Limpar todos os filtros adicionais
            </Button>
          )}
        </div>
        
        {viewMode === 'table' ? (
          <ArticleTableView 
            articles={displayedArticles}
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
            filteredArticles={displayedArticles}
            segmentId={segment.id}
            setExpandedArticleId={setExpandedArticleId}
          />
        )}
      </div>
    </div>
  );
};

export default ArticlesTab;
