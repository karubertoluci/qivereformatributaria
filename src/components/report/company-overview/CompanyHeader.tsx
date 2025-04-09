import React from 'react';
import { Building2 } from 'lucide-react';
interface CompanyHeaderProps {
  companyName?: string;
}
const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  companyName
}) => {
  return <div className="bg-gradient-to-r from-rose-50 to-white p-4">
      <h2 className="flex items-center gap-3 text-gray-800 text-2xl font-semibold">
        <div className="p-2 rounded-md bg-transparent">
          <Building2 className="h-5 w-5 text-rose-500" />
        </div>
        Perfil da Empresa
      </h2>
    </div>;
};
export default CompanyHeader;