
import React from 'react';
import { Article } from '@/data/articles';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

interface ArticleImportanceChartProps {
  article: Article;
  segmentId: string;
  className?: string;
}

const ArticleImportanceChart: React.FC<ArticleImportanceChartProps> = ({ 
  article, 
  segmentId,
  className 
}) => {
  // Calculate importance score based on impact types and relevance
  const calculateImportanceScore = () => {
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
  
  const importanceScore = calculateImportanceScore();
  
  // Create chart data
  const chartData = [
    {
      name: 'Importância',
      relevance: importanceScore,
      fill: getScoreColor(importanceScore),
    }
  ];
  
  // Get color based on score
  function getScoreColor(score: number) {
    if (score >= 75) return '#ef4444'; // Critically important - red
    if (score >= 50) return '#f97316'; // Very important - orange
    if (score >= 25) return '#eab308'; // Moderately important - yellow
    return '#65a30d'; // Less important - green
  }
  
  // Get importance level text
  const getImportanceLevel = () => {
    if (importanceScore >= 75) return 'Crítico';
    if (importanceScore >= 50) return 'Muito Importante';
    if (importanceScore >= 25) return 'Importante';
    return 'Informativo';
  };
  
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium">Índice de Relevância</h4>
        <span 
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded",
            importanceScore >= 75 ? "bg-red-100 text-red-700" :
            importanceScore >= 50 ? "bg-orange-100 text-orange-700" :
            importanceScore >= 25 ? "bg-yellow-100 text-yellow-700" :
            "bg-green-100 text-green-700"
          )}
        >
          {getImportanceLevel()}
        </span>
      </div>
      
      <div className="w-full h-14">
        <ChartContainer
          config={{
            relevance: {
              theme: {
                light: getScoreColor(importanceScore),
                dark: getScoreColor(importanceScore),
              }
            },
          }}
        >
          <BarChart data={chartData} layout="vertical" barCategoryGap={1}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Bar 
              dataKey="relevance" 
              fill="var(--color-relevance)"
              radius={4} 
              barSize={14}
              background={{ fill: '#f3f4f6' }}
            />
            <Tooltip
              content={
                ({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value as number;
                    return (
                      <div className="rounded-md border bg-background p-2 shadow-md">
                        <div className="font-medium">Relevância: {value}%</div>
                        <div className="text-xs text-muted-foreground">
                          {getImportanceLevel()}
                        </div>
                      </div>
                    );
                  }
                  
                  return null;
                }
              }
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ArticleImportanceChart;
