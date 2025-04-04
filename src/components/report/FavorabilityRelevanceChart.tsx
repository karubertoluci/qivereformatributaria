
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle } from 'lucide-react';
import { useFavorabilityRelevanceData } from './favorability-relevance/useFavorabilityRelevanceData';

interface FavorabilityRelevanceChartProps {
  articles: any[];
  segmentId: string;
}

const FavorabilityRelevanceChart: React.FC<FavorabilityRelevanceChartProps> = ({ 
  articles, 
  segmentId 
}) => {
  // Pass null as the third argument for relevanceFilter
  const { bookData, relevanceTotals } = useFavorabilityRelevanceData(articles, segmentId, null);
  
  // Use the bookData for the chart
  const chartData = bookData;
  const totalArticles = chartData.reduce((sum, item) => sum + (item.favorable || 0) + (item.unfavorable || 0), 0);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Relação entre Favorabilidade e Relevância</CardTitle>
        <CardDescription>
          Distribuição de artigos por favorabilidade e relevância.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="favorable" fill="#82ca9d" />
            <Bar dataKey="unfavorable" fill="#e45858" />
          </BarChart>
        </ResponsiveContainer>
        
        <Separator className="my-4 bg-gray-200" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
            <p className="text-sm text-muted-foreground">
              Um número alto de artigos desfavoráveis pode indicar áreas de atenção.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium">Total de Artigos:</span>{" "}
            <span className="text-sm">{totalArticles}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavorabilityRelevanceChart;
