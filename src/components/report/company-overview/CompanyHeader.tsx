
import React from 'react';
import { Store } from 'lucide-react';

interface CompanyHeaderProps {
  razaoSocial?: string;
  nomeFantasia?: string;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  razaoSocial,
  nomeFantasia
}) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">
        {razaoSocial || "Empresa Não Identificada"}
      </h3>
      {nomeFantasia && nomeFantasia !== razaoSocial && (
        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
          <Store className="h-3.5 w-3.5" />
          Nome Fantasia: <span className="font-medium">{nomeFantasia}</span>
        </p>
      )}
    </div>
  );
};

export default CompanyHeader;
