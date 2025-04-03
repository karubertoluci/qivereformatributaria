
import React from 'react';

interface BookCardStatsProps {
  positiveImpacts: number;
  negativeImpacts: number;
  neutralImpacts: number;
}

export const BookCardStats: React.FC<BookCardStatsProps> = ({ 
  positiveImpacts, 
  negativeImpacts, 
  neutralImpacts 
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="bg-green-50 p-2 rounded">
        <div className="font-bold text-green-600 text-lg">{positiveImpacts}</div>
        <div className="text-xs text-green-600">Favoráveis</div>
      </div>
      <div className="bg-gray-50 p-2 rounded">
        <div className="font-bold text-gray-500 text-lg">{neutralImpacts}</div>
        <div className="text-xs text-gray-500">Neutros</div>
      </div>
      <div className="bg-red-50 p-2 rounded">
        <div className="font-bold text-red-500 text-lg">{negativeImpacts}</div>
        <div className="text-xs text-red-500">Desfavoráveis</div>
      </div>
    </div>
  );
};
