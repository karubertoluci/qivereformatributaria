
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Info, ListFilter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import BookTitleRelevanceChart from '@/components/report/BookTitleRelevanceChart';
import { toast } from 'sonner';

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
  setExpandedArticleId
}) => {
  if (chartsCollapsed) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-4" 
        onClick={() => setChartsCollapsed(false)}
      >
        <ArrowDown className="h-4 w-4 mr-1" /> 
        Expandir Gráficos e Filtros
      </Button>
    );
  }
  
  return (
    <div className="space-y-6 mb-8">
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-4" 
        onClick={() => setChartsCollapsed(true)}
      >
        <ArrowUp className="h-4 w-4 mr-1" />
        Recolher Gráficos e Filtros
      </Button>
      
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
      
      <ViewModeCard
        showAllArticles={showAllArticles}
        setShowAllArticles={setShowAllArticles}
      />
    </div>
  );
};

interface ViewModeCardProps {
  showAllArticles: boolean;
  setShowAllArticles: (show: boolean) => void;
}

const ViewModeCard: React.FC<ViewModeCardProps> = ({ showAllArticles, setShowAllArticles }) => {
  return (
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
  );
};

export default ChartSection;
