
import React from 'react';

const ChartHelp: React.FC = () => {
  return (
    <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
      <span className="font-medium">Como usar:</span> Clique nas barras ou nos cards para filtrar artigos por livro da legislação.
    </div>
  );
};

export default ChartHelp;
