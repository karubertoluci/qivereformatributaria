
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTitleRelevanceData } from './book-title-relevance/useTitleRelevanceData';
import ChartHeader from './book-title-relevance/ChartHeader';
import TitleBarChart from './book-title-relevance/TitleBarChart';
import RelevanceLegend from './book-title-relevance/RelevanceLegend';
import ChartHelp from './book-title-relevance/ChartHelp';
import { BookTitleRelevanceChartProps } from './book-title-relevance/types';

const BookTitleRelevanceChart: React.FC<BookTitleRelevanceChartProps> = ({
  articles,
  bookId,
  segmentId,
  onSelectTitle
}) => {
  // Colors for each relevance level
  const colors = {
    muitoRelevante: '#ef4444', // red
    moderadamenteRelevante: '#f97316', // orange
    poucoRelevante: '#eab308', // yellow
    irrelevante: '#65a30d' // green
  };

  const { data } = useTitleRelevanceData({ articles, bookId, segmentId });

  const handleBarClick = (event: any) => {
    if (onSelectTitle && event && event.id) {
      onSelectTitle(event.id);
    }
  };
  
  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <ChartHeader bookId={bookId} />
      </CardHeader>
      
      <CardContent>
        <TitleBarChart 
          data={data}
          colors={colors}
          onBarClick={handleBarClick} 
        />
        
        <RelevanceLegend colors={colors} />

        <div className="mt-4">
          <ChartHelp />
        </div>
      </CardContent>
    </Card>
  );
};

export default BookTitleRelevanceChart;
