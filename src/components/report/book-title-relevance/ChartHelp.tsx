
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ChartHelp: React.FC = () => {
  return (
    <div className="bg-muted/30 p-4 rounded-md border border-muted">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm">Como interpretar este gráfico</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Este gráfico mostra a distribuição de artigos por cada título do livro selecionado, organizados por níveis de relevância. 
            Barras mais altas em categorias de maior relevância indicam títulos que merecem maior atenção para seu segmento.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Para analisar os artigos específicos de cada título, clique nas barras correspondentes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartHelp;
