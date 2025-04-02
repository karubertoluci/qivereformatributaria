
import React from 'react';
import { Link } from 'react-router-dom';

const ResultsFooter: React.FC = () => {
  return (
    <div className="mt-16 pt-6 border-t text-center text-sm">
      <p className="text-muted-foreground">Relatório gerado pela Qive Reforma Tributária 2025</p>
      <p className="mt-1 text-muted-foreground">© {new Date().getFullYear()} Qive. Todos os direitos reservados.</p>
      <div className="mt-4">
        <Link to="/" className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default ResultsFooter;
