
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import ImpactDistributionChart from '../../../report/ImpactDistributionChart';
import ChartExpandToggle from './components/ChartExpandToggle';
import BookTitleRelevanceChart from '../../../report/BookTitleRelevanceChart';
import ViewModeCard from './components/ViewModeCard';
import ImpactsSection from './components/ImpactsSection';

interface ChartSectionProps {
  chartsCollapsed: boolean;
  setChartsCollapsed: (collapsed: boolean) => void;
  segment: BusinessSegment;
  relevantArticles: Article[];
  allArticles: Article[];
  showAllArticles: boolean;
  setShowAllArticles: (show: boolean) => void;
  selectedBookFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  setSelectedTitleFilter: (titleId: string | null) => void;
  hasCriticalImpacts: boolean;
  setExpandedArticleId: (id: string | null) => void;
  selectedRelevanceFilter: string | null;
  setSelectedRelevanceFilter: (relevance: string | null) => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  chartsCollapsed,
  setChartsCollapsed,
  segment,
  relevantArticles,
  allArticles,
  showAllArticles,
  setShowAllArticles,
  selectedBookFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  hasCriticalImpacts,
  setExpandedArticleId,
  selectedRelevanceFilter,
  setSelectedRelevanceFilter
}) => {
  const handleBookFilter = (bookId: string) => {
    setSelectedBookFilter(bookId === selectedBookFilter ? null : bookId);
    toast.info(bookId === selectedBookFilter 
      ? "Filtro de livro removido" 
      : `Mostrando apenas artigos do Livro ${bookId}`);
  };

  const handleRelevanceFilter = (relevanceLevel: string | null) => {
    setSelectedRelevanceFilter(relevanceLevel);
    if (relevanceLevel) {
      toast.info(`Filtrando artigos por relevância: ${relevanceLevel}`);
    }
  };

  if (chartsCollapsed) {
    return (
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BarChart className="h-5 w-5 text-[#F97316]" /> 
          Análise Visual
        </h3>
        <ChartExpandToggle 
          collapsed={chartsCollapsed} 
          setCollapsed={setChartsCollapsed}
          collapsedLabel="Expandir gráficos"
          expandedLabel="Recolher gráficos"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BarChart className="h-5 w-5 text-[#F97316]" /> 
          Análise Visual
        </h3>
        <ChartExpandToggle 
          collapsed={chartsCollapsed} 
          setCollapsed={setChartsCollapsed}
          collapsedLabel="Expandir gráficos"
          expandedLabel="Recolher gráficos"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Distribuição de Favorabilidade */}
        <Card>
          <CardContent className="pt-6">
            <ImpactDistributionChart 
              articles={showAllArticles ? allArticles : relevantArticles}
              segmentId={segment.id}
              bookId={selectedBookFilter}
              onRelevanceFilter={handleRelevanceFilter}
              selectedRelevance={selectedRelevanceFilter}
            />
          </CardContent>
        </Card>

        {/* Distribuição por Livros */}
        <Card>
          <CardContent className="pt-6 pb-2">
            <ViewModeCard
              title="Distribuição por Livros"
              icon={<BookOpen className="h-5 w-5 text-[#F97316]" />}
            >
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  Selecione um livro para filtrar os artigos:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedBookFilter === 'I' ? 'default' : 'outline'}
                    className="flex items-center gap-1"
                    onClick={() => handleBookFilter('I')}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Livro I</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedBookFilter === 'II' ? 'default' : 'outline'}
                    className="flex items-center gap-1"
                    onClick={() => handleBookFilter('II')}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Livro II</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedBookFilter === 'III' ? 'default' : 'outline'}
                    className="flex items-center gap-1"
                    onClick={() => handleBookFilter('III')}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Livro III</span>
                  </Button>
                </div>
                
                <BookTitleRelevanceChart 
                  articles={relevantArticles}
                  segmentId={segment.id}
                  bookId={selectedBookFilter || undefined}
                  onSelectTitle={(titleId) => {
                    setSelectedTitleFilter(titleId);
                    toast.info(`Filtrando por título: ${titleId}`);
                  }}
                />
              </div>
            </ViewModeCard>
          </CardContent>
        </Card>
        
        {/* Componente de Impactos */}
        {hasCriticalImpacts && (
          <div className="md:col-span-2">
            <ImpactsSection 
              segment={segment} 
              relevantArticles={relevantArticles} 
              setExpandedArticleId={setExpandedArticleId} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;
