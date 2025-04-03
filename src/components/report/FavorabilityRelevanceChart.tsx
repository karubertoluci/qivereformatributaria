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
import { toast } from 'sonner';
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
  // Estado local para filtro de relevância dentro do componente
  const [localRelevanceFilter, setLocalRelevanceFilter] = useState<string | null>(relevanceFilter);
  // Estado para filtro de favorabilidade
  const [favorabilityFilter, setFavorabilityFilter] = useState<string | null>(null);

  // Update selectedBook when bookId prop changes
  useEffect(() => {
    setSelectedBook(bookId);
  }, [bookId]);

  // Update local relevance filter when prop changes
  useEffect(() => {
    setLocalRelevanceFilter(relevanceFilter);
  }, [relevanceFilter]);
  const {
    bookData,
    relevanceTotals
  } = useFavorabilityRelevanceData(articles, segmentId, localRelevanceFilter);
  const handleRelevanceSelect = (relevance: string) => {
    // Se já estiver selecionado, remove o filtro
    if (localRelevanceFilter === relevance) {
      setLocalRelevanceFilter(null);
      toast.info(`Filtro de relevância removido`);
    } else {
      setLocalRelevanceFilter(relevance);
      toast.info(`Filtrando por relevância: ${relevance}`);
    }
  };
  const handleFavorabilitySelect = (favorability: string | null) => {
    setFavorabilityFilter(favorability);
    if (favorability) {
      let label = '';
      if (favorability === 'favorable') label = 'Favorável';
      if (favorability === 'neutral') label = 'Neutro';
      if (favorability === 'unfavorable') label = 'Desfavorável';
      toast.info(`Filtrando por favorabilidade: ${label}`);
    } else {
      toast.info('Filtro de favorabilidade removido');
    }
  };

  // Filter data based on selected book - if no book is selected, show aggregated data by relevance level
  const chartData = selectedBook ? bookData.filter(book => book.bookId === selectedBook) : bookData;

  // Garante que temos todos os níveis de relevância no gráfico
  const relevanceLevels = ['Irrelevante', 'Pouco relevante', 'Moderadamente relevante', 'Muito relevante'];

  // Determina o título com base no livro selecionado
  const chartTitle = selectedBook ? `Favorabilidade por Relevância: Livro ${selectedBook}` : "Favorabilidade por Relevância: Geral";
  return <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <ChartHeader title={chartTitle} description="Distribuição de favorabilidade por nível de relevância em cada livro" icon={<Clock className="h-5 w-5 text-orange-500" />} />
          <ChartHelp title="Sobre este gráfico" description="Este gráfico mostra como se distribui a favorabilidade (positivo, neutro, negativo) dos artigos em relação ao seu nível de relevância." usage={["Observe a proporção de impactos favoráveis vs desfavoráveis", "Compare os níveis de relevância para identificar prioridades", "Use os cards abaixo para filtrar por nível de relevância"]} />
        </div>
      </CardHeader>
      
      <CardContent className="my-0">
        {/* Componente do Gráfico de Barras com suporte a filtro de favorabilidade */}
        <FavorabilityBarChart chartData={chartData} selectedFavorability={favorabilityFilter} onSelectFavorability={handleFavorabilitySelect} />

        {/* Componente dos Cards de Relevância */}
        <RelevanceCards relevanceLevels={relevanceLevels} relevanceTotals={relevanceTotals} relevanceFilter={localRelevanceFilter} onRelevanceSelect={handleRelevanceSelect} />

        {/* Explicação da legenda - Removed as we now have interactive legend */}
      </CardContent>
    </Card>;
};
export default FavorabilityRelevanceChart;