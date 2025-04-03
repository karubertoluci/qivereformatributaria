
import React from 'react';

interface PriorityChartLegendProps {
  onMouseEnter?: (category: string) => void;
  onMouseLeave?: () => void;
  onClick?: (category: string) => void;
  selectedRelevance?: string | null;
}

const PriorityChartLegend: React.FC<PriorityChartLegendProps> = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  selectedRelevance
}) => {
  const handleCategoryInteraction = (category: string, action: 'enter' | 'click') => {
    if (action === 'enter' && onMouseEnter) {
      onMouseEnter(category);
    } else if (action === 'click' && onClick) {
      onClick(category);
    }
  };

  return (
    <div className="mt-2 p-2 bg-muted/50 rounded-md border border-muted text-xs">
      <p className="text-center mb-1 font-medium">Como interpretar:</p>
      <div className="grid grid-cols-2 gap-2">
        <div 
          className={`cursor-pointer p-1 rounded ${selectedRelevance === 'high_positive' ? 'bg-muted/50' : ''}`}
          onMouseEnter={() => handleCategoryInteraction('high_positive', 'enter')}
          onMouseLeave={onMouseLeave}
          onClick={() => handleCategoryInteraction('high_positive', 'click')}
        >
          <span className="inline-block w-2 h-2 bg-green-500 rounded-sm mr-1"></span>
          <strong>Verde:</strong> Impacto positivo
        </div>
        <div 
          className={`cursor-pointer p-1 rounded ${selectedRelevance === 'high_negative' ? 'bg-muted/50' : ''}`}
          onMouseEnter={() => handleCategoryInteraction('high_negative', 'enter')}
          onMouseLeave={onMouseLeave}
          onClick={() => handleCategoryInteraction('high_negative', 'click')}
        >
          <span className="inline-block w-2 h-2 bg-red-500 rounded-sm mr-1"></span>
          <strong>Vermelho:</strong> Impacto negativo
        </div>
      </div>
      <p className="mt-2 text-center text-muted-foreground">
        Priorize a leitura dos artigos localizados no canto superior direito
      </p>
    </div>
  );
};

export default PriorityChartLegend;
