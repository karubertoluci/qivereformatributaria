
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link2 } from 'lucide-react';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import ChartExpandToggle from './components/ChartExpandToggle';
import { Article } from '@/data/articles';

interface ChartSectionProps {
  filteredArticles: Article[];
  segmentId: string;
  setExpandedArticleId: (id: string | null) => void;
  chartExpanded: boolean;
  toggleChartExpanded: () => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  filteredArticles,
  segmentId,
  setExpandedArticleId,
  chartExpanded,
  toggleChartExpanded
}) => {
  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className={`mb-8 ${chartExpanded ? 'h-[600px]' : 'h-[400px]'} transition-all duration-300`}>
      <Card className="relative h-full">
        <CardContent className="p-4 h-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Mapa de Prioridades</h3>
              <button 
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  // Abrir modal ou tooltip com explicação sobre o gráfico
                  alert('O Mapa de Prioridades cruza informações de favorabilidade e relevância para mostrar quais artigos merecem mais atenção.');
                }}
              >
                <Link2 className="h-4 w-4" />
              </button>
            </div>
            
            <ChartExpandToggle 
              expanded={chartExpanded}
              toggleExpanded={toggleChartExpanded}
            />
          </div>
          
          <div className="h-[calc(100%-40px)]">
            <ArticlesPriorityChart 
              articles={filteredArticles}
              segmentId={segmentId}
              onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
