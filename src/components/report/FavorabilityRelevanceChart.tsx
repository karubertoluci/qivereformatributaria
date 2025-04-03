
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Article } from '@/data/articles';
import { Clock } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartLegendHelper } from './charts/ChartLegendHelper';
import { useFavorabilityRelevanceData } from './favorability-relevance/useFavorabilityRelevanceData';
import ChartHeader from './charts/ChartHeader';
import ChartHelp from './relevance-distribution/ChartHelp';

interface FavorabilityRelevanceChartProps {
  articles: Article[];
  segmentId: string;
  bookId: string | null;
  relevanceFilter: string | null;
  onBookSelect?: (bookId: string | null) => void;
}

const FavorabilityRelevanceChart: React.FC<FavorabilityRelevanceChartProps> = ({
  articles,
  segmentId,
  bookId,
  relevanceFilter,
  onBookSelect
}) => {
  // Use the bookId prop as the initial value
  const [selectedBook, setSelectedBook] = useState<string | null>(bookId);
  
  // Update selectedBook when bookId prop changes
  useEffect(() => {
    setSelectedBook(bookId);
  }, [bookId]);
  
  const { bookData } = useFavorabilityRelevanceData(articles, segmentId, relevanceFilter);
  
  const handleBookToggle = (value: string) => {
    const newValue = value === selectedBook ? null : value;
    setSelectedBook(newValue);
    if (onBookSelect) {
      onBookSelect(newValue);
    }
  };

  // Filter data based on selected book - if no book is selected, show all data
  const chartData = selectedBook 
    ? bookData.filter(book => book.bookId === selectedBook)
    : bookData;

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <ChartHeader 
            title="Favorabilidade por Relevância"
            description="Distribuição de favorabilidade por nível de relevância em cada livro"
            icon={<Clock className="h-5 w-5 text-orange-500" />}
          />
          <ChartHelp 
            title="Sobre este gráfico"
            description="Este gráfico mostra como se distribui a favorabilidade (positivo, neutro, negativo) dos artigos em relação ao seu nível de relevância em cada livro."
            usage={[
              "Clique em um livro abaixo para filtrar",
              "Observe a proporção de impactos favoráveis vs desfavoráveis",
              "Compare os livros para identificar onde estão os maiores desafios"
            ]}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickFormatter={(value) => `${value}%`} 
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={150}
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Percentual']}
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                iconType="square"
                formatter={(value) => {
                  if (value === 'favorable') return 'Favorável';
                  if (value === 'neutral') return 'Neutro';
                  if (value === 'unfavorable') return 'Desfavorável';
                  return value;
                }}
                iconSize={10}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Bar dataKey="favorable" stackId="a" name="favorable" fill="#4ade80" isAnimationActive={false}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`favorable-cell-${index}`} 
                    cursor="pointer"
                  />
                ))}
              </Bar>
              <Bar dataKey="neutral" stackId="a" name="neutral" fill="#d1d5db" isAnimationActive={false}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`neutral-cell-${index}`} 
                    cursor="pointer"
                  />
                ))}
              </Bar>
              <Bar dataKey="unfavorable" stackId="a" name="unfavorable" fill="#ef4444" isAnimationActive={false}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`unfavorable-cell-${index}`} 
                    cursor="pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Book filters */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Filtrar por livro:</p>
          <ToggleGroup type="single" value={selectedBook || ''} onValueChange={handleBookToggle}>
            {bookData
              .filter((book, index, self) => 
                self.findIndex(b => b.bookId === book.bookId) === index
              )
              .map((book) => (
                <ToggleGroupItem 
                  key={book.bookId} 
                  value={book.bookId} 
                  variant="outline" 
                  size="sm"
                  className={`text-xs border-muted ${selectedBook === book.bookId ? 'bg-primary/20' : ''}`}
                >
                  Livro {book.bookId}
                </ToggleGroupItem>
              ))}
          </ToggleGroup>
        </div>

        {/* Legend explanation */}
        <ChartLegendHelper 
          items={[
            { color: '#4ade80', label: 'Favorável', description: 'Impactos positivos para seu segmento' },
            { color: '#d1d5db', label: 'Neutro', description: 'Impactos sem efeitos positivos ou negativos claros' },
            { color: '#ef4444', label: 'Desfavorável', description: 'Impactos negativos ou restritivos para seu segmento' }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default FavorabilityRelevanceChart;
