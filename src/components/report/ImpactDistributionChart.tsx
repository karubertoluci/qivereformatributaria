
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import ChartHeader from './charts/ChartHeader';
import ImpactAlert from './charts/ImpactAlert';
import ChartLegendHelper from './charts/ChartLegendHelper';
import ImpactBarChart from './charts/ImpactBarChart';
import { 
  calculateRelevanceGroups, 
  calculatePercentageData, 
  checkForCriticalImpacts 
} from './charts/utils/chartCalculations';

interface ImpactDistributionChartProps {
  articles: Article[];
  segmentId: string;
  bookId?: string | null;
}

const ImpactDistributionChart: React.FC<ImpactDistributionChartProps> = ({
  articles,
  segmentId,
  bookId
}) => {
  // Filter articles by book if bookId is provided
  const filteredArticles = bookId 
    ? articles.filter(article => {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (bookId === 'I') return articleNum <= 180;
        if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
        return articleNum > 300;
      })
    : articles;
  
  const relevanceGroups = calculateRelevanceGroups(filteredArticles, segmentId);
  const percentageData = calculatePercentageData(relevanceGroups);
  const hasCriticalImpacts = checkForCriticalImpacts(relevanceGroups);
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <ChartHeader 
          title="Favorabilidade por Relevância"
          description="Análise da distribuição percentual de impactos por nível de relevância"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          tooltipContent="Este gráfico mostra a proporção de impactos favoráveis, neutros e desfavoráveis em cada nível de relevância dos artigos para seu segmento."
          bookId={bookId}
        />
      </CardHeader>
      
      <CardContent>
        {hasCriticalImpacts && (
          <ImpactAlert 
            message="Atenção! Existem artigos muito relevantes com impactos altamente desfavoráveis para seu segmento." 
          />
        )}
        
        <div className="h-48 md:h-60">
          <ImpactBarChart data={percentageData} />
        </div>
        
        <div className="mt-2 p-2 bg-muted/50 rounded-md border border-muted text-xs">
          <div className="flex items-center gap-1 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="font-medium">Legenda:</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-sm mr-1"></span>
              <strong>Verde:</strong> Favorável
            </span>
            <span>
              <span className="inline-block w-2 h-2 bg-gray-300 rounded-sm mr-1"></span>
              <strong>Cinza:</strong> Neutro
            </span>
            <span>
              <span className="inline-block w-2 h-2 bg-red-500 rounded-sm mr-1"></span>
              <strong>Vermelho:</strong> Desfavorável
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactDistributionChart;
