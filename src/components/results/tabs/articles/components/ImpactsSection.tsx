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
  return <Card className="bg-card/50 shadow-sm border border-muted">
      
      
    </Card>;
};
export default ImpactsSection;