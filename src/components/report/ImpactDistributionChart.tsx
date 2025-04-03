
import React, { useState } from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import ChartHeader from './charts/ChartHeader';
import ImpactAlert from './charts/ImpactAlert';
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
  onRelevanceFilter?: (relevanceLevel: string | null) => void;
  selectedRelevance?: string | null;
}

const ImpactDistributionChart: React.FC<ImpactDistributionChartProps> = ({
  articles,
  segmentId,
  bookId,
  onRelevanceFilter,
  selectedRelevance
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
          icon={<TrendingUp className="h-5 w-5" />}
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
        
        <ImpactBarChart 
          data={percentageData} 
          onRelevanceFilter={onRelevanceFilter}
        />
      </CardContent>
    </Card>
  );
};

export default ImpactDistributionChart;
