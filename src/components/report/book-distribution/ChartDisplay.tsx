
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartDisplayProps } from './types';

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, selectedBook, onBarClick }) => {
  return (
    <div className="h-64 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="bookId" 
            tickFormatter={(value) => `Livro ${value}`} 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis 
            label={{ 
              value: 'Artigos', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } 
            }}
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'articles') return [`${value} artigos`, 'Total'];
              if (name === 'positiveImpacts') return [`${value}`, 'Favoráveis'];
              if (name === 'negativeImpacts') return [`${value}`, 'Desfavoráveis'];
              if (name === 'neutralImpacts') return [`${value}`, 'Neutros'];
              return [value, name];
            }}
            labelFormatter={(value) => `Livro ${value}`}
          />
          <Legend 
            formatter={(value) => {
              if (value === 'articles') return 'Artigos';
              return value;
            }}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar 
            dataKey="articles" 
            name="articles"
            onClick={(data) => onBarClick(data)}
            className="cursor-pointer"
            stackId="a"
          >
            {data.map((entry, index) => {
              // Use color from the entry or a default if not provided
              const fillColor = entry.color || "#3b82f6";
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={fillColor} 
                  stroke={entry.bookId === selectedBook ? '#000' : fillColor}
                  strokeWidth={entry.bookId === selectedBook ? 2 : 0}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
