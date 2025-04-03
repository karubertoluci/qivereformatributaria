
import React from 'react';
import { Article } from '@/data/articles';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

interface ImpactsSectionProps {
  segmentId: string;
  relevantArticles: Article[];
  onArticleSelect: (articleId: string) => void;
}

const ImpactsSection: React.FC<ImpactsSectionProps> = ({
  segmentId,
  relevantArticles,
  onArticleSelect
}) => {
  // Calculate impact stats
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segmentId))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segmentId))
  ).length;
  
  const neutralCount = relevantArticles.filter(article => 
    article.impacts.every(impact => !impact.segments.includes(segmentId) || impact.type === 'neutral')
  ).length;

  const mixedCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segmentId)) &&
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segmentId))
  ).length;

  const data = [
    { name: 'Positivo', value: positiveCount, color: '#10b981' },
    { name: 'Negativo', value: negativeCount, color: '#ef4444' },
    { name: 'Neutro', value: neutralCount, color: '#6b7280' },
    { name: 'Misto', value: mixedCount, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  const COLORS = ['#10b981', '#ef4444', '#6b7280', '#f59e0b'];

  if (data.length === 0) {
    return (
      <Card className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Sem dados suficientes para análise</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-2 rounded shadow-md border">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-xs">{`${((payload[0].value / relevantArticles.length) * 100).toFixed(1)}% do total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpactsSection;
