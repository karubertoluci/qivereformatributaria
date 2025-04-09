
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Building2, FileText } from 'lucide-react';

const NoCompanyData: React.FC = () => {
  return (
    <CardContent className="p-6">
      <div className="text-center py-12 border border-dashed rounded-lg border-gray-200">
        <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma informação da empresa disponível</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Para visualizar o perfil completo da empresa, informe o CNPJ na página inicial ou clique no botão abaixo.
        </p>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors mx-auto"
        >
          <FileText className="h-4 w-4" />
          Informar dados da empresa
        </button>
      </div>
    </CardContent>
  );
};

export default NoCompanyData;
