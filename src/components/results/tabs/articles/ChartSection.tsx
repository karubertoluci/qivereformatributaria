import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ListFilter, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ChartSectionProps {
  chartsCollapsed: boolean;
  setChartsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  segment: BusinessSegment;
  relevantArticles: Article[];
  allArticles: Article[];
  showAllArticles: boolean;
  setShowAllArticles: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBookFilter: string | null;
  setSelectedBookFilter: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTitleFilter: (titleId: string | null) => void;
  hasCriticalImpacts: boolean;
  setExpandedArticleId: (id: string) => void;
  selectedRelevanceFilter: string | null;
  setSelectedRelevanceFilter: React.Dispatch<React.SetStateAction<string | null>>;
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
  const totalArticles = showAllArticles ? allArticles.length : relevantArticles.length;
  const positiveCount = showAllArticles ? allArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length : relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  const negativeCount = showAllArticles ? allArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length : relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const data = [
    { name: 'Positivos', value: positiveCount },
    { name: 'Negativos', value: negativeCount },
    { name: 'Neutros', value: totalArticles - positiveCount - negativeCount },
  ];
  
  const handleRelevanceFilter = (relevance: string | null) => {
    setSelectedRelevanceFilter && setSelectedRelevanceFilter(relevance);
    
    if (relevance === 'critical' && hasCriticalImpacts) {
      toast({
        title: "Artigos com impactos críticos",
        description: "Exibindo apenas artigos com impactos negativos de alta severidade."
      });
    } else {
      toast.info("Filtro de relevância removido");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setChartsCollapsed(!chartsCollapsed)}
          >
            {chartsCollapsed ? 'Expandir Gráficos' : 'Minimizar Gráficos'}
          </Button>
          
          {!showAllArticles ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAllArticles(true)}
              className="flex items-center gap-1"
            >
              <ListFilter className="h-3.5 w-3.5" />
              Mostrar todos os artigos
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAllArticles(false)}
              className="flex items-center gap-1"
            >
              <ListFilter className="h-3.5 w-3.5" />
              Mostrar artigos relevantes
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          {hasCriticalImpacts && (
            <>
              {selectedRelevanceFilter !== 'critical' ? (
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRelevanceFilter('critical')}
                  className="flex items-center gap-1"
                >
                  <Target className="h-3.5 w-3.5" />
                  Impactos Críticos
                </Button>
              ) : (
                <Badge 
                  variant="destructive" 
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <Target className="h-3.5 w-3.5 mr-1" />
                  Impactos Críticos
                  <X 
                    className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-destructive" 
                    onClick={() => handleRelevanceFilter(null)}
                  />
                </Badge>
              )}
            </>
          )}
        </div>
      </div>
      
      {!chartsCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border">
            <CardContent>
              <h4 className="text-sm font-medium mb-2">Distribuição de Impactos</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="border">
            <CardContent>
              <h4 className="text-sm font-medium mb-2">Artigos por Livro</h4>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={selectedBookFilter === 'I' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBookFilter(selectedBookFilter === 'I' ? null : 'I')}
                >
                  Livro I ({relevantArticles.filter(article => {
                    const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
                    return id <= 180;
                  }).length})
                </Button>
                <Button 
                  variant={selectedBookFilter === 'II' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBookFilter(selectedBookFilter === 'II' ? null : 'II')}
                >
                  Livro II ({relevantArticles.filter(article => {
                    const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
                    return id > 180 && id <= 300;
                  }).length})
                </Button>
                <Button 
                  variant={selectedBookFilter === 'III' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBookFilter(selectedBookFilter === 'III' ? null : 'III')}
                >
                  Livro III ({relevantArticles.filter(article => {
                    const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
                    return id > 300;
                  }).length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChartSection;
