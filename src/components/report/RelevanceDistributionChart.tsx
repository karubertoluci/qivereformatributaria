
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { Article } from '@/data/articles';
import { Clock } from 'lucide-react';
import RelevanceBookCards from './relevance-distribution/RelevanceBookCards';
import { useRelevanceDistributionData } from './relevance-distribution/useRelevanceDistributionData';
import RelevanceChartLegend from './relevance-distribution/RelevanceChartLegend';
import { RelevanceChartTooltip } from './relevance-distribution/RelevanceChartTooltip';
import ChartHelp from './relevance-distribution/ChartHelp';

interface RelevanceDistributionChartProps {
  articles: Article[];
  segmentId: string;
  onSelectBook?: (bookId: string | null) => void;
  selectedBook?: string | null;
  onSelectRelevance?: (relevanceLevel: string | null) => void;
  selectedRelevance?: string | null;
}

const RelevanceDistributionChart: React.FC<RelevanceDistributionChartProps> = ({
  articles,
  segmentId,
  onSelectBook,
  selectedBook,
  onSelectRelevance,
  selectedRelevance
}) => {
  const { bookData } = useRelevanceDistributionData(articles, segmentId);
  
  const handleBookSelect = (bookId: string | null) => {
    if (onSelectBook) {
      onSelectBook(bookId === selectedBook ? null : bookId);
    }
  };

  const handleRelevanceSelect = (relevanceLevel: string | null) => {
    if (onSelectRelevance) {
      onSelectRelevance(relevanceLevel === selectedRelevance ? null : relevanceLevel);
    }
  };
  
  // Color mapping for relevance levels
  const colorScheme = {
    muitoRelevante: '#10b981', // green
    moderadamenteRelevante: '#f59e0b', // yellow
    poucoRelevante: '#6b7280', // gray
    irrelevante: '#d1d5db', // light gray
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Distribuição de Artigos por Livro
          </CardTitle>
          <ChartHelp />
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Visualize a quantidade de artigos em cada livro da reforma tributária
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bookData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barGap={0}
              barCategoryGap={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                label={{ value: 'Artigos', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <Tooltip content={<RelevanceChartTooltip />} />
              <Bar 
                dataKey="muitoRelevante" 
                name="Muito relevante"
                stackId="a" 
                fill={colorScheme.muitoRelevante}
                isAnimationActive={false}
              >
                {bookData.map((entry, index) => (
                  <Cell 
                    key={`cell-muito-${index}`} 
                    cursor="pointer"
                    stroke={selectedBook === entry.id ? '#000' : 'transparent'}
                    strokeWidth={selectedBook === entry.id ? 2 : 0}
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="moderadamenteRelevante" 
                name="Moderadamente relevante"
                stackId="a" 
                fill={colorScheme.moderadamenteRelevante}
                isAnimationActive={false}
              >
                {bookData.map((entry, index) => (
                  <Cell 
                    key={`cell-moderadamente-${index}`} 
                    cursor="pointer"
                    stroke={selectedBook === entry.id ? '#000' : 'transparent'}
                    strokeWidth={selectedBook === entry.id ? 2 : 0}
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="poucoRelevante" 
                name="Pouco relevante"
                stackId="a" 
                fill={colorScheme.poucoRelevante}
                isAnimationActive={false}
              >
                {bookData.map((entry, index) => (
                  <Cell 
                    key={`cell-pouco-${index}`} 
                    cursor="pointer"
                    stroke={selectedBook === entry.id ? '#000' : 'transparent'}
                    strokeWidth={selectedBook === entry.id ? 2 : 0}
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="irrelevante" 
                name="Irrelevante"
                stackId="a" 
                fill={colorScheme.irrelevante}
                isAnimationActive={false}
              >
                {bookData.map((entry, index) => (
                  <Cell 
                    key={`cell-irrelevante-${index}`} 
                    cursor="pointer"
                    stroke={selectedBook === entry.id ? '#000' : 'transparent'}
                    strokeWidth={selectedBook === entry.id ? 2 : 0}
                    onClick={() => handleBookSelect(entry.id)}
                  />
                ))}
              </Bar>
              <Legend 
                content={<RelevanceChartLegend 
                  colorScheme={colorScheme} 
                  selectedRelevance={selectedRelevance}
                  onSelectRelevance={handleRelevanceSelect}
                />} 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <RelevanceBookCards 
          bookData={bookData}
          selectedBook={selectedBook}
          onSelectBook={handleBookSelect}
          colorScheme={colorScheme}
        />
      </CardContent>
    </Card>
  );
};

export default RelevanceDistributionChart;
