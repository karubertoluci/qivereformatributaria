
import React from 'react';

const PriorityChartLegend = () => {
  return (
    <div className="flex flex-col space-y-2 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4ade80]"></div>
            <span className="text-xs">Favorável</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ef4444]"></div>
            <span className="text-xs">Desfavorável</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#9ca3af]"></div>
            <span className="text-xs">Neutro</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Clique nos pontos para visualizar detalhes do artigo
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="flex flex-col space-y-1">
          <div className="text-xs font-medium">Relevância:</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs">0-25: Irrelevante</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            <span className="text-xs">25-45: Pouco relevante</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <span className="text-xs">45-75: Moderadamente relevante</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <span className="text-xs">75-100: Muito relevante</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <div className="text-xs font-medium">Urgência:</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs">0-25: Baixa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            <span className="text-xs">25-50: Média</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <span className="text-xs">50-75: Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <span className="text-xs">75-100: Crítica</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityChartLegend;
