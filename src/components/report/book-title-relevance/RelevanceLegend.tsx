
import React from 'react';
import { RelevanceColorScheme } from './types';

interface RelevanceLegendProps {
  colors: RelevanceColorScheme;
}

const RelevanceLegend: React.FC<RelevanceLegendProps> = ({ colors }) => {
  return (
    <div className="mt-6 p-3 bg-muted/50 rounded-md border border-muted">
      <h4 className="font-medium mb-1">Legenda de relevância:</h4>
      <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{backgroundColor: colors.irrelevante}}></span>
          <span>Irrelevante: impacto mínimo no seu segmento</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{backgroundColor: colors.poucoRelevante}}></span>
          <span>Pouco relevante: baixo impacto no seu segmento</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{backgroundColor: colors.moderadamenteRelevante}}></span>
          <span>Moderadamente relevante: impacto significativo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{backgroundColor: colors.muitoRelevante}}></span>
          <span>Muito relevante: alto impacto no seu segmento</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-center text-muted-foreground">
        Clique nas barras para filtrar artigos por título e nível de relevância
      </p>
    </div>
  );
};

export default RelevanceLegend;
