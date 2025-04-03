
import React, { useState, useCallback } from 'react';
import { Article } from '@/data/articles'; 
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell
} from 'recharts';
import { calculateScatterPoints } from './utils/chartCalculations';
import PriorityChartTooltip from './PriorityChartTooltip';
import PriorityChartLegend from './PriorityChartLegend';

interface PriorityScatterChartProps {
  articles: Article[];
  segmentId: string;
  onDataPointClick?: (articleId: string) => void;
  onDataPointGroupClick?: (group: string) => void;
  selectedRelevance?: string | null;
}

const PriorityScatterChart: React.FC<PriorityScatterChartProps> = ({ 
  articles,
  segmentId,
  onDataPointClick,
  onDataPointGroupClick,
  selectedRelevance
}) => {
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  
  const chartData = calculateScatterPoints(articles, segmentId);
  
  // Colors for the scatter points
  const getColor = useCallback((category: string) => {
    switch(category) {
      case 'high_positive': return '#22c55e';
      case 'high_negative': return '#ef4444';
      case 'high_neutral': return '#6b7280';
      case 'medium_positive': return '#86efac';
      case 'medium_negative': return '#fca5a5';
      case 'medium_neutral': return '#9ca3af';
      case 'low_positive': return '#d1fae5';
      case 'low_negative': return '#fee2e2';
      case 'low_neutral': return '#e5e7eb';
      default: return '#94a3b8';
    }
  }, []);

  const getOpacity = useCallback((category: string) => {
    const relevance = category.split('_')[0]; // high, medium, low
    
    if (selectedRelevance && relevance !== selectedRelevance) {
      return 0.3;
    }
    
    if (highlightedCategory && category !== highlightedCategory) {
      return 0.3;
    }
    return 1;
  }, [highlightedCategory, selectedRelevance]);

  const getCategoryFromPoint = (point: any) => {
    const relevance = point.relevance; // high, medium, low
    const impact = point.impact; // positive, negative, neutral
    return `${relevance}_${impact}`;
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Relevância" 
            domain={[0, 10]} 
            tick={false}
            axisLine={false}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Impacto" 
            domain={[0, 10]} 
            tick={false}
            axisLine={false}
          />
          <ZAxis type="number" range={[60, 60]} />
          <Tooltip content={<PriorityChartTooltip />} />
          <Scatter name="Articles" data={chartData} onClick={(data) => {
            if (onDataPointClick && data && data.articleId) {
              onDataPointClick(data.articleId);
            }
          }}>
            {chartData.map((entry, index) => {
              const category = getCategoryFromPoint(entry);
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(category)} 
                  opacity={getOpacity(category)}
                />
              )
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <PriorityChartLegend 
        onMouseEnter={(category) => setHighlightedCategory(category)}
        onMouseLeave={() => setHighlightedCategory(null)}
        onClick={(category) => {
          if (onDataPointGroupClick) {
            const relevance = category.split('_')[0]; // high, medium, low
            onDataPointGroupClick(relevance);
          }
        }}
        selectedRelevance={selectedRelevance}
      />
    </div>
  );
};

export default PriorityScatterChart;
