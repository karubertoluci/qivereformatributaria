
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';
import ChartHeader from '@/components/report/charts/ChartHeader';
import { filterArticlesByRelevance } from './report/charts/utils/chartCalculations';
import { getArticlePriorityData, ArticlePriorityData } from './priority-chart/utils/chartCalculations';
import PriorityScatterChart from './priority-chart/PriorityScatterChart';
import PriorityChartLegend from './priority-chart/PriorityChartLegend';

interface ArticlesPriorityChartProps {
  articles: Article[];
  segmentId: string;
  onSelectArticle?: (articleId: string) => void;
  bookId?: string | null;
  relevanceFilter?: string | null;
}

const ArticlesPriorityChart: React.FC<ArticlesPriorityChartProps> = ({
  articles,
  segmentId,
  onSelectArticle,
  bookId,
  relevanceFilter
}) => {
  // First filter by book if bookId is provided
  const bookFilteredArticles = bookId 
    ? articles.filter(article => {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (bookId === 'I') return articleNum <= 180;
        if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
        return articleNum > 300;
      })
    : articles;
  
  // Then filter by relevance if needed
  const finalFilteredArticles = relevanceFilter 
    ? filterArticlesByRelevance(bookFilteredArticles, segmentId, relevanceFilter)
    : bookFilteredArticles;
  
  const data = getArticlePriorityData(finalFilteredArticles, segmentId);
  
  const handleDotClick = (data: ArticlePriorityData) => {
    if (onSelectArticle) {
      onSelectArticle(data.id);
    }
  };
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <ChartHeader 
          title="Priorização de Leitura"
          description="Artigos organizados por relevância e urgência para seu segmento"
          icon={<BookMarked className="h-5 w-5 text-primary" />}
          tooltipContent="Este gráfico organiza os artigos por prioridade de leitura, combinando relevância para seu segmento e urgência de impacto. Clique em um ponto para ver detalhes do artigo."
          bookId={bookId}
        />
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="h-64">
          <PriorityScatterChart data={data} onDotClick={handleDotClick} />
        </div>
        
        <PriorityChartLegend />
      </CardContent>
    </Card>
  );
};

export default ArticlesPriorityChart;
