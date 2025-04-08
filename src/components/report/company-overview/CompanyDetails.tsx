
import React from 'react';
import { FileText, MapPin, Store } from 'lucide-react';
import InfoCard from './InfoCard';
import { BusinessSegment } from '@/data/segments';

interface CompanyDetailsProps {
  cnpj?: string;
  segment?: BusinessSegment;
  naturezaJuridica?: string;
  endereco?: string;
  formatCNPJ: (cnpj: string | undefined) => string;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  cnpj,
  segment,
  naturezaJuridica,
  endereco,
  formatCNPJ
}) => {
  return (
    <div className="space-y-4">
      {/* CNPJ & Segmento in the same row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CNPJ */}
        <InfoCard 
          icon={<FileText className="h-4 w-4 text-primary" />}
          label="CNPJ"
          value={formatCNPJ(cnpj) || "Não informado"}
        />
        
        {/* Segmento */}
        {segment && (
          <InfoCard 
            icon={<Store className="h-4 w-4 text-primary" />}
            label="Segmento"
            value={segment.name}
          />
        )}
      </div>
      
      {/* Natureza Jurídica */}
      {naturezaJuridica && (
        <InfoCard 
          icon={<FileText className="h-4 w-4 text-primary" />}
          label="Natureza Jurídica"
          value={naturezaJuridica}
        />
      )}

      {/* Endereço */}
      {endereco && (
        <InfoCard 
          icon={<MapPin className="h-4 w-4 text-primary" />}
          label="Endereço"
          value={endereco}
        />
      )}
    </div>
  );
};

export default CompanyDetails;
