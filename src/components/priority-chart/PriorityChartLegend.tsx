
import React from 'react';

const PriorityChartLegend: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center mt-2">
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm font-medium mb-1">Impacto</h4>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Favorável</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">Desfavorável</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-sm">Neutro</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm font-medium mb-1">Relevância</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm">Baixa</span>
          <div className="w-16 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded"></div>
          <span className="text-sm">Alta</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm font-medium mb-1">Urgência</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm">Baixa</span>
          <div className="w-16 h-2 bg-gradient-to-r from-gray-300 to-red-500 rounded"></div>
          <span className="text-sm">Alta</span>
        </div>
      </div>
    </div>
  );
};

export default PriorityChartLegend;
