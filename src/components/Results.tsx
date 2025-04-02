
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';

interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment }) => {
  return (
    <div className="print:bg-white">
      <ResultsContainer segment={segment} onBackToSegments={() => {}} />
    </div>
  );
};

export default Results;
