
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
  Legend
} from 'recharts';
import { ArticlePriorityData } from './utils/chartCalculations';
import PriorityChartTooltip from './PriorityChartTooltip';

interface PriorityScatterChartProps {
  data: ArticlePriorityData[];
  onDotClick: (data: ArticlePriorityData) => void;
}

const PriorityScatterChart: React.FC<PriorityScatterChartProps> = ({ data, onDotClick }) => {
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
          formatter={(value, name) => [value, name === 'relevance' ? 'Relevância' : 'Urgência']}
          content={<PriorityChartTooltip />}
        />
        <Legend />
        <Scatter 
          name="Artigos" 
          data={data} 
          fill="#8884d8" 
          onClick={onDotClick}
        >
          {data.map((entry, index) => (
            <rect
              key={`cell-${index}`}
              x={0}
              y={0}
              width={10}
              height={10}
              fill={entry.isNegative ? "#ef4444" : "#4ade80"}
              stroke={entry.isNegative ? "#dc2626" : "#22c55e"}
              strokeWidth={1}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PriorityScatterChart;
