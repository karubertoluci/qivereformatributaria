
import React from 'react';

interface ResultsSummaryProps {
  totalArticles: number;
  positiveCount: number;
  negativeCount: number;
  segmentName: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  totalArticles, 
  positiveCount, 
  negativeCount, 
  segmentName 
}) => {
  return (
    <div className="bg-secondary p-4 rounded-lg mb-6">
      <h3 className="font-medium mb-2">Resumo dos Impactos</h3>
      <p className="text-sm text-gray-700">
        Encontramos {totalArticles} artigos relevantes para o segmento "{segmentName}". 
        Destes, {positiveCount} apresentam impactos potencialmente positivos e {negativeCount} apresentam 
        pontos de atenção que podem impactar negativamente seu negócio.
      </p>
    </div>
  );
};

export default ResultsSummary;
