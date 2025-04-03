
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../types';
import { ListFilter } from 'lucide-react';
import ActiveFilters from './articles/ActiveFilters';
import ChartSection from './articles/ChartSection';
import ArticlesFilters from './articles/ArticlesFilters';
import ArticlesContent from './articles/ArticlesContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkIcon } from 'lucide-react';

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
  const [showAllArticles, setShowAllArticles] = useState<boolean>(false);
  const [chartsCollapsed, setChartsCollapsed] = useState<boolean>(false);
  const [selectedRelevanceFilter, setSelectedRelevanceFilter] = useState<string | null>(null);
  const [isCompactView, setIsCompactView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  
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
  
  const savedDisplayedArticles = displayedArticles.filter(article => 
    savedArticles.includes(article.id)
  );

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
          <CardTitle className="text-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
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
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            Artigos da Reforma
          </CardTitle>
          <CardDescription>
            Explore os artigos relevantes para seu segmento, filtre por impacto e analise detalhadamente seus efeitos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "saved")}>
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="flex items-center gap-1">
                Todos os Artigos
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1">
                <BookmarkIcon size={16} />
                Artigos Salvos ({savedArticles.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
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
            </TabsContent>
            
            <TabsContent value="saved">
              <ArticlesFilters
                positiveCount={savedDisplayedArticles.filter(article => 
                  article.impacts.some(impact => 
                    impact.type === 'positive' && 
                    impact.segments.includes(segment.id)
                  )
                ).length}
                negativeCount={savedDisplayedArticles.filter(article => 
                  article.impacts.some(impact => 
                    impact.type === 'negative' && 
                    impact.segments.includes(segment.id)
                  )
                ).length}
                totalCount={savedDisplayedArticles.length}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
                viewMode={viewMode}
                setViewMode={setViewMode}
                isCompactView={isCompactView}
                setIsCompactView={setIsCompactView}
              />
              
              {savedDisplayedArticles.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <BookmarkIcon className="mx-auto mb-2" size={40} strokeWidth={1.5} />
                  <p>Nenhum artigo salvo encontrado.</p>
                  <p className="text-sm">Salve artigos para acessá-los rapidamente aqui.</p>
                </div>
              ) : (
                <ArticlesContent
                  viewMode={viewMode}
                  displayedArticles={savedDisplayedArticles}
                  filteredArticles={savedDisplayedArticles}
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
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesTab;
