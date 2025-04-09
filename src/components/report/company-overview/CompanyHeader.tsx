
import React from 'react';
import { Building2 } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

const CompanyHeader: React.FC = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-rose-50 to-white border-b">
      <CardTitle className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-rose-500" />
        Perfil da Empresa
      </CardTitle>
    </CardHeader>
  );
};

export default CompanyHeader;
