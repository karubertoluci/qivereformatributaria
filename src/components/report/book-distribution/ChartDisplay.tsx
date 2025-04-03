
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartDisplayProps } from './types';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, selectedBook, onBarClick }) => {
  // Define chart config for the UI chart component
  const chartConfig = {
    favorable: {
      label: 'Favoráveis',
      color: '#4ade80' // green
    },
    neutral: {
      label: 'Neutros',
      color: '#d1d5db' // gray
    },
    unfavorable: {
      label: 'Desfavoráveis',
      color: '#ef4444' // red
    }
  };

  const formattedData = data.map(book => ({
    name: `Livro ${book.bookId}`,
    bookId: book.bookId,
    title: book.title,
    total: book.articles,
    favorable: book.positiveImpacts,
    neutral: book.neutralImpacts,
    unfavorable: book.negativeImpacts,
    color: book.color
  }));

  return (
    <div className="w-full h-72 mb-4">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={(data) => data && onBarClick(data.activePayload?.[0]?.payload)}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
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
            <ChartTooltip 
              content={<ChartTooltipContent />}
            />
            <Legend />
            <Bar 
              dataKey="favorable" 
              stackId="a" 
              name="favorable"
              fill="#4ade80" 
              className="cursor-pointer"
            />
            <Bar 
              dataKey="neutral" 
              stackId="a" 
              name="neutral"
              fill="#d1d5db" 
              className="cursor-pointer"
            />
            <Bar 
              dataKey="unfavorable" 
              stackId="a" 
              name="unfavorable"
              fill="#ef4444" 
              className="cursor-pointer"
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  stroke={entry.bookId === selectedBook ? '#000' : 'transparent'}
                  strokeWidth={entry.bookId === selectedBook ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default ChartDisplay;
