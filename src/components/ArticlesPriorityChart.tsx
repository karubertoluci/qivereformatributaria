
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';
import ChartHeader from '@/components/report/charts/ChartHeader';
import { filterArticlesByRelevance } from './report/charts/utils/chartCalculations';
import { getArticlePriorityData } from './priority-chart/utils/chartCalculations';
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
  const bookFilteredArticles = bookId ? articles.filter(article => {
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
    if (bookId === 'I') return articleNum <= 200;
    if (bookId === 'II') return articleNum > 200 && articleNum <= 350;
    return articleNum > 350;
  }) : articles;

  // Then filter by relevance if needed
  const finalFilteredArticles = relevanceFilter ? filterArticlesByRelevance(bookFilteredArticles, segmentId, relevanceFilter) : bookFilteredArticles;
  const data = getArticlePriorityData(finalFilteredArticles, segmentId);
  
  const handleDotClick = (data: any) => {
    if (onSelectArticle) {
      onSelectArticle(data.id);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <ChartHeader 
          title="Prioridade de Artigos"
          description="Artigos por relevância e urgência"
          icon={<BookMarked className="h-5 w-5 text-primary" />}
        />
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <PriorityScatterChart data={data} onDotClick={handleDotClick} />
        </div>
        <PriorityChartLegend />
      </CardContent>
    </Card>
  );
};

export default ArticlesPriorityChart;
