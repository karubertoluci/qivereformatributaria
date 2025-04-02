
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import ResultsHeader from './results/ResultsHeader';

interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment }) => {
  // Get the relevant articles to count positive and negative impacts
  const { articles } = require('@/data/articles');
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

  return (
    <div className="print:bg-white">
      <ResultsHeader 
        segment={segment}
        positiveCount={positiveCount}
        negativeCount={negativeCount}
      />
      <ResultsContainer segment={segment} onBackToSegments={() => {}} />
    </div>
  );
};

export default Results;
