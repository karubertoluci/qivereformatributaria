
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { ChartDisplayProps } from './types';

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, selectedBook, onBarClick }) => {
  return (
    <div className="h-64 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="bookId" 
            tickFormatter={(value) => `Livro ${value}`} 
          />
          <YAxis 
            label={{ value: 'Artigos', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'articles') return [`${value} artigos`, 'Artigos'];
              if (name === 'positiveImpacts') return [`${value}`, 'Impactos Favoráveis'];
              if (name === 'negativeImpacts') return [`${value}`, 'Impactos Desfavoráveis'];
              if (name === 'neutralImpacts') return [`${value}`, 'Impactos Neutros'];
              return [value, name];
            }}
            labelFormatter={(value) => `Livro ${value}`}
          />
          <Legend 
            formatter={(value) => {
              if (value === 'articles') return 'Artigos';
              if (value === 'positiveImpacts') return 'Impactos Favoráveis';
              if (value === 'negativeImpacts') return 'Impactos Desfavoráveis';
              if (value === 'neutralImpacts') return 'Impactos Neutros';
              return value;
            }}
          />
          <Bar 
            dataKey="articles" 
            fill="#8884d8" 
            name="articles"
            onClick={(data) => onBarClick(data)}
            className="cursor-pointer"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke={entry.bookId === selectedBook ? '#000' : entry.color}
                strokeWidth={entry.bookId === selectedBook ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
