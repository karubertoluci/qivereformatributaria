
import React from 'react';
import { Briefcase, FileText } from 'lucide-react';

interface CNAEData {
  codigo: string;
  descricao: string;
}

interface CNAESectionProps {
  cnaePrincipal?: CNAEData;
  cnaeSecundarios?: CNAEData[];
}

const CNAESection: React.FC<CNAESectionProps> = ({
  cnaePrincipal,
  cnaeSecundarios
}) => {
  return (
    <div className="space-y-4">
      {/* CNAE Principal */}
      <div className="border border-gray-200 rounded-md p-4 shadow-sm bg-white">
        <h4 className="text-sm font-medium flex items-center gap-1.5 text-primary mb-3">
          <Briefcase className="h-4 w-4 text-primary" />
          CNAE Principal
        </h4>
        
        {cnaePrincipal?.codigo ? (
          <div>
            <div className="bg-white border border-gray-100 rounded p-3 mb-2">
              <span className="font-bold text-gray-800">{cnaePrincipal.codigo}</span>
            </div>
            <p className="text-gray-700">{cnaePrincipal.descricao}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">CNAE não identificado</p>
        )}
      </div>
      
      {/* CNAEs Secundários */}
      <div className="border border-gray-200 rounded-md p-4 shadow-sm bg-white">
        <h4 className="text-sm font-medium flex items-center gap-1.5 mb-3 text-primary">
          <FileText className="h-4 w-4 text-primary" />
          CNAEs Secundários
        </h4>
        
        {cnaeSecundarios && cnaeSecundarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cnaeSecundarios.map((cnae, i) => (
              <div key={i} className="bg-white border border-gray-100 p-3 rounded">
                <p className="font-semibold text-gray-800 text-sm mb-1">{cnae.codigo}</p>
                <p className="text-xs text-gray-600">{cnae.descricao}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 p-3 rounded text-center">
            <p className="text-gray-500">Não existem CNAEs secundários</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CNAESection;
