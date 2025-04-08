
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import ChartExpandToggle from '../components/ChartExpandToggle';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartSectionProps {
  segment: BusinessSegment;
  relevantArticles: Article[];
  allArticles: Article[];
  segmentId: string;
  setExpandedArticleId: (id: string) => void;
  filteredArticles: Article[];
  expanded: boolean;
  toggleExpanded: () => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  filteredArticles,
  segmentId,
  setExpandedArticleId,
  expanded,
  toggleExpanded,
  allArticles
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Distribuição de impactos</h3>
        <ChartExpandToggle expanded={expanded} toggleExpanded={toggleExpanded} />
      </div>

      <div className={`overflow-x-auto transition-all duration-300 ${expanded ? 'max-h-[600px]' : 'max-h-[300px]'}`}>
        <div className={isMobile ? "min-w-[500px]" : ""}>
          <ArticlesPriorityChart 
            articles={filteredArticles.length > 0 ? filteredArticles : allArticles}
            segmentId={segmentId}
            onSelectArticle={(articleId) => setExpandedArticleId(articleId)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
