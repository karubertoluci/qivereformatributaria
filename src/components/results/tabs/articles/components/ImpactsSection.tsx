
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { filterArticlesByRelevance } from '@/components/report/charts/utils/chartCalculations';

interface ImpactsSectionProps {
  hasCriticalImpacts: boolean;
  showAllArticles: boolean;
  allArticles: Article[];
  relevantArticles: Article[];
  segmentId: string;
  bookId: string | null;
  relevanceFilter?: string | null;
}

const ImpactsSection: React.FC<ImpactsSectionProps> = ({
  hasCriticalImpacts,
  showAllArticles,
  allArticles,
  relevantArticles,
  segmentId,
  bookId,
  relevanceFilter
}) => {
  // First apply book filter if needed
  const bookFilteredArticles = bookId ? (showAllArticles ? allArticles : relevantArticles).filter(article => {
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
    if (bookId === 'I') return articleNum <= 180;
    if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
    return articleNum > 300;
  }) : showAllArticles ? allArticles : relevantArticles;

  // Then apply relevance filter if needed
  const finalFilteredArticles = relevanceFilter ? filterArticlesByRelevance(bookFilteredArticles, segmentId, relevanceFilter) : bookFilteredArticles;

  // Count impacts by type after all filters
  const positiveCount = finalFilteredArticles.filter(article => article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segmentId))).length;
  const negativeCount = finalFilteredArticles.filter(article => article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segmentId))).length;
  const neutralCount = finalFilteredArticles.filter(article => article.impacts.some(impact => impact.type === 'neutral' && impact.segments.includes(segmentId))).length;

  if (!hasCriticalImpacts && positiveCount === 0 && negativeCount === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {hasCriticalImpacts && <AlertTriangle className="h-5 w-5 text-destructive" />}
          Impactos da Reforma Tributária
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="font-medium text-green-600 dark:text-green-400">Positivos</p>
            <p className="text-2xl font-bold">{positiveCount}</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <p className="font-medium text-amber-600 dark:text-amber-400">Neutros</p>
            <p className="text-2xl font-bold">{neutralCount}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="font-medium text-red-600 dark:text-red-400">Negativos</p>
            <p className="text-2xl font-bold">{negativeCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactsSection;
