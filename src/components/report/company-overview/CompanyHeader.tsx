
import React from 'react';
import { Building2 } from 'lucide-react';

const CompanyHeader: React.FC = () => {
  return (
    <div className="bg-white border-b p-4">
      <h2 className="flex items-center gap-2 text-xl font-medium text-gray-800">
        <Building2 className="h-5 w-5 text-rose-500" />
        Perfil da Empresa
      </h2>
    </div>
  );
};

export default CompanyHeader;
