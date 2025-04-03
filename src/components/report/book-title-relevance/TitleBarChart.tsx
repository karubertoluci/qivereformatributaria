
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TitleBarChartProps } from './types';

const TitleBarChart: React.FC<TitleBarChartProps> = ({ data, colors, onBarClick }) => {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barGap={0}
          barCategoryGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            height={80}
            tick={(props) => {
              const { x, y, payload } = props;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text 
                    x={0} 
                    y={0} 
                    dy={16} 
                    textAnchor="end" 
                    fill="#666" 
                    transform="rotate(-45)"
                    style={{ fontSize: 11 }}
                  >
                    {payload.value}
                  </text>
                </g>
              );
            }}
          />
          <YAxis label={{ value: 'Número de Artigos', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'muitoRelevante') return [value, 'Muito Relevante'];
              if (name === 'moderadamenteRelevante') return [value, 'Moderadamente Relevante'];
              if (name === 'poucoRelevante') return [value, 'Pouco Relevante'];
              if (name === 'irrelevante') return [value, 'Irrelevante'];
              return [value, name];
            }}
          />
          <Legend 
            formatter={(value) => {
              if (value === 'muitoRelevante') return 'Muito Relevante';
              if (value === 'moderadamenteRelevante') return 'Moderadamente Relevante';
              if (value === 'poucoRelevante') return 'Pouco Relevante';
              if (value === 'irrelevante') return 'Irrelevante';
              return value;
            }}
            iconSize={15}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar 
            dataKey="irrelevante" 
            fill={colors.irrelevante} 
            onClick={onBarClick}
            className="cursor-pointer"
          />
          <Bar 
            dataKey="poucoRelevante" 
            fill={colors.poucoRelevante} 
            onClick={onBarClick}
            className="cursor-pointer"
          />
          <Bar 
            dataKey="moderadamenteRelevante" 
            fill={colors.moderadamenteRelevante} 
            onClick={onBarClick}
            className="cursor-pointer"
          />
          <Bar 
            dataKey="muitoRelevante" 
            fill={colors.muitoRelevante} 
            onClick={onBarClick}
            className="cursor-pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TitleBarChart;
