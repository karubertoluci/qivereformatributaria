
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
  const bookFilteredArticles = bookId 
    ? (showAllArticles ? allArticles : relevantArticles).filter(article => {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (bookId === 'I') return articleNum <= 180;
        if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
        return articleNum > 300;
      })
    : (showAllArticles ? allArticles : relevantArticles);
    
  // Then apply relevance filter if needed
  const finalFilteredArticles = relevanceFilter 
    ? filterArticlesByRelevance(bookFilteredArticles, segmentId, relevanceFilter)
    : bookFilteredArticles;
  
  // Count impacts by type after all filters
  const positiveCount = finalFilteredArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segmentId))
  ).length;
  
  const negativeCount = finalFilteredArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segmentId))
  ).length;
  
  const neutralCount = finalFilteredArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'neutral' && impact.segments.includes(segmentId))
  ).length;
  
  if (!hasCriticalImpacts && positiveCount === 0 && negativeCount === 0) {
    return null;
  }
  
  return (
    <Card className="bg-card/50 shadow-sm border border-muted">
      <CardHeader className="py-2 px-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-medium">Resumo dos impactos {bookId ? `do Livro ${bookId}` : ''} {relevanceFilter ? `com relevância "${relevanceFilter}"` : ''}</h3>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 border border-green-100 rounded-md p-2">
            <p className="text-xs text-green-800">Favoráveis</p>
            <p className="text-lg font-bold text-green-600">{positiveCount}</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-md p-2">
            <p className="text-xs text-slate-800">Neutros</p>
            <p className="text-lg font-bold text-slate-600">{neutralCount}</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-md p-2">
            <p className="text-xs text-red-800">Desfavoráveis</p>
            <p className="text-lg font-bold text-red-600">{negativeCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactsSection;
