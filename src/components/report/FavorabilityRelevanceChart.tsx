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
  const { chartData, totalArticles } = useFavorabilityRelevanceData(articles, segmentId);

  const renderCustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text x={x + width / 2} y={y - radius} fill="#fff" fontSize={10} textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
      </g>
    );
  };

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
            <Bar dataKey="favoravel" fill="#82ca9d" />
            <Bar dataKey="desfavoravel" fill="#e45858" />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Add a class to the separator to ensure it's gray */}
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
