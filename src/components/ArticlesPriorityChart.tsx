
import React from 'react';
import { Article } from '@/data/articles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChartIcon } from 'lucide-react';

interface ArticlesPriorityChartProps {
  articles: Article[];
  segmentId: string;
  onSelectArticle: (articleId: string) => void;
}

const ArticlesPriorityChart: React.FC<ArticlesPriorityChartProps> = ({ 
  articles,
  segmentId,
  onSelectArticle
}) => {
  // Calculate importance score for each article
  const calculateImportanceScore = (article: Article) => {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    let score = 0;
    
    // Base score from number of impacts
    score += segmentImpacts.length * 10;
    
    // Additional points based on impact type
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') score += 15;
      if (impact.type === 'negative') score += 20; // Negative impacts slightly more important to be aware of
    });
    
    return Math.min(score, 100); // Cap at 100
  };
  
  // Create sorted chart data
  const chartData = articles
    .map(article => ({
      id: article.id,
      name: article.number,
      title: article.title,
      score: calculateImportanceScore(article),
    }))
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 10); // Only show top 10 most important articles
  
  // Get color based on score
  function getScoreColor(score: number) {
    if (score >= 75) return '#ef4444'; // Critical - red
    if (score >= 50) return '#f97316'; // Very important - orange
    if (score >= 25) return '#eab308'; // Important - yellow
    return '#65a30d'; // Informational - green
  }

  // Handle chart click
  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedItem = data.activePayload[0].payload;
      if (clickedItem && clickedItem.id) {
        onSelectArticle(clickedItem.id);
      }
    }
  };
  
  return (
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <div className="flex items-center gap-2 font-medium text-lg mb-4">
        <BarChartIcon className="h-5 w-5 text-primary" />
        <h3>Priorização de Leitura</h3>
      </div>
      
      {chartData.length === 0 ? (
        <div className="w-full h-80 flex items-center justify-center text-muted-foreground">
          Nenhum artigo com impacto relevante encontrado.
        </div>
      ) : (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              barCategoryGap={8}
              margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickCount={6} 
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={50} 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip
                content={
                  ({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-md border bg-background p-2 shadow-md max-w-xs">
                          <div className="font-medium">{data.name} - {data.title}</div>
                          <div className="text-sm mt-1">Relevância: {data.score}%</div>
                          <div className="text-xs mt-1 text-muted-foreground">
                            Clique para visualizar o artigo
                          </div>
                        </div>
                      );
                    }
                    
                    return null;
                  }
                }
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20} className="cursor-pointer">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <p className="text-xs text-center mt-2 text-muted-foreground">
        Clique nas barras para expandir os artigos correspondentes
      </p>
    </div>
  );
};

export default ArticlesPriorityChart;
