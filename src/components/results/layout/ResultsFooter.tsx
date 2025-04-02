
import React from 'react';

const ResultsFooter: React.FC = () => {
  return (
    <div className="mt-16 pt-6 border-t text-center text-sm text-muted-foreground print:mt-8">
      <p>Relatório gerado pela Qive Reforma Tributária 2025</p>
      <p className="mt-1">© {new Date().getFullYear()} Qive. Todos os direitos reservados.</p>
    </div>
  );
};

export default ResultsFooter;
