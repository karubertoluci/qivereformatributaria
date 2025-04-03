
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { HighlightType, Topic } from '../../types';
import { ListFilter } from 'lucide-react';
import ActiveFilters from './ActiveFilters';
import ChartSection from './ChartSection';
import ArticlesFilters from './ArticlesFilters';
import ArticlesContent from './ArticlesContent';
import { Separator } from '@/components/ui/separator';
import { BarChart3, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="space-y-8">
      {/* Filtros ativos */}
      <ActiveFilters
        selectedBookFilter={selectedBookFilter}
        setSelectedBookFilter={setSelectedBookFilter}
        showAllArticles={showAllArticles}
        setShowAllArticles={setShowAllArticles}
      />
      
      {/* Seção 1: Análise Visual - Gráficos e Visualização de Dados */}
      <Card className="border border-muted p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Análise Visual</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Explore os dados da reforma tributária de forma visual e interativa. 
          Clique nos elementos dos gráficos para filtrar os artigos relacionados ao seu segmento.
        </p>
      
        <CardContent className="p-0">
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
          />
        </CardContent>
      </Card>
      
      <Separator className="my-8" />
      
      {/* Seção 2: Artigos da Reforma */}
      <Card className="border border-muted p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Artigos da Reforma</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Visualize os artigos da reforma tributária relevantes para seu segmento. 
          Use os filtros abaixo para refinar os resultados ou utilize as diferentes visualizações disponíveis.
        </p>
      
        <CardContent className="p-0 pt-4">
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesTab;
