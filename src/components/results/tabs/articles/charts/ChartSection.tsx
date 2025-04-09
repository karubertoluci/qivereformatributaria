
import React from 'react';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';
import { useIsMobile } from '@/hooks/use-mobile';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import ChartExpandToggle from '../components/ChartExpandToggle';
import LegislationBooks from '@/components/report/LegislationBooks';
import FavorabilityRelevanceChart from '@/components/report/FavorabilityRelevanceChart';

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

      <div className={`overflow-x-auto transition-all duration-300 ${expanded ? 'max-h-[1500px]' : 'max-h-[300px]'}`}>
        <div className={isMobile ? "min-w-[500px]" : ""}>
          <div className="space-y-6">
            {/* Articles Priority Chart */}
            <div className="mb-6">
              <ArticlesPriorityChart 
                articles={filteredArticles}
                segmentId={segmentId}
                onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
              />
            </div>
            
            {/* Legislation Books Chart */}
            <div className="mb-6">
              <LegislationBooks 
                articles={filteredArticles}
                onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
              />
            </div>
            
            {/* Favorability Relevance Chart */}
            <div>
              <FavorabilityRelevanceChart 
                articles={filteredArticles}
                segmentId={segmentId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
