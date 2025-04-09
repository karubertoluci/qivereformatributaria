
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const CompanyHeader: React.FC = () => {
  return (
    <CardHeader className="bg-rose-50 border-b py-4 px-6">
      <CardTitle className="flex items-center gap-2 text-xl font-semibold">
        <Building2 className="h-5 w-5 text-rose-500" />
        <span className="text-black">Perfil da Empresa</span>
      </CardTitle>
    </CardHeader>
  );
};

export default CompanyHeader;
