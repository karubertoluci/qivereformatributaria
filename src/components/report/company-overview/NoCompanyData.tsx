
import React from 'react';
import { AlertCircle } from 'lucide-react';

const NoCompanyData: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <AlertCircle className="h-12 w-12 text-orange-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">Informações da empresa não disponíveis</h3>
      <p className="text-gray-600">
        Não conseguimos encontrar os dados da empresa. Tente pesquisar novamente com um CNPJ válido.
      </p>
    </div>
  );
};

export default NoCompanyData;
