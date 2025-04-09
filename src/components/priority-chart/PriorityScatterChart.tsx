
import React from 'react';
import { 
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Rectangle
} from 'recharts';
import { ArticlePriorityData } from './utils/chartCalculations';
import PriorityChartTooltip from './PriorityChartTooltip';

interface PriorityScatterChartProps {
  data: ArticlePriorityData[];
  onDotClick: (data: ArticlePriorityData) => void;
  selectedArticleId?: string | null;
}

const PriorityScatterChart: React.FC<PriorityScatterChartProps> = ({ 
  data, 
  onDotClick,
  selectedArticleId
}) => {
  const renderShape = (props: any) => {
    const { cx, cy, payload } = props;
    
    const isSelected = selectedArticleId === payload.id;
    const fill = payload.impactType === 'positive' ? "#4ade80" : 
                 payload.impactType === 'negative' ? "#ef4444" : "#9ca3af";
    const stroke = payload.impactType === 'positive' ? "#22c55e" : 
                   payload.impactType === 'negative' ? "#dc2626" : "#6b7280";
                   
    return (
      <Rectangle
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill={fill}
        stroke={isSelected ? "#000" : stroke}
        strokeWidth={isSelected ? 2 : 1}
        style={{ cursor: 'pointer' }}
        onClick={() => onDotClick(payload)}
      />
    );
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="relevance" 
          name="Relevância" 
          domain={[0, 100]}
          label={{ value: 'Relevância', position: 'bottom', offset: 0 }} 
        />
        <YAxis 
          type="number" 
          dataKey="urgency" 
          name="Urgência" 
          domain={[0, 100]}
          label={{ value: 'Urgência', angle: -90, position: 'left' }} 
        />
        <ZAxis range={[60, 60]} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          content={<PriorityChartTooltip />}
        />
        <Scatter 
          name="Artigos" 
          data={data} 
          shape={renderShape}
          fill="#8884d8" 
          onClick={onDotClick}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PriorityScatterChart;
