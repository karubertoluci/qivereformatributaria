
import React from 'react';
import { Topic } from './types';

interface ResultsSummaryProps {
  totalArticles: number;
  positiveCount: number;
  negativeCount: number;
  segmentName: string;
  topics?: Topic[];
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  totalArticles, 
  positiveCount, 
  negativeCount, 
  segmentName,
  topics = []
}) => {
  const topicsToShow = topics.slice(0, 3); // Show only top 3 topics
  
  return (
    <div className="bg-card p-4 rounded-lg mb-6">
      <h3 className="font-medium mb-2">Resumo dos Impactos</h3>
      <p className="text-sm text-foreground">
        Encontramos {totalArticles} artigos relevantes para o segmento <strong>"{segmentName}"</strong>. 
        Destes, {positiveCount} apresentam impactos potencialmente positivos e {negativeCount} apresentam 
        pontos de atenção que podem impactar negativamente seu negócio.
      </p>
      
      {topicsToShow.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs font-medium text-muted-foreground mb-1.5">Principais tópicos:</h4>
          <div className="flex flex-wrap gap-2">
            {topicsToShow.map(topic => (
              <div key={topic.id} className="text-xs bg-accent rounded-full px-3 py-1">
                {topic.name}
              </div>
            ))}
            {topics.length > 3 && (
              <div className="text-xs bg-accent rounded-full px-3 py-1 text-muted-foreground">
                +{topics.length - 3} outros
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSummary;
