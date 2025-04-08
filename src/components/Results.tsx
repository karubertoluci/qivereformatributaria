
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import { forceArticleRefresh } from '@/utils/cacheUtils';
import { toast } from 'sonner';

export interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const handleRefresh = () => {
    forceArticleRefresh(segment.id);
    toast.info("Atualizando dados dos artigos...");
    // Recarregar a página para forçar a busca de novos dados
    window.location.reload();
  };

  return (
    <div className="print:bg-white">
      <ResultsContainer segment={segment} onBackToSegments={onBackToSegments} />
    </div>
  );
};

export default Results;
