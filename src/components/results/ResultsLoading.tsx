
import React from 'react';

const ResultsLoading: React.FC = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <h2 className="text-xl font-medium">Carregando relatório personalizado...</h2>
        <p className="text-muted-foreground">
          Estamos analisando os dados da reforma tributária
        </p>
      </div>
    </div>
  );
};

export default ResultsLoading;
