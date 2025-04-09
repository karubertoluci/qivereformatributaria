
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CompanyHeaderProps {
  companyName?: string;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyName }) => {
  // Function to get the initials from company name
  const getInitials = (name: string = ''): string => {
    if (!name) return '';
    
    // Remove extra spaces and split by spaces
    const words = name.trim().split(/\s+/);
    
    // If we have at least two words, take first letter of each
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    
    // If just one word, take up to two letters
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white border-b p-4">
      <h2 className="flex items-center gap-3 text-xl font-medium text-gray-800">
        <Avatar className="h-8 w-8 bg-rose-100 text-rose-600">
          <AvatarFallback className="bg-rose-100 text-rose-600 font-medium text-sm">
            {getInitials(companyName)}
          </AvatarFallback>
        </Avatar>
        Perfil da Empresa
      </h2>
    </div>
  );
};

export default CompanyHeader;
