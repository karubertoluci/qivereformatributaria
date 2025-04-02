
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import ResultsHeader from './results/ResultsHeader';
import { articles } from '@/data/articles';

interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment }) => {
  // Get the relevant articles to count positive and negative impacts
  const relevantArticles = articles.filter(article => 
    article.impacts.some(impact => impact.segments.includes(segment.id))
  );
  
  // Count positive and negative impacts
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;

  // Get company name from localStorage if available
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const companyName = formData?.razaoSocial || formData?.nomeFantasia || formData?.nome;

  return (
    <div className="print:bg-white">
      <ResultsHeader 
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        companyName={companyName}
      />
      <ResultsContainer segment={segment} onBackToSegments={() => {}} />
    </div>
  );
};

export default Results;
