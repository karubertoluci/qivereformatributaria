
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Article } from '@/data/articles';
import { Clock } from 'lucide-react';
import { ChartLegendHelper } from './charts/ChartLegendHelper';
import { useFavorabilityRelevanceData } from './favorability-relevance/useFavorabilityRelevanceData';
import ChartHeader from './charts/ChartHeader';
import ChartHelp from './relevance-distribution/ChartHelp';
import FavorabilityBarChart from './favorability-relevance/FavorabilityBarChart';
import RelevanceCards from './favorability-relevance/RelevanceCards';

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
        {/* Componente do Gráfico de Barras */}
        <FavorabilityBarChart chartData={chartData} />

        {/* Componente dos Cards de Relevância */}
        <RelevanceCards 
          relevanceLevels={relevanceLevels}
          relevanceTotals={relevanceTotals}
          relevanceFilter={relevanceFilter}
          onRelevanceSelect={handleRelevanceSelect}
        />

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
