
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { PriorityScatterChart } from '@/components/priority-chart/PriorityScatterChart';
import { Button } from '@/components/ui/button';
import { BookOpen, LineChart } from 'lucide-react';
import { toast } from 'sonner';
import { capitalizeFirstLetter } from '@/lib/utils';
import ChartExpandToggle from './components/ChartExpandToggle';
import ImpactsSection from './components/ImpactsSection';
import ViewModeCard from './components/ViewModeCard';

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
  const handleBookClick = (bookId: string) => {
    if (selectedBookFilter === bookId) {
      setSelectedBookFilter(null);
      toast.info("Filtro de livro removido");
    } else {
      setSelectedBookFilter(bookId);
      toast.info(`Filtrando por Livro ${bookId}`);
    }
  };

  const handleTitleClick = (titleId: string) => {
    setSelectedTitleFilter(titleId);
    toast.info(`Filtrando por Título: ${capitalizeFirstLetter(titleId)}`);
  };

  const handleRelevanceFilterSelect = (relevance: string) => {
    if (selectedRelevanceFilter === relevance) {
      setSelectedRelevanceFilter(null);
      toast.info("Filtro de relevância removido");
    } else {
      setSelectedRelevanceFilter(relevance);
      toast.info(`Filtrando por artigos de relevância ${relevance}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <LineChart className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Gráficos e estatísticas</h3>
        </div>
        
        <ChartExpandToggle
          isCollapsed={chartsCollapsed}
          setIsCollapsed={setChartsCollapsed}
          collapsedLabel="Expandir gráficos"
          expandedLabel="Recolher gráficos"
        />
      </div>
      
      {!chartsCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Card 1: Prioridade dos Artigos */}
          <ViewModeCard
            title="Prioridade dos Artigos"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
          >
            <div className="h-64">
              <PriorityScatterChart
                articles={relevantArticles}
                segmentId={segment.id}
                onDataPointClick={(articleId) => {
                  setExpandedArticleId(articleId);
                }}
                onDataPointGroupClick={(group) => {
                  if (group === 'high' || group === 'medium' || group === 'low') {
                    handleRelevanceFilterSelect(group);
                  }
                }}
                selectedRelevance={selectedRelevanceFilter}
              />
            </div>
          </ViewModeCard>
          
          {/* Chart Card 2: Impactos por Tipo */}
          <ViewModeCard
            title="Impactos por Tipo"
            icon={<LineChart className="h-5 w-5 text-primary" />}
          >
            <div className="h-64">
              <ImpactsSection
                segmentId={segment.id}
                relevantArticles={relevantArticles}
                onArticleSelect={setExpandedArticleId}
              />
            </div>
          </ViewModeCard>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4">
        <Button
          variant={selectedBookFilter === 'I' ? 'secondary' : 'outline'}
          onClick={() => handleBookClick('I')}
        >
          Livro I: CBS
        </Button>
        <Button
          variant={selectedBookFilter === 'II' ? 'secondary' : 'outline'}
          onClick={() => handleBookClick('II')}
        >
          Livro II: IBS
        </Button>
        <Button
          variant={selectedBookFilter === 'III' ? 'secondary' : 'outline'}
          onClick={() => handleBookClick('III')}
        >
          Livro III: IS
        </Button>
        <Button
          variant={showAllArticles ? 'secondary' : 'outline'}
          onClick={() => {
            setShowAllArticles(!showAllArticles);
            toast.info(showAllArticles 
              ? "Mostrando apenas artigos relevantes para seu segmento" 
              : "Exibindo todos os 544 artigos da reforma"
            );
          }}
        >
          {showAllArticles ? 'Ver apenas artigos relevantes' : 'Ver todos os artigos'}
        </Button>
      </div>
    </div>
  );
};

export default ChartSection;
