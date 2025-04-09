
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, AlertCircle, HelpCircle } from 'lucide-react';
import { useFavorabilityRelevanceData, RelevanceTotalData } from './favorability-relevance/useFavorabilityRelevanceData';
import FavorabilityBarChart from './favorability-relevance/FavorabilityBarChart';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FavorabilityRelevanceChartProps {
  articles: any[];
  segmentId: string;
  bookId?: string | null;
  onRelevanceFilter?: (relevanceLevel: string | null) => void;
  selectedRelevance?: string | null;
}

const FavorabilityRelevanceChart: React.FC<FavorabilityRelevanceChartProps> = ({ 
  articles, 
  segmentId,
  bookId = 'I',
  onRelevanceFilter,
  selectedRelevance
}) => {
  const [selectedFavorability, setSelectedFavorability] = useState<string | null>(null);
  const { relevanceTotals } = useFavorabilityRelevanceData(articles, segmentId, selectedRelevance);
  const bookName = bookId ? `Livro ${bookId}` : '';
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Favorabilidade por Relevância {bookName && `: ${bookName}`}
          </CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Este gráfico mostra como os artigos se distribuem em termos de favorabilidade (favorável, neutro ou desfavorável) 
                  por cada nível de relevância.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Distribuição de favorabilidade por nível de relevância em cada livro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FavorabilityBarChart 
          chartData={relevanceTotals || []}
          selectedFavorability={selectedFavorability}
          onSelectFavorability={setSelectedFavorability}
        />
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          {relevanceTotals && relevanceTotals.map((item) => (
            <div key={item.relevanceLevel} className="bg-gray-50 p-3 rounded-lg border">
              <div className="font-medium mb-2">{item.relevanceLevel}</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Favorável
                  </span>
                  <span>
                    {item.favorable} ({Math.round(item.favorablePercent)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-1.5"></span>
                    Neutro
                  </span>
                  <span>
                    {item.neutral} ({Math.round(item.neutralPercent)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                    Desfavorável
                  </span>
                  <span>
                    {item.unfavorable} ({Math.round(item.unfavorablePercent)}%)
                  </span>
                </div>
              </div>
              <button 
                className="w-full mt-3 text-xs py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded text-center"
                onClick={() => onRelevanceFilter && onRelevanceFilter(item.relevanceLevel === selectedRelevance ? null : item.relevanceLevel)}
              >
                {item.relevanceLevel === selectedRelevance ? 'Remover filtro' : 'Filtrar'}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavorabilityRelevanceChart;
