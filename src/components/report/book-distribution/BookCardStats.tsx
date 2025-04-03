
import React from 'react';

interface BookCardStatsProps {
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
}

export const BookCardStats: React.FC<BookCardStatsProps> = ({ 
  positiveCount, 
  neutralCount, 
  negativeCount 
}) => {
  return (
    <div className="grid grid-cols-3 gap-1 mt-2">
      <div className="bg-green-50 p-2 rounded-md text-center">
        <div className="text-lg font-semibold text-green-600">{positiveCount}</div>
        <div className="text-xs text-green-700">Favoráveis</div>
      </div>
      <div className="bg-gray-50 p-2 rounded-md text-center">
        <div className="text-lg font-semibold text-gray-600">{neutralCount}</div>
        <div className="text-xs text-gray-700">Neutros</div>
      </div>
      <div className="bg-red-50 p-2 rounded-md text-center">
        <div className="text-lg font-semibold text-red-600">{negativeCount}</div>
        <div className="text-xs text-red-700">Desfavoráveis</div>
      </div>
    </div>
  );
};
