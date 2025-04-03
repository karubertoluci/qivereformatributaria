
import React from 'react';

const ChartHelp: React.FC = () => {
  return (
    <div className="mt-4 text-sm text-muted-foreground p-2 bg-muted/50 rounded-md">
      <p className="flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
        <strong>Como usar:</strong> Clique nas barras ou nos cards para filtrar artigos por livro da legislação.
      </p>
    </div>
  );
};

export default ChartHelp;
