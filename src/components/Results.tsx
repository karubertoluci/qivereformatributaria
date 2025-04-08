
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import { articles } from '@/data/articles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const navigate = useNavigate();
  
  // Get company name from localStorage if available
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const companyName = formData?.razaoSocial || formData?.nomeFantasia || formData?.nome;

  return (
    <div className="print:bg-white">
      <ResultsContainer segment={segment} onBackToSegments={onBackToSegments} />
    </div>
  );
};

export default Results;
