
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './ResultsContainer';
import { useNavigate } from 'react-router-dom';

export interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  return (
    <div className="w-full bg-white print:bg-white">
      <ResultsContainer segment={segment} onBackToSegments={onBackToSegments} />
    </div>
  );
};

export default Results;
