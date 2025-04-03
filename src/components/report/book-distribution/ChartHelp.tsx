
import React from 'react';

const ChartHelp: React.FC = () => {
  return (
    <div className="mt-6 p-3 bg-muted/50 rounded-md border border-muted">
      <h4 className="font-medium mb-1 text-sm flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
        <span>Como interpretar este gráfico:</span>
      </h4>
      <p className="text-sm text-muted-foreground">
        Cada barra representa um livro da reforma tributária com seus artigos divididos em três categorias:
        <span className="block mt-1">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-sm mr-1"></span>
          <strong>Verde:</strong> Artigos com impacto favorável para seu segmento
        </span>
        <span className="block mt-1">
          <span className="inline-block w-3 h-3 bg-gray-300 rounded-sm mr-1"></span>
          <strong>Cinza:</strong> Artigos com impacto neutro ou indireto
        </span>
        <span className="block mt-1">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-sm mr-1"></span>
          <strong>Vermelho:</strong> Artigos com impacto potencialmente desfavorável
        </span>
      </p>
      <p className="text-sm text-gray-600 mt-2 font-medium">
        Clique nas barras ou nos cards abaixo para filtrar a visualização por livro específico.
      </p>
    </div>
  );
};

export default ChartHelp;
