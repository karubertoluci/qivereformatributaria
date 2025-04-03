
import React, { useState } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';
import BookTitleRelevanceChart from '@/components/report/BookTitleRelevanceChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import RelevanceDistributionChart from '@/components/report/RelevanceDistributionChart';
import FavorabilityRelevanceChart from '@/components/report/FavorabilityRelevanceChart';
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
  const [selectedRelevanceFilter, setSelectedRelevanceFilter] = useState<string | null>(null);

  if (chartsCollapsed) {
    return (
      <ChartExpandToggle 
        collapsed={chartsCollapsed} 
        onToggle={() => setChartsCollapsed(false)} 
      />
    );
  }
  
  const handleRelevanceFilter = (relevanceLevel: string | null) => {
    setSelectedRelevanceFilter(relevanceLevel);
    if (relevanceLevel) {
      toast.info(`Filtrando por relevância: ${relevanceLevel}`);
    } else {
      toast.info("Filtro de relevância removido");
    }
  };
  
  return (
    <div className="space-y-6 mb-8">
      <ChartExpandToggle 
        collapsed={chartsCollapsed} 
        onToggle={() => setChartsCollapsed(true)} 
      />
      
      <div className="w-full">
        <RelevanceDistributionChart
          articles={showAllArticles ? allArticles : relevantArticles}
          segmentId={segment.id}
          onSelectBook={setSelectedBookFilter}
          selectedBook={selectedBookFilter}
          onSelectRelevance={handleRelevanceFilter}
          selectedRelevance={selectedRelevanceFilter}
        />
      </div>
      
      {/* FavorabilityRelevanceChart - Connected to both filters */}
      <div className="w-full mt-6">
        <FavorabilityRelevanceChart
          articles={showAllArticles ? allArticles : relevantArticles}
          segmentId={segment.id}
          bookId={selectedBookFilter}
          relevanceFilter={selectedRelevanceFilter}
          onBookSelect={setSelectedBookFilter}
        />
      </div>
      
      {/* Side-by-side charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ImpactDistributionChart 
            articles={showAllArticles ? allArticles : relevantArticles}
            segmentId={segment.id}
            bookId={selectedBookFilter}
            onRelevanceFilter={handleRelevanceFilter}
            selectedRelevance={selectedRelevanceFilter}
          />
        </div>
        
        <div>
          <ArticlesPriorityChart 
            articles={relevantArticles}
            segmentId={segment.id}
            onSelectArticle={setExpandedArticleId}
            bookId={selectedBookFilter}
            relevanceFilter={selectedRelevanceFilter}
          />
        </div>
      </div>
      
      <ImpactsSection
        hasCriticalImpacts={hasCriticalImpacts}
        showAllArticles={showAllArticles}
        allArticles={allArticles}
        relevantArticles={relevantArticles}
        segmentId={segment.id}
        bookId={selectedBookFilter}
        relevanceFilter={selectedRelevanceFilter}
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
