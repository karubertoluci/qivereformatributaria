
import React from 'react';
import { Article } from '@/data/articles';
import { useIsMobile } from '@/hooks/use-mobile';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import ChartExpandToggle from '../components/ChartExpandToggle';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import FavorabilityRelevanceChart from '@/components/report/FavorabilityRelevanceChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import RelevanceDistributionChart from '@/components/report/RelevanceDistributionChart';

interface ChartSectionProps {
  filteredArticles: Article[];
  segmentId: string;
  setExpandedArticleId: (id: string | null) => void;
  expanded: boolean;
  toggleExpanded: () => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  filteredArticles,
  segmentId,
  setExpandedArticleId,
  expanded,
  toggleExpanded
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Visualizações dos artigos</h3>
        <ChartExpandToggle 
          expanded={expanded} 
          toggleExpanded={toggleExpanded} 
        />
      </div>

      <div className={`overflow-x-auto transition-all duration-300 ${expanded ? 'max-h-[2000px]' : 'max-h-[1200px]'}`}>
        <div className={isMobile ? "min-w-[500px]" : ""}>
          <div className="space-y-6">
            {/* 1. Book Distribution Chart - The first requested chart */}
            <div className="mb-6">
              <BookDistributionChart 
                articles={filteredArticles}
                onSelectBook={(bookId) => {
                  if (bookId) {
                    // Find the first article of this book and select it
                    const article = filteredArticles.find(a => a.metadata?.bookId === bookId);
                    if (article) setExpandedArticleId(article.id);
                  }
                }}
              />
            </div>
            
            {/* 2. Favorability Relevance Chart - The second requested chart */}
            <div className="mb-6">
              <FavorabilityRelevanceChart 
                articles={filteredArticles}
                segmentId={segmentId}
              />
            </div>
            
            {/* Articles Priority Chart */}
            <div className="mb-6">
              <ArticlesPriorityChart 
                articles={filteredArticles}
                segmentId={segmentId}
                onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
              />
            </div>
            
            {/* Only show additional charts when expanded */}
            {expanded && (
              <>
                {/* Impact Distribution Chart */}
                <div className="mb-6">
                  <ImpactDistributionChart 
                    segmentId={segmentId}
                    articles={filteredArticles}
                  />
                </div>
                
                {/* Relevance Distribution Chart */}
                <div className="mb-6">
                  <RelevanceDistributionChart 
                    articles={filteredArticles}
                    segmentId={segmentId}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
