
import React from 'react';

interface BookCardStatsProps {
  positiveImpacts: number;
  neutralImpacts: number;
  negativeImpacts: number;
}

export const BookCardStats: React.FC<BookCardStatsProps> = ({ 
  positiveImpacts, 
  neutralImpacts, 
  negativeImpacts 
}) => {
  return (
    <div className="grid grid-cols-3 gap-1 mt-2">
      <div className="bg-green-50 p-2 rounded-md text-center">
        <div className="text-lg font-semibold text-green-600">{positiveImpacts}</div>
        <div className="text-xs text-green-700">Favoráveis</div>
      </div>
      <div className="bg-gray-50 p-2 rounded-md text-center">
        <div className="text-lg font-semibold text-gray-600">{neutralImpacts}</div>
        <div className="text-xs text-gray-700">Neutros</div>
      </div>
      <div className="bg-red-50 p-2 rounded-md text-center">
        <div className="text-lg font-semibold text-red-600">{negativeImpacts}</div>
        <div className="text-xs text-red-700">Desfavoráveis</div>
      </div>
    </div>
  );
};
