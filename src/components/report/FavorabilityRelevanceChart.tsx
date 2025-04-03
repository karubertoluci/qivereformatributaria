
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Article } from '@/data/articles';
import { Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartLegendHelper } from './charts/ChartLegendHelper';
import { useFavorabilityRelevanceData } from './favorability-relevance/useFavorabilityRelevanceData';
import ChartHeader from './charts/ChartHeader';
import ChartHelp from './relevance-distribution/ChartHelp';
import { cn } from '@/lib/utils';

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
  
  const { bookData, relevanceTotals } = useFavorabilityRelevanceData(articles, segmentId, relevanceFilter);
  
  const handleRelevanceSelect = (relevance: string) => {
    // Implementar no futuro caso necessário
  };

  // Filter data based on selected book - if no book is selected, show all data
  const chartData = selectedBook 
    ? bookData.filter(book => book.bookId === selectedBook)
    : bookData;

  // Garante que temos todos os níveis de relevância no gráfico
  const relevanceLevels = ['Irrelevante', 'Pouco relevante', 'Moderadamente relevante', 'Muito relevante'];
  
  // Determina o título com base no livro selecionado
  const chartTitle = selectedBook 
    ? `Favorabilidade por Relevância: Livro ${selectedBook}` 
    : "Favorabilidade por Relevância: Geral";

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <ChartHeader 
            title={chartTitle}
            description="Distribuição de favorabilidade por nível de relevância em cada livro"
            icon={<Clock className="h-5 w-5 text-orange-500" />}
          />
          <ChartHelp 
            title="Sobre este gráfico"
            description="Este gráfico mostra como se distribui a favorabilidade (positivo, neutro, negativo) dos artigos em relação ao seu nível de relevância."
            usage={[
              "Observe a proporção de impactos favoráveis vs desfavoráveis",
              "Compare os níveis de relevância para identificar prioridades",
              "Use os cards abaixo para filtrar por nível de relevância"
            ]}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64">
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
                dataKey="relevanceLevel" 
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
              <Bar dataKey="favorable" stackId="a" name="favorable" fill="#4ade80" isAnimationActive={false} />
              <Bar dataKey="neutral" stackId="a" name="neutral" fill="#d1d5db" isAnimationActive={false} />
              <Bar dataKey="unfavorable" stackId="a" name="unfavorable" fill="#ef4444" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cards de Relevância - Exibe todos os níveis, mesmo sem dados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {relevanceLevels.map((level) => {
            // Encontra os dados para este nível ou usa valores zerados
            const relevanceData = relevanceTotals.find(item => item.relevanceLevel === level) || {
              relevanceLevel: level,
              favorable: 0,
              neutral: 0,
              unfavorable: 0,
              total: 0,
              favorablePercent: 0,
              neutralPercent: 0,
              unfavorablePercent: 0
            };
            
            return (
              <Card key={level} className={cn(
                "border border-muted",
                relevanceFilter === level ? "border-primary bg-secondary/20" : ""
              )}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-2">{level}</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <span className="h-2 w-2 bg-[#4ade80] rounded-full mr-1.5"></span>
                        Favoráveis:
                      </span>
                      <span className="font-medium">
                        {relevanceData.favorablePercent}% ({relevanceData.favorable})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <span className="h-2 w-2 bg-[#d1d5db] rounded-full mr-1.5"></span>
                        Neutros:
                      </span>
                      <span className="font-medium">
                        {relevanceData.neutralPercent}% ({relevanceData.neutral})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <span className="h-2 w-2 bg-[#ef4444] rounded-full mr-1.5"></span>
                        Desfavoráveis:
                      </span>
                      <span className="font-medium">
                        {relevanceData.unfavorablePercent}% ({relevanceData.unfavorable})
                      </span>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-3 py-1 px-2 text-xs bg-muted hover:bg-muted/80 rounded"
                    onClick={() => handleRelevanceSelect(level)}
                  >
                    Filtrar
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Explicação da legenda */}
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
