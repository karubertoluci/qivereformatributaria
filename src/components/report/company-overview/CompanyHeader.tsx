
import React from 'react';
import { Store } from 'lucide-react';
import InfoCard from './InfoCard';

interface CompanyHeaderProps {
  razaoSocial?: string;
  nomeFantasia?: string;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  razaoSocial,
  nomeFantasia
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {razaoSocial || "Empresa Não Identificada"}
      </h3>
      
      {nomeFantasia && nomeFantasia !== razaoSocial && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard 
            icon={<Store className="h-4 w-4 text-primary" />}
            label="Razão Social"
            value={nomeFantasia}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyHeader;
