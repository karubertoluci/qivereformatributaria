
import React from 'react';
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
  
  // Color mapping for relevance levels - using the requested colors
  const colorScheme = {
    muitoRelevante: '#10b981', // verde
    moderadamenteRelevante: '#facc15', // amarelo
    poucoRelevante: '#6b7280', // cinza escuro
    irrelevante: '#d1d5db', // cinza claro
  };
  
  console.log('Rendering RelevanceDistributionChart with data:', bookData);

  // Early return with loading message if there's no data yet
  if (!bookData || bookData.length === 0) {
    return (
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="pb-2 border-b border-gray-200">
          <CardTitle className="text-xl">Distribuição de Artigos por Livro</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Check if we have no data with relevant articles (all zeroes)
  const hasData = bookData.some(book => book.total > 0);

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader className="pb-2 border-b border-gray-200">
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
        {!hasData ? (
          <div className="py-8 text-center text-muted-foreground">
            Nenhum artigo encontrado para o segmento selecionado.
          </div>
        ) : (
          <>
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
                    className="cursor-pointer"
                    onClick={(data) => handleBookSelect(data?.id || null)}
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
                    className="cursor-pointer"
                    onClick={(data) => handleBookSelect(data?.id || null)}
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
                    className="cursor-pointer"
                    onClick={(data) => handleBookSelect(data?.id || null)}
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
                    className="cursor-pointer"
                    onClick={(data) => handleBookSelect(data?.id || null)}
                  >
                    {bookData.map((entry, index) => (
                      <Cell 
                        key={`cell-irrelevante-${index}`} 
                        cursor="pointer"
                        stroke={selectedBook === entry.id ? '#000' : 'transparent'}
                        strokeWidth={selectedBook === entry.id ? 2 : 0}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RelevanceDistributionChart;
