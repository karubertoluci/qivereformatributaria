
import React from 'react';

const PriorityChartLegend: React.FC = () => {
  return (
    <div className="mt-2 p-2 bg-muted/50 rounded-md border border-muted text-xs">
      <p className="text-center mb-1 font-medium">Como interpretar:</p>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <span className="inline-block w-2 h-2 bg-green-500 rounded-sm mr-1"></span>
          <strong>Verde:</strong> Favorável
        </div>
        <div>
          <span className="inline-block w-2 h-2 bg-gray-400 rounded-sm mr-1"></span>
          <strong>Cinza:</strong> Neutro
        </div>
        <div>
          <span className="inline-block w-2 h-2 bg-red-500 rounded-sm mr-1"></span>
          <strong>Vermelho:</strong> Desfavorável
        </div>
      </div>
      <p className="mt-2 text-center text-muted-foreground">
        Priorize a leitura dos artigos localizados no canto superior direito
      </p>
    </div>
  );
};

export default PriorityChartLegend;
