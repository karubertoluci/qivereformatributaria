
import React from 'react';
import { Building2, Briefcase } from 'lucide-react';

interface CompanyCardProps {
  companyName: string;
  segment?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ companyName, segment }) => {
  if (!companyName) return null;
  
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
          <Building2 className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{companyName}</h3>
          {segment && (
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Briefcase className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
              <span>{segment}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
