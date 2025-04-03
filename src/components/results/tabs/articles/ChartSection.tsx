
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import BookTitleRelevanceChart from '@/components/report/BookTitleRelevanceChart';
import { toast } from 'sonner';
import ChartExpandToggle from './components/ChartExpandToggle';
import ViewModeCard from './components/ViewModeCard';
import ImpactsSection from './components/ImpactsSection';

interface ChartSectionProps {
  chartsCollapsed: boolean;
  setChartsCollapsed: (collapsed: boolean) => void;
  segment: BusinessSegment;
  relevantArticles: Article[];
  allArticles: Article[];
  showAllArticles: boolean;
  setShowAllArticles: (show: boolean) => void;
  selectedBookFilter: string | null;
  setSelectedBookFilter: (bookId: string | null) => void;
  setSelectedTitleFilter: (titleId: string | null) => void;
  hasCriticalImpacts: boolean;
  setExpandedArticleId: (id: string | null) => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  chartsCollapsed,
  setChartsCollapsed,
  segment,
  relevantArticles,
  allArticles,
  showAllArticles,
  setShowAllArticles,
  selectedBookFilter,
  setSelectedBookFilter,
  setSelectedTitleFilter,
  hasCriticalImpacts,
  setExpandedArticleId
}) => {
  if (chartsCollapsed) {
    return (
      <ChartExpandToggle 
        collapsed={chartsCollapsed} 
        onToggle={() => setChartsCollapsed(false)} 
      />
    );
  }
  
  return (
    <div className="space-y-6 mb-8">
      <ChartExpandToggle 
        collapsed={chartsCollapsed} 
        onToggle={() => setChartsCollapsed(true)} 
      />
      
      <div className="w-full">
        <BookDistributionChart 
          articles={showAllArticles ? allArticles : relevantArticles} 
          onSelectBook={setSelectedBookFilter}
          selectedBook={selectedBookFilter}
        />
      </div>
      
      <div className="w-full">
        <ArticlesPriorityChart 
          articles={relevantArticles}
          segmentId={segment.id}
          onSelectArticle={setExpandedArticleId}
        />
      </div>
      
      <ImpactsSection
        hasCriticalImpacts={hasCriticalImpacts}
        showAllArticles={showAllArticles}
        allArticles={allArticles}
        relevantArticles={relevantArticles}
        segmentId={segment.id}
        bookId={selectedBookFilter}
      />
      
      {selectedBookFilter && (
        <BookTitleRelevanceChart 
          articles={showAllArticles ? allArticles : relevantArticles}
          bookId={selectedBookFilter}
          segmentId={segment.id}
          onSelectTitle={(titleId) => {
            setSelectedTitleFilter(titleId);
            toast.info(`Filtrando por título ${titleId}`);
          }}
        />
      )}
      
      <ViewModeCard
        showAllArticles={showAllArticles}
        setShowAllArticles={setShowAllArticles}
      />
    </div>
  );
};

export default ChartSection;
